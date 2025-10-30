import { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Writing = () => {
  const [essay, setEssay] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (essay.length < 50) {
      toast({
        title: "Bài viết quá ngắn",
        description: "Vui lòng viết ít nhất 50 ký tự",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Đã gửi bài",
      description: "AI đang chấm bài của bạn...",
    });
  };

  const exercises = [
    {
      id: 1,
      title: "Viết về bản thân",
      level: "N5",
      prompt: "あなたの名前、年齢、趣味について書いてください。",
      promptVn: "Hãy viết về tên, tuổi và sở thích của bạn.",
      minChars: 100,
    },
    {
      id: 2,
      title: "Mô tả một ngày trong tuần",
      level: "N4",
      prompt: "あなたの一日の生活について書いてください。",
      promptVn: "Hãy viết về một ngày trong cuộc sống của bạn.",
      minChars: 150,
    },
    {
      id: 3,
      title: "Kế hoạch du lịch",
      level: "N3",
      prompt: "日本への旅行計画について書いてください。",
      promptVn: "Hãy viết về kế hoạch du lịch Nhật Bản của bạn.",
      minChars: 200,
    },
  ];

  const hiraganaChart = [
    { romaji: "a", char: "あ" },
    { romaji: "i", char: "い" },
    { romaji: "u", char: "う" },
    { romaji: "e", char: "え" },
    { romaji: "o", char: "お" },
    { romaji: "ka", char: "か" },
    { romaji: "ki", char: "き" },
    { romaji: "ku", char: "く" },
    { romaji: "ke", char: "け" },
    { romaji: "ko", char: "こ" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Viết <span className="text-primary">作文</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Học cách viết từ cơ bản đến nâng cao với sự trợ giúp của AI
              </p>
            </div>

            {/* Writing Editor */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Viết bài luận của bạn</CardTitle>
                <CardDescription>
                  Viết bằng tiếng Nhật và AI sẽ chấm và góp ý cho bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="ここに日本語で書いてください... (Viết tiếng Nhật ở đây...)"
                  value={essay}
                  onChange={(e) => setEssay(e.target.value)}
                  className="min-h-[200px] font-japanese text-lg"
                />
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {essay.length} ký tự
                  </span>
                  <Button variant="hero" onClick={handleSubmit}>
                    <Check className="w-4 h-4 mr-2" />
                    Chấm bài với AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Writing Exercises */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Bài tập viết</h2>
              {exercises.map((exercise, idx) => (
                <Card
                  key={exercise.id}
                  className="hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle>{exercise.title}</CardTitle>
                        <CardDescription>
                          <span className="block text-foreground mb-1">{exercise.prompt}</span>
                          <span className="block italic">{exercise.promptVn}</span>
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{exercise.level}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tối thiểu: {exercise.minChars} ký tự
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <PenTool className="w-4 h-4 mr-2" />
                      Bắt đầu viết
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Hiragana Quick Reference */}
            <Card>
              <CardHeader>
                <CardTitle>Bảng Hiragana tham khảo</CardTitle>
                <CardDescription>
                  Nháy chuột để sao chép ký tự vào bài viết
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {hiraganaChart.map((item) => (
                    <Button
                      key={item.romaji}
                      variant="outline"
                      className="h-16 text-2xl"
                      onClick={() => setEssay(essay + item.char)}
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-primary">{item.char}</span>
                        <span className="text-xs text-muted-foreground">{item.romaji}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <ChatBotWidget />
    </div>
  );
};

export default Writing;
