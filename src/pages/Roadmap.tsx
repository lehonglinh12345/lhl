import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, GraduationCap, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Lesson {
  id: string;
  level: string;
  lesson_number: number;
  title: string;
  description: string;
  content: any;
  vocabulary: any;
  grammar_points: any;
  estimated_hours: number;
}

const Roadmap = () => {
  const [lessons, setLessons] = useState<{ [key: string]: Lesson[] }>({});
  const [loading, setLoading] = useState(true);
  const [activeLevel, setActiveLevel] = useState("N5");

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase
        .from("lessons")
        .select("*")
        .order("lesson_number", { ascending: true });

      if (error) throw error;

      // Group lessons by level
      const groupedLessons: { [key: string]: Lesson[] } = {};
      
      data?.forEach((lesson) => {
        if (!groupedLessons[lesson.level]) {
          groupedLessons[lesson.level] = [];
        }
        groupedLessons[lesson.level].push({
          ...lesson,
          vocabulary: Array.isArray(lesson.vocabulary) ? lesson.vocabulary : [],
          grammar_points: Array.isArray(lesson.grammar_points) ? lesson.grammar_points : [],
        });
      });

      setLessons(groupedLessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  const levels = ["N5", "N4", "N3", "N2", "N1"];
  const levelDescriptions: { [key: string]: string } = {
    N5: "Cơ bản - Hiểu được Hiragana, Katakana và ~100 Kanji cơ bản",
    N4: "Sơ cấp - Có thể đọc hiểu văn bản đơn giản với ~300 Kanji",
    N3: "Trung cấp - Hiểu tiếng Nhật thường ngày với ~600 Kanji",
    N2: "Trung cao cấp - Giao tiếp thành thạo với ~1000 Kanji",
    N1: "Cao cấp - Thành thạo tiếng Nhật với ~2000 Kanji",
  };

  const levelColors: { [key: string]: string } = {
    N5: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    N4: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20",
    N3: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
    N2: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
    N1: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <GraduationCap className="w-10 h-10 text-primary" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Lộ Trình Học Tiếng Nhật
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Hành trình từ N5 đến N1 - Chinh phục tiếng Nhật bài bản với giáo trình chi tiết
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Tabs value={activeLevel} onValueChange={setActiveLevel} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-2">
                {levels.map((level) => (
                  <TabsTrigger 
                    key={level} 
                    value={level} 
                    className="text-sm py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-lg">{level}</span>
                      <span className="text-xs opacity-75">
                        {lessons[level]?.length || 0} bài
                      </span>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              {levels.map((level) => (
                <TabsContent key={level} value={level} className="space-y-6">
                  <Card className={`border-2 ${levelColors[level]}`}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <Badge variant="outline" className="text-base px-3 py-1">
                          {level}
                        </Badge>
                        {levelDescriptions[level]}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4" />
                        Tổng thời gian: ~{lessons[level]?.reduce((sum, l) => sum + l.estimated_hours, 0) || 0} giờ
                      </CardDescription>
                    </CardHeader>
                  </Card>

                  {lessons[level] && lessons[level].length > 0 ? (
                    <Accordion type="single" collapsible className="space-y-4">
                      {lessons[level].map((lesson) => (
                        <AccordionItem 
                          key={lesson.id} 
                          value={lesson.id}
                          className="border-2 border-border rounded-lg px-4 hover:border-primary/50 transition-colors"
                        >
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <Badge variant="secondary" className="shrink-0">
                                Bài {lesson.lesson_number}
                              </Badge>
                              <div>
                                <h3 className="font-semibold text-lg">{lesson.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {lesson.description}
                                </p>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pt-4 space-y-6">
                            {/* Vocabulary */}
                            {lesson.vocabulary && Array.isArray(lesson.vocabulary) && lesson.vocabulary.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <BookOpen className="w-4 h-4 text-primary" />
                                  Từ vựng ({lesson.vocabulary.length} từ)
                                </h4>
                                <div className="grid gap-2">
                                  {lesson.vocabulary.map((vocab: any, idx: number) => (
                                    <div key={idx} className="bg-accent/50 rounded-lg p-3 border border-border">
                                      <div className="flex items-baseline gap-2">
                                        <span className="font-bold text-lg">{vocab.word}</span>
                                        <span className="text-sm text-muted-foreground">({vocab.reading})</span>
                                      </div>
                                      <p className="text-sm mt-1">{vocab.meaning}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Grammar Points */}
                            {lesson.grammar_points && Array.isArray(lesson.grammar_points) && lesson.grammar_points.length > 0 && (
                              <div className="space-y-3">
                                <h4 className="font-semibold flex items-center gap-2">
                                  <GraduationCap className="w-4 h-4 text-primary" />
                                  Điểm ngữ pháp
                                </h4>
                                <div className="space-y-3">
                                  {lesson.grammar_points.map((grammar: any, idx: number) => (
                                    <div key={idx} className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                                      <h5 className="font-semibold mb-2">{grammar.point}</h5>
                                      {grammar.examples && grammar.examples.length > 0 && (
                                        <div className="space-y-1 mt-2">
                                          {grammar.examples.map((example: string, exIdx: number) => (
                                            <div key={exIdx} className="text-sm bg-background/50 rounded px-3 py-2">
                                              {example}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Estimated Time */}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t">
                              <Clock className="w-4 h-4" />
                              Thời gian ước tính: {lesson.estimated_hours} giờ
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <Card>
                      <CardContent className="py-12 text-center text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Chưa có bài học cho cấp độ này</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </main>

      <ChatBotWidget />
      <Footer />
    </div>
  );
};

export default Roadmap;
