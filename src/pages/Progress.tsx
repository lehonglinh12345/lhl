import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { 
  TrendingUp, 
  BookOpen, 
  CheckCircle2, 
  Clock,
  Target,
  Award,
  Calendar
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonProgress {
  lesson_id: string;
  lesson_number: number;
  title: string;
  level: string;
  status: string;
  completion_percentage: number;
  last_studied_at: string | null;
  estimated_hours: number;
}

interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  totalHours: number;
  studiedHours: number;
  byLevel: {
    [key: string]: {
      total: number;
      completed: number;
      inProgress: number;
    };
  };
}

const Progress = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<LessonProgress[]>([]);
  const [stats, setStats] = useState<ProgressStats>({
    totalLessons: 0,
    completedLessons: 0,
    inProgressLessons: 0,
    totalHours: 0,
    studiedHours: 0,
    byLevel: {}
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProgress();
  }, [user]);

  const fetchProgress = async () => {
    try {
      // Fetch all lessons
      const { data: lessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("*")
        .order("level", { ascending: true })
        .order("lesson_number", { ascending: true });

      if (lessonsError) throw lessonsError;

      // Fetch user progress
      const { data: userProgress, error: progressError } = await supabase
        .from("user_progress")
        .select("*");

      if (progressError) throw progressError;

      // Combine lessons with progress
      const progressMap = new Map(
        userProgress?.map(p => [p.lesson_id, p]) || []
      );

      const combined: LessonProgress[] = lessons?.map(lesson => {
        const prog = progressMap.get(lesson.id);
        return {
          lesson_id: lesson.id,
          lesson_number: lesson.lesson_number,
          title: lesson.title,
          level: lesson.level,
          status: prog?.status || "not_started",
          completion_percentage: prog?.completion_percentage || 0,
          last_studied_at: prog?.last_studied_at || null,
          estimated_hours: lesson.estimated_hours
        };
      }) || [];

      setProgress(combined);

      // Calculate stats
      const levelStats: { [key: string]: { total: number; completed: number; inProgress: number } } = {};
      let totalCompleted = 0;
      let totalInProgress = 0;
      let totalStudiedHours = 0;

      combined.forEach(item => {
        if (!levelStats[item.level]) {
          levelStats[item.level] = { total: 0, completed: 0, inProgress: 0 };
        }
        levelStats[item.level].total++;

        if (item.status === "completed") {
          levelStats[item.level].completed++;
          totalCompleted++;
          totalStudiedHours += item.estimated_hours;
        } else if (item.status === "in_progress") {
          levelStats[item.level].inProgress++;
          totalInProgress++;
          totalStudiedHours += item.estimated_hours * (item.completion_percentage / 100);
        }
      });

      setStats({
        totalLessons: combined.length,
        completedLessons: totalCompleted,
        inProgressLessons: totalInProgress,
        totalHours: combined.reduce((sum, l) => sum + l.estimated_hours, 0),
        studiedHours: Math.round(totalStudiedHours),
        byLevel: levelStats
      });

    } catch (error: any) {
      console.error("Error fetching progress:", error);
      toast.error("Không thể tải tiến độ");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500";
      case "in_progress": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Hoàn thành";
      case "in_progress": return "Đang học";
      default: return "Chưa học";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <p className="text-lg text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold">
                Tiến Độ <span className="text-primary">Học Tập</span>
              </h1>
            </div>
            <p className="text-muted-foreground">Theo dõi quá trình học tiếng Nhật của bạn</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{stats.totalLessons}</p>
                <p className="text-sm text-muted-foreground">Tổng bài học</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold text-green-500">{stats.completedLessons}</p>
                <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold text-blue-500">{stats.inProgressLessons}</p>
                <p className="text-sm text-muted-foreground">Đang học</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold text-orange-500">
                  {stats.studiedHours}/{stats.totalHours}h
                </p>
                <p className="text-sm text-muted-foreground">Giờ học</p>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Tiến Độ Tổng Thể
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Hoàn thành</span>
                    <span className="text-sm font-medium">
                      {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={(stats.completedLessons / stats.totalLessons) * 100} 
                    className="h-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress by Level */}
          <Tabs defaultValue="N5" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="N5">N5</TabsTrigger>
              <TabsTrigger value="N4">N4</TabsTrigger>
              <TabsTrigger value="N3">N3</TabsTrigger>
              <TabsTrigger value="N2">N2</TabsTrigger>
            </TabsList>

            {["N5", "N4", "N3", "N2"].map(level => {
              const levelProgress = progress.filter(p => p.level === level);
              const levelStat = stats.byLevel[level] || { total: 0, completed: 0, inProgress: 0 };

              return (
                <TabsContent key={level} value={level}>
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Trình độ {level}</CardTitle>
                        <Badge variant="outline">
                          {levelStat.completed}/{levelStat.total} bài
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-6">
                        <ProgressBar 
                          value={levelStat.total > 0 ? (levelStat.completed / levelStat.total) * 100 : 0} 
                          className="h-2"
                        />
                      </div>

                      <div className="space-y-3">
                        {levelProgress.map(lesson => (
                          <div 
                            key={lesson.lesson_id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <span className="font-semibold">Bài {lesson.lesson_number}</span>
                                <span>{lesson.title}</span>
                                <Badge className={getStatusColor(lesson.status)}>
                                  {getStatusLabel(lesson.status)}
                                </Badge>
                              </div>
                              {lesson.status !== "not_started" && (
                                <ProgressBar 
                                  value={lesson.completion_percentage} 
                                  className="h-1.5 max-w-xs"
                                />
                              )}
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              {lesson.last_studied_at && (
                                <p className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(lesson.last_studied_at).toLocaleDateString("vi-VN")}
                                </p>
                              )}
                              <p>{lesson.estimated_hours}h</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Progress;
