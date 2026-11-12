window.DATA = window.DATA || {};
// Lab VPS (tùy chọn) – nối thêm vào DATA.labs
DATA.labs = (DATA.labs || []).concat([
  {
    id: "VPS-1",
    track: "chung",
    week: 2,
    optional: true,
    title: "Gia cố VPS Ubuntu 24.04 & điều tra brute force SSH",
    goal: "Biến một VPS vừa thuê (đăng nhập root bằng mật khẩu, mở ra Internet) thành máy chủ được <b>gia cố cơ bản</b>: chỉ đăng nhập bằng SSH key, cấm root đăng nhập từ xa, firewall mặc định chặn, tự vá bảo mật. Sau đó <b>đọc log tấn công thật</b> và <b>xác minh không bị xâm nhập</b> – đúng một vòng công việc của SOC Tier 1.",
    time: "90–120 phút (lần đầu)",
    prereq: [],
    concepts: ["Hardening", "Least privilege", "Attack surface", "Defense in depth", "Asymmetric crypto", "Brute force T1110", "Default accounts T1078.001", "Patch management", "Default deny", "Log correlation"],
    theory: [
      { title: "Hardening (gia cố) & baseline", body: "Hardening là quá trình <b>giảm điểm yếu</b> của hệ thống: tắt thứ không cần, siết cấu hình mặc định, vá lỗi. Kết quả được ghi lại thành <b>baseline configuration</b> – cấu hình chuẩn để so sánh về sau (Khóa 3, Mô-đun 4). Ngoài thực tế người ta dùng bộ khuyến nghị như <b>CIS Benchmark</b>." },
      { title: "Attack surface (bề mặt tấn công)", body: "Mọi thứ kẻ tấn công có thể chạm tới từ bên ngoài: port đang mở, dịch vụ, tài khoản, cách đăng nhập. VPS có IP công khai → <b>cả Internet</b> chạm được. Mục tiêu: chỉ để lộ đúng 1 cửa (SSH 22) và khóa cửa đó thật chắc." },
      { title: "Least privilege (đặc quyền tối thiểu)", body: "Mỗi tài khoản chỉ có quyền vừa đủ dùng. Hằng ngày làm việc bằng user thường, khi cần quyền quản trị mới dùng <code>sudo</code>. Lợi ích: lỡ tay ít gây hại, và <b>mọi lệnh sudo đều được ghi log</b> kèm tên người chạy (accountability – Khóa 5)." },
      { title: "Mật mã bất đối xứng & SSH key", body: "Cặp khóa: <b>khóa bí mật</b> (<code>id_ed25519</code>, giữ trên máy bạn) và <b>khóa công khai</b> (<code>id_ed25519.pub</code>, đặt lên server trong <code>~/.ssh/authorized_keys</code>). Khi đăng nhập, server gửi đề bài ngẫu nhiên, máy bạn <b>ký</b> bằng khóa bí mật, server kiểm tra chữ ký bằng khóa công khai. Khóa bí mật <b>không bao giờ rời máy bạn</b>.<br>Ví dụ đời thường: khóa công khai = <b>ổ khóa</b> lắp lên cửa VPS (ai nhìn thấy cũng không sao); khóa bí mật = <b>chiếc chìa</b> trong túi bạn." },
      { title: "Passphrase ≠ mật khẩu user", body: "<b>Passphrase</b> khóa file khóa bí mật <b>trên máy bạn</b> – máy bạn kiểm tra, không gửi đi đâu. <b>Mật khẩu user</b> (vd của <code>nam</code>) do <b>VPS</b> kiểm tra. Sau khi gia cố: vào VPS bằng <b>key</b> (có thể hỏi passphrase), còn mật khẩu user chỉ dùng cho <code>sudo</code> và đăng nhập Console dự phòng." },
      { title: "Brute force (MITRE T1110) & tài khoản mặc định (T1078.001)", body: "Bot trên Internet liên tục thử username/mật khẩu phổ biến, đặc biệt <b>tài khoản mặc định</b> của cloud và thiết bị IoT (ubuntu, admin, centos, linaro…). Mật khẩu có thể bị đoán; SSH key thì không. Vì vậy <b>tắt đăng nhập bằng mật khẩu</b> vô hiệu hóa gần như toàn bộ kiểu tấn công này – log vẫn ghi lại để phân tích." },
      { title: "Defense in depth (phòng thủ nhiều lớp)", body: "SSH key <b>+</b> cấm root <b>+</b> firewall <b>+</b> vá tự động <b>+</b> mật khẩu sudo <b>+</b> giám sát log. Một lớp hỏng thì còn lớp khác." },
      { title: "Default deny & stateful firewall", body: "UFW mặc định <b>chặn mọi kết nối vào</b>, chỉ mở port được cho phép (allowlist). UFW là firewall <b>stateful</b>: kết nối do VPS chủ động tạo ra (tải bản cập nhật) thì gói trả lời tự được cho vào." },
      { title: "Patch management (quản lý bản vá)", body: "Phần lớn vụ xâm nhập khai thác lỗ hổng <b>đã có bản vá</b> nhưng chưa cập nhật. <code>unattended-upgrades</code> tự cài bản vá bảo mật hằng ngày. Đây cũng là lý do <b>không chọn hệ điều hành đã hết hỗ trợ</b> (CentOS 7, Ubuntu 18.04/20.04)." },
      { title: "Điều tra: correlation, timeline & múi giờ", body: "Đếm số lượt tấn công chưa đủ – câu hỏi quan trọng nhất luôn là <b>“có ai vào được không?”</b>. Cách trả lời: lọc dòng <code>Accepted</code>, đối chiếu IP, đối chiếu <b>fingerprint</b> của key giữa 2 nguồn (log VPS ↔ máy bạn), xem <code>last</code>. Khi dựng timeline phải <b>quy về một múi giờ</b> (log có thể lẫn <code>+00:00</code> và <code>+07:00</code>)." },
      { title: "Không tự khóa mình ở ngoài (change management)", body: "Khi đổi cấu hình truy cập từ xa: <b>giữ 1 phiên đang đăng nhập</b>, kiểm tra cú pháp trước khi áp dụng, thử ở <b>cửa sổ mới</b> rồi mới đóng phiên cũ. Luôn biết đường dự phòng: <b>Console (VNC)</b> trên trang quản lý của nhà cung cấp." }
    ],
    pitfalls: [
      "<b>Gõ lệnh nhầm máy</b>: dấu nhắc <code>root@soc-sensor:~#</code> / <code>nam@soc-sensor:~$</code> = đang ở <b>VPS</b>; <code>PS C:\\...&gt;</code> hoặc <code>C:\\Users\\...&gt;</code> = đang ở <b>Windows</b>. Lệnh tạo/đọc key phải chạy trên Windows.",
      "<b>Nhầm cmd và PowerShell</b>: cmd dùng <code>%USERPROFILE%</code>, PowerShell dùng <code>$env:USERPROFILE</code>. Chắc ăn nhất: gõ đường dẫn đầy đủ <code>C:\\Users\\&lt;tên&gt;\\.ssh\\...</code>.",
      "<b>Quên thay <code>&lt;IP&gt;</code></b>: phải thay bằng IP thật và <b>bỏ cả dấu <code>&lt; &gt;</code></b> (bash hiểu <code>&lt;IP</code> là “đọc từ file tên IP”).",
      "<b>Mật khẩu không hiện khi gõ</b> (không cả dấu *) – bình thường. Nên tạo trong trình quản lý mật khẩu rồi <b>dán bằng chuột phải</b>.",
      "<b>Quên passphrase của key</b>: không lấy lại được → xóa 2 file key, tạo key mới, đưa khóa công khai mới lên (ghi <b>đè</b> khóa cũ).",
      "<b>Lệnh có dấu <code>|</code> cứ báo sai mật khẩu</b> trên Windows → dùng cách dán khóa thủ công (bước 6, cách A).",
      "<b>VPS vẫn hỏi mật khẩu dù đã có key</b>: kiểm tra <code>authorized_keys</code> có đúng <b>khóa mới</b> không (so thời gian sửa file với lúc tạo key), quyền 700/600, chủ sở hữu là user đó.",
      "<b><code>ufw: command not found</code></b>: image của nhà cung cấp là bản rút gọn → <code>sudo apt install -y ufw</code>.",
      "<b>Đóng phiên cũ trước khi kiểm tra</b> → có thể tự khóa mình ở ngoài. Luôn kiểm tra ở cửa sổ mới."
    ],
    steps: [
      {
        title: "Chuẩn bị: biết mình đang gõ lệnh ở đâu",
        text: "Bài này dùng <b>2 nơi</b>: <b>Windows</b> (PowerShell) và <b>VPS</b> (Linux qua SSH). Nhìn <b>dấu nhắc</b> trước khi gõ:<br>• <code>PS C:\\Users\\ADMIN&gt;</code> → Windows PowerShell<br>• <code>C:\\Users\\ADMIN&gt;</code> → Windows cmd<br>• <code>root@soc-sensor:~#</code> / <code>nam@soc-sensor:~$</code> → VPS<br>Trong mọi lệnh, thay <code>&lt;IP&gt;</code> bằng IP thật của VPS và <b>bỏ dấu &lt; &gt;</b>. Chuẩn bị sẵn trình quản lý mật khẩu (Bitwarden / Chrome).",
        why: "Phần lớn lỗi khi mới làm là <b>gõ đúng lệnh nhưng sai chỗ</b>. Dùng PowerShell <b>thường</b> (không cần “Run as Administrator”) – least privilege ngay từ máy của bạn."
      },
      {
        title: "[Windows] Tạo SSH key",
        code: "ssh-keygen -t ed25519 -C \"soc-sensor\"\n# Hỏi chỗ lưu  -> Enter (mặc định)\n# Hỏi passphrase -> đặt và LƯU vào trình quản lý mật khẩu (hoặc Enter 2 lần để bỏ trống)\n# Tạo ra 2 file trong C:\\Users\\<ten>\\.ssh\\\n#   id_ed25519      <- khóa BÍ MẬT, không gửi cho ai\n#   id_ed25519.pub  <- khóa công khai, sẽ đặt lên VPS",
        why: "ed25519 là thuật toán khóa hiện đại: ngắn, nhanh, rất khó phá. Passphrase mã hóa file khóa bí mật – nếu laptop bị lấy file, kẻ trộm vẫn cần passphrase. Dòng <b>fingerprint</b> <code>SHA256:...</code> hiện ra lúc này – hãy chụp lại, bước 14 sẽ dùng để đối chiếu.",
        tip: "Xem lại fingerprint bất cứ lúc nào: <code>ssh-keygen -lf $env:USERPROFILE\\.ssh\\id_ed25519.pub</code>"
      },
      {
        title: "[Windows → VPS] Đăng nhập lần đầu bằng root",
        code: "ssh root@<IP>\n# Lần đầu hỏi: Are you sure you want to continue connecting? -> gõ yes\n# Nhập mật khẩu root nhà cung cấp gửi",
        why: "Câu hỏi đó hiện <b>fingerprint của server</b>. SSH lưu nó vào <code>known_hosts</code>; nếu lần sau fingerprint đổi, SSH cảnh báo <i>REMOTE HOST IDENTIFICATION HAS CHANGED</i> – có thể là tấn công <b>on-path (MITM)</b>. Cơ chế này gọi là TOFU (Trust On First Use).",
        tip: "Giữ cửa sổ root này mở – đây là “đường lui” nếu cấu hình sai."
      },
      {
        title: "[VPS] Đổi mật khẩu root, cập nhật, khởi động lại",
        code: "passwd\napt update && apt upgrade -y\n# Kiểm tra có cần khởi động lại không:\n[ -f /var/run/reboot-required ] && echo \"Can reboot\" || echo \"Khong can reboot\"\nreboot",
        why: "Mật khẩu ban đầu đã đi qua email dạng chữ thường → coi như đã lộ. Image của nhà cung cấp thường cũ, chứa lỗ hổng đã biết → <b>vá trước khi làm gì khác</b>. Thông báo <i>“User sessions running outdated binaries”</i> nghĩa là tiến trình đang chạy vẫn dùng bản cũ trong bộ nhớ → <code>reboot</code> để bản mới có hiệu lực.",
        tip: "Gặp <b>bảng tím</b>: hỏi file cấu hình → chọn <b>keep the local version</b>; hỏi bàn phím / dịch vụ cần restart → <b>Enter</b> giữ mặc định. Dòng <code>Get:205 ... noble-updates ...</code> = đang tải gói thứ 205 (noble = tên mã Ubuntu 24.04). Sau reboot chờ ~1 phút rồi <code>ssh root@&lt;IP&gt;</code> lại."
      },
      {
        title: "[VPS] Đặt múi giờ",
        code: "timedatectl set-timezone Asia/Ho_Chi_Minh\ntimedatectl\n# Cần thấy: Time zone: Asia/Ho_Chi_Minh, System clock synchronized: yes",
        why: "Log có giờ đúng mới dựng được <b>timeline</b>. Lưu ý: các dòng log <b>trước</b> khi đổi sẽ vẫn ghi <code>+00:00</code> (UTC), dòng sau ghi <code>+07:00</code> – bước 14 sẽ gặp lại chuyện này."
      },
      {
        title: "[VPS] Tạo user riêng có quyền sudo",
        code: "adduser nam\n# New password / Retype -> DÁN mật khẩu (chuột phải), màn hình không hiện gì là bình thường\n# Full Name, Room Number, Work Phone... -> Enter bỏ qua\n# Is the information correct? [Y/n] -> Y\nusermod -aG sudo nam\ngroups nam      # phải thấy: nam : nam sudo users",
        why: "<b>Least privilege</b>: không làm việc hằng ngày bằng root. Mật khẩu của <code>nam</code> dùng để <b>xác nhận khi chạy sudo</b> (như mã PIN ATM) và để đăng nhập Console dự phòng – <b>không</b> dùng để SSH sau khi gia cố.",
        tip: "Báo <i>Sorry, passwords do not match</i> → hai lần gõ không khớp; chạy <code>passwd nam</code> (khi đang là root) để đặt lại."
      },
      {
        title: "[Windows + VPS] Đưa khóa công khai lên VPS",
        text: "<b>Cách A – khuyên dùng (không dùng dấu |):</b><br>1) Windows: hiện khóa công khai, <b>bôi đen cả dòng</b> và copy.<br>2) Đăng nhập VPS bằng <code>ssh nam@&lt;IP&gt;</code> (mật khẩu nam).<br>3) Trên VPS: ghi <b>đè</b> khóa vào file (thay dòng trong ngoặc kép bằng dòng bạn vừa copy).",
        code: "# 1) [Windows PowerShell]\ntype $env:USERPROFILE\\.ssh\\id_ed25519.pub\n\n# 2) [Windows]\nssh nam@<IP>\n\n# 3) [VPS - nam]\nmkdir -p ~/.ssh && chmod 700 ~/.ssh\necho \"ssh-ed25519 AAAA...dán-dòng-của-bạn... soc-sensor\" > ~/.ssh/authorized_keys\nchmod 600 ~/.ssh/authorized_keys\ncat ~/.ssh/authorized_keys      # phải đúng dòng khóa vừa dán\nls -la ~/.ssh                   # quyền: drwx------ (700) và -rw------- (600), chủ là nam\n\n# Cách B (1 lệnh, chạy trên Windows PowerShell - có máy bị lỗi nhập mật khẩu khi có dấu |):\n# type $env:USERPROFILE\\.ssh\\id_ed25519.pub | ssh nam@<IP> \"mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat > ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys\"",
        why: "VPS cần biết trước <b>“ổ khóa nào khớp với chìa của bạn”</b> – đó là <code>authorized_keys</code>. Lần đầu chưa có khóa trên VPS nên buộc phải vào bằng mật khẩu đúng 1 lần để đặt khóa (bài toán con gà – quả trứng). Dấu <code>&gt;</code> ghi <b>đè</b> (xóa khóa cũ); <code>&gt;&gt;</code> ghi thêm. Quyền <b>700/600</b> là bắt buộc: SSH từ chối dùng key nếu người khác có thể sửa file này.",
        tip: "Khóa công khai hiện ra màn hình hay copy đi đều an toàn – chỉ file <b>không có đuôi .pub</b> mới phải giữ kín."
      },
      {
        title: "[Windows → VPS] Thử đăng nhập bằng key + sudo",
        code: "ssh nam@<IP>\n# ĐÚNG: chỉ hỏi 'Enter passphrase for key ...' (hoặc không hỏi gì nếu bỏ trống)\n# SAI : hỏi \"nam@...'s password:\" -> VPS chưa nhận key, xem lại bước 6\nsudo whoami      # nhập mật khẩu nam -> kết quả: root",
        why: "Nguyên tắc <b>kiểm tra trước khi cắt</b>: phải chắc đăng nhập bằng key chạy được thì mới tắt đăng nhập mật khẩu, nếu không sẽ tự khóa mình ở ngoài.",
        tip: "Hỏi <b>passphrase</b> = máy bạn mở khóa file key (tốt). Hỏi <b>password</b> = VPS đòi mật khẩu user (key chưa được nhận)."
      },
      {
        title: "[VPS] Siết cấu hình SSH & áp dụng",
        text: "Làm trong phiên <code>nam</code>. <b>Giữ ít nhất 1 cửa sổ đang đăng nhập.</b>",
        code: "sudo tee /etc/ssh/sshd_config.d/00-hardening.conf > /dev/null << 'EOF'\nPermitRootLogin no\nPasswordAuthentication no\nKbdInteractiveAuthentication no\nPubkeyAuthentication yes\nMaxAuthTries 3\nLoginGraceTime 30\nX11Forwarding no\nEOF\nsudo sshd -t && echo \"Cu phap OK\"\n\n# Chỉ khi thấy 'Cu phap OK':\nsudo systemctl restart ssh\nsudo sshd -T | grep -Ei 'permitrootlogin|passwordauthentication|kbdinteractive|maxauthtries'\n# Đúng: permitrootlogin no / passwordauthentication no / kbdinteractiveauthentication no / maxauthtries 3",
        why: "<b>PermitRootLogin no</b>: bot luôn nhắm <code>root</code>. <b>PasswordAuthentication no</b> + <b>KbdInteractive no</b>: chặn mọi kiểu đăng nhập mật khẩu → brute force vô dụng. <b>MaxAuthTries / LoginGraceTime</b>: giới hạn số lần thử và thời gian chờ. File tên <code>00-</code> vì SSH đọc <code>sshd_config.d</code> theo thứ tự tên và <b>giá trị đọc được đầu tiên sẽ thắng</b> – không bị file khác (vd <code>50-cloud-init.conf</code>) bật lại mật khẩu. <code>sshd -T</code> in giá trị <b>thực sự đang dùng</b>.",
        tip: "<code>sshd -t</code> báo lỗi thì <b>không restart</b> – sửa file trước."
      },
      {
        title: "[Windows] Kiểm thử 2 chiều – rồi mới đóng phiên cũ",
        code: "# 1) Phải VÀO ĐƯỢC:\nssh nam@<IP>          # rồi gõ exit\n\n# 2) Phải BỊ CHẶN:\nssh root@<IP>\n#   -> Permission denied (publickey).\n\n# 3) Ép dùng mật khẩu - phải BỊ CHẶN, không hề hỏi mật khẩu:\nssh -o PubkeyAuthentication=no -o PreferredAuthentications=password nam@<IP>\n#   -> Permission denied (publickey).",
        why: "Cấu hình bảo mật chỉ đáng tin khi bạn đã thấy nó <b>chặn đúng thứ cần chặn</b>. Chữ <code>(publickey)</code> cuối dòng = VPS giờ chỉ chấp nhận 1 cách đăng nhập (trước đó là <code>(publickey,password)</code>)."
      },
      {
        title: "[VPS] Bật firewall UFW (mặc định chặn)",
        code: "sudo apt install -y ufw          # image rút gọn có thể chưa có ufw\nsudo ufw default deny incoming\nsudo ufw default allow outgoing\nsudo ufw allow 22/tcp comment 'SSH'\nsudo ufw enable                  # hỏi Proceed? -> y\nsudo ufw status verbose\n# Đúng: Status: active / Default: deny (incoming), allow (outgoing) / chỉ có 22/tcp ALLOW IN",
        why: "<b>Default deny</b>: chặn hết, chỉ mở thứ cần (allowlist) → thu nhỏ attack surface. Sau này lỡ cài dịch vụ mở thêm port, firewall vẫn chặn cho tới khi bạn chủ động cho phép – một lớp trong <b>defense in depth</b>. <i>“enabled on system startup”</i> = tự bật lại sau mỗi lần khởi động.",
        tip: "Luôn <code>allow 22/tcp</code> <b>trước</b> <code>ufw enable</code>, nếu không có thể bị cắt SSH."
      },
      {
        title: "[VPS] Bật tự động cập nhật bảo mật",
        code: "sudo apt install -y unattended-upgrades\nsudo dpkg-reconfigure -plow unattended-upgrades   # chọn <Yes>\nsystemctl status unattended-upgrades --no-pager   # Active: active (running)\nsystemctl list-timers 'apt-daily*'                # lịch chạy cập nhật hằng ngày",
        why: "Lỗ hổng mới công bố gần như mỗi tuần; bot khai thác chỉ vài ngày sau → cần <b>vá tự động</b>. Dịch vụ tên <i>“Unattended Upgrades Shutdown”</i> chỉ lo không tắt máy giữa lúc cài; việc cập nhật do <b>timer apt-daily</b> chạy. Cảnh báo <i>“journal files were not opened due to insufficient permissions”</i> = user thường không đọc hết log hệ thống – least privilege, không phải lỗi."
      },
      {
        title: "[VPS] Xem VPS đang mở cửa nào ra ngoài",
        code: "sudo ss -tulpn\n# Đúng: chỉ có\n# tcp LISTEN 0.0.0.0:22   users:((\"sshd\",...),(\"systemd\",pid=1,...))\n# tcp LISTEN [::]:22      ...",
        why: "Xác định <b>attack surface</b>: <code>0.0.0.0:</code> / <code>[::]:</code> = nghe trên mọi địa chỉ (người ngoài chạm tới được); <code>127.0.0.x</code> = chỉ nội bộ. <code>systemd pid=1</code> xuất hiện vì Ubuntu 24.04 dùng <b>socket activation</b> cho SSH – bình thường."
      },
      {
        title: "[VPS] Đọc các lượt tấn công đầu tiên",
        text: "Để VPS chạy vài giờ (càng lâu càng nhiều dữ liệu) rồi đếm và xếp hạng.",
        code: "ls -la /var/log/auth.log    # có file thì dùng các lệnh dưới\n\n# Tổng số lượt thử username không tồn tại\nsudo grep -c \"Invalid user\" /var/log/auth.log\n# Top 10 username bị thử\nsudo grep -oP 'Invalid user \\K\\S+' /var/log/auth.log | sort | uniq -c | sort -nr | head\n# Top 10 IP tấn công\nsudo grep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' /var/log/auth.log | sort | uniq -c | sort -nr | head\n\n# Nếu KHÔNG có auth.log -> đọc qua journal:\n# sudo journalctl -u ssh --since \"2 days ago\" | grep -c \"Invalid user\"",
        why: "Từ log thô → <b>đếm, nhóm, xếp hạng</b> để thấy mẫu tấn công (grep/sort/uniq – Khóa 4). Cách đọc kết quả:<br>• Username kiểu <code>ubuntu, admin, centos, linaro</code> = danh sách <b>tài khoản mặc định</b> của cloud/IoT → <b>T1110.001 Password Guessing</b>, <b>T1078.001 Default Accounts</b>.<br>• Nhiều IP <b>cùng dải /24</b>, số lượt <b>đều nhau</b> = botnet chia tải → <b>brute force phân tán</b>.",
        tip: "<code>grep -oP</code> + <code>\\K</code> = chỉ in phần nằm sau mẫu. <code>sort | uniq -c | sort -nr</code> = đếm và xếp từ nhiều đến ít. Tra vài IP top trên <b>AbuseIPDB</b>. <b>Không bao giờ tấn công ngược</b> – vi phạm pháp luật, và nhiều IP là máy nạn nhân bị chiếm."
      },
      {
        title: "[VPS] Xác minh: có ai vào được không?",
        code: "# 1) Mọi lượt đăng nhập THÀNH CÔNG - chỉ được là của bạn\nsudo grep \"Accepted\" /var/log/auth.log\n# 2) Root bị thử bao nhiêu lần (tất cả phải thất bại)\nsudo grep -c \"Failed password for root\" /var/log/auth.log\n# 3) Lịch sử phiên đăng nhập & khởi động\nlast -i | head -20\nlast -x reboot | head\nuptime",
        why: "Đây là câu hỏi số 1 của SOC. Kết quả an toàn:<br>• Mọi dòng <code>Accepted</code> đều từ <b>IP nhà bạn</b>; dòng mới nhất là <code>Accepted publickey</code>.<br>• <b>Fingerprint</b> trong dòng <code>Accepted publickey ... ED25519 SHA256:...</code> <b>khớp</b> với fingerprint lúc tạo key ở bước 2 → chứng minh chính key của bạn (correlation 2 nguồn).<br>• Giờ có thể lẫn <code>+00:00</code> và <code>+07:00</code> vì đổi múi giờ giữa chừng → quy về 1 múi giờ khi dựng timeline.<br>• Trong <code>last</code>, dòng <code>reboot system boot</code> = mỗi lần máy khởi động; <code>down</code> = phiên kết thúc vì máy tắt; <code>still running</code> = chạy liên tục tới giờ. Mọi lần reboot phải khớp với lúc <b>bạn</b> chạy <code>reboot</code>.<br>• Thấy <code>Accepted</code> từ IP lạ, hoặc reboot không ai ra lệnh → <b>sự cố thật</b>, dừng lại và điều tra.",
        tip: "Mỗi lệnh <code>sudo</code> bạn chạy cũng bị ghi vào log (<code>sudo: nam : TTY=... COMMAND=...</code>) – accountability."
      },
      {
        title: "Ghi baseline & viết writeup",
        text: "Chép vào ô ghi chú bên dưới: file đã tạo/sửa, kết quả <code>sshd -T</code>, <code>ufw status verbose</code>, <code>ss -tulpn</code>, số liệu tấn công và kết luận xác minh. <b>Che IP VPS và IP nhà bạn</b> trước khi đăng lên GitHub.",
        why: "<b>Baseline configuration</b>: cấu hình chuẩn đã kiểm chứng. Sau này nghi bị xâm nhập, so với baseline để phát hiện thay đổi lạ: user mới, port mới, <code>authorized_keys</code> bị sửa (dấu hiệu persistence <b>T1098.004</b>)."
      }
    ],
    verify: [
      "<code>ssh nam@&lt;IP&gt;</code> vào được bằng key (chỉ hỏi passphrase, không hỏi mật khẩu user).",
      "<code>ssh root@&lt;IP&gt;</code> và đăng nhập ép bằng mật khẩu đều bị <b>Permission denied (publickey)</b>.",
      "<code>sudo sshd -T</code>: <code>permitrootlogin no</code>, <code>passwordauthentication no</code>.",
      "<code>sudo ufw status verbose</code>: <i>Status: active</i>, <i>Default: deny (incoming)</i>, chỉ 22/tcp.",
      "<code>systemctl status unattended-upgrades</code>: <i>active (running)</i>.",
      "<code>sudo ss -tulpn</code>: chỉ SSH lắng nghe ra ngoài.",
      "Có số liệu: tổng lượt, top username, top IP – và giải thích được ý nghĩa.",
      "Mọi dòng <code>Accepted</code> đều là của bạn; fingerprint key khớp; <code>last</code> không có phiên lạ."
    ],
    questions: [
      "Vì sao đăng nhập bằng SSH key an toàn hơn mật khẩu? Khóa bí mật có bao giờ được gửi lên server không?",
      "Passphrase của key và mật khẩu user khác nhau thế nào? Mỗi cái do máy nào kiểm tra?",
      "Vì sao vẫn tắt đăng nhập root dù đã dùng key? Mật khẩu sudo còn có ích gì?",
      "Nếu fingerprint của server đột nhiên thay đổi khi bạn SSH vào, có thể đang xảy ra chuyện gì?",
      "Default deny là gì? Vì sao phải <code>allow 22/tcp</code> trước khi <code>ufw enable</code>?",
      "Nhìn top username <code>ubuntu, admin, linaro</code> và nhiều IP cùng dải /24, bạn kết luận gì? Map sang MITRE nào?",
      "Làm sao chứng minh không có ai đăng nhập trái phép? Vì sao log có thể lẫn hai múi giờ?",
      "Kể tên các lớp phòng thủ trong lab này theo tư duy defense in depth."
    ],
    output: "Writeup <b>\"Gia cố VPS Ubuntu 24.04 & điều tra brute force SSH\"</b>: (1) các bước gia cố + lý do; (2) <code>sshd -T</code>, <code>ufw status verbose</code>, <code>ss -tulpn</code>; (3) số liệu tấn công: thời gian quan sát, tổng lượt, top username và ý nghĩa, top IP và nhận xét dải mạng, MITRE T1110.001 / T1078.001; (4) xác minh không xâm nhập: lọc <code>Accepted</code>, đối chiếu fingerprint, <code>last</code>, lưu ý múi giờ; (5) bài học & đề xuất (fail2ban, Wazuh agent). <b>Che IP VPS và IP nhà bạn.</b>"
  }
]);
