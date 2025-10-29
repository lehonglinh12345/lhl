import { useState } from "react";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

export const useJapaneseChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "こんにちは！Xin chào! Tôi là AI Sensei. Tôi sẽ giúp bạn học tiếng Nhật. Bạn muốn luyện tập kỹ năng nào hôm nay? 📚",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/japanese-chat`;
      
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

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
      console.error(e);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
