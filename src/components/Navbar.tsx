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
import { BookOpen, Home, Users, LogIn, LogOut, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

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
          
          <div className="hidden md:flex items-center gap-2">
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/community")}
              className={location.pathname === "/community" ? "text-primary" : ""}
            >
              <Users className="w-4 h-4 mr-1" />
              Cộng đồng
            </Button>
          </div>
          
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
                <DropdownMenuItem onClick={() => navigate("/community")}>
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
