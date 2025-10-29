import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
        variant="hero"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] shadow-2xl z-40 flex flex-col animate-scale-in">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
            <h3 className="font-semibold">AI Sensei 🎌</h3>
            <p className="text-xs opacity-90">Trợ lý học tiếng Nhật của bạn</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="bg-accent p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">
                  こんにちは！Xin chào! Tôi là AI Sensei. Tôi sẽ giúp bạn học tiếng Nhật. 
                  Bạn muốn luyện tập kỹ năng nào hôm nay?
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                placeholder="Nhập tin nhắn..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && setMessage("")}
              />
              <Button size="icon" variant="hero">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Chatbot AI sẽ được kích hoạt sau khi kết nối Lovable Cloud
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBotWidget;
