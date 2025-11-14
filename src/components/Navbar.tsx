import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, Home, Users, LogIn, LogOut, User, Map, ClipboardCheck, BookMarked, Brain, TrendingUp, Newspaper, Menu } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
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

        {/* Mobile Menu */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="start" className="w-48">
              <DropdownMenuItem 
                onClick={() => navigate("/")} 
                className={location.pathname === "/" ? "bg-accent text-accent-foreground" : ""}
              >
                <Home className="w-4 h-4 mr-2" />
                Trang Chủ
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/community")} 
                className={location.pathname === "/community" ? "bg-accent text-accent-foreground" : ""}
              >
                <Users className="w-4 h-4 mr-2" />
                Cộng đồng
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/roadmap")} 
                className={location.pathname === "/roadmap" ? "bg-accent text-accent-foreground" : ""}
              >
                <Map className="w-4 h-4 mr-2" />
                Lộ trình
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/test")} 
                className={location.pathname === "/test" ? "bg-accent text-accent-foreground" : ""}
              >
                <ClipboardCheck className="w-4 h-4 mr-2" />
                Kiểm tra
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/dictionary")} 
                className={location.pathname === "/dictionary" ? "bg-accent text-accent-foreground" : ""}
              >
                <BookMarked className="w-4 h-4 mr-2" />
                Từ điển
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/news")} 
                className={location.pathname.startsWith("/news") ? "bg-accent text-accent-foreground" : ""}
              >
                <Newspaper className="w-4 h-4 mr-2" />
                Tin tức
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/flashcard")} 
                className={location.pathname === "/flashcard" ? "bg-accent text-accent-foreground" : ""}
              >
                <Brain className="w-4 h-4 mr-2" />
                Flashcard
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => navigate("/progress")} 
                className={location.pathname === "/progress" ? "bg-accent text-accent-foreground" : ""}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Tiến độ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4">
          {!isHome && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="hidden md:block gap-2"
            >
              <Home className="w-4 h-4" />
              <span className="hidden md:inline">Trang Chủ</span>
            </Button>
          )}
          
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/community")}
              className={location.pathname === "/community" ? "text-primary" : ""}
            >
              <Users className="w-4 h-4 mr-1" />
              Cộng đồng
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/roadmap")}
              className={location.pathname === "/roadmap" ? "text-primary" : ""}
            >
              <Map className="w-4 h-4 mr-1" />
              Lộ trình
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/test")}
              className={location.pathname === "/test" ? "text-primary" : ""}
            >
              <ClipboardCheck className="w-4 h-4 mr-1" />
              Kiểm tra
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/dictionary")}
              className={location.pathname === "/dictionary" ? "text-primary" : ""}
            >
              <BookMarked className="w-4 h-4 mr-1" />
              Từ điển
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/news")}
              className={location.pathname.startsWith("/news") ? "text-primary" : ""}
            >
              <Newspaper className="w-4 h-4 mr-1" />
              Tin tức
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/flashcard")}
              className={location.pathname === "/flashcard" ? "text-primary" : ""}
            >
              <Brain className="w-4 h-4 mr-1" />
              Flashcard
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/progress")}
              className={location.pathname === "/progress" ? "text-primary" : ""}
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Tiến độ
            </Button>
          </div>
          
          <ThemeToggle />
          <NotificationBell />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-xs">
                      {user.email?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline">{user.email?.split('@')[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="default" 
              size="sm"
              onClick={() => navigate("/auth")}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Đăng nhập
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;