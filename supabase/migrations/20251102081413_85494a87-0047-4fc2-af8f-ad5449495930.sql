-- Add parent_comment_id to post_comments for nested replies
ALTER TABLE public.post_comments 
ADD COLUMN parent_comment_id uuid REFERENCES public.post_comments(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX idx_post_comments_parent_id ON public.post_comments(parent_comment_id);

-- Create notifications table
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE,
  comment_id uuid REFERENCES public.post_comments(id) ON DELETE CASCADE,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON public.notifications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Function to create notification when someone comments on a post
CREATE OR REPLACE FUNCTION public.notify_post_author()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  post_author_id uuid;
  commenter_name text;
BEGIN
  -- Get post author
  SELECT user_id INTO post_author_id
  FROM public.community_posts
  WHERE id = NEW.post_id;
  
  -- Get commenter name
  SELECT display_name INTO commenter_name
  FROM public.profiles
  WHERE id = NEW.user_id;
  
  -- Don't notify if user comments on their own post
  IF post_author_id != NEW.user_id THEN
    INSERT INTO public.notifications (user_id, type, title, message, post_id, comment_id)
    VALUES (
      post_author_id,
      'comment',
      'Bình luận mới',
      commenter_name || ' đã bình luận về bài viết của bạn',
      NEW.post_id,
      NEW.id
    );
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for post comments
CREATE TRIGGER on_comment_created
  AFTER INSERT ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_post_author();

-- Function to create notification when someone replies to a comment
CREATE OR REPLACE FUNCTION public.notify_comment_author()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  parent_author_id uuid;
  replier_name text;
BEGIN
  -- Only notify if this is a reply (has parent_comment_id)
  IF NEW.parent_comment_id IS NOT NULL THEN
    -- Get parent comment author
    SELECT user_id INTO parent_author_id
    FROM public.post_comments
    WHERE id = NEW.parent_comment_id;
    
    -- Get replier name
    SELECT display_name INTO replier_name
    FROM public.profiles
    WHERE id = NEW.user_id;
    
    -- Don't notify if user replies to their own comment
    IF parent_author_id != NEW.user_id THEN
      INSERT INTO public.notifications (user_id, type, title, message, post_id, comment_id)
      VALUES (
        parent_author_id,
        'reply',
        'Trả lời mới',
        replier_name || ' đã trả lời bình luận của bạn',
        NEW.post_id,
        NEW.id
      );
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Trigger for comment replies
CREATE TRIGGER on_reply_created
  AFTER INSERT ON public.post_comments
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_comment_author();