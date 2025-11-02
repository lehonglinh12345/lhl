import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Reply, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  parent_comment_id: string | null;
  profiles: {
    display_name: string;
    avatar_url: string | null;
  };
  replies?: Comment[];
}

interface CommentItemProps {
  comment: Comment;
  postId: string;
  user: any;
  replyingTo: string | null;
  newComment: string;
  onReply: (commentId: string) => void;
  onCancelReply: () => void;
  onCommentChange: (value: string) => void;
  onSubmitReply: () => void;
}

const CommentItem = ({
  comment,
  postId,
  user,
  replyingTo,
  newComment,
  onReply,
  onCancelReply,
  onCommentChange,
  onSubmitReply,
}: CommentItemProps) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.profiles.avatar_url || undefined} />
          <AvatarFallback>
            {comment.profiles.display_name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-3">
            <p className="font-semibold text-sm">
              {comment.profiles.display_name}
            </p>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>
          <div className="flex items-center gap-3 mt-1 ml-3">
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
                locale: vi,
              })}
            </p>
            {user && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 text-xs text-primary hover:text-primary/80"
                onClick={() => onReply(comment.id)}
              >
                <Reply className="w-3 h-3 mr-1" />
                Trả lời
              </Button>
            )}
          </div>

          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="flex gap-2 mt-3 ml-3">
              <Input
                placeholder={`Trả lời ${comment.profiles.display_name}...`}
                value={newComment}
                onChange={(e) => onCommentChange(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    onSubmitReply();
                  }
                }}
                autoFocus
              />
              <Button size="icon" onClick={onSubmitReply}>
                <Send className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onCancelReply}>
                <Reply className="w-4 h-4 rotate-180" />
              </Button>
            </div>
          )}

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-6 mt-3 space-y-3 border-l-2 border-border pl-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  postId={postId}
                  user={user}
                  replyingTo={replyingTo}
                  newComment={newComment}
                  onReply={onReply}
                  onCancelReply={onCancelReply}
                  onCommentChange={onCommentChange}
                  onSubmitReply={onSubmitReply}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
