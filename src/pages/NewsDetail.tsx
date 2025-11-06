import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Heart, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string;
  created_at: string;
}

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [news, setNews] = useState<News | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNews();
      if (user) {
        checkIfSaved();
      }
    }
  }, [id, user]);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setNews(data);

      // Fetch related news
      const { data: related, error: relatedError } = await supabase
        .from("news")
        .select("*")
        .eq("category", data.category)
        .neq("id", id)
        .limit(3)
        .order("created_at", { ascending: false });

      if (!relatedError) {
        setRelatedNews(related || []);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Không thể tải tin tức");
      navigate("/news");
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfSaved = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from("saved_news")
        .select("id")
        .eq("user_id", user.id)
        .eq("news_id", id)
        .single();

      if (!error && data) {
        setIsSaved(true);
      }
    } catch (error) {
      // Not saved
    }
  };

  const toggleSave = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu tin tức");
      navigate("/auth");
      return;
    }

    try {
      if (isSaved) {
        const { error } = await supabase
          .from("saved_news")
          .delete()
          .eq("user_id", user.id)
          .eq("news_id", id);

        if (error) throw error;
        setIsSaved(false);
        toast.success("Đã bỏ lưu tin tức");
      } else {
        const { error } = await supabase
          .from("saved_news")
          .insert({ user_id: user.id, news_id: id });

        if (error) throw error;
        setIsSaved(true);
        toast.success("Đã lưu tin tức");
      }
    } catch (error) {
      console.error("Error toggling save:", error);
      toast.error("Có lỗi xảy ra");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news?.title,
          text: news?.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Đã sao chép link");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="max-w-4xl mx-auto animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-1/2 mb-8" />
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy tin tức</h1>
          <Button onClick={() => navigate("/news")}>Quay lại</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <article className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6"
              onClick={() => navigate("/news")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>

            <div className="mb-6">
              <Badge variant="secondary" className="mb-4">
                {news.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {news.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">{news.excerpt}</p>

              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {news.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(news.created_at)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleSave}
                    className={isSaved ? "text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                    {isSaved ? "Đã lưu" : "Lưu"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>

            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
              <ReactMarkdown>{news.content}</ReactMarkdown>
            </div>

            {relatedNews.length > 0 && (
              <div className="mt-12 pt-12 border-t">
                <h2 className="text-2xl font-bold mb-6">Tin tức liên quan</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedNews.map((item) => (
                    <Card
                      key={item.id}
                      className="group hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => navigate(`/news/${item.id}`)}
                    >
                      <CardContent className="p-4">
                        <Badge variant="secondary" className="mb-2 text-xs">
                          {item.category}
                        </Badge>
                        <h3 className="font-bold text-sm mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default NewsDetail;