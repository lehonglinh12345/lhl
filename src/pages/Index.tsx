import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Button } from "@/components/ui/button";
import { Headphones, Mic, BookText, PenTool, MessageCircle, Sparkles, Zap, Brain } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-japanese.jpg";

const Index = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const aiFeatures = [
    {
      icon: Brain,
      title: "Trí tuệ thông minh",
      description: "Phân tích và đánh giá chính xác trình độ của bạn"
    },
    {
      icon: Zap,
      title: "Phản hồi tức thì",
      description: "Chữa lỗi và giải đáp ngay lập tức 24/7"
    },
    {
      icon: Sparkles,
      title: "Cá nhân hóa",
      description: "Bài tập được thiết kế riêng cho bạn"
    }
  ];

  const exampleMessages = [
    { type: "user", text: "こんにちは là gì?" },
    { type: "ai", text: "こんにちは (konnichiwa) nghĩa là 'Xin chào' đấy! 🎌" },
    { type: "user", text: "Giải thích ngữ pháp は và が?" },
    { type: "ai", text: "Hay quá! Để sensei phân tích chi tiết nhé... ✨" }
  ];

  const skills = [
    {
      icon: Headphones,
      title: "Nghe",
      titleJp: "聴解",
      description: "Rèn luyện khả năng nghe hiểu tiếng Nhật qua các bài tập thực tế và phim ảnh",
      delay: 0,
      link: "/listening",
    },
    {
      icon: Mic,
      title: "Nói",
      titleJp: "会話",
      description: "Luyện phát âm chuẩn với AI và thực hành hội thoại hàng ngày",
      delay: 100,
      link: "/speaking",
    },
    {
      icon: BookText,
      title: "Đọc",
      titleJp: "読解",
      description: "Nâng cao khả năng đọc hiểu từ Hiragana đến Kanji phức tạp",
      delay: 200,
      link: "/reading",
    },
    {
      icon: PenTool,
      title: "Viết",
      titleJp: "作文",
      description: "Học cách viết từ cơ bản đến nâng cao với sự trợ giúp của AI",
      delay: 300,
      link: "/writing",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                日本語
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Học Tiếng Nhật
              <br />
              <span className="text-primary">Cùng AI Sensei</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nền tảng học tiếng Nhật hiện đại với chatbot AI thông minh. 
              Luyện tập cả 4 kỹ năng: Nghe, Nói, Đọc, Viết mọi lúc mọi nơi.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8">
                Bắt Đầu Học Ngay
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Xem Thêm
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              4 Kỹ Năng <span className="text-primary">完璧</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Phát triển toàn diện khả năng tiếng Nhật của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {skills.map((skill) => (
              <SkillCard key={skill.title} {...skill} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Sensei Section - Enhanced */}
      <section className="py-20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-accent/10 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="font-semibold">Powered by AI</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                AI Sensei - Gia sư tiếng Nhật 24/7 🎌
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chatbot AI thông minh giúp bạn luyện tập mọi lúc, mọi nơi
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Example Chat */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg animate-slide-up">
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-foreground">Ví dụ tương tác</span>
                </div>
                <div className="space-y-3">
                  {exampleMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      style={{ animationDelay: `${idx * 300}ms` }}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground border border-border'
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-400" />
                  </div>
                  <span>AI đang suy nghĩ...</span>
                </div>
              </div>

              {/* Right: Features & CTA */}
              <div className="space-y-6">
                {aiFeatures.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10 hover:border-primary/30 transition-all animate-fade-in hover:scale-105"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full text-lg px-8 group"
                    onClick={() => {
                      const chatWidget = document.querySelector('[data-chat-widget]') as HTMLElement;
                      if (chatWidget) {
                        chatWidget.click();
                      }
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Trò Chuyện Với AI Sensei Ngay
                  </Button>
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    💬 Miễn phí · Không cần đăng ký · Phản hồi tức thì
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ChatBotWidget />
    </div>
  );
};

export default Index;
