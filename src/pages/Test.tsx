import { useState } from "react";
import Navbar from "@/components/Navbar";
import ChatBotWidget from "@/components/ChatBotWidget";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  tip: string;
  level: string;
}

const testQuestions: Question[] = [
  {
    id: 1,
    question: "これは___ですか？",
    options: ["なに", "なん", "どれ", "どこ"],
    correct: 1,
    explanation: "Trước 'です' ta dùng 'なん' (nan) thay vì 'なに' (nani). 'なん' là biến thể của 'なに' được dùng trước một số từ như です, の, etc.",
    tip: "Ghi nhớ: なに + です = なんです. Đây là quy tắc phát âm quan trọng ở cấp N5.",
    level: "N5"
  },
  {
    id: 2,
    question: "わたし___がくせいです。",
    options: ["が", "を", "は", "に"],
    correct: 2,
    explanation: "Trợ từ 'は' (wa) được dùng để chỉ chủ đề của câu. 'わたしは' nghĩa là 'Về phía tôi' hoặc 'Còn tôi thì'.",
    tip: "は đánh dấu chủ đề, が đánh dấu chủ ngữ. Với câu giới thiệu cơ bản, dùng は.",
    level: "N5"
  },
  {
    id: 3,
    question: "きのう、えいが___みました。",
    options: ["が", "を", "は", "で"],
    correct: 1,
    explanation: "Trợ từ 'を' (o) đánh dấu tân ngữ trực tiếp của động từ. 'えいがをみる' = 'xem phim'.",
    tip: "を luôn đi với động từ hành động. Công thức: [Tân ngữ] + を + [Động từ]",
    level: "N5"
  },
  {
    id: 4,
    question: "あした、ともだち___あいます。",
    options: ["が", "を", "に", "で"],
    correct: 2,
    explanation: "Động từ 'あう' (gặp) đi với trợ từ 'に'. Công thức: [người] + に + あう.",
    tip: "Một số động từ đặc biệt như あう、でんわする đi với に thay vì を.",
    level: "N5"
  },
  {
    id: 5,
    question: "この本を___ことがありますか？",
    options: ["読む", "読んだ", "読んで", "読み"],
    correct: 1,
    explanation: "'〜たことがある' là mẫu câu diễn tả kinh nghiệm 'đã từng'. Phải dùng thì quá khứ (た-form) trước 'ことがある'.",
    tip: "Mẫu câu kinh nghiệm: [động từ た-form] + ことがある/ない. Ví dụ: 食べたことがある (đã từng ăn)",
    level: "N4"
  }
];

const Test = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.filter((ans, idx) => ans === testQuestions[idx].correct).length;
  };

  const getLevel = (score: number) => {
    const percentage = (score / testQuestions.length) * 100;
    if (percentage >= 80) return { level: "N4-N3", color: "bg-green-500", message: "Xuất sắc! Bạn đã nắm vững kiến thức N5." };
    if (percentage >= 60) return { level: "N5", color: "bg-blue-500", message: "Tốt! Bạn đang ở trình độ N5." };
    return { level: "N5 cơ bản", color: "bg-yellow-500", message: "Hãy ôn luyện thêm kiến thức N5 cơ bản nhé!" };
  };

  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Kiểm Tra Trình Độ 📝
              </h1>
              <p className="text-muted-foreground text-lg">
                Làm bài test để xác định trình độ tiếng Nhật của bạn
              </p>
            </div>

            <Card className="text-left">
              <CardHeader>
                <CardTitle>Về bài test này</CardTitle>
                <CardDescription>
                  Bài test bao gồm {testQuestions.length} câu hỏi trắc nghiệm về ngữ pháp và từ vựng cơ bản.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Giải thích chi tiết cho mỗi câu trả lời</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    <span>Gợi ý học tập dựa trên kết quả</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    <span>Đánh giá trình độ chính xác</span>
                  </div>
                </div>
                <Button onClick={handleStart} className="w-full" size="lg">
                  Bắt đầu làm bài
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <ChatBotWidget />
        <Footer />
      </div>
    );
  }

  if (showResult) {
    const score = calculateScore();
    const levelInfo = getLevel(score);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8 pt-24">
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="border-2 border-primary">
              <CardHeader className="text-center">
                <Badge className={`${levelInfo.color} text-white mx-auto mb-3`}>
                  Trình độ: {levelInfo.level}
                </Badge>
                <CardTitle className="text-3xl">Kết quả của bạn</CardTitle>
                <CardDescription className="text-lg">
                  {levelInfo.message}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {score}/{testQuestions.length}
                  </div>
                  <Progress value={(score / testQuestions.length) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            <h2 className="text-2xl font-bold">Chi tiết từng câu hỏi</h2>

            {testQuestions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correct;

              return (
                <Card key={q.id} className={`border-2 ${isCorrect ? 'border-green-500/30' : 'border-red-500/30'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">Câu {idx + 1}</Badge>
                          <Badge variant="secondary">{q.level}</Badge>
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <CardTitle className="text-xl">{q.question}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`p-3 rounded-lg border-2 ${
                            optIdx === q.correct
                              ? 'bg-green-500/10 border-green-500'
                              : optIdx === userAnswer
                              ? 'bg-red-500/10 border-red-500'
                              : 'border-border'
                          }`}
                        >
                          <span className="font-medium">{opt}</span>
                          {optIdx === q.correct && (
                            <span className="ml-2 text-green-600 font-semibold">✓ Đáp án đúng</span>
                          )}
                          {optIdx === userAnswer && optIdx !== q.correct && (
                            <span className="ml-2 text-red-600 font-semibold">✗ Bạn chọn</span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold mb-1">Giải thích:</p>
                          <p className="text-sm">{q.explanation}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/5 border-2 border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold mb-1">Gợi ý:</p>
                          <p className="text-sm">{q.tip}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <div className="flex gap-3">
              <Button onClick={handleStart} variant="outline" className="flex-1">
                Làm lại
              </Button>
              <Button onClick={() => window.location.href = '/roadmap'} className="flex-1">
                Xem lộ trình học
              </Button>
            </div>
          </div>
        </main>
        <ChatBotWidget />
        <Footer />
      </div>
    );
  }

  const question = testQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Câu {currentQuestion + 1} / {testQuestions.length}</span>
              <Badge variant="secondary">{question.level}</Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        selectedAnswer === idx
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedAnswer(idx)}
                    >
                      <RadioGroupItem value={idx.toString()} id={`option-${idx}`} />
                      <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer text-base">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>

              <Button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
                className="w-full"
                size="lg"
              >
                {currentQuestion < testQuestions.length - 1 ? 'Câu tiếp theo' : 'Xem kết quả'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <ChatBotWidget />
      <Footer />
    </div>
  );
};

export default Test;
