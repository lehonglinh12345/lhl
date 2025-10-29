import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Listening = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Giới thiệu bản thân",
      level: "N5",
      duration: "3:24",
      description: "Học cách giới thiệu tên, tuổi và nghề nghiệp bằng tiếng Nhật",
    },
    {
      id: 2,
      title: "Mua sắm ở cửa hàng",
      level: "N4",
      duration: "5:12",
      description: "Hội thoại thực tế khi mua đồ ở cửa hàng tiện lợi",
    },
    {
      id: 3,
      title: "Hỏi đường",
      level: "N4",
      duration: "4:35",
      description: "Cách hỏi đường và hiểu chỉ dẫn bằng tiếng Nhật",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Nghe <span className="text-primary">聴解</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Rèn luyện khả năng nghe hiểu tiếng Nhật qua các bài tập thực tế
              </p>
            </div>

            {/* Audio Player */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle>Đang phát: Giới thiệu bản thân (N5)</CardTitle>
                <CardDescription>こんにちは、私は田中です。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={progress} className="h-2" />
                
                <div className="flex items-center justify-center gap-4">
                  <Button variant="outline" size="icon">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-16 h-16 rounded-full"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  0:00 / 3:24
                </div>
              </CardContent>
            </Card>

            {/* Lessons List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Bài học Listening</h2>
              {lessons.map((lesson, idx) => (
                <Card
                  key={lesson.id}
                  className="hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{lesson.title}</CardTitle>
                        <CardDescription>{lesson.description}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-semibold">
                          {lesson.level}
                        </span>
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <Play className="w-4 h-4 mr-2" />
                      Bắt đầu học
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Listening;
