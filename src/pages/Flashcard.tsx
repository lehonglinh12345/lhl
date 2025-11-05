import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { 
  BookMarked, 
  RotateCcw, 
  Trash2, 
  Volume2, 
  ChevronLeft, 
  ChevronRight,
  Brain,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface VocabularyCard {
  id: string;
  word: string;
  reading: string;
  meaning: string;
  example: string | null;
  image_url: string | null;
  mastery_level: number;
  review_count: number;
  last_reviewed_at: string | null;
}

const Flashcard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cards, setCards] = useState<VocabularyCard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterLevel, setFilterLevel] = useState<number | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchCards();
  }, [user, filterLevel]);

  const fetchCards = async () => {
    try {
      let query = supabase
        .from("saved_vocabulary")
        .select("*")
        .order("created_at", { ascending: false });

      if (filterLevel !== null) {
        query = query.eq("mastery_level", filterLevel);
      }

      const { data, error } = await query;

      if (error) throw error;
      setCards(data || []);
    } catch (error: any) {
      console.error("Error fetching cards:", error);
      toast.error("Không thể tải flashcard");
    } finally {
      setLoading(false);
    }
  };

  const updateMasteryLevel = async (cardId: string, level: number) => {
    try {
      const { error } = await supabase
        .from("saved_vocabulary")
        .update({
          mastery_level: level,
          last_reviewed_at: new Date().toISOString(),
          review_count: cards[currentIndex].review_count + 1
        })
        .eq("id", cardId);

      if (error) throw error;

      setCards(prev => prev.map(card => 
        card.id === cardId 
          ? { ...card, mastery_level: level, review_count: card.review_count + 1 }
          : card
      ));

      toast.success("Đã cập nhật độ thành thạo!");
      nextCard();
    } catch (error) {
      console.error("Error updating mastery:", error);
      toast.error("Không thể cập nhật");
    }
  };

  const deleteCard = async (cardId: string) => {
    try {
      const { error } = await supabase
        .from("saved_vocabulary")
        .delete()
        .eq("id", cardId);

      if (error) throw error;

      setCards(prev => prev.filter(card => card.id !== cardId));
      if (currentIndex >= cards.length - 1) {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
      toast.success("Đã xóa từ vựng!");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Không thể xóa");
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    speechSynthesis.speak(utterance);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const getMasteryColor = (level: number) => {
    switch (level) {
      case 0: return "bg-gray-500";
      case 1: return "bg-yellow-500";
      case 2: return "bg-blue-500";
      case 3: return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getMasteryLabel = (level: number) => {
    switch (level) {
      case 0: return "Mới";
      case 1: return "Đang học";
      case 2: return "Quen thuộc";
      case 3: return "Thành thạo";
      default: return "Mới";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-2xl mx-auto text-center">
            <BookMarked className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Chưa có từ vựng nào</h2>
            <p className="text-muted-foreground mb-6">
              Hãy thêm từ vựng từ trang Từ Điển để bắt đầu học với Flashcard!
            </p>
            <Button onClick={() => navigate("/dictionary")}>
              Đi đến Từ Điển
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">
                Flashcard <span className="text-primary">Từ Vựng</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              {currentIndex + 1} / {cards.length} từ
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Button
              variant={filterLevel === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterLevel(null)}
            >
              Tất cả ({cards.length})
            </Button>
            {[0, 1, 2, 3].map(level => (
              <Button
                key={level}
                variant={filterLevel === level ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterLevel(level)}
                className={filterLevel === level ? getMasteryColor(level) : ""}
              >
                {getMasteryLabel(level)}
              </Button>
            ))}
          </div>

          {/* Flashcard */}
          <div className="relative mb-8" style={{ minHeight: "500px" }}>
            <div 
              className="absolute inset-0 cursor-pointer"
              style={{ perspective: "1000px" }}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
                }}
              >
                {/* Front */}
                <Card 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <CardContent className="p-12 text-center">
                    <Badge className={`mb-4 ${getMasteryColor(currentCard.mastery_level)}`}>
                      {getMasteryLabel(currentCard.mastery_level)}
                    </Badge>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <h2 className="text-6xl font-bold">{currentCard.word}</h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          speak(currentCard.word);
                        }}
                      >
                        <Volume2 className="w-6 h-6 text-primary" />
                      </Button>
                    </div>
                    <p className="text-2xl text-muted-foreground mb-8">{currentCard.reading}</p>
                    <p className="text-sm text-muted-foreground">Nhấn để xem nghĩa</p>
                  </CardContent>
                </Card>

                {/* Back */}
                <Card 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ 
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)"
                  }}
                >
                  <CardContent className="p-12 w-full">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-bold mb-4">{currentCard.word}</h3>
                      <p className="text-xl mb-4">{currentCard.meaning}</p>
                      {currentCard.example && (
                        <div className="bg-secondary/50 p-4 rounded-lg">
                          <p className="text-sm text-muted-foreground mb-1">Ví dụ:</p>
                          <p className="text-base">{currentCard.example}</p>
                        </div>
                      )}
                    </div>
                    {currentCard.image_url && (
                      <img 
                        src={currentCard.image_url} 
                        alt={currentCard.word}
                        className="max-w-xs mx-auto rounded-lg"
                      />
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <Button
              variant="outline"
              onClick={prevCard}
              disabled={cards.length <= 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Trước
            </Button>

            <Button
              variant="ghost"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Lật thẻ
            </Button>

            <Button
              variant="outline"
              onClick={nextCard}
              disabled={cards.length <= 1}
            >
              Sau
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Button
              variant="outline"
              onClick={() => updateMasteryLevel(currentCard.id, 0)}
              className="border-gray-500"
            >
              Mới
            </Button>
            <Button
              variant="outline"
              onClick={() => updateMasteryLevel(currentCard.id, 1)}
              className="border-yellow-500"
            >
              Đang học
            </Button>
            <Button
              variant="outline"
              onClick={() => updateMasteryLevel(currentCard.id, 2)}
              className="border-blue-500"
            >
              Quen
            </Button>
            <Button
              variant="outline"
              onClick={() => updateMasteryLevel(currentCard.id, 3)}
              className="border-green-500"
            >
              Thành thạo
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteCard(currentCard.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Xóa
            </Button>
          </div>

          {/* Stats */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Đã ôn</p>
                  <p className="text-2xl font-bold">{currentCard.review_count}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tổng từ</p>
                  <p className="text-2xl font-bold">{cards.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Thành thạo</p>
                  <p className="text-2xl font-bold text-green-500">
                    {cards.filter(c => c.mastery_level === 3).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Flashcard;
