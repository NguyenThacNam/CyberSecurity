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
    keycards: [
      { front: "Vì sao đăng nhập SSH bằng key an toàn hơn bằng mật khẩu?", def: "Key dựa trên <b>mật mã bất đối xứng</b>: server chỉ giữ khóa công khai, máy bạn ký một đề bài ngẫu nhiên bằng khóa bí mật – <b>khóa bí mật không bao giờ được gửi đi</b>. Mật khẩu thì có thể bị <b>brute force</b> hoặc lộ; key ed25519 không thể đoán thử trong thực tế.", example: "Mật khẩu = khóa số ai đứng ngoài cũng bấm thử được; key = chìa vật lý chỉ bạn giữ.", trap: "Khóa công khai (.pub) lộ ra không sao; chỉ file KHÔNG có đuôi .pub mới phải giữ kín.", interview: "Bạn gia cố SSH trên một VPS mới như thế nào?" },
      { front: "Passphrase của SSH key khác mật khẩu user ở điểm nào?", def: "<b>Passphrase</b> mã hóa file khóa bí mật <b>trên máy bạn</b> – máy bạn kiểm tra. <b>Mật khẩu user</b> do <b>server</b> kiểm tra. Sau khi gia cố: vào bằng key (có thể hỏi passphrase), mật khẩu user chỉ dùng cho <code>sudo</code> và Console dự phòng.", trap: "SSH hỏi 'Enter passphrase for key' = tốt (key đang được dùng); hỏi \"user@host's password\" = server chưa nhận key.", interview: "Nếu laptop chứa SSH key bị mất, passphrase giúp gì?" },
      { front: "<code>PermitRootLogin no</code> và <code>PasswordAuthentication no</code> có tác dụng gì?", def: "Cấm tài khoản <b>root</b> đăng nhập qua SSH (bot luôn nhắm root vì ai cũng biết tên) và <b>tắt hoàn toàn đăng nhập bằng mật khẩu</b> → brute force vô dụng. Đặt trong file <code>/etc/ssh/sshd_config.d/00-…conf</code> vì giá trị đọc được đầu tiên sẽ thắng.", trap: "Phải thử đăng nhập bằng key ở cửa sổ MỚI thành công trước khi tắt mật khẩu, nếu không sẽ tự khóa mình ở ngoài.", interview: "Sau khi sửa cấu hình SSH, bạn kiểm tra nó có hiệu lực bằng cách nào? (<code>sshd -t</code>, <code>sshd -T</code>, thử 2 chiều)" },
      { front: "File <code>~/.ssh/authorized_keys</code> là gì? Vì sao SOC để ý file này?", def: "Danh sách khóa công khai <b>được phép đăng nhập</b> vào user đó. Quyền bắt buộc: thư mục 700, file 600. Kẻ tấn công hay <b>thêm key của chúng vào đây để quay lại</b> – persistence <b>MITRE T1098.004</b>.", example: "Như danh sách ổ khóa được lắp trên cửa – thêm một ổ lạ là có người khác vào được.", trap: "<code>&gt;</code> ghi đè (xóa key cũ), <code>&gt;&gt;</code> ghi thêm.", interview: "Nghi một máy Linux bị cài cửa hậu, bạn kiểm tra những file nào?" },
      { front: "UFW <code>default deny incoming</code> nghĩa là gì? Vì sao phải <code>allow 22/tcp</code> trước <code>ufw enable</code>?", def: "<b>Default deny</b>: chặn mọi kết nối vào, chỉ mở port được cho phép (allowlist) → thu nhỏ attack surface. Nếu bật firewall trước khi mở 22, phiên SSH có thể bị cắt và bạn mất quyền truy cập.", trap: "UFW là firewall stateful: kết nối do VPS chủ động tạo ra (tải update) thì gói trả lời vẫn được vào dù deny incoming.", interview: "Allowlist và denylist khác nhau thế nào? Cái nào an toàn hơn?" },
      { front: "Fingerprint của server đột nhiên thay đổi khi SSH vào – có thể là gì?", def: "SSH cảnh báo <i>REMOTE HOST IDENTIFICATION HAS CHANGED</i>. Có thể server được <b>cài lại</b> (vô hại) hoặc đang bị tấn công <b>on-path / MITM</b>. Không được bỏ qua – xác minh với nhà cung cấp/console trước khi xóa dòng cũ trong <code>known_hosts</code>.", interview: "TOFU (Trust On First Use) là gì và điểm yếu của nó?" },
      { front: "Log có top username <code>ubuntu, admin, centos, linaro</code> từ nhiều IP cùng dải /24, số lượt đều nhau – kết luận gì?", def: "Bot dùng danh sách <b>tài khoản mặc định</b> của cloud/IoT → <b>T1110.001 Password Guessing</b> + cố lạm dụng <b>T1078.001 Default Accounts</b>. Nhiều IP cùng dải chia tải đều = <b>brute force phân tán</b> (botnet).", trap: "Chặn từng IP ít hiệu quả vì botnet đổi IP liên tục – biện pháp gốc là tắt mật khẩu, dùng key.", interview: "Bạn nhận cảnh báo hàng nghìn lần SSH thất bại trên một server – bạn làm gì?" },
      { front: "Sau một đợt brute force, làm sao chứng minh không ai đăng nhập trái phép?", def: "Lọc mọi dòng <code>Accepted</code> trong <code>auth.log</code> → chỉ được là IP của mình; đối chiếu <b>fingerprint</b> key trong log với key của mình; xem <code>last -i</code> không có phiên lạ; kiểm tra reboot khớp với lúc mình làm. Quy về <b>một múi giờ</b> khi dựng timeline.", trap: "Chỉ đếm số lượt tấn công là chưa đủ – câu hỏi số 1 luôn là “có ai vào được không?”.", interview: "Vì sao log trên cùng một máy có thể lẫn +00:00 và +07:00? Ảnh hưởng gì khi điều tra?" }
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
        code: "ls -la /var/log/auth.log    # có file thì dùng các lệnh dưới\n\n# Chỉ lấy dòng của sshd (tránh đếm cả dòng log do chính lệnh sudo grep của bạn sinh ra)\nsudo grep 'sshd\\[' /var/log/auth.log > ~/sshd.log\n# Tổng số lượt thử username không tồn tại\ngrep -c \"Invalid user\" ~/sshd.log\n# Top 10 username bị thử\ngrep -oP 'Invalid user \\K\\S+' ~/sshd.log | sort | uniq -c | sort -nr | head\n# Top 10 IP tấn công\ngrep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' ~/sshd.log | sort | uniq -c | sort -nr | head\n\n# Nếu KHÔNG có auth.log -> đọc qua journal:\n# sudo journalctl -u ssh --since \"2 days ago\" | grep -c \"Invalid user\"",
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
  },

  {
    id: "VPS-2",
    track: "chung",
    week: 2,
    optional: true,
    title: "Kiểm kê hệ thống mới nhận & lập baseline hiệu năng",
    goal: "Với một máy chủ vừa nhận: <b>kiểm kê</b> tài khoản, quyền, tác vụ định kỳ, dịch vụ để tìm thứ bất thường (dấu hiệu <b>persistence</b>); <b>tắt dịch vụ thừa</b>; rồi <b>đo baseline hiệu năng</b> (CPU, RAM, ổ đĩa, mạng, steal) và <b>tra nguồn gốc IP</b> (ASN). Có baseline thì sau này mới nhận ra bất thường.",
    time: "60–75 phút",
    prereq: ["VPS-1"],
    concepts: ["Asset inventory", "Persistence TA0003", "Baseline", "Anomaly detection", "Steal time", "IOPS", "ASN / OSINT", "Shared responsibility"],
    theory: [
      { title: "Kiểm kê tài sản & kiểm tra hệ thống (asset inventory / system audit)", body: "Không bảo vệ được thứ mình không biết là có. Khi nhận một máy mới – hoặc khi nghi bị xâm nhập – việc đầu tiên là liệt kê: <b>ai</b> đăng nhập được, <b>ai</b> có quyền quản trị, <b>cái gì</b> tự chạy định kỳ, <b>dịch vụ nào</b> đang chạy, <b>port nào</b> đang mở." },
      { title: "Persistence – kẻ tấn công “cắm rễ” thế nào (MITRE TA0003)", body: "Sau khi vào được, kẻ tấn công tìm cách <b>quay lại được</b> kể cả khi máy khởi động lại hay bị đổi mật khẩu: tạo tài khoản mới (<b>T1136</b>), thêm SSH key (<b>T1098.004</b>), thêm cron (<b>T1053.003</b>), tạo dịch vụ systemd (<b>T1543.002</b>). Bài kiểm kê này chính là đi tìm những dấu vết đó." },
      { title: "Baseline & phát hiện bất thường", body: "<b>Baseline</b> = mức “bình thường” của hệ thống (CPU, RAM, mạng, danh sách dịch vụ…). Có baseline mới nhận ra <b>bất thường</b>: CPU đang 2% bỗng 100% liên tục có thể là <b>đào coin trái phép – cryptojacking, MITRE T1496</b> (Khóa 5); lưu lượng ra ngoài tăng vọt có thể là <b>đánh cắp dữ liệu</b> (exfiltration)." },
      { title: "Ảo hóa: KVM vs OpenVZ/LXC, steal time", body: "<b>KVM</b>: ảo hóa đầy đủ, mỗi VPS có kernel riêng, tài nguyên tách bạch. <b>OpenVZ/LXC</b>: dùng chung kernel với máy chủ, dễ bị bán quá tải (oversell). <b>Steal time (st)</b> = % thời gian CPU ảo của bạn phải chờ vì máy chủ vật lý đang phục vụ VPS khác. Gần 0 là tốt; thường xuyên &gt;5–10% là dấu hiệu oversell." },
      { title: "Ổ đĩa: IOPS, throughput, vì sao 4k quan trọng", body: "<b>IOPS</b> = số thao tác đọc/ghi mỗi giây; <b>throughput</b> = MB/s. Máy chủ ghi log, database chủ yếu thao tác <b>khối nhỏ 4k</b> → chỉ số 4k IOPS phản ánh trải nghiệm thật nhất. File lớn (512k–1m) cho số MB/s cao nhưng ít liên quan công việc hằng ngày." },
      { title: "RAM, swap và OOM killer", body: "Hết RAM mà không có <b>swap</b> (phần ổ đĩa dùng làm RAM dự phòng), kernel gọi <b>OOM killer</b> giết bớt tiến trình – có thể giết đúng dịch vụ quan trọng. Có swap: chậm hơn nhưng không sập. Cột <code>available</code> trong <code>free -h</code> mới là RAM thực sự còn dùng được (buff/cache có thể giải phóng)." },
      { title: "ASN & OSINT cơ bản", body: "<b>ASN</b> (Autonomous System Number) = mã định danh một mạng trên Internet (nhà mạng, cloud, công ty hosting). Tra IP → ASN cho biết IP thuộc <b>ai, ở đâu, loại mạng gì</b>. SOC dùng hằng ngày để <b>làm giàu dữ liệu</b> (enrichment) cho IP tấn công: IP từ cloud/hosting giá rẻ hay IP nhà dân bị chiếm?" },
      { title: "Shared responsibility với nhà cung cấp", body: "Nhà cung cấp kiểm soát <b>máy chủ vật lý và hypervisor</b> – về kỹ thuật họ luôn có toàn quyền với máy ảo của bạn (<code>qemu-guest-agent</code> là công cụ của họ). Bạn chịu trách nhiệm phần <b>bên trong</b> hệ điều hành. Vì vậy không để dữ liệu nhạy cảm thật trên VPS lab." }
    ],
    pitfalls: [
      "<b>Chạy YABS lúc VPS đang bận</b> (vd đang cập nhật) → kết quả thấp hơn thực tế. Chạy lúc máy rảnh, và nếu nghi ngờ thì chạy lại.",
      "<b>Đo steal 5 giây lúc sáng sớm</b> rồi kết luận “ổn” → chưa đủ. Đo lại vào giờ cao điểm tối 20–23h.",
      "<b>Tắt nhầm dịch vụ cần thiết</b> (ssh, systemd-networkd, rsyslog, qemu-guest-agent, getty@tty1) → mất kết nối, mất log hoặc mất Console dự phòng. Chỉ tắt đúng danh sách dịch vụ thừa.",
      "<b>Thấy RAM 'free' thấp</b> rồi tưởng thiếu RAM → nhìn cột <code>available</code>, không phải <code>free</code>.",
      "<b>Chạy script tải từ Internet thẳng vào bash</b> (<code>curl … | bash</code>) với nguồn không tin cậy → có thể bị cài mã độc. Chỉ làm với nguồn nổi tiếng, kiểm tra được (YABS trên GitHub)."
    ],
    keycards: [
      { front: "Khi nhận một máy chủ Linux mới (hoặc nghi bị xâm nhập), kiểm tra những gì để tìm persistence?", def: "• User đăng nhập được & user có UID 0<br>• Ai có sudo (<code>group sudo</code>, <code>/etc/sudoers.d/</code>)<br>• <code>authorized_keys</code> của root và các user<br>• Cron & systemd timers<br>• Dịch vụ đang chạy / được bật khi khởi động<br>• Port đang lắng nghe (<code>ss -tulpn</code>)", trap: "Chỉ xem port mở là chưa đủ – cron và SSH key không mở port nào nhưng vẫn là cửa hậu.", interview: "Kể các kỹ thuật persistence trên Linux và cách phát hiện từng cái." },
      { front: "Steal time (cột <code>st</code>) là gì? Bao nhiêu thì đáng lo?", def: "% thời gian CPU ảo phải <b>chờ</b> vì máy chủ vật lý đang phục vụ VPS khác. Gần 0 là tốt; thường xuyên &gt;5–10% (nhất là giờ cao điểm) là dấu hiệu nhà cung cấp <b>bán quá tải</b>.", example: "Như thuê chung bếp: bạn đứng chờ vì người khác đang dùng bếp.", interview: "VPS chạy chậm dù CPU usage thấp – bạn kiểm tra gì?" },
      { front: "KVM khác OpenVZ/LXC thế nào?", def: "<b>KVM</b>: ảo hóa đầy đủ, kernel riêng, tài nguyên tách bạch. <b>OpenVZ/LXC</b>: container dùng chung kernel với máy chủ, nhẹ hơn nhưng dễ oversell và hạn chế (không tự đổi kernel, khó chạy một số phần mềm). Kiểm tra bằng <code>systemd-detect-virt</code>.", interview: "Máy ảo (VM) và container khác nhau thế nào về cô lập bảo mật?" },
      { front: "IOPS khác throughput thế nào? Vì sao 4k IOPS quan trọng với máy chủ log?", def: "<b>IOPS</b> = số thao tác đọc/ghi mỗi giây; <b>throughput</b> = MB/s. Ghi log, database là nhiều thao tác <b>nhỏ (4k)</b> → 4k IOPS phản ánh hiệu năng thật. Ví dụ VPS lab: 4k ≈ 70k IOPS / 290 MB/s → NVMe thật.", trap: "Số GB/s rất to ở khối 1m dễ gây ấn tượng nhưng ít liên quan công việc hằng ngày." },
      { front: "Baseline hiệu năng giúp gì cho SOC? Cho ví dụ.", def: "Biết mức bình thường mới phát hiện được <b>bất thường</b>. Ví dụ: CPU thường 2% bỗng 100% liên tục → nghi <b>cryptojacking (T1496)</b>; lưu lượng ra ngoài tăng đột biến lúc 2h sáng → nghi <b>exfiltration</b>; xuất hiện dịch vụ/port mới không có trong baseline → nghi persistence.", interview: "Anomaly-based detection khác signature-based detection thế nào?" },
      { front: "Load average trong <code>uptime</code> đọc thế nào?", def: "3 số = số tiến trình đang chạy/chờ CPU trung bình trong <b>1, 5, 15 phút</b>. So với <b>số nhân CPU</b> (<code>nproc</code>): VPS 1 nhân mà load ≈ 1 là đang dùng hết; &gt; 1 kéo dài là quá tải.", trap: "Load 2.0 trên máy 4 nhân là bình thường; trên máy 1 nhân là quá tải." },
      { front: "ASN là gì? Tra ASN của một IP để làm gì?", def: "<b>Autonomous System Number</b> – mã định danh một mạng (nhà mạng, cloud, hosting). Tra IP → ASN biết IP thuộc tổ chức nào, ở đâu → <b>làm giàu dữ liệu</b> (enrichment) khi điều tra IP tấn công, hoặc xác minh nhà cung cấp.", example: "VPS lab: AS151858 Interdigi, host IDATA, Đà Nẵng – khớp với thông tin pháp nhân đã tra.", interview: "Bạn nhận một IP đáng ngờ trong cảnh báo – bạn tra những nguồn nào?" },
      { front: "Swap là gì? Không có swap thì chuyện gì xảy ra khi hết RAM?", def: "Swap = phần ổ đĩa dùng làm RAM dự phòng. Không có swap, khi hết RAM kernel gọi <b>OOM killer</b> giết bớt tiến trình (có thể là dịch vụ quan trọng). Có swap: chậm hơn nhưng không sập.", trap: "Xem RAM còn dùng được ở cột <code>available</code>, không phải <code>free</code>." }
    ],
    steps: [
      {
        title: "[VPS] Kiểm tra tài khoản & quyền",
        code: "# User có thể đăng nhập shell\nawk -F: '$7 ~ /(bash|sh)$/ {print $1}' /etc/passwd\n# User có UID 0 (quyền root) - chỉ được là root\nawk -F: '$3 == 0 {print $1}' /etc/passwd\n# Ai có sudo\ngetent group sudo\nsudo ls -la /etc/sudoers.d/\n# Root có SSH key nào không\nsudo cat /root/.ssh/authorized_keys 2>/dev/null || echo \"Khong co\"",
        why: "Tìm tài khoản lạ (<b>T1136</b>), tài khoản có UID 0 giả danh root, quyền sudo được cấp ngầm, và SSH key lạ (<b>T1098.004</b>) – các cách cắm rễ phổ biến nhất.",
        tip: "Kết quả mong đợi: chỉ <code>root</code> và user của bạn; UID 0 chỉ có root; sudoers.d chỉ có <code>README</code>. Nếu root có key lạ: có thể của nhà cung cấp – SSH root đã bị cấm (VPS-1) nhưng vẫn nên ghi nhận."
      },
      {
        title: "[VPS] Kiểm tra tác vụ định kỳ (cron & timers)",
        code: "sudo crontab -l 2>/dev/null; crontab -l 2>/dev/null\nls /etc/cron.d/ /etc/cron.daily/\nsystemctl list-timers --all --no-pager | head -20",
        why: "Cron/timer lạ là cách kẻ tấn công tự chạy lại mã độc định kỳ (<b>T1053.003</b>). Trên Ubuntu mới, chỉ thấy các tác vụ chuẩn như <code>e2scrub_all</code>, <code>sysstat</code>, <code>apt-daily</code>, <code>logrotate</code>."
      },
      {
        title: "[VPS] Kiểm tra dịch vụ đang chạy",
        code: "systemctl list-units --type=service --state=running --no-pager\nsystemctl list-unit-files --type=service --state=enabled --no-pager",
        why: "Dịch vụ systemd lạ là một kiểu persistence (<b>T1543.002</b>). Bảng tham khảo trên VPS Ubuntu:<br>• <b>Cần giữ</b>: ssh, cron, rsyslog, systemd-journald/logind/networkd/timesyncd/udevd, dbus, polkit, unattended-upgrades, <b>qemu-guest-agent</b> (công cụ của nhà cung cấp), <b>getty@tty1</b> (Console dự phòng).<br>• <b>Thừa trên VPS</b>: ModemManager (modem 3G/4G), upower (pin), udisks2 (USB), fwupd (firmware), multipathd (ổ SAN)."
      },
      {
        title: "[VPS] Tắt dịch vụ thừa & so RAM trước/sau",
        code: "free -h                       # ghi lại cột available TRƯỚC\nsudo systemctl disable --now ModemManager upower udisks2 fwupd multipathd multipathd.socket\nsystemctl list-units --type=service --state=running --no-pager | grep -c running\nfree -h                       # available SAU",
        why: "<b>Hardening</b>: không cần thì tắt → ít phần mềm có thể chứa lỗ hổng hơn (giảm attack surface) và tiết kiệm RAM – quan trọng với VPS 1GB.",
        tip: "Báo <code>Unit ... not found</code> với dịch vụ nào thì bỏ qua – nghĩa là nó không tồn tại trên image của bạn."
      },
      {
        title: "[VPS] Thêm swap 1GB",
        code: "sudo fallocate -l 1G /swapfile && sudo chmod 600 /swapfile\nsudo mkswap /swapfile && sudo swapon /swapfile\necho '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab\nfree -h        # dòng Swap: 1.0Gi",
        why: "Tránh <b>OOM killer</b> giết dịch vụ khi sau này cài thêm Wazuh agent / honeypot. Quyền <b>600</b> vì swap có thể chứa dữ liệu từ RAM (mật khẩu, khóa) – không cho user khác đọc.",
        tip: "Dòng <code>/etc/fstab</code> giúp swap tự bật lại sau mỗi lần khởi động. Chỉ chạy lệnh <code>echo ... tee -a</code> <b>một lần</b>, chạy 2 lần sẽ bị lặp dòng."
      },
      {
        title: "[VPS] Cấu hình thật & loại ảo hóa",
        code: "nproc; free -h; df -h /\nlscpu | grep -E 'Model name|Hypervisor'\nsystemd-detect-virt        # tốt nhất: kvm",
        why: "Đối chiếu với gói đã mua (số nhân, RAM, ổ đĩa) và xác định <b>KVM</b> hay container (OpenVZ/LXC). Ví dụ VPS lab: 1 nhân, 961Mi RAM (1GB – kernel giữ một phần), 20G, KVM, Xeon Platinum 8171M."
      },
      {
        title: "[VPS] Đo tải CPU & steal (rảnh và giờ cao điểm)",
        code: "uptime                     # load average 1/5/15 phút, so với nproc\nvmstat 1 5                 # cột: us sy id wa st\n# Steal trung bình 30 giây (chạy lại lúc 20-23h):\nvmstat 1 30 | awk 'NR>2 {s+=$16} END {print \"Steal trung binh:\", s/(NR-2) \"%\"}'",
        why: "Cột vmstat: <b>us</b> (chương trình), <b>sy</b> (kernel), <b>id</b> (rảnh), <b>wa</b> (chờ ổ đĩa), <b>st</b> (bị VPS khác giành). Ghi lại các số này làm <b>baseline</b>.",
        tip: "Nếu bản vmstat của bạn có ít cột hơn, đếm lại vị trí cột <code>st</code> trong dòng tiêu đề và sửa <code>$16</code>."
      },
      {
        title: "[VPS] Đo hiệu năng bằng YABS",
        code: "curl -sL https://yabs.sh | bash -s -- -g\n# -g: bỏ Geekbench (nặng, lâu, tự gửi kết quả lên Internet)",
        why: "Đo <b>ổ đĩa</b> (fio) và <b>mạng</b> (iperf3) bằng số liệu thay vì tin quảng cáo. Cách đọc (ví dụ VPS lab):<br>• fio 4k: ~70k IOPS, ~290 MB/s → NVMe thật (SSD SATA thường 100–200 MB/s).<br>• iperf3 Singapore: ~190 Mbps, ping ~31 ms → vượt mức 100 Mbps quảng cáo.<br>• <b>AES-NI Enabled</b>: CPU mã hóa bằng phần cứng → SSH/HTTPS/VPN nhanh.<br>• <b>Uptime</b> phải khớp lần reboot cuối của bạn.",
        tip: "Một kết quả mạng thấp lẻ tẻ (vd 1 tuyến châu Âu) thường do tuyến quốc tế lúc đó; <i>busy</i> = máy chủ đo bên kia bận."
      },
      {
        title: "[VPS] Tra nguồn gốc IP (ASN / OSINT)",
        code: "# IP của chính VPS: ASN, tổ chức, vị trí\ncurl -s https://ipinfo.io; echo\n# Tra một IP tấn công lấy từ VPS-1 (thay IP):\ncurl -s https://ipinfo.io/<IP-tan-cong>; echo",
        why: "Xác minh nhà cung cấp (ví dụ VPS lab: AS151858 Interdigi, host IDATA, Đà Nẵng – khớp thông tin pháp nhân) và <b>làm giàu dữ liệu</b> cho IP tấn công: thuộc cloud/hosting nào, quốc gia nào. Kết hợp thêm <b>AbuseIPDB</b> để xem IP đã bị báo cáo bao nhiêu lần.",
        tip: "Tra cứu thụ động như vậy là hợp pháp. <b>Không</b> quét hay tấn công ngược IP đó."
      },
      {
        title: "Gắn giám sát uptime & ghi bảng baseline",
        text: "Tạo tài khoản miễn phí <b>UptimeRobot</b> → New monitor → loại <b>Port</b> → IP VPS, port <b>22</b>, kiểm tra mỗi 5 phút. Sau đó ghi bảng baseline vào ô ghi chú: CPU/RAM/ổ đĩa, ảo hóa, steal (rảnh + cao điểm), load average, fio 4k, iperf3 Singapore, danh sách dịch vụ đang chạy, ASN.",
        why: "Uptime đo bằng dữ liệu thật trong cả tháng là căn cứ để quyết định có thuê dài hạn không. Bảng baseline là mốc so sánh khi sau này nghi máy có vấn đề (chậm bất thường, dịch vụ lạ, CPU cao)."
      }
    ],
    verify: [
      "Chỉ có root + user của bạn đăng nhập được; UID 0 chỉ có root; sudo chỉ có user của bạn.",
      "Không có cron/timer/dịch vụ lạ; đã tắt các dịch vụ thừa và ghi lại RAM trước/sau.",
      "<code>free -h</code> có Swap 1.0Gi và vẫn còn sau khi reboot.",
      "Có số liệu steal lúc rảnh và lúc 20–23h.",
      "Có kết quả YABS và giải thích được 4k IOPS, tốc độ mạng, AES-NI.",
      "Có ASN của VPS; UptimeRobot đang theo dõi port 22."
    ],
    questions: [
      "Kể 4 kỹ thuật persistence trên Linux và lệnh để phát hiện từng cái.",
      "Vì sao tài khoản có UID 0 nhưng không tên root là dấu hiệu nguy hiểm?",
      "Steal time cao nói lên điều gì? Vì sao phải đo vào giờ cao điểm?",
      "Vì sao 4k IOPS quan trọng hơn tốc độ đọc file lớn với máy chủ log?",
      "Baseline giúp phát hiện cryptojacking như thế nào?",
      "Vì sao nhà cung cấp VPS về kỹ thuật luôn có toàn quyền với máy của bạn? Điều đó ảnh hưởng gì đến cách bạn dùng VPS?"
    ],
    output: "Writeup <b>\"Kiểm kê & baseline VPS\"</b>: bảng kiểm kê (user, sudo, cron, dịch vụ – kết luận không có persistence), danh sách dịch vụ đã tắt + RAM trước/sau, bảng baseline hiệu năng (YABS, steal, load), ASN của VPS, uptime sau 1 tháng. <b>Che IP.</b>"
  }
]);
