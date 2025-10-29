import Navbar from "@/components/Navbar";
import SkillCard from "@/components/SkillCard";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Button } from "@/components/ui/button";
import { Headphones, Mic, BookText, PenTool } from "lucide-react";
import heroImage from "@/assets/hero-japanese.jpg";

const Index = () => {
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

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20 animate-scale-in">
              <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-foreground">
                  AI Sensei - Gia sư tiếng Nhật 24/7 🎌
                </h3>
                <p className="text-lg text-muted-foreground">
                  Chatbot AI thông minh giúp bạn luyện tập mọi lúc, mọi nơi. 
                  Chữa lỗi tức thì, giải đáp thắc mắc và tạo bài tập phù hợp với trình độ.
                </p>
                <Button variant="hero" size="lg" className="text-lg px-8">
                  Trò Chuyện Với AI Sensei
                </Button>
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
