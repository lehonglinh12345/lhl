import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import ChatBotWidget from '@/components/ChatBotWidget';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageSquare, PenSquare, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profiles: {
    display_name: string;
    avatar_url: string | null;
    japanese_level: string;
  };
  user_liked?: boolean;
}

const Community = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  
  // New post form
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('other');
  const [submitting, setSubmitting] = useState(false);

  const categoryLabels: Record<string, string> = {
    listening: '🎧 Nghe',
    speaking: '🗣️ Nói',
    reading: '📖 Đọc',
    writing: '✍️ Viết',
    grammar: '📝 Ngữ pháp',
    vocabulary: '📚 Từ vựng',
    culture: '🎌 Văn hóa',
    other: '💬 Khác',
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('community_posts')
        .select(`
          *,
          profiles (display_name, avatar_url, japanese_level)
        `)
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;

      // Check which posts the user has liked
      if (user) {
        const { data: likes } = await supabase
          .from('post_likes')
          .select('post_id')
          .eq('user_id', user.id);

        const likedPostIds = new Set(likes?.map(l => l.post_id) || []);
        
        setPosts(data?.map(post => ({
          ...post,
          user_liked: likedPostIds.has(post.id)
        })) || []);
      } else {
        setPosts(data || []);
      }
    } catch (error: any) {
      toast.error('Không thể tải bài viết: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          title: newTitle,
          content: newContent,
          category: newCategory,
        });

      if (error) throw error;

      toast.success('Đã đăng bài thành công!');
      setNewTitle('');
      setNewContent('');
      setNewCategory('other');
      setShowNewPost(false);
      fetchPosts();
    } catch (error: any) {
      toast.error('Lỗi khi đăng bài: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (postId: string, currentlyLiked: boolean) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      if (currentlyLiked) {
        // Unlike
        const { error } = await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        // Like
        const { error } = await supabase
          .from('post_likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (error) throw error;
      }

      fetchPosts();
    } catch (error: any) {
      toast.error('Lỗi: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center animate-fade-in">
              <h1 className="text-4xl font-bold mb-4">
                Cộng Đồng <span className="text-primary">コミュニティ</span>
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                Chia sẻ kinh nghiệm, đặt câu hỏi và kết nối với người học tiếng Nhật
              </p>
              
              {user ? (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => setShowNewPost(!showNewPost)}
                >
                  <PenSquare className="w-5 h-5 mr-2" />
                  {showNewPost ? 'Hủy' : 'Viết bài mới'}
                </Button>
              ) : (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={() => navigate('/auth')}
                >
                  Đăng nhập để viết bài
                </Button>
              )}
            </div>

            {/* New Post Form */}
            {showNewPost && user && (
              <Card className="animate-slide-up">
                <CardHeader>
                  <CardTitle>Tạo bài viết mới</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreatePost} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        placeholder="Tiêu đề bài viết"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        disabled={submitting}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Select value={newCategory} onValueChange={setNewCategory}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(categoryLabels).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Nội dung bài viết..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="min-h-[150px]"
                        disabled={submitting}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={submitting}>
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Đang đăng...
                        </>
                      ) : (
                        'Đăng bài'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Posts List */}
            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                <p className="text-muted-foreground">Đang tải bài viết...</p>
              </div>
            ) : posts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Chưa có bài viết nào. Hãy là người đầu tiên chia sẻ!
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {posts.map((post, idx) => (
                  <Card
                    key={post.id}
                    className="hover:shadow-lg transition-all animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={post.profiles.avatar_url || undefined} />
                          <AvatarFallback>
                            {post.profiles.display_name[0].toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{post.profiles.display_name}</p>
                              <p className="text-xs text-muted-foreground">
                                {post.profiles.japanese_level} • {' '}
                                {formatDistanceToNow(new Date(post.created_at), {
                                  addSuffix: true,
                                  locale: vi,
                                })}
                              </p>
                            </div>
                            <span className="text-xs px-2 py-1 bg-accent rounded">
                              {categoryLabels[post.category]}
                            </span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-3">{post.title}</CardTitle>
                      <CardDescription className="text-base whitespace-pre-wrap">
                        {post.content}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id, post.user_liked || false)}
                          className={post.user_liked ? 'text-red-500' : ''}
                        >
                          <Heart
                            className={`w-4 h-4 mr-1 ${
                              post.user_liked ? 'fill-current' : ''
                            }`}
                          />
                          {post.likes_count}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          {post.comments_count}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <ChatBotWidget />
    </div>
  );
};

export default Community;
