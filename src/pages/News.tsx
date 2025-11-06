import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, TrendingUp, Sparkles, BookText, BookOpen, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string;
  created_at: string;
  updated_at: string;
}

interface SavedNews {
  news_id: string;
}

const categoryIcons: { [key: string]: any } = {
  "Học tập": TrendingUp,
  "Văn hóa": Sparkles,
  "Công nghệ": BookText,
  "Từ vựng": BookText,
  "Du học": BookOpen,
  "Giải trí": Sparkles,
};

const News = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState<News[]>([]);
  const [savedNews, setSavedNews] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNews();
    if (user) {
      fetchSavedNews();
    }
  }, [user]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Không thể tải tin tức");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedNews = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("saved_news")
        .select("news_id")
        .eq("user_id", user.id);

      if (error) throw error;
      setSavedNews(new Set(data?.map((item: SavedNews) => item.news_id) || []));
    } catch (error) {
      console.error("Error fetching saved news:", error);
    }
  };

  const toggleSaveNews = async (newsId: string) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu tin tức");
      navigate("/auth");
      return;
    }

    try {
      if (savedNews.has(newsId)) {
        const { error } = await supabase
          .from("saved_news")
          .delete()
          .eq("user_id", user.id)
          .eq("news_id", newsId);

        if (error) throw error;
        setSavedNews((prev) => {
          const newSet = new Set(prev);
          newSet.delete(newsId);
          return newSet;
        });
        toast.success("Đã bỏ lưu tin tức");
      } else {
        const { error } = await supabase
          .from("saved_news")
          .insert({ user_id: user.id, news_id: newsId });

        if (error) throw error;
        setSavedNews((prev) => new Set(prev).add(newsId));
        toast.success("Đã lưu tin tức");
      }
    } catch (error) {
      console.error("Error toggling saved news:", error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const categories = ["all", ...Array.from(new Set(news.map((n) => n.category)))];

  const filteredNews = selectedCategory === "all" 
    ? news 
    : news.filter((n) => n.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold text-foreground mb-4">
                Tin Tức 📰
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Cập nhật những tin tức mới nhất về học tiếng Nhật và văn hóa Nhật Bản
              </p>
            </div>

            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === "all" ? "Tất cả" : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <Card key={idx} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 bg-muted rounded-lg mb-3" />
                      <div className="h-4 bg-muted rounded mb-2" />
                      <div className="h-20 bg-muted rounded mb-4" />
                      <div className="h-3 bg-muted rounded w-24" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((newsItem, idx) => {
                  const Icon = categoryIcons[newsItem.category] || TrendingUp;
                  const isSaved = savedNews.has(newsItem.id);

                  return (
                    <Card
                      key={newsItem.id}
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/50 hover:border-primary/30 relative"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`absolute top-4 right-4 z-10 ${
                          isSaved ? "text-red-500" : "text-muted-foreground"
                        } hover:text-red-500 transition-colors`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveNews(newsItem.id);
                        }}
                      >
                        <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
                      </Button>

                      <CardContent
                        className="p-6 cursor-pointer"
                        onClick={() => navigate(`/news/${newsItem.id}`)}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-primary">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <Badge variant="secondary" className="text-xs">
                              {newsItem.category}
                            </Badge>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                          {newsItem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {newsItem.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(newsItem.created_at)}
                          </div>
                          <span className="text-primary group-hover:translate-x-1 transition-transform">
                            Đọc thêm →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {!isLoading && filteredNews.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Không có tin tức nào trong danh mục này.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;