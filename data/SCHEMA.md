# Định dạng dữ liệu – Web ôn tập SOC & Mạng

Mọi file dữ liệu là **script JS cổ điển** (không phải ES module), để mở `index.html` trực tiếp bằng file:// vẫn chạy.
Mỗi file bắt đầu bằng:

```js
window.DATA = window.DATA || {};
DATA.<tên> = [ ... ];
```

Quy ước chung:
- Viết **tiếng Việt có dấu**, giữ **thuật ngữ tiếng Anh** (có thể ghi kèm trong ngoặc).
- Chuỗi có thể chứa HTML nội tuyến đơn giản: `<b>`, `<i>`, `<code>`, `<br>`. Không dùng thẻ khác.
- `id` duy nhất, cố định (tiến độ người học lưu theo id → không đổi id sau khi tạo).
- Ngắn gọn: mỗi trường 1–2 câu, trừ khi ghi khác.
- Chỉ ghi kiến thức chính xác; không bịa số liệu, Event ID, port.

---

## 1. `cards.js` – Thẻ kiến thức → `DATA.cards`

```js
{
  id: "k-net-001",            // k-<track>-<số 3 chữ số>
  track: "chung",             // "chung" | "soc" | "mang"
  course: "K3",               // "K1".."K7" | "CCNA" | "EXTRA" (kiến thức ngoài 7 khóa)
  tier: 3,                    // 3 = bắt buộc, 2 = nên biết
  topic: "Mô hình mạng",      // nhóm chủ đề ngắn, dùng để lọc
  front: "TCP khác UDP ở điểm nào?",            // câu hỏi để TỰ NHỚ LẠI (active recall)
  def: "TCP có kết nối, đảm bảo thứ tự & tin cậy (bắt tay 3 bước); UDP không kết nối, nhanh, không đảm bảo.",
  example: "TCP như gửi thư bảo đảm có báo nhận; UDP như phát loa – nói xong không cần biết ai nghe.",
  trap: "DNS dùng chủ yếu UDP 53 (TCP 53 khi zone transfer/response lớn) – hay bị nhầm là chỉ TCP.",
  interview: "Vì sao video call / DNS dùng UDP mà không dùng TCP?",
  terms: ["three-way handshake", "connectionless"]   // tùy chọn: thuật ngữ EN liên quan
}
```

## 2. `weak.js` – Điểm yếu của tôi → `DATA.weak`

Lấy từ các mục "Câu hỏi sai / Câu trả lời sai / Câu hỏi chú ý" trong ghi chép của người học.

```js
{
  id: "w-k3-001",             // w-<khóa>-<số>
  course: "K3",
  source: "Khóa 3 · Mô đun 1 · Câu trả lời sai",   // nguồn trong ghi chép
  question: "…",              // câu hỏi (viết lại rõ ràng bằng tiếng Việt)
  options: ["…","…"],         // tùy chọn; bỏ trống nếu là câu tự luận
  answer: "…",                // đáp án đúng
  explain: "…",               // giải thích ngắn VÌ SAO, 1–3 câu; có thể dùng ví dụ đời thường
  topic: "Thiết bị mạng"
}
```

## 3. `vocab.js` – Từ vựng tiếng Anh chuyên ngành → `DATA.vocab`

```js
{
  id: "v-001",
  word: "assign",
  pos: "v",                   // n | v | adj | adv | phr
  dict: "giao phó, phân công",                  // nghĩa từ điển thông thường
  it: "gán, cấp (assign IP = cấp địa chỉ IP)",  // nghĩa trong ngữ cảnh IT
  multi: true,                // true nếu nghĩa IT khác nghĩa thường → ưu tiên học
  ex: "DHCP automatically assigns IP addresses to hosts.",
  exVi: "DHCP tự động cấp địa chỉ IP cho các máy.",
  tag: "network"              // network | security | soc | linux | windows | question | general
}
```

## 4. `logs.js` – Bài đọc log từng chữ → `DATA.logs`

```js
{
  id: "log-001",
  source: "Linux auth.log (SSH)",
  level: 1,                   // 1 dễ → 3 khó
  line: "Failed password for invalid user admin from 185.220.101.4 port 52144 ssh2",
  parts: [                    // tách theo cụm, giải nghĩa từng cụm
    ["Failed password", "Đăng nhập sai mật khẩu"],
    ["for invalid user admin", "với tên đăng nhập 'admin' – tài khoản này KHÔNG tồn tại"]
  ],
  meaning: "Ai đó thử đăng nhập SSH bằng username 'admin' không tồn tại, sai mật khẩu.",
  soc: "Lặp lại nhiều lần / nhiều username → brute force (MITRE T1110). Kiểm tra số lần, tra IP, chặn nếu cần."
}
```

## 5. `labs.js` – Hướng dẫn lab → `DATA.labs`

```js
{
  id: "N1",                   // S1..S8 | N1..N8 | SETUP-1..
  track: "mang",              // "soc" | "mang" | "chung"
  week: 1,
  title: "Dựng pfSense, chia 3 VLAN, NAT ra Internet",
  goal: "…",                  // 1–2 câu
  time: "60–90 phút",
  prereq: ["SETUP-1"],        // id các lab cần làm trước
  concepts: ["VLAN", "NAT"],
  steps: [
    { title: "Tạo VM pfSense", text: "…", code: "lệnh hoặc cấu hình (tùy chọn)", tip: "mẹo/cảnh báo (tùy chọn)" }
  ],
  verify: ["Cách kiểm tra đã làm đúng …"],
  questions: ["Câu hỏi tự kiểm tra …"],
  output: "Đầu ra cần nộp vào portfolio: …",
  mitre: "T1110"              // tùy chọn, cho lab SOC
}
```
