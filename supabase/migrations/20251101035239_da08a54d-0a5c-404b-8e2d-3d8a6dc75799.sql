-- Create lessons table for detailed curriculum
CREATE TABLE public.lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  exercises JSONB DEFAULT '[]'::jsonb,
  vocabulary JSONB DEFAULT '[]'::jsonb,
  grammar_points JSONB DEFAULT '[]'::jsonb,
  estimated_hours INTEGER DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing lessons
CREATE POLICY "Lessons are viewable by everyone"
ON public.lessons
FOR SELECT
USING (true);

-- Create index for better performance
CREATE INDEX idx_lessons_level ON public.lessons(level);
CREATE INDEX idx_lessons_lesson_number ON public.lessons(lesson_number);

-- Add trigger for updated_at
CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON public.lessons
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample N5 lessons
INSERT INTO public.lessons (level, lesson_number, title, description, content, vocabulary, grammar_points, estimated_hours) VALUES
('N5', 1, 'Hiragana cơ bản (あ-の)', 'Học 45 chữ Hiragana đầu tiên', 
'[{"type": "introduction", "text": "Hiragana là hệ thống chữ viết cơ bản nhất trong tiếng Nhật"}, {"type": "chart", "characters": ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の"]}]'::jsonb,
'[{"word": "あい", "reading": "ai", "meaning": "tình yêu"}, {"word": "いえ", "reading": "ie", "meaning": "nhà"}, {"word": "うち", "reading": "uchi", "meaning": "nhà của tôi"}]'::jsonb,
'[{"point": "Cách viết và đọc Hiragana cơ bản", "examples": ["あ = a", "い = i", "う = u"]}]'::jsonb,
3),

('N5', 2, 'Hiragana (は-ん) và Dakuten', 'Học phần còn lại của Hiragana và dấu Dakuten',
'[{"type": "introduction", "text": "Hoàn thành bảng Hiragana và học cách sử dụng dấu Dakuten"}, {"type": "chart", "characters": ["は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "を", "ん"]}]'::jsonb,
'[{"word": "はな", "reading": "hana", "meaning": "hoa"}, {"word": "やま", "reading": "yama", "meaning": "núi"}, {"word": "ほん", "reading": "hon", "meaning": "sách"}]'::jsonb,
'[{"point": "Dakuten (゛) và Handakuten (゜)", "examples": ["か → が", "は → ば → ぱ"]}]'::jsonb,
3),

('N5', 3, 'Katakana cơ bản', 'Học hệ thống Katakana cho từ ngoại lai',
'[{"type": "introduction", "text": "Katakana được dùng để viết từ ngoại lai và tên riêng"}, {"type": "chart", "characters": ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ"]}]'::jsonb,
'[{"word": "コーヒー", "reading": "kōhī", "meaning": "cà phê"}, {"word": "テレビ", "reading": "terebi", "meaning": "ti vi"}, {"word": "コンピューター", "reading": "konpyūtā", "meaning": "máy tính"}]'::jsonb,
'[{"point": "Cách viết từ ngoại lai bằng Katakana", "examples": ["coffee → コーヒー", "computer → コンピューター"]}]'::jsonb,
3),

('N5', 4, 'Chào hỏi cơ bản', 'Học các mẫu câu chào hỏi thông dụng',
'[{"type": "phrases", "list": ["こんにちは (konnichiwa) - Xin chào", "おはよう (ohayō) - Chào buổi sáng", "こんばんは (konbanwa) - Chào buổi tối", "ありがとう (arigatō) - Cảm ơn", "すみません (sumimasen) - Xin lỗi"]}]'::jsonb,
'[{"word": "おはよう", "reading": "ohayō", "meaning": "chào buổi sáng"}, {"word": "こんにちは", "reading": "konnichiwa", "meaning": "xin chào"}, {"word": "さようなら", "reading": "sayōnara", "meaning": "tạm biệt"}]'::jsonb,
'[{"point": "Cách chào hỏi theo thời gian trong ngày", "examples": ["Buổi sáng: おはよう", "Buổi trưa/chiều: こんにちは", "Buổi tối: こんばんは"]}]'::jsonb,
2),

('N5', 5, 'Tự giới thiệu', 'Học cách giới thiệu bản thân',
'[{"type": "pattern", "text": "わたしは___です (watashi wa ___ desu)"}, {"type": "examples", "list": ["わたしは学生です (Tôi là sinh viên)", "わたしはベトナム人です (Tôi là người Việt Nam)"]}]'::jsonb,
'[{"word": "わたし", "reading": "watashi", "meaning": "tôi"}, {"word": "がくせい", "reading": "gakusei", "meaning": "sinh viên"}, {"word": "せんせい", "reading": "sensei", "meaning": "giáo viên"}]'::jsonb,
'[{"point": "です (desu) - Động từ to be", "examples": ["わたしは学生です", "これは本です"]}, {"point": "は (wa) - Trợ từ chủ đề", "examples": ["わたしは", "これは"]}]'::jsonb,
2),

('N4', 1, 'Thì quá khứ', 'Học cách chia động từ thì quá khứ',
'[{"type": "introduction", "text": "Động từ tiếng Nhật có 3 nhóm chính"}, {"type": "conjugation", "groups": ["Nhóm 1 (う-verbs)", "Nhóm 2 (る-verbs)", "Nhóm 3 (Bất quy tắc)"]}]'::jsonb,
'[{"word": "たべる", "reading": "taberu", "meaning": "ăn"}, {"word": "のむ", "reading": "nomu", "meaning": "uống"}, {"word": "いく", "reading": "iku", "meaning": "đi"}]'::jsonb,
'[{"point": "Chia động từ thì quá khứ", "examples": ["たべる → たべた", "のむ → のんだ", "いく → いった"]}]'::jsonb,
3),

('N4', 2, 'て-form và các ứng dụng', 'Học て-form và cách sử dụng',
'[{"type": "introduction", "text": "て-form là dạng động từ quan trọng nhất"}, {"type": "uses", "list": ["Nối câu", "Yêu cầu (ください)", "Đang làm (います)", "Đã làm xong (あります)"]}]'::jsonb,
'[{"word": "たべてください", "reading": "tabete kudasai", "meaning": "vui lòng ăn"}, {"word": "よんでいます", "reading": "yonde imasu", "meaning": "đang đọc"}]'::jsonb,
'[{"point": "て-form cho động từ nhóm 1", "examples": ["かく → かいて", "のむ → のんで"]}, {"point": "て-form cho động từ nhóm 2", "examples": ["たべる → たべて", "みる → みて"]}]'::jsonb,
4),

('N3', 1, 'Câu điều kiện たら/ば/と', 'Học các dạng câu điều kiện',
'[{"type": "introduction", "text": "Tiếng Nhật có nhiều cách diễn đạt điều kiện"}, {"type": "comparison", "forms": ["たら - Nếu/Khi", "ば - Nếu (trang trọng)", "と - Nếu (tự nhiên)", "なら - Nếu (giả định)"]}]'::jsonb,
'[{"word": "あめがふったら", "reading": "ame ga futtara", "meaning": "nếu trời mưa"}, {"word": "いそげば", "reading": "isogeba", "meaning": "nếu vội"}]'::jsonb,
'[{"point": "たら - Điều kiện giả định", "examples": ["雨が降ったら、行きません", "時間があったら、会いましょう"]}, {"point": "ば - Điều kiện tổng quát", "examples": ["急げば、間に合います"]}]'::jsonb,
4),

('N2', 1, 'Keigo - Kính ngữ', 'Học cách nói lịch sự trong tiếng Nhật',
'[{"type": "introduction", "text": "Keigo là hệ thống ngôn ngữ tôn kính"}, {"type": "types", "list": ["尊敬語 (Sonkeigo) - Tôn kính", "謙譲語 (Kenjōgo) - Khiêm nhường", "丁寧語 (Teineigo) - Lịch sự"]}]'::jsonb,
'[{"word": "いらっしゃる", "reading": "irassharu", "meaning": "đến/đi/ở (tôn kính)"}, {"word": "うかがう", "reading": "ukagau", "meaning": "hỏi/thăm (khiêm nhường)"}]'::jsonb,
'[{"point": "Động từ tôn kính", "examples": ["する → なさる", "いる → いらっしゃる"]}, {"point": "Động từ khiêm nhường", "examples": ["する → いたす", "いく → まいる"]}]'::jsonb,
5),

('N1', 1, 'Văn phong cổ điển', 'Đọc hiểu văn học Nhật cổ điển',
'[{"type": "introduction", "text": "Văn phong cổ điển xuất hiện trong văn học và báo chí"}, {"type": "features", "list": ["Trợ từ cổ: なり、けり", "Động từ cổ", "Kính ngữ cổ"]}]'::jsonb,
'[{"word": "なり", "reading": "nari", "meaning": "trợ động từ đoán định"}, {"word": "けり", "reading": "keri", "meaning": "trợ động từ quá khứ"}]'::jsonb,
'[{"point": "Trợ từ cổ điển", "examples": ["雨なり (là mưa)", "見たりけり (đã thấy)"]}, {"point": "Cách đọc văn cổ", "examples": ["Nhận diện mẫu câu", "Hiểu ngữ cảnh lịch sử"]}]'::jsonb,
6);