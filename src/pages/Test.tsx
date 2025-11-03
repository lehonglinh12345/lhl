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
  },
  {
    id: 6,
    question: "日本語___勉強しています。",
    options: ["が", "を", "に", "で"],
    correct: 1,
    explanation: "Trợ từ 'を' đánh dấu tân ngữ trực tiếp. '勉強する' (benkyou suru) là động từ 'học', và 'を' chỉ ra cái gì đang được học.",
    tip: "Với động từ する (suru), tân ngữ thường dùng を. Ví dụ: 日本語を勉強する, サッカーをする.",
    level: "N5"
  },
  {
    id: 7,
    question: "図書館___本を借ります。",
    options: ["が", "を", "で", "に"],
    correct: 2,
    explanation: "Trợ từ 'で' chỉ địa điểm diễn ra hành động. '図書館で' = 'tại thư viện'.",
    tip: "で chỉ nơi hành động xảy ra, に chỉ nơi đến hoặc nơi tồn tại. Công thức: [Địa điểm] + で + [Hành động]",
    level: "N5"
  },
  {
    id: 8,
    question: "毎日7時___起きます。",
    options: ["が", "を", "に", "で"],
    correct: 2,
    explanation: "Trợ từ 'に' đánh dấu thời gian cụ thể. '7時に' = 'lúc 7 giờ'.",
    tip: "に dùng với thời gian cụ thể (7時、月曜日、2月). KHÔNG dùng với thời gian chung (今日、明日、毎日).",
    level: "N5"
  },
  {
    id: 9,
    question: "田中さんは___優しいです。",
    options: ["とても", "たくさん", "もっと", "すこし"],
    correct: 0,
    explanation: "'とても' (totemo) = 'rất, vô cùng' dùng để nhấn mạnh tính từ. 'たくさん' dùng với danh từ đếm được.",
    tip: "とても + tính từ (とても優しい). たくさん + danh từ (たくさん本).",
    level: "N5"
  },
  {
    id: 10,
    question: "この映画は___面白かったです。",
    options: ["あまり", "全然", "とても", "ぜんぜん"],
    correct: 2,
    explanation: "Câu khẳng định cần phó từ khẳng định. 'とても' (rất) phù hợp. 'あまり' và 'ぜんぜん' dùng với câu phủ định.",
    tip: "あまり/ぜんぜん + phủ định. とても + khẳng định. Ví dụ: あまり好きじゃない, とても好きです.",
    level: "N5"
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
    if (percentage >= 90) return { 
      level: "N4", 
      color: "bg-gradient-to-r from-green-500 to-emerald-600", 
      message: "Xuất sắc! Bạn đã sẵn sàng học N4.",
      advice: "Bạn đã nắm vững kiến thức N5. Hãy tiếp tục với N4: học các mẫu câu phức tạp hơn, động từ て-form, và kanji N4."
    };
    if (percentage >= 70) return { 
      level: "N5 vững", 
      color: "bg-gradient-to-r from-blue-500 to-cyan-600", 
      message: "Tốt lắm! Trình độ N5 khá vững.",
      advice: "Bạn có nền tảng tốt. Hãy ôn luyện thêm các điểm còn yếu và bắt đầu làm quen với N4."
    };
    if (percentage >= 50) return { 
      level: "N5 trung bình", 
      color: "bg-gradient-to-r from-yellow-500 to-orange-500", 
      message: "Khá tốt! Cần ôn thêm một số điểm.",
      advice: "Hãy tập trung vào ngữ pháp cơ bản: trợ từ (は、が、を、に、で), động từ る、う、た-form, và luyện tập nhiều hơn."
    };
    return { 
      level: "Cần cố gắng thêm", 
      color: "bg-gradient-to-r from-red-500 to-pink-600", 
      message: "Hãy dành thời gian ôn luyện thêm nhé!",
      advice: "Bạn cần học lại từ đầu: bảng chữ cái (Hiragana, Katakana), ngữ pháp cơ bản, và từ vựng N5. Đừng nản chí, mọi người đều bắt đầu từ đây!"
    };
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
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Về bài test này
                </CardTitle>
                <CardDescription className="text-base">
                  Bài test gồm {testQuestions.length} câu hỏi trắc nghiệm về ngữ pháp và từ vựng N5-N4.
                  Mỗi câu hỏi đều có giải thích chi tiết và gợi ý học tập.
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
            <Card className="border-2 border-primary shadow-lg">
              <CardHeader className="text-center space-y-4">
                <Badge className={`${levelInfo.color} text-white mx-auto mb-3 text-lg px-4 py-2`}>
                  Trình độ: {levelInfo.level}
                </Badge>
                <CardTitle className="text-4xl font-bold">Kết quả của bạn</CardTitle>
                <CardDescription className="text-xl font-medium">
                  {levelInfo.message}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="inline-block">
                    <div className="text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                      {score}/{testQuestions.length}
                    </div>
                    <p className="text-muted-foreground">
                      Điểm số: {Math.round((score / testQuestions.length) * 100)}%
                    </p>
                  </div>
                  <Progress value={(score / testQuestions.length) * 100} className="h-4" />
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/30 border-2 border-blue-200 dark:border-blue-800 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-blue-900 dark:text-blue-100">Lời khuyên cho bạn:</h3>
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed">{levelInfo.advice}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">{score}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Đúng</div>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">{testQuestions.length - score}</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Sai</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">{Math.round((score / testQuestions.length) * 100)}%</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Tỷ lệ</div>
                  </div>
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
