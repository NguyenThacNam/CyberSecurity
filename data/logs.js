window.DATA = window.DATA || {};
// Bài đọc log từng chữ – chỉ dùng IP tài liệu/kiểm thử (203.0.113.x, 198.51.100.x, 192.0.2.x) và IP nội bộ.
DATA.logs = [
  {
    id: "log-001",
    source: "Linux auth.log (SSH)",
    level: 1,
    line: "Nov  9 08:14:22 web01 sshd[2231]: Failed password for invalid user admin from 203.0.113.45 port 52144 ssh2",
    parts: [
      ["Nov  9 08:14:22", "Thời gian: ngày 9 tháng 11, lúc 08:14:22"],
      ["web01", "Tên máy (hostname) ghi ra dòng log này – chính là máy bị đăng nhập"],
      ["sshd[2231]", "Tiến trình <b>sshd</b> (SSH daemon – chữ d = daemon, dịch vụ chạy nền), số PID 2231"],
      ["Failed password", "Đăng nhập thất bại vì sai mật khẩu"],
      ["for invalid user admin", "<b>invalid user</b> = username KHÔNG tồn tại trên máy. Ở đây username kẻ thử gõ vào là 'admin'. KHÔNG phải 'do admin nhập'"],
      ["from 203.0.113.45", "<b>from</b> = đến từ địa chỉ IP nguồn 203.0.113.45 (máy đang thử đăng nhập)"],
      ["port 52144", "<b>Cổng NGUỒN</b> trên máy kẻ thử = 52144 (đọc đủ 5 chữ số, không phải port 52). Đây là cổng tạm ngẫu nhiên; cổng đích là 22 (SSH)"],
      ["ssh2", "Giao thức SSH phiên bản 2"]
    ],
    meaning: "Máy 203.0.113.45 thử đăng nhập SSH vào web01 bằng username 'admin' – user này không tồn tại, nên thất bại.",
    soc: "Thử username không tồn tại là dấu hiệu dò mật khẩu/dò user tự động. Đếm số lần theo IP, xem có dòng <code>Accepted</code> nào từ cùng IP không; nếu nhiều lần → brute force (MITRE T1110), chặn IP và đảm bảo tắt đăng nhập bằng mật khẩu nếu có thể."
  },
  {
    id: "log-002",
    source: "Linux auth.log (SSH)",
    level: 1,
    line: "Nov  9 08:20:05 web01 sshd[2410]: Accepted publickey for deploy from 192.168.1.50 port 50822 ssh2: ED25519 SHA256:Xk3p9Qm1vT7cLr2YbN8wZf4HsJ6dA0eUiO5gRqPtVyc",
    parts: [
      ["sshd[2410]", "Dịch vụ SSH, PID 2410"],
      ["Accepted", "<b>Accepted</b> = được chấp nhận → đăng nhập THÀNH CÔNG"],
      ["publickey", "Xác thực bằng khóa công khai (SSH key), không dùng mật khẩu"],
      ["for deploy", "Tài khoản đăng nhập là 'deploy' (user có thật)"],
      ["from 192.168.1.50 port 50822", "Từ IP nguồn nội bộ 192.168.1.50, cổng nguồn 50822"],
      ["ED25519 SHA256:Xk3p…", "Loại khóa (ED25519) và dấu vân tay (fingerprint) của khóa đã dùng – giúp biết chính xác khóa nào"]
    ],
    meaning: "User 'deploy' đăng nhập SSH thành công từ máy nội bộ 192.168.1.50 bằng SSH key.",
    soc: "Thường là hoạt động bình thường. Kiểm tra: IP và giờ có đúng thói quen của user không, fingerprint có phải khóa đã đăng ký không. Nếu IP này trước đó có nhiều <code>Failed</code> hoặc là IP lạ → nghi tài khoản bị chiếm (T1078 Valid Accounts)."
  },
  {
    id: "log-003",
    source: "Linux auth.log (SSH)",
    level: 2,
    line: "Nov  9 08:31:47 web01 sshd[2588]: Connection closed by authenticating user root 203.0.113.45 port 41890 [preauth]",
    parts: [
      ["Connection closed", "Kết nối đã bị đóng"],
      ["by authenticating user root", "Bên đóng là phía đang xác thực với tư cách user 'root'. Không có chữ 'invalid' → user root CÓ tồn tại"],
      ["203.0.113.45 port 41890", "IP nguồn và cổng nguồn của máy kết nối tới"],
      ["[preauth]", "<b>pre-auth</b> = xảy ra TRƯỚC KHI xác thực xong – chưa đăng nhập được"]
    ],
    meaning: "Máy 203.0.113.45 kết nối SSH, bắt đầu thử đăng nhập bằng root rồi ngắt khi chưa xác thực xong.",
    soc: "Hay gặp ở công cụ dò mật khẩu/quét tự động. Kết hợp với log-001 (cùng IP) → cùng một nguồn đang tấn công brute force (T1110). Kiểm tra cấu hình <code>PermitRootLogin no</code>, chặn IP, cân nhắc fail2ban."
  },
  {
    id: "log-004",
    source: "Linux auth.log (sudo)",
    level: 2,
    line: "Nov  9 09:02:11 web01 sudo:    alice : TTY=pts/0 ; PWD=/home/alice ; USER=root ; COMMAND=/usr/bin/cat /etc/shadow",
    parts: [
      ["sudo:", "Dòng log do lệnh sudo ghi (chạy lệnh với quyền user khác, thường là root)"],
      ["alice", "Người gõ lệnh sudo là user 'alice'"],
      ["TTY=pts/0", "Từ một terminal ảo (pts) – thường là phiên SSH"],
      ["PWD=/home/alice", "Thư mục hiện tại lúc gõ lệnh"],
      ["USER=root", "Lệnh được chạy VỚI quyền root"],
      ["COMMAND=/usr/bin/cat /etc/shadow", "Lệnh thực thi: đọc file <code>/etc/shadow</code> – file chứa hash mật khẩu của mọi user"]
    ],
    meaning: "User alice dùng sudo để đọc file chứa hash mật khẩu của hệ thống với quyền root.",
    soc: "Đọc /etc/shadow là hành vi đánh cắp thông tin đăng nhập (T1003.008). Xác minh với alice/quản lý xem có lý do công việc không; nếu không → nghi tài khoản alice bị chiếm, escalate lên Tier 2 và xem lại các phiên SSH của alice."
  },
  {
    id: "log-005",
    source: "Windows Security log (Event 4625)",
    level: 2,
    line: "EventID 4625 | An account failed to log on. | Account Name: admin | Logon Type: 3 | Failure Reason: Unknown user name or bad password. | Status: 0xC000006D | Sub Status: 0xC0000064 | Workstation Name: KALI | Source Network Address: 10.10.20.15 | Source Port: 49812",
    parts: [
      ["EventID 4625", "Mã sự kiện Windows 4625 = đăng nhập THẤT BẠI (4624 = thành công)"],
      ["An account failed to log on.", "Một tài khoản đăng nhập không thành công"],
      ["Account Name: admin", "Tên tài khoản được dùng để thử đăng nhập"],
      ["Logon Type: 3", "<b>Logon Type</b> = kiểu đăng nhập. 3 = Network: đăng nhập qua mạng (SMB, thư mục chia sẻ…)"],
      ["Failure Reason: Unknown user name or bad password.", "Lý do: sai username hoặc sai mật khẩu"],
      ["Sub Status: 0xC0000064", "Mã chi tiết: 0xC0000064 = username KHÔNG tồn tại (giống 'invalid user' bên Linux). 0xC000006A = user đúng nhưng sai mật khẩu"],
      ["Workstation Name: KALI", "Tên máy nguồn tự khai báo – 'KALI' gợi ý máy dùng Kali Linux (công cụ tấn công)"],
      ["Source Network Address: 10.10.20.15 | Source Port: 49812", "IP nguồn và cổng nguồn của máy đang thử đăng nhập"]
    ],
    meaning: "Máy nội bộ 10.10.20.15 (tên KALI) thử đăng nhập qua mạng bằng tài khoản 'admin' không tồn tại.",
    soc: "Nguồn nằm TRONG mạng nội bộ → có thể là máy đã bị chiếm hoặc người trong nội bộ đang dò mật khẩu (T1110). Đếm số event 4625 từ IP này, xem nó thử những tài khoản nào, tìm chủ sở hữu máy 10.10.20.15 và escalate."
  },
  {
    id: "log-006",
    source: "Windows Security log (Event 4625 – RDP)",
    level: 2,
    line: "EventID 4625 | An account failed to log on. | Account Name: Administrator | Logon Type: 10 | Failure Reason: Unknown user name or bad password. | Sub Status: 0xC000006A | Source Network Address: 198.51.100.77",
    parts: [
      ["EventID 4625", "Đăng nhập thất bại"],
      ["Account Name: Administrator", "Thử tài khoản quản trị mặc định của Windows"],
      ["Logon Type: 10", "10 = RemoteInteractive: đăng nhập từ xa qua <b>RDP</b> (Remote Desktop)"],
      ["Sub Status: 0xC000006A", "Tài khoản CÓ tồn tại nhưng SAI mật khẩu"],
      ["Source Network Address: 198.51.100.77", "IP nguồn là IP công cộng ngoài Internet"]
    ],
    meaning: "Một máy từ Internet (198.51.100.77) thử đăng nhập RDP bằng tài khoản Administrator nhưng sai mật khẩu.",
    soc: "RDP mở ra Internet bị dò mật khẩu (T1110, mục tiêu dịch vụ từ xa T1133/T1021.001). Kiểm tra có 4624 thành công từ IP này không; khuyến nghị không mở RDP ra Internet (dùng VPN), bật account lockout, đổi tên/khóa Administrator. Lưu ý: khi RDP bật NLA, lần thất bại thường được ghi là Logon Type 3."
  },
  {
    id: "log-007",
    source: "Windows Security log (Event 4720)",
    level: 2,
    line: "EventID 4720 | A user account was created. | Subject: Account Name: it-admin | Account Domain: CORP | New Account: Account Name: svc_update | Account Domain: CORP",
    parts: [
      ["EventID 4720", "Mã sự kiện 4720 = một tài khoản user MỚI được tạo"],
      ["Subject: Account Name: it-admin", "<b>Subject</b> = ai THỰC HIỆN hành động: tài khoản it-admin"],
      ["Account Domain: CORP", "Thuộc domain CORP (Active Directory)"],
      ["New Account: Account Name: svc_update", "Tài khoản vừa được tạo tên là svc_update (đặt tên giống tài khoản dịch vụ)"]
    ],
    meaning: "Tài khoản it-admin vừa tạo một user mới tên svc_update trong domain CORP.",
    soc: "Đối chiếu với ticket/yêu cầu thay đổi: có ai yêu cầu tạo tài khoản này không? Tạo tài khoản ngoài quy trình là kỹ thuật persistence (T1136 Create Account). Xem tiếp có event 4732/4728 (thêm vào nhóm quản trị) ngay sau đó không."
  },
  {
    id: "log-008",
    source: "Windows Security log (Event 4732)",
    level: 3,
    line: "EventID 4732 | A member was added to a security-enabled local group. | Subject: Account Name: it-admin | Member: Security ID: CORP\\svc_update | Group: Group Name: Administrators | Group Domain: Builtin",
    parts: [
      ["EventID 4732", "Mã 4732 = một thành viên được THÊM vào nhóm bảo mật cục bộ (local group)"],
      ["Subject: Account Name: it-admin", "Người thực hiện: it-admin"],
      ["Member: Security ID: CORP\\svc_update", "Thành viên được thêm: tài khoản svc_update (vừa tạo ở log-007)"],
      ["Group Name: Administrators", "Nhóm đích: <b>Administrators</b> – nhóm có toàn quyền trên máy"],
      ["Group Domain: Builtin", "Nhóm có sẵn (built-in) của Windows"]
    ],
    meaning: "Tài khoản svc_update vừa được thêm vào nhóm Administrators, tức được toàn quyền quản trị.",
    soc: "Chuỗi 4720 (tạo user) → 4732 (thêm vào Administrators) trong vài phút là mẫu kinh điển của persistence/leo thang quyền (T1136 + T1098 Account Manipulation). Nếu không có yêu cầu hợp lệ: vô hiệu hóa svc_update, kiểm tra tài khoản it-admin có bị chiếm không, escalate ngay."
  },
  {
    id: "log-009",
    source: "pfSense firewall (filterlog)",
    level: 3,
    line: "Nov  9 10:21:05 pfSense filterlog[44312]: 5,,,1000000103,em0,match,block,in,4,0x0,,52,23456,0,DF,6,tcp,60,203.0.113.88,198.51.100.10,51515,3389,0,S,1499011233,,64240,,mss;sackOK;TS;nop;wscale",
    parts: [
      ["filterlog[44312]", "Tiến trình ghi log của bộ lọc firewall pfSense"],
      ["5,,,1000000103", "Số thứ tự rule và mã tracker của rule đã khớp (dùng để tìm rule trong giao diện)"],
      ["em0", "<b>Interface</b> nhận gói – em0 thường là cổng WAN (phía Internet)"],
      ["match,block,in", "<b>match</b> = khớp rule; <b>block</b> = hành động chặn; <b>in</b> = chiều đi VÀO interface"],
      ["4", "IPv4"],
      ["52,23456,0,DF", "TTL = 52, IP ID = 23456, offset = 0, cờ DF (Don't Fragment)"],
      ["6,tcp,60", "Giao thức số 6 = TCP, độ dài gói 60 byte"],
      ["203.0.113.88,198.51.100.10", "IP nguồn (ngoài Internet) → IP đích (IP WAN của firewall)"],
      ["51515,3389", "Cổng nguồn 51515 → cổng đích <b>3389 = RDP</b>"],
      ["0,S", "Không có dữ liệu; cờ TCP <b>S</b> = SYN (gói mở kết nối đầu tiên)"],
      ["1499011233,,64240,,mss;…", "Số thứ tự (seq), window 64240 và các tùy chọn TCP"]
    ],
    meaning: "Firewall đã chặn một gói SYN từ 203.0.113.88 cố mở kết nối RDP (cổng 3389) vào IP WAN.",
    soc: "Firewall đã làm đúng việc (blocked) → mức độ thấp. Nếu cùng IP gõ nhiều cổng/nhiều IP → quét từ Internet (T1595 Active Scanning). Thường chỉ ghi nhận; quan tâm hơn nếu thấy dòng <code>pass</code> tới 3389."
  },
  {
    id: "log-010",
    source: "Apache access.log (SQL injection)",
    level: 3,
    line: "203.0.113.60 - - [09/Nov/2026:11:02:45 +0700] \"GET /product.php?id=1'%20OR%20'1'='1 HTTP/1.1\" 200 5123 \"-\" \"sqlmap/1.7.2#stable (https://sqlmap.org)\"",
    parts: [
      ["203.0.113.60", "IP của client gửi request"],
      ["- -", "Hai trường trống: identd và user đã xác thực (không có)"],
      ["[09/Nov/2026:11:02:45 +0700]", "Thời gian, múi giờ +07:00"],
      ["GET /product.php", "Phương thức GET tới trang product.php"],
      ["?id=1'%20OR%20'1'='1", "Tham số id bị chèn mã SQL. <code>%20</code> = dấu cách → giải mã: <code>1' OR '1'='1</code> – điều kiện luôn ĐÚNG, mẹo kinh điển của SQL injection"],
      ["HTTP/1.1", "Phiên bản giao thức"],
      ["200", "Mã trạng thái <b>200 OK</b> – server đã trả về trang bình thường (KHÔNG có nghĩa chắc chắn tấn công thành công, nhưng cần kiểm tra)"],
      ["5123", "Kích thước phản hồi (byte) – so với request bình thường để xem có trả về nhiều dữ liệu hơn không"],
      ["\"-\"", "Referer trống"],
      ["\"sqlmap/1.7.2#stable …\"", "<b>User-Agent</b> = sqlmap – công cụ tự động khai thác SQL injection"]
    ],
    meaning: "Công cụ sqlmap từ 203.0.113.60 đang thử SQL injection vào tham số id của product.php, và server trả về 200.",
    soc: "Tấn công ứng dụng web (T1190 Exploit Public-Facing Application). Lọc toàn bộ request từ IP này, so kích thước phản hồi, xem log lỗi DB/ứng dụng. Chặn IP/User-Agent ở WAF, báo đội phát triển sửa bằng prepared statement; escalate nếu nghi rò rỉ dữ liệu."
  },
  {
    id: "log-011",
    source: "Nginx access.log (scanner)",
    level: 1,
    line: "198.51.100.99 - - [09/Nov/2026:04:15:03 +0000] \"GET /.env HTTP/1.1\" 404 153 \"-\" \"Mozilla/5.0 zgrab/0.x\"",
    parts: [
      ["198.51.100.99", "IP nguồn"],
      ["GET /.env", "Yêu cầu file <code>.env</code> – file cấu hình hay chứa mật khẩu DB, API key"],
      ["404", "<b>404 Not Found</b> – file không tồn tại → kẻ dò không lấy được gì"],
      ["153", "Kích thước phản hồi nhỏ (trang báo lỗi)"],
      ["\"Mozilla/5.0 zgrab/0.x\"", "User-Agent của zgrab – công cụ quét hàng loạt trên Internet"]
    ],
    meaning: "Một máy quét tự động thử tải file .env để tìm mật khẩu, nhưng file không tồn tại (404).",
    soc: "Quét tự động rất phổ biến (T1595.003 Wordlist Scanning), 404 → không thành công, mức thấp. Chỉ cần lo nếu thấy <code>200</code> cho /.env – khi đó coi như lộ bí mật: đổi ngay mọi mật khẩu/key trong file."
  },
  {
    id: "log-012",
    source: "Nginx access.log (WordPress login brute force)",
    level: 2,
    line: "192.0.2.77 - - [09/Nov/2026:04:20:11 +0000] \"POST /wp-login.php HTTP/1.1\" 200 4523 \"-\" \"Mozilla/5.0 (Windows NT 10.0; Win64; x64)\"",
    parts: [
      ["192.0.2.77", "IP nguồn"],
      ["POST /wp-login.php", "<b>POST</b> = gửi dữ liệu (username/mật khẩu) tới trang đăng nhập WordPress"],
      ["200", "200 ở wp-login.php thường nghĩa là trang đăng nhập được hiển thị LẠI → đăng nhập THẤT BẠI. Đăng nhập thành công thường trả về <b>302</b> (chuyển hướng tới /wp-admin/)"],
      ["4523", "Kích thước phản hồi – các lần thất bại thường có kích thước giống nhau"],
      ["\"Mozilla/5.0 (Windows NT 10.0…)\"", "User-Agent giả làm trình duyệt bình thường – không tin được"]
    ],
    meaning: "192.0.2.77 gửi thông tin đăng nhập tới trang WordPress và (nhiều khả năng) thất bại.",
    soc: "Một dòng thì bình thường; hàng trăm dòng POST từ cùng IP trong vài phút → brute force (T1110). Tìm dòng <code>302</code> từ IP đó (dấu hiệu đăng nhập được), chặn IP, bật giới hạn số lần đăng nhập/MFA cho WordPress."
  },
  {
    id: "log-013",
    source: "tcpdump (DNS query)",
    level: 1,
    line: "11:20:01.123456 IP 192.168.1.20.53412 > 192.168.1.1.53: 41235+ A? example.com. (29)",
    parts: [
      ["11:20:01.123456", "Thời gian (đến micro giây)"],
      ["IP", "Gói IPv4"],
      ["192.168.1.20.53412", "IP nguồn 192.168.1.20, <b>số cuối cùng sau dấu chấm là cổng</b> → cổng nguồn 53412"],
      [">", "Chiều đi: từ bên trái sang bên phải"],
      ["192.168.1.1.53", "IP đích 192.168.1.1, cổng đích 53 = DNS"],
      ["41235+", "Mã giao dịch (transaction ID) 41235; dấu + = yêu cầu đệ quy (recursion desired)"],
      ["A?", "Câu hỏi: bản ghi <b>A</b> (IPv4) của tên miền là gì?"],
      ["example.com.", "Tên miền được hỏi"],
      ["(29)", "Độ dài phần dữ liệu DNS (byte)"]
    ],
    meaning: "Máy 192.168.1.20 hỏi DNS server 192.168.1.1: 'example.com có địa chỉ IPv4 là gì?'.",
    soc: "Truy vấn DNS bình thường. Trong điều tra, DNS query cho biết máy định kết nối tới đâu – tra tên miền lạ/mới đăng ký, hoặc truy vấn lặp đều đặn (beacon) tới cùng một domain."
  },
  {
    id: "log-014",
    source: "tcpdump (ICMP port unreachable)",
    level: 2,
    line: "11:20:01.124001 IP 192.168.1.1 > 192.168.1.20: ICMP 192.168.1.1 udp port 53 unreachable, length 65",
    parts: [
      ["IP 192.168.1.1 > 192.168.1.20", "Gói trả lời đi từ DNS server (192.168.1.1) VỀ máy client (192.168.1.20)"],
      ["ICMP", "Gói ICMP – loại gói dùng để báo lỗi/thông báo của mạng"],
      ["192.168.1.1 udp port 53 unreachable", "Máy 192.168.1.1 báo: 'cổng UDP 53 của tôi KHÔNG tới được' – máy vẫn sống nhưng không có dịch vụ DNS nào đang chờ ở cổng 53"],
      ["length 65", "Độ dài gói ICMP (có chứa một phần gói gốc bị lỗi)"]
    ],
    meaning: "Máy 192.168.1.1 đang bật (vì nó trả lời được), nhưng dịch vụ DNS trên nó không chạy, nên câu hỏi DNS ở log-013 bị từ chối.",
    soc: "Về mạng: kiểm tra dịch vụ DNS trên 192.168.1.1 (có đang chạy, có listen UDP 53 không) hoặc cấu hình DNS sai trên client. Về bảo mật: nhiều 'port unreachable' trả về cho một IP có thể là dấu hiệu quét UDP."
  },
  {
    id: "log-015",
    source: "tcpdump (TCP SYN)",
    level: 3,
    line: "11:21:10.456789 IP 203.0.113.50.40001 > 192.168.1.10.22: Flags [S], seq 1234567890, win 1024, options [mss 1460], length 0",
    parts: [
      ["203.0.113.50.40001", "IP nguồn 203.0.113.50, cổng nguồn 40001"],
      ["192.168.1.10.22", "IP đích 192.168.1.10, cổng đích 22 (SSH)"],
      ["Flags [S]", "Cờ TCP <b>S = SYN</b>: gói đầu tiên của bắt tay 3 bước (xin mở kết nối). [S.] = SYN-ACK, [.] = ACK, [R] = RST, [F] = FIN, [P] = PUSH"],
      ["seq 1234567890", "Số thứ tự ban đầu (sequence number)"],
      ["win 1024", "Kích thước cửa sổ TCP rất nhỏ (1024) – đặc trưng của gói do nmap SYN scan tự tạo, khác trình duyệt/hệ điều hành bình thường"],
      ["options [mss 1460]", "Tùy chọn TCP: kích thước đoạn tối đa 1460 byte"],
      ["length 0", "Không mang dữ liệu – đúng với gói SYN"]
    ],
    meaning: "203.0.113.50 gửi gói SYN xin mở kết nối tới cổng SSH của 192.168.1.10, với dấu hiệu giống nmap SYN scan.",
    soc: "Nếu cùng nguồn gửi SYN tới rất nhiều cổng/máy trong thời gian ngắn mà không hoàn tất bắt tay → quét cổng (T1595 từ Internet; T1046 nếu nguồn ở nội bộ). Xem cổng nào trả SYN-ACK (đang mở) và theo dõi tiếp các lần đăng nhập từ IP này."
  },
  {
    id: "log-016",
    source: "Suricata fast.log (IDS alert)",
    level: 3,
    line: "11/09/2026-11:21:12.345678  [**] [1:2001219:20] ET SCAN Potential SSH Scan [**] [Classification: Attempted Information Leak] [Priority: 2] {TCP} 203.0.113.50:40001 -> 192.168.1.10:22",
    parts: [
      ["11/09/2026-11:21:12.345678", "Thời gian (định dạng tháng/ngày/năm)"],
      ["[1:2001219:20]", "Generator ID 1 : <b>SID</b> 2001219 (mã định danh của rule/<b>signature</b>) : revision 20 (phiên bản rule)"],
      ["ET SCAN Potential SSH Scan", "Tên rule: bộ rule <b>ET</b> (Emerging Threats), nhóm SCAN – 'Có thể đang quét SSH'"],
      ["[Classification: Attempted Information Leak]", "Phân loại: cố gắng thu thập thông tin"],
      ["[Priority: 2]", "Mức ưu tiên 2 (1 = cao nhất, số càng lớn càng thấp)"],
      ["{TCP}", "Giao thức TCP"],
      ["203.0.113.50:40001 -> 192.168.1.10:22", "Nguồn IP:cổng → đích IP:cổng (ở đây cổng viết sau dấu hai chấm)"]
    ],
    meaning: "IDS Suricata cảnh báo: 203.0.113.50 có vẻ đang quét dịch vụ SSH trên 192.168.1.10.",
    soc: "Triage: correlate với tcpdump (log-015) và auth.log trên 192.168.1.10 – có Failed/Accepted nào từ 203.0.113.50 không? Chỉ quét → thường đóng là 'scan, đã chặn/không ảnh hưởng' (T1595); có đăng nhập thành công → escalate. 'Potential' nghĩa là có thể là false positive, cần kiểm chứng."
  }
];
