-- Create news table
CREATE TABLE public.news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author TEXT NOT NULL DEFAULT 'Admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Create policy for viewing news
CREATE POLICY "News are viewable by everyone" 
ON public.news 
FOR SELECT 
USING (true);

-- Create saved_news table for user bookmarks
CREATE TABLE public.saved_news (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  news_id UUID NOT NULL REFERENCES public.news(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, news_id)
);

-- Enable RLS
ALTER TABLE public.saved_news ENABLE ROW LEVEL SECURITY;

-- Create policies for saved news
CREATE POLICY "Users can view their own saved news" 
ON public.saved_news 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can save news" 
ON public.saved_news 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave news" 
ON public.saved_news 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER update_news_updated_at
BEFORE UPDATE ON public.news
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample news data
INSERT INTO public.news (title, excerpt, content, category, image_url) VALUES
(
  'JLPT N5-N1: Lộ trình học hiệu quả',
  'Khám phá phương pháp học tập hiệu quả để vượt qua kỳ thi JLPT từ N5 đến N1 với các mẹo và chiến lược từ chuyên gia.',
  'Kỳ thi JLPT (Japanese Language Proficiency Test) là kỳ thi năng lực tiếng Nhật được công nhận rộng rãi trên toàn thế giới. Để thành công trong kỳ thi này, bạn cần có lộ trình học tập rõ ràng và hiệu quả.

## N5 - Cấp độ cơ bản
N5 là cấp độ dễ nhất, yêu cầu kiến thức về 100 Kanji và 800 từ vựng. Bạn nên tập trung vào:
- Học Hiragana và Katakana thành thạo
- Nắm vững các cấu trúc ngữ pháp cơ bản
- Luyện nghe với tốc độ chậm

## N4 - Phát triển nền tảng
N4 yêu cầu 300 Kanji và 1500 từ vựng. Giai đoạn này bạn cần:
- Củng cố ngữ pháp N5
- Mở rộng vốn từ vựng
- Luyện đọc các đoạn văn ngắn

## N3 - Bước tiến quan trọng
N3 là bước ngoặt với 650 Kanji và 3000 từ vựng. Đây là lúc bạn:
- Học các ngữ pháp phức tạp hơn
- Đọc hiểu bài báo, truyện ngắn
- Nghe hiểu các cuộc hội thoại thông thường

## N2 - Trình độ trung cấp cao
N2 yêu cầu 1000 Kanji và 6000 từ vựng. Bạn cần:
- Nắm vững ngữ pháp nâng cao
- Đọc sách, báo chuyên ngành
- Hiểu được tin tức, phim ảnh

## N1 - Trình độ cao nhất
N1 với 2000 Kanji và 10000 từ vựng là mục tiêu cuối cùng. Để đạt N1:
- Học thuộc lòng các thành ngữ, tục ngữ
- Đọc hiểu văn học, tài liệu chuyên môn
- Nghe hiểu trong mọi tình huống

**Mẹo học tập:**
- Ôn tập đều đặn mỗi ngày
- Sử dụng flashcard cho từ vựng
- Luyện nghe qua anime, podcast
- Tham gia cộng đồng học tiếng Nhật

Chúc bạn thành công trong hành trình chinh phục JLPT!',
  'Học tập',
  null
),
(
  'Văn hóa Nhật: Lễ hội mùa thu',
  'Tìm hiểu về các lễ hội truyền thống mùa thu tại Nhật Bản và ý nghĩa văn hóa đặc biệt của chúng.',
  'Mùa thu ở Nhật Bản không chỉ đẹp bởi lá đỏ mà còn là thời điểm diễn ra nhiều lễ hội truyền thống đặc sắc.

## Tsukimi (月見) - Ngắm trăng
Tsukimi là lễ hội ngắm trăng vào tháng 9-10. Người Nhật thường:
- Đặt dango (bánh nếp) và khoai lang lên bàn thờ
- Ngắm trăng tròn và thưởng thức trà
- Trang trí với cỏ susuki (cỏ lau Nhật Bản)

## Shichi-Go-San (七五三)
Lễ hội dành cho trẻ em 3, 5 và 7 tuổi vào ngày 15 tháng 11:
- Gia đình đưa con đến đền thờ cầu may
- Trẻ em mặc kimono truyền thống
- Tặng chitose-ame (kẹo dài tuổi)

## Momijigari (紅葉狩) - Ngắm lá đỏ
Hoạt động ngắm lá phong đỏ rực rỡ:
- Tham quan các công viên nổi tiếng
- Chụp ảnh với lá phong
- Thưởng thức đồ ăn mùa thu

Các lễ hội mùa thu thể hiện sự trân trọng của người Nhật với thiên nhiên và gia đình.',
  'Văn hóa',
  null
),
(
  'AI trong học tiếng Nhật',
  'Công nghệ AI đang thay đổi cách chúng ta học tiếng Nhật như thế nào? Khám phá những ứng dụng mới nhất.',
  'Trí tuệ nhân tạo (AI) đang cách mạng hóa việc học ngoại ngữ, đặc biệt là tiếng Nhật với những đặc thù riêng.

## Chatbot AI - Gia sư 24/7
- Trả lời câu hỏi ngữ pháp tức thì
- Giải thích từ vựng với ngữ cảnh cụ thể
- Hỗ trợ cả văn bản và hình ảnh

## Nhận diện giọng nói
AI giúp cải thiện phát âm:
- Phân tích âm thanh chi tiết
- So sánh với người bản ngữ
- Đưa ra góp ý cụ thể

## Dịch thuật thông minh
- Dịch chính xác theo ngữ cảnh
- Giải thích văn hóa đằng sau
- Hỗ trợ học từ vựng mới

## Flashcard thông minh
- Hệ thống lặp lại ngắt quãng
- Tự động điều chỉnh độ khó
- Theo dõi tiến độ chi tiết

## Nhận diện chữ viết
- Quét Kanji từ ảnh
- Tra cứu nghĩa tức thì
- Lưu vào bộ từ vựng cá nhân

AI không thay thế giáo viên nhưng là công cụ hỗ trợ đắc lực, giúp việc học tiếng Nhật trở nên dễ dàng và hiệu quả hơn.',
  'Công nghệ',
  null
),
(
  'Top 10 Kanji thường gặp nhất',
  'Danh sách 10 chữ Kanji được sử dụng nhiều nhất trong cuộc sống hàng ngày tại Nhật Bản.',
  'Nắm vững các Kanji thông dụng giúp bạn đọc hiểu hầu hết văn bản tiếng Nhật hàng ngày.

## 1. 日 (nichi/hi) - Ngày, Mặt trời
- 日本 (nihon) - Nhật Bản
- 今日 (kyou) - Hôm nay
- 毎日 (mainichi) - Mỗi ngày

## 2. 一 (ichi) - Một
- 一つ (hitotsu) - Một cái
- 一日 (ichinichi) - Một ngày
- 一人 (hitori) - Một người

## 3. 国 (koku/kuni) - Nước, Quốc gia
- 国 (kuni) - Đất nước
- 外国 (gaikoku) - Nước ngoài
- 中国 (chuugoku) - Trung Quốc

## 4. 人 (jin/hito) - Người
- 人 (hito) - Người
- 日本人 (nihonjin) - Người Nhật
- 外国人 (gaikokujin) - Người nước ngoài

## 5. 年 (nen/toshi) - Năm
- 今年 (kotoshi) - Năm nay
- 来年 (rainen) - Năm sau
- 去年 (kyonen) - Năm ngoái

## 6. 大 (dai/oo) - Lớn
- 大きい (ookii) - To, lớn
- 大学 (daigaku) - Đại học
- 大好き (daisuki) - Rất thích

## 7. 見 (ken/mi) - Nhìn, Xem
- 見る (miru) - Nhìn, xem
- 意見 (iken) - Ý kiến
- 花見 (hanami) - Ngắm hoa

## 8. 時 (ji/toki) - Thời gian
- 時 (toki) - Thời điểm
- 時間 (jikan) - Thời gian
- 一時 (ichiji) - 1 giờ

## 9. 出 (shutsu/de) - Ra, Đi ra
- 出る (deru) - Đi ra
- 出発 (shuppatsu) - Xuất phát
- 出口 (deguchi) - Lối ra

## 10. 分 (bun/fun/wa) - Phần, Phút
- 分かる (wakaru) - Hiểu
- 十分 (juppun) - 10 phút
- 自分 (jibun) - Bản thân

**Mẹo học Kanji:**
- Viết nhiều lần để nhớ nét
- Học theo bộ thủ
- Học trong từ ghép và câu
- Sử dụng flashcard hàng ngày',
  'Từ vựng',
  null
),
(
  'Du học Nhật Bản 2026',
  'Thông tin về học bổng và chương trình du học Nhật Bản năm 2026 dành cho sinh viên Việt Nam.',
  'Du học Nhật Bản là mơ ước của nhiều bạn trẻ Việt Nam. Dưới đây là hướng dẫn chi tiết cho kỳ tuyển sinh 2026.

## Các loại học bổng phổ biến

### MEXT (Học bổng Chính phủ Nhật)
- Học phí: Miễn phí hoàn toàn
- Sinh hoạt phí: 117,000 - 145,000 yên/tháng
- Vé máy bay: Được tài trợ
- Yêu cầu: IELTS 6.0 hoặc JLPT N2 trở lên

### JASSO
- Hỗ trợ: 48,000 - 80,000 yên/tháng
- Thời hạn: 12 tháng
- Yêu cầu: Điểm GPA cao, JLPT N3 trở lên

### Học bổng trường tư
- Mức hỗ trợ: 30,000 - 100,000 yên/tháng
- Điều kiện: Tùy từng trường

## Chi phí du học

### Học phí
- Đại học công: 535,800 yên/năm
- Đại học tư: 800,000 - 1,200,000 yên/năm
- Trường Nhật ngữ: 600,000 - 800,000 yên/năm

### Sinh hoạt phí
- Tokyo: 120,000 - 150,000 yên/tháng
- Các thành phố khác: 80,000 - 100,000 yên/tháng

## Quy trình nộp hồ sơ

1. **Chuẩn bị (6-12 tháng trước)**
   - Học tiếng Nhật đạt JLPT N2/N3
   - Chuẩn bị bằng cấp, điểm số
   - Xin thư giới thiệu

2. **Nộp hồ sơ (3-6 tháng trước)**
   - Điền form đăng ký
   - Nộp hồ sơ trực tuyến/qua đường bưu điện
   - Nộp kế hoạch học tập

3. **Phỏng vấn (2-3 tháng trước)**
   - Phỏng vấn trực tuyến/trực tiếp
   - Kiểm tra năng lực tiếng Nhật
   - Thể hiện động lực học tập

4. **Nhận kết quả (1-2 tháng trước)**
   - Nhận giấy CoE
   - Làm visa du học
   - Chuẩn bị hành lý

## Lưu ý quan trọng

- Bắt đầu chuẩn bị sớm (ít nhất 1 năm)
- Học tiếng Nhật đạt N2 để có nhiều cơ hội
- Tìm hiểu kỹ về trường và ngành học
- Chuẩn bị tài chính dự phòng
- Tham gia các buổi tư vấn du học

Chúc các bạn thành công trong hành trình du học Nhật Bản!',
  'Du học',
  null
),
(
  'Anime giúp học tiếng Nhật',
  '5 bộ anime phù hợp nhất cho người mới bắt đầu học tiếng Nhật với phụ đề song ngữ.',
  'Xem anime là cách học tiếng Nhật vui nhộn và hiệu quả. Dưới đây là 5 bộ anime lý tưởng cho người mới bắt đầu.

## 1. Shirokuma Cafe (Quán Cafe Gấu Trắng)
**Cấp độ: N5-N4**

- Nội dung: Cuộc sống hàng ngày tại quán cafe
- Giọng nói: Rõ ràng, tốc độ chậm
- Từ vựng: Đơn giản, thông dụng
- Ưu điểm: Hội thoại tự nhiên, hài hước

**Từ vựng học được:**
- いらっしゃいませ (irasshaimase) - Xin chào (tiếp khách)
- 注文 (chuumon) - Đặt món
- 美味しい (oishii) - Ngon

## 2. Doraemon
**Cấp độ: N5-N4**

- Nội dung: Phiêu lưu của Nobita và Doraemon
- Giọng nói: Rõ ràng, dễ hiểu
- Từ vựng: Cơ bản, phù hợp trẻ em
- Ưu điểm: Câu chuyện quen thuộc

**Từ vựng học được:**
- 大丈夫 (daijoubu) - Không sao
- 頑張る (ganbaru) - Cố gắng
- 友達 (tomodachi) - Bạn bè

## 3. Nichijou (Cuộc Sống Thường Ngày)
**Cấp độ: N4-N3**

- Nội dung: Đời sống học sinh trung học
- Giọng nói: Tốc độ trung bình
- Từ vựng: Hàng ngày, học đường
- Ưu điểm: Hài hước, nhiều tình huống đa dạng

**Từ vựng học được:**
- 学校 (gakkou) - Trường học
- 宿題 (shukudai) - Bài tập về nhà
- びっくり (bikkuri) - Ngạc nhiên

## 4. K-On!
**Cấp độ: N4-N3**

- Nội dung: Câu lạc bộ âm nhạc học đường
- Giọng nói: Tự nhiên, năng động
- Từ vựng: Âm nhạc, tình bạn
- Ưu điểm: Nhiều bài hát, giọng nói rõ

**Từ vựng học được:**
- 音楽 (ongaku) - Âm nhạc
- 演奏 (ensou) - Biểu diễn
- 部活 (bukatsu) - Câu lạc bộ

## 5. Barakamon
**Cấp độ: N3-N2**

- Nội dung: Nghệ sĩ thư pháp sống ở làng quê
- Giọng nói: Tự nhiên, có phương ngữ
- Từ vựng: Đa dạng, văn hóa
- Ưu điểm: Học được phương ngữ, văn hóa Nhật

**Từ vựng học được:**
- 書道 (shodou) - Thư pháp
- 田舎 (inaka) - Nông thôn
- 成長 (seichou) - Trưởng thành

## Mẹo học tiếng Nhật qua anime

1. **Xem có phụ đề tiếng Nhật**
   - Giúp nhận biết từ mới
   - Học cách viết Kanji
   - Hiểu ngữ cảnh chính xác

2. **Ghi chú từ vựng**
   - Viết ra từ mới khi nghe
   - Tra nghĩa và ngữ pháp
   - Ôn tập sau mỗi tập

3. **Lặp lại câu thoại**
   - Shadow speaking
   - Cải thiện phát âm
   - Học ngữ điệu tự nhiên

4. **Xem lại nhiều lần**
   - Lần 1: Xem với phụ đề tiếng Việt
   - Lần 2: Xem với phụ đề tiếng Nhật
   - Lần 3: Không phụ đề

5. **Tham gia cộng đồng**
   - Thảo luận về anime
   - Chia sẻ kiến thức
   - Luyện tập giao tiếp

**Lưu ý:** Anime có thể chứa tiếng lóng, ngữ điệu phóng đại. Kết hợp với sách giáo khoa để có nền tảng vững chắc.

Chúc bạn học tiếng Nhật vui vẻ và hiệu quả qua anime!',
  'Giải trí',
  null
);