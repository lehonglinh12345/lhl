-- Clear existing lessons first
DELETE FROM public.lessons;

-- Insert N5 Lessons (25 lessons)
INSERT INTO public.lessons (level, lesson_number, title, description, vocabulary, grammar_points, estimated_hours) VALUES
-- N5 Bài 1-10
('N5', 1, 'Chào hỏi cơ bản', 'Học cách chào hỏi và giới thiệu bản thân', 
'[
  {"word": "こんにちは", "reading": "konnichiwa", "meaning": "Xin chào (ban ngày)"},
  {"word": "おはよう", "reading": "ohayou", "meaning": "Chào buổi sáng"},
  {"word": "こんばんは", "reading": "konbanwa", "meaning": "Chào buổi tối"},
  {"word": "さようなら", "reading": "sayounara", "meaning": "Tạm biệt"},
  {"word": "ありがとう", "reading": "arigatou", "meaning": "Cảm ơn"},
  {"word": "すみません", "reading": "sumimasen", "meaning": "Xin lỗi"},
  {"word": "はい", "reading": "hai", "meaning": "Vâng/Có"},
  {"word": "いいえ", "reading": "iie", "meaning": "Không"}
]'::jsonb,
'[
  {"point": "です/だ - Là", "examples": ["私は学生です。(Watashi wa gakusei desu) - Tôi là sinh viên.", "これは本です。(Kore wa hon desu) - Đây là quyển sách."]},
  {"point": "か - Nghi vấn", "examples": ["学生ですか。(Gakusei desu ka) - Bạn là sinh viên à?", "日本人ですか。(Nihonjin desu ka) - Bạn là người Nhật à?"]}
]'::jsonb, 2),

('N5', 2, 'Số đếm và thời gian', 'Học cách đếm số và nói giờ', 
'[
  {"word": "一", "reading": "いち (ichi)", "meaning": "Số 1"},
  {"word": "二", "reading": "に (ni)", "meaning": "Số 2"},
  {"word": "三", "reading": "さん (san)", "meaning": "Số 3"},
  {"word": "時", "reading": "じ (ji)", "meaning": "Giờ"},
  {"word": "分", "reading": "ふん (fun)", "meaning": "Phút"},
  {"word": "今", "reading": "いま (ima)", "meaning": "Bây giờ"},
  {"word": "何時", "reading": "なんじ (nanji)", "meaning": "Mấy giờ"}
]'::jsonb,
'[
  {"point": "~時です - Là...giờ", "examples": ["今、三時です。(Ima, sanji desu) - Bây giờ là 3 giờ.", "何時ですか。(Nanji desu ka) - Mấy giờ rồi?"]},
  {"point": "数字 1-10", "examples": ["一、二、三、四、五、六、七、八、九、十"]}
]'::jsonb, 3),

('N5', 3, 'Gia đình và người thân', 'Học từ vựng về gia đình', 
'[
  {"word": "家族", "reading": "かぞく (kazoku)", "meaning": "Gia đình"},
  {"word": "父", "reading": "ちち (chichi)", "meaning": "Bố (của mình)"},
  {"word": "母", "reading": "はは (haha)", "meaning": "Mẹ (của mình)"},
  {"word": "兄", "reading": "あに (ani)", "meaning": "Anh trai"},
  {"word": "姉", "reading": "あね (ane)", "meaning": "Chị gái"},
  {"word": "弟", "reading": "おとうと (otouto)", "meaning": "Em trai"},
  {"word": "妹", "reading": "いもうと (imouto)", "meaning": "Em gái"}
]'::jsonb,
'[
  {"point": "の - Sở hữu", "examples": ["私の家族 (watashi no kazoku) - Gia đình tôi", "友達の本 (tomodachi no hon) - Sách của bạn"]},
  {"point": "がいます - Có (người)", "examples": ["兄がいます。(Ani ga imasu) - Tôi có anh trai."]}
]'::jsonb, 2),

('N5', 4, 'Đồ vật xung quanh', 'Học tên các đồ vật thường gặp', 
'[
  {"word": "本", "reading": "ほん (hon)", "meaning": "Sách"},
  {"word": "ペン", "reading": "ぺん (pen)", "meaning": "Bút"},
  {"word": "机", "reading": "つくえ (tsukue)", "meaning": "Bàn"},
  {"word": "椅子", "reading": "いす (isu)", "meaning": "Ghế"},
  {"word": "鞄", "reading": "かばん (kaban)", "meaning": "Cặp"},
  {"word": "時計", "reading": "とけい (tokei)", "meaning": "Đồng hồ"},
  {"word": "携帯", "reading": "けいたい (keitai)", "meaning": "Điện thoại"}
]'::jsonb,
'[
  {"point": "これ/それ/あれ - Này/Đó/Kia", "examples": ["これは本です。(Kore wa hon desu) - Đây là sách.", "それはペンです。(Sore wa pen desu) - Đó là bút."]},
  {"point": "ここ/そこ/あそこ - Đây/Đó/Kia", "examples": ["本はここです。(Hon wa koko desu) - Sách ở đây."]}
]'::jsonb, 2),

('N5', 5, 'Địa điểm và vị trí', 'Học cách chỉ vị trí và địa điểm', 
'[
  {"word": "学校", "reading": "がっこう (gakkou)", "meaning": "Trường học"},
  {"word": "駅", "reading": "えき (eki)", "meaning": "Ga tàu"},
  {"word": "店", "reading": "みせ (mise)", "meaning": "Cửa hàng"},
  {"word": "上", "reading": "うえ (ue)", "meaning": "Trên"},
  {"word": "下", "reading": "した (shita)", "meaning": "Dưới"},
  {"word": "中", "reading": "なか (naka)", "meaning": "Trong"},
  {"word": "前", "reading": "まえ (mae)", "meaning": "Trước"}
]'::jsonb,
'[
  {"point": "~にあります - Có ở (đồ vật)", "examples": ["本は机の上にあります。(Hon wa tsukue no ue ni arimasu) - Sách ở trên bàn."]},
  {"point": "~にいます - Có ở (người/động vật)", "examples": ["猫は部屋にいます。(Neko wa heya ni imasu) - Mèo ở trong phòng."]}
]'::jsonb, 3),

('N5', 6, 'Động từ cơ bản nhóm 1', 'Học động từ nhóm 1 và chia thì', 
'[
  {"word": "行く", "reading": "いく (iku)", "meaning": "Đi"},
  {"word": "帰る", "reading": "かえる (kaeru)", "meaning": "Về"},
  {"word": "書く", "reading": "かく (kaku)", "meaning": "Viết"},
  {"word": "読む", "reading": "よむ (yomu)", "meaning": "Đọc"},
  {"word": "聞く", "reading": "きく (kiku)", "meaning": "Nghe"},
  {"word": "話す", "reading": "はなす (hanasu)", "meaning": "Nói"},
  {"word": "買う", "reading": "かう (kau)", "meaning": "Mua"}
]'::jsonb,
'[
  {"point": "ます形 - Thể lịch sự", "examples": ["行きます (ikimasu) - Đi", "書きます (kakimasu) - Viết"]},
  {"point": "~ません - Phủ định", "examples": ["行きません (ikimasen) - Không đi", "書きません (kakimasen) - Không viết"]}
]'::jsonb, 3),

('N5', 7, 'Động từ cơ bản nhóm 2', 'Học động từ nhóm 2 và chia thì', 
'[
  {"word": "食べる", "reading": "たべる (taberu)", "meaning": "Ăn"},
  {"word": "見る", "reading": "みる (miru)", "meaning": "Nhìn/Xem"},
  {"word": "起きる", "reading": "おきる (okiru)", "meaning": "Dậy"},
  {"word": "寝る", "reading": "ねる (neru)", "meaning": "Ngủ"},
  {"word": "教える", "reading": "おしえる (oshieru)", "meaning": "Dạy"},
  {"word": "覚える", "reading": "おぼえる (oboeru)", "meaning": "Nhớ"}
]'::jsonb,
'[
  {"point": "る動詞 - Động từ nhóm 2", "examples": ["食べます (tabemasu) - Ăn", "見ます (mimasu) - Xem"]},
  {"point": "~ました - Thì quá khứ", "examples": ["食べました (tabemashita) - Đã ăn", "見ました (mimashita) - Đã xem"]}
]'::jsonb, 3),

('N5', 8, 'Động từ bất quy tắc', 'Học động từ する và くる', 
'[
  {"word": "する", "reading": "する (suru)", "meaning": "Làm"},
  {"word": "来る", "reading": "くる (kuru)", "meaning": "Đến"},
  {"word": "勉強する", "reading": "べんきょうする (benkyou suru)", "meaning": "Học"},
  {"word": "料理する", "reading": "りょうりする (ryouri suru)", "meaning": "Nấu ăn"},
  {"word": "掃除する", "reading": "そうじする (souji suru)", "meaning": "Dọn dẹp"},
  {"word": "洗濯する", "reading": "せんたくする (sentaku suru)", "meaning": "Giặt giũ"}
]'::jsonb,
'[
  {"point": "する - Làm", "examples": ["勉強します (benkyou shimasu) - Học", "料理します (ryouri shimasu) - Nấu ăn"]},
  {"point": "来る - Đến", "examples": ["来ます (kimasu) - Đến", "来ました (kimashita) - Đã đến"]}
]'::jsonb, 3),

('N5', 9, 'Tính từ đuôi い', 'Học tính từ i và cách sử dụng', 
'[
  {"word": "大きい", "reading": "おおきい (ookii)", "meaning": "To/Lớn"},
  {"word": "小さい", "reading": "ちいさい (chiisai)", "meaning": "Nhỏ"},
  {"word": "高い", "reading": "たかい (takai)", "meaning": "Cao/Đắt"},
  {"word": "安い", "reading": "やすい (yasui)", "meaning": "Rẻ"},
  {"word": "新しい", "reading": "あたらしい (atarashii)", "meaning": "Mới"},
  {"word": "古い", "reading": "ふるい (furui)", "meaning": "Cũ"},
  {"word": "良い", "reading": "いい/よい (ii/yoi)", "meaning": "Tốt"}
]'::jsonb,
'[
  {"point": "い形容詞 - Tính từ i", "examples": ["大きいです (ookii desu) - To", "高いです (takai desu) - Cao/Đắt"]},
  {"point": "~くないです - Phủ định", "examples": ["大きくないです (ookikunai desu) - Không to", "高くないです (takakunai desu) - Không đắt"]}
]'::jsonb, 2),

('N5', 10, 'Tính từ đuôi な', 'Học tính từ na và cách sử dụng', 
'[
  {"word": "綺麗", "reading": "きれい (kirei)", "meaning": "Đẹp/Sạch"},
  {"word": "静か", "reading": "しずか (shizuka)", "meaning": "Yên tĩnh"},
  {"word": "賑やか", "reading": "にぎやか (nigiyaka)", "meaning": "Náo nhiệt"},
  {"word": "便利", "reading": "べんり (benri)", "meaning": "Tiện lợi"},
  {"word": "有名", "reading": "ゆうめい (yuumei)", "meaning": "Nổi tiếng"},
  {"word": "親切", "reading": "しんせつ (shinsetsu)", "meaning": "Tử tế"}
]'::jsonb,
'[
  {"point": "な形容詞 - Tính từ na", "examples": ["綺麗です (kirei desu) - Đẹp", "静かです (shizuka desu) - Yên tĩnh"]},
  {"point": "~じゃないです - Phủ định", "examples": ["綺麗じゃないです (kirei janai desu) - Không đẹp"]}
]'::jsonb, 2),

-- N5 Bài 11-20
('N5', 11, 'Thức ăn và đồ uống', 'Học từ vựng về đồ ăn', 
'[
  {"word": "食べ物", "reading": "たべもの (tabemono)", "meaning": "Đồ ăn"},
  {"word": "飲み物", "reading": "のみもの (nomimono)", "meaning": "Đồ uống"},
  {"word": "水", "reading": "みず (mizu)", "meaning": "Nước"},
  {"word": "お茶", "reading": "おちゃ (ocha)", "meaning": "Trà"},
  {"word": "肉", "reading": "にく (niku)", "meaning": "Thịt"},
  {"word": "魚", "reading": "さかな (sakana)", "meaning": "Cá"},
  {"word": "野菜", "reading": "やさい (yasai)", "meaning": "Rau"}
]'::jsonb,
'[
  {"point": "~が好きです - Thích", "examples": ["寿司が好きです。(Sushi ga suki desu) - Tôi thích sushi."]},
  {"point": "~が嫌いです - Ghét", "examples": ["野菜が嫌いです。(Yasai ga kirai desu) - Tôi ghét rau."]}
]'::jsonb, 2),

('N5', 12, 'Thời tiết và mùa', 'Học từ vựng về thời tiết', 
'[
  {"word": "天気", "reading": "てんき (tenki)", "meaning": "Thời tiết"},
  {"word": "晴れ", "reading": "はれ (hare)", "meaning": "Nắng"},
  {"word": "雨", "reading": "あめ (ame)", "meaning": "Mưa"},
  {"word": "雪", "reading": "ゆき (yuki)", "meaning": "Tuyết"},
  {"word": "暑い", "reading": "あつい (atsui)", "meaning": "Nóng"},
  {"word": "寒い", "reading": "さむい (samui)", "meaning": "Lạnh"},
  {"word": "春夏秋冬", "reading": "はる/なつ/あき/ふゆ", "meaning": "Xuân/Hạ/Thu/Đông"}
]'::jsonb,
'[
  {"point": "天気の表現 - Diễn đạt thời tiết", "examples": ["今日は暑いです。(Kyou wa atsui desu) - Hôm nay nóng.", "雨が降ります。(Ame ga furimasu) - Trời mưa."]}
]'::jsonb, 2),

('N5', 13, 'Quần áo và màu sắc', 'Học từ vựng về quần áo', 
'[
  {"word": "服", "reading": "ふく (fuku)", "meaning": "Quần áo"},
  {"word": "シャツ", "reading": "しゃつ (shatsu)", "meaning": "Áo sơ mi"},
  {"word": "ズボン", "reading": "ずぼん (zubon)", "meaning": "Quần"},
  {"word": "靴", "reading": "くつ (kutsu)", "meaning": "Giày"},
  {"word": "赤", "reading": "あか (aka)", "meaning": "Màu đỏ"},
  {"word": "青", "reading": "あお (ao)", "meaning": "Màu xanh"},
  {"word": "白黒", "reading": "しろ/くろ (shiro/kuro)", "meaning": "Trắng/Đen"}
]'::jsonb,
'[
  {"point": "色の表現 - Diễn đạt màu sắc", "examples": ["赤いシャツ (akai shatsu) - Áo sơ mi màu đỏ", "青い空 (aoi sora) - Bầu trời xanh"]}
]'::jsonb, 2),

('N5', 14, 'Giao thông và phương tiện', 'Học từ vựng về giao thông', 
'[
  {"word": "電車", "reading": "でんしゃ (densha)", "meaning": "Tàu điện"},
  {"word": "バス", "reading": "ばす (basu)", "meaning": "Xe buýt"},
  {"word": "タクシー", "reading": "たくしー (takushii)", "meaning": "Taxi"},
  {"word": "自転車", "reading": "じてんしゃ (jitensha)", "meaning": "Xe đạp"},
  {"word": "車", "reading": "くるま (kuruma)", "meaning": "Xe hơi"},
  {"word": "飛行機", "reading": "ひこうき (hikouki)", "meaning": "Máy bay"}
]'::jsonb,
'[
  {"point": "~で行きます - Đi bằng", "examples": ["電車で行きます。(Densha de ikimasu) - Đi bằng tàu điện.", "バスで行きます。(Basu de ikimasu) - Đi bằng xe buýt."]}
]'::jsonb, 2),

('N5', 15, 'Mua sắm', 'Học cách mua sắm bằng tiếng Nhật', 
'[
  {"word": "買い物", "reading": "かいもの (kaimono)", "meaning": "Mua sắm"},
  {"word": "値段", "reading": "ねだん (nedan)", "meaning": "Giá cả"},
  {"word": "円", "reading": "えん (en)", "meaning": "Yên"},
  {"word": "高い", "reading": "たかい (takai)", "meaning": "Đắt"},
  {"word": "安い", "reading": "やすい (yasui)", "meaning": "Rẻ"},
  {"word": "いくら", "reading": "いくら (ikura)", "meaning": "Bao nhiêu tiền"}
]'::jsonb,
'[
  {"point": "いくらですか - Bao nhiêu tiền?", "examples": ["これはいくらですか。(Kore wa ikura desu ka) - Cái này bao nhiêu tiền?"]},
  {"point": "~ください - Cho tôi", "examples": ["これをください。(Kore wo kudasai) - Cho tôi cái này."]}
]'::jsonb, 3),

('N5', 16, 'Sở thích và hoạt động', 'Học từ vựng về sở thích', 
'[
  {"word": "趣味", "reading": "しゅみ (shumi)", "meaning": "Sở thích"},
  {"word": "音楽", "reading": "おんがく (ongaku)", "meaning": "Âm nhạc"},
  {"word": "映画", "reading": "えいが (eiga)", "meaning": "Phim"},
  {"word": "スポーツ", "reading": "すぽーつ (supootsu)", "meaning": "Thể thao"},
  {"word": "旅行", "reading": "りょこう (ryokou)", "meaning": "Du lịch"},
  {"word": "写真", "reading": "しゃしん (shashin)", "meaning": "Ảnh"}
]'::jsonb,
'[
  {"point": "趣味の表現 - Nói về sở thích", "examples": ["趣味は音楽です。(Shumi wa ongaku desu) - Sở thích của tôi là âm nhạc.", "映画を見るのが好きです。(Eiga wo miru no ga suki desu) - Tôi thích xem phim."]}
]'::jsonb, 2),

('N5', 17, 'Ngày tháng và lịch', 'Học cách nói ngày tháng', 
'[
  {"word": "月", "reading": "つき/がつ (tsuki/gatsu)", "meaning": "Tháng"},
  {"word": "日", "reading": "ひ/にち (hi/nichi)", "meaning": "Ngày"},
  {"word": "年", "reading": "とし/ねん (toshi/nen)", "meaning": "Năm"},
  {"word": "今日", "reading": "きょう (kyou)", "meaning": "Hôm nay"},
  {"word": "昨日", "reading": "きのう (kinou)", "meaning": "Hôm qua"},
  {"word": "明日", "reading": "あした (ashita)", "meaning": "Ngày mai"}
]'::jsonb,
'[
  {"point": "日付の言い方 - Cách nói ngày tháng", "examples": ["今日は何月何日ですか。(Kyou wa nangatsu nannichi desu ka) - Hôm nay là ngày tháng mấy?", "一月一日 (ichigatsu tsuitachi) - Ngày 1 tháng 1"]}
]'::jsonb, 3),

('N5', 18, 'Tuần và các ngày trong tuần', 'Học tên các ngày trong tuần', 
'[
  {"word": "月曜日", "reading": "げつようび (getsuyoubi)", "meaning": "Thứ Hai"},
  {"word": "火曜日", "reading": "かようび (kayoubi)", "meaning": "Thứ Ba"},
  {"word": "水曜日", "reading": "すいようび (suiyoubi)", "meaning": "Thứ Tư"},
  {"word": "木曜日", "reading": "もくようび (mokuyoubi)", "meaning": "Thứ Năm"},
  {"word": "金曜日", "reading": "きんようび (kinyoubi)", "meaning": "Thứ Sáu"},
  {"word": "土曜日", "reading": "どようび (doyoubi)", "meaning": "Thứ Bảy"},
  {"word": "日曜日", "reading": "にちようび (nichiyoubi)", "meaning": "Chủ Nhật"}
]'::jsonb,
'[
  {"point": "曜日の表現 - Diễn đạt thứ", "examples": ["今日は何曜日ですか。(Kyou wa nan youbi desu ka) - Hôm nay là thứ mấy?", "月曜日に会います。(Getsuyoubi ni aimasu) - Gặp nhau vào thứ Hai."]}
]'::jsonb, 2),

('N5', 19, 'Thân thể con người', 'Học từ vựng về cơ thể', 
'[
  {"word": "頭", "reading": "あたま (atama)", "meaning": "Đầu"},
  {"word": "目", "reading": "め (me)", "meaning": "Mắt"},
  {"word": "耳", "reading": "みみ (mimi)", "meaning": "Tai"},
  {"word": "口", "reading": "くち (kuchi)", "meaning": "Miệng"},
  {"word": "手", "reading": "て (te)", "meaning": "Tay"},
  {"word": "足", "reading": "あし (ashi)", "meaning": "Chân"}
]'::jsonb,
'[
  {"point": "体の表現 - Diễn đạt về cơ thể", "examples": ["頭が痛いです。(Atama ga itai desu) - Đầu tôi đau.", "目が大きいです。(Me ga ookii desu) - Mắt to."]}
]'::jsonb, 2),

('N5', 20, 'Sức khỏe và bệnh tật', 'Học từ vựng về sức khỏe', 
'[
  {"word": "病気", "reading": "びょうき (byouki)", "meaning": "Bệnh"},
  {"word": "風邪", "reading": "かぜ (kaze)", "meaning": "Cảm"},
  {"word": "熱", "reading": "ねつ (netsu)", "meaning": "Sốt"},
  {"word": "痛い", "reading": "いたい (itai)", "meaning": "Đau"},
  {"word": "薬", "reading": "くすり (kusuri)", "meaning": "Thuốc"},
  {"word": "病院", "reading": "びょういん (byouin)", "meaning": "Bệnh viện"}
]'::jsonb,
'[
  {"point": "~が痛いです - Đau", "examples": ["頭が痛いです。(Atama ga itai desu) - Đầu đau.", "お腹が痛いです。(Onaka ga itai desu) - Bụng đau."]},
  {"point": "風邪を引く - Bị cảm", "examples": ["風邪を引きました。(Kaze wo hikimashita) - Tôi bị cảm."]}
]'::jsonb, 2),

-- N5 Bài 21-25
('N5', 21, 'Nhà ở và phòng', 'Học từ vựng về nhà cửa', 
'[
  {"word": "家", "reading": "いえ/うち (ie/uchi)", "meaning": "Nhà"},
  {"word": "部屋", "reading": "へや (heya)", "meaning": "Phòng"},
  {"word": "台所", "reading": "だいどころ (daidokoro)", "meaning": "Nhà bếp"},
  {"word": "トイレ", "reading": "といれ (toire)", "meaning": "Nhà vệ sinh"},
  {"word": "庭", "reading": "にわ (niwa)", "meaning": "Vườn"},
  {"word": "窓", "reading": "まど (mado)", "meaning": "Cửa sổ"},
  {"word": "ドア", "reading": "どあ (doa)", "meaning": "Cửa"}
]'::jsonb,
'[
  {"point": "~があります - Có (đồ vật)", "examples": ["部屋にテーブルがあります。(Heya ni teeburu ga arimasu) - Có bàn trong phòng."]},
  {"point": "~がいます - Có (người)", "examples": ["部屋に人がいます。(Heya ni hito ga imasu) - Có người trong phòng."]}
]'::jsonb, 2),

('N5', 22, 'Động vật', 'Học tên các loài động vật', 
'[
  {"word": "犬", "reading": "いぬ (inu)", "meaning": "Chó"},
  {"word": "猫", "reading": "ねこ (neko)", "meaning": "Mèo"},
  {"word": "鳥", "reading": "とり (tori)", "meaning": "Chim"},
  {"word": "魚", "reading": "さかな (sakana)", "meaning": "Cá"},
  {"word": "馬", "reading": "うま (uma)", "meaning": "Ngựa"},
  {"word": "牛", "reading": "うし (ushi)", "meaning": "Bò"}
]'::jsonb,
'[
  {"point": "動物の表現 - Diễn đạt về động vật", "examples": ["犬が好きです。(Inu ga suki desu) - Tôi thích chó.", "猫を飼っています。(Neko wo katteimasu) - Tôi nuôi mèo."]}
]'::jsonb, 2),

('N5', 23, 'Học tập và văn phòng phẩm', 'Học từ vựng về học tập', 
'[
  {"word": "勉強", "reading": "べんきょう (benkyou)", "meaning": "Học tập"},
  {"word": "宿題", "reading": "しゅくだい (shukudai)", "meaning": "Bài tập về nhà"},
  {"word": "試験", "reading": "しけん (shiken)", "meaning": "Kỳ thi"},
  {"word": "ノート", "reading": "のーと (nooto)", "meaning": "Vở"},
  {"word": "鉛筆", "reading": "えんぴつ (enpitsu)", "meaning": "Bút chì"},
  {"word": "消しゴム", "reading": "けしごむ (keshigomu)", "meaning": "Tẩy"}
]'::jsonb,
'[
  {"point": "~をします - Làm", "examples": ["勉強をします。(Benkyou wo shimasu) - Học bài.", "宿題をします。(Shukudai wo shimasu) - Làm bài tập."]}
]'::jsonb, 2),

('N5', 24, 'Công việc và nghề nghiệp', 'Học từ vựng về nghề nghiệp', 
'[
  {"word": "仕事", "reading": "しごと (shigoto)", "meaning": "Công việc"},
  {"word": "会社", "reading": "かいしゃ (kaisha)", "meaning": "Công ty"},
  {"word": "医者", "reading": "いしゃ (isha)", "meaning": "Bác sĩ"},
  {"word": "先生", "reading": "せんせい (sensei)", "meaning": "Giáo viên"},
  {"word": "学生", "reading": "がくせい (gakusei)", "meaning": "Sinh viên"},
  {"word": "会社員", "reading": "かいしゃいん (kaishain)", "meaning": "Nhân viên công ty"}
]'::jsonb,
'[
  {"point": "職業の表現 - Nói về nghề nghiệp", "examples": ["私は学生です。(Watashi wa gakusei desu) - Tôi là sinh viên.", "父は医者です。(Chichi wa isha desu) - Bố tôi là bác sĩ."]}
]'::jsonb, 2),

('N5', 25, 'Ôn tập tổng hợp N5', 'Ôn tập toàn bộ kiến thức N5', 
'[
  {"word": "全部", "reading": "ぜんぶ (zenbu)", "meaning": "Tất cả"},
  {"word": "たくさん", "reading": "たくさん (takusan)", "meaning": "Nhiều"},
  {"word": "少し", "reading": "すこし (sukoshi)", "meaning": "Một chút"},
  {"word": "とても", "reading": "とても (totemo)", "meaning": "Rất"},
  {"word": "大丈夫", "reading": "だいじょうぶ (daijoubu)", "meaning": "Ổn/Không sao"},
  {"word": "頑張る", "reading": "がんばる (ganbaru)", "meaning": "Cố gắng"}
]'::jsonb,
'[
  {"point": "総復習 - Ôn tập tổng hợp", "examples": ["全部わかりました。(Zenbu wakarimashita) - Tôi hiểu tất cả.", "頑張ってください。(Ganbatte kudasai) - Hãy cố gắng nhé!"]}
]'::jsonb, 4);

-- Insert N4 Lessons (25 lessons)
INSERT INTO public.lessons (level, lesson_number, title, description, vocabulary, grammar_points, estimated_hours) VALUES
-- N4 Bài 1-10
('N4', 1, 'Thể て của động từ', 'Học cách chia và sử dụng thể て', 
'[
  {"word": "食べて", "reading": "たべて (tabete)", "meaning": "Ăn (thể て)"},
  {"word": "飲んで", "reading": "のんで (nonde)", "meaning": "Uống (thể て)"},
  {"word": "見て", "reading": "みて (mite)", "meaning": "Xem (thể て)"},
  {"word": "来て", "reading": "きて (kite)", "meaning": "Đến (thể て)"},
  {"word": "して", "reading": "して (shite)", "meaning": "Làm (thể て)"}
]'::jsonb,
'[
  {"point": "て形 - Thể て", "examples": ["食べてください。(Tabete kudasai) - Hãy ăn đi.", "本を読んでいます。(Hon wo yonde imasu) - Đang đọc sách."]},
  {"point": "~てください - Xin hãy", "examples": ["ここに座ってください。(Koko ni suwatte kudasai) - Xin hãy ngồi đây."]}
]'::jsonb, 3),

('N4', 2, 'Thể ている - Tiếp diễn', 'Học cách diễn đạt hành động đang diễn ra', 
'[
  {"word": "食べている", "reading": "たべている (tabete iru)", "meaning": "Đang ăn"},
  {"word": "勉強している", "reading": "べんきょうしている (benkyou shite iru)", "meaning": "Đang học"},
  {"word": "寝ている", "reading": "ねている (nete iru)", "meaning": "Đang ngủ"},
  {"word": "働いている", "reading": "はたらいている (hataraite iru)", "meaning": "Đang làm việc"}
]'::jsonb,
'[
  {"point": "~ています - Đang làm gì", "examples": ["今、食べています。(Ima, tabete imasu) - Bây giờ đang ăn.", "母は料理しています。(Haha wa ryouri shite imasu) - Mẹ đang nấu ăn."]},
  {"point": "状態 - Trạng thái", "examples": ["結婚しています。(Kekkon shite imasu) - Đã kết hôn (đang ở trạng thái đã kết hôn)."]}
]'::jsonb, 3),

('N4', 3, 'Thể てから - Sau khi', 'Học cách nối câu diễn đạt thứ tự hành động', 
'[
  {"word": "朝ご飯", "reading": "あさごはん (asagohan)", "meaning": "Bữa sáng"},
  {"word": "昼ご飯", "reading": "ひるごはん (hirugohan)", "meaning": "Bữa trưa"},
  {"word": "晩ご飯", "reading": "ばんごはん (bangohan)", "meaning": "Bữa tối"},
  {"word": "シャワー", "reading": "しゃわー (shawaa)", "meaning": "Tắm"}
]'::jsonb,
'[
  {"point": "~てから - Sau khi", "examples": ["朝ご飯を食べてから、学校へ行きます。(Asagohan wo tabete kara, gakkou e ikimasu) - Sau khi ăn sáng, tôi đi học.", "宿題をしてから、遊びます。(Shukudai wo shite kara, asobimasu) - Sau khi làm bài, tôi đi chơi."]}
]'::jsonb, 2),

('N4', 4, 'Thể ないで - Không làm mà', 'Học cách diễn đạt phủ định', 
'[
  {"word": "朝食", "reading": "ちょうしょく (choushoku)", "meaning": "Bữa sáng"},
  {"word": "出発", "reading": "しゅっぱつ (shuppatsu)", "meaning": "Khởi hành"},
  {"word": "準備", "reading": "じゅんび (junbi)", "meaning": "Chuẩn bị"}
]'::jsonb,
'[
  {"point": "~ないで - Không làm mà", "examples": ["朝ご飯を食べないで、学校へ行きました。(Asagohan wo tabenaide, gakkou e ikimashita) - Không ăn sáng mà đi học.", "勉強しないで、寝ました。(Benkyou shinaide, nemashita) - Không học mà ngủ."]}
]'::jsonb, 2),

('N4', 5, 'Thể た形 - Quá khứ', 'Học cách chia động từ quá khứ', 
'[
  {"word": "食べた", "reading": "たべた (tabeta)", "meaning": "Đã ăn"},
  {"word": "行った", "reading": "いった (itta)", "meaning": "Đã đi"},
  {"word": "見た", "reading": "みた (mita)", "meaning": "Đã xem"},
  {"word": "した", "reading": "した (shita)", "meaning": "Đã làm"},
  {"word": "来た", "reading": "きた (kita)", "meaning": "Đã đến"}
]'::jsonb,
'[
  {"point": "た形 - Thể quá khứ", "examples": ["昨日、映画を見ました。(Kinou, eiga wo mimashita) - Hôm qua tôi đã xem phim.", "朝ご飯を食べました。(Asagohan wo tabemashita) - Đã ăn sáng."]},
  {"point": "~たことがある - Đã từng", "examples": ["日本に行ったことがあります。(Nihon ni itta koto ga arimasu) - Tôi đã từng đi Nhật."]}
]'::jsonb, 3),

('N4', 6, 'Thể たり～たり - Liệt kê', 'Học cách liệt kê hành động', 
'[
  {"word": "休み", "reading": "やすみ (yasumi)", "meaning": "Nghỉ/Kỳ nghỉ"},
  {"word": "週末", "reading": "しゅうまつ (shuumatsu)", "meaning": "Cuối tuần"},
  {"word": "映画館", "reading": "えいがかん (eigakan)", "meaning": "Rạp chiếu phim"}
]'::jsonb,
'[
  {"point": "~たり~たりする - Làm này làm nọ", "examples": ["週末は映画を見たり、音楽を聞いたりします。(Shuumatsu wa eiga wo mitari, ongaku wo kiitari shimasu) - Cuối tuần tôi xem phim, nghe nhạc, v.v."]}
]'::jsonb, 2),

('N4', 7, 'Thể ば形 - Điều kiện', 'Học cách diễn đạt điều kiện giả định', 
'[
  {"word": "天気予報", "reading": "てんきよほう (tenki yohou)", "meaning": "Dự báo thời tiết"},
  {"word": "時間", "reading": "じかん (jikan)", "meaning": "Thời gian"},
  {"word": "お金", "reading": "おかね (okane)", "meaning": "Tiền"}
]'::jsonb,
'[
  {"point": "~ば - Nếu", "examples": ["天気が良ければ、行きます。(Tenki ga yokereba, ikimasu) - Nếu thời tiết tốt, tôi sẽ đi.", "時間があれば、会いましょう。(Jikan ga areba, aimashou) - Nếu có thời gian, hãy gặp nhau."]}
]'::jsonb, 3),

('N4', 8, 'Thể たら - Khi/Nếu', 'Học cách diễn đạt điều kiện và thứ tự', 
'[
  {"word": "春", "reading": "はる (haru)", "meaning": "Mùa xuân"},
  {"word": "着く", "reading": "つく (tsuku)", "meaning": "Đến nơi"},
  {"word": "終わる", "reading": "おわる (owaru)", "meaning": "Kết thúc"}
]'::jsonb,
'[
  {"point": "~たら - Khi/Nếu", "examples": ["春になったら、桜が咲きます。(Haru ni nattara, sakura ga sakimasu) - Khi sang xuân, hoa anh đào nở.", "家に着いたら、電話してください。(Ie ni tsuitara, denwa shite kudasai) - Khi về đến nhà, hãy gọi điện."]}
]'::jsonb, 3),

('N4', 9, 'Thể と - Khi mà', 'Học cách diễn đạt điều tất yếu', 
'[
  {"word": "押す", "reading": "おす (osu)", "meaning": "Ấn/Nhấn"},
  {"word": "ボタン", "reading": "ぼたん (botan)", "meaning": "Nút"},
  {"word": "開く", "reading": "ひらく (hiraku)", "meaning": "Mở"}
]'::jsonb,
'[
  {"point": "~と - Khi...thì", "examples": ["このボタンを押すと、ドアが開きます。(Kono botan wo osu to, doa ga hirakimasu) - Khi ấn nút này thì cửa mở.", "春になると、暖かくなります。(Haru ni naru to, atatakaku narimasu) - Khi sang xuân thì ấm lên."]}
]'::jsonb, 2),

('N4', 10, 'Thể なら - Nếu mà', 'Học cách đưa ra gợi ý dựa trên điều kiện', 
'[
  {"word": "東京", "reading": "とうきょう (toukyou)", "meaning": "Tokyo"},
  {"word": "大阪", "reading": "おおさか (oosaka)", "meaning": "Osaka"},
  {"word": "旅行", "reading": "りょこう (ryokou)", "meaning": "Du lịch"}
]'::jsonb,
'[
  {"point": "~なら - Nếu là", "examples": ["日本へ行くなら、東京がいいですよ。(Nihon e iku nara, Toukyou ga ii desu yo) - Nếu đi Nhật thì Tokyo tốt đấy.", "寿司なら、あの店が美味しいです。(Sushi nara, ano mise ga oishii desu) - Nếu là sushi thì quán kia ngon."]}
]'::jsonb, 2),

-- N4 Bài 11-20
('N4', 11, 'Thể 使役形 - Sai khiến', 'Học cách diễn đạt bắt/cho phép', 
'[
  {"word": "行かせる", "reading": "いかせる (ikaseru)", "meaning": "Bắt đi"},
  {"word": "食べさせる", "reading": "たべさせる (tabesaseru)", "meaning": "Cho ăn"},
  {"word": "待たせる", "reading": "またせる (mataseru)", "meaning": "Bắt đợi"}
]'::jsonb,
'[
  {"point": "使役形 - Thể sai khiến", "examples": ["母は子供に野菜を食べさせます。(Haha wa kodomo ni yasai wo tabesasemasu) - Mẹ bắt con ăn rau.", "先生は学生を帰らせました。(Sensei wa gakusei wo kaerasemashita) - Giáo viên cho sinh viên về."]}
]'::jsonb, 3),

('N4', 12, 'Thể 受身形 - Bị động', 'Học cách diễn đạt bị động', 
'[
  {"word": "褒める", "reading": "ほめる (homeru)", "meaning": "Khen"},
  {"word": "褒められる", "reading": "ほめられる (homerareru)", "meaning": "Được khen"},
  {"word": "叱る", "reading": "しかる (shikaru)", "meaning": "Mắng"},
  {"word": "叱られる", "reading": "しかられる (shikarareru)", "meaning": "Bị mắng"}
]'::jsonb,
'[
  {"point": "受身形 - Thể bị động", "examples": ["先生に褒められました。(Sensei ni homeraremashita) - Tôi được thầy khen.", "母に叱られました。(Haha ni shikararemashita) - Tôi bị mẹ mắng."]}
]'::jsonb, 3),

('N4', 13, 'Thể 意向形 - Ý định', 'Học cách diễn đạt ý định và rủ rê', 
'[
  {"word": "行こう", "reading": "いこう (ikou)", "meaning": "Đi nào"},
  {"word": "食べよう", "reading": "たべよう (tabeyou)", "meaning": "Ăn nào"},
  {"word": "しよう", "reading": "しよう (shiyou)", "meaning": "Làm nào"}
]'::jsonb,
'[
  {"point": "意向形 - Thể ý định", "examples": ["一緒に行こう。(Issho ni ikou) - Cùng đi nào.", "映画を見ようと思います。(Eiga wo miyou to omoimasu) - Tôi định xem phim."]},
  {"point": "~と思う - Định/Nghĩ", "examples": ["明日早く起きようと思います。(Ashita hayaku okiyou to omoimasu) - Tôi định dậy sớm ngày mai."]}
]'::jsonb, 2),

('N4', 14, 'Thể 命令形 - Mệnh lệnh', 'Học cách diễn đạt mệnh lệnh và cấm đoán', 
'[
  {"word": "行け", "reading": "いけ (ike)", "meaning": "Đi đi!"},
  {"word": "食べろ", "reading": "たべろ (tabero)", "meaning": "Ăn đi!"},
  {"word": "するな", "reading": "するな (suruna)", "meaning": "Đừng làm!"}
]'::jsonb,
'[
  {"point": "命令形 - Thể mệnh lệnh", "examples": ["早く行け！(Hayaku ike!) - Đi nhanh lên!", "静かにしろ！(Shizuka ni shiro!) - Im đi!"]},
  {"point": "禁止形 - Thể cấm", "examples": ["入るな！(Hairu na!) - Đừng vào!", "触るな！(Sawaru na!) - Đừng chạm!"]}
]'::jsonb, 2),

('N4', 15, 'Thể 可能形 - Khả năng', 'Học cách diễn đạt khả năng làm được', 
'[
  {"word": "行ける", "reading": "いける (ikeru)", "meaning": "Có thể đi"},
  {"word": "食べられる", "reading": "たべられる (taberareru)", "meaning": "Có thể ăn"},
  {"word": "できる", "reading": "できる (dekiru)", "meaning": "Có thể làm"}
]'::jsonb,
'[
  {"point": "可能形 - Thể khả năng", "examples": ["日本語が話せます。(Nihongo ga hanasemasu) - Tôi nói được tiếng Nhật.", "漢字が読めます。(Kanji ga yomemasu) - Tôi đọc được chữ Hán."]},
  {"point": "~ことができる - Có thể", "examples": ["泳ぐことができます。(Oyogu koto ga dekimasu) - Tôi có thể bơi."]}
]'::jsonb, 3),

('N4', 16, 'Thể 尊敬語 - Tôn kính', 'Học cách nói tôn kính', 
'[
  {"word": "いらっしゃる", "reading": "いらっしゃる (irassharu)", "meaning": "Đến/Đi/Ở (tôn kính)"},
  {"word": "おっしゃる", "reading": "おっしゃる (ossharu)", "meaning": "Nói (tôn kính)"},
  {"word": "召し上がる", "reading": "めしあがる (meshiagaru)", "meaning": "Ăn/Uống (tôn kính)"}
]'::jsonb,
'[
  {"point": "尊敬語 - Ngôn ngữ tôn kính", "examples": ["先生がいらっしゃいました。(Sensei ga irasshaimashita) - Thầy đã đến.", "何をおっしゃいましたか。(Nani wo osshaimashita ka) - Thầy đã nói gì ạ?"]}
]'::jsonb, 3),

('N4', 17, 'Thể 謙譲語 - Khiêm tốn', 'Học cách nói khiêm tốn', 
'[
  {"word": "参る", "reading": "まいる (mairu)", "meaning": "Đi/Đến (khiêm tốn)"},
  {"word": "申す", "reading": "もうす (mousu)", "meaning": "Nói (khiêm tốn)"},
  {"word": "いただく", "reading": "いただく (itadaku)", "meaning": "Nhận/Ăn (khiêm tốn)"},
  {"word": "伺う", "reading": "うかがう (ukagau)", "meaning": "Hỏi/Đến thăm (khiêm tốn)"}
]'::jsonb,
'[
  {"point": "謙譲語 - Ngôn ngữ khiêm tốn", "examples": ["明日参ります。(Ashita mairimasu) - Ngày mai tôi sẽ đến.", "田中と申します。(Tanaka to moushimasu) - Tôi là Tanaka."]}
]'::jsonb, 3),

('N4', 18, 'Thể 丁寧語 - Lịch sự', 'Học cách nói lịch sự đặc biệt', 
'[
  {"word": "ございます", "reading": "ございます (gozaimasu)", "meaning": "Có (rất lịch sự)"},
  {"word": "でございます", "reading": "でございます (de gozaimasu)", "meaning": "Là (rất lịch sự)"},
  {"word": "お～になる", "reading": "お～になる", "meaning": "Làm gì (tôn kính)"}
]'::jsonb,
'[
  {"point": "丁寧語 - Ngôn ngữ lịch sự", "examples": ["こちらにございます。(Kochira ni gozaimasu) - Có ở đây ạ.", "何時でございますか。(Nanji de gozaimasu ka) - Mấy giờ ạ?"]}
]'::jsonb, 2),

('N4', 19, 'Văn phong thông tục', 'Học cách nói thông tục thân mật', 
'[
  {"word": "食う", "reading": "くう (kuu)", "meaning": "Ăn (thô)"},
  {"word": "飲む", "reading": "のむ (nomu)", "meaning": "Uống"},
  {"word": "やる", "reading": "やる (yaru)", "meaning": "Làm"},
  {"word": "くれる", "reading": "くれる (kureru)", "meaning": "Cho (tôi)"}
]'::jsonb,
'[
  {"point": "普通形 - Thể thông thường", "examples": ["昨日映画見た？(Kinou eiga mita?) - Hôm qua xem phim chưa?", "これ食べる？(Kore taberu?) - Ăn cái này không?"]}
]'::jsonb, 2),

('N4', 20, 'Thể あげる/もらう/くれる', 'Học cách diễn đạt cho và nhận', 
'[
  {"word": "あげる", "reading": "あげる (ageru)", "meaning": "Cho (ai đó)"},
  {"word": "もらう", "reading": "もらう (morau)", "meaning": "Nhận"},
  {"word": "くれる", "reading": "くれる (kureru)", "meaning": "Cho (tôi)"}
]'::jsonb,
'[
  {"point": "授受表現 - Diễn đạt trao nhận", "examples": ["友達に本をあげました。(Tomodachi ni hon wo agemashita) - Tôi cho bạn quyển sách.", "友達に本をもらいました。(Tomodachi ni hon wo moraimashita) - Tôi nhận sách từ bạn.", "友達が本をくれました。(Tomodachi ga hon wo kuremashita) - Bạn cho tôi sách."]},
  {"point": "~てあげる/~てもらう/~てくれる", "examples": ["手伝ってあげます。(Tetsudatte agemasu) - Tôi sẽ giúp (bạn)."]}
]'::jsonb, 3),

-- N4 Bài 21-25
('N4', 21, 'Liên từ và nối từ', 'Học các liên từ để nối câu', 
'[
  {"word": "それで", "reading": "それで (sorede)", "meaning": "Vì vậy"},
  {"word": "だから", "reading": "だから (dakara)", "meaning": "Cho nên"},
  {"word": "でも", "reading": "でも (demo)", "meaning": "Nhưng"},
  {"word": "しかし", "reading": "しかし (shikashi)", "meaning": "Tuy nhiên"},
  {"word": "または", "reading": "または (matawa)", "meaning": "Hoặc"}
]'::jsonb,
'[
  {"point": "接続詞 - Liên từ", "examples": ["雨が降りました。だから、行きませんでした。(Ame ga furimashita. Dakara, ikimasen deshita) - Trời mưa. Cho nên tôi không đi.", "高いです。でも、買います。(Takai desu. Demo, kaimasu) - Đắt. Nhưng tôi vẫn mua."]}
]'::jsonb, 2),

('N4', 22, 'Phó từ thường dùng', 'Học các phó từ bổ nghĩa', 
'[
  {"word": "とても", "reading": "とても (totemo)", "meaning": "Rất"},
  {"word": "たいへん", "reading": "たいへん (taihen)", "meaning": "Vất vả/Rất"},
  {"word": "ちょっと", "reading": "ちょっと (chotto)", "meaning": "Một chút"},
  {"word": "もっと", "reading": "もっと (motto)", "meaning": "Hơn nữa"},
  {"word": "まだ", "reading": "まだ (mada)", "meaning": "Vẫn/Chưa"},
  {"word": "もう", "reading": "もう (mou)", "meaning": "Đã/Rồi"}
]'::jsonb,
'[
  {"point": "副詞 - Phó từ", "examples": ["とても美味しいです。(Totemo oishii desu) - Rất ngon.", "もっと勉強します。(Motto benkyou shimasu) - Học nhiều hơn nữa."]}
]'::jsonb, 2),

('N4', 23, 'Câu hỏi gián tiếp', 'Học cách đặt câu hỏi gián tiếp', 
'[
  {"word": "知る", "reading": "しる (shiru)", "meaning": "Biết"},
  {"word": "分かる", "reading": "わかる (wakaru)", "meaning": "Hiểu"},
  {"word": "覚える", "reading": "おぼえる (oboeru)", "meaning": "Nhớ"},
  {"word": "忘れる", "reading": "わすれる (wasureru)", "meaning": "Quên"}
]'::jsonb,
'[
  {"point": "間接疑問 - Câu hỏi gián tiếp", "examples": ["どこに行くか知っていますか。(Doko ni iku ka shitte imasu ka) - Bạn có biết đi đâu không?", "何時に来るか分かりません。(Nanji ni kuru ka wakarimasen) - Tôi không biết mấy giờ đến."]}
]'::jsonb, 3),

('N4', 24, 'Ngữ pháp nâng cao', 'Học các mẫu ngữ pháp nâng cao', 
'[
  {"word": "～そうだ", "reading": "～そうだ (sou da)", "meaning": "Có vẻ/Nghe nói"},
  {"word": "～ようだ", "reading": "～ようだ (you da)", "meaning": "Có vẻ như"},
  {"word": "～らしい", "reading": "～らしい (rashii)", "meaning": "Có vẻ/Giống như"}
]'::jsonb,
'[
  {"point": "様態・伝聞 - Diễn đạt về vẻ và nghe nói", "examples": ["雨が降りそうです。(Ame ga furisou desu) - Có vẻ sẽ mưa.", "田中さんは来ないそうです。(Tanaka-san wa konai sou desu) - Nghe nói Tanaka không đến."]},
  {"point": "比況 - So sánh", "examples": ["子供のようです。(Kodomo no you desu) - Giống như trẻ con."]}
]'::jsonb, 3),

('N4', 25, 'Ôn tập tổng hợp N4', 'Ôn tập toàn bộ kiến thức N4', 
'[
  {"word": "復習", "reading": "ふくしゅう (fukushuu)", "meaning": "Ôn tập"},
  {"word": "完璧", "reading": "かんぺき (kanpeki)", "meaning": "Hoàn hảo"},
  {"word": "上手", "reading": "じょうず (jouzu)", "meaning": "Giỏi"},
  {"word": "頑張る", "reading": "がんばる (ganbaru)", "meaning": "Cố gắng"}
]'::jsonb,
'[
  {"point": "総合復習 - Ôn tập tổng hợp", "examples": ["全ての文法を復習しましょう。(Subete no bunpou wo fukushuu shimashou) - Hãy ôn tập tất cả ngữ pháp.", "N3に向けて頑張りましょう。(N3 ni mukete ganbarimashou) - Hãy cố gắng hướng tới N3."]}
]'::jsonb, 4);