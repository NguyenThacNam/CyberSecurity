window.DATA = window.DATA || {};
DATA.labs = [

  /* ============================== SETUP-1 ============================== */
  {
    id: "SETUP-1",
    track: "chung",
    week: 1,
    title: "Chuẩn bị máy host & hypervisor, quy hoạch mạng lab",
    goal: "Kiểm tra máy Windows 11 đủ điều kiện chạy máy ảo, cài <b>VMware Workstation Pro</b>, tạo sẵn 3 phân đoạn mạng host-only (Server / Client / Attacker) và bảng IP cho cả lab.",
    time: "60–90 phút",
    prereq: [],
    concepts: ["Virtualization (VT-x / AMD-V)", "Hypervisor type 2", "Hyper-V / VBS", "NAT vs Host-only", "Network segment", "IP plan", "Snapshot"],
    steps: [
      {
        title: "Kiểm tra CPU đã bật ảo hóa",
        text: "Mở <b>Task Manager</b> (Ctrl+Shift+Esc) → tab <b>Performance</b> → <b>CPU</b>. Nhìn dòng <b>Virtualization</b> ở góc dưới bên phải: phải là <b>Enabled</b>.<br>Nếu là <b>Disabled</b>: khởi động lại, vào BIOS/UEFI (thường bấm Del hoặc F2), bật <b>Intel Virtualization Technology (VT-x)</b> với CPU Intel hoặc <b>SVM Mode</b> với CPU AMD, rồi Save & Exit.",
        tip: "Tên menu BIOS khác nhau theo hãng mainboard (ASUS, MSI, Gigabyte…). Nếu không tìm thấy, tra Google: tên mainboard + \"enable virtualization\"."
      },
      {
        title: "Kiểm tra Hyper-V / WSL2 / Memory Integrity (VBS)",
        text: "Chạy <code>msinfo32</code> → mục <b>System Summary</b>, xem dòng <b>Virtualization-based security</b> (Running / Not enabled). Xem thêm: <b>Windows Security → Device security → Core isolation → Memory integrity</b>.<br>Khi Hyper-V, WSL2 hoặc VBS đang chạy, Windows giữ quyền hypervisor; VMware Workstation bản mới vẫn chạy được (dùng <i>Windows Hypervisor Platform</i>) nhưng có thể <b>chậm hơn</b> và vài tính năng bị hạn chế.<br>Khuyến nghị: cứ để nguyên, cài thử. Chỉ khi VM quá chậm mới cân nhắc tắt Memory Integrity (đánh đổi một phần bảo mật của máy host) – ghi lại để bật lại sau.",
        code: "msinfo32\n# Kiểm tra nhanh trạng thái Hyper-V (PowerShell chạy Administrator):\nGet-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All",
        tip: "Không tắt Hyper-V/VBS chỉ vì một bài hướng dẫn trên mạng bảo vậy. Đây là thay đổi bảo mật của máy thật – quyết định có ý thức."
      },
      {
        title: "Kiểm tra dung lượng ổ đĩa & chọn thư mục chứa VM",
        text: "Cả lab khi đủ máy cần khoảng <b>~220 GB</b> (tuần 1 chỉ cần ~40 GB: pfSense 16 GB + Ubuntu 20 GB + bản clone). Ưu tiên ổ <b>SSD</b>.<br>Tạo thư mục riêng, ví dụ <code>D:\\VMs</code>. <b>Không</b> đặt VM trong thư mục Google Drive (<code>G:\\My Drive</code>) – đồng bộ file ổ đĩa ảo hàng chục GB sẽ làm hỏng VM và nghẽn mạng.",
        tip: "Mở File Explorer → This PC để xem dung lượng trống. Nên chừa thêm ~20% cho snapshot."
      },
      {
        title: "Tải VMware Workstation Pro (miễn phí)",
        text: "VMware Workstation Pro hiện <b>miễn phí</b> cho cá nhân, tải qua cổng hỗ trợ của <b>Broadcom</b>:<br>1) Vào <code>support.broadcom.com</code> → <b>Register</b> tạo tài khoản (email + xác minh).<br>2) Đăng nhập → <b>My Downloads</b> → tìm <b>VMware Workstation Pro</b> → chọn bản mới nhất cho <b>Windows</b>.<br>3) Đồng ý điều khoản; có thể phải điền địa chỉ (trade compliance) rồi mới bấm tải được.",
        tip: "Giao diện trang Broadcom thay đổi khá thường xuyên – nếu tên menu khác, tìm ô Search và gõ \"Workstation Pro\". Chỉ tải từ trang chính thức của Broadcom, không tải bản crack/bản trên web lạ."
      },
      {
        title: "Cài VMware Workstation Pro",
        text: "Chạy file cài đặt (Run as administrator), để mặc định. Có thể bỏ chọn <i>Customer Experience Improvement Program</i>. Nếu trình cài hỏi về <b>Enhanced Keyboard Driver</b> thì tùy chọn (không bắt buộc). Khởi động lại máy nếu được yêu cầu.<br>Lần đầu mở, nếu được hỏi license thì chọn dùng cho mục đích cá nhân (personal use) – bản mới có thể không hỏi gì cả.",
        tip: "Sau khi cài: Edit → Preferences → Workspace → đặt <b>Default location for virtual machines</b> = <code>D:\\VMs</code>."
      },
      {
        title: "(Phương án thay thế) VirtualBox",
        text: "Nếu không cài được VMware, có thể dùng <b>Oracle VirtualBox</b> (miễn phí, tải ở virtualbox.org). Khái niệm tương đương: <b>NAT Network</b> ≈ VMnet8, <b>Internal Network</b> hoặc <b>Host-only</b> (tắt DHCP) ≈ VMnet2/3/4. Các bước trong guide này viết theo VMware nên tên menu sẽ khác – nhớ giữ nguyên <b>logic</b>: 1 mạng NAT ra Internet + 3 mạng cô lập, không DHCP của hypervisor."
      },
      {
        title: "Quy hoạch mạng lab & bảng IP",
        text: "Lab dùng 1 mạng NAT làm <b>WAN</b> và 3 mạng <b>host-only</b> làm 3 phân đoạn cô lập. pfSense (bài N1) sẽ là router/firewall nối 4 mạng này và cấp DHCP cho 3 phân đoạn. Chép bảng dưới vào sổ/README – đây là <b>tài liệu mạng đầu tiên</b> của portfolio.",
        code: "PHÂN ĐOẠN     | VMnet  | Subnet           | Gateway (pfSense) | DHCP pool (pfSense)   | IP tĩnh\n--------------+--------+------------------+-------------------+-----------------------+------------------------------\nWAN           | VMnet8 | 192.168.x.0/24 * | 192.168.x.2 *     | DHCP của VMware NAT   | pfSense WAN = DHCP\nSERVER (LAN)  | VMnet2 | 10.10.10.0/24    | 10.10.10.1        | 10.10.10.100-199      | ubuntu-srv = 10.10.10.10\nCLIENT        | VMnet3 | 10.10.20.0/24    | 10.10.20.1        | 10.10.20.100-199      | (tuần 2: Windows client)\nATTACKER      | VMnet4 | 10.10.99.0/24    | 10.10.99.1        | 10.10.99.100-199      | (tuần 4: Kali)\nHost (tạm)    | VMnet2 | host adapter     | không gateway     | -                     | 10.10.10.250 (chỉ để vào GUI)\n\n* x = số VMware tự chọn, xem trong Virtual Network Editor (bước sau)",
        tip: "Chọn 10.10.x.x để không trùng với mạng nhà (thường 192.168.0.x / 192.168.1.x). Trùng subnet là lỗi định tuyến kinh điển."
      },
      {
        title: "Tạo VMnet2 / VMnet3 / VMnet4 (host-only, TẮT DHCP)",
        text: "Trong VMware: <b>Edit → Virtual Network Editor</b> → bấm <b>Change Settings</b> (cần quyền admin).<br>Bấm <b>Add Network…</b> → chọn <b>VMnet2</b> → OK. Chọn VMnet2 trong danh sách rồi đặt:<br>• <b>Host-only</b><br>• BỎ chọn <b>Connect a host virtual adapter to this network</b> (host không cắm vào mạng này → cô lập)<br>• BỎ chọn <b>Use local DHCP service to distribute IP address to VMs</b> (pfSense sẽ cấp DHCP)<br>• <b>Subnet IP</b> = <code>10.10.10.0</code>, <b>Subnet mask</b> = <code>255.255.255.0</code><br>Bấm <b>Apply</b>. Lặp lại cho <b>VMnet3</b> (10.10.20.0) và <b>VMnet4</b> (10.10.99.0).",
        tip: "Nếu để DHCP của VMware bật trên các mạng này, sẽ có 2 DHCP server cùng lúc (VMware + pfSense) → máy nhận sai gateway, rất khó debug."
      },
      {
        title: "Kiểm tra VMnet8 (NAT) – cổng ra Internet",
        text: "Vẫn trong Virtual Network Editor, chọn <b>VMnet8</b>: kiểu <b>NAT</b>, DHCP <b>bật</b> (giữ mặc định). Ghi lại <b>Subnet IP</b> (dạng 192.168.x.0) vào bảng IP. Bấm <b>NAT Settings…</b> để xem <b>Gateway IP</b> (thường là 192.168.x.2).<br>Chỉ pfSense WAN (và Ubuntu tạm thời lúc cài đặt) dùng VMnet8.",
        tip: "VMware NAT nghĩa là VM ra Internet qua máy host, nhưng Internet <b>không</b> vào được VM. Không tạo Port Forwarding trong NAT Settings."
      },
      {
        title: "Tập thói quen Snapshot & quản lý RAM",
        text: "Quy ước: chụp snapshot <b>trước mỗi bài lab</b> và <b>sau khi bài lab chạy đúng</b>. Trong VMware: chọn VM → <b>VM → Snapshot → Take Snapshot…</b>; quản lý ở <b>Snapshot Manager</b> (Ctrl+M).<br>Đặt tên có thứ tự, ví dụ: <code>00-clean-install</code>, <code>01-N1-done</code>, <code>02-N2-rules</code>.<br>RAM tuần 1: pfSense 1–2 GB + Ubuntu 2 GB + VM test 1 GB ≈ 5 GB – rất nhẹ với máy 32 GB.",
        tip: "Snapshot không phải backup: nếu file VM hỏng thì snapshot cũng mất. Với pfSense, tải thêm file cấu hình (Diagnostics → Backup & Restore)."
      }
    ],
    verify: [
      "Task Manager hiển thị <b>Virtualization: Enabled</b>.",
      "VMware Workstation Pro mở được, Default VM location trỏ ra ngoài Google Drive.",
      "Virtual Network Editor có VMnet2/3/4 kiểu Host-only, cột DHCP trống (tắt), subnet đúng 10.10.10.0 / 10.10.20.0 / 10.10.99.0.",
      "VMnet8 kiểu NAT, đã ghi subnet và gateway vào bảng IP."
    ],
    questions: [
      "Vì sao phải tắt DHCP của VMware trên VMnet2/3/4?",
      "VMnet8 (NAT) khác VMnet2 (host-only) thế nào về khả năng ra Internet và khả năng bị truy cập từ ngoài vào?",
      "Nếu máy nhà dùng 192.168.1.0/24, vì sao không nên chọn subnet lab là 192.168.1.0/24?",
      "VBS / Memory Integrity ảnh hưởng gì đến VMware và bạn đã chọn giữ hay tắt? Vì sao?"
    ],
    output: "Bảng IP plan (copy bảng ở bước 7, điền số thật của VMnet8) + ảnh chụp màn hình Virtual Network Editor + ghi chú cấu hình host (CPU, RAM, ổ đĩa, trạng thái VBS)."
  },

  /* ============================== SETUP-2 ============================== */
  {
    id: "SETUP-2",
    track: "chung",
    week: 1,
    title: "Tạo VM Ubuntu Server 24.04 LTS",
    goal: "Cài một máy chủ Linux gọn nhẹ có OpenSSH, cập nhật đầy đủ, sẵn sàng chuyển vào phân đoạn SERVER (VMnet2) sau khi dựng pfSense.",
    time: "45–60 phút",
    prereq: ["SETUP-1"],
    concepts: ["ISO", "VM hardware", "LVM", "OpenSSH", "systemd-networkd / netplan", "Snapshot"],
    steps: [
      {
        title: "Hiểu thứ tự cài đặt (vì sao dùng NAT tạm thời)",
        text: "VMnet2 chưa có DHCP và chưa có đường ra Internet cho tới khi làm xong N1 (pfSense). Vì vậy:<br>• <b>Cách khuyên dùng</b>: cài Ubuntu với card mạng ở <b>NAT (VMnet8)</b> để có Internet → cập nhật, cài gói. Cuối bài N1 mới chuyển card sang <b>VMnet2</b>.<br>• <b>Cách khác</b>: gắn thẳng VMnet2 và đặt IP tĩnh ngay trong trình cài (10.10.10.10/24, gateway 10.10.10.1, DNS 10.10.10.1). Trình cài sẽ báo không kết nối được mirror – vẫn cài tiếp được, nhưng chưa cập nhật được cho đến khi xong N1."
      },
      {
        title: "Tải ISO Ubuntu Server 24.04 LTS",
        text: "Tải từ trang chính thức <code>ubuntu.com/download/server</code> (file dạng <code>ubuntu-24.04.x-live-server-amd64.iso</code>). Lưu vào <code>D:\\VMs\\ISO</code>.",
        tip: "Nếu muốn chắc file không bị lỗi/giả mạo: so SHA256 với file SHA256SUMS trên trang Ubuntu. PowerShell: Get-FileHash tên-file.iso"
      },
      {
        title: "Tạo VM trong VMware",
        text: "<b>File → New Virtual Machine…</b> → <b>Typical</b> → chọn <b>I will install the operating system later</b> (tránh chế độ Easy Install tự động) → Guest OS: <b>Linux</b>, Version: <b>Ubuntu 64-bit</b> → Tên: <code>ubuntu-srv</code>, vị trí <code>D:\\VMs\\ubuntu-srv</code> → Disk <b>20 GB</b>.<br>Bấm <b>Customize Hardware…</b>: Memory <b>2048 MB</b>, Processors <b>1</b>, New CD/DVD → <b>Use ISO image file</b> trỏ tới ISO, Network Adapter → <b>NAT</b> (tạm thời). Có thể bỏ Sound Card / Printer.",
        tip: "Tên mục trong wizard có thể khác chút tùy phiên bản VMware; ý chính: 1 vCPU, 2 GB RAM, 20 GB disk, ISO Ubuntu Server, 1 card mạng."
      },
      {
        title: "Cài Ubuntu Server",
        text: "Bật VM, chọn <b>Try or Install Ubuntu Server</b>. Lần lượt:<br>• Language: English; Keyboard: English (US)<br>• Type: <b>Ubuntu Server</b> (không chọn minimized)<br>• Network: để DHCP (card <code>ens33</code> hoặc tên tương tự sẽ nhận IP 192.168.x.x của VMnet8)<br>• Proxy: để trống; Mirror: mặc định<br>• Storage: <b>Use an entire disk</b> + LVM (mặc định)<br>• Profile: Your name, Server name <code>ubuntu-srv</code>, username, mật khẩu mạnh<br>• Ubuntu Pro: Skip<br>• <b>Tick Install OpenSSH server</b><br>• Featured snaps: không chọn gì<br>Chờ cài xong → <b>Reboot Now</b>; nếu thấy thông báo gỡ đĩa cài thì nhấn Enter.",
        tip: "Ở màn Storage, Ubuntu thường chỉ cấp khoảng một nửa dung lượng cho ubuntu-lv. Có thể sửa ngay (Edit ubuntu-lv → max size) hoặc mở rộng sau bằng lệnh ở bước 6."
      },
      {
        title: "Đăng nhập & kiểm tra mạng",
        text: "Đăng nhập trên console VM. Kiểm tra IP, route, DNS và đường ra Internet:",
        code: "ip a                     # tìm card (thường ens33) và IP 192.168.x.x\nip route                 # default via 192.168.x.2 (gateway VMware NAT)\nresolvectl status        # DNS đang dùng\nping -c 4 1.1.1.1        # kiểm tra lớp IP\nping -c 4 ubuntu.com     # kiểm tra cả DNS",
        tip: "Ping IP được mà ping tên miền không được → lỗi DNS, không phải lỗi mạng. Đây chính là ý tưởng của bài S8."
      },
      {
        title: "Cập nhật & cài công cụ cho các bài sau",
        text: "Cập nhật hệ thống và cài các công cụ dùng trong tuần 1 (tcpdump, dig, curl, nc). Nếu ổ / chưa dùng hết 20 GB thì mở rộng LVM.",
        code: "sudo apt update && sudo apt -y upgrade\nsudo apt install -y tcpdump bind9-dnsutils curl netcat-openbsd open-vm-tools\n\n# Xem dung lượng / và mở rộng nếu còn trống trong volume group:\ndf -h /\nsudo vgs\nsudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv"
      },
      {
        title: "Kiểm tra OpenSSH",
        text: "Trên Ubuntu 24.04, SSH dùng <i>socket activation</i>: <code>ssh.socket</code> lắng nghe port 22 và chỉ khởi động <code>ssh.service</code> khi có kết nối – nên <code>ssh.service</code> báo <i>inactive</i> lúc chưa ai kết nối là bình thường.",
        code: "systemctl status ssh.socket\nsudo ss -tlnp | grep ':22'\n\n# Từ Windows host (PowerShell / Windows Terminal), khi VM còn ở VMnet8:\nssh tenuser@192.168.x.y",
        tip: "Lần đầu SSH sẽ hỏi xác nhận fingerprint của server – gõ yes. Đây là cơ chế chống giả mạo server (MITM)."
      },
      {
        title: "Ghi thông tin & chụp snapshot",
        text: "Ghi vào bảng IP: hostname, tên card mạng (ens33…), MAC (VM → Settings → Network Adapter → <b>Advanced…</b>). Tắt máy (<code>sudo poweroff</code>) rồi chụp snapshot <code>00-clean-install</code>.",
        code: "hostnamectl\nip link show\nsudo poweroff"
      },
      {
        title: "Chuyển sang phân đoạn SERVER (làm ở cuối bài N1)",
        text: "Sau khi pfSense chạy (bài N1): VM → Settings → Network Adapter → <b>Custom: Specific virtual network</b> → <b>VMnet2</b>. Ubuntu sẽ nhận IP 10.10.10.1xx từ DHCP của pfSense, rồi đặt IP tĩnh <code>10.10.10.10</code> theo hướng dẫn trong N1.",
        tip: "Nếu chọn cách đặt IP tĩnh ngay khi cài (bước 1), bỏ qua bước này nhưng nhớ kiểm tra lại card đang ở VMnet2."
      }
    ],
    verify: [
      "<code>ip a</code> thấy card có IP; <code>ping -c 4 ubuntu.com</code> thành công (khi đang ở VMnet8).",
      "<code>sudo ss -tlnp | grep ':22'</code> thấy port 22 đang LISTEN.",
      "SSH từ Windows host vào được Ubuntu.",
      "<code>tcpdump --version</code> và <code>dig -v</code> chạy được.",
      "Snapshot <code>00-clean-install</code> có trong Snapshot Manager."
    ],
    questions: [
      "Vì sao lúc cài nên dùng NAT (VMnet8) thay vì gắn ngay vào VMnet2?",
      "Lệnh nào cho biết default gateway của Ubuntu? Gateway hiện tại là máy nào?",
      "Vì sao <code>ssh.service</code> có thể đang inactive nhưng vẫn SSH vào được trên Ubuntu 24.04?",
      "Ping 1.1.1.1 thành công nhưng ping ubuntu.com thất bại – bạn nghi lỗi ở đâu?"
    ],
    output: "Bảng thông tin VM (hostname, vCPU/RAM/disk, card mạng, MAC, IP) + ảnh chụp kết quả <code>ip a</code> và SSH thành công từ host."
  },

  /* ============================== N1 ============================== */
  {
    id: "N1",
    track: "mang",
    week: 1,
    title: "Dựng pfSense, chia 3 phân đoạn mạng (VLAN logic), NAT ra Internet",
    goal: "Dựng pfSense làm router + firewall của lab: 1 cổng WAN (NAT ra Internet) và 3 cổng nội bộ Server / Client / Attacker, mỗi phân đoạn có DHCP riêng; Ubuntu ra được Internet qua pfSense.",
    time: "90–120 phút",
    prereq: ["SETUP-1", "SETUP-2"],
    concepts: ["Router / Firewall", "WAN / LAN / OPT", "Network segment (VLAN logic)", "Default gateway", "DHCP server", "Outbound NAT", "Implicit deny"],
    steps: [
      {
        title: "Hiểu đúng: phân đoạn mạng ≠ 802.1Q VLAN",
        text: "Trong lab này, mỗi VMnet là một <b>switch ảo riêng</b>, pfSense có <b>một card mạng riêng</b> cho mỗi switch. Kết quả về mặt logic giống 3 VLAN (3 broadcast domain, đi qua nhau phải qua router/firewall), nhưng <b>không có tag 802.1Q và không có trunk</b>. Ta gọi là <i>“VLAN logic / network segment”</i>.<br>VLAN thật (802.1Q, access/trunk port, inter-VLAN routing) sẽ luyện trong <b>Packet Tracer</b> (PT-1, N8). Khi phỏng vấn, nói rõ điều này để thể hiện hiểu đúng.",
        code: "             Internet\n                 |\n         [VMware NAT - VMnet8]\n                 | WAN (DHCP 192.168.x.x)\n            +---------+\n            | pfSense |\n            +---------+\n   LAN 10.10.10.1 | OPT1 10.10.20.1 | OPT2 10.10.99.1\n     VMnet2       |   VMnet3        |   VMnet4\n   [SERVER]       |  [CLIENT]       |  [ATTACKER]\n   ubuntu-srv     |  (Windows - T2) |  (Kali - T4)"
      },
      {
        title: "Tải pfSense CE & tạo VM",
        text: "Tải <b>pfSense CE</b> từ Netgate (pfsense.org → Download). Netgate hiện phân phối qua shop với giá 0 USD và có thể dùng <i>Netgate Installer</i> cần Internet lúc cài – WAN nối VMnet8 nên vẫn ổn. (Có thể dùng <b>OPNsense</b> thay thế: tải ISO trực tiếp; menu console tương tự, GUI khác.)<br>VMware: <b>File → New Virtual Machine → Typical → I will install the operating system later</b> → Guest OS: <b>Other → FreeBSD 64-bit</b> (chọn bản FreeBSD mới nhất trong danh sách, pfSense 2.7+ dựa trên FreeBSD 14) → tên <code>pfsense</code> → Disk <b>16 GB</b> → Customize: <b>1 vCPU</b>, <b>1–2 GB RAM</b>, CD/DVD trỏ ISO.",
        tip: "Quy trình tải/cài của Netgate thay đổi theo phiên bản (2.7.x vs 2.8.x). Nếu màn hình khác guide, đọc kỹ chữ trên màn hình và giữ đúng logic: WAN = card 1, LAN = card 2."
      },
      {
        title: "Thêm 4 card mạng và ghi MAC",
        text: "Trong Customize Hardware (hoặc VM → Settings), bấm <b>Add… → Network Adapter</b> cho đủ 4 card:<br>• Network Adapter 1 → <b>NAT</b> (VMnet8) → sẽ là <b>WAN</b><br>• Network Adapter 2 → <b>Custom: VMnet2</b> → <b>LAN</b> (Server)<br>• Network Adapter 3 → <b>Custom: VMnet3</b> → <b>OPT1</b> (Client)<br>• Network Adapter 4 → <b>Custom: VMnet4</b> → <b>OPT2</b> (Attacker)<br>Với mỗi card bấm <b>Advanced…</b> và chép 2–3 ký tự cuối của MAC vào bảng IP.",
        tip: "pfSense đặt tên card là em0, em1, em2, em3 (driver e1000) hoặc vmx0… (vmxnet3). Thứ tự thường khớp Adapter 1→4, nhưng luôn đối chiếu MAC để chắc chắn – gán nhầm WAN/LAN là lỗi hay gặp nhất."
      },
      {
        title: "Cài đặt pfSense",
        text: "Bật VM, boot từ ISO, đồng ý license, chọn <b>Install</b>. Nếu trình cài hỏi chọn cổng WAN/LAN: WAN = card nối VMnet8 (DHCP), LAN = card nối VMnet2. Phân vùng: để mặc định (ZFS hoặc UFS đều được). Cài xong chọn <b>Reboot</b> và gỡ ISO (VM → Settings → CD/DVD → bỏ tick <i>Connect at power on</i>).<br>Sau khi khởi động, console hiện menu số <b>0–16</b> và danh sách WAN/LAN kèm IP.",
        tip: "Chưa cần đúng hết ở bước này – bước 5 và 6 sẽ gán lại cổng và IP từ console."
      },
      {
        title: "Console option 1 – Assign Interfaces",
        text: "Tại menu console gõ <b>1</b> (Assign Interfaces):<br>• <i>Should VLANs be set up now?</i> → <b>n</b> (ta không dùng 802.1Q)<br>• WAN interface → <code>em0</code><br>• LAN interface → <code>em1</code><br>• Optional 1 → <code>em2</code>; Optional 2 → <code>em3</code>; rồi Enter để kết thúc<br>• <i>Do you want to proceed?</i> → <b>y</b>",
        code: "WAN  -> em0 (VMnet8 NAT)\nLAN  -> em1 (VMnet2 SERVER)\nOPT1 -> em2 (VMnet3 CLIENT)\nOPT2 -> em3 (VMnet4 ATTACKER)"
      },
      {
        title: "Console option 2 – Set interface IP + bật DHCP",
        text: "Gõ <b>2</b> (Set interface(s) IP address), chọn <b>LAN</b>:<br>• Configure IPv4 via DHCP? → <b>n</b> → IP <code>10.10.10.1</code> → subnet bit count <code>24</code><br>• Upstream gateway → nhấn <b>Enter</b> (LAN không có gateway)<br>• IPv6 → n / Enter (bỏ qua)<br>• Enable DHCP server on LAN? → <b>y</b> → start <code>10.10.10.100</code>, end <code>10.10.10.199</code><br>• Revert to HTTP for webConfigurator? → <b>n</b><br>Lặp lại option 2 cho <b>OPT1</b> (10.10.20.1/24, pool .100–.199) và <b>OPT2</b> (10.10.99.1/24, pool .100–.199). WAN để DHCP.",
        tip: "Câu hỏi trên console có thể khác chữ một chút theo phiên bản; quy tắc: interface nội bộ không có upstream gateway, chỉ WAN có gateway."
      },
      {
        title: "Vào Web GUI an toàn (tạm thời qua host adapter)",
        text: "Ubuntu Server không có trình duyệt, nên tạm cho máy host cắm vào phân đoạn SERVER:<br>1) Virtual Network Editor → VMnet2 → <b>tick Connect a host virtual adapter</b> (DHCP vẫn TẮT) → Apply.<br>2) Windows: <code>ncpa.cpl</code> → <b>VMware Network Adapter VMnet2</b> → Properties → IPv4 → IP <code>10.10.10.250</code>, mask <code>255.255.255.0</code>, <b>không</b> gateway, <b>không</b> DNS. (VMware thường tự gán .1 cho host adapter → trùng IP pfSense, nên phải đổi.)<br>3) Trình duyệt: <code>https://10.10.10.1</code> → chấp nhận cảnh báo chứng chỉ tự ký → đăng nhập mặc định <code>admin</code> / <code>pfsense</code>.",
        tip: "An toàn: GUI chỉ mở trên LAN (rule anti-lockout). KHÔNG mở GUI ra WAN, KHÔNG tạo port forward. Vì host không có gateway trên VMnet2 nên Internet của host không đi qua lab. Khi không cần quản trị, bỏ tick host adapter."
      },
      {
        title: "Setup Wizard, đổi mật khẩu, đặt tên phân đoạn",
        text: "Chạy <b>Setup Wizard</b>: Hostname <code>pfsense</code>, Domain <code>lab.internal</code>, để trống DNS server (DNS Resolver tự phân giải), Timezone <b>Asia/Ho_Chi_Minh</b>, WAN = DHCP, LAN = 10.10.10.1/24, <b>đổi mật khẩu admin</b>.<br>Sau đó <b>Interfaces → OPT1</b>: tick <b>Enable interface</b> (nếu chưa), Description = <code>CLIENT</code>, Save → Apply. Làm tương tự <b>OPT2</b> = <code>ATTACKER</code>.",
        tip: "Mật khẩu mặc định admin/pfsense là lỗ hổng thật ngoài đời (default credentials). Ghi mật khẩu mới vào trình quản lý mật khẩu."
      },
      {
        title: "Kiểm tra DHCP server và Outbound NAT",
        text: "• <b>Services → DHCP Server</b>: có tab LAN, CLIENT, ATTACKER; mỗi tab đã Enable và có pool .100–.199.<br>• <b>Firewall → NAT → Outbound</b>: chế độ <b>Automatic outbound NAT</b>; danh sách rule tự động có 10.10.10.0/24, 10.10.20.0/24, 10.10.99.0/24 đi ra WAN.<br>• <b>Status → Interfaces</b>: WAN có IP 192.168.x.x và gateway 192.168.x.2.",
        tip: "pfSense 2.8 dùng backend DHCP mới (Kea) thay ISC; giao diện có thể khác nhẹ nhưng các mục Enable / Range vẫn tương tự."
      },
      {
        title: "Đưa Ubuntu vào SERVER, kiểm tra Internet qua pfSense",
        text: "Tắt Ubuntu → Settings → Network Adapter → <b>Custom: VMnet2</b> → bật lại. Kiểm tra IP nhận từ DHCP của pfSense và đường ra Internet:",
        code: "ip a                     # mong đợi 10.10.10.1xx/24\nip route                 # default via 10.10.10.1\nping -c 3 10.10.10.1     # tới gateway (pfSense)\nping -c 3 1.1.1.1        # ra Internet qua NAT\ndig example.com          # DNS qua pfSense\ncurl -I https://ubuntu.com\ntracepath -n 1.1.1.1     # hop 1 = 10.10.10.1 (có thể không hiện hết hop)",
        tip: "Trên pfSense: Status → DHCP Leases sẽ thấy ubuntu-srv cùng MAC đã ghi ở SETUP-2."
      },
      {
        title: "Đặt IP tĩnh 10.10.10.10 cho Ubuntu (máy chủ nên có IP cố định)",
        text: "Sửa file netplan (tên file có thể khác, xem bằng <code>ls /etc/netplan</code>; thay ens33 bằng tên card thật). Nếu cloud-init ghi đè cấu hình mạng, tắt nó bằng file 99-disable-network-config.cfg. Dùng <code>netplan try</code> để tự quay lại nếu cấu hình sai.",
        code: "sudo nano /etc/netplan/50-cloud-init.yaml\n\nnetwork:\n  version: 2\n  ethernets:\n    ens33:\n      dhcp4: false\n      addresses: [10.10.10.10/24]\n      routes:\n        - to: default\n          via: 10.10.10.1\n      nameservers:\n        addresses: [10.10.10.1]\n\nsudo chmod 600 /etc/netplan/50-cloud-init.yaml\necho 'network: {config: disabled}' | sudo tee /etc/cloud/cloud.cfg.d/99-disable-network-config.cfg\nsudo netplan try     # Enter để giữ nếu vẫn kết nối được\nip a && ping -c 3 1.1.1.1",
        tip: "YAML dùng dấu cách, KHÔNG dùng Tab. Cách khác: tạo DHCP Static Mapping trên pfSense (MAC → 10.10.10.10, nằm ngoài pool .100–.199)."
      },
      {
        title: "VM test cho các phân đoạn khác + snapshot",
        text: "Chụp snapshot Ubuntu, rồi <b>VM → Manage → Clone</b> → <i>An existing snapshot</i> → <b>Create a linked clone</b> → tên <code>test-vm</code> (RAM có thể giảm còn 1 GB). Gắn card vào <b>VMnet3</b> (CLIENT). Trong test-vm: đổi hostname, bật lại DHCP (bản clone mang IP tĩnh .10 – sửa netplan về <code>dhcp4: true</code>).<br>Quan sát: test-vm <b>nhận được</b> IP 10.10.20.1xx (DHCP vẫn chạy) nhưng <b>không ping được</b> 10.10.20.1 hay Internet – vì OPT mới tạo <b>chưa có rule nào → mặc định chặn (implicit deny)</b>. Bài N2 sẽ viết rule.<br>Cuối cùng chụp snapshot pfSense <code>01-N1-done</code> và tải backup cấu hình (<b>Diagnostics → Backup & Restore</b>).",
        code: "sudo hostnamectl set-hostname test-vm\nsudo rm /etc/machine-id && sudo systemd-machine-id-setup   # tránh trùng ID với bản gốc\nsudo nano /etc/netplan/50-cloud-init.yaml   # ens33: dhcp4: true (xóa addresses/routes/nameservers)\nsudo netplan apply && ip a",
        tip: "LAN có sẵn rule “Default allow LAN to any” nên Ubuntu đi được; OPT1/OPT2 thì không có rule mặc định. Đây là điểm hay bị hỏi khi phỏng vấn pfSense."
      }
    ],
    verify: [
      "Console pfSense hiện đủ 4 interface: WAN (192.168.x.x), LAN 10.10.10.1, OPT1/CLIENT 10.10.20.1, OPT2/ATTACKER 10.10.99.1.",
      "Vào được <code>https://10.10.10.1</code> từ host (qua VMnet2 host adapter), đã đổi mật khẩu admin.",
      "Ubuntu có IP 10.10.10.10, <code>ping 1.1.1.1</code> và <code>dig example.com</code> thành công.",
      "test-vm trên VMnet3 nhận IP 10.10.20.1xx từ pfSense (Status → DHCP Leases).",
      "Có snapshot <code>01-N1-done</code> và file backup config.xml."
    ],
    questions: [
      "Phân đoạn mạng bằng nhiều VMnet khác 802.1Q VLAN ở điểm nào? Khi nào cần trunk?",
      "Vì sao interface LAN có thể ra Internet ngay, còn OPT1/OPT2 thì không?",
      "Outbound NAT trên pfSense làm gì với gói tin từ 10.10.10.10 đi ra 1.1.1.1? Có bao nhiêu lớp NAT trong lab này?",
      "Vì sao host adapter VMnet2 không được đặt gateway? Nếu đặt 10.10.10.1 làm gateway thì chuyện gì xảy ra?",
      "Nếu một máy trong CLIENT nhận IP 169.254.x.x, bạn kiểm tra những gì?"
    ],
    output: "Sơ đồ mạng lab (vẽ bằng draw.io: pfSense + 4 phân đoạn) + bảng IP/VLAN logic đã điền đủ + ảnh chụp Status → Interfaces và DHCP Leases."
  },

  /* ============================== N2 ============================== */
  {
    id: "N2",
    track: "mang",
    week: 1,
    title: "Viết luật firewall pfSense: chặn mặc định, chỉ mở port cần thiết",
    goal: "Áp dụng <b>least privilege</b> giữa các phân đoạn: mặc định chặn, CLIENT chỉ vào SERVER qua port cần thiết, ATTACKER bị cô lập; bật log cho rule chặn và đọc được firewall log.",
    time: "90 phút",
    prereq: ["N1"],
    concepts: ["ACL / Firewall rule", "Least privilege", "Default deny", "First match", "Stateful firewall", "Alias", "Pass / Block / Reject", "Firewall log"],
    steps: [
      {
        title: "Thiết kế chính sách trước khi bấm",
        text: "Admin giỏi viết <b>ma trận truy cập</b> trước rồi mới cấu hình. Quy tắc pfSense cần nhớ:<br>• Rule áp dụng cho gói tin <b>đi VÀO</b> interface (tab của interface nơi kết nối bắt đầu).<br>• Đọc <b>từ trên xuống, khớp rule đầu tiên là dừng</b> (first match).<br>• Không khớp rule nào → <b>chặn ngầm định</b> (implicit deny).<br>• Firewall <b>stateful</b>: cho phép chiều đi thì chiều trả lời tự được cho qua.",
        code: "NGUỒN \\ ĐÍCH | SERVER            | CLIENT | ATTACKER | pfSense         | Internet\n-------------+-------------------+--------+----------+-----------------+-----------------\nSERVER       | (cùng mạng)       | CHẶN   | CHẶN     | DNS 53, GUI*    | CHO (update)\nCLIENT       | 22, 80, 443, ping | -      | CHẶN     | DNS 53          | CHO\nATTACKER     | CHẶN (22 = rule   | CHẶN   | -        | DNS 53          | TẮT (chỉ bật\n             |  tắt, dùng ở S1)  |        |          |                 |  khi update)\n* GUI qua rule anti-lockout trên LAN"
      },
      {
        title: "Chuẩn bị máy để kiểm tra",
        text: "Trên <b>ubuntu-srv</b> (10.10.10.10) cài web server nhỏ để có port 80 kiểm tra. <b>test-vm</b> đặt ở VMnet3 (CLIENT). Chụp snapshot pfSense trước khi sửa rule.",
        code: "# trên ubuntu-srv\nsudo apt install -y nginx\ncurl -I http://localhost      # HTTP/1.1 200 OK\nsudo ss -tlnp | grep -E ':22|:80'"
      },
      {
        title: "Tạo Aliases (đặt tên cho nhóm IP/port)",
        text: "<b>Firewall → Aliases</b>:<br>• Tab IP → Add: <code>NET_SERVER</code> (Network) 10.10.10.0/24; <code>NET_CLIENT</code> 10.10.20.0/24; <code>NET_ATTACKER</code> 10.10.99.0/24; <code>PRIVATE_NETS</code> gồm 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.<br>• Tab Ports → Add: <code>PORTS_CLIENT_SRV</code> = 22, 80, 443.<br>Save → <b>Apply Changes</b>.",
        tip: "Alias giúp rule dễ đọc và sửa một chỗ áp dụng mọi nơi. PRIVATE_NETS (RFC1918) dùng để chặn đi “ngang” giữa các mạng nội bộ, kể cả mạng VMware NAT 192.168.x."
      },
      {
        title: "Rule trên tab CLIENT (OPT1)",
        text: "<b>Firewall → Rules → CLIENT</b> → <b>Add</b> (mũi tên xuống = thêm cuối danh sách). Tạo theo đúng thứ tự, mỗi rule ghi Description:",
        code: "#  Action | Proto   | Source     | Destination        | Port              | Log | Description\n1  Pass   | TCP/UDP | NET_CLIENT | CLIENT address     | 53                |     | DNS toi pfSense\n2  Pass   | ICMP    | NET_CLIENT | NET_SERVER         | (Echo request)    |     | Ping toi Server\n3  Pass   | TCP     | NET_CLIENT | NET_SERVER         | PORTS_CLIENT_SRV  |     | Client -> Server 22/80/443\n4  Block  | any     | NET_CLIENT | PRIVATE_NETS       | any               | ✔   | Chan di ngang noi bo + GUI\n5  Pass   | any     | NET_CLIENT | any                | any               |     | Ra Internet",
        tip: "Rule 4 nằm TRƯỚC rule 5 nên mọi đích nội bộ đã bị chặn; rule 5 thực chất chỉ còn cho ra Internet. Đổi chỗ 4 và 5 thì rule chặn vô tác dụng – đó là bài học first match."
      },
      {
        title: "Rule trên tab LAN (SERVER)",
        text: "<b>Firewall → Rules → LAN</b>. Giữ nguyên <b>Anti-Lockout Rule</b> (để không tự khóa GUI). <b>Disable</b> (không xóa) 2 rule <i>Default allow LAN to any</i> (IPv4 và IPv6), rồi thêm:",
        code: "#  Action | Proto   | Source     | Destination   | Port | Log | Description\n1  Pass   | TCP/UDP | NET_SERVER | LAN address   | 53   |     | DNS toi pfSense\n2  Block  | any     | NET_SERVER | PRIVATE_NETS  | any  | ✔   | Server khong tu mo ket noi sang mang khac\n3  Pass   | any     | NET_SERVER | any           | any  |     | Ra Internet (apt update)",
        tip: "Client vẫn vào được Server dù LAN có rule 2: kết nối do CLIENT mở (được rule trên tab CLIENT cho phép), chiều trả lời đi theo <b>state</b> chứ không xét lại rule LAN."
      },
      {
        title: "Rule trên tab ATTACKER (OPT2) – cô lập",
        text: "<b>Firewall → Rules → ATTACKER</b>. Hai rule đặc biệt được tạo nhưng <b>để Disabled</b> (tick <i>Disable this rule</i>):",
        code: "#  Action | Proto   | Source       | Destination        | Port | Log | Trạng thái | Description\n1  Pass   | TCP/UDP | NET_ATTACKER | ATTACKER address   | 53   |     | Bật        | DNS toi pfSense\n2  Pass   | TCP     | NET_ATTACKER | 10.10.10.10        | 22   | ✔   | DISABLED   | S1: brute force SSH (chi bat khi lam S1)\n3  Block  | any     | NET_ATTACKER | PRIVATE_NETS       | any  | ✔   | Bật        | Co lap Attacker\n4  Pass   | any     | NET_ATTACKER | any                | any  |     | DISABLED   | Chi bat khi update Kali",
        tip: "An toàn: Kali chỉ tấn công VM trong lab. Không bao giờ quét IP ngoài lab, kể cả mạng nhà 192.168.x.x – rule 3 chặn sẵn việc này."
      },
      {
        title: "Apply & hiểu thứ tự, state",
        text: "Sau mỗi tab bấm <b>Save</b> rồi <b>Apply Changes</b>. Kéo-thả để sắp xếp nếu sai thứ tự. Kiểm tra lại: rule pass hẹp ở trên, rule block rộng ở giữa, rule pass rộng (Internet) ở cuối.<br>Lưu ý: rule mới <b>không cắt</b> kết nối đang mở. Muốn test sạch: <b>Diagnostics → States → Reset States</b> (hoặc chờ kết nối cũ hết hạn).",
        tip: "Mỗi rule có cột “States” cho biết số kết nối đang khớp – dùng để xem rule có thực sự được dùng không."
      },
      {
        title: "Kiểm tra từ CLIENT (test-vm trên VMnet3)",
        text: "Chạy từng lệnh, ghi kết quả mong đợi và kết quả thật:",
        code: "ping -c 3 10.10.10.10                 # OK  (rule 2)\nnc -vz -w 3 10.10.10.10 22            # succeeded (rule 3)\ncurl -I http://10.10.10.10            # HTTP/1.1 200 OK (rule 3)\nnc -vz -w 3 10.10.10.10 3306          # timeout -> bị chặn (rule 4)\ncurl -k -m 5 https://10.10.20.1       # timeout -> GUI không mở cho CLIENT\ndig example.com                       # OK (rule 1 + rule 5)\ncurl -I https://ubuntu.com            # OK (rule 5)",
        tip: "Block = lặng lẽ bỏ gói → phía client thấy <b>timeout</b>. Reject = trả lời từ chối → thấy <b>connection refused</b> ngay. Với mạng nội bộ, Reject giúp debug nhanh; với Internet thường dùng Block."
      },
      {
        title: "Kiểm tra từ ATTACKER (chuyển test-vm sang VMnet4)",
        text: "Tắt test-vm → đổi card sang <b>VMnet4</b> → bật lại (nhận IP 10.10.99.1xx). Kiểm tra:",
        code: "ip a                                  # 10.10.99.1xx\nping -c 3 10.10.10.10                 # FAIL (rule 3 Block)\nnc -vz -w 3 10.10.10.10 22            # timeout (rule S1 đang disabled)\ncurl -I -m 5 https://ubuntu.com       # FAIL (rule update đang disabled)\ndig example.com                       # OK (rule 1)",
        tip: "Thử bật rule S1 → Apply → nc tới port 22 thành công → tắt lại. Đây đúng là thao tác bạn sẽ làm ở S1."
      },
      {
        title: "Đọc firewall log",
        text: "<b>Status → System Logs → Firewall</b> (tab Normal View). Mỗi dòng có: <b>Action</b> (biểu tượng chặn/cho phép), <b>Time</b>, <b>Interface</b>, <b>Rule</b>, <b>Source</b> (IP:port), <b>Destination</b> (IP:port), <b>Protocol</b>. Bấm biểu tượng Action để xem rule nào đã khớp.<br>Dùng <b>Filter</b> (biểu tượng phễu) lọc theo Source IP của test-vm. Tìm dòng chặn tới 10.10.10.10:3306 và tới 10.10.10.10:22 từ ATTACKER.",
        code: "Đọc một dòng log (ví dụ, số sẽ khác):\nBLOCK | Nov 9 20:15:02 | ATTACKER | Co lap Attacker | 10.10.99.101:51514 | 10.10.10.10:22 | TCP:S\n=> Ai: 10.10.99.101 | Tới đâu: SSH trên ubuntu-srv | Bị chặn bởi rule 'Co lap Attacker' | TCP:S = gói SYN mở kết nối",
        tip: "Đây chính là kỹ năng SOC: log firewall cho biết ai – tới đâu – port nào – bị chặn hay cho qua. Tuần 3 log này sẽ được đẩy về Wazuh."
      },
      {
        title: "Lưu cấu hình & tài liệu",
        text: "<b>Diagnostics → Backup & Restore</b> → Download configuration (file .xml). Chụp màn hình 3 tab rule. Chuyển test-vm về VMnet3. Snapshot pfSense <code>02-N2-rules</code>.",
        tip: "File config.xml có hash mật khẩu admin – không đưa thẳng lên GitHub công khai."
      }
    ],
    verify: [
      "Từ CLIENT: ping, SSH (22) và HTTP (80) tới 10.10.10.10 thành công; port 3306 và GUI pfSense bị chặn.",
      "Từ ATTACKER: không ping/SSH được vào SERVER; chỉ phân giải DNS được.",
      "Rule “S1: brute force SSH” và “update Kali” tồn tại nhưng ở trạng thái Disabled.",
      "Firewall log có dòng BLOCK với đúng description rule, đúng IP nguồn/đích.",
      "Có file backup config và snapshot <code>02-N2-rules</code>."
    ],
    questions: [
      "pfSense xét rule theo thứ tự nào? Điều gì xảy ra nếu đặt rule “Pass any” lên đầu tab CLIENT?",
      "Vì sao Client vào được web trên Server dù tab LAN có rule chặn Server → PRIVATE_NETS?",
      "Block và Reject khác nhau thế nào khi nhìn từ phía máy bị chặn? Khi nào dùng loại nào?",
      "Rule áp dụng ở interface “vào” hay “ra”? Muốn chặn Attacker vào Server thì viết rule ở tab nào?",
      "Vì sao rule chặn nên bật Log, nhưng rule cho phép Internet thường không bật?"
    ],
    output: "Ma trận truy cập (bước 1) + ảnh chụp 3 tab rule + bảng kết quả test (lệnh – mong đợi – thực tế) + 1 dòng firewall log đã giải nghĩa."
  },

  /* ============================== S8 ============================== */
  {
    id: "S8",
    track: "soc",
    week: 1,
    title: "Tái hiện & phân tích lỗi DNS bằng tcpdump (udp port 53 unreachable)",
    goal: "Tự tạo lại tình huống DNS lỗi giống bài trong Khóa 3, bắt gói bằng tcpdump, đọc được dòng truy vấn <code>A?</code> và dòng ICMP <code>udp port 53 unreachable</code>, rồi viết báo cáo sự cố ngắn.",
    time: "60–75 phút",
    prereq: ["SETUP-2", "N1", "N2"],
    concepts: ["DNS (UDP 53)", "A record", "ICMP Destination Unreachable", "tcpdump filter", "pcap", "Block vs Reject", "Incident report"],
    steps: [
      {
        title: "Nhắc lại bài của bạn trong Khóa 3",
        text: "Người dùng không vào được <code>www.yummyrecipesforme.com</code>. Log tcpdump cho thấy máy <code>192.51.100.15</code> gửi truy vấn DNS (UDP 53, <code>A?</code>) tới <code>203.0.113.2</code>, nhận lại <code>ICMP 203.0.113.2 udp port 53 unreachable</code>, lặp lại 3 lần. Kết luận: dịch vụ DNS không nhận truy vấn ở port 53 → không phân giải được tên miền.<br>Hôm nay bạn sẽ <b>tự tạo ra</b> đúng loại log đó trong lab.",
        tip: "Trước khi làm: snapshot pfSense hoặc tải backup cấu hình (Diagnostics → Backup & Restore)."
      },
      {
        title: "Mở 2 phiên terminal trên ubuntu-srv",
        text: "Mở 2 phiên SSH từ host (qua host adapter VMnet2) hoặc 1 console + 1 SSH: phiên A để bắt gói, phiên B để chạy lệnh. Xác định tên card mạng.",
        code: "ip -br a          # ví dụ: ens33 UP 10.10.10.10/24\ntcpdump -D        # liệt kê interface tcpdump nhìn thấy",
        tip: "Dùng <code>dig @10.10.10.1</code> để hỏi thẳng pfSense, bỏ qua bộ đệm systemd-resolved (127.0.0.53) – log sẽ sạch và dễ đọc hơn."
      },
      {
        title: "Bắt gói lúc BÌNH THƯỜNG (baseline)",
        text: "Phiên A chạy tcpdump; phiên B chạy dig. Bạn sẽ thấy 1 dòng truy vấn và 1 dòng trả lời. <code>-nn</code> = không đổi IP thành tên, không đổi port thành tên (nên thấy <code>.53</code> thay vì <code>.domain</code> như trong log của khóa học).",
        code: "# Phiên A\nsudo tcpdump -i ens33 -nn 'port 53 or icmp'\n\n# Phiên B\ndig @10.10.10.1 example.com\n\n# Ví dụ dòng thấy được (số sẽ khác):\n10:15:02.101 IP 10.10.10.10.41234 > 10.10.10.1.53: 51234+ [1au] A? example.com. (52)\n10:15:02.140 IP 10.10.10.1.53 > 10.10.10.10.41234: 51234 1/0/1 A 93.184.215.14 (56)",
        tip: "Đọc dòng 1: thời gian | IP nguồn.port nguồn > IP đích.53 | 51234 = ID truy vấn (+ = yêu cầu đệ quy) | A? = hỏi bản ghi A | (52) = độ dài. Dòng 2 có cùng ID 51234 → đây là câu trả lời cho truy vấn đó."
      },
      {
        title: "Tạo sự cố: rule REJECT UDP 53 trên pfSense",
        text: "<b>Firewall → Rules → LAN</b> → thêm rule ở <b>ĐẦU danh sách</b> (mũi tên lên): Action <b>Reject</b>, Protocol <b>UDP</b>, Source <code>10.10.10.10</code>, Destination <b>LAN address</b>, Port <b>53</b>, tick <b>Log</b>, Description <code>S8 TEST - reject DNS</code>. Save → Apply Changes.",
        tip: "Với UDP, Reject khiến pfSense gửi lại <b>ICMP port unreachable</b> – đúng hiện tượng trong bài khóa học. Rule phải nằm trên rule “DNS toi pfSense” vì first match."
      },
      {
        title: "Quan sát lỗi bằng tcpdump",
        text: "Phiên A vẫn chạy tcpdump. Phiên B chạy lại dig (và thử tên miền trong bài khóa học). Bạn sẽ thấy dòng <code>A?</code> và ngay sau đó dòng ICMP.",
        code: "# Phiên B\ndig @10.10.10.1 example.com\ndig @10.10.10.1 www.yummyrecipesforme.com\nnslookup example.com 10.10.10.1\n\n# Ví dụ dòng thấy được (số sẽ khác):\n10:20:11.501 IP 10.10.10.10.53321 > 10.10.10.1.53: 40112+ [1au] A? example.com. (52)\n10:20:11.502 IP 10.10.10.1 > 10.10.10.10: ICMP 10.10.10.1 udp port 53 unreachable, length 88",
        tip: "dig thường in lỗi kiểu “communications error … connection refused” rồi “no servers could be reached” (chữ có thể khác theo phiên bản). “Connection refused” với UDP chính là do nhận ICMP port unreachable."
      },
      {
        title: "Lưu file pcap và đọc lại",
        text: "Analyst lưu bằng chứng ra file thay vì chỉ nhìn màn hình. Bắt vào file, chạy dig 3 lần, rồi đọc lại và đếm số lần lỗi.",
        code: "# Phiên A (Ctrl+C để dừng sau khi phiên B chạy xong)\nsudo tcpdump -i ens33 -nn -w ~/s8-dns-reject.pcap 'port 53 or icmp'\n\n# Phiên B\nfor i in 1 2 3; do dig @10.10.10.1 +tries=1 example.com; done\n\n# Đọc lại\ntcpdump -nn -r ~/s8-dns-reject.pcap\ntcpdump -nn -r ~/s8-dns-reject.pcap 'icmp' | wc -l    # số dòng ICMP unreachable",
        tip: "File .pcap có thể mở bằng Wireshark trên máy host (copy về bằng <code>scp</code>)."
      },
      {
        title: "So sánh: đổi Reject → Block",
        text: "Sửa rule S8 TEST, đổi Action thành <b>Block</b> → Save → Apply. Chạy lại tcpdump + dig. Lần này chỉ thấy các dòng <code>A?</code> lặp lại, <b>không có ICMP</b>, dig chờ hết thời gian rồi báo timeout.",
        code: "dig @10.10.10.1 example.com    # chờ lâu ~ vài giây mỗi lần thử rồi báo timed out",
        tip: "Ý nghĩa SOC: có ICMP unreachable → có thiết bị TRẢ LỜI “không có dịch vụ/không cho phép”. Chỉ có timeout → gói bị nuốt im lặng (firewall Block, mất gói, hoặc server chết). Hai triệu chứng dẫn tới hướng điều tra khác nhau."
      },
      {
        title: "Đối chiếu với firewall log pfSense",
        text: "<b>Status → System Logs → Firewall</b>, lọc Source <code>10.10.10.10</code>: thấy các dòng khớp rule <code>S8 TEST</code>, đích <code>10.10.10.1:53</code>, UDP. Ghi lại thời gian để khớp với timestamp trong pcap.",
        tip: "Hai nguồn bằng chứng (pcap trên máy + log firewall) cùng khớp thời gian → kết luận chắc chắn hơn. Đây là tư duy “correlate” của SOC."
      },
      {
        title: "So sánh với bài trong khóa học",
        text: "Điền bảng đối chiếu để thấy lab của bạn tái hiện đúng hiện tượng:",
        code: "MỤC                  | BÀI KHÓA 3                         | LAB CỦA BẠN\n---------------------+------------------------------------+---------------------------------\nMáy khách            | 192.51.100.15                      | 10.10.10.10 (ubuntu-srv)\nDNS server           | 203.0.113.2                        | 10.10.10.1 (pfSense)\nTruy vấn             | UDP -> port 53 (.domain), A?       | UDP -> port 53, A?\nPhản hồi lỗi         | ICMP udp port 53 unreachable (x3)  | ICMP udp port 53 unreachable\nNguyên nhân thật     | Chưa rõ (DNS chết / port bị chặn)  | Firewall rule Reject UDP 53\nNguyên nhân giả định | -                                  | Biết chắc vì chính bạn tạo ra"
      },
      {
        title: "Viết báo cáo sự cố ngắn",
        text: "Viết theo mẫu (tiếng Việt, có thể kèm bản tiếng Anh để luyện). Dùng đúng thời gian, IP, số lần lặp lấy từ pcap của bạn.",
        code: "BÁO CÁO SỰ CỐ - LỖI PHÂN GIẢI DNS\n1. Tóm tắt: Máy ubuntu-srv (10.10.10.10) không phân giải được tên miền từ [giờ].\n2. Bằng chứng: tcpdump (s8-dns-reject.pcap) cho thấy [N] truy vấn DNS UDP tới 10.10.10.1:53 (A? example.com),\n   mỗi truy vấn nhận ICMP 'udp port 53 unreachable' từ 10.10.10.1. Firewall log pfSense: rule 'S8 TEST - reject DNS'.\n3. Timeline: [hh:mm:ss] truy vấn đầu tiên bị từ chối ... [hh:mm:ss] gỡ rule, DNS hoạt động lại.\n4. Phân tích: Giao thức UDP, dịch vụ DNS, port 53, giao thức báo lỗi ICMP. Truy vấn không tới được dịch vụ DNS.\n5. Nguyên nhân: Rule firewall Reject UDP 53 trên interface LAN.\n6. Mức độ: Trung bình - mất phân giải tên miền cho phân đoạn SERVER, không có dấu hiệu tấn công.\n7. Thật/Giả: Sự cố thật (do cấu hình), không phải false positive.\n8. Đề xuất: Gỡ rule; quy trình change management cho firewall; giám sát cảnh báo khi DNS lỗi."
      },
      {
        title: "Khôi phục cấu hình",
        text: "<b>Xóa</b> (hoặc Disable) rule <code>S8 TEST</code> → Apply Changes. Kiểm tra DNS hoạt động lại và xóa bộ đệm DNS trên Ubuntu.",
        code: "dig @10.10.10.1 example.com     # có ANSWER SECTION\nsudo resolvectl flush-caches\ndig example.com\ncurl -I https://ubuntu.com",
        tip: "Luôn kết thúc lab bằng trạng thái sạch. Nếu quên rule test, các bài sau sẽ lỗi khó hiểu."
      }
    ],
    verify: [
      "Có ảnh/text tcpdump lúc bình thường (truy vấn + trả lời cùng ID) và lúc lỗi (A? + ICMP udp port 53 unreachable).",
      "Có file <code>s8-dns-reject.pcap</code> đọc lại được bằng <code>tcpdump -r</code>.",
      "Giải thích được vì sao Block cho timeout còn Reject cho ICMP unreachable.",
      "Rule S8 TEST đã gỡ, <code>dig example.com</code> trả lời bình thường."
    ],
    questions: [
      "Trong dòng <code>51234+ [1au] A? example.com.</code>, từng phần có nghĩa gì?",
      "Vì sao DNS dùng UDP 53 cho truy vấn thường? Khi nào DNS dùng TCP 53?",
      "ICMP “udp port 53 unreachable” do máy nào gửi và nó cho bạn biết điều gì?",
      "Nếu chỉ thấy truy vấn A? lặp lại mà không có phản hồi nào, bạn nghĩ tới những nguyên nhân nào?",
      "Vì sao trong log khóa học thấy <code>.domain</code> còn trong lab thấy <code>.53</code>?"
    ],
    output: "Báo cáo sự cố DNS (mẫu bước 10) + 2 đoạn log tcpdump (bình thường / lỗi) có chú thích + bảng so sánh với bài Khóa 3 + file pcap.",
    mitre: ""
  },

  /* ============================== PT-1 ============================== */
  {
    id: "PT-1",
    track: "mang",
    week: 1,
    title: "Packet Tracer cơ bản: 2 PC, 1 switch, 1 router, 2 subnet",
    goal: "Làm quen Cisco IOS: các mode, cấu hình hostname, mật khẩu, IP cho interface, bật cổng, lưu cấu hình; ping thành công giữa 2 PC ở 2 subnet khác nhau qua router.",
    time: "60–90 phút",
    prereq: [],
    concepts: ["Cisco IOS modes", "Router interface", "Default gateway", "Subnet", "Running vs startup config", "Straight-through / cross-over cable", "ARP"],
    steps: [
      {
        title: "Lấy Packet Tracer miễn phí",
        text: "Tạo tài khoản <b>Cisco Networking Academy</b> (netacad.com; trước đây là Skills for All) → đăng ký khóa miễn phí <b>Getting Started with Cisco Packet Tracer</b> → trong khóa có link tải <b>Packet Tracer</b> cho Windows. Cài đặt mặc định; lần đầu mở sẽ yêu cầu đăng nhập bằng tài khoản NetAcad.",
        tip: "Tên khóa/vị trí link tải có thể thay đổi; tìm mục “Resources” hoặc “Download Packet Tracer” sau khi đăng nhập. Chỉ tải từ trang Cisco."
      },
      {
        title: "Đặt thiết bị & nối dây",
        text: "Kéo vào: 1 router <b>2911</b>, 1 switch <b>2960</b>, 2 PC (<b>PC0</b>, <b>PC1</b>). Nối dây:<br>• PC0 FastEthernet0 → SW1 Fa0/1: <b>Copper Straight-Through</b><br>• SW1 Gig0/1 → R1 Gig0/0: <b>Copper Straight-Through</b><br>• PC1 FastEthernet0 → R1 Gig0/1: <b>Copper Cross-Over</b> (2 thiết bị cùng loại “đầu cuối” nối thẳng)<br>Đèn ở cổng router sẽ <b>đỏ</b> vì cổng router mặc định đang <i>shutdown</i>.",
        code: "PC0 (192.168.10.10) --- SW1 --- Gi0/0 [R1] Gi0/1 --- PC1 (192.168.20.10)\n      Subnet 192.168.10.0/24              Subnet 192.168.20.0/24\n      Gateway 192.168.10.1                Gateway 192.168.20.1",
        tip: "Nếu không chắc loại cáp, dùng biểu tượng tia sét (Automatically Choose Connection Type), nhưng nên tự chọn để luyện kiến thức cáp."
      },
      {
        title: "Cấu hình IP cho 2 PC",
        text: "Bấm PC0 → tab <b>Desktop</b> → <b>IP Configuration</b> → Static: IP <code>192.168.10.10</code>, Subnet Mask <code>255.255.255.0</code>, Default Gateway <code>192.168.10.1</code>. PC1: <code>192.168.20.10</code> / <code>255.255.255.0</code> / gateway <code>192.168.20.1</code>.",
        tip: "Gateway của mỗi PC phải là IP của cổng router <b>cùng subnet</b> với PC đó."
      },
      {
        title: "Làm quen các mode của IOS",
        text: "Bấm R1 → tab <b>CLI</b>. Nếu hỏi <i>Would you like to enter the initial configuration dialog?</i> → gõ <code>no</code>. Quan sát dấu nhắc thay đổi theo mode:",
        code: "Router>                      ! User EXEC mode (chỉ xem cơ bản)\nRouter> enable\nRouter#                      ! Privileged EXEC mode (show, copy, reload)\nRouter# configure terminal\nRouter(config)#              ! Global configuration mode\nRouter(config)# interface gigabitEthernet 0/0\nRouter(config-if)#           ! Interface configuration mode\nRouter(config-if)# exit      ! lùi 1 mức\nRouter(config)# end          ! về thẳng Privileged EXEC (hoặc Ctrl+Z)",
        tip: "Gõ <code>?</code> bất cứ lúc nào để xem lệnh hợp lệ; Tab để tự hoàn thành. Lỗi “% Invalid input” thường do sai mode."
      },
      {
        title: "Cấu hình cơ bản cho router",
        text: "Đặt tên, mật khẩu vào privileged mode (được mã hóa dạng hash), tắt tra DNS khi gõ sai lệnh, thêm banner cảnh báo:",
        code: "enable\nconfigure terminal\nhostname R1\nenable secret Lab@123\nno ip domain-lookup\nbanner motd #Chi danh cho nguoi duoc phep#\nend",
        tip: "<code>enable secret</code> lưu dạng hash; <code>enable password</code> là kiểu cũ, lưu rõ chữ – luôn dùng secret. Mật khẩu ở đây chỉ dùng cho lab."
      },
      {
        title: "Đặt IP cho cổng router & no shutdown",
        text: "Mỗi cổng router là gateway của một subnet. <code>no shutdown</code> để bật cổng – thiếu lệnh này là lỗi số 1 của người mới.",
        code: "configure terminal\ninterface gigabitEthernet 0/0\n description LAN-10 toi SW1\n ip address 192.168.10.1 255.255.255.0\n no shutdown\nexit\ninterface gigabitEthernet 0/1\n description LAN-20 toi PC1\n ip address 192.168.20.1 255.255.255.0\n no shutdown\nend",
        tip: "Sau <code>no shutdown</code> sẽ thấy thông báo “changed state to up”, đèn dây chuyển xanh (switch có thể mất vài giây)."
      },
      {
        title: "Cấu hình cơ bản cho switch",
        text: "Switch 2960 lớp 2 chạy được ngay không cần cấu hình, nhưng admin luôn đặt tên và mật khẩu:",
        code: "enable\nconfigure terminal\nhostname SW1\nenable secret Lab@123\nno ip domain-lookup\nend\nshow mac address-table"
      },
      {
        title: "Kiểm tra bằng lệnh show",
        text: "Trên R1, kiểm tra trạng thái cổng và cấu hình đang chạy:",
        code: "show ip interface brief\n! Mong đợi: Gi0/0 192.168.10.1 up up | Gi0/1 192.168.20.1 up up\nshow running-config\nshow ip route\n! Mong đợi 2 dòng C (connected): 192.168.10.0/24 và 192.168.20.0/24",
        tip: "Status/Protocol: <b>administratively down</b> = quên no shutdown; <b>down/down</b> = lỗi dây hoặc đầu kia tắt; <b>up/down</b> = lỗi lớp 2."
      },
      {
        title: "Ping giữa 2 subnet",
        text: "PC0 → Desktop → <b>Command Prompt</b>: ping gateway trước, rồi ping PC1. Thử thêm <b>Simulation mode</b> (góc dưới phải) để xem gói ARP và ICMP di chuyển từng bước.",
        code: "ping 192.168.10.1\nping 192.168.20.1\nping 192.168.20.10\ntracert 192.168.20.10     ! hop 1 = 192.168.10.1",
        tip: "Gói đầu tiên có thể timeout vì PC/router đang hỏi ARP để tìm MAC – bình thường. Ping từ trong ra ngoài (gateway trước) để khoanh vùng lỗi."
      },
      {
        title: "Lưu cấu hình",
        text: "<b>running-config</b> nằm trong RAM, mất khi khởi động lại; <b>startup-config</b> nằm trong NVRAM. Lưu cả router và switch, sau đó lưu file <code>.pkt</code> (File → Save As) vào thư mục portfolio.",
        code: "copy running-config startup-config\n! Destination filename [startup-config]? -> Enter\nshow startup-config",
        tip: "Viết tắt hay dùng: <code>copy run start</code>, <code>sh ip int br</code>, <code>conf t</code>."
      }
    ],
    verify: [
      "<code>show ip interface brief</code> trên R1: Gi0/0 và Gi0/1 đều <b>up / up</b> với đúng IP.",
      "<code>show ip route</code> có 2 mạng connected 192.168.10.0/24 và 192.168.20.0/24.",
      "PC0 ping được 192.168.20.10 (PC1) và ngược lại.",
      "<code>show startup-config</code> có hostname R1 và IP các cổng (đã lưu).",
      "File .pkt đã lưu."
    ],
    questions: [
      "Kể tên 4 mode IOS đã dùng và dấu nhắc tương ứng.",
      "Vì sao PC0 phải có default gateway mới ping được PC1, nhưng ping được 192.168.10.1 thì không cần?",
      "<code>enable secret</code> khác <code>enable password</code> thế nào?",
      "Khác nhau giữa running-config và startup-config? Nếu quên <code>copy run start</code> rồi tắt router thì sao?",
      "Vì sao PC1 nối thẳng vào router dùng cáp cross-over còn PC0 vào switch dùng straight-through?"
    ],
    output: "File .pkt + sơ đồ có ghi IP + đoạn <code>show ip interface brief</code> và <code>show running-config</code> của R1 + ảnh ping thành công PC0 → PC1."
  }
];
