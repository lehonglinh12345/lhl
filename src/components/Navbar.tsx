import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">
            NihonGo <span className="text-primary">Plus</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#skills" className="text-foreground hover:text-primary transition-colors">
            Kỹ Năng
          </a>
          <a href="#practice" className="text-foreground hover:text-primary transition-colors">
            Luyện Tập
          </a>
          <a href="#about" className="text-foreground hover:text-primary transition-colors">
            Về Chúng Tôi
          </a>
        </div>

        <Button variant="default" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          Chatbot AI
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
