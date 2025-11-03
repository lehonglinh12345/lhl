import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X, Send, Loader2, Image as ImageIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useJapaneseChat } from "@/hooks/useJapaneseChat";
import { toast } from "sonner";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useJapaneseChat();

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [inputMessage]);

  // Typing effect for last message
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === "assistant") {
      const content = typeof lastMessage.content === "string" 
        ? lastMessage.content 
        : lastMessage.content.find(c => c.type === "text")?.text || "";
      
      if (content !== displayedText) {
        setIsTyping(true);
        setDisplayedText("");
        let currentIndex = 0;
        
        const interval = setInterval(() => {
          if (currentIndex < content.length) {
            setDisplayedText(content.substring(0, currentIndex + 1));
            currentIndex++;
            // Auto scroll to bottom
            if (scrollRef.current) {
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
          } else {
            setIsTyping(false);
            clearInterval(interval);
          }
        }, 30); // Speed of typing effect

        return () => clearInterval(interval);
      }
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB.");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isLoading) return;
    await sendMessage(inputMessage, selectedImage);
    setInputMessage("");
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  return (
    <>
      {/* Floating button */}
      <Button
        data-chat-widget
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
        variant="hero"
        size="icon"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl z-40 flex flex-col animate-scale-in border-2 border-primary/20">
          <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground p-5 rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
            <div className="relative">
              <h3 className="font-bold text-lg flex items-center gap-2">
                AI Sensei <span className="text-2xl">🎌</span>
              </h3>
              <p className="text-xs opacity-90 mt-1">Thầy giáo AI thông minh của bạn</p>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8 px-4">
                  <div className="bg-accent/50 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-accent-foreground/70" />
                  </div>
                  <p className="text-sm font-medium mb-2">Chào mừng đến với AI Sensei! 👋</p>
                  <p className="text-xs opacity-75">Hãy bắt đầu cuộc trò chuyện bằng cách hỏi về bất kỳ điều gì liên quan đến tiếng Nhật!</p>
                  <div className="mt-4 space-y-2 text-xs">
                    <div className="bg-primary/10 rounded-lg p-2 text-left">
                      <p className="font-medium text-primary">💡 Gợi ý:</p>
                      <p className="opacity-75">"Giải thích ngữ pháp は và が"</p>
                    </div>
                    <div className="bg-primary/10 rounded-lg p-2 text-left">
                      <p className="opacity-75">"Từ vựng về gia đình trong tiếng Nhật"</p>
                    </div>
                  </div>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2 animate-fade-in ${
                    msg.role === "assistant" ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    msg.role === "assistant" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {msg.role === "assistant" ? "先" : "学"}
                  </div>
                  <div
                    className={`p-3 rounded-lg max-w-[80%] shadow-sm ${
                      msg.role === "assistant"
                        ? "bg-accent text-accent-foreground border border-border/50"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {typeof msg.content === "string" ? (
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {msg.role === "assistant" && idx === messages.length - 1 ? displayedText : msg.content}
                        {msg.role === "assistant" && idx === messages.length - 1 && isTyping && (
                          <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                        )}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {msg.content.map((item, i) => (
                          item.type === "text" ? (
                            <p key={i} className="text-sm whitespace-pre-wrap leading-relaxed">
                              {idx === messages.length - 1 ? displayedText : item.text}
                              {idx === messages.length - 1 && isTyping && (
                                <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse" />
                              )}
                            </p>
                          ) : (
                            <img key={i} src={item.image_url?.url} alt="Uploaded" className="max-w-full rounded-lg" />
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">AI Sensei đang suy nghĩ...</span>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border space-y-2">
            {selectedImage && (
              <div className="relative inline-block">
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="max-h-20 rounded-lg border-2 border-primary"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs hover:scale-110 transition-transform"
                >
                  ×
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                size="icon"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                title="Gửi ảnh"
                className="self-end"
              >
                <ImageIcon className="w-4 h-4" />
              </Button>
              <Textarea
                ref={textareaRef}
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                disabled={isLoading}
                className="min-h-[40px] max-h-[120px] resize-none"
                rows={1}
              />
              <Button 
                size="icon" 
                variant="hero" 
                onClick={handleSend} 
                disabled={isLoading || (!inputMessage.trim() && !selectedImage)}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBotWidget;
