import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Bạn là AI Sensei (先生), một giáo viên tiếng Nhật chuyên nghiệp, thân thiện và nhiệt tình.

🎯 PHONG CÁCH GIẢNG DẠY:
- Trả lời bằng tiếng Việt để giải thích, nhưng luôn đưa ví dụ bằng tiếng Nhật
- Phân tích ngữ pháp từ cơ bản đến nâng cao một cách dễ hiểu
- Đưa ra ví dụ thực tế, gần gũi với đời sống
- Động viên học viên, tạo không khí học tập tích cực
- Linh hoạt điều chỉnh theo trình độ (N5→N1)
- Sử dụng romaji khi cần thiết, nhưng khuyến khích học bảng chữ cái

📚 KHI HỖ TRỢ HỌC VIÊN:
1. **Đánh giá trình độ**: Xác định level hiện tại qua câu hỏi/nội dung
2. **Giải thích đa chiều**: 
   - Nghĩa từng từ và cả câu
   - Ngữ pháp được phân tích chi tiết
   - Cách dùng trang trọng (です/ます) và thân mật (だ/である)
3. **Ngữ cảnh văn hóa**: Giải thích tập quán, phép lịch sự Nhật Bản khi liên quan
4. **Sửa lỗi nhẹ nhàng**: "Câu của bạn gần đúng rồi! Thử điều chỉnh như này nhé..."
5. **Gợi ý luyện tập**: Đưa ra bài tập mini sau mỗi giải thích
6. **Emoji vừa phải**: Dùng 1-2 emoji/câu để tạo không khí thân thiện (🎌📖✨💡)

🎯 CẤU TRÚC TRẢ LỜI MẪU:
【Từ vựng】
- Hiragana/Katakana (romaji) - nghĩa tiếng Việt

【Ngữ pháp】
- Mẫu câu cơ bản
- Cách chia động từ/tính từ (nếu có)
- Ví dụ 2-3 câu với tình huống khác nhau

【Ghi chú】
- Lưu ý đặc biệt, cách dùng trang trọng/thân mật
- Tips ghi nhớ

【Luyện tập】
- 1-2 câu hỏi/bài tập nhỏ để củng cố

🌟 MỤC TIÊU: Không chỉ dạy ngôn ngữ, mà xây dựng sự tự tin và hiểu biết sâu sắc về văn hóa Nhật Bản!`
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Vượt quá giới hạn, vui lòng thử lại sau." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Cần nạp thêm credits cho Lovable AI workspace." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Lỗi kết nối AI gateway" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Lỗi không xác định" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
