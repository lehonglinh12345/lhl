import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          <BookOpen className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">
            NihonGo <span className="text-primary">Plus</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          {!isHome && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Trang Chủ</span>
            </Button>
          )}
          
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/listening")}
              className={location.pathname === "/listening" ? "text-primary" : ""}
            >
              Nghe
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/speaking")}
              className={location.pathname === "/speaking" ? "text-primary" : ""}
            >
              Nói
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/reading")}
              className={location.pathname === "/reading" ? "text-primary" : ""}
            >
              Đọc
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/writing")}
              className={location.pathname === "/writing" ? "text-primary" : ""}
            >
              Viết
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
