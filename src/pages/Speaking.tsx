import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Speaking = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();

  const handleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Đang ghi âm",
        description: "Hãy nói một câu tiếng Nhật",
      });
    } else {
      toast({
        title: "Đã dừng ghi âm",
        description: "AI đang phân tích phát âm của bạn...",
      });
    }
  };

  const phrases = [
    {
      id: 1,
      japanese: "こんにちは",
      romaji: "Konnichiwa",
      vietnamese: "Xin chào",
      level: "N5",
    },
    {
      id: 2,
      japanese: "ありがとうございます",
      romaji: "Arigatou gozaimasu",
      vietnamese: "Cảm ơn",
      level: "N5",
    },
    {
      id: 3,
      japanese: "すみません",
      romaji: "Sumimasen",
      vietnamese: "Xin lỗi / Cho tôi hỏi",
      level: "N5",
    },
    {
      id: 4,
      japanese: "お元気ですか",
      romaji: "Ogenki desu ka",
      vietnamese: "Bạn có khỏe không?",
      level: "N4",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Nói <span className="text-primary">会話</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Luyện phát âm chuẩn với AI và thực hành hội thoại
              </p>
            </div>

            {/* Recording Interface */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Ghi âm giọng nói của bạn</CardTitle>
                <CardDescription>
                  Click vào micro để bắt đầu ghi âm và AI sẽ đánh giá phát âm của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-6">
                <Button
                  variant={isRecording ? "destructive" : "hero"}
                  size="lg"
                  className="w-24 h-24 rounded-full"
                  onClick={handleRecording}
                >
                  {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </Button>
                
                <p className="text-center text-muted-foreground">
                  {isRecording ? "Đang ghi âm... Hãy nói một câu tiếng Nhật" : "Nhấn micro để bắt đầu"}
                </p>

                {isRecording && (
                  <div className="w-full space-y-2 animate-fade-in">
                    <div className="flex gap-1 justify-center">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 bg-primary rounded-full animate-pulse"
                          style={{
                            height: `${Math.random() * 32 + 16}px`,
                            animationDelay: `${i * 50}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Practice Phrases */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Cụm từ thực hành</h2>
              <p className="text-muted-foreground">
                Chọn một cụm từ bên dưới và thử phát âm theo
              </p>
              
              <div className="grid gap-4">
                {phrases.map((phrase, idx) => (
                  <Card
                    key={phrase.id}
                    className="hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl">{phrase.japanese}</CardTitle>
                          <CardDescription className="text-base">
                            <span className="text-foreground font-medium">{phrase.romaji}</span>
                            <br />
                            {phrase.vietnamese}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{phrase.level}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        <Mic className="w-4 h-4 mr-2" />
                        Luyện phát âm
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChatBotWidget />
    </div>
  );
};

export default Speaking;
