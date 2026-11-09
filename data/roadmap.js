window.DATA = window.DATA || {};
// Lộ trình 6–8 tuần. type: review | english | lab | writeup | extra
// link: đường dẫn nội bộ (hash) – để trống nếu không có.
DATA.roadmap = [
  {
    week: 1,
    title: "Nền tảng mạng",
    focus: "Khóa 3 · TCP/IP, OSI, IP/MAC, subnet, giao thức, port",
    tasks: [
      { id: "r1-1", type: "review", text: "Ôn thẻ chủ đề <b>Mô hình mạng, Giao thức & Port</b> (mỗi ngày ~20 thẻ)", link: "#/review" },
      { id: "r1-2", type: "review", text: "Làm hết các câu trong <b>Điểm yếu của tôi</b> thuộc Khóa 3", link: "#/weak" },
      { id: "r1-3", type: "english", text: "Học ~10 từ/ngày, đọc 3 bài log cấp 1", link: "#/english" },
      { id: "r1-4", type: "lab", text: "SETUP-1 · Chuẩn bị máy & VMware", link: "#/lab/SETUP-1" },
      { id: "r1-5", type: "lab", text: "SETUP-2 · Tạo VM Ubuntu Server", link: "#/lab/SETUP-2" },
      { id: "r1-6", type: "lab", text: "N1 · Dựng pfSense + 3 phân đoạn mạng + NAT", link: "#/lab/N1" },
      { id: "r1-7", type: "lab", text: "N2 · Viết luật firewall giữa các phân đoạn", link: "#/lab/N2" },
      { id: "r1-8", type: "lab", text: "S8 · Phân tích lỗi DNS bằng tcpdump", link: "#/lab/S8" },
      { id: "r1-9", type: "lab", text: "PT-1 · Làm quen Cisco Packet Tracer", link: "#/lab/PT-1" },
      { id: "r1-10", type: "writeup", text: "Viết writeup: sơ đồ mạng lab + bảng IP + mini-report S8" }
    ]
  },
  {
    week: 2,
    title: "Linux & Windows/Active Directory",
    focus: "Khóa 4 · Linux, phân quyền, SQL · AD cơ bản",
    tasks: [
      { id: "r2-1", type: "review", text: "Ôn thẻ chủ đề <b>Linux, SQL, Active Directory</b>", link: "#/review" },
      { id: "r2-2", type: "review", text: "Làm các câu <b>Điểm yếu</b> thuộc Khóa 4", link: "#/weak" },
      { id: "r2-3", type: "english", text: "Từ vựng nhóm <b>linux / windows</b>, đọc log Windows Event", link: "#/english" },
      { id: "r2-4", type: "lab", text: "N3 · Dựng Windows Server AD, join máy client (hướng dẫn ở giai đoạn 2)" },
      { id: "r2-5", type: "lab", text: "N4 · Cấu hình DNS + DHCP" },
      { id: "r2-6", type: "lab", text: "N5 · GPO: chính sách mật khẩu, khóa tài khoản" },
      { id: "r2-7", type: "writeup", text: "Tài liệu cấu hình AD/GPO + ảnh chụp" }
    ]
  },
  {
    week: 3,
    title: "SIEM",
    focus: "Khóa 2, 6 · SIEM, log, playbook, NIST CSF",
    tasks: [
      { id: "r3-1", type: "review", text: "Ôn thẻ chủ đề <b>SIEM, log, IR</b>", link: "#/review" },
      { id: "r3-2", type: "english", text: "Từ vựng nhóm <b>soc</b>, đọc log firewall & Suricata", link: "#/english" },
      { id: "r3-3", type: "lab", text: "Cài Wazuh all-in-one" },
      { id: "r3-4", type: "lab", text: "Gắn agent: Windows (+Sysmon), AD, Ubuntu; đẩy log pfSense" },
      { id: "r3-5", type: "writeup", text: "Ảnh dashboard + danh sách agent" }
    ]
  },
  {
    week: 4,
    title: "Phát hiện mối đe dọa",
    focus: "Khóa 5, 6 · tấn công, malware, IoC, Suricata",
    tasks: [
      { id: "r4-1", type: "review", text: "Ôn thẻ chủ đề <b>Tấn công, IoC, Windows Event ID</b>", link: "#/review" },
      { id: "r4-2", type: "lab", text: "Bật Kali, làm S1–S7" },
      { id: "r4-3", type: "lab", text: "Cài Suricata, viết 1 rule riêng" },
      { id: "r4-4", type: "writeup", text: "≥ 3 phiếu phân tích sự kiện" }
    ]
  },
  {
    week: 5,
    title: "Ứng phó sự cố & dịch vụ mạng",
    focus: "Khóa 6, 7 · vòng đời IR, chain of custody, Python",
    tasks: [
      { id: "r5-1", type: "review", text: "Ôn thẻ chủ đề <b>Vòng đời IR, Python</b>", link: "#/review" },
      { id: "r5-2", type: "lab", text: "N6 · VPN trên pfSense" },
      { id: "r5-3", type: "lab", text: "N7 · Xử lý sự cố mạng có chủ đích" },
      { id: "r5-4", type: "lab", text: "Script Python lọc log brute force" },
      { id: "r5-5", type: "writeup", text: "1 báo cáo sự cố đầy đủ (timeline, bằng chứng, khắc phục)" }
    ]
  },
  {
    week: 6,
    title: "Portfolio & phỏng vấn",
    focus: "Ôn tổng hợp tầng ⭐⭐⭐ + điểm yếu",
    tasks: [
      { id: "r6-1", type: "review", text: "Ôn lại toàn bộ thẻ còn yếu", link: "#/review" },
      { id: "r6-2", type: "lab", text: "N8 · Packet Tracer: VLAN + trunk, inter-VLAN, OSPF, ACL" },
      { id: "r6-3", type: "writeup", text: "Hoàn thiện writeup, đưa lên GitHub" },
      { id: "r6-4", type: "extra", text: "Viết 2 bản CV: SOC 1 & Quản trị mạng" },
      { id: "r6-5", type: "extra", text: "≥ 2 buổi phỏng vấn thử" }
    ]
  }
];
