-- Create table for saved vocabulary (flashcards)
CREATE TABLE public.saved_vocabulary (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  word TEXT NOT NULL,
  reading TEXT NOT NULL,
  meaning TEXT NOT NULL,
  example TEXT,
  image_url TEXT,
  mastery_level INTEGER NOT NULL DEFAULT 0, -- 0: new, 1: learning, 2: familiar, 3: mastered
  last_reviewed_at TIMESTAMP WITH TIME ZONE,
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, word)
);

-- Enable RLS
ALTER TABLE public.saved_vocabulary ENABLE ROW LEVEL SECURITY;

-- RLS Policies for saved_vocabulary
CREATE POLICY "Users can view their own vocabulary"
ON public.saved_vocabulary
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own vocabulary"
ON public.saved_vocabulary
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vocabulary"
ON public.saved_vocabulary
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vocabulary"
ON public.saved_vocabulary
FOR DELETE
USING (auth.uid() = user_id);

-- Create table for user progress tracking
CREATE TABLE public.user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, completed
  completion_percentage INTEGER NOT NULL DEFAULT 0,
  last_studied_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_progress
CREATE POLICY "Users can view their own progress"
ON public.user_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own progress"
ON public.user_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.user_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_user_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_progress_timestamp
BEFORE UPDATE ON public.user_progress
FOR EACH ROW
EXECUTE FUNCTION public.update_user_progress_updated_at();

-- Create index for better query performance
CREATE INDEX idx_saved_vocabulary_user_id ON public.saved_vocabulary(user_id);
CREATE INDEX idx_saved_vocabulary_mastery ON public.saved_vocabulary(user_id, mastery_level);
CREATE INDEX idx_user_progress_user_id ON public.user_progress(user_id);
CREATE INDEX idx_user_progress_status ON public.user_progress(user_id, status);