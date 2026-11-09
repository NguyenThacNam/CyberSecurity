// Điểm yếu của tôi – lấy từ các mục "Câu hỏi sai / Câu trả lời sai / Câu hỏi chú ý" trong ghi chép.
// Lưu ý: các mục "Câu hỏi sai" ở Khóa 2 (Mô đun 2), Khóa 3 (Mô đun 1, 2, 3) và Khóa 4 (Mô đun 1) trong ghi chép
// đang để trống (có thể là ảnh chụp chưa chuyển thành chữ) nên chưa có câu hỏi tương ứng.
window.DATA = window.DATA || {};
DATA.weak = [
  // ===== Khóa 3 · Mô đun 1 · "1 số câu hỏi chú ý" =====
  {
    id: "w-k3-001",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Địa chỉ IPv6 nào dưới đây hợp lệ?",
    options: [
      "FDA2: 7360:1e5b:e8f5 :a69f:c8bd:1b3e:2578 (có khoảng trắng)",
      "FDA2:7360:1h5b:e8g5:a69f:c8bd:1b3e:2578",
      "FDA2::1e5b:e8f5::1b3e:2578",
      "FDA2:7360:1e5b:e8f5:a69f:c8bd:1b3e:2578"
    ],
    answer: "FDA2:7360:1e5b:e8f5:a69f:c8bd:1b3e:2578",
    explain: "IPv6 gồm đủ 8 nhóm, mỗi nhóm chỉ chứa ký tự hex (0–9, a–f). Đáp án có khoảng trắng sai định dạng, có chữ <b>h</b>, <b>g</b> không phải hex, còn đáp án dùng <code>::</code> hai lần thì không hợp lệ. (Các đáp án sai được dựng lại theo mô tả lỗi trong ghi chép.)",
    topic: "Địa chỉ IP"
  },
  {
    id: "w-k3-002",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Trong một địa chỉ IPv6, ký hiệu rút gọn <code>::</code> được dùng tối đa bao nhiêu lần? Vì sao?",
    answer: "Chỉ <b>một lần</b> trong cùng một địa chỉ.",
    explain: "<code>::</code> thay cho một dãy các nhóm toàn số 0. Nếu dùng 2 lần, máy không biết mỗi chỗ <code>::</code> thay cho bao nhiêu nhóm nên không thể khôi phục đúng địa chỉ 8 nhóm. Giống như viết tắt 'v.v.' hai chỗ trong một số điện thoại – không ai biết mỗi chỗ thiếu mấy số.",
    topic: "Địa chỉ IP"
  },
  {
    id: "w-k3-003",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Phân biệt địa chỉ MAC và địa chỉ IP. Cái nào cố định theo thiết bị, cái nào thay đổi theo mạng?",
    answer: "<b>MAC</b> là mã định danh vật lý do nhà sản xuất gắn vào card mạng – cố định. <b>IP</b> là địa chỉ logic theo vị trí mạng – đổi khi thiết bị chuyển sang mạng khác.",
    explain: "MAC = số căn cước (đi đâu cũng không đổi), IP = địa chỉ nhà (ở nhà một địa chỉ, lên công ty được cấp địa chỉ khác). Internet dùng IP để định tuyến đến đúng 'tòa nhà', rồi trong mạng LAN dùng MAC để trao đúng tận tay thiết bị.",
    topic: "Địa chỉ IP"
  },
  {
    id: "w-k3-004",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Switch và Router khác nhau thế nào (làm việc ở lớp nào, dựa vào loại địa chỉ nào)?",
    answer: "<b>Switch</b>: Lớp 2, chuyển dữ liệu giữa các máy trong cùng mạng LAN dựa vào <b>địa chỉ MAC</b>. <b>Router</b>: Lớp 3, kết nối nhiều mạng khác nhau và định tuyến dựa vào <b>địa chỉ IP</b>.",
    explain: "Switch giống bác bảo vệ phát thư trong một tòa chung cư – chỉ lo các căn hộ bên trong. Router giống bưu điện liên tỉnh – quyết định gói tin đi từ mạng nhà bạn sang mạng Google hay sang Mỹ.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-005",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Port (cổng) đóng vai trò gì khi một máy chủ chỉ có 1 địa chỉ IP nhưng chạy nhiều dịch vụ? Web an toàn HTTPS dùng port nào?",
    answer: "Port chỉ định gói tin phải vào đúng dịch vụ/phần mềm nào trên máy chủ. HTTPS dùng <b>port 443</b> (ví dụ email SMTP dùng port 25).",
    explain: "IP là địa chỉ tòa chung cư, port là số căn hộ bên trong. Gói tin đến đúng tòa nhà (IP) rồi nhờ số căn hộ (port) mới vào đúng dịch vụ đang đợi.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-006",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "LAN và WAN nghĩa là gì?",
    answer: "<b>LAN</b> (Local Area Network) = mạng cục bộ/nội bộ, phạm vi nhỏ như nhà, văn phòng. <b>WAN</b> (Wide Area Network) = <b>mạng diện rộng</b>, trải trên khu vực địa lý lớn – Internet là WAN lớn nhất.",
    explain: "Ghi chép đang viết nhầm 'Wan : mạng cục bộ' – thực ra 'cục bộ' là LAN, còn WAN là diện rộng. Nhớ: LAN = khuôn viên nhà mình, WAN = hệ thống đường quốc lộ nối các thành phố.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-007",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Modem có chức năng gì?",
    answer: "Modem chuyển đổi tín hiệu trên đường truyền của nhà cung cấp (cáp quang/cáp đồng – tín hiệu quang/analog) thành tín hiệu số (0 và 1) cho mạng nội bộ và ngược lại; là cầu nối giữa mạng nhà bạn và ISP.",
    explain: "Modem là 'thông dịch viên' đứng ở cửa nhà: máy tính nói tiếng 0/1, đường dây ngoài phố nói tiếng ánh sáng/analog – không có thông dịch thì không ai hiểu ai.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-008",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "WAP (Wireless Access Point) có chức năng gì?",
    answer: "Nhận dữ liệu từ mạng dây (Ethernet) và phát thành sóng vô tuyến (Wi-Fi) để điện thoại, laptop kết nối không dây vào mạng LAN.",
    explain: "WAP là 'tháp phát sóng Wi-Fi' giúp nối dài mạng dây – nó không tự kết nối Internet, chỉ mở rộng mạng LAN sang không dây.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-009",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Modem nhà bạn bị hỏng, nhưng Switch và WAP vẫn chạy bình thường. Hai laptop cùng bắt Wi-Fi trong nhà có chia sẻ file cho nhau được không?",
    options: ["Được", "Không được"],
    answer: "Được",
    explain: "Dữ liệu giữa hai laptop chỉ đi qua WAP và Switch trong nhà, tìm nhau bằng MAC/IP nội bộ – hoàn toàn nằm trong mạng LAN nên không cần Modem.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-010",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Cùng tình huống Modem hỏng (Switch, WAP vẫn chạy): bạn có mở được google.com không? Vì sao?",
    options: ["Được", "Không được"],
    answer: "Không được",
    explain: "Truy cập google.com phải đi ra Internet (WAN). Không có Modem đứng ở cửa để chuyển tín hiệu số của máy tính thành tín hiệu cáp quang nên yêu cầu bị kẹt ngay trong nhà.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-011",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Nhà mạng (Viettel, FPT, VNPT…) lắp cho bạn đúng 1 'cục Wi-Fi'. Thiết bị đó thực chất tích hợp những thành phần nào?",
    answer: "Thiết bị '4 trong 1': <b>Modem</b> + <b>Router</b> + <b>Switch</b> + <b>WAP</b>.",
    explain: "Lần trước bạn chỉ trả lời 'Modem' – đúng nhưng mới 1/4. Modem chuyển tín hiệu cáp quang, Router cấp IP nội bộ và định tuyến ra Internet, Switch quản lý các cổng LAN phía sau, WAP phát Wi-Fi.",
    topic: "Thiết bị mạng"
  },
  {
    id: "w-k3-012",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Kể tên 4 lớp của mô hình TCP/IP theo thứ tự từ dưới lên và vai trò chính của mỗi lớp.",
    answer: "1. <b>Network Access</b> (Truy cập mạng): truyền bit vật lý, dùng MAC, ARP.<br>2. <b>Internet</b>: định tuyến giữa các mạng, dùng IP, ICMP.<br>3. <b>Transport</b> (Giao vận): port, TCP/UDP.<br>4. <b>Application</b> (Ứng dụng): HTTP/HTTPS, SMTP, DNS, SSH, FTP.",
    explain: "Nhớ như gửi bưu phẩm: Application viết nội dung thư, Transport ghi số phòng (port), Internet ghi địa chỉ nhà (IP), Network Access là xe chở hàng chạy trên đường (cáp/sóng).",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-013",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "ARP dùng để làm gì và thuộc lớp nào của mô hình TCP/IP?",
    answer: "ARP dịch <b>địa chỉ IP (logic) sang địa chỉ MAC (vật lý)</b> trong cùng một mạng LAN; thuộc lớp <b>Network Access</b> (tương ứng Lớp 2 Data Link của OSI).",
    explain: "Biết địa chỉ nhà (IP) rồi nhưng muốn trao tận tay phải biết số căn cước (MAC) – ARP là người đi hỏi 'Ai đang ở địa chỉ 192.168.1.5? Cho xin căn cước'.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-014",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "ICMP thuộc lớp nào của TCP/IP và dùng để làm gì?",
    answer: "Lớp <b>Internet</b>; dùng để báo lỗi và chẩn đoán mạng (ví dụ <code>ping</code>, thông báo Time Exceeded, Destination Unreachable).",
    explain: "ICMP là 'phiếu báo phát không thành công' của bưu điện: không chở dữ liệu người dùng, chỉ báo tình trạng đường đi.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-015",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Ba lớp nào của mô hình OSI được gộp thành lớp Application của TCP/IP?",
    answer: "Lớp 5 <b>Session</b> (Phiên), Lớp 6 <b>Presentation</b> (Trình diễn), Lớp 7 <b>Application</b> (Ứng dụng).",
    explain: "OSI là bản chia nhỏ chi tiết của TCP/IP. Mapping: OSI 1+2 → Network Access; OSI 3 → Internet; OSI 4 → Transport; OSI 5+6+7 → Application.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-016",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Lớp Network Access của TCP/IP tương đương với những lớp nào của OSI?",
    answer: "Lớp 1 <b>Physical</b> (Vật lý) và Lớp 2 <b>Data Link</b> (Liên kết dữ liệu).",
    explain: "Cả hai đều lo phần 'đường xá và xe chở': cáp, sóng Wi-Fi, card mạng (NIC), Switch và địa chỉ MAC.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-017",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Khi gửi một email, trong quá trình đóng gói (encapsulation), lớp nào thêm số port, lớp nào thêm IP nguồn/đích, lớp nào thêm MAC nguồn/đích?",
    answer: "<b>Transport</b> thêm số port → <b>Internet/Network</b> thêm IP nguồn & đích → <b>Network Access</b> thêm MAC nguồn & đích rồi chuyển thành tín hiệu 0/1 trên dây.",
    explain: "Giống bỏ thư vào nhiều lớp phong bì: mỗi lớp dán thêm một nhãn. Bên nhận bóc ngược lại từ ngoài vào trong (decapsulation).",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-018",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Xem livestream bóng đá hoặc gọi video thường dùng TCP hay UDP? Tải file ngân hàng/gửi email thì sao?",
    answer: "Livestream/video call: <b>UDP</b>. Tải file, gửi email: <b>TCP</b>.",
    explain: "TCP như thư bảo đảm – mất trang nào gửi lại trang đó, chậm nhưng đủ. UDP như bộ đàm – hình vỡ 1 giây thì bỏ qua, phát tiếp khung hình mới cho nhanh.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-019",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Mã hóa mật khẩu bằng SSL/TLS trước khi gửi đi là ví dụ của lớp nào trong mô hình OSI?",
    answer: "Lớp 6 – <b>Presentation</b> (Trình diễn).",
    explain: "Lớp Trình diễn lo 'định dạng và mã hóa' dữ liệu: dịch, nén, mã hóa/giải mã trước khi chuyển cho ứng dụng – như người đóng gói hàng vào hộp có khóa.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-020",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Đang tải file 10GB thì rớt mạng ở 8GB; khi có mạng lại, trình duyệt tải tiếp từ 8GB. Đây là nhờ lớp nào của OSI?",
    answer: "Lớp 5 – <b>Session</b> (Phiên), nhờ các điểm kiểm tra (checkpoint).",
    explain: "Lớp Phiên mở, duy trì, đóng phiên kết nối và đặt checkpoint – giống đánh dấu trang sách để lần sau đọc tiếp chứ không đọc lại từ đầu.",
    topic: "Mô hình OSI/TCP-IP"
  },
  {
    id: "w-k3-021",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "DNS làm nhiệm vụ gì và hoạt động ở lớp nào?",
    answer: "DNS dịch <b>tên miền</b> (dạng chữ) sang <b>địa chỉ IP</b> (dạng số); hoạt động ở lớp <b>Application</b>.",
    explain: "DNS là danh bạ điện thoại của Internet: bạn bấm gọi 'Mẹ', điện thoại tự tra ra số 098xxx. Con người nhớ tên, máy tính cần số.",
    topic: "DNS"
  },
  {
    id: "w-k3-022",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Trường TTL (Time to Live) trong tiêu đề IPv4 hoạt động thế nào? Khi TTL = 0 thì sao?",
    answer: "Mỗi lần gói tin đi qua 1 router, TTL giảm 1. Khi TTL = 0, router <b>hủy gói tin</b> và gửi thông báo <b>ICMP Time Exceeded</b> về máy gửi.",
    explain: "TTL như 'mức năng lượng' của lá thư: qua mỗi bưu cục mất 1 điểm; hết năng lượng thì bưu cục hủy thư để khỏi chạy vòng vòng làm chật bưu điện.",
    topic: "IPv4/IPv6 & TTL"
  },
  {
    id: "w-k3-023",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Gói IPv4 có TTL = 5 bị chạy vòng tròn giữa 6 router. Điều gì xảy ra? Nếu không có TTL thì Internet gặp thảm họa gì?",
    answer: "TTL về 0 sau 5 router → gói bị hủy, router gửi ICMP Time Exceeded. Không có TTL, hàng triệu gói kẹt vòng lặp sẽ sống mãi, ngốn băng thông và làm nghẽn/sập mạng (routing loop).",
    explain: "Giống món hàng rơi giữa đường không ai dọn: càng ngày càng nhiều, cuối cùng tắc toàn bộ giao thông. TTL là cơ chế 'tự hủy' để dọn đường.",
    topic: "IPv4/IPv6 & TTL"
  },
  {
    id: "w-k3-024",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Khi gói IPv4 bị phân mảnh (fragmentation), những trường nào trong tiêu đề giúp máy nhận lắp ráp lại?",
    answer: "<b>Identification</b> (ID gói tin), <b>Flags</b> (cờ báo còn mảnh phía sau không), <b>Fragment Offset</b> (vị trí của mảnh).",
    explain: "Như tháo bộ bàn ghế gỗ thành 3 thùng để qua cửa hẹp: mỗi thùng ghi cùng mã đơn hàng (ID), ghi 'còn thùng nữa' (Flags) và thứ tự 1, 2, 3 (Offset) để bên kia lắp lại.",
    topic: "IPv4/IPv6 & TTL"
  },
  {
    id: "w-k3-025",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "So sánh IPv4 và IPv6 về độ dài địa chỉ, cách viết và tiêu đề.",
    answer: "IPv4: <b>32-bit</b> (~4,3 tỷ địa chỉ, đã cạn), tiêu đề 20–60 byte. IPv6: <b>128-bit</b> (~3,4 × 10^38 địa chỉ), viết thành 8 nhóm hex, tiêu đề đơn giản hơn và router không phân mảnh.",
    explain: "IPv4 như biển số xe cũ đã hết số để cấp; IPv6 là hệ biển số mới dài hơn rất nhiều nên gần như vô tận.",
    topic: "IPv4/IPv6 & TTL"
  },
  {
    id: "w-k3-026",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Lần đầu gõ facebook.com mất 0,2 giây để hỏi DNS Server, lần thứ hai mở gần như ngay lập tức. Máy tính đã làm gì ở lần thứ hai?",
    answer: "Dùng <b>DNS Cache</b>: lần đầu máy lưu cặp facebook.com → IP vào bộ nhớ tạm; lần sau tra ngay trong cache mà không cần hỏi DNS Server.",
    explain: "Như lưu số điện thoại vào danh bạ sau lần đầu hỏi tổng đài – lần sau bấm gọi luôn. (Với SOC: kẻ tấn công có thể đầu độc cache này – DNS cache poisoning.)",
    topic: "DNS"
  },
  {
    id: "w-k3-027",
    course: "K3",
    source: "Khóa 3 · Mô đun 1 · Câu hỏi chú ý",
    question: "Router IPv6 nhận được gói tin quá lớn so với MTU của đường truyền thì xử lý thế nào? Ai chịu trách nhiệm chia nhỏ gói?",
    answer: "Router IPv6 <b>không được phân mảnh</b>: nó hủy gói và gửi thông báo <b>ICMPv6 'Packet Too Big'</b> về máy gửi. <b>Máy gửi (nguồn)</b> phải tự chia nhỏ dữ liệu trước khi gửi lại.",
    explain: "Khác IPv4 (router tự xé nhỏ, tốn CPU). IPv6 dồn việc chia gói về nơi gửi để router chỉ việc chuyển thật nhanh – như bưu điện chỉ nhận thùng đúng cỡ, quá cỡ thì trả về người gửi tự đóng lại. (Ghi chép viết 'Packet Too Too Big' – tên đúng là 'Packet Too Big'.)",
    topic: "IPv4/IPv6 & TTL"
  },

  // ===== Khóa 3 · Mô đun 2 · Câu hỏi ôn tập =====
  {
    id: "w-k3-028",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Câu hỏi ôn tập",
    question: "Khi gõ www.yummyrecipesforme.org và nhấn Enter, giữa DNS và TCP giao thức nào chạy trước? Nếu nó thất bại, bắt tay TCP có diễn ra được không?",
    answer: "<b>DNS chạy trước</b>. Nếu DNS thất bại thì <b>không</b> thể bắt tay TCP vì máy không có địa chỉ IP của máy chủ.",
    explain: "Bắt tay TCP cần biết IP đích (muốn gửi thư phải biết số nhà). Lúc nhấn Enter máy mới chỉ có tên miền, nên DNS phải dịch ra IP trước; DNS 'gãy' là cả quy trình dừng.",
    topic: "DNS"
  },
  {
    id: "w-k3-029",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Câu hỏi ôn tập",
    question: "Bạn nhập tài khoản/mật khẩu vào một trang chỉ dùng HTTP trên Wi-Fi quán cà phê. Hacker bắt gói tin cùng mạng sẽ thấy mật khẩu dưới dạng nào? HTTPS giải quyết ra sao?",
    answer: "Thấy dưới dạng <b>văn bản thuần (plaintext)</b>, ví dụ <code>password=123456</code>. HTTPS mã hóa dữ liệu bằng <b>SSL/TLS</b> nên gói bắt được chỉ là chuỗi ký tự vô nghĩa.",
    explain: "HTTP như gửi bưu thiếp – ai cầm cũng đọc được. HTTPS như thư niêm phong có khóa – lấy được thư cũng không đọc được nội dung.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-030",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Giao thức / port nên nhớ",
    question: "Quản trị máy từ xa: Telnet và SSH dùng port nào? Nên dùng cái nào?",
    answer: "Telnet: <b>port 23</b> (không mã hóa – nguy hiểm). SSH: <b>port 22</b> (mã hóa – nên dùng).",
    explain: "Telnet gửi cả mật khẩu dạng plaintext, ai nghe lén cũng thấy. SSH là phiên bản hiện đại có mã hóa. Trong SOC, thấy port 23 mở là dấu hiệu cần cảnh giác.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-031",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Giao thức / port nên nhớ",
    question: "Nêu port của các giao thức email: SMTP, POP3, IMAP. Khác nhau thế nào?",
    answer: "<b>SMTP</b> (gửi thư): 25 / 587. <b>POP3</b> (nhận thư, tải về và xóa trên server): 110 / 995 (SSL). <b>IMAP</b> (nhận thư, đồng bộ nhiều thiết bị): 143 / 993 (SSL).",
    explain: "SMTP là bưu tá đi gửi; POP3 như mang thư từ hộp thư về nhà rồi hộp trống; IMAP như đọc thư ngay tại hộp thư chung – điện thoại, laptop đều thấy giống nhau.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-032",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Giao thức / port nên nhớ",
    question: "DHCP dùng giao thức Transport nào và port nào cho server/client?",
    answer: "<b>UDP</b>; server dùng <b>port 67</b>, client dùng <b>port 68</b>.",
    explain: "DHCP tự động cấp IP cho máy mới vào mạng – như lễ tân phát số phòng cho khách mới đến. Máy chưa có IP nên phải 'hô to' (broadcast) bằng UDP.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-033",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Giao thức / port nên nhớ",
    question: "ARP có số port không? Vì sao?",
    answer: "<b>Không có port</b>, vì ARP hoạt động ở Lớp 2 (Data Link / Network Access), còn khái niệm port thuộc <b>Lớp 4 – Transport</b> (TCP/UDP).",
    explain: "Ghi chép viết 'Port nằm ở Lớp 7 Application' – chưa đúng: port được gắn ở lớp Transport (TCP/UDP), các ứng dụng Lớp 7 chỉ 'sử dụng' port đó. ARP nằm dưới cả lớp Transport nên không có số căn hộ (port) nào.",
    topic: "Giao thức & Port"
  },
  {
    id: "w-k3-034",
    course: "K3",
    source: "Khóa 3 · Mô đun 2 · Giao thức / port nên nhớ",
    question: "HTTP và HTTPS dùng port nào, chạy trên TCP hay UDP?",
    answer: "HTTP: <b>port 80</b> (TCP, không mã hóa). HTTPS: <b>port 443</b> (TCP, mã hóa SSL/TLS).",
    explain: "Mẹo nhớ: 80 là web 'trần trụi', 443 là web 'mặc áo giáp'. Cả hai cần TCP vì trang web phải tải đầy đủ, không được thiếu gói.",
    topic: "Giao thức & Port"
  },

  // ===== Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách =====
  {
    id: "w-k3-035",
    course: "K3",
    source: "Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách",
    question: "Trong log tcpdump của sự cố yummyrecipesforme.com, truy vấn DNS được gửi bằng giao thức nào và tới port nào?",
    options: ["TCP port 443", "UDP port 53", "TCP port 80", "ICMP port 53"],
    answer: "UDP port 53",
    explain: "Truy vấn DNS thông thường đi bằng <b>UDP port 53</b> (nhanh, gọn – hỏi một câu, đáp một câu). ICMP không có port; nó chỉ là giao thức báo lỗi.",
    topic: "tcpdump"
  },
  {
    id: "w-k3-036",
    course: "K3",
    source: "Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách",
    question: "Dòng log: <code>13:24:36.098564 IP 203.0.113.2 &gt; 192.51.100.15: ICMP 203.0.113.2 udp port 53 unreachable length 254</code> cho biết điều gì?",
    answer: "Máy chủ DNS 203.0.113.2 trả về thông báo lỗi <b>ICMP</b> rằng <b>UDP port 53 không thể truy cập</b> – dịch vụ DNS không nhận/xử lý truy vấn, nên tên miền không được phân giải ra IP.",
    explain: "Bạn gõ cửa căn hộ số 53 (DNS) nhưng bảo vệ báo lại 'căn hộ này không có ai mở cửa'. Đọc chiều mũi tên <code>&gt;</code>: từ 203.0.113.2 gửi ngược về máy người dùng 192.51.100.15.",
    topic: "tcpdump"
  },
  {
    id: "w-k3-037",
    course: "K3",
    source: "Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách",
    question: "Trong dòng truy vấn DNS của tcpdump, các phần <code>35084</code> và <code>A?</code> nghĩa là gì?",
    answer: "<code>35084</code> là <b>ID truy vấn DNS</b>; <code>A?</code> nghĩa là đang hỏi <b>bản ghi A</b> – tức địa chỉ IPv4 của tên miền yummyrecipesforme.com.",
    explain: "ID truy vấn giống số phiếu hỏi đáp để ghép câu trả lời với đúng câu hỏi; bản ghi A = 'Address', câu hỏi 'tên này ở địa chỉ IP nào?'.",
    topic: "tcpdump"
  },
  {
    id: "w-k3-038",
    course: "K3",
    source: "Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách",
    question: "Từ log tcpdump sự cố yummyrecipesforme.com, hãy xác định: dịch vụ bị ảnh hưởng, giao thức gửi truy vấn, port, giao thức báo lỗi và nguyên nhân nghi ngờ.",
    answer: "Dịch vụ: <b>DNS</b>; giao thức truy vấn: <b>UDP</b>; port: <b>53</b>; giao thức báo lỗi: <b>ICMP</b>. Nguyên nhân nghi ngờ: dịch vụ DNS ngừng hoạt động, hoặc port 53 bị đóng/bị firewall chặn.",
    explain: "Log lặp lại 3 lần cùng một kiểu (gửi DNS → nhận ICMP lỗi) là một pattern, không phải lỗi ngẫu nhiên. Bước tiếp theo: kiểm tra trạng thái dịch vụ DNS, cấu hình port 53 và rule firewall.",
    topic: "tcpdump"
  },
  {
    id: "w-k3-039",
    course: "K3",
    source: "Khóa 3 · Mô đun 3 · Câu hỏi sai trong thử thách",
    question: "Người dùng không vào được website và trình duyệt báo 'destination port unreachable'. Luồng truy cập bình thường phải đi qua những bước nào, và sự cố này gãy ở bước nào?",
    answer: "Bình thường: Máy người dùng → <b>DNS Server</b> (lấy IP) → kết nối <b>HTTPS</b> → Web Server. Sự cố gãy ngay ở bước <b>DNS</b> nên chưa bao giờ tới được web server.",
    explain: "Lỗi 'port unreachable' dễ khiến nghĩ web server hỏng, nhưng log cho thấy chính truy vấn DNS (UDP 53) bị từ chối. Không có IP thì không có kết nối HTTPS nào cả.",
    topic: "tcpdump"
  },

  // ===== Khóa 3 · Mô đun 4 · Câu hỏi sai =====
  {
    id: "w-k3-040",
    course: "K3",
    source: "Khóa 3 · Mô đun 4 · Câu hỏi sai",
    question: "Một nhà phân tích xem tài liệu quy tắc firewall (port nào được phép/không được phép) rồi so sánh với cấu hình firewall hiện tại để tìm thay đổi chưa được thực hiện. Đây là hoạt động tăng cường bảo mật nào?",
    options: [
      "Kiểm tra thâm nhập (penetration test)",
      "Cập nhật bản vá (patch update)",
      "Kiểm tra cấu hình cơ sở (baseline configuration)",
      "Lọc cổng (port filtering)"
    ],
    answer: "Kiểm tra cấu hình cơ sở (baseline configuration)",
    explain: "Baseline = cấu hình chuẩn mà hệ thống đáng lẽ phải tuân theo. Đối chiếu thực tế với chuẩn chính là kiểm tra baseline – ví dụ chuẩn ghi port 80 chặn nhưng firewall đang mở port 80 → lệch baseline. (Các đáp án nhiễu được dựng lại từ thuật ngữ cùng mô đun.)",
    topic: "Tăng cường bảo mật"
  }
];
