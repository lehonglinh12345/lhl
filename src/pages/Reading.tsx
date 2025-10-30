import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Reading = () => {
  const articles = [
    {
      id: 1,
      title: "私の家族",
      titleVn: "Gia đình tôi",
      level: "N5",
      excerpt: "私は田中です。家族は四人です。父と母と兄がいます。",
      kanji: 12,
      difficulty: "Dễ",
    },
    {
      id: 2,
      title: "日本の四季",
      titleVn: "Bốn mùa ở Nhật Bản",
      level: "N4",
      excerpt: "日本には春、夏、秋、冬という四つの季節があります。それぞれの季節に美しい風景があります。",
      kanji: 24,
      difficulty: "Trung bình",
    },
    {
      id: 3,
      title: "東京の生活",
      titleVn: "Cuộc sống ở Tokyo",
      level: "N3",
      excerpt: "東京は日本の首都です。人口が多く、とても便利な都市です。しかし、生活費が高いという問題もあります。",
      kanji: 35,
      difficulty: "Khó",
    },
  ];

  const kanjiLessons = [
    { kanji: "日", reading: "ニチ、ジツ、ひ、か", meaning: "Mặt trời, ngày" },
    { kanji: "本", reading: "ホン、もと", meaning: "Sách, gốc" },
    { kanji: "人", reading: "ジン、ニン、ひと", meaning: "Người" },
    { kanji: "月", reading: "ゲツ、ガツ、つき", meaning: "Mặt trăng, tháng" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Đọc <span className="text-primary">読解</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Nâng cao khả năng đọc hiểu từ Hiragana đến Kanji phức tạp
              </p>
            </div>

            {/* Reading Articles */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Bài đọc hiểu</h2>
              {articles.map((article, idx) => (
                <Card
                  key={article.id}
                  className="hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <CardTitle className="text-2xl">
                          {article.title}
                          <span className="text-base text-muted-foreground ml-2">
                            ({article.titleVn})
                          </span>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge variant="secondary">{article.level}</Badge>
                        <Badge variant="outline">{article.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground pt-2">
                      <span>📝 {article.kanji} Kanji</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Đọc bài
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Kanji Practice */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Học Kanji</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {kanjiLessons.map((lesson, idx) => (
                  <Card
                    key={idx}
                    className="hover:shadow-lg transition-all animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CardContent className="pt-6">
                      <div className="text-center space-y-4">
                        <div className="text-6xl font-bold text-primary">
                          {lesson.kanji}
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Âm đọc:</span> {lesson.reading}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Nghĩa:</span> {lesson.meaning}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          Luyện viết
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <ChatBotWidget />
    </div>
  );
};

export default Reading;
