window.DATA = window.DATA || {};
DATA.cards = [

/* =====================================================================
   TRACK "chung" – Kiến thức nền (K1–K5)
   ===================================================================== */
{
  id: "k-chung-001", track: "chung", course: "K1", tier: 3, topic: "Nền tảng bảo mật",
  front: "Tam giác CIA gồm 3 yếu tố nào? Mỗi yếu tố nghĩa là gì?",
  def: "<b>Confidentiality</b> (bảo mật): chỉ người được phép mới xem được dữ liệu. <b>Integrity</b> (toàn vẹn): dữ liệu đúng, không bị sửa trái phép. <b>Availability</b> (sẵn sàng): người được phép truy cập được khi cần.",
  example: "Sổ tiết kiệm ngân hàng: chỉ chủ sổ xem được số dư (C), số dư không bị ai sửa lén (I), ra quầy lúc nào cũng rút được tiền (A).",
  trap: "Tấn công DDoS vi phạm <b>Availability</b>, không phải Confidentiality. Hash dùng để kiểm tra <b>Integrity</b>, không phải để giữ bí mật.",
  interview: "Ransomware mã hóa toàn bộ file của công ty – vi phạm yếu tố nào của CIA? Nếu kẻ tấn công còn đánh cắp và rao bán dữ liệu thì sao?",
  terms: ["CIA triad", "confidentiality", "integrity", "availability"]
},
{
  id: "k-chung-002", track: "chung", course: "K2", tier: 3, topic: "Nền tảng bảo mật",
  front: "Phân biệt threat, vulnerability và risk?",
  def: "<b>Threat</b> (mối đe dọa): bất cứ thứ gì có thể gây hại cho tài sản. <b>Vulnerability</b> (lỗ hổng): điểm yếu mà threat có thể khai thác. <b>Risk</b> (rủi ro): khả năng threat khai thác vulnerability gây thiệt hại – thường ước lượng bằng <i>likelihood × impact</i>.",
  example: "Kẻ trộm là threat, cửa nhà quên khóa là vulnerability, khả năng bị mất xe máy đêm nay là risk.",
  trap: "Không có vulnerability thì threat khó gây hại → risk thấp. Hay nhầm 'phần mềm chưa vá' là threat – thật ra đó là <b>vulnerability</b>.",
  interview: "Cho ví dụ cụ thể về threat, vulnerability và risk trong một công ty có máy chủ web.",
  terms: ["threat", "vulnerability", "risk", "likelihood", "impact", "exploit"]
},
{
  id: "k-chung-003", track: "chung", course: "K3", tier: 3, topic: "Mô hình mạng",
  front: "Mô hình TCP/IP có 4 lớp nào? Tương ứng với 7 lớp OSI ra sao?",
  def: "TCP/IP: <b>Network Access</b> (≈ OSI 1 Physical + 2 Data Link), <b>Internet</b> (≈ OSI 3 Network), <b>Transport</b> (≈ OSI 4), <b>Application</b> (≈ OSI 5 Session + 6 Presentation + 7 Application).",
  example: "OSI như bản đồ chi tiết 7 tầng của một tòa nhà; TCP/IP là bản rút gọn 4 tầng mà người ta thực sự dùng hằng ngày.",
  trap: "Đừng nhầm số lớp: Transport là lớp 4 OSI nhưng lớp 3 trong TCP/IP. Phỏng vấn thường hỏi theo số lớp <b>OSI</b> (vd 'switch hoạt động ở Layer 2').",
  interview: "Kể tên 7 lớp OSI từ dưới lên và một giao thức/thiết bị ở mỗi lớp.",
  terms: ["OSI model", "TCP/IP model", "encapsulation"]
},
{
  id: "k-chung-004", track: "chung", course: "K3", tier: 2, topic: "Mô hình mạng",
  front: "Đơn vị dữ liệu (PDU) ở lớp 2, 3, 4 OSI gọi là gì? Thiết bị nào làm việc ở lớp nào?",
  def: "Lớp 2: <b>frame</b> – dùng địa chỉ MAC, thiết bị switch. Lớp 3: <b>packet</b> – dùng địa chỉ IP, thiết bị router. Lớp 4: <b>segment</b> (TCP) / datagram (UDP) – dùng port. Lớp 1: bit – hub, cáp.",
  example: "Gửi hàng: hàng hóa (data) được bỏ vào hộp có số phòng (port – segment), rồi dán địa chỉ nhà (IP – packet), rồi dán tem xe tải giao trong khu (MAC – frame). Đó là encapsulation.",
  trap: "Hub làm việc ở lớp 1 (chỉ lặp tín hiệu), không đọc MAC. Firewall truyền thống lọc theo IP/port (lớp 3–4), NGFW lên tới lớp 7.",
  interview: "Encapsulation là gì? Khi gói tin đi từ máy bạn ra Internet, header nào được thêm vào theo thứ tự nào?",
  terms: ["PDU", "frame", "packet", "segment", "encapsulation"]
},
{
  id: "k-chung-005", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "TCP khác UDP ở điểm nào? Cho ví dụ dịch vụ dùng mỗi loại.",
  def: "<b>TCP</b>: có kết nối (bắt tay 3 bước), đảm bảo đến nơi, đúng thứ tự, gửi lại khi mất – chậm hơn. <b>UDP</b>: không kết nối, không đảm bảo, nhanh, ít overhead.",
  example: "TCP như gửi thư bảo đảm – rơi 1 trang thì bên nhận đòi gửi lại. UDP như xem bóng đá trực tiếp – hình vỡ 1 giây thì bỏ qua phát tiếp.",
  trap: "DNS chủ yếu dùng <b>UDP 53</b>, nhưng dùng <b>TCP 53</b> khi zone transfer hoặc response lớn. DHCP dùng UDP, HTTP/SSH dùng TCP.",
  interview: "Vì sao video call, game online, DNS dùng UDP mà không dùng TCP?",
  terms: ["TCP", "UDP", "connection-oriented", "connectionless", "reliable"]
},
{
  id: "k-chung-006", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "Bắt tay 3 bước (TCP three-way handshake) diễn ra thế nào?",
  def: "1) Client gửi <b>SYN</b> → 2) Server trả <b>SYN-ACK</b> → 3) Client gửi <b>ACK</b>. Sau đó mới truyền dữ liệu. Đóng kết nối dùng FIN (hoặc RST để ngắt đột ngột).",
  example: "Gọi điện: 'Alo, nghe không?' (SYN) – 'Nghe rõ, bạn nghe tôi không?' (SYN-ACK) – 'Rõ rồi!' (ACK) – rồi mới nói chuyện.",
  trap: "Trong tcpdump, cờ SYN là <code>[S]</code>, SYN-ACK là <code>[S.]</code>, ACK là <code>[.]</code>. Rất nhiều SYN mà không có ACK cuối → dấu hiệu <b>SYN flood</b> hoặc scan.",
  interview: "SYN flood lợi dụng bước nào của bắt tay 3 bước? Vì sao nó làm server cạn tài nguyên?",
  terms: ["three-way handshake", "SYN", "SYN-ACK", "ACK", "FIN", "RST"]
},
{
  id: "k-chung-007", track: "chung", course: "K3", tier: 3, topic: "Địa chỉ mạng",
  front: "Địa chỉ IP khác địa chỉ MAC thế nào?",
  def: "<b>MAC</b>: 48 bit, gắn với card mạng, dùng để giao tiếp trong cùng mạng LAN (lớp 2). <b>IP</b>: địa chỉ logic (IPv4 32 bit, IPv6 128 bit), có thể thay đổi, dùng để định tuyến giữa các mạng (lớp 3).",
  example: "MAC giống số CCCD của bạn Nam – theo Nam suốt đời. IP giống địa chỉ nhà/số phòng – Nam chuyển nhà thì địa chỉ đổi.",
  trap: "Khi gói tin đi qua router, <b>MAC nguồn/đích thay đổi</b> ở mỗi chặng, còn IP nguồn/đích giữ nguyên (trừ khi có NAT).",
  interview: "Khi bạn truy cập google.com, MAC đích trong frame đầu tiên máy bạn gửi đi là MAC của ai?",
  terms: ["MAC address", "IP address", "IPv4", "IPv6", "OUI"]
},
{
  id: "k-chung-008", track: "chung", course: "K3", tier: 3, topic: "Thiết bị mạng",
  front: "Hub, switch và router khác nhau thế nào?",
  def: "<b>Hub</b> (lớp 1): nhận gì phát ra tất cả các cổng. <b>Switch</b> (lớp 2): đọc MAC đích, chỉ gửi ra đúng cổng nhờ bảng MAC. <b>Router</b> (lớp 3): đọc IP đích, chuyển gói giữa các mạng khác nhau.",
  example: "Hub như hét loa cả xóm; switch như bác bảo vệ chung cư đưa thư đúng phòng; router như bưu điện liên tỉnh chuyển thư giữa các thành phố.",
  trap: "Switch mặc định <b>không chặn broadcast</b> (mỗi VLAN là một broadcast domain); router thì chặn broadcast. Hub không an toàn vì ai cắm vào cũng nghe được hết.",
  interview: "Vì sao hub hầu như không còn được dùng? Collision domain và broadcast domain là gì?",
  terms: ["hub", "switch", "router", "broadcast domain", "collision domain"]
},
{
  id: "k-chung-009", track: "chung", course: "K3", tier: 3, topic: "Port quan trọng",
  front: "Port của SSH, Telnet và RDP là bao nhiêu? Cái nào an toàn?",
  def: "<b>SSH</b> TCP 22 (mã hóa), <b>Telnet</b> TCP 23 (gửi cả mật khẩu dạng plaintext), <b>RDP</b> TCP 3389 (Remote Desktop của Windows).",
  example: "Telnet như nói mật khẩu qua loa phường – ai đứng gần cũng nghe; SSH như thì thầm bằng mật mã chỉ hai bên hiểu.",
  trap: "Mở RDP 3389 hoặc SSH 22 thẳng ra Internet là mục tiêu brute force hàng đầu. Telnet nên bị tắt, thay bằng SSH.",
  interview: "Thấy hàng nghìn kết nối từ Internet vào port 3389 của một server, bạn nghĩ đến điều gì và làm gì?",
  terms: ["SSH", "Telnet", "RDP", "remote access", "plaintext"]
},
{
  id: "k-chung-010", track: "chung", course: "K3", tier: 3, topic: "Port quan trọng",
  front: "Port của FTP, HTTP, HTTPS và SMB là bao nhiêu?",
  def: "<b>FTP</b> TCP 20 (data) / 21 (control), <b>HTTP</b> TCP 80, <b>HTTPS</b> TCP 443 (HTTP + TLS), <b>SMB</b> TCP 445 (chia sẻ file Windows).",
  example: "Port như số phòng trong một tòa chung cư (địa chỉ IP): cùng một máy chủ nhưng phòng 80 là web, phòng 445 là kho tài liệu chung.",
  trap: "SMB 445 là port bị WannaCry (EternalBlue) khai thác – không bao giờ mở 445 ra Internet. FTP truyền mật khẩu plaintext; bản an toàn là SFTP (qua SSH 22) hoặc FTPS.",
  interview: "HTTPS khác HTTP thế nào? Vì sao không được mở port 445 ra Internet?",
  terms: ["FTP", "HTTP", "HTTPS", "SMB", "TLS", "SFTP"]
},
{
  id: "k-chung-011", track: "chung", course: "K3", tier: 3, topic: "Port quan trọng",
  front: "Port của các giao thức email: SMTP, POP3, IMAP?",
  def: "<b>SMTP</b> TCP 25 (gửi/chuyển mail giữa server; 587 cho client gửi mail). <b>POP3</b> TCP 110 (tải mail về, thường xóa trên server). <b>IMAP</b> TCP 143 (đồng bộ mail, giữ trên server). Bản TLS: POP3S 995, IMAPS 993, SMTPS 465.",
  example: "SMTP là người đưa thư đi; POP3 là mang thư về nhà cất (hộp thư bưu điện trống); IMAP là đọc thư ngay tại bưu điện, máy nào cũng xem được.",
  trap: "SMTP dùng để <b>gửi</b>, POP3/IMAP dùng để <b>nhận</b>. Hay nhầm IMAP là 110 – thật ra 110 là POP3.",
  interview: "Một máy trạm nhân viên bỗng gửi hàng nghìn kết nối ra port 25 – có thể là gì?",
  terms: ["SMTP", "POP3", "IMAP", "mail server", "spam bot"]
},
{
  id: "k-chung-012", track: "chung", course: "K3", tier: 3, topic: "Port quan trọng",
  front: "Port của DNS, DHCP, NTP, SNMP và Syslog? Chạy trên TCP hay UDP?",
  def: "<b>DNS</b> 53 (UDP, TCP khi zone transfer). <b>DHCP</b> UDP 67 (server) / 68 (client). <b>NTP</b> UDP 123. <b>SNMP</b> UDP 161 (agent), 162 (trap). <b>Syslog</b> UDP 514.",
  example: "Đây là các dịch vụ 'hạ tầng' như điện nước của tòa nhà: không ai để ý nhưng mất là cả mạng rối loạn.",
  trap: "DHCP: server lắng nghe 67, client 68 – đừng đảo ngược. NTP sai giờ làm log lệch thời gian, khó điều tra và Kerberos lỗi.",
  interview: "Vì sao đồng bộ thời gian (NTP) quan trọng với SOC khi điều tra sự cố?",
  terms: ["DNS", "DHCP", "NTP", "SNMP", "syslog"]
},
{
  id: "k-chung-013", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "DNS làm gì? Quá trình phân giải tên miền diễn ra thế nào?",
  def: "DNS chuyển <b>tên miền → địa chỉ IP</b>. Máy hỏi DNS resolver; resolver hỏi lần lượt root server → TLD server (.com) → authoritative server, rồi trả IP và lưu cache.",
  example: "Như danh bạ điện thoại: bạn bấm gọi 'Mẹ', điện thoại tự tra ra số 098xxx để gọi.",
  trap: "DNS chủ yếu UDP 53. Kẻ tấn công có thể dùng DNS để exfiltration/C2 (DNS tunneling) vì DNS hiếm khi bị chặn.",
  interview: "Bạn gõ www.example.com rồi Enter – kể lại những gì xảy ra trên mạng.",
  terms: ["DNS", "resolver", "root server", "TLD", "authoritative", "cache"]
},
{
  id: "k-chung-014", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "DHCP cấp IP theo 4 bước DORA là những bước nào?",
  def: "<b>D</b>iscover (client broadcast tìm server) → <b>O</b>ffer (server đề nghị IP) → <b>R</b>equest (client xin nhận IP đó) → <b>A</b>cknowledge (server xác nhận). Kèm subnet mask, gateway, DNS, thời hạn lease.",
  example: "Vào khách sạn: hỏi lễ tân còn phòng không (Discover) – lễ tân 'phòng 305 nhé' (Offer) – 'cho tôi phòng 305' (Request) – đưa chìa khóa (Ack).",
  trap: "Máy nhận IP <b>169.254.x.x</b> (APIPA) nghĩa là <b>không liên lạc được DHCP server</b>. DHCP Discover là broadcast nên không qua router nếu không có DHCP relay.",
  interview: "Một máy báo IP 169.254.10.5 – nguyên nhân có thể là gì và bạn kiểm tra thế nào?",
  terms: ["DHCP", "DORA", "lease", "APIPA", "DHCP starvation"]
},
{
  id: "k-chung-015", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "ARP dùng để làm gì? Tấn công nào lợi dụng ARP?",
  def: "<b>ARP</b> tìm <b>MAC</b> tương ứng với một <b>IP</b> trong cùng mạng LAN: broadcast 'Ai có IP X?' và máy có IP đó trả lời MAC của nó. Kết quả lưu trong ARP cache.",
  example: "Đứng giữa sân chung cư hỏi to 'Ai là chủ phòng 305?' – người đó giơ tay và bạn nhớ mặt.",
  trap: "ARP không có xác thực → <b>ARP spoofing/poisoning</b>: kẻ tấn công trả lời giả để nhận lưu lượng (on-path/MITM). ARP chỉ hoạt động trong một LAN, không qua router.",
  interview: "ARP spoofing hoạt động thế nào và phòng chống bằng cách nào (vd Dynamic ARP Inspection)?",
  terms: ["ARP", "ARP cache", "ARP spoofing", "broadcast"]
},
{
  id: "k-chung-016", track: "chung", course: "K3", tier: 3, topic: "Giao thức",
  front: "ICMP là gì? Lệnh ping dùng ICMP thế nào?",
  def: "<b>ICMP</b> là giao thức lớp 3 để báo lỗi và chẩn đoán mạng. <code>ping</code> gửi <b>Echo Request</b> (type 8) và chờ <b>Echo Reply</b> (type 0) để kiểm tra kết nối và đo độ trễ.",
  example: "Như gõ cửa 'Có ai ở nhà không?' – có người đáp là còn sống, im lặng thì có thể vắng nhà hoặc không muốn mở cửa.",
  trap: "Ping không trả lời <b>không có nghĩa</b> máy chết – firewall (vd Windows Firewall) thường chặn ICMP. ICMP không có port.",
  interview: "Ping flood và ping of death là gì? Tại sao nhiều công ty chặn ICMP từ Internet?",
  terms: ["ICMP", "echo request", "echo reply", "ping", "TTL"]
},
{
  id: "k-chung-017", track: "chung", course: "K3", tier: 3, topic: "Địa chỉ mạng",
  front: "Subnet mask và ký hiệu CIDR (vd /24) nghĩa là gì?",
  def: "Subnet mask chia IP thành <b>phần mạng</b> và <b>phần host</b>. CIDR /n = n bit đầu là phần mạng. /24 = 255.255.255.0 → 256 địa chỉ, <b>254 host</b> dùng được (trừ network và broadcast).",
  example: "IP như địa chỉ 'Đường Lê Lợi, số 25': /24 cho biết 3 cụm đầu là tên đường (mạng), cụm cuối là số nhà (host).",
  trap: "Số host dùng được = 2^(32−n) − 2. /24 = 254 host, không phải 256. Hai máy khác subnet phải đi qua router/gateway.",
  interview: "Vì sao cần chia subnet? Lợi ích về bảo mật là gì?",
  terms: ["subnet mask", "CIDR", "network address", "broadcast address", "subnetting"]
},
{
  id: "k-chung-018", track: "chung", course: "K3", tier: 3, topic: "Địa chỉ mạng",
  front: "Ba dải IP private (RFC 1918) là gì? Còn loopback và APIPA?",
  def: "Private: <b>10.0.0.0/8</b>, <b>172.16.0.0/12</b> (172.16.0.0 – 172.31.255.255), <b>192.168.0.0/16</b>. Loopback: 127.0.0.0/8 (127.0.0.1). APIPA: 169.254.0.0/16.",
  example: "IP private như số phòng nội bộ trong công ty – ra ngoài thì phải dùng địa chỉ công ty (IP public) qua NAT.",
  trap: "172.32.x.x <b>không phải</b> private (dải chỉ tới 172.31). IP private không định tuyến được trên Internet.",
  interview: "Trong log thấy kết nối từ 172.20.5.10 tới 8.8.8.8 – IP nào nội bộ, IP nào public?",
  terms: ["private IP", "public IP", "RFC 1918", "loopback", "APIPA"]
},
{
  id: "k-chung-019", track: "chung", course: "K3", tier: 3, topic: "Địa chỉ mạng",
  front: "NAT là gì và vì sao cần NAT?",
  def: "<b>NAT</b> (Network Address Translation) đổi IP private thành IP public (và ngược lại) khi đi ra/vào Internet, thường do router/firewall thực hiện. Giúp tiết kiệm IPv4 và ẩn cấu trúc mạng nội bộ.",
  example: "Cả nhà dùng chung một địa chỉ nhà để nhận thư; người ngoài chỉ biết địa chỉ nhà, không biết ai ở phòng nào.",
  trap: "NAT <b>không phải</b> là firewall – nó chỉ che giấu một phần. Khi điều tra, IP public trong log server bên ngoài chỉ là IP NAT, phải tra bảng NAT/log firewall để biết máy nội bộ nào.",
  interview: "Một đối tác báo IP public công ty bạn tấn công họ – làm sao tìm ra máy nội bộ nào?",
  terms: ["NAT", "PAT", "public IP", "private IP"]
},
{
  id: "k-chung-020", track: "chung", course: "K3", tier: 3, topic: "Bảo mật mạng",
  front: "Firewall stateless khác stateful thế nào?",
  def: "<b>Stateless</b>: xét từng gói độc lập theo rule (IP, port) – không nhớ kết nối. <b>Stateful</b>: theo dõi trạng thái kết nối, tự cho gói trả về của kết nối hợp lệ. <b>NGFW</b>: thêm deep packet inspection, nhận diện ứng dụng, IPS.",
  example: "Stateless như bảo vệ chỉ xem thẻ từng người, không nhớ ai vừa đi ra. Stateful nhớ 'anh này vừa ra mua cơm, giờ quay lại' nên cho vào.",
  trap: "Stateful an toàn hơn nhưng tốn tài nguyên hơn. ACL trên router thường là stateless – phải viết rule cho cả chiều về.",
  interview: "Firewall hoạt động ở lớp nào? NGFW khác firewall truyền thống ra sao?",
  terms: ["firewall", "stateless", "stateful", "NGFW", "deep packet inspection"]
},
{
  id: "k-chung-021", track: "chung", course: "K3", tier: 3, topic: "Bảo mật mạng",
  front: "VPN là gì và bảo vệ được gì?",
  def: "<b>VPN</b> tạo một <b>đường hầm mã hóa</b> (encapsulation + encryption) qua mạng công cộng, giúp người dùng từ xa hoặc chi nhánh kết nối an toàn vào mạng nội bộ. Giao thức phổ biến: IPsec, SSL/TLS VPN, WireGuard.",
  example: "Như đi xe bọc thép qua khu chợ đông người – người ngoài thấy xe chạy nhưng không biết bên trong chở gì.",
  trap: "VPN bảo vệ dữ liệu <b>trên đường truyền</b>, không bảo vệ khi máy người dùng đã nhiễm malware. Tài khoản VPN bị lộ = kẻ tấn công vào thẳng mạng nội bộ → cần MFA.",
  interview: "Remote-access VPN khác site-to-site VPN thế nào?",
  terms: ["VPN", "IPsec", "tunnel", "remote access", "site-to-site"]
},
{
  id: "k-chung-022", track: "chung", course: "K3", tier: 3, topic: "Bảo mật mạng",
  front: "Forward proxy khác reverse proxy thế nào?",
  def: "<b>Forward proxy</b>: đứng trước <b>client nội bộ</b>, thay mặt họ truy cập Internet (lọc web, ẩn IP). <b>Reverse proxy</b>: đứng trước <b>server</b>, nhận request từ bên ngoài rồi chuyển vào server nội bộ (cân bằng tải, WAF, ẩn server).",
  example: "Forward proxy như thư ký đi mua hàng giúp nhân viên; reverse proxy như lễ tân tiếp khách bên ngoài rồi dẫn vào đúng phòng.",
  trap: "Nhớ theo chiều: forward = <b>trong → ngoài</b>, reverse = <b>ngoài → trong</b>. Log web server sau reverse proxy sẽ thấy IP của proxy – IP thật nằm trong header X-Forwarded-For.",
  interview: "Công ty muốn chặn nhân viên vào web độc hại thì dùng loại proxy nào?",
  terms: ["forward proxy", "reverse proxy", "WAF", "X-Forwarded-For"]
},
{
  id: "k-chung-023", track: "chung", course: "K2", tier: 3, topic: "Nguyên tắc bảo mật",
  front: "Defense in depth (phòng thủ nhiều lớp) là gì?",
  def: "Dùng <b>nhiều lớp kiểm soát độc lập</b> để nếu một lớp bị vượt qua thì lớp khác vẫn chặn. Khóa học chia 5 lớp: <b>perimeter</b>, <b>network</b>, <b>endpoint</b>, <b>application</b>, <b>data</b>.",
  example: "Ngân hàng có bảo vệ cổng, camera, cửa két, mật mã két, và tiền được đánh số – trộm qua cổng vẫn còn nhiều lớp phải vượt.",
  trap: "Không có công cụ nào chặn được 100%. Chỉ có firewall mạnh mà không có EDR, MFA, backup là sai nguyên tắc này.",
  interview: "Thiết kế phòng thủ nhiều lớp cho một web server chứa dữ liệu khách hàng.",
  terms: ["defense in depth", "layered security", "perimeter", "endpoint"]
},
{
  id: "k-chung-024", track: "chung", course: "K2", tier: 3, topic: "Nguyên tắc bảo mật",
  front: "Nguyên tắc least privilege (đặc quyền tối thiểu) là gì?",
  def: "Mỗi người dùng/tiến trình chỉ được cấp <b>đúng và đủ quyền</b> cần cho công việc, trong thời gian cần thiết. Giảm thiệt hại khi tài khoản bị chiếm.",
  example: "Nhân viên kế toán được chìa khóa phòng kế toán, không được chìa khóa phòng server.",
  trap: "Hay nhầm với <b>separation of duties</b> (tách nhiệm vụ: không ai làm trọn một quy trình nhạy cảm). Cho user dùng quyền admin hằng ngày là vi phạm least privilege.",
  interview: "Vì sao admin nên có 2 tài khoản: một thường ngày, một quản trị?",
  terms: ["least privilege", "separation of duties", "need to know", "privilege escalation"]
},
{
  id: "k-chung-025", track: "chung", course: "K3", tier: 3, topic: "Nguyên tắc bảo mật",
  front: "Hardening (gia cố hệ thống) là gì? Kể vài biện pháp.",
  def: "<b>Hardening</b> là giảm <b>attack surface</b> bằng cách cấu hình an toàn: vá lỗi (patch), tắt dịch vụ/port không dùng, đổi mật khẩu mặc định, xóa tài khoản thừa, bật log, mã hóa, áp dụng baseline (vd CIS Benchmark).",
  example: "Như khóa hết cửa sổ không dùng, thay ổ khóa mặc định, lắp camera trước khi dọn vào nhà mới.",
  trap: "Hardening không phải làm một lần là xong – phải làm định kỳ vì có lỗ hổng và cấu hình mới. Mật khẩu mặc định (admin/admin) trên thiết bị mạng là lỗi rất phổ biến.",
  interview: "Bạn nhận một server Linux/Windows mới – 5 việc đầu tiên để hardening là gì?",
  terms: ["hardening", "attack surface", "patch management", "baseline", "CIS Benchmark"]
},
{
  id: "k-chung-026", track: "chung", course: "K4", tier: 3, topic: "Linux",
  front: "Các lệnh Linux cơ bản để di chuyển và xem file là gì? (pwd, ls, cd, cat, head, tail, less)",
  def: "<code>pwd</code> thư mục hiện tại; <code>ls -la</code> liệt kê cả file ẩn và quyền; <code>cd</code> chuyển thư mục; <code>cat</code> in toàn bộ file; <code>head</code>/<code>tail -n 20</code> xem đầu/cuối; <code>tail -f</code> theo dõi log trực tiếp; <code>less</code> xem từng trang.",
  example: "Như đi trong tòa nhà: pwd = 'tôi đang ở phòng nào', ls = 'trong phòng có gì', cd = đi sang phòng khác, cat = đọc tài liệu.",
  trap: "<code>cd ..</code> lên thư mục cha, <code>cd ~</code> về home, <code>cd /</code> về root. File bắt đầu bằng dấu chấm là file ẩn – phải dùng <code>ls -a</code>.",
  interview: "Muốn xem 50 dòng cuối của /var/log/auth.log và theo dõi liên tục thì dùng lệnh gì?",
  terms: ["pwd", "ls", "cd", "cat", "tail -f", "absolute path", "relative path"]
},
{
  id: "k-chung-027", track: "chung", course: "K4", tier: 3, topic: "Linux",
  front: "grep và find khác nhau thế nào? Cho ví dụ lệnh.",
  def: "<code>grep</code> tìm <b>nội dung</b> trong file: <code>grep \"Failed password\" /var/log/auth.log</code>. <code>find</code> tìm <b>file/thư mục</b> theo tên, thời gian, kích thước: <code>find /home -name \"*.sh\" -mtime -3</code>.",
  example: "grep như tìm một câu trong cuốn sách; find như tìm cuốn sách trong thư viện.",
  trap: "<code>grep -i</code> bỏ qua hoa/thường, <code>-v</code> lấy dòng KHÔNG khớp, <code>-c</code> đếm. Pipe <code>|</code> nối lệnh: <code>cat auth.log | grep Failed | wc -l</code>.",
  interview: "Đếm số lần đăng nhập SSH sai trong auth.log bằng một dòng lệnh.",
  terms: ["grep", "find", "pipe", "wc -l", "-name", "-mtime"]
},
{
  id: "k-chung-028", track: "chung", course: "K4", tier: 3, topic: "Linux",
  front: "Đọc quyền <code>-rwxr-xr--</code> như thế nào? chmod 754 nghĩa là gì?",
  def: "Ký tự đầu: loại (<code>-</code> file, <code>d</code> thư mục). Sau đó 3 nhóm: <b>owner</b> rwx, <b>group</b> r-x, <b>other</b> r--. r=4, w=2, x=1 → rwx=7, r-x=5, r--=4 → <code>chmod 754</code>.",
  example: "Chủ nhà được đọc, sửa, dùng (rwx); người trong nhà được đọc và dùng (r-x); khách chỉ được xem (r--).",
  trap: "Quyền <b>777</b> (ai cũng ghi được) là cấu hình nguy hiểm. Dạng chữ: <code>chmod g-w file</code> bỏ quyền ghi của group, <code>chmod u+x</code> thêm quyền chạy cho owner.",
  interview: "File chứa mật khẩu có quyền -rw-rw-rw-. Vấn đề là gì và sửa bằng lệnh nào?",
  terms: ["permissions", "chmod", "chown", "owner", "group", "other"]
},
{
  id: "k-chung-029", track: "chung", course: "K4", tier: 3, topic: "Linux",
  front: "sudo là gì? Vì sao không nên đăng nhập trực tiếp bằng root?",
  def: "<code>sudo</code> cho user thường chạy một lệnh với quyền root (hoặc user khác) tạm thời, được cấu hình trong <code>/etc/sudoers</code> và được ghi log. Root là siêu người dùng có toàn quyền.",
  example: "Như nhân viên mượn chìa khóa tổng có ký sổ, dùng xong trả lại – thay vì ai cũng giữ chìa tổng.",
  trap: "Dùng root thường xuyên vi phạm least privilege và gõ nhầm một lệnh có thể phá hệ thống. Lệnh sudo được ghi trong auth.log – nguồn tốt để phát hiện privilege escalation.",
  interview: "Quản lý user Linux: useradd, userdel, passwd, usermod -aG sudo dùng khi nào?",
  terms: ["sudo", "root", "superuser", "sudoers", "useradd", "privilege escalation"]
},
{
  id: "k-chung-030", track: "chung", course: "K4", tier: 3, topic: "Linux",
  front: "Log hệ thống Linux nằm ở đâu? File nào ghi đăng nhập?",
  def: "Thư mục <code>/var/log</code>. Đăng nhập/SSH/sudo: <code>/var/log/auth.log</code> (Debian/Ubuntu) hoặc <code>/var/log/secure</code> (RHEL/CentOS). Log chung: <code>/var/log/syslog</code> hoặc <code>/var/log/messages</code>. Systemd: <code>journalctl</code>.",
  example: "/var/log như phòng lưu trữ camera của tòa nhà – xảy ra chuyện gì thì vào đây tua lại.",
  trap: "Tên file khác nhau tùy distro – đừng khẳng định chỉ có auth.log. Kẻ tấn công thường xóa/sửa log → nên gửi log về SIEM/syslog server tập trung.",
  interview: "Nghi ngờ server Ubuntu bị brute force SSH – bạn xem file nào, tìm chuỗi gì?",
  terms: ["/var/log", "auth.log", "syslog", "journalctl", "log forwarding"]
},
{
  id: "k-chung-031", track: "chung", course: "K4", tier: 3, topic: "SQL",
  front: "Viết truy vấn SQL lấy các lần đăng nhập thất bại từ quốc gia bắt đầu bằng 'US'?",
  def: "<code>SELECT * FROM log_in_attempts WHERE success = FALSE AND country LIKE 'US%';</code><br><b>SELECT</b> chọn cột, <b>FROM</b> chọn bảng, <b>WHERE</b> lọc dòng, <b>LIKE</b> so khớp mẫu (<code>%</code> = nhiều ký tự bất kỳ, <code>_</code> = đúng 1 ký tự).",
  example: "Như lọc trong Excel: chọn sheet (FROM), chọn cột (SELECT), bật filter điều kiện (WHERE).",
  trap: "<code>LIKE 'US%'</code> = bắt đầu bằng US; <code>'%US%'</code> = chứa US ở bất kỳ đâu. Chuỗi phải để trong dấu nháy đơn. Dùng <code>ORDER BY</code> để sắp xếp, <code>DESC</code> giảm dần.",
  interview: "Tìm các lần đăng nhập ngoài giờ làm việc (sau 18:00) bằng SQL.",
  terms: ["SELECT", "FROM", "WHERE", "LIKE", "wildcard", "ORDER BY"]
},
{
  id: "k-chung-032", track: "chung", course: "K4", tier: 3, topic: "SQL",
  front: "Trong SQL, AND, OR, NOT khác nhau thế nào khi lọc log?",
  def: "<b>AND</b>: phải thỏa <b>cả hai</b> điều kiện. <b>OR</b>: thỏa <b>ít nhất một</b>. <b>NOT</b>: loại trừ. Ví dụ: <code>WHERE department = 'Sales' OR department = 'Finance'</code>; <code>WHERE NOT country LIKE 'MEX%'</code>.",
  example: "AND như tuyển người 'biết tiếng Anh VÀ có bằng lái'; OR như 'biết tiếng Anh HOẶC tiếng Nhật'.",
  trap: "Khi trộn AND và OR nên dùng ngoặc: <code>WHERE (a OR b) AND c</code>. Lọc ngày dùng <code>BETWEEN '2022-05-08' AND '2022-05-10'</code> hoặc <code>&gt;</code>, <code>&lt;</code>.",
  interview: "Viết truy vấn lấy máy tính của phòng Marketing ở tòa nhà East (office bắt đầu bằng 'East').",
  terms: ["AND", "OR", "NOT", "BETWEEN", "operator"]
},
{
  id: "k-chung-033", track: "chung", course: "K4", tier: 3, topic: "SQL",
  front: "INNER JOIN khác LEFT JOIN thế nào?",
  def: "<b>INNER JOIN</b>: chỉ trả các dòng <b>khớp ở cả hai bảng</b>. <b>LEFT JOIN</b>: trả <b>tất cả dòng bảng trái</b>, bảng phải không khớp thì để NULL. (RIGHT JOIN ngược lại; FULL OUTER JOIN lấy tất cả.)<br><code>SELECT * FROM employees INNER JOIN machines ON employees.device_id = machines.device_id;</code>",
  example: "Danh sách nhân viên và danh sách laptop: INNER JOIN ra người có laptop; LEFT JOIN ra mọi nhân viên, ai chưa có laptop thì cột laptop để trống.",
  trap: "Phải chỉ rõ cột nối bằng <code>ON</code> và tên bảng khi cột trùng tên. LEFT JOIN rất hữu ích để tìm 'thiết bị chưa gán chủ' (lọc <code>WHERE ... IS NULL</code>).",
  interview: "Muốn biết nhân viên nào đứng sau các lần đăng nhập thất bại (bảng log và bảng employees) thì JOIN thế nào?",
  terms: ["JOIN", "INNER JOIN", "LEFT JOIN", "NULL", "primary key", "foreign key"]
},
{
  id: "k-chung-034", track: "chung", course: "K5", tier: 3, topic: "Mật mã",
  front: "Hashing khác encryption (mã hóa) thế nào?",
  def: "<b>Hash</b>: hàm <b>một chiều</b>, cùng đầu vào → cùng giá trị băm độ dài cố định, không giải ngược được; dùng kiểm tra toàn vẹn, lưu mật khẩu. <b>Encryption</b>: <b>hai chiều</b>, có khóa để giải mã lại bản gốc; dùng giữ bí mật.",
  example: "Hash như vân tay – nhìn vân tay biết đúng người nhưng không tạo lại được người. Mã hóa như két sắt – có chìa thì mở lấy lại đồ.",
  trap: "Base64 là <b>encoding</b>, không phải mã hóa. MD5/SHA-1 đã yếu (collision) – dùng SHA-256. Mật khẩu nên hash có <b>salt</b> để chống rainbow table.",
  interview: "Vì sao SOC dùng hash (SHA-256) của file để tra VirusTotal? Salt là gì?",
  terms: ["hash", "SHA-256", "MD5", "salt", "rainbow table", "encoding"]
},
{
  id: "k-chung-035", track: "chung", course: "K5", tier: 3, topic: "Mật mã",
  front: "Mã hóa đối xứng (symmetric) khác bất đối xứng (asymmetric) thế nào?",
  def: "<b>Symmetric</b>: dùng <b>một khóa chung</b> để mã hóa và giải mã – nhanh (AES, 3DES). <b>Asymmetric</b>: cặp <b>public key</b> (công khai) và <b>private key</b> (giữ bí mật) – chậm hơn nhưng giải quyết việc trao khóa (RSA, ECC).",
  example: "Symmetric như cả nhà dùng chung một chìa khóa cửa. Asymmetric như hòm thư có khe: ai cũng bỏ thư vào được (public key) nhưng chỉ chủ nhà có chìa mở (private key).",
  trap: "Thực tế (TLS/HTTPS) dùng <b>kết hợp</b>: asymmetric để trao đổi khóa phiên, symmetric để mã hóa dữ liệu. Mã hóa bằng public key thì giải bằng private key; chữ ký số thì ký bằng private key.",
  interview: "HTTPS dùng mã hóa đối xứng hay bất đối xứng? Giải thích.",
  terms: ["symmetric", "asymmetric", "AES", "RSA", "public key", "private key", "digital signature"]
},
{
  id: "k-chung-036", track: "chung", course: "K5", tier: 3, topic: "Mật mã",
  front: "PKI và digital certificate dùng để làm gì?",
  def: "<b>PKI</b> là hệ thống quản lý khóa công khai và <b>chứng chỉ số</b>. Certificate gắn một public key với một danh tính (vd tên miền), được <b>CA</b> (Certificate Authority) đáng tin ký xác nhận.",
  example: "Certificate như CCCD có dấu của Bộ Công an (CA): bạn tin người đó vì tin cơ quan cấp, không phải vì tin lời họ nói.",
  trap: "Ổ khóa HTTPS chỉ chứng minh kết nối được mã hóa tới đúng tên miền – <b>không chứng minh trang web an toàn</b>; trang phishing cũng có cert hợp lệ.",
  interview: "Trình duyệt kiểm tra những gì trước khi tin một certificate (CA, thời hạn, tên miền)?",
  terms: ["PKI", "certificate", "CA", "X.509", "TLS"]
},
{
  id: "k-chung-037", track: "chung", course: "K5", tier: 3, topic: "IAM",
  front: "Authentication, authorization và accounting (AAA) khác nhau thế nào?",
  def: "<b>Authentication</b> (xác thực): <i>bạn là ai?</i> – chứng minh danh tính. <b>Authorization</b> (phân quyền): <i>bạn được làm gì?</i> <b>Accounting</b> (ghi nhận): <i>bạn đã làm gì?</i> – log hoạt động.",
  example: "Vào khách sạn: trình CCCD (authentication), thẻ phòng chỉ mở phòng 305 (authorization), hệ thống ghi giờ bạn quẹt thẻ (accounting).",
  trap: "Authentication luôn diễn ra <b>trước</b> authorization. Lỗi 'user thường xem được trang admin' là lỗi <b>authorization</b> (broken access control), không phải authentication.",
  interview: "Cho ví dụ một lỗi authentication và một lỗi authorization.",
  terms: ["authentication", "authorization", "accounting", "AAA", "IAM", "RADIUS"]
},
{
  id: "k-chung-038", track: "chung", course: "K5", tier: 3, topic: "IAM",
  front: "MFA là gì? Ba nhóm yếu tố xác thực là gì?",
  def: "<b>MFA</b> yêu cầu ít nhất 2 yếu tố thuộc <b>nhóm khác nhau</b>: điều bạn <b>biết</b> (mật khẩu, PIN), điều bạn <b>có</b> (điện thoại OTP, token), điều bạn <b>là</b> (vân tay, khuôn mặt).",
  example: "Rút tiền ATM: thẻ (có) + mã PIN (biết).",
  trap: "Mật khẩu + câu hỏi bí mật <b>không phải</b> MFA (cùng nhóm 'biết'). MFA vẫn bị vượt qua bằng MFA fatigue (spam push) hoặc phishing proxy – nhưng vẫn chặn được phần lớn tấn công mật khẩu.",
  interview: "Log cho thấy một user nhận 30 yêu cầu MFA push trong 5 phút – đó là gì và xử lý thế nào?",
  terms: ["MFA", "2FA", "OTP", "biometrics", "MFA fatigue"]
},
{
  id: "k-chung-039", track: "chung", course: "K5", tier: 3, topic: "IAM",
  front: "SSO là gì? Ưu và nhược điểm?",
  def: "<b>SSO</b> (Single Sign-On): đăng nhập <b>một lần</b> bằng một danh tính để dùng nhiều ứng dụng (vd tài khoản Microsoft 365/Google Workspace). Ưu: tiện, ít mật khẩu, quản lý tập trung. Nhược: lộ một tài khoản là lộ tất cả.",
  example: "Như một chiếc thẻ từ mở được cổng công ty, thang máy và phòng làm việc.",
  trap: "SSO phải đi kèm <b>MFA</b>, nếu không thì đó là 'single point of failure'. SSO ≠ dùng chung một mật khẩu cho mọi trang.",
  interview: "Vì sao SSO kết hợp MFA giúp tăng bảo mật thay vì giảm?",
  terms: ["SSO", "SAML", "OAuth", "identity provider", "single point of failure"]
},

/* =====================================================================
   TRACK "soc" – SOC Analyst (K2, K5, K6 + EXTRA)
   ===================================================================== */
{
  id: "k-soc-001", track: "soc", course: "K1", tier: 3, topic: "Vai trò SOC",
  front: "SOC là gì? Tier 1, Tier 2, Tier 3 làm gì?",
  def: "<b>SOC</b> (Security Operations Center) giám sát, phát hiện, phân tích và ứng phó sự cố 24/7. <b>Tier 1</b>: theo dõi và triage alert, lọc false positive, escalate. <b>Tier 2</b>: điều tra sâu, ứng phó sự cố. <b>Tier 3</b>: threat hunting, phân tích malware, tối ưu rule.",
  example: "Như phòng cấp cứu: y tá phân loại bệnh nhân (Tier 1), bác sĩ điều trị (Tier 2), chuyên gia hội chẩn ca khó (Tier 3).",
  trap: "Tier 1 <b>không</b> tự ý xử lý mọi thứ – phải làm theo playbook và biết khi nào escalate. Ghi chép ticket đầy đủ là một phần công việc chính.",
  interview: "Một ca trực Tier 1 điển hình của bạn sẽ làm những gì?",
  terms: ["SOC", "Tier 1", "triage", "escalate", "threat hunting"]
},
{
  id: "k-soc-002", track: "soc", course: "K6", tier: 3, topic: "Vai trò SOC",
  front: "Event, alert và incident khác nhau thế nào?",
  def: "<b>Event</b>: bất kỳ sự việc quan sát được trong hệ thống (một lần đăng nhập). <b>Alert</b>: thông báo do công cụ sinh ra khi event khớp rule đáng ngờ. <b>Incident</b>: sự việc đã xác nhận <b>vi phạm hoặc đe dọa</b> CIA / chính sách bảo mật.",
  example: "Event: có người bấm chuông. Alert: camera báo người lạ bấm chuông lúc 2 giờ sáng. Incident: xác nhận người đó đã cạy cửa vào nhà.",
  trap: "Mọi incident đều là event, nhưng <b>không phải event nào cũng là incident</b>. Alert có thể là false positive – chưa được gọi là incident.",
  interview: "Một alert 'đăng nhập sai 10 lần' khi nào thì nâng thành incident?",
  terms: ["event", "alert", "incident", "security incident"]
},
{
  id: "k-soc-003", track: "soc", course: "K6", tier: 3, topic: "Phát hiện",
  front: "True positive, false positive, true negative, false negative là gì?",
  def: "<b>TP</b>: báo động và đúng là tấn công. <b>FP</b>: báo động nhưng thật ra bình thường. <b>TN</b>: không báo và đúng là không có gì. <b>FN</b>: <b>không báo nhưng thật ra có tấn công</b>.",
  example: "Chuông báo cháy: kêu khi có cháy (TP), kêu vì ai hút thuốc (FP), im khi không cháy (TN), im trong khi bếp đang cháy (FN).",
  trap: "<b>False negative nguy hiểm nhất</b> vì tấn công lọt qua mà không ai biết. FP quá nhiều gây <b>alert fatigue</b> → cần tuning rule.",
  interview: "Bạn xử lý thế nào khi một rule sinh quá nhiều false positive?",
  terms: ["true positive", "false positive", "false negative", "alert fatigue", "tuning"]
},
{
  id: "k-soc-004", track: "soc", course: "K2", tier: 3, topic: "Công cụ SOC",
  front: "SIEM là gì? Nó làm những việc chính nào?",
  def: "<b>SIEM</b> (Security Information and Event Management) <b>thu thập, chuẩn hóa (normalize), lưu trữ và tương quan (correlate)</b> log từ nhiều nguồn, tạo alert và dashboard theo thời gian thực. Ví dụ: Splunk, Google SecOps (Chronicle), Elastic, Wazuh, QRadar.",
  example: "Như phòng điều khiển trung tâm gom hình từ hàng trăm camera vào một màn hình và tự báo khi thấy điều bất thường.",
  trap: "SIEM chỉ tốt bằng log được đưa vào – thiếu nguồn log = điểm mù. SIEM <b>phát hiện và cảnh báo</b>, không tự chặn (đó là việc của IPS/SOAR/EDR).",
  interview: "Kể các nguồn log bạn sẽ đưa vào SIEM cho một công ty vừa và nhỏ.",
  terms: ["SIEM", "log collection", "normalization", "correlation", "Splunk", "Chronicle"]
},
{
  id: "k-soc-005", track: "soc", course: "K2", tier: 3, topic: "Công cụ SOC",
  front: "SOAR khác SIEM thế nào?",
  def: "<b>SOAR</b> (Security Orchestration, Automation and Response) <b>tự động hóa</b> các bước ứng phó theo playbook: làm giàu IoC, chặn IP, cô lập máy, tạo ticket. SIEM phát hiện, SOAR hành động.",
  example: "SIEM là chuông báo cháy, SOAR là hệ thống phun nước tự động và gọi cứu hỏa.",
  trap: "SOAR không thay thế analyst – nó làm việc lặp lại; quyết định quan trọng vẫn cần con người.",
  interview: "Cho ví dụ một tác vụ Tier 1 nên tự động hóa bằng SOAR.",
  terms: ["SOAR", "automation", "orchestration", "playbook", "enrichment"]
},
{
  id: "k-soc-006", track: "soc", course: "K6", tier: 3, topic: "Công cụ SOC",
  front: "IDS khác IPS thế nào?",
  def: "<b>IDS</b> (Intrusion Detection System): <b>phát hiện và cảnh báo</b>, thường nhận bản sao lưu lượng (out-of-band). <b>IPS</b> (Intrusion Prevention System): đặt <b>inline</b>, phát hiện và <b>chặn</b> luôn. Có loại NIDS (mạng) và HIDS (máy chủ).",
  example: "IDS như camera an ninh – thấy trộm thì báo; IPS như bảo vệ đứng ở cửa – thấy trộm thì chặn lại.",
  trap: "IPS đặt inline nên nếu FP sẽ <b>chặn nhầm lưu lượng hợp lệ</b>, và nếu IPS hỏng có thể làm gián đoạn mạng. Suricata và Snort có thể chạy cả IDS lẫn IPS.",
  interview: "Vì sao nhiều công ty chạy Suricata ở chế độ IDS trước rồi mới bật IPS?",
  terms: ["IDS", "IPS", "NIDS", "HIDS", "inline", "Suricata", "Snort"]
},
{
  id: "k-soc-007", track: "soc", course: "K6", tier: 3, topic: "Phát hiện",
  front: "Phát hiện dựa trên chữ ký (signature-based) khác dựa trên bất thường (anomaly-based) thế nào?",
  def: "<b>Signature</b>: so khớp với mẫu tấn công đã biết – ít FP, nhưng <b>không bắt được tấn công mới</b> (zero-day). <b>Anomaly</b>: học hành vi bình thường (baseline) rồi báo khi lệch – bắt được cái mới nhưng <b>nhiều FP</b>.",
  example: "Signature như bảo vệ cầm ảnh truy nã đối chiếu từng người; anomaly như bảo vệ quen mặt mọi người, thấy ai lạ lạ là để ý.",
  trap: "Kẻ tấn công né signature bằng cách sửa nhẹ malware/payload. Anomaly cần thời gian học baseline; nếu lúc học đã bị nhiễm thì baseline sai.",
  interview: "Ưu nhược điểm của từng phương pháp? Vì sao nên kết hợp cả hai?",
  terms: ["signature-based", "anomaly-based", "baseline", "zero-day"]
},
{
  id: "k-soc-008", track: "soc", course: "EXTRA", tier: 3, topic: "Công cụ SOC",
  front: "EDR là gì? Khác antivirus truyền thống ở đâu?",
  def: "<b>EDR</b> (Endpoint Detection and Response) cài agent trên máy trạm/server, ghi lại liên tục hoạt động (process, file, registry, network), phát hiện theo hành vi và cho phép <b>phản ứng từ xa</b>: cô lập máy, kill process, thu thập bằng chứng. Ví dụ: Microsoft Defender for Endpoint, CrowdStrike, SentinelOne.",
  example: "Antivirus như bảo vệ soát vé ở cửa; EDR như hệ thống camera trong toàn tòa nhà ghi lại mọi hành động và cho phép khóa cửa phòng ngay lập tức.",
  trap: "Antivirus chủ yếu dựa trên chữ ký file; EDR nhìn <b>chuỗi hành vi</b> (vd Word mở PowerShell tải file). XDR = mở rộng EDR sang mạng, email, cloud.",
  interview: "EDR báo một máy chạy PowerShell mã hóa (encoded command) – bạn làm gì tiếp theo?",
  terms: ["EDR", "XDR", "endpoint", "host isolation", "antivirus"]
},
{
  id: "k-soc-009", track: "soc", course: "K6", tier: 3, topic: "Ứng phó sự cố",
  front: "Vòng đời ứng phó sự cố NIST (SP 800-61) gồm 4 giai đoạn nào?",
  def: "1) <b>Preparation</b> (chuẩn bị) → 2) <b>Detection and Analysis</b> (phát hiện và phân tích) → 3) <b>Containment, Eradication and Recovery</b> (ngăn chặn, loại bỏ, khôi phục) → 4) <b>Post-Incident Activity</b> (hoạt động sau sự cố – lessons learned).",
  example: "Như phòng cháy chữa cháy: chuẩn bị bình cứu hỏa, phát hiện khói, khoanh vùng–dập lửa–sửa nhà, rồi họp rút kinh nghiệm.",
  trap: "Đây là một <b>vòng lặp</b>, không phải đường thẳng – giai đoạn 2 và 3 có thể lặp lại nhiều lần. Đừng nhầm với 5 chức năng NIST CSF.",
  interview: "Trong giai đoạn Post-Incident Activity, bạn sẽ viết những gì vào báo cáo?",
  terms: ["incident response", "NIST SP 800-61", "lessons learned", "incident handler"]
},
{
  id: "k-soc-010", track: "soc", course: "K6", tier: 3, topic: "Ứng phó sự cố",
  front: "Triage (phân loại alert) là gì? Tier 1 triage dựa trên tiêu chí nào?",
  def: "<b>Triage</b> là đánh giá nhanh alert để quyết định <b>có thật không và mức độ ưu tiên</b>: tài sản bị ảnh hưởng quan trọng cỡ nào, mức độ nghiêm trọng, có phải FP không, có cần escalate không.",
  example: "Như y tá phòng cấp cứu: người chảy máu nhiều được vào trước, người cảm nhẹ chờ sau.",
  trap: "Ưu tiên theo <b>tác động lên tài sản</b>, không phải theo thứ tự alert đến. Alert trên máy chủ domain controller quan trọng hơn alert trên máy test.",
  interview: "Cùng lúc có 3 alert: malware trên laptop thực tập sinh, brute force vào VPN, đăng nhập admin lạ trên DC – bạn xử lý cái nào trước, vì sao?",
  terms: ["triage", "severity", "priority", "escalation", "asset criticality"]
},
{
  id: "k-soc-011", track: "soc", course: "K6", tier: 3, topic: "Ứng phó sự cố",
  front: "Containment, eradication và recovery khác nhau thế nào?",
  def: "<b>Containment</b>: ngăn sự cố lan rộng (cô lập máy, khóa tài khoản, chặn IP). <b>Eradication</b>: loại bỏ hoàn toàn nguyên nhân (xóa malware, vá lỗ hổng, xóa tài khoản backdoor). <b>Recovery</b>: đưa hệ thống trở lại hoạt động bình thường (restore backup, giám sát thêm).",
  example: "Nhà bị dột: lấy xô hứng nước và che bạt (containment), thay ngói vỡ (eradication), lau dọn và dọn đồ vào lại (recovery).",
  trap: "Đừng tắt nguồn máy ngay – sẽ mất bằng chứng trong RAM; thường nên <b>cô lập mạng</b>. Restore khi chưa eradication xong thì dễ bị nhiễm lại.",
  interview: "Một máy bị ransomware: bước containment đầu tiên bạn làm là gì?",
  terms: ["containment", "eradication", "recovery", "isolation", "backup"]
},
{
  id: "k-soc-012", track: "soc", course: "K6", tier: 3, topic: "Threat intelligence",
  front: "IoC khác IoA thế nào?",
  def: "<b>IoC</b> (Indicator of Compromise): bằng chứng cho thấy <b>đã bị xâm nhập</b> – hash file độc, IP/domain C2. <b>IoA</b> (Indicator of Attack): dấu hiệu <b>cuộc tấn công đang diễn ra</b>, tập trung vào hành vi/ý đồ – vd process lạ tạo kết nối ra ngoài.",
  example: "IoC như dấu vân tay kẻ trộm để lại sau khi trộm; IoA như thấy một người đang loay hoay cạy khóa cửa.",
  trap: "IoC là <b>phản ứng</b> (sau khi xảy ra), IoA là <b>chủ động</b>. IoC như IP/hash rất dễ bị kẻ tấn công thay đổi.",
  interview: "Kể 3 loại IoC bạn hay tra cứu và công cụ để tra (VirusTotal, AbuseIPDB…).",
  terms: ["IoC", "IoA", "threat intelligence", "C2", "VirusTotal"]
},
{
  id: "k-soc-013", track: "soc", course: "K6", tier: 3, topic: "Threat intelligence",
  front: "Pyramid of Pain gồm những mức nào từ dưới lên? Ý nghĩa là gì?",
  def: "Từ dễ đến khó với kẻ tấn công: <b>Hash values</b> → <b>IP addresses</b> → <b>Domain names</b> → <b>Network/host artifacts</b> → <b>Tools</b> → <b>TTPs</b>. Chặn được mức càng cao thì kẻ tấn công càng 'đau'.",
  example: "Chặn hash như cấm một chiếc áo – kẻ trộm thay áo khác là xong; chặn TTP như hiểu cả cách hắn trộm – hắn phải học nghề lại từ đầu.",
  trap: "Hash ở <b>đáy</b> vì chỉ cần đổi 1 byte là hash đổi. TTP (Tactics, Techniques, Procedures) ở <b>đỉnh</b>. Do David J. Bianco đưa ra.",
  interview: "Vì sao chặn IP của kẻ tấn công thường chỉ có tác dụng tạm thời?",
  terms: ["Pyramid of Pain", "TTP", "hash", "artifacts", "David Bianco"]
},
{
  id: "k-soc-014", track: "soc", course: "K6", tier: 3, topic: "Ứng phó sự cố",
  front: "Chain of custody (chuỗi lưu giữ bằng chứng) là gì? Vì sao quan trọng?",
  def: "<b>Chain of custody</b> là hồ sơ ghi lại <b>ai đã thu thập, nắm giữ, chuyển giao, xem xét bằng chứng, khi nào, ở đâu, vì sao</b> – để chứng minh bằng chứng không bị thay đổi.",
  example: "Như niêm phong tang vật của công an: mỗi lần mở niêm phong đều phải có biên bản và chữ ký.",
  trap: "Chain of custody đứt đoạn → bằng chứng có thể <b>không được chấp nhận</b> trước pháp luật. Luôn hash (SHA-256) image bằng chứng để chứng minh toàn vẹn.",
  interview: "Khi thu thập ổ cứng/log làm bằng chứng, bạn ghi lại những thông tin gì?",
  terms: ["chain of custody", "evidence", "forensics", "integrity"]
},
{
  id: "k-soc-015", track: "soc", course: "K2", tier: 3, topic: "Ứng phó sự cố",
  front: "Playbook là gì? Tại sao Tier 1 cần làm theo playbook?",
  def: "<b>Playbook</b> là tài liệu hướng dẫn <b>từng bước</b> xử lý một loại sự cố cụ thể (phishing, malware, ransomware…): cần kiểm tra gì, ai liên hệ, khi nào escalate, cách ghi chép.",
  example: "Như công thức nấu ăn: ai làm theo cũng ra món giống nhau, không phụ thuộc vào trí nhớ người nấu.",
  trap: "Playbook là tài liệu sống – phải cập nhật sau mỗi lần lessons learned. Không phải chỉ dùng khi có sự cố lớn.",
  interview: "Mô tả playbook xử lý một email phishing được người dùng báo cáo.",
  terms: ["playbook", "runbook", "SOP", "escalation"]
},
{
  id: "k-soc-016", track: "soc", course: "K6", tier: 3, topic: "Log",
  front: "Những nguồn log nào quan trọng với SOC?",
  def: "<b>Network</b>: firewall, proxy, DNS, VPN, IDS. <b>Endpoint/OS</b>: Windows Event Log, Sysmon, Linux auth.log/syslog, EDR. <b>Ứng dụng</b>: web server (access/error log), database. <b>Xác thực/Cloud</b>: Active Directory, Microsoft Entra ID, CloudTrail.",
  example: "Mỗi nguồn log là một nhân chứng; càng nhiều nhân chứng thì càng dựng lại được câu chuyện chính xác.",
  trap: "Log quá ít = điểm mù, log quá nhiều = tốn chi phí và nhiễu. Phải giữ log đủ thời gian (retention) theo chính sách/luật.",
  interview: "Điều tra một máy tải malware từ web – bạn sẽ xem log nào, theo thứ tự nào?",
  terms: ["log source", "retention", "Windows Event Log", "proxy log", "DNS log"]
},
{
  id: "k-soc-017", track: "soc", course: "K6", tier: 3, topic: "Log",
  front: "Các định dạng log syslog, JSON, CEF trông như thế nào?",
  def: "<b>Syslog</b>: header (timestamp, hostname) + message, vd <code>Jan 10 08:15:32 web01 sshd[1234]: Failed password...</code>. <b>JSON</b>: cặp key–value trong <code>{ }</code>. <b>CEF</b>: <code>CEF:Version|Device Vendor|Device Product|Device Version|Signature ID|Name|Severity|Extension</code> ngăn bằng dấu <code>|</code>.",
  example: "Giống cùng một biên bản nhưng viết theo 3 mẫu đơn khác nhau – SIEM phải biết đọc từng mẫu (parse) rồi quy về một chuẩn chung.",
  trap: "Syslog vừa là <b>giao thức</b> (UDP 514), vừa là <b>dịch vụ</b>, vừa là <b>định dạng</b>. Các định dạng khác: XML (Windows Event), CSV.",
  interview: "Vì sao SIEM cần normalize log từ nhiều định dạng khác nhau?",
  terms: ["syslog", "JSON", "CEF", "XML", "parsing", "normalization"]
},
{
  id: "k-soc-018", track: "soc", course: "K6", tier: 3, topic: "Phân tích gói tin",
  front: "Lệnh tcpdump cơ bản để bắt và đọc gói tin là gì?",
  def: "<code>sudo tcpdump -i eth0 -nn -c 10 port 80</code>: bắt trên interface eth0, 10 gói, port 80, không phân giải tên/port. <code>-w file.pcap</code> ghi ra file; <code>-r file.pcap</code> đọc file; <code>-v</code> chi tiết hơn; <code>-D</code> liệt kê interface.",
  example: "tcpdump như máy ghi âm đặt ở đường dây điện thoại – ghi lại mọi cuộc gọi đi qua để nghe lại.",
  trap: "<code>-n</code> tắt phân giải tên miền (tránh tạo thêm truy vấn DNS); <code>-nn</code> tắt cả phân giải port. Cần quyền root. File .pcap có thể mở bằng Wireshark.",
  interview: "Bắt các gói tin từ host 10.0.0.5 đến port 443 và lưu ra file – viết lệnh.",
  terms: ["tcpdump", "pcap", "Wireshark", "packet capture", "interface"]
},
{
  id: "k-soc-019", track: "soc", course: "K6", tier: 3, topic: "Phân tích gói tin",
  front: "Đọc dòng tcpdump: <code>14:23:01.123 IP 192.168.1.10.51234 &gt; 10.0.0.5.80: Flags [S], seq 100, win 64240, length 0</code>?",
  def: "Thời gian 14:23:01; giao thức IP; nguồn <b>192.168.1.10 port 51234</b> → đích <b>10.0.0.5 port 80</b>; cờ <b>[S] = SYN</b> (bắt đầu bắt tay TCP); length 0 = chưa có dữ liệu.",
  example: "Như đọc phong bì: ngày gửi, người gửi (IP.port nguồn), người nhận (IP.port đích), loại thư ([S] = thư xin làm quen).",
  trap: "Số cuối sau dấu chấm là <b>port</b>, không phải một phần IP. Cờ: <code>[S.]</code> SYN-ACK, <code>[.]</code> ACK, <code>[P.]</code> PSH-ACK (có dữ liệu), <code>[F.]</code> FIN, <code>[R]</code> RST.",
  interview: "Thấy một IP gửi [S] tới hàng trăm port khác nhau, đều nhận [R.] về – đó là gì?",
  terms: ["tcpdump output", "TCP flags", "SYN", "RST", "port scan"]
},
{
  id: "k-soc-020", track: "soc", course: "K6", tier: 3, topic: "Suricata",
  front: "Một rule Suricata gồm 3 phần nào? Giải thích ví dụ rule mẫu.",
  def: "<b>Action</b> (alert/drop/pass/reject) + <b>Header</b> (giao thức, IP/port nguồn, chiều, IP/port đích) + <b>Rule options</b> trong ngoặc.<br><code>alert http $HOME_NET any -&gt; $EXTERNAL_NET any (msg:\"GET on wire\"; flow:established,to_server; content:\"GET\"; http_method; sid:12345; rev:3;)</code>",
  example: "Như lệnh cho bảo vệ: HÀNH ĐỘNG (báo động) – AI ĐI ĐÂU (người trong công ty ra ngoài) – ĐẶC ĐIỂM NHẬN DẠNG (cầm túi có chữ GET).",
  trap: "<code>sid</code> phải duy nhất, <code>rev</code> là số phiên bản rule. <code>-&gt;</code> một chiều, <code>&lt;&gt;</code> hai chiều. Alert ghi trong <code>fast.log</code>, chi tiết JSON trong <code>eve.json</code>.",
  interview: "Rule trên phát hiện gì? Nếu đổi alert thành drop thì Suricata phải chạy ở chế độ nào?",
  terms: ["Suricata", "rule", "action", "header", "sid", "eve.json", "fast.log"]
},
{
  id: "k-soc-021", track: "soc", course: "K5", tier: 3, topic: "Phishing",
  front: "Khi phân tích một email phishing, bạn kiểm tra những gì?",
  def: "<b>Header</b>: From/Reply-To/Return-Path có khớp không, SPF/DKIM/DMARC pass hay fail, IP gửi. <b>Nội dung</b>: khẩn cấp, đòi thông tin, lỗi chính tả. <b>Link</b>: domain thật sau URL (không click – tra VirusTotal/urlscan). <b>Attachment</b>: tính hash, tra VirusTotal, phân tích trong sandbox.",
  example: "Như nhận thư 'từ ngân hàng' – xem dấu bưu điện có đúng không, chữ ký có lạ không, số hotline có đúng số thật không.",
  trap: "Tên hiển thị dễ giả mạo – phải xem địa chỉ email thật. Sau khi xác nhận phishing: tìm <b>những người khác cũng nhận</b>, xóa mail, chặn domain/IP, kiểm tra ai đã click/nhập mật khẩu.",
  interview: "Người dùng báo đã click link và nhập mật khẩu vào trang phishing – bạn làm gì ngay?",
  terms: ["phishing", "spear phishing", "SPF", "DKIM", "DMARC", "sandbox"]
},
{
  id: "k-soc-022", track: "soc", course: "K5", tier: 3, topic: "Malware",
  front: "Virus khác worm thế nào?",
  def: "<b>Virus</b>: bám vào file/chương trình, cần <b>người dùng chạy</b> mới lây. <b>Worm</b>: <b>tự nhân bản và tự lây</b> qua mạng, không cần người dùng tương tác.",
  example: "Virus như bệnh lây khi bắt tay – bạn phải chạm vào; worm như bệnh lây qua không khí – tự lan khắp phòng.",
  trap: "WannaCry là <b>ransomware có tính năng worm</b> (lây qua SMB 445) – một malware có thể thuộc nhiều loại.",
  interview: "Vì sao worm nguy hiểm hơn với mạng doanh nghiệp? Cách hạn chế lây lan?",
  terms: ["virus", "worm", "malware", "propagation"]
},
{
  id: "k-soc-023", track: "soc", course: "K5", tier: 3, topic: "Malware",
  front: "Trojan, ransomware, spyware, rootkit, botnet khác nhau thế nào?",
  def: "<b>Trojan</b>: giả làm phần mềm hợp pháp. <b>Ransomware</b>: mã hóa dữ liệu đòi tiền chuộc. <b>Spyware</b>: lén thu thập thông tin. <b>Rootkit</b>: ẩn mình, giữ quyền admin lâu dài. <b>Botnet</b>: mạng máy bị chiếm (bot) do kẻ tấn công điều khiển qua C2. Thêm: <b>cryptojacking</b> đào tiền ảo lén.",
  example: "Trojan như con ngựa gỗ thành Troy – nhìn như quà tặng nhưng bên trong có lính.",
  trap: "Ransomware hiện đại thường <b>double extortion</b>: đánh cắp dữ liệu trước rồi mới mã hóa. Backup offline là phòng thủ quan trọng nhất.",
  interview: "Dấu hiệu nào trên mạng/máy cho thấy một máy đã thành bot trong botnet?",
  terms: ["trojan", "ransomware", "spyware", "rootkit", "botnet", "cryptojacking"]
},
{
  id: "k-soc-024", track: "soc", course: "K5", tier: 3, topic: "Tấn công",
  front: "Social engineering là gì? Kể vài dạng phổ biến.",
  def: "<b>Social engineering</b> là thao túng tâm lý con người để họ tiết lộ thông tin hoặc làm điều có hại. Dạng: <b>phishing</b>, <b>spear phishing</b> (nhắm cá nhân), <b>whaling</b> (nhắm lãnh đạo), <b>vishing</b> (gọi điện), <b>smishing</b> (SMS), <b>pretexting</b>, <b>baiting</b> (USB rơi), <b>tailgating</b>, <b>watering hole</b>.",
  example: "Kẻ gian gọi điện xưng 'nhân viên IT, cần mật khẩu để sửa lỗi gấp' – lợi dụng sự tin tưởng và gấp gáp.",
  trap: "Con người là mắt xích yếu nhất – không công cụ kỹ thuật nào thay được <b>security awareness training</b>. BEC (giả mạo sếp đòi chuyển tiền) không cần malware.",
  interview: "Kẻ tấn công thường khai thác những yếu tố tâm lý nào (khẩn cấp, quyền lực, tham lam)?",
  terms: ["social engineering", "vishing", "smishing", "whaling", "tailgating", "BEC"]
},
{
  id: "k-soc-025", track: "soc", course: "K5", tier: 3, topic: "Tấn công",
  front: "Brute force là gì? Phân biệt password spraying và credential stuffing.",
  def: "<b>Brute force</b>: thử rất nhiều mật khẩu cho một tài khoản. <b>Password spraying</b>: thử <b>vài mật khẩu phổ biến</b> cho <b>nhiều tài khoản</b> (né khóa tài khoản). <b>Credential stuffing</b>: dùng cặp user/pass <b>đã lộ</b> từ nơi khác. <b>Dictionary attack</b>: thử theo danh sách từ.",
  example: "Brute force như thử từng chìa trong chùm 1000 chìa vào một ổ; spraying như thử một chìa 'phổ biến' vào 1000 ổ khóa.",
  trap: "Dấu hiệu spraying: <b>một IP</b>, nhiều username khác nhau, mỗi user chỉ sai 1–2 lần. Windows: nhiều Event <b>4625</b>; Linux: 'Failed password' trong auth.log. MITRE T1110.",
  interview: "Phòng chống brute force bằng những biện pháp nào?",
  terms: ["brute force", "password spraying", "credential stuffing", "account lockout", "T1110"]
},
{
  id: "k-soc-026", track: "soc", course: "K3", tier: 3, topic: "Tấn công",
  front: "DoS khác DDoS thế nào?",
  def: "<b>DoS</b>: tấn công từ <b>một nguồn</b> làm hệ thống quá tải, không phục vụ được. <b>DDoS</b>: từ <b>nhiều nguồn phân tán</b> (thường là botnet) – khó chặn hơn vì không chỉ chặn một IP.",
  example: "DoS như một người gọi liên tục vào tổng đài; DDoS như hàng nghìn người cùng gọi một lúc khiến khách thật không gọi được.",
  trap: "DoS/DDoS tấn công <b>Availability</b>. Các dạng lớp mạng: SYN flood, ICMP flood, Smurf, Ping of death.",
  interview: "Công ty bạn bị DDoS vào web – những biện pháp giảm thiểu có thể là gì?",
  terms: ["DoS", "DDoS", "botnet", "availability", "rate limiting"]
},
{
  id: "k-soc-027", track: "soc", course: "K3", tier: 3, topic: "Tấn công",
  front: "SYN flood hoạt động thế nào?",
  def: "Kẻ tấn công gửi hàng loạt gói <b>SYN</b>, server trả SYN-ACK và giữ kết nối 'nửa mở' chờ <b>ACK</b> không bao giờ tới → hết tài nguyên, không nhận được kết nối hợp lệ.",
  example: "Như đặt hàng trăm bàn nhà hàng rồi không đến – nhà hàng giữ bàn chờ, khách thật đến thì hết chỗ.",
  trap: "Trên tcpdump: rất nhiều <code>[S]</code> đến, ít <code>[.]</code> ACK hoàn tất, IP nguồn thường bị giả mạo. Biện pháp: SYN cookies, rate limit, firewall/anti-DDoS.",
  interview: "Phân biệt SYN flood với Ping of death và Smurf attack.",
  terms: ["SYN flood", "half-open", "SYN cookies", "Smurf", "Ping of death"]
},
{
  id: "k-soc-028", track: "soc", course: "K3", tier: 3, topic: "Tấn công",
  front: "On-path attack (Man-in-the-Middle) là gì?",
  def: "Kẻ tấn công <b>chen vào giữa</b> hai bên giao tiếp để nghe lén hoặc sửa dữ liệu, trong khi hai bên tưởng đang nói chuyện trực tiếp với nhau. Kỹ thuật: ARP spoofing, Wi-Fi giả (evil twin), DNS spoofing.",
  example: "Người đưa thư mở thư của bạn ra đọc, sửa số tài khoản rồi dán lại và giao tiếp.",
  trap: "Mã hóa (HTTPS/TLS) + kiểm tra certificate là phòng thủ chính. Cảnh báo 'certificate không hợp lệ' khi dùng Wi-Fi công cộng có thể là dấu hiệu on-path. Replay attack là biến thể: gửi lại gói đã bắt.",
  interview: "Vì sao dùng Wi-Fi quán cà phê không có VPN lại rủi ro?",
  terms: ["on-path attack", "MITM", "ARP spoofing", "evil twin", "replay attack"]
},
{
  id: "k-soc-029", track: "soc", course: "K3", tier: 3, topic: "Tấn công",
  front: "IP spoofing là gì? Dùng trong những tấn công nào?",
  def: "<b>IP spoofing</b> là <b>giả mạo IP nguồn</b> trong gói tin để che giấu danh tính hoặc mạo danh máy tin cậy. Dùng trong DDoS (SYN flood, Smurf), on-path, vượt qua firewall dựa trên IP.",
  example: "Như gửi thư ghi địa chỉ người gửi giả – người nhận trả lời sẽ gửi nhầm sang người khác.",
  trap: "Với TCP, kẻ spoofing <b>không nhận được phản hồi</b> nên khó hoàn tất kết nối – phù hợp cho DoS hơn là đánh cắp dữ liệu. Phòng: firewall chặn gói từ ngoài vào mang IP nội bộ (anti-spoofing / ingress filtering).",
  interview: "Vì sao chặn IP nguồn trong một cuộc DDoS spoofing thường không hiệu quả?",
  terms: ["IP spoofing", "ingress filtering", "Smurf attack"]
},
{
  id: "k-soc-030", track: "soc", course: "K5", tier: 3, topic: "Tấn công web",
  front: "SQL injection là gì? Phòng chống thế nào?",
  def: "Kẻ tấn công chèn câu lệnh SQL vào ô nhập liệu không được kiểm tra, khiến database chạy lệnh ngoài ý muốn, vd nhập <code>' OR 1=1 --</code> vào ô đăng nhập. Phòng: <b>prepared statements</b> (parameterized queries), input validation/sanitization, least privilege cho tài khoản DB, WAF.",
  example: "Như điền vào ô 'Tên người nhận' dòng chữ 'và đưa luôn chìa khóa kho cho tôi' – nhân viên làm theo y nguyên không suy nghĩ.",
  trap: "Escape ký tự hay WAF chỉ là bổ trợ – cách đúng là <b>prepared statement</b>. Dấu hiệu trong web log: <code>'</code>, <code>UNION SELECT</code>, <code>OR 1=1</code>, <code>--</code> trong URL.",
  interview: "Thấy trong access log có <code>?id=1' UNION SELECT username,password FROM users--</code> – bạn kết luận gì và làm gì?",
  terms: ["SQL injection", "prepared statement", "input validation", "WAF", "UNION SELECT"]
},
{
  id: "k-soc-031", track: "soc", course: "K5", tier: 3, topic: "Tấn công web",
  front: "XSS là gì? Phân biệt stored, reflected và DOM-based XSS.",
  def: "<b>XSS</b> chèn mã script độc vào trang web để chạy trên <b>trình duyệt nạn nhân</b> (đánh cắp cookie/session). <b>Reflected</b>: script nằm trong request (link) và phản hồi lại ngay. <b>Stored</b>: script lưu trên server (bình luận) – ai xem cũng dính. <b>DOM-based</b>: xảy ra hoàn toàn trong JavaScript phía trình duyệt.",
  example: "Stored XSS như dán tờ rơi độc lên bảng tin chung cư – ai đi qua đọc cũng bị ảnh hưởng; reflected như gửi riêng cho bạn một link bẫy.",
  trap: "SQLi tấn công <b>database (server)</b>, XSS tấn công <b>người dùng (trình duyệt)</b>. Stored nguy hiểm nhất vì không cần lừa từng người click. Phòng: output encoding, input validation, CSP, cookie HttpOnly.",
  interview: "Dấu hiệu XSS trong web log là gì (vd <code>&lt;script&gt;</code>, <code>onerror=</code>)?",
  terms: ["XSS", "stored XSS", "reflected XSS", "DOM-based XSS", "cookie", "CSP"]
},
{
  id: "k-soc-032", track: "soc", course: "K5", tier: 2, topic: "Tấn công web",
  front: "OWASP Top 10 là gì? Kể vài mục tiêu biểu.",
  def: "Danh sách <b>10 rủi ro bảo mật ứng dụng web phổ biến nhất</b> do tổ chức OWASP công bố và cập nhật định kỳ. Bản 2021: A01 <b>Broken Access Control</b>, A02 Cryptographic Failures, A03 <b>Injection</b> (gồm SQLi, XSS), A07 Identification and Authentication Failures…",
  example: "Như danh sách '10 lỗi an toàn phòng cháy hay gặp nhất' mà mọi tòa nhà nên kiểm tra trước.",
  trap: "Đây là tài liệu nâng cao nhận thức, <b>không phải</b> tiêu chuẩn tuân thủ bắt buộc. Thứ tự và tên mục thay đổi giữa các phiên bản – nhớ ý tưởng chính.",
  interview: "Broken Access Control là gì? Cho một ví dụ (IDOR: đổi ?id=100 thành ?id=101 xem được dữ liệu người khác).",
  terms: ["OWASP Top 10", "broken access control", "injection", "IDOR"]
},
{
  id: "k-soc-033", track: "soc", course: "K2", tier: 3, topic: "Khung bảo mật",
  front: "NIST CSF có những chức năng cốt lõi nào?",
  def: "Khóa học dạy 5 chức năng: <b>Identify</b>, <b>Protect</b>, <b>Detect</b>, <b>Respond</b>, <b>Recover</b>. Bản <b>CSF 2.0</b> (2024) thêm <b>Govern</b> (quản trị) ở trung tâm → 6 chức năng.",
  example: "Như bảo vệ ngôi nhà: đặt quy định gia đình (Govern), kiểm kê đồ quý (Identify), lắp khóa (Protect), lắp camera (Detect), gọi công an khi có trộm (Respond), sửa cửa và mua lại đồ (Recover).",
  trap: "Đừng nhầm với 4 giai đoạn ứng phó sự cố NIST SP 800-61. Công việc SOC Tier 1 chủ yếu nằm ở <b>Detect</b> và <b>Respond</b>.",
  interview: "Công việc hằng ngày của SOC analyst thuộc chức năng nào của NIST CSF?",
  terms: ["NIST CSF", "Identify", "Protect", "Detect", "Respond", "Recover", "Govern"]
},
{
  id: "k-soc-034", track: "soc", course: "EXTRA", tier: 3, topic: "Khung bảo mật",
  front: "MITRE ATT&CK là gì? Tactic khác technique thế nào?",
  def: "<b>MITRE ATT&amp;CK</b> là cơ sở tri thức về hành vi kẻ tấn công dựa trên các vụ thật. <b>Tactic</b> = <b>mục tiêu/vì sao</b> (vd TA0006 Credential Access). <b>Technique</b> = <b>cách làm</b> để đạt mục tiêu (vd T1110 Brute Force). Sub-technique: T1110.003 Password Spraying.",
  example: "Tactic là 'vào được nhà', technique là 'cạy khóa', 'leo cửa sổ' hay 'giả làm thợ điện'.",
  trap: "Enterprise matrix có 14 tactic (Reconnaissance → Impact). Tactic ID bắt đầu bằng <b>TA</b>, technique bắt đầu bằng <b>T</b>. Ví dụ quen: T1566 Phishing (thuộc Initial Access).",
  interview: "Map một alert brute force SSH vào MITRE ATT&CK: tactic gì, technique gì?",
  terms: ["MITRE ATT&CK", "tactic", "technique", "sub-technique", "TTP"]
},
{
  id: "k-soc-035", track: "soc", course: "EXTRA", tier: 2, topic: "Khung bảo mật",
  front: "Cyber Kill Chain (Lockheed Martin) gồm 7 bước nào?",
  def: "1) <b>Reconnaissance</b> 2) <b>Weaponization</b> 3) <b>Delivery</b> 4) <b>Exploitation</b> 5) <b>Installation</b> 6) <b>Command and Control (C2)</b> 7) <b>Actions on Objectives</b>.",
  example: "Kẻ trộm: thăm dò nhà (recon), chuẩn bị đồ nghề (weaponize), đến cửa (delivery), phá khóa (exploit), ẩn trong nhà (install), liên lạc đồng bọn (C2), lấy đồ (actions).",
  trap: "Kill chain tuyến tính và thiên về giai đoạn xâm nhập; ATT&CK chi tiết hơn và không bắt buộc theo thứ tự. Phá vỡ được bất kỳ mắt xích nào là ngăn được tấn công.",
  interview: "Email phishing kèm file độc thuộc bước nào? Chặn ở bước nào là tốt nhất?",
  terms: ["Cyber Kill Chain", "reconnaissance", "weaponization", "C2", "actions on objectives"]
},
{
  id: "k-soc-036", track: "soc", course: "EXTRA", tier: 3, topic: "Windows Event ID",
  front: "Windows Event ID 4624, 4625, 4634 nghĩa là gì?",
  def: "<b>4624</b>: đăng nhập <b>thành công</b>. <b>4625</b>: đăng nhập <b>thất bại</b>. <b>4634</b>: tài khoản <b>đăng xuất</b> (logoff). Tất cả nằm trong Security log.",
  example: "Như sổ ra vào cổng: 4624 = vào được, 4625 = bị từ chối ở cổng, 4634 = đã ra về.",
  trap: "Nhiều 4625 rồi tiếp theo <b>một 4624</b> cùng tài khoản/IP → brute force <b>đã thành công</b> – nghiêm trọng hơn nhiều. Xem trường <b>Logon Type</b> và Source Network Address trong sự kiện.",
  interview: "Bạn thấy 200 sự kiện 4625 rồi một 4624 từ cùng một IP – bạn kết luận gì và làm gì?",
  terms: ["Event ID 4624", "Event ID 4625", "Event ID 4634", "Security log", "Event Viewer"]
},
{
  id: "k-soc-037", track: "soc", course: "EXTRA", tier: 2, topic: "Windows Event ID",
  front: "Logon Type 2, 3, 10 trong Event 4624/4625 nghĩa là gì?",
  def: "<b>Type 2</b>: Interactive – đăng nhập trực tiếp tại máy (bàn phím). <b>Type 3</b>: Network – truy cập qua mạng (vd share SMB). <b>Type 10</b>: RemoteInteractive – <b>RDP</b>. (Ngoài ra: 4 Batch, 5 Service, 7 Unlock.)",
  example: "Type 2 như vào nhà bằng cửa chính; type 3 như nhờ người lấy đồ qua cửa sổ; type 10 như điều khiển robot trong nhà từ xa.",
  trap: "4625 với Logon Type 10 từ IP Internet → brute force <b>RDP</b>. Logon type 3 xuất hiện rất nhiều trong mạng domain – bình thường, đừng hoảng.",
  interview: "Làm sao phân biệt brute force RDP với brute force SMB trong Event Log?",
  terms: ["Logon Type", "interactive", "network logon", "RemoteInteractive", "RDP"]
},
{
  id: "k-soc-038", track: "soc", course: "EXTRA", tier: 3, topic: "Windows Event ID",
  front: "Windows Event ID 4648, 4672, 4688 nghĩa là gì?",
  def: "<b>4648</b>: đăng nhập dùng <b>thông tin xác thực tường minh</b> (explicit credentials, vd runas). <b>4672</b>: phiên đăng nhập được gán <b>đặc quyền đặc biệt</b> (tài khoản admin). <b>4688</b>: <b>một process mới được tạo</b>.",
  example: "4672 như người vào cổng được phát thẻ 'quản lý' có quyền vào mọi phòng; 4688 như camera ghi lại 'ai vừa bật máy nào'.",
  trap: "4688 mặc định <b>không ghi command line</b> – phải bật thêm chính sách 'Include command line in process creation events'. 4672 bất thường với tài khoản thường → nghi privilege escalation.",
  interview: "Muốn phát hiện PowerShell độc hại trên Windows, bạn cần bật/thu thập những log nào?",
  terms: ["Event ID 4648", "Event ID 4672", "Event ID 4688", "process creation", "privilege"]
},
{
  id: "k-soc-039", track: "soc", course: "EXTRA", tier: 3, topic: "Windows Event ID",
  front: "Windows Event ID 4720, 4728, 4732, 4740 nghĩa là gì?",
  def: "<b>4720</b>: <b>tạo tài khoản user</b> mới. <b>4728</b>: thêm thành viên vào <b>security-enabled global group</b> (vd Domain Admins). <b>4732</b>: thêm thành viên vào <b>security-enabled local group</b> (vd Administrators). <b>4740</b>: tài khoản <b>bị khóa</b> (locked out).",
  example: "4720 như làm thẻ nhân viên mới; 4728/4732 như cấp thẻ đó thêm quyền vào phòng giám đốc; 4740 như thẻ bị khóa vì quẹt sai quá nhiều lần.",
  trap: "4720 rồi 4728/4732 ngoài giờ, không có ticket → dấu hiệu kẻ tấn công <b>tạo backdoor account</b> (persistence). Nhiều 4740 cùng lúc → password spraying/brute force.",
  interview: "Lúc 2 giờ sáng, một tài khoản mới được tạo và thêm vào Domain Admins – bạn làm gì?",
  terms: ["Event ID 4720", "Event ID 4728", "Event ID 4732", "Event ID 4740", "persistence"]
},
{
  id: "k-soc-040", track: "soc", course: "EXTRA", tier: 3, topic: "Windows Event ID",
  front: "Windows Event ID 1102 nghĩa là gì? Vì sao đáng báo động?",
  def: "<b>1102</b>: <b>Security audit log đã bị xóa</b> (The audit log was cleared). Sự kiện ghi kèm tài khoản đã thực hiện việc xóa.",
  example: "Như phát hiện ai đó đã xóa toàn bộ băng ghi hình camera – thường là để che giấu việc vừa làm.",
  trap: "Xóa log là kỹ thuật <b>Defense Evasion</b> (MITRE T1070.001). Đây là lý do log cần được <b>gửi về SIEM</b> ngay – xóa trên máy thì bản trên SIEM vẫn còn.",
  interview: "Thấy Event 1102 trên một server, bạn điều tra tiếp những gì?",
  terms: ["Event ID 1102", "log clearing", "defense evasion", "T1070"]
},
{
  id: "k-soc-041", track: "soc", course: "EXTRA", tier: 2, topic: "Windows Event ID",
  front: "Sysmon Event ID 1 và Event ID 3 ghi lại gì?",
  def: "<b>Sysmon</b> (Sysinternals) ghi log chi tiết hơn Windows mặc định. <b>Event 1</b>: <b>Process creation</b> – có command line, hash, parent process. <b>Event 3</b>: <b>Network connection</b> – process nào kết nối tới IP/port nào.",
  example: "Event 1 như camera ghi 'ai bật máy gì, bằng lệnh gì, ai bảo bật'; Event 3 như ghi 'máy đó gọi điện ra số nào'.",
  trap: "Sysmon <b>không có sẵn</b> – phải cài và cấu hình (vd config SwiftOnSecurity). Parent process quan trọng: <code>winword.exe</code> sinh ra <code>powershell.exe</code> là rất đáng ngờ.",
  interview: "Sysmon Event 1 cho thấy excel.exe chạy cmd.exe rồi powershell.exe – bạn nghĩ gì?",
  terms: ["Sysmon", "process creation", "network connection", "parent process", "command line"]
},

/* =====================================================================
   TRACK "mang" – Quản trị mạng / hệ thống (CCNA core + EXTRA)
   ===================================================================== */
{
  id: "k-mang-001", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "VLAN là gì? Lợi ích của việc chia VLAN?",
  def: "<b>VLAN</b> chia một switch vật lý thành nhiều <b>mạng logic (broadcast domain)</b> riêng biệt. Lợi ích: giảm broadcast, tách biệt phòng ban (bảo mật), quản lý linh hoạt không phụ thuộc vị trí.",
  example: "Một tòa nhà (switch) chia thành nhiều công ty thuê (VLAN) – cùng tòa nhưng không vào được văn phòng của nhau.",
  trap: "Các VLAN <b>không nói chuyện được với nhau</b> nếu không có thiết bị lớp 3 (router/L3 switch). Mỗi VLAN thường tương ứng một subnet riêng.",
  interview: "Công ty có phòng Kế toán, IT, Khách (Guest Wi-Fi) – bạn chia VLAN thế nào và vì sao?",
  terms: ["VLAN", "broadcast domain", "segmentation", "VLAN ID"]
},
{
  id: "k-mang-002", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "Access port khác trunk port thế nào? 802.1Q làm gì?",
  def: "<b>Access port</b>: thuộc <b>một VLAN</b>, nối tới máy tính/máy in, frame không gắn tag. <b>Trunk port</b>: mang <b>nhiều VLAN</b>, nối switch–switch hoặc switch–router. <b>802.1Q</b> chèn <b>tag 4 byte</b> (chứa VLAN ID) vào frame để phân biệt VLAN trên trunk.",
  example: "Access port như cửa vào một căn hộ; trunk như hành lang chung – mỗi người đi qua phải đeo thẻ (tag) ghi căn hộ của mình.",
  trap: "Lệnh: <code>switchport mode access</code> + <code>switchport access vlan 10</code>; trunk: <code>switchport mode trunk</code>. ISL là giao thức trunk cũ của Cisco – hiện dùng 802.1Q.",
  interview: "Nối 2 switch có VLAN 10, 20, 30 thì cổng nối giữa chúng cấu hình thế nào?",
  terms: ["access port", "trunk port", "802.1Q", "tagging", "dot1q"]
},
{
  id: "k-mang-003", track: "mang", course: "CCNA", tier: 2, topic: "VLAN & Switching",
  front: "Native VLAN là gì? Vì sao nên đổi khỏi VLAN 1?",
  def: "<b>Native VLAN</b> là VLAN mà frame đi trên trunk 802.1Q <b>không gắn tag</b>. Mặc định là <b>VLAN 1</b>. Hai đầu trunk phải cấu hình native VLAN giống nhau.",
  example: "Hành lang chung cho phép một nhóm người (native VLAN) đi không cần đeo thẻ – kẻ gian dễ trà trộn vào nhóm đó.",
  trap: "Native VLAN không khớp → lỗi/rò lưu lượng giữa VLAN (CDP báo 'native VLAN mismatch'). Best practice: đổi native VLAN sang VLAN <b>không dùng</b> để chống <b>VLAN hopping (double tagging)</b>.",
  interview: "VLAN hopping là gì và phòng chống thế nào?",
  terms: ["native VLAN", "untagged", "VLAN hopping", "double tagging"]
},
{
  id: "k-mang-004", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "Router-on-a-stick là gì? Cấu hình cơ bản ra sao?",
  def: "Định tuyến giữa các VLAN bằng <b>một cổng vật lý</b> của router nối trunk với switch, chia thành nhiều <b>subinterface</b>, mỗi cái một VLAN và làm gateway.<br><code>interface g0/0.10</code><br><code> encapsulation dot1Q 10</code><br><code> ip address 192.168.10.1 255.255.255.0</code>",
  example: "Một cầu thang duy nhất nối nhiều tầng – ai muốn sang tầng khác đều đi qua cầu thang đó.",
  trap: "Cổng switch nối router phải là <b>trunk</b>. Cổng vật lý của router cần <code>no shutdown</code>. Một link duy nhất dễ thành <b>nút cổ chai</b>.",
  interview: "Máy VLAN 10 không ping được máy VLAN 20 qua router-on-a-stick – bạn kiểm tra gì?",
  terms: ["router-on-a-stick", "inter-VLAN routing", "subinterface", "encapsulation dot1Q"]
},
{
  id: "k-mang-005", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "Inter-VLAN routing bằng Layer 3 switch (SVI) hoạt động thế nào?",
  def: "Tạo <b>SVI</b> (Switch Virtual Interface) cho mỗi VLAN và bật định tuyến:<br><code>ip routing</code><br><code>interface vlan 10</code><br><code> ip address 192.168.10.1 255.255.255.0</code><br>SVI làm default gateway cho máy trong VLAN đó.",
  example: "Thay vì dùng một cầu thang chung (router-on-a-stick), mỗi tầng có thang máy nội bộ siêu nhanh ngay trong tòa nhà.",
  trap: "Quên lệnh <code>ip routing</code> → SVI có IP nhưng không định tuyến. SVI chỉ <b>up</b> khi VLAN tồn tại và có ít nhất một cổng active trong VLAN đó.",
  interview: "So sánh router-on-a-stick và L3 switch: khi nào dùng cái nào?",
  terms: ["SVI", "Layer 3 switch", "ip routing", "inter-VLAN routing"]
},
{
  id: "k-mang-006", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "STP (Spanning Tree Protocol) dùng để làm gì?",
  def: "<b>STP</b> (IEEE 802.1D) <b>chống vòng lặp lớp 2</b> khi có đường dự phòng giữa các switch: bầu <b>root bridge</b> (Bridge ID nhỏ nhất = priority + MAC), rồi <b>block</b> các cổng dư; khi link chính hỏng thì mở lại.",
  example: "Như khóa bớt một số cửa thông giữa các phòng để không ai đi vòng vòng mãi, nhưng vẫn giữ chìa để mở khi cửa chính hỏng.",
  trap: "Không có STP → <b>broadcast storm</b>, bảng MAC dao động, mạng tê liệt. Priority mặc định 32768; nên chỉ định root bridge thủ công thay vì để switch cũ có MAC nhỏ tự làm root. RSTP (802.1w) hội tụ nhanh hơn.",
  interview: "Một user cắm nhầm hai đầu cáp vào hai cổng cùng switch làm mạng sập – vì sao? PortFast/BPDU Guard giúp gì?",
  terms: ["STP", "root bridge", "broadcast storm", "BPDU", "RSTP", "PortFast"]
},
{
  id: "k-mang-007", track: "mang", course: "CCNA", tier: 3, topic: "VLAN & Switching",
  front: "Switch học bảng địa chỉ MAC (MAC address table) thế nào?",
  def: "Switch đọc <b>MAC nguồn</b> của frame đến và ghi 'MAC này ở cổng này'. Khi chuyển tiếp, tra <b>MAC đích</b>: có trong bảng → gửi đúng cổng; chưa có hoặc là broadcast → <b>flood</b> ra mọi cổng (trừ cổng nhận).",
  example: "Bác bảo vệ mới: thấy ai đi ra từ phòng nào thì ghi sổ; thư đến người chưa có trong sổ thì gõ cửa tất cả các phòng.",
  trap: "Switch học từ MAC <b>nguồn</b>, chuyển tiếp theo MAC <b>đích</b> – hay nhầm ngược. Tấn công <b>MAC flooding</b> làm đầy bảng khiến switch flood như hub → nghe lén được. Lệnh xem: <code>show mac address-table</code>.",
  interview: "Port security trên switch giúp chống những tấn công nào?",
  terms: ["MAC address table", "CAM table", "flooding", "MAC flooding", "port security"]
},
{
  id: "k-mang-008", track: "mang", course: "CCNA", tier: 3, topic: "Routing",
  front: "Static route khác dynamic routing thế nào?",
  def: "<b>Static</b>: admin nhập tay từng tuyến (<code>ip route 10.2.0.0 255.255.0.0 192.168.1.2</code>) – đơn giản, ít tài nguyên, không tự thích ứng khi link hỏng. <b>Dynamic</b>: router tự trao đổi tuyến qua giao thức (OSPF, EIGRP, RIP, BGP) – tự cập nhật khi mạng thay đổi.",
  example: "Static như dán bản đồ đường đi cố định cho tài xế; dynamic như Google Maps tự đổi tuyến khi đường kẹt.",
  trap: "Static phù hợp mạng nhỏ hoặc stub network; mạng lớn dùng static sẽ khó quản lý. Static route có AD = <b>1</b> nên được ưu tiên hơn OSPF (110) cho cùng một mạng đích.",
  interview: "Khi nào bạn chọn static route thay vì OSPF?",
  terms: ["static route", "dynamic routing", "routing protocol", "ip route"]
},
{
  id: "k-mang-009", track: "mang", course: "CCNA", tier: 3, topic: "Routing",
  front: "Default route là gì? Cấu hình trên Cisco thế nào?",
  def: "<b>Default route</b> (0.0.0.0/0) là tuyến dùng khi không có tuyến nào cụ thể hơn khớp – thường trỏ ra Internet/ISP. Cisco: <code>ip route 0.0.0.0 0.0.0.0 &lt;next-hop&gt;</code>. Hiển thị là <code>S*</code> trong <code>show ip route</code>.",
  example: "Như câu 'không biết đi đâu thì cứ ra bưu điện trung tâm' – mọi thư không rõ hướng đều gửi về đó.",
  trap: "Router chọn tuyến theo <b>longest prefix match</b> – tuyến /24 cụ thể thắng default route /0. Trên máy tính, default route chính là <b>default gateway</b>.",
  interview: "Router có tuyến 10.0.0.0/8, 10.1.0.0/16 và 0.0.0.0/0 – gói tới 10.1.5.5 đi theo tuyến nào?",
  terms: ["default route", "gateway of last resort", "longest prefix match", "0.0.0.0/0"]
},
{
  id: "k-mang-010", track: "mang", course: "CCNA", tier: 3, topic: "Routing",
  front: "Administrative Distance (AD) là gì? Giá trị AD của connected, static, OSPF, RIP?",
  def: "<b>AD</b> là độ tin cậy của <b>nguồn</b> tuyến; khi nhiều nguồn cùng biết một mạng đích, router chọn AD <b>nhỏ nhất</b>. Connected <b>0</b>, Static <b>1</b>, eBGP 20, EIGRP 90, OSPF <b>110</b>, RIP <b>120</b>.",
  example: "Như nghe chỉ đường: tin bản thân đã đi (connected) nhất, rồi người nhà (static), rồi mới đến người lạ (OSPF, RIP).",
  trap: "AD dùng để so <b>giữa các giao thức khác nhau</b>; <b>metric</b> dùng để so các tuyến <b>trong cùng một giao thức</b> (OSPF dùng cost, RIP dùng hop count). Longest prefix match được xét trước cả AD.",
  interview: "Floating static route là gì (static route có AD cao hơn để làm dự phòng)?",
  terms: ["administrative distance", "metric", "floating static route", "cost", "hop count"]
},
{
  id: "k-mang-011", track: "mang", course: "CCNA", tier: 3, topic: "Routing",
  front: "OSPF là gì? Những đặc điểm cơ bản cần nhớ?",
  def: "<b>OSPF</b> là giao thức định tuyến động <b>link-state</b>: mỗi router biết toàn bộ bản đồ mạng (LSDB) và tính đường ngắn nhất bằng thuật toán <b>SPF (Dijkstra)</b>. Metric = <b>cost</b> (dựa trên bandwidth), AD = 110, chia <b>area</b>, mọi area phải nối với <b>area 0</b> (backbone).",
  example: "Mỗi tài xế có bản đồ đầy đủ cả thành phố và tự tính đường nhanh nhất, thay vì chỉ nghe hàng xóm mách đường như RIP.",
  trap: "OSPF là chuẩn mở (không độc quyền Cisco như EIGRP gốc). Cấu hình: <code>router ospf 1</code> / <code>network 192.168.1.0 0.0.0.255 area 0</code> – dùng <b>wildcard mask</b>, không phải subnet mask.",
  interview: "Link-state khác distance-vector thế nào?",
  terms: ["OSPF", "link-state", "SPF", "Dijkstra", "area 0", "cost", "LSDB"]
},
{
  id: "k-mang-012", track: "mang", course: "CCNA", tier: 2, topic: "Routing",
  front: "Hai router OSPF muốn thành neighbor cần khớp những gì?",
  def: "Phải khớp: <b>area ID</b>, <b>subnet/mask</b> trên link, <b>Hello và Dead timer</b> (mặc định 10s/40s trên Ethernet), <b>authentication</b> (nếu có); <b>Router ID</b> phải khác nhau. Kiểm tra: <code>show ip ospf neighbor</code>.",
  example: "Hai người muốn kết bạn phải nói cùng ngôn ngữ, ở cùng khu phố và hẹn chào nhau cùng nhịp.",
  trap: "Router ID chọn theo thứ tự: lệnh <code>router-id</code> → IP loopback cao nhất → IP interface active cao nhất. Neighbor kẹt ở trạng thái thấp thường do lệch timer/area/mask.",
  interview: "Hai router không lên neighbor OSPF – bạn kiểm tra theo trình tự nào?",
  terms: ["OSPF neighbor", "hello timer", "dead timer", "router ID", "adjacency"]
},
{
  id: "k-mang-013", track: "mang", course: "CCNA", tier: 3, topic: "ACL",
  front: "ACL standard khác extended thế nào?",
  def: "<b>Standard ACL</b> (số 1–99, 1300–1999): chỉ lọc theo <b>IP nguồn</b>. <b>Extended ACL</b> (số 100–199, 2000–2699): lọc theo <b>IP nguồn, IP đích, giao thức, port</b>. Có thể dùng named ACL.",
  example: "Standard như bảo vệ chỉ hỏi 'anh từ đâu đến?'; extended hỏi thêm 'đến gặp ai, làm việc gì?'.",
  trap: "Ví dụ extended: <code>access-list 101 deny tcp 192.168.10.0 0.0.0.255 host 10.0.0.5 eq 23</code>. ACL dùng <b>wildcard mask</b> (0.0.0.255), phải áp vào interface bằng <code>ip access-group 101 in|out</code>.",
  interview: "Viết ACL chặn mạng 192.168.20.0/24 truy cập web (80, 443) của server 10.0.0.10 nhưng vẫn cho ping.",
  terms: ["ACL", "standard ACL", "extended ACL", "wildcard mask", "ip access-group"]
},
{
  id: "k-mang-014", track: "mang", course: "CCNA", tier: 3, topic: "ACL",
  front: "Quy tắc đặt ACL: standard đặt ở đâu, extended đặt ở đâu? Vì sao?",
  def: "<b>Standard</b> đặt <b>gần đích</b> (vì chỉ lọc theo nguồn – đặt gần nguồn sẽ chặn luôn mọi đích khác). <b>Extended</b> đặt <b>gần nguồn</b> (lọc chính xác, loại bỏ lưu lượng không mong muốn sớm, đỡ tốn băng thông).",
  example: "Standard như chặn người tại cửa phòng cần bảo vệ; extended như chặn ngay tại nhà kẻ gây rối vì biết rõ hắn định đi đâu.",
  trap: "ACL xét <b>từ trên xuống</b>, khớp dòng đầu tiên thì dừng → rule cụ thể phải đặt <b>trước</b> rule chung. Mỗi interface/mỗi chiều/mỗi giao thức chỉ áp <b>một</b> ACL.",
  interview: "ACL có dòng 'permit any' ở trên dòng 'deny host 10.1.1.5' – điều gì xảy ra?",
  terms: ["ACL placement", "top-down", "first match", "inbound", "outbound"]
},
{
  id: "k-mang-015", track: "mang", course: "CCNA", tier: 3, topic: "ACL",
  front: "Implicit deny trong ACL/firewall là gì?",
  def: "Cuối mỗi ACL luôn có một dòng <b>ẩn</b> <code>deny any</code>: gói không khớp dòng nào sẽ <b>bị chặn</b>. Vì vậy ACL phải có ít nhất một dòng permit.",
  example: "Danh sách khách mời đám cưới: không có tên trong danh sách thì không được vào, dù không ai ghi 'cấm người lạ'.",
  trap: "ACL chỉ có toàn dòng deny → <b>chặn hết</b> mọi lưu lượng. Implicit deny không hiện trong <code>show access-lists</code> và không đếm hit – muốn log thì thêm <code>deny ip any any log</code> ở cuối.",
  interview: "Vì sao firewall tốt nên theo nguyên tắc 'default deny' (whitelist)?",
  terms: ["implicit deny", "default deny", "allowlist", "deny any"]
},
{
  id: "k-mang-016", track: "mang", course: "CCNA", tier: 3, topic: "NAT",
  front: "Static NAT, dynamic NAT và PAT khác nhau thế nào?",
  def: "<b>Static NAT</b>: 1 IP private ↔ 1 IP public cố định (dùng cho server cần truy cập từ ngoài). <b>Dynamic NAT</b>: lấy IP từ một pool public. <b>PAT</b> (NAT overload): <b>nhiều IP private dùng chung 1 IP public</b>, phân biệt bằng <b>port</b> – loại phổ biến nhất.",
  example: "PAT như cả công ty dùng chung một số tổng đài; cuộc gọi ra được đánh dấu số máy lẻ (port) để biết trả lời về ai.",
  trap: "Cisco PAT: <code>ip nat inside source list 1 interface g0/1 overload</code>; phải đánh dấu <code>ip nat inside</code>/<code>ip nat outside</code> trên interface. Kiểm tra: <code>show ip nat translations</code>.",
  interview: "Muốn web server nội bộ 192.168.1.10 được truy cập từ Internet thì dùng loại NAT nào (static NAT/port forwarding)?",
  terms: ["static NAT", "dynamic NAT", "PAT", "overload", "port forwarding", "inside/outside"]
},
{
  id: "k-mang-017", track: "mang", course: "CCNA", tier: 3, topic: "Dịch vụ mạng",
  front: "DHCP relay (ip helper-address) dùng khi nào?",
  def: "Khi <b>DHCP server nằm khác subnet</b> với client. DHCP Discover là broadcast – router không chuyển broadcast – nên cấu hình <code>ip helper-address &lt;IP DHCP server&gt;</code> trên <b>interface/SVI làm gateway của client</b> để router chuyển thành unicast tới server.",
  example: "Như lễ tân mỗi tầng nhận lời 'ai cấp phòng cho tôi?' rồi gọi điện riêng xuống quầy chính.",
  trap: "Đặt helper-address trên interface <b>phía client</b>, không phải phía server. Server phải có scope/pool cho subnet của client, nếu không client vẫn nhận 169.254.x.x.",
  interview: "Máy trong VLAN 20 không nhận IP từ DHCP server ở VLAN 99 – bạn kiểm tra gì?",
  terms: ["DHCP relay", "ip helper-address", "broadcast", "DHCP scope"]
},
{
  id: "k-mang-018", track: "mang", course: "CCNA", tier: 3, topic: "Dịch vụ mạng",
  front: "Bản ghi DNS A, AAAA, CNAME dùng để làm gì?",
  def: "<b>A</b>: tên miền → <b>IPv4</b>. <b>AAAA</b>: tên miền → <b>IPv6</b>. <b>CNAME</b>: <b>bí danh</b> trỏ một tên tới một tên khác (vd www.example.com → example.com).",
  example: "A như danh bạ ghi 'Mẹ → 098xxx'; CNAME như ghi 'Mẹ yêu → xem mục Mẹ'.",
  trap: "CNAME trỏ tới <b>tên miền</b>, không trỏ trực tiếp tới IP. AAAA (4 chữ A) vì IPv6 dài gấp 4 lần IPv4 (128 so với 32 bit).",
  interview: "Website đổi sang server mới nhưng một số người vẫn vào server cũ – liên quan đến gì (TTL, cache)?",
  terms: ["A record", "AAAA record", "CNAME", "TTL", "DNS zone"]
},
{
  id: "k-mang-019", track: "mang", course: "CCNA", tier: 3, topic: "Dịch vụ mạng",
  front: "Bản ghi DNS MX, PTR, NS dùng để làm gì?",
  def: "<b>MX</b>: chỉ định <b>mail server</b> nhận email cho tên miền (có độ ưu tiên). <b>PTR</b>: tra ngược <b>IP → tên miền</b> (reverse DNS). <b>NS</b>: chỉ định name server có thẩm quyền của tên miền. (<b>TXT</b> chứa SPF/DKIM/DMARC.)",
  example: "MX như biển 'Nhận thư tại phòng bảo vệ'; PTR như tra số điện thoại để biết là của ai.",
  trap: "Mail server thiếu PTR khớp thường bị đánh dấu spam. PTR nằm trong zone đặc biệt <code>in-addr.arpa</code>.",
  interview: "Để chống giả mạo email cho tên miền công ty, bạn thêm những bản ghi DNS nào?",
  terms: ["MX record", "PTR record", "NS record", "TXT record", "reverse DNS"]
},
{
  id: "k-mang-020", track: "mang", course: "CCNA", tier: 3, topic: "Subnetting",
  front: "Mạng /26 có subnet mask là gì, bao nhiêu địa chỉ và bao nhiêu host dùng được?",
  def: "/26 = <b>255.255.255.192</b>. Phần host 32 − 26 = 6 bit → 2^6 = <b>64 địa chỉ</b>, <b>62 host</b> dùng được. Block size (bước nhảy) = 64 → các subnet: .0, .64, .128, .192.",
  example: "Chia mảnh đất 256 m² thành 4 lô 64 m², mỗi lô bỏ 2 m² làm cổng trước (network) và cổng sau (broadcast).",
  trap: "Bảng nhớ nhanh: /24=254, /25=126, /26=62, /27=30, /28=14, /29=6, /30=2 host. Block size = 256 − octet cuối của mask.",
  interview: "/27 có mask là gì và bao nhiêu host?",
  terms: ["subnetting", "block size", "/26", "255.255.255.192"]
},
{
  id: "k-mang-021", track: "mang", course: "CCNA", tier: 3, topic: "Subnetting",
  front: "IP 192.168.10.77/26 thuộc mạng nào? Broadcast và dải host là gì?",
  def: "Block size 64 → các mạng .0, .64, .128, .192. 77 nằm trong khoảng 64–127 → <b>Network 192.168.10.64</b>, <b>Broadcast 192.168.10.127</b>, host dùng được <b>.65 – .126</b>, gateway thường là .65.",
  example: "Số nhà 77 nằm trong dãy nhà từ 64 đến 127 – đầu dãy là biển tên đường (network), cuối dãy là loa phường (broadcast).",
  trap: "Network = bội số của block size ≤ IP; broadcast = network tiếp theo − 1. Đừng lấy .77 làm network.",
  interview: "Hai máy 192.168.10.60/26 và 192.168.10.70/26 có cùng mạng không? Ping trực tiếp được không?",
  terms: ["network address", "broadcast address", "host range", "block size"]
},
{
  id: "k-mang-022", track: "mang", course: "CCNA", tier: 3, topic: "Subnetting",
  front: "IP 172.16.5.100/27 thuộc mạng nào? Broadcast là gì?",
  def: "/27 = 255.255.255.224, block size 32 → các mạng .0, .32, .64, .96, .128… 100 nằm trong 96–127 → <b>Network 172.16.5.96</b>, <b>Broadcast 172.16.5.127</b>, host <b>.97 – .126</b> (30 host).",
  example: "Đếm theo bước 32: 0, 32, 64, 96, 128 – số 100 rơi vào ô bắt đầu từ 96.",
  trap: "172.16.5.100 là IP <b>private</b> (dải 172.16–31). Chỉ octet có mask khác 255 và 0 mới cần tính – ở đây là octet thứ 4.",
  interview: "Tính nhanh: 10.1.1.200/29 có network và broadcast là gì? (Đáp: 10.1.1.200 và 10.1.1.207.)",
  terms: ["/27", "255.255.255.224", "subnet calculation"]
},
{
  id: "k-mang-023", track: "mang", course: "CCNA", tier: 3, topic: "Subnetting",
  front: "Một phòng ban cần 50 máy – chọn prefix nhỏ nhất nào? Còn link nối 2 router thì sao?",
  def: "50 host → cần 2^h − 2 ≥ 50 → h = 6 (62 host) → <b>/26</b> (255.255.255.192). Link point-to-point giữa 2 router chỉ cần 2 IP → <b>/30</b> (255.255.255.252, 2 host).",
  example: "Thuê phòng họp cho 50 người: phòng 30 chỗ không đủ, chọn phòng 62 chỗ là vừa, không cần phòng 254 chỗ cho phí.",
  trap: "/27 chỉ có 30 host – không đủ 50. Nhớ trừ 2 (network + broadcast). Nên chừa dư cho tăng trưởng nếu đề bài cho phép.",
  interview: "Chia 192.168.1.0/24 cho 3 phòng: 100, 50 và 20 máy (VLSM) – bạn chia thế nào?",
  terms: ["VLSM", "/30", "point-to-point", "host bits"]
},
{
  id: "k-mang-024", track: "mang", course: "CCNA", tier: 2, topic: "Subnetting",
  front: "Mask 255.255.255.240 là prefix bao nhiêu? Wildcard mask tương ứng?",
  def: "240 = 11110000 → 24 + 4 = <b>/28</b>, block size 16, <b>14 host</b>. Wildcard = 255.255.255.255 − mask = <b>0.0.0.15</b>.",
  example: "Wildcard như mặt trái của mask: chỗ mask là 1 (cố định) thì wildcard là 0 (phải khớp).",
  trap: "ACL và lệnh <code>network</code> của OSPF dùng <b>wildcard</b>, không phải subnet mask. Ví dụ /24 → 0.0.0.255, /30 → 0.0.0.3.",
  interview: "Viết wildcard cho mạng 10.10.0.0/16.",
  terms: ["wildcard mask", "/28", "255.255.255.240"]
},
{
  id: "k-mang-025", track: "mang", course: "EXTRA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "ping và tracert/traceroute dùng để làm gì khi xử lý sự cố mạng?",
  def: "<code>ping</code>: kiểm tra đến được đích không và độ trễ (ICMP echo). <code>tracert</code> (Windows) / <code>traceroute</code> (Linux): liệt kê <b>từng chặng router</b> trên đường tới đích, dựa trên TTL tăng dần – xem gói tắc ở chặng nào.",
  example: "Ping như gọi điện xem bạn có nghe máy không; tracert như hỏi từng trạm thu phí xem xe đã qua trạm nào.",
  trap: "Trình tự kinh điển: ping 127.0.0.1 → ping IP của mình → ping gateway → ping IP ngoài (8.8.8.8) → ping tên miền. Ping IP được mà ping tên miền không được → lỗi <b>DNS</b>.",
  interview: "User báo 'không vào được Internet' – bạn kiểm tra theo các bước nào?",
  terms: ["ping", "tracert", "traceroute", "TTL", "hop", "troubleshooting"]
},
{
  id: "k-mang-026", track: "mang", course: "EXTRA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "Lệnh nslookup (hoặc dig) dùng để làm gì?",
  def: "Truy vấn DNS để kiểm tra phân giải tên miền: <code>nslookup example.com</code> (bản ghi A), <code>nslookup -type=mx example.com</code>, <code>nslookup example.com 8.8.8.8</code> (hỏi DNS server cụ thể). Linux thường dùng <code>dig</code>.",
  example: "Như tự tra danh bạ bằng tay để biết danh bạ có ghi đúng số không.",
  trap: "Nếu hỏi 8.8.8.8 ra kết quả mà hỏi DNS nội bộ không ra → lỗi ở <b>DNS server nội bộ</b>. Xóa cache DNS trên Windows: <code>ipconfig /flushdns</code>.",
  interview: "Làm sao kiểm tra một domain đáng ngờ đang trỏ về IP nào?",
  terms: ["nslookup", "dig", "DNS query", "flushdns"]
},
{
  id: "k-mang-027", track: "mang", course: "EXTRA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "Xem cấu hình IP trên Windows và Linux bằng lệnh gì?",
  def: "Windows: <code>ipconfig</code>, <code>ipconfig /all</code> (thêm MAC, DNS, DHCP), <code>ipconfig /release</code> + <code>/renew</code> (xin lại IP). Linux: <code>ip a</code> (ip addr), <code>ip route</code> (xem gateway), lệnh cũ <code>ifconfig</code>.",
  example: "Như xem lại giấy tờ tùy thân của chính máy: địa chỉ (IP), CCCD (MAC), người quản lý khu vực (gateway), danh bạ dùng (DNS).",
  trap: "<code>ifconfig</code> đã cũ, nhiều distro mới không cài sẵn – dùng <code>ip a</code>. Xem bảng ARP: <code>arp -a</code> (Windows) / <code>ip neigh</code> (Linux).",
  interview: "Lệnh nào cho biết máy đang dùng DNS server nào và nhận IP từ DHCP server nào?",
  terms: ["ipconfig", "ipconfig /all", "ip a", "ifconfig", "ip route", "arp -a"]
},
{
  id: "k-mang-028", track: "mang", course: "EXTRA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "netstat và ss dùng để làm gì? Ví dụ lệnh hữu ích?",
  def: "Xem các <b>kết nối mạng và port đang lắng nghe</b>. Windows: <code>netstat -ano</code> (kèm PID). Linux: <code>ss -tulpn</code> (TCP, UDP, listening, process, không phân giải tên) hoặc <code>netstat -tulpn</code>.",
  example: "Như xem danh sách tất cả cuộc điện thoại đang diễn ra và số máy lẻ nào đang chờ cuộc gọi đến.",
  trap: "Trạng thái <code>LISTENING</code> = đang mở chờ kết nối; <code>ESTABLISHED</code> = đang kết nối. Kết nối ESTABLISHED tới IP lạ ở port bất thường (vd 4444) → nghi C2/reverse shell; tra PID bằng <code>tasklist</code>.",
  interview: "Làm sao biết process nào đang chiếm port 8080 trên Windows và Linux?",
  terms: ["netstat", "ss", "LISTENING", "ESTABLISHED", "PID"]
},
{
  id: "k-mang-029", track: "mang", course: "CCNA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "Lệnh <code>show ip interface brief</code> và <code>show vlan brief</code> cho biết gì?",
  def: "<code>show ip interface brief</code>: tóm tắt mọi interface – IP, <b>Status</b> (lớp 1) và <b>Protocol</b> (lớp 2). <code>show vlan brief</code>: danh sách VLAN và các <b>access port</b> thuộc mỗi VLAN.",
  example: "Như bảng điểm danh: mỗi phòng (interface) có người không, đèn có sáng không; và mỗi nhóm (VLAN) gồm những ai.",
  trap: "<b>administratively down</b> = bị <code>shutdown</code> (cần <code>no shutdown</code>); <b>down/down</b> = lỗi cáp/đầu kia; <b>up/down</b> = lỗi lớp 2 (encapsulation, clock rate). Cổng <b>trunk không xuất hiện</b> trong show vlan brief – dùng <code>show interfaces trunk</code>.",
  interview: "Interface hiển thị 'up / down' – nguyên nhân thường gặp là gì?",
  terms: ["show ip interface brief", "show vlan brief", "show interfaces trunk", "administratively down"]
},
{
  id: "k-mang-030", track: "mang", course: "CCNA", tier: 3, topic: "Lệnh xử lý sự cố",
  front: "Trong <code>show ip route</code>, các mã C, L, S, S*, O nghĩa là gì?",
  def: "<b>C</b>: mạng kết nối trực tiếp (connected). <b>L</b>: local – IP của chính interface (/32). <b>S</b>: static route. <b>S*</b>: static default route (candidate default). <b>O</b>: học từ OSPF. (D = EIGRP, R = RIP.)",
  example: "Như sổ tay đường đi ghi chú nguồn: tự biết (C), người nhà dặn (S), bản đồ chung OSPF chia sẻ (O).",
  trap: "Số trong ngoặc <code>[110/20]</code> = <b>[AD/metric]</b>. Không có tuyến tới mạng đích và không có default route → gói bị drop.",
  interview: "Đọc dòng <code>O 10.2.0.0/16 [110/2] via 192.168.1.2, Gig0/1</code> – giải thích từng phần.",
  terms: ["show ip route", "routing table", "connected", "static", "OSPF", "AD/metric"]
},
{
  id: "k-mang-031", track: "mang", course: "EXTRA", tier: 3, topic: "Active Directory",
  front: "Active Directory là gì? Domain, Domain Controller, OU là gì?",
  def: "<b>Active Directory (AD DS)</b>: dịch vụ thư mục của Microsoft quản lý tập trung user, máy tính, nhóm. <b>Domain</b>: ranh giới quản trị chung (vd congty.local). <b>Domain Controller (DC)</b>: server chạy AD, xác thực đăng nhập. <b>OU</b>: thư mục tổ chức đối tượng để phân quyền và áp GPO.",
  example: "AD như phòng nhân sự của tập đoàn: domain là tập đoàn, DC là phòng nhân sự cấp thẻ, OU là các phòng ban trong sơ đồ tổ chức.",
  trap: "OU <b>khác</b> group: OU để <b>tổ chức và áp GPO</b>; security group để <b>cấp quyền</b> truy cập tài nguyên. AD phụ thuộc chặt vào <b>DNS</b> – DNS sai thì join domain/đăng nhập lỗi.",
  interview: "Vì sao DC là mục tiêu số 1 của kẻ tấn công trong mạng doanh nghiệp?",
  terms: ["Active Directory", "domain", "domain controller", "OU", "security group", "LDAP"]
},
{
  id: "k-mang-032", track: "mang", course: "EXTRA", tier: 3, topic: "Active Directory",
  front: "GPO (Group Policy Object) là gì? Cho ví dụ ứng dụng.",
  def: "<b>GPO</b> là tập chính sách cấu hình được áp tập trung cho user/máy tính qua site, domain hoặc OU. Ví dụ: chính sách mật khẩu, khóa màn hình sau 10 phút, chặn USB, map ổ mạng, bật audit log.",
  example: "Như nội quy công ty ban hành một lần, áp cho cả phòng ban thay vì dặn từng người.",
  trap: "Thứ tự áp: <b>Local → Site → Domain → OU</b> (LSDOU) – GPO áp sau ghi đè GPO trước. Cập nhật ngay: <code>gpupdate /force</code>; kiểm tra: <code>gpresult /r</code>.",
  interview: "Bạn sẽ dùng GPO thế nào để tăng cường bảo mật cho máy trạm?",
  terms: ["GPO", "Group Policy", "LSDOU", "gpupdate", "gpresult"]
},
{
  id: "k-mang-033", track: "mang", course: "EXTRA", tier: 3, topic: "Active Directory",
  front: "Kerberos khác NTLM thế nào (mức cơ bản)?",
  def: "<b>Kerberos</b>: giao thức xác thực mặc định của AD, dựa trên <b>ticket</b> (TGT, service ticket) do KDC trên DC cấp, port <b>88</b>, có xác thực hai chiều. <b>NTLM</b>: cơ chế cũ <b>challenge–response</b> dựa trên hash mật khẩu, dùng khi Kerberos không khả dụng (vd truy cập bằng IP, máy ngoài domain).",
  example: "Kerberos như vào công viên: mua vé tổng (TGT) ở quầy chính rồi đổi vé từng trò chơi; NTLM như mỗi trò chơi đều bắt bạn chứng minh lại mật khẩu.",
  trap: "Kerberos yêu cầu <b>đồng bộ thời gian</b> (lệch mặc định tối đa 5 phút). NTLM dễ bị <b>pass-the-hash</b> và relay; Kerberos có các tấn công như Kerberoasting, golden ticket.",
  interview: "Vì sao lệch giờ giữa máy trạm và DC làm user không đăng nhập được?",
  terms: ["Kerberos", "NTLM", "TGT", "KDC", "pass-the-hash", "Kerberoasting"]
},
{
  id: "k-mang-034", track: "mang", course: "CCNA", tier: 3, topic: "Cisco IOS",
  front: "Các chế độ (mode) của Cisco IOS là gì? Chuyển giữa chúng bằng lệnh nào?",
  def: "<b>User EXEC</b> <code>Router&gt;</code> → <code>enable</code> → <b>Privileged EXEC</b> <code>Router#</code> → <code>configure terminal</code> → <b>Global config</b> <code>Router(config)#</code> → <code>interface g0/0</code> → <b>Interface config</b> <code>Router(config-if)#</code>. Lùi: <code>exit</code>; về thẳng #: <code>end</code>.",
  example: "Như các tầng quyền trong tòa nhà: sảnh (chỉ xem), văn phòng quản lý (xem tất cả), phòng kỹ thuật (sửa cấu hình), từng tủ điện (interface).",
  trap: "Lệnh <code>show</code> chạy ở chế độ #; đang ở config mode thì thêm <code>do</code>: <code>do show ip int brief</code>. <code>?</code> để xem trợ giúp, Tab để tự hoàn thành lệnh.",
  interview: "Dấu nhắc <code>Switch(config-line)#</code> nghĩa là đang ở chế độ nào?",
  terms: ["User EXEC", "Privileged EXEC", "global configuration", "interface configuration", "enable", "configure terminal"]
},
{
  id: "k-mang-035", track: "mang", course: "CCNA", tier: 3, topic: "Cisco IOS",
  front: "Các lệnh cấu hình cơ bản đầu tiên trên một switch/router Cisco mới là gì?",
  def: "<code>hostname SW1</code>; <code>enable secret &lt;pass&gt;</code>; <code>service password-encryption</code>; <code>banner motd #...#</code>; <code>line console 0</code> + <code>password</code> + <code>login</code>; đặt IP interface + <code>no shutdown</code>; lưu: <code>copy running-config startup-config</code> (hoặc <code>write memory</code>).",
  example: "Như nhận căn hộ mới: gắn biển số nhà (hostname), đổi khóa (secret), dán nội quy (banner), rồi lưu hồ sơ (save).",
  trap: "<b>running-config</b> nằm trong RAM – mất khi khởi động lại nếu chưa lưu vào <b>startup-config</b> (NVRAM). <code>enable secret</code> được hash mạnh hơn <code>enable password</code>; nếu cấu hình cả hai thì secret được dùng.",
  interview: "Sửa cấu hình xong, router khởi động lại thì mất hết – nguyên nhân là gì?",
  terms: ["hostname", "enable secret", "running-config", "startup-config", "NVRAM", "no shutdown"]
},
{
  id: "k-mang-036", track: "mang", course: "CCNA", tier: 2, topic: "Cisco IOS",
  front: "Cấu hình SSH để quản trị từ xa thiết bị Cisco gồm những bước nào?",
  def: "<code>ip domain-name congty.local</code> → <code>crypto key generate rsa</code> (modulus ≥ 1024, nên 2048) → <code>username admin secret &lt;pass&gt;</code> → <code>ip ssh version 2</code> → <code>line vty 0 4</code> + <code>login local</code> + <code>transport input ssh</code>.",
  example: "Như lắp cửa sau có khóa vân tay (SSH) thay cho cửa gỗ chốt bằng que (Telnet) để kỹ thuật viên vào từ xa.",
  trap: "Cần có <b>hostname khác mặc định</b> và domain-name thì mới tạo được khóa RSA. <code>transport input ssh</code> để <b>tắt Telnet</b>. Switch lớp 2 cần IP trên SVI quản lý + <code>ip default-gateway</code>.",
  interview: "Vì sao phải tắt Telnet trên thiết bị mạng? Kiểm tra SSH đang hoạt động bằng lệnh nào (<code>show ip ssh</code>)?",
  terms: ["SSH", "line vty", "transport input ssh", "crypto key generate rsa", "login local"]
}
];
