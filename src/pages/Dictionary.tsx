import { useState, useEffect, useRef } from "react";
import { Search, Volume2, BookOpen, Sparkles, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface WordResult {
  word: string;
  reading: string;
  meanings: string[];
  examples: string[];
  imageUrl?: string;
}

const popularWords = [
  "こんにちは", "ありがとう", "さようなら", "おはよう", "こんばんは",
  "すみません", "いただきます", "ごちそうさま", "おやすみ", "がんばって",
  "愛", "桜", "猫", "犬", "家", "学校", "先生", "学生", "友達", "家族"
];

const Dictionary = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [wordResult, setWordResult] = useState<WordResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = popularWords.filter(word => 
        word.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const searchWord = async (word: string) => {
    if (!word.trim()) {
      toast.error("Vui lòng nhập từ cần tra");
      return;
    }

    setIsSearching(true);
    setWordResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('japanese-chat', {
        body: {
          messages: [{
            role: "user",
            content: `Tra từ điển tiếng Nhật. Từ tìm kiếm: "${word}". 
            
            Nếu từ tìm kiếm là tiếng Việt, hãy tìm từ tiếng Nhật tương ứng.
            Nếu từ tìm kiếm là tiếng Nhật (Kanji, Hiragana, Katakana), hãy giải nghĩa từ đó.
            
            Trả lời theo format JSON này:
            {
              "word": "từ tiếng Nhật (Kanji/Kana)",
              "reading": "cách đọc (hiragana/katakana)",
              "meanings": ["nghĩa tiếng Việt 1", "nghĩa 2", ...],
              "examples": ["ví dụ câu tiếng Nhật với nghĩa tiếng Việt 1", "ví dụ 2", ...]
            }
            
            Chỉ trả về JSON thuần, không giải thích thêm.`
          }]
        }
      });

      if (error) throw error;

      // Parse the response
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const jsonStr = line.slice(6);
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) fullText += content;
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      // Extract JSON from markdown code blocks if present
      let jsonText = fullText.trim();
      if (jsonText.includes('```json')) {
        jsonText = jsonText.split('```json')[1].split('```')[0].trim();
      } else if (jsonText.includes('```')) {
        jsonText = jsonText.split('```')[1].split('```')[0].trim();
      }

      const result = JSON.parse(jsonText);
      setWordResult(result);
      
    } catch (error: any) {
      console.error('Search error:', error);
      toast.error("Không thể tra từ. Vui lòng thử lại.");
    } finally {
      setIsSearching(false);
    }
  };

  const generateImage = async (word: string) => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_LOVABLE_API_KEY || 'dummy-key'}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [{
            role: "user",
            content: `Generate a simple, beautiful illustration for the Japanese word "${word}". Make it cute and educational, suitable for language learning.`
          }],
          modalities: ["image", "text"]
        })
      });

      const data = await response.json();
      const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
      
      if (imageUrl && wordResult) {
        setWordResult({ ...wordResult, imageUrl });
        toast.success("Đã tạo hình minh họa!");
      }
    } catch (error) {
      console.error('Image generation error:', error);
      toast.error("Không thể tạo hình. Vui lòng thử lại.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSearch = () => {
    setShowSuggestions(false);
    searchWord(searchTerm);
  };

  const handleSuggestionClick = (word: string) => {
    setSearchTerm(word);
    setShowSuggestions(false);
    searchWord(word);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    speechSynthesis.speak(utterance);
  };

  const saveToFlashcard = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu từ vựng");
      return;
    }

    if (!wordResult) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("saved_vocabulary")
        .insert({
          user_id: user.id,
          word: wordResult.word,
          reading: wordResult.reading,
          meaning: wordResult.meanings.join(", "),
          example: wordResult.examples[0] || null,
          image_url: wordResult.imageUrl || null,
          mastery_level: 0
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("Từ này đã có trong flashcard!");
        } else {
          throw error;
        }
      } else {
        toast.success("Đã lưu vào Flashcard!");
      }
    } catch (error: any) {
      console.error("Error saving:", error);
      toast.error("Không thể lưu từ vựng");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-12 h-12 text-primary" />
              <h1 className="text-4xl font-bold">
                Từ Điển <span className="text-primary">Nhật - Việt</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Tra từ tiếng Nhật với hình ảnh minh họa sinh động
            </p>
          </div>

          {/* Search Box */}
          <div className="relative mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Nhập từ tiếng Nhật cần tra..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  onFocus={() => searchTerm && setShowSuggestions(true)}
                  className="text-lg h-14 pr-12"
                />
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <Card className="absolute top-full mt-2 w-full z-50 shadow-lg">
                    <CardContent className="p-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 hover:bg-accent rounded-md transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
              
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
                className="h-14 px-8"
              >
                {isSearching ? "Đang tra..." : "Tra từ"}
              </Button>
            </div>
          </div>

          {/* Popular Words */}
          {!wordResult && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Từ phổ biến:</h3>
              <div className="flex flex-wrap gap-2">
                {popularWords.slice(0, 10).map((word, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(word)}
                    className="hover:bg-primary hover:text-primary-foreground"
                  >
                    {word}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Search Result */}
          {wordResult && (
            <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Word Info */}
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-bold">{wordResult.word}</h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => speak(wordResult.word)}
                          className="hover:bg-primary/10"
                        >
                          <Volume2 className="w-5 h-5 text-primary" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={saveToFlashcard}
                          disabled={isSaving || !user}
                          className="hover:bg-primary/10"
                          title={!user ? "Đăng nhập để lưu" : "Lưu vào Flashcard"}
                        >
                          <Save className="w-5 h-5" />
                        </Button>
                      </div>
                      <p className="text-xl text-muted-foreground">{wordResult.reading}</p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Nghĩa:
                        </h3>
                        <ul className="space-y-2">
                          {wordResult.meanings.map((meaning, index) => (
                            <li key={index} className="flex gap-2">
                              <span className="text-primary font-semibold">{index + 1}.</span>
                              <span>{meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg mb-3">Ví dụ:</h3>
                        <ul className="space-y-3">
                          {wordResult.examples.map((example, index) => (
                            <li key={index} className="border-l-2 border-primary pl-4 py-1">
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex flex-col items-center justify-center">
                    {wordResult.imageUrl ? (
                      <img
                        src={wordResult.imageUrl}
                        alt={wordResult.word}
                        className="w-full max-w-sm rounded-lg shadow-lg"
                      />
                    ) : (
                      <div className="w-full max-w-sm aspect-square bg-secondary/30 rounded-lg flex items-center justify-center">
                        <Button
                          onClick={() => generateImage(wordResult.word)}
                          disabled={isGeneratingImage}
                          className="gap-2"
                          size="lg"
                        >
                          <Sparkles className="w-5 h-5" />
                          {isGeneratingImage ? "Đang tạo hình..." : "Tạo hình minh họa AI"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dictionary;