import { useState } from "react";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

export const useJapaneseChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "こんにちは！👋\n\nXin chào! Tôi là AI Sensei, giáo viên tiếng Nhật thông minh của bạn.\n\n✨ Tôi có thể giúp bạn:\n• Giải thích ngữ pháp chi tiết (N5→N1)\n• Phân tích từ vựng và cách dùng\n• Sửa lỗi và cải thiện câu văn\n• Chia sẻ kiến thức văn hóa Nhật Bản\n• Gợi ý phương pháp học hiệu quả\n\nBạn muốn học điều gì hôm nay? 📚",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Cấu hình Supabase không đúng");
      }

      const CHAT_URL = `${supabaseUrl}/functions/v1/japanese-chat`;
      
      console.log("Sending message to:", CHAT_URL);
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      console.log("Response status:", resp.status);

      if (!resp.ok) {
        if (resp.status === 429 || resp.status === 402) {
          const errorData = await resp.json();
          toast.error(errorData.error);
          setIsLoading(false);
          return;
        }
        throw new Error("Không thể kết nối với AI Sensei");
      }

      if (!resp.body) throw new Error("Không nhận được phản hồi");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";
      let isFirstChunk = true;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const deltaContent = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (deltaContent) {
              assistantContent += deltaContent;
              
              setMessages((prev) => {
                if (isFirstChunk) {
                  isFirstChunk = false;
                  return [...prev, { role: "assistant", content: assistantContent }];
                }
                
                return prev.map((m, i) =>
                  i === prev.length - 1 && m.role === "assistant"
                    ? { ...m, content: assistantContent }
                    : m
                );
              });
            }
          } catch {
            // Incomplete JSON, put line back
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      const errorMessage = e instanceof Error ? e.message : "Đã có lỗi xảy ra";
      toast.error(`Lỗi: ${errorMessage}. Vui lòng thử lại!`);
      
      // Remove the failed user message
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
