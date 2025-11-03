import { Facebook, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">日本語</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Học tiếng Nhật cùng AI Sensei - Nền tảng học tập hiện đại với công nghệ AI tiên tiến
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên kết nhanh</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                  📚 Lộ trình học
                </a>
              </li>
              <li>
                <a href="/test" className="text-muted-foreground hover:text-primary transition-colors">
                  📝 Kiểm tra trình độ
                </a>
              </li>
              <li>
                <a href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  👥 Cộng đồng
                </a>
              </li>
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  🎯 4 Kỹ năng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Liên hệ</h3>
            <div className="space-y-3 text-sm">
              <a 
                href="https://www.facebook.com/re.hon.rin.2025" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Facebook</span>
              </a>
              <a 
                href="tel:0332796941"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>0332796941 (Zalo)</span>
              </a>
              <a 
                href="mailto:lehonglinhcd2004@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>lehonglinhcd2004@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 日本語 Learning Platform. Made with ❤️ for Japanese learners</p>
          <p className="mt-2">Powered by AI Sensei 🎌</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
