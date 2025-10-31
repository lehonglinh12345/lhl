-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'post-images',
  'post-images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policies for post images
CREATE POLICY "Anyone can view post images"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can update their own post images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'post-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own post images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'post-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add image_url column to community_posts table
ALTER TABLE public.community_posts
ADD COLUMN image_url text;

-- Add roadmap_steps table for learning path
CREATE TABLE public.roadmap_steps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  level text NOT NULL,
  step_number integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  resources jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(level, step_number)
);

-- Enable RLS on roadmap_steps
ALTER TABLE public.roadmap_steps ENABLE ROW LEVEL SECURITY;

-- Roadmap steps are viewable by everyone
CREATE POLICY "Roadmap steps are viewable by everyone"
ON public.roadmap_steps FOR SELECT
USING (true);

-- Insert initial roadmap data
INSERT INTO public.roadmap_steps (level, step_number, title, description, resources) VALUES
-- N5 Level
('N5', 1, 'Hiragana và Katakana', 'Học 2 bảng chữ cái cơ bản của tiếng Nhật', '["Tập viết mỗi ngày", "Sử dụng flashcards", "Luyện đọc từ đơn giản"]'),
('N5', 2, 'Ngữ pháp cơ bản', 'Các mẫu câu cơ bản: です/ます, が/を/に/で', '["Genki I", "Minna no Nihongo I", "Luyện tập với bài tập"]'),
('N5', 3, 'Từ vựng N5', 'Khoảng 800 từ vựng thông dụng', '["Anki deck N5", "Memrise", "Học qua ngữ cảnh"]'),
('N5', 4, 'Kanji N5', '100 chữ Kanji cơ bản', '["WaniKani", "Kanji Study", "Viết tay mỗi ngày"]'),

-- N4 Level
('N4', 1, 'Ngữ pháp N4', 'Mở rộng các mẫu câu phức tạp hơn', '["Genki II", "Minna no Nihongo II"]'),
('N4', 2, 'Từ vựng N4', 'Thêm 600 từ vựng mới', '["Anki deck N4", "Đọc truyện tranh đơn giản"]'),
('N4', 3, 'Kanji N4', 'Thêm 200 chữ Kanji', '["WaniKani level 10-20", "Luyện viết"]'),
('N4', 4, 'Luyện nghe', 'Bắt đầu luyện nghe với nội dung đơn giản', '["NHK News Web Easy", "Podcast tiếng Nhật"]'),

-- N3 Level
('N3', 1, 'Ngữ pháp N3', 'Các mẫu câu văn viết và hội thoại', '["Shin Kanzen Master N3", "TRY! N3"]'),
('N3', 2, 'Từ vựng N3', '1,500 từ vựng mới', '["Core 2k/6k deck", "Đọc tin tức đơn giản"]'),
('N3', 3, 'Kanji N3', '400 chữ Kanji mới', '["WaniKani level 20-40", "Đọc manga"]'),
('N3', 4, 'Kỹ năng đọc', 'Đọc hiểu văn bản dài hơn', '["NHK News", "Light novels đơn giản"]'),

-- N2 Level
('N2', 1, 'Ngữ pháp N2', 'Ngữ pháp văn viết chính thức', '["Shin Kanzen Master N2", "So-matome N2"]'),
('N2', 2, 'Từ vựng N2', '2,000 từ vựng mới', '["Core 6k deck", "Đọc báo"]'),
('N2', 3, 'Kanji N2', '600 chữ Kanji mới', '["WaniKani level 40-50", "Đọc sách"]'),
('N2', 4, 'Luyện tổng hợp', 'Kết hợp tất cả kỹ năng', '["Xem anime không phụ đề", "Đọc novel"]'),

-- N1 Level
('N1', 1, 'Ngữ pháp N1', 'Ngữ pháp văn học và chuyên ngành', '["Shin Kanzen Master N1", "So-matome N1"]'),
('N1', 2, 'Từ vựng N1', '2,000+ từ vựng chuyên sâu', '["Core 10k deck", "Đọc báo chí chuyên ngành"]'),
('N1', 3, 'Kanji N1', '700+ chữ Kanji phức tạp', '["WaniKani level 50-60", "Đọc tiểu thuyết"]'),
('N1', 4, 'Tiếng Nhật nâng cao', 'Thành thạo như người bản xứ', '["Xem tin tức", "Đọc văn học", "Tham gia cộng đồng Nhật"]');