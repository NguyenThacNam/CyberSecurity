window.DATA = window.DATA || {};
// Lab Linux nền tảng (tùy chọn, làm trên VPS soc-sensor) – nối thêm vào DATA.labs
DATA.labs = (DATA.labs || []).concat([
  {
    id: "LINUX-1",
    track: "chung",
    week: 2,
    optional: true,
    title: "Điều hướng hệ thống & đọc file trên Linux",
    goal: "Đi lại tự tin trong <b>cây thư mục Linux</b> (pwd, ls, cd), biết <b>mỗi thư mục chính chứa gì và vì sao SOC quan tâm</b> (FHS), và <b>đọc file đúng cách</b> theo kích thước: cat, head/tail, <code>tail -f</code> để xem log tấn công chạy trực tiếp, less để đọc file lớn. Kết thúc bằng cách tự tra cứu lệnh với <code>man</code> và <code>--help</code>.",
    time: "45–60 phút",
    prereq: ["VPS-1"],
    concepts: ["Shell / CLI", "FHS", "Absolute vs relative path", "Hidden files", "Log file", "/proc", "Least privilege", "man page"],
    theory: [
      { title: "Shell, dấu nhắc & quyền hiện tại", body: "<b>Shell</b> (ở đây là Bash) là chương trình nhận lệnh bạn gõ và chuyển cho hệ điều hành (Khóa 4: input → shell → OS → output/error). Dấu nhắc <code>nam@soc-sensor:~$</code> cho biết: <b>ai</b> (nam) – <b>máy nào</b> (soc-sensor) – <b>đang đứng ở đâu</b> (<code>~</code> = thư mục home) – <b>quyền gì</b> (<code>$</code> = user thường, <code>#</code> = root). Nhìn dấu nhắc trước khi gõ là thói quen số 1." },
      { title: "FHS – “tủ hồ sơ” của Linux", body: "<b>Filesystem Hierarchy Standard</b> quy định thư mục nào chứa gì, giống một tủ hồ sơ có ngăn cố định. Mọi thứ mọc ra từ <b>gốc <code>/</code></b> như một cái cây. Vì ngăn nào cũng cố định, nhà phân tích SOC biết ngay phải tìm ở đâu: <b>cấu hình</b> ở <code>/etc</code>, <b>log</b> ở <code>/var/log</code>, <b>dữ liệu người dùng</b> ở <code>/home</code> và <code>/root</code>, <b>chương trình</b> ở <code>/usr/bin</code>, <b>file tạm</b> ở <code>/tmp</code>." },
      { title: "Vì sao SOC để ý từng thư mục", body: "• <code>/etc</code>: kẻ tấn công sửa cấu hình để giữ quyền (thêm user, cron, sửa sshd).<br>• <code>/var/log</code>: bằng chứng – và cũng là thứ kẻ tấn công muốn xóa (<b>T1070.002</b> Clear Linux Logs).<br>• <code>/tmp</code>, <code>/dev/shm</code>, <code>/var/tmp</code>: <b>ai cũng ghi được</b> → nơi mã độc hay được thả và chạy thử.<br>• <code>/home/*/.ssh</code>, <code>/root/.ssh</code>: SSH key – cửa hậu kinh điển (<b>T1098.004</b>).<br>• <code>/usr/bin</code>: chương trình hệ thống – file lạ ở đây hoặc bị thay thế là dấu hiệu nghiêm trọng." },
      { title: "Đường dẫn tuyệt đối & tương đối", body: "<b>Tuyệt đối</b> bắt đầu từ gốc <code>/</code> (vd <code>/var/log/auth.log</code>) – đúng ở bất kỳ đâu. <b>Tương đối</b> tính từ chỗ đang đứng (vd <code>log/auth.log</code> khi đang ở <code>/var</code>). Ký hiệu: <code>.</code> = thư mục hiện tại, <code>..</code> = thư mục cha, <code>~</code> = home của bạn, <code>cd -</code> = quay lại thư mục vừa rời. Khi viết lệnh vào báo cáo/script, dùng <b>đường dẫn tuyệt đối</b> để người khác chạy lại cho đúng." },
      { title: "File ẩn (dotfiles)", body: "File/thư mục có tên bắt đầu bằng dấu chấm (<code>.bashrc</code>, <code>.ssh</code>, <code>.bash_history</code>) <b>không hiện</b> với <code>ls</code> thường – phải dùng <code>ls -a</code>. Không phải cơ chế bảo mật, chỉ là “giấu cho gọn”. Kẻ tấn công cũng lợi dụng điều này để đặt file mã độc tên kiểu <code>.cache2</code> hay <code>...</code> (<b>T1564.001</b> Hidden Files and Directories)." },
      { title: "Chọn lệnh đọc file theo kích thước", body: "• <code>cat</code>: in <b>toàn bộ</b> – chỉ dùng cho file ngắn (os-release, hostname).<br>• <code>head</code>/<code>tail</code>: xem <b>đầu/cuối</b> – log mới nhất nằm ở <b>cuối</b> file.<br>• <code>tail -f</code>: <b>theo dõi trực tiếp</b> dòng mới ghi vào (Ctrl+C để thoát).<br>• <code>less</code>: đọc file lớn theo trang, tìm kiếm bằng <code>/</code>, không tải cả file vào màn hình.<br>• <code>wc -l</code>: đếm số dòng = ước lượng nhanh lượng log." },
      { title: "/proc – cửa sổ nhìn vào kernel", body: "<code>/proc</code> không nằm trên ổ đĩa: kernel <b>tạo ra nội dung khi bạn đọc</b>. Mỗi tiến trình có một thư mục <code>/proc/&lt;PID&gt;/</code> chứa lệnh chạy (<code>cmdline</code>), file chương trình (<code>exe</code>), thư mục làm việc (<code>cwd</code>). Công cụ như <code>ps</code>, <code>top</code> thực chất đọc từ đây. Khi điều tra, <code>/proc/&lt;PID&gt;/exe</code> trỏ tới chương trình thật kể cả khi kẻ tấn công đổi tên tiến trình." },
      { title: "Không cần thuộc lòng – biết cách tra", body: "Khóa 4: “bạn không cần ghi nhớ, luôn có thể tìm tài liệu tham khảo”. <code>man &lt;lệnh&gt;</code> mở sách hướng dẫn đầy đủ; <code>&lt;lệnh&gt; --help</code> in bản tóm tắt; <code>man hier</code> mô tả chính FHS. Lệnh có sẵn trong shell như <code>cd</code> thì dùng <code>help cd</code>." }
    ],
    pitfalls: [
      "<b>Gõ lệnh nhầm máy</b>: <code>nam@soc-sensor:~$</code> = VPS; <code>PS C:\\...&gt;</code> = Windows. Lệnh Linux gõ vào PowerShell sẽ chạy sai hoặc báo lỗi khó hiểu.",
      "<b><code>cat</code> một file log lớn</b> → màn hình trôi hàng nghìn dòng, terminal treo. Dùng <code>wc -l</code> trước, rồi <code>tail</code> hoặc <code>less</code>.",
      "<b>Kẹt trong <code>less</code>, <code>man</code> hoặc <code>tail -f</code></b>: <code>less</code>/<code>man</code> thoát bằng <code>q</code>; <code>tail -f</code> thoát bằng <b>Ctrl+C</b>.",
      "<b><code>Permission denied</code> khi đọc <code>/var/log/auth.log</code></b> là đúng thiết kế (file thuộc <code>syslog:adm</code>, quyền 640) – thêm <code>sudo</code> trước lệnh. Không đổi quyền file log cho “tiện”.",
      "<b>Nhầm <code>/root</code> với <code>/</code></b>: <code>/</code> là gốc của cả hệ thống; <code>/root</code> chỉ là thư mục home của tài khoản root.",
      "<b>Linux phân biệt chữ hoa/thường</b>: <code>Auth.log</code> ≠ <code>auth.log</code>, <code>cd Etc</code> sẽ báo <i>No such file or directory</i>. Dùng phím <b>Tab</b> để tự hoàn thành tên, tránh gõ sai."
    ],
    keycards: [
      { front: "Dấu nhắc <code>nam@soc-sensor:~$</code> cho bạn biết những gì?", def: "<b>nam</b> = user đang đăng nhập; <b>soc-sensor</b> = tên máy; <b><code>~</code></b> = đang ở thư mục home (<code>/home/nam</code>); <b><code>$</code></b> = user thường (nếu là <code>#</code> = đang là root).", example: "<code>root@soc-sensor:/var/log#</code> = đang là root, đứng ở <code>/var/log</code> – mọi lệnh đều có toàn quyền.", trap: "Gõ lệnh khi chưa nhìn dấu nhắc → chạy nhầm máy (Windows/VPS) hoặc nhầm quyền (root).", interview: "Làm sao biết bạn đang đăng nhập bằng user nào và có đang là root không? (<code>whoami</code>, <code>id</code>, dấu <code>$</code>/<code>#</code>)" },
      { front: "FHS: nêu 5 thư mục SOC hay kiểm tra nhất trên Linux và lý do.", def: "<code>/etc</code> – cấu hình (user, sshd, cron); <code>/var/log</code> – log/bằng chứng; <code>/home</code> &amp; <code>/root</code> – dữ liệu user, <code>.ssh/authorized_keys</code>, <code>.bash_history</code>; <code>/tmp</code> (và <code>/dev/shm</code>) – ai cũng ghi được, nơi mã độc hay được thả; <code>/usr/bin</code> – chương trình hệ thống.", example: "Cảnh báo “tiến trình lạ chạy từ <code>/tmp/.x/kworker</code>” → gần như chắc chắn là mã độc (tiến trình thật không chạy từ /tmp).", trap: "<code>/root</code> là home của root, KHÔNG phải gốc <code>/</code>.", interview: "Nghi một máy Linux bị cài mã độc, bạn xem những thư mục nào đầu tiên?" },
      { front: "Đường dẫn tuyệt đối khác tương đối thế nào? <code>.</code>, <code>..</code>, <code>~</code>, <code>cd -</code> nghĩa là gì?", def: "<b>Tuyệt đối</b> bắt đầu bằng <code>/</code>, đúng ở mọi nơi (<code>/var/log/auth.log</code>). <b>Tương đối</b> tính từ thư mục hiện tại (<code>log/auth.log</code>). <code>.</code> = hiện tại, <code>..</code> = thư mục cha, <code>~</code> = home của user, <code>cd -</code> = quay lại thư mục trước.", example: "Đang ở <code>/var/log</code>: <code>cd ..</code> → <code>/var</code>; <code>cd ~</code> → <code>/home/nam</code>.", trap: "Trong báo cáo/script nên ghi đường dẫn tuyệt đối – đường dẫn tương đối sai ngay khi người khác đứng ở thư mục khác." },
      { front: "Muốn xem log tấn công SSH <b>đang diễn ra trực tiếp</b> thì dùng lệnh gì? Thoát thế nào?", def: "<code>sudo tail -f /var/log/auth.log</code> – in 10 dòng cuối rồi <b>chờ và in tiếp</b> mỗi dòng mới được ghi. Thoát bằng <b>Ctrl+C</b>.", example: "Mở cửa sổ SSH thứ hai vào VPS → thấy ngay dòng <code>Accepted publickey for nam</code> xuất hiện.", trap: "Cần <code>sudo</code> vì auth.log quyền 640 <code>syslog:adm</code>. <code>tail -n 50</code> chỉ xem 1 lần; <code>-f</code> mới theo dõi liên tục.", interview: "Bạn đang trực ca và nghi đang có tấn công brute force, bạn xem log thời gian thực thế nào?" },
      { front: "Trong <code>less</code>, làm sao tìm từ khóa, nhảy đầu/cuối file và thoát?", def: "<code>/từ_khóa</code> + Enter = tìm xuôi; <code>n</code> = kết quả tiếp, <code>N</code> = kết quả trước; <code>G</code> = cuối file, <code>g</code> = đầu file; Space/b = trang sau/trước; <code>q</code> = thoát.", example: "<code>sudo less /var/log/auth.log</code> → <code>G</code> → <code>?Accepted</code> (tìm ngược từ cuối lên) để thấy lần đăng nhập thành công gần nhất.", trap: "<code>man</code> dùng chung phím của <code>less</code> – học một lần dùng cho cả hai." },
      { front: "<code>/etc/passwd</code> có chứa mật khẩu không? Mỗi dòng gồm những trường nào?", def: "<b>Không</b>. Trường thứ 2 là <code>x</code> = mật khẩu (dạng hash) nằm ở <code>/etc/shadow</code> (chỉ root/nhóm shadow đọc được). 7 trường cách nhau bằng <code>:</code> – <b>tên : x : UID : GID : mô tả : home : shell</b>.", example: "<code>nam:x:1000:1000:,,,:/home/nam:/bin/bash</code> → UID 1000, home <code>/home/nam</code>, đăng nhập được bằng bash. Shell <code>/usr/sbin/nologin</code> = tài khoản dịch vụ, không đăng nhập được.", trap: "<code>/etc/passwd</code> ai cũng đọc được (644) – đó là bình thường; <code>/etc/shadow</code> mà ai cũng đọc được mới là lỗi nghiêm trọng.", interview: "Tài khoản có UID 0 nghĩa là gì? Vì sao một user lạ có UID 0 là dấu hiệu bị xâm nhập?" },
      { front: "<code>/proc</code> là gì? <code>/proc/&lt;PID&gt;/exe</code> giúp gì khi điều tra?", def: "<code>/proc</code> là hệ thống file ảo do <b>kernel tạo ra khi đọc</b>, không nằm trên ổ đĩa. Mỗi tiến trình có <code>/proc/&lt;PID&gt;/</code>: <code>exe</code> trỏ tới file chương trình thật, <code>cmdline</code> là lệnh chạy, <code>cwd</code> là thư mục làm việc.", example: "<code>ls -l /proc/$$/exe</code> → <code>/usr/bin/bash</code> (<code>$$</code> = PID của shell hiện tại).", trap: "Mã độc có thể đổi tên tiến trình cho giống <code>[kworker]</code>, nhưng <code>exe</code> vẫn lộ đường dẫn thật (vd <code>/tmp/.x/a (deleted)</code>).", interview: "Một tiến trình tên giống tiến trình hệ thống nhưng bạn nghi giả mạo – kiểm tra thế nào?" }
    ],
    steps: [
      {
        title: "[Windows → VPS] Đăng nhập & đọc dấu nhắc",
        text: "Mở PowerShell, đăng nhập bằng key như ở VPS-1, rồi trả lời 3 câu: <b>tôi là ai, đang ở máy nào, đang đứng ở đâu</b>. Thay <code>&lt;IP&gt;</code> bằng IP thật, bỏ dấu &lt; &gt;.",
        code: "# [Windows]\nssh nam@<IP>\n\n# [VPS]\nwhoami        # -> nam\nhostname      # -> soc-sensor\npwd           # -> /home/nam  (print working directory)\nid            # -> uid=1000(nam) gid=1000(nam) groups=1000(nam),27(sudo),100(users)",
        why: "Ba câu hỏi “ai – ở đâu – quyền gì” là bước định hướng trước mọi thao tác, giống analyst mở ticket phải biết đang điều tra máy nào. <code>id</code> cho thấy <code>nam</code> thuộc nhóm <code>sudo</code> nhưng <b>không</b> thuộc nhóm <code>adm</code> – vì vậy lát nữa đọc <code>/var/log/auth.log</code> phải dùng <code>sudo</code> (least privilege).",
        tip: "Dấu nhắc kết thúc bằng <code>$</code> = user thường. Nếu thấy <code>#</code> nghĩa là đang là root – cẩn thận gấp đôi."
      },
      {
        title: "[VPS] Liệt kê file với ls và các tùy chọn",
        code: "ls                 # tên file/thư mục trong home\nls -a              # thêm file ẩn (.bashrc, .ssh, .bash_history)\nls -l              # dạng dài: quyền, chủ, kích thước, ngày sửa\nls -la             # kết hợp\nls -lh /var/log    # -h: kích thước dễ đọc (K, M, G)\nls -lt /var/log | head    # -t: sắp xếp mới sửa nhất lên đầu\nls -ltr /var/log | tail   # -r: đảo ngược -> mới nhất ở cuối",
        why: "<code>ls -la</code> là lệnh đầu tiên khi vào một thư mục lạ: file ẩn thường là nơi giấu cấu hình (và đôi khi cửa hậu). <code>-t</code> sắp xếp theo <b>thời gian sửa</b> – trong điều tra, câu hỏi “file nào vừa bị thay đổi?” xuất hiện liên tục. Các cột của <code>ls -l</code>: <b>quyền – số liên kết – chủ – nhóm – kích thước – ngày giờ sửa – tên</b> (quyền sẽ học kỹ ở LINUX-4).",
        tip: "Các tùy chọn ghép được: <code>ls -l -a -h</code> = <code>ls -lah</code>. Thứ tự chữ không quan trọng."
      },
      {
        title: "[VPS] Di chuyển bằng cd: tuyệt đối vs tương đối",
        code: "cd /var/log        # tuyệt đối (bắt đầu bằng /)\npwd                # /var/log\ncd ..              # lên thư mục cha\npwd                # /var\ncd log             # tương đối: vào 'log' bên trong thư mục hiện tại\ncd -               # quay lại thư mục vừa rời (in ra đường dẫn)\ncd ~               # về home (gõ 'cd' không tham số cũng được)\ncd ../..           # lên 2 cấp\npwd                # /\ncd                 # về home",
        why: "Hiểu tuyệt đối/tương đối giúp đọc và viết lệnh không nhầm. Khi ghi lệnh vào báo cáo sự cố, dùng <b>đường dẫn tuyệt đối</b> để người đọc chạy lại ra đúng kết quả, bất kể họ đang đứng ở đâu.",
        tip: "Gõ vài chữ đầu rồi nhấn <b>Tab</b> để tự hoàn thành tên (vd <code>cd /var/l</code> + Tab). Nhấn Tab 2 lần để xem các lựa chọn."
      },
      {
        title: "[VPS] Dạo một vòng FHS – mỗi ngăn tủ chứa gì",
        code: "ls /                       # các ngăn cấp cao nhất\nls /etc | head -20         # cấu hình hệ thống\nls -lt /var/log | head     # log, mới nhất lên đầu\nls -ld /home/*             # mỗi user một thư mục home\nls /root                   # Permission denied -> đúng thiết kế\nsudo ls -la /root          # có sudo mới xem được\nls -la /tmp /dev/shm       # nơi ai cũng ghi được\nls /usr/bin | wc -l        # số chương trình trong /usr/bin\nwhich ls bash ssh          # chương trình nằm ở đâu",
        why: "SOC cần biết <b>chỗ bình thường</b> để nhận ra <b>chỗ bất thường</b>:<br>• <code>/etc</code> = cấu hình → bị sửa để giữ quyền (persistence).<br>• <code>/var/log</code> = bằng chứng → bị xóa để xóa dấu vết (<b>T1070.002</b>).<br>• <code>/home</code>, <code>/root</code> = dữ liệu user, SSH key, lịch sử lệnh.<br>• <code>/tmp</code>, <code>/dev/shm</code> = <b>ai cũng ghi được</b> → nơi mã độc hay được tải về và chạy (chú ý chữ <code>t</code> cuối <code>drwxrwxrwt</code> – sticky bit, LINUX-4).<br>• <code>/usr/bin</code> = chương trình hệ thống, chỉ root sửa được.",
        tip: "Thêm chi tiết: <code>man hier</code> (mô tả đầy đủ FHS). Trên VPS mới, <code>/tmp</code> gần như trống – sau này thấy file lạ, nhất là file ẩn hoặc file chạy được ở đây, hãy ghi lại để điều tra."
      },
      {
        title: "[VPS] Nhìn vào /proc – thông tin sống của kernel",
        code: "cat /proc/uptime           # số giây máy đã chạy\nhead -3 /proc/meminfo      # RAM (free -h đọc từ đây)\nnproc; grep -c processor /proc/cpuinfo   # số nhân CPU\necho $$                    # PID của shell đang dùng\nls -l /proc/$$/exe         # -> /usr/bin/bash\nls -l /proc/$$/cwd         # thư mục đang đứng\nls /proc | head            # các thư mục số = các tiến trình đang chạy",
        why: "<code>/proc</code> do kernel tạo ra ngay khi đọc – các công cụ <code>ps</code>, <code>top</code>, <code>free</code> đều lấy dữ liệu từ đây. Trong điều tra, <code>/proc/&lt;PID&gt;/exe</code> chỉ ra <b>file chương trình thật</b> của một tiến trình, kể cả khi mã độc đổi tên cho giống tiến trình hệ thống hoặc đã tự xóa file của nó (hiện chữ <code>(deleted)</code>).",
        tip: "Đừng thử ghi gì vào <code>/proc</code> – một số file ở đây thay đổi hành vi kernel ngay lập tức."
      },
      {
        title: "[VPS] Đọc file ngắn với cat & kiểm tra loại file với file",
        code: "cat /etc/hostname          # soc-sensor\ncat /etc/os-release        # PRETTY_NAME=\"Ubuntu 24.04.x LTS\", VERSION_CODENAME=noble\nfile /etc/hostname /etc/os-release /usr/bin/ls\n# /etc/hostname:   ASCII text\n# /etc/os-release: symbolic link to ../usr/lib/os-release\n# /usr/bin/ls:     ELF 64-bit LSB pie executable, x86-64 ...\nls /var/log/*.gz 2>/dev/null | head -3   # log cũ đã nén (nếu có)\nwc -l /etc/os-release /etc/passwd        # đếm dòng",
        why: "<code>/etc/os-release</code> cho biết <b>chính xác phiên bản OS</b> – thông tin đầu tiên cần ghi khi nhận một máy để điều tra hoặc tra lỗ hổng (CVE áp dụng cho bản nào). <code>file</code> xác định loại file theo <b>nội dung</b>, không theo đuôi: mã độc hay đặt tên <code>.jpg</code>, <code>.txt</code> nhưng <code>file</code> sẽ lộ ra <i>ELF executable</i>.",
        tip: "<code>cat</code> chỉ dùng cho file ngắn. Không chắc file dài bao nhiêu → <code>wc -l</code> trước."
      },
      {
        title: "[VPS] Xem trước /etc/passwd – danh sách tài khoản",
        code: "head -5 /etc/passwd\n# root:x:0:0:root:/root:/bin/bash\n# daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\ntail -3 /etc/passwd\ngrep '^nam:' /etc/passwd   # dòng của bạn\nwc -l /etc/passwd          # tổng số tài khoản (gồm tài khoản dịch vụ)\nls -l /etc/passwd /etc/shadow\n# -rw-r--r-- root root   /etc/passwd  (ai cũng đọc được)\n# -rw-r----- root shadow /etc/shadow  (chứa hash mật khẩu)\ncat /etc/shadow            # Permission denied -> đúng",
        why: "Mỗi dòng có 7 trường cách nhau bằng <code>:</code> – <b>tên : x : UID : GID : mô tả : home : shell</b>. Chữ <code>x</code> nghĩa là hash mật khẩu nằm ở <code>/etc/shadow</code>, file chỉ root đọc được. Tài khoản shell <code>nologin</code> là <b>tài khoản dịch vụ</b> – không đăng nhập được. Bạn đã kiểm kê kỹ ở VPS-2; ở đây chỉ cần đọc hiểu cấu trúc (LINUX-5 sẽ học quản lý user).",
        tip: "<code>^</code> trong <code>'^nam:'</code> nghĩa là “đầu dòng” – tránh khớp nhầm các dòng chỉ chứa chữ nam ở giữa."
      },
      {
        title: "[VPS] head, tail, wc với auth.log – và tail -f xem tấn công trực tiếp",
        text: "Mở <b>2 cửa sổ</b> PowerShell. Cửa sổ 1 chạy <code>tail -f</code>; cửa sổ 2 đăng nhập SSH thêm một lần để thấy dòng log của chính mình xuất hiện.",
        code: "# [Cửa sổ 1 - VPS]\nsudo wc -l /var/log/auth.log          # file dài bao nhiêu dòng\nsudo head -n 3 /var/log/auth.log      # dòng cũ nhất (thường còn giờ +00:00)\nsudo tail -n 5 /var/log/auth.log      # 5 dòng mới nhất\nsudo tail -f /var/log/auth.log        # theo dõi trực tiếp\n\n# [Cửa sổ 2 - Windows]\nssh nam@<IP>      # rồi gõ exit\n\n# Quay lại cửa sổ 1: thấy dòng 'Accepted publickey for nam ...' vừa hiện\n# Đợi thêm vài phút: thường sẽ thấy cả bot 'Invalid user ...' gõ cửa\n# Ctrl+C để thoát tail -f",
        why: "Log mới được <b>ghi nối vào cuối file</b>, nên <code>tail</code> cho thấy chuyện vừa xảy ra; <code>head</code> cho thấy log bắt đầu từ lúc nào (ước lượng khoảng thời gian quan sát). <code>tail -f</code> là cách analyst “ngồi canh” một sự cố đang diễn ra. Thấy chính lượt đăng nhập của mình hiện lên giúp bạn biết một dòng <b>bình thường</b> trông thế nào – nền tảng để nhận ra dòng <b>bất thường</b>.",
        tip: "<code>sudo</code> cần vì <code>auth.log</code> thuộc <code>syslog:adm</code>, quyền 640. Nếu log đã xoay vòng (rotate), dòng cũ hơn nằm ở <code>/var/log/auth.log.1</code> và <code>auth.log.2.gz</code>…"
      },
      {
        title: "[VPS] Đọc file lớn bằng less & tìm kiếm",
        code: "sudo less /var/log/auth.log\n# Trong less:\n#   Space / b      trang sau / trang trước\n#   G  /  g        nhảy CUỐI / ĐẦU file\n#   /Invalid user  tìm xuôi  -> n (kết quả tiếp), N (kết quả trước)\n#   ?Accepted      tìm ngược (từ dưới lên)\n#   -N             bật/tắt số dòng\n#   q              thoát",
        why: "File log thật có thể hàng chục nghìn dòng – <code>cat</code> sẽ làm trôi màn hình, <code>less</code> thì đọc từng trang và <b>không phải tải cả file</b>. Thói quen điều tra: <code>G</code> nhảy xuống cuối (mới nhất) rồi <code>?Accepted</code> tìm ngược lên lần đăng nhập thành công gần nhất – câu hỏi số 1 của SOC: “có ai vào được không?”.",
        tip: "<code>man</code> dùng đúng các phím này. Lỡ bấm gì lạ trong less → <code>q</code> là thoát."
      },
      {
        title: "[VPS] Tự tra cứu: man, --help, help",
        code: "man ls            # đọc hướng dẫn đầy đủ; gõ /-t rồi Enter để tìm tùy chọn -t; q thoát\nls --help | head -30\nman tail          # tìm hiểu -f và -F khác nhau thế nào\nman hier          # mô tả FHS\ntype cd           # 'cd is a shell builtin' -> không có man riêng\nhelp cd           # hướng dẫn cho lệnh có sẵn trong shell\nwhatis grep less  # mô tả 1 dòng",
        why: "Không ai thuộc hết tùy chọn – kỹ năng thật là <b>tra nhanh và chính xác</b> ngay trên máy (kể cả máy không có Internet). Trong phỏng vấn, nói được “tôi sẽ kiểm tra <code>man</code> page” tốt hơn đoán bừa tùy chọn.",
        tip: "Nếu <code>man</code> báo chưa có trang hướng dẫn (image VPS rút gọn), dùng <code>&lt;lệnh&gt; --help</code> – luôn có sẵn."
      },
      {
        title: "Thử thách 1: 3 file log vừa được ghi gần nhất",
        text: "Liệt kê <b>3 file trong <code>/var/log</code> được sửa gần đây nhất</b>, kèm kích thước dễ đọc. Đoán xem vì sao chính những file đó thay đổi liên tục.",
        why: "Câu hỏi “cái gì vừa thay đổi?” là phản xạ điều tra cơ bản. Ghép <code>ls</code> với tùy chọn sắp xếp và <code>head</code> là cách nhanh nhất trả lời nó.",
        tip: "<b>Đáp án gợi ý:</b> <code>ls -lth /var/log | head -4</code> (dòng đầu là <i>total</i>, 3 dòng sau là 3 file). Thường gặp <code>auth.log</code> (bot gõ cửa SSH liên tục), <code>syslog</code>, <code>journal</code>."
      },
      {
        title: "Thử thách 2: Log của bạn bao phủ khoảng thời gian nào?",
        text: "Không mở cả file, hãy cho biết: <code>auth.log</code> có <b>bao nhiêu dòng</b>, <b>dòng đầu tiên</b> và <b>dòng cuối cùng</b> ghi lúc nào. Chú ý ký hiệu múi giờ ở cuối dấu thời gian.",
        why: "Trước khi kết luận “trong X giờ có Y lượt tấn công”, analyst phải biết log bao phủ <b>từ lúc nào đến lúc nào</b>, và giờ ghi theo múi nào (<code>+00:00</code> hay <code>+07:00</code>).",
        tip: "<b>Đáp án gợi ý:</b> <code>sudo wc -l /var/log/auth.log; sudo head -n 1 /var/log/auth.log; sudo tail -n 1 /var/log/auth.log</code><br>Dòng đầu có thể kết thúc bằng <code>+00:00</code> (trước khi đổi múi giờ ở VPS-1), dòng cuối <code>+07:00</code> – cách nhau 7 tiếng khi quy đổi."
      }
    ],
    verify: [
      "Giải thích được từng phần của dấu nhắc <code>nam@soc-sensor:~$</code> và kết quả <code>id</code>.",
      "Di chuyển được bằng cả đường dẫn tuyệt đối và tương đối; dùng thành thạo <code>..</code>, <code>~</code>, <code>cd -</code>, phím Tab.",
      "Nêu được vai trò của <code>/etc</code>, <code>/var/log</code>, <code>/home</code>, <code>/root</code>, <code>/tmp</code>, <code>/usr/bin</code>, <code>/proc</code> và vì sao SOC quan tâm.",
      "Đọc được phiên bản OS từ <code>/etc/os-release</code> và giải thích 7 trường của một dòng <code>/etc/passwd</code>.",
      "Đã thấy dòng <code>Accepted publickey for nam</code> của chính mình xuất hiện trực tiếp trong <code>tail -f</code>.",
      "Trong <code>less</code>: tìm được <code>Invalid user</code>, nhảy cuối file, tìm ngược <code>Accepted</code>, thoát bằng <code>q</code>.",
      "Hoàn thành 2 thử thách và ghi lại khoảng thời gian log bao phủ."
    ],
    questions: [
      "FHS là gì? Kể 5 thư mục quan trọng và lý do SOC quan tâm từng thư mục.",
      "Vì sao kẻ tấn công thích thả mã độc vào <code>/tmp</code> hoặc <code>/dev/shm</code>?",
      "Đường dẫn tuyệt đối và tương đối khác nhau thế nào? Khi viết báo cáo sự cố nên dùng loại nào, vì sao?",
      "<code>/etc/passwd</code> có chứa mật khẩu không? Mật khẩu (hash) nằm ở đâu và ai đọc được file đó?",
      "Bạn muốn theo dõi các lượt đăng nhập SSH đang diễn ra – dùng lệnh gì? Vì sao cần <code>sudo</code>?",
      "<code>/proc/&lt;PID&gt;/exe</code> giúp gì khi nghi một tiến trình giả danh tiến trình hệ thống?",
      "Khi gặp một lệnh lạ trên máy không có Internet, bạn tra cứu bằng cách nào?"
    ],
    output: "Ghi chú <b>\"Bản đồ Linux của tôi\"</b>: (1) bảng FHS – thư mục, chứa gì, SOC kiểm tra gì ở đó; (2) phiên bản OS từ <code>/etc/os-release</code>; (3) giải thích 1 dòng <code>/etc/passwd</code> và quyền của <code>/etc/passwd</code> vs <code>/etc/shadow</code>; (4) ảnh chụp <code>tail -f</code> lúc dòng <code>Accepted publickey</code> của bạn xuất hiện (che IP); (5) khoảng thời gian <code>auth.log</code> bao phủ + nhận xét múi giờ; (6) bảng phím tắt <code>less</code>."
  },

  {
    id: "LINUX-2",
    track: "chung",
    week: 2,
    optional: true,
    title: "Lọc & tìm kiếm log: grep, pipe, sort/uniq, cut/awk, find",
    goal: "Biến <code>auth.log</code> thật trên VPS thành <b>con số có ý nghĩa</b>: tổng lượt tấn công, top username, top IP, dải /24, số lượt theo giờ, các lần đăng nhập thành công – bằng chuỗi lệnh <b>grep | sort | uniq -c | sort -nr | head</b>. Sau đó dùng <code>find</code> để trả lời câu hỏi điều tra: <b>file nào vừa thay đổi, file nào bất thường về kích thước</b>.",
    time: "75–90 phút",
    prereq: ["VPS-1", "LINUX-1"],
    mitre: "T1110",
    concepts: ["grep", "Regular expression", "Pipe", "stdout / stdin", "Frequency analysis", "Field extraction", "Timeline & timezone", "find", "Brute force T1110"],
    theory: [
      { title: "Pipe – dây chuyền xử lý dữ liệu", body: "Dấu <code>|</code> gửi <b>đầu ra chuẩn (stdout)</b> của lệnh trước thành <b>đầu vào chuẩn (stdin)</b> của lệnh sau (Khóa 4: “đường ống”). Mỗi lệnh làm <b>một việc nhỏ</b>: grep lọc dòng → cut/awk cắt cột → sort sắp xếp → uniq đếm → head lấy top. Ghép lại thành một dây chuyền phân tích mạnh như một truy vấn SIEM." },
      { title: "Công thức đếm tần suất (frequency analysis)", body: "<code>... | sort | uniq -c | sort -nr | head</code> – thuộc lòng câu này.<br>• <code>sort</code>: xếp các dòng giống nhau nằm cạnh nhau.<br>• <code>uniq -c</code>: gộp các dòng <b>liền kề</b> giống nhau và đếm.<br>• <code>sort -nr</code>: sắp xếp theo <b>số</b> (<code>-n</code>), <b>giảm dần</b> (<code>-r</code>).<br>• <code>head</code>: lấy 10 dòng đầu = top 10.<br>Đây chính là <i>GROUP BY … COUNT(*) ORDER BY … DESC LIMIT 10</i> trong SQL." },
      { title: "grep & biểu thức chính quy (regex)", body: "<code>grep</code> lọc dòng chứa mẫu. Tùy chọn hay dùng: <code>-c</code> đếm, <code>-i</code> không phân biệt hoa/thường, <code>-v</code> đảo ngược (bỏ dòng khớp), <code>-n</code> số dòng, <code>-w</code> khớp nguyên từ, <code>-E</code> regex mở rộng (<code>A|B</code>), <code>-A/-B</code> thêm dòng sau/trước, <code>-o</code> chỉ in phần khớp, <code>-P</code> regex kiểu Perl.<br>Mẹo của bài: <code>grep -oP 'mẫu \\K\\S+'</code> – <code>\\K</code> = “bỏ phần đã khớp ở trước, chỉ in từ đây”, <code>\\S+</code> = một chuỗi không có dấu cách (một “từ”)." },
      { title: "cut vs awk – cắt cột", body: "<code>cut -d' ' -f6</code> cắt theo <b>đúng một ký tự</b> phân cách: hai dấu cách liền nhau = có một cột rỗng ở giữa. <code>cut -c12-13</code> cắt theo <b>vị trí ký tự</b> – hợp với dấu thời gian có độ dài cố định. <code>awk '{print $6}'</code> tách theo <b>khoảng trắng bất kỳ</b> (nhiều dấu cách coi như một); <code>$NF</code> = cột cuối, <code>$(NF-2)</code> = cột thứ 3 từ cuối. Ubuntu dùng <b>mawk</b> làm awk mặc định – đủ cho <code>substr</code>, <code>split</code>, <code>printf</code>." },
      { title: "Dấu thời gian RFC3339 & múi giờ", body: "Ubuntu 24.04 ghi: <code>2026-11-12T03:10:05.123456+07:00</code>. Vị trí cố định: ký tự 1–10 = ngày, 11 = <code>T</code>, <b>12–13 = giờ</b>, 27–32 = <b>độ lệch múi giờ</b>. Log của bạn lẫn <code>+00:00</code> (trước khi đổi múi giờ ở VPS-1) và <code>+07:00</code>. Gộp theo giờ mà không quy đổi thì 10h UTC và 10h Việt Nam bị đếm chung – sai timeline." },
      { title: "Brute force & phân tích tần suất (MITRE T1110)", body: "Một IP thử nhiều username khác nhau = <b>password guessing / user enumeration</b> (T1110.001). Nhiều IP cùng dải /24 thử cùng danh sách, số lượt đều nhau = <b>botnet phân tán</b>. Một mật khẩu thử trên nhiều user = <b>password spraying</b> (T1110.003). Đếm theo giờ cho thấy <b>đợt tấn công</b> (burst) và có thể khớp với giờ làm việc của nhóm vận hành botnet." },
      { title: "find – tìm theo thuộc tính file", body: "<code>grep</code> tìm <b>bên trong</b> file; <code>find</code> tìm <b>file</b> theo tên, loại, thời gian, kích thước, chủ sở hữu. <code>-mtime -1</code> = sửa trong 1 ngày qua, <code>-mmin -60</code> = trong 60 phút qua, <code>-newer X</code> = mới hơn file X, <code>-size +1M</code> = lớn hơn 1 MB, <code>-type f/d</code> = file/thư mục, <code>-exec lệnh {} \\;</code> = chạy lệnh trên từng kết quả. SOC dùng để trả lời: “kể từ lúc nghi bị xâm nhập, file nào đã thay đổi?”." },
      { title: "Làm việc trên bản sao & đừng để lệnh của mình làm bẩn log", body: "Mỗi lệnh <code>sudo</code> bạn chạy được ghi vào chính <code>auth.log</code>, kèm nguyên văn lệnh: <code>sudo: nam : ... COMMAND=/usr/bin/grep -c Invalid user /var/log/auth.log</code>. Dòng này cũng chứa chữ <i>Invalid user</i> → đếm sai! Cách làm chuẩn: <b>trích riêng các dòng của sshd</b> ra một bản sao trong <code>~/lab</code> một lần, rồi phân tích bản sao bằng quyền user thường. Đúng tinh thần forensics: <b>không phân tích trên bản gốc</b> đang thay đổi." }
    ],
    pitfalls: [
      "<b>Đếm cả dòng log của chính lệnh sudo</b>: chạy <code>sudo grep \"Invalid user\" /var/log/auth.log</code> nhiều lần → mỗi lần thêm một dòng <code>sudo: ... COMMAND=... Invalid user ...</code>. Lọc theo <code>sshd\\[</code> (bước 1) để chỉ lấy dòng của sshd.",
      "<b>Quên <code>sort</code> trước <code>uniq -c</code></b>: <code>uniq</code> chỉ gộp dòng giống nhau <b>đứng liền nhau</b> → cùng một IP bị đếm thành nhiều dòng nhỏ.",
      "<b><code>sort -r</code> thay vì <code>sort -nr</code></b>: không có <code>-n</code> thì sắp theo chữ → “9” đứng trên “10”, top sai.",
      "<b>Dùng <code>cut -d' '</code> trên dòng có 2 dấu cách liền nhau</b> (vd <code>Invalid user  from ...</code> khi bot gửi username rỗng) → cột lệch. Dòng lạ thì dùng <code>awk</code> hoặc <code>grep -oP</code>.",
      "<b>Gộp theo giờ mà quên múi giờ</b>: dòng <code>+00:00</code> và <code>+07:00</code> bị đếm chung. Kiểm tra số dòng mỗi múi trước (bước 8).",
      "<b><code>grep -P</code> báo lỗi locale</b> (<i>-P supports only unibyte and UTF-8 locales</i>): Ubuntu mặc định đã là UTF-8; nếu gặp lỗi, chạy <code>export LC_ALL=C.UTF-8</code> rồi thử lại."
    ],
    keycards: [
      { front: "Viết chuỗi lệnh lấy <b>top 10 IP</b> có nhiều lượt <i>Invalid user</i> nhất trong auth.log.", def: "<code>grep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' sshd.log | sort | uniq -c | sort -nr | head</code><br>grep trích IP → sort gom IP giống nhau → <code>uniq -c</code> đếm → <code>sort -nr</code> xếp số giảm dần → <code>head</code> lấy 10.", example: "Kết quả <code>5 77.239.124.32 / 2 77.239.124.88 / 2 77.239.124.45</code> → nhiều IP cùng dải <code>77.239.124.x</code> = botnet chia tải.", trap: "Thiếu <code>sort</code> đầu tiên → uniq đếm sai; dùng <code>sort -r</code> thiếu <code>-n</code> → “9” xếp trên “10”.", interview: "Không có SIEM, chỉ có SSH vào server, bạn tìm IP tấn công nhiều nhất thế nào?" },
      { front: "<code>sort | uniq -c | sort -nr | head</code> – từng phần làm gì? Tương đương SQL nào?", def: "<code>sort</code> xếp dòng giống nhau cạnh nhau; <code>uniq -c</code> gộp dòng <b>liền kề</b> giống nhau và đếm; <code>sort -nr</code> sắp theo số, giảm dần; <code>head</code> lấy 10 dòng đầu. Tương đương <i>SELECT x, COUNT(*) … GROUP BY x ORDER BY COUNT(*) DESC LIMIT 10</i>.", trap: "<code>uniq</code> không có <code>sort</code> phía trước chỉ gộp các dòng trùng nằm sát nhau.", interview: "Giải thích một pipeline Linux bạn hay dùng để phân tích log." },
      { front: "<code>grep -oP 'Invalid user \\K\\S+'</code> – <code>-o</code>, <code>-P</code>, <code>\\K</code>, <code>\\S+</code> nghĩa là gì?", def: "<code>-o</code>: chỉ in phần khớp (không in cả dòng). <code>-P</code>: dùng regex kiểu Perl. <code>\\K</code>: “quên” phần đã khớp phía trước – chỉ in từ vị trí này. <code>\\S+</code>: một hoặc nhiều ký tự <b>không phải khoảng trắng</b> = một từ.", example: "Dòng <code>... Invalid user admin from 77.239.124.32 port 52144</code> → in ra <code>admin</code>.", trap: "<code>\\S+</code> cần ít nhất 1 ký tự nên bỏ qua dòng bot gửi username rỗng (<code>Invalid user  from ...</code>, 2 dấu cách). Khi lấy IP thì dùng <code>\\S*</code> để không sót dòng đó." },
      { front: "Vì sao đếm <code>sudo grep -c \"Invalid user\" /var/log/auth.log</code> nhiều lần cho kết quả tăng dần dù không có tấn công mới?", def: "Mỗi lệnh <code>sudo</code> được ghi vào chính auth.log kèm nguyên văn lệnh (<code>COMMAND=/usr/bin/grep -c Invalid user ...</code>) → dòng đó cũng chứa “Invalid user”. Cách sửa: chỉ lấy dòng của sshd: <code>sudo grep 'sshd\\[' /var/log/auth.log &gt; ~/lab/sshd.log</code> rồi phân tích bản sao.", trap: "Đây cũng là lý do lệnh sudo là bằng chứng tốt: kẻ tấn công dùng sudo cũng để lại dấu vết y hệt.", interview: "Hoạt động của chính analyst có thể làm sai lệch bằng chứng như thế nào? Bạn tránh ra sao?" },
      { front: "Lấy <b>giờ</b> từ dấu thời gian <code>2026-11-12T03:10:05.123456+07:00</code> thế nào? Xử lý dòng <code>+00:00</code> ra sao?", def: "Giờ ở ký tự 12–13: <code>cut -c12-13</code> hoặc awk <code>substr($1,12,2)</code>. Độ lệch múi giờ ở ký tự 27–32: <code>substr($1,27)</code>. Dòng <code>+00:00</code> cộng 7 để quy về giờ Việt Nam: <code>awk '{h=substr($1,12,2)+0; if (substr($1,27)==\"+00:00\") h=(h+7)%24; printf \"%02d\\n\", h}'</code>.", example: "10:05 <code>+00:00</code> = 17:05 <code>+07:00</code> – cùng một thời điểm.", trap: "Không quy đổi → hai thời điểm cách nhau 7 tiếng bị đếm chung một giờ, timeline sai.", interview: "Log từ nhiều nguồn có múi giờ khác nhau, bạn dựng timeline thế nào?" },
      { front: "Gom IP tấn công theo dải /24 bằng lệnh gì? Kết quả nói lên điều gì?", def: "<code>grep -oP 'Invalid user \\S* from \\K[0-9.]+' sshd.log | cut -d. -f1-3 | sort | uniq -c | sort -nr</code> – <code>cut -d. -f1-3</code> giữ 3 phần đầu của IPv4 (vd <code>77.239.124</code>).", example: "9 lượt từ <code>77.239.124.x</code> chia cho nhiều IP → một nhóm/nhà cung cấp, brute force phân tán.", trap: "Chặn từng IP ít tác dụng với botnet; biện pháp gốc là tắt đăng nhập mật khẩu (đã làm ở VPS-1).", interview: "Thấy nhiều IP cùng /24 tấn công, bạn đề xuất gì?" },
      { front: "<code>find</code>: tìm file trong <code>/etc</code> bị sửa trong 24 giờ qua, và file lớn hơn 10 MB trong <code>/var/log</code>.", def: "<code>sudo find /etc -type f -mtime -1</code><br><code>sudo find /var/log -type f -size +10M -exec ls -lh {} \\;</code><br><code>-mtime -1</code> = trong 1 ngày; <code>-mmin -60</code> = 60 phút; <code>-newer file</code> = mới hơn file mốc; <code>-exec ... {} \\;</code> chạy lệnh trên từng file.", trap: "<code>-mtime +1</code> (dấu cộng) = CŨ hơn 1 ngày – ngược nghĩa. Thêm <code>2&gt;/dev/null</code> để ẩn lỗi Permission denied.", interview: "Nghi server bị xâm nhập lúc 2h sáng, bạn tìm những file đã thay đổi kể từ đó thế nào?" },
      { front: "<code>grep -w</code>, <code>-v</code>, <code>-E</code>, <code>-A/-B</code> dùng khi nào?", def: "<code>-w</code>: khớp nguyên từ (<code>admin</code> không khớp <code>administrator</code>, <code>admin1</code>). <code>-v</code>: bỏ các dòng khớp – loại nhiễu. <code>-E 'A|B'</code>: khớp A hoặc B. <code>-A 2</code>/<code>-B 2</code>: in thêm 2 dòng sau/trước dòng khớp – xem ngữ cảnh.", example: "<code>grep -n -A1 \"Accepted\" sshd.log</code> → thấy luôn dòng <i>session opened</i> ngay sau mỗi lần đăng nhập thành công.", interview: "Bạn loại bỏ nhiễu khỏi log khi điều tra như thế nào?" }
    ],
    steps: [
      {
        title: "[VPS] Tạo bản sao chỉ chứa dòng của sshd",
        text: "Làm tất cả phân tích trên bản sao trong <code>~/lab</code>, bằng quyền user thường.",
        code: "mkdir -p ~/lab\nsudo grep 'sshd\\[' /var/log/auth.log > ~/lab/sshd.log\nwc -l ~/lab/sshd.log            # số dòng của sshd\nls -l ~/lab/sshd.log            # chủ là nam -> không cần sudo nữa\ncd ~/lab\nhead -3 sshd.log\nlocale | head -2                # LANG=C.UTF-8 hoặc en_US.UTF-8 -> grep -P chạy được",
        why: "Ba lý do:<br>• <b>Không làm bẩn bằng chứng</b>: mỗi lệnh <code>sudo grep \"Invalid user\" ...</code> đều được ghi vào auth.log kèm chữ “Invalid user” → đếm sai. Mẫu <code>sshd\\[</code> chỉ lấy dòng do sshd ghi (dòng sudo ghi <code>sudo:</code>).<br>• <b>Least privilege</b>: dùng sudo đúng 1 lần, còn lại chạy bằng user thường.<br>• <b>Phân tích trên bản sao cố định</b>: file gốc thay đổi từng phút; bản sao cho kết quả lặp lại được (forensics: không làm việc trên bản gốc).",
        tip: "Dấu <code>&gt;</code> chạy bằng quyền <code>nam</code> nên file mới thuộc <code>nam</code> (học kỹ ở LINUX-3). Muốn gộp cả log cũ: <code>sudo grep -h 'sshd\\[' /var/log/auth.log.1 /var/log/auth.log &gt; ~/lab/sshd.log</code> (<code>-h</code> = không in tên file; file .gz thì dùng <code>zgrep</code>)."
      },
      {
        title: "[VPS] grep cơ bản: -c, -i, -n, -v, -w",
        code: "grep -c \"Invalid user\" sshd.log          # đếm dòng\ngrep -ci \"invalid user\" sshd.log         # -i: gồm cả 'invalid user' chữ thường (dòng Connection closed by invalid user...)\ngrep -n \"Accepted\" sshd.log              # -n: kèm số dòng\ngrep -v -e \"Invalid user\" -e \"invalid user\" sshd.log | head   # -v: BỎ các dòng khớp -> xem phần còn lại\ngrep -v -e \"Invalid user\" -e \"invalid user\" sshd.log | wc -l\ngrep -c \"user admin\" sshd.log            # khớp cả administrator, admin1...\ngrep -cw \"admin\" sshd.log                # -w: chỉ đúng từ 'admin'",
        why: "Hiểu <b>chính xác mình đang đếm cái gì</b>: <code>Invalid user</code> (viết hoa I) = lượt thử username không tồn tại; <code>-i</code> sẽ đếm thêm dòng <i>Connection closed by invalid user</i> của cùng lượt đó → <b>đếm trùng</b>. <code>-v</code> dùng để loại nhiễu, thấy phần “còn lại” (thường là chỗ đáng chú ý). <code>-w</code> tránh khớp nhầm từ dài hơn.",
        tip: "Ví dụ trên log mẫu: <code>\"user admin\"</code> = 8 dòng nhưng <code>-w admin</code> = 6 – vì loại được <code>administrator</code> và <code>admin1</code>."
      },
      {
        title: "[VPS] grep -E và ngữ cảnh -A / -B",
        code: "grep -cE \"Failed password|Invalid user\" sshd.log     # A hoặc B\ngrep -E \"Failed password for (invalid user )?root\" sshd.log | head -3\ngrep -n -A1 \"Accepted\" sshd.log                     # thêm 1 dòng SAU mỗi lần đăng nhập thành công\ngrep -B2 \"Accepted publickey\" sshd.log | head       # 2 dòng TRƯỚC: có thất bại nào ngay trước không?",
        why: "<code>-E</code> cho phép gộp nhiều dấu hiệu vào một lần tìm. <code>-A/-B</code> cho thấy <b>ngữ cảnh</b>: sau <i>Accepted</i> là <i>session opened for user ...</i>; nếu <b>ngay trước</b> một lần <i>Accepted</i> có hàng loạt <i>Failed password</i> từ cùng IP → dấu hiệu <b>brute force thành công</b> – cảnh báo nghiêm trọng nhất của bài này.",
        tip: "<code>--</code> trong kết quả <code>-A/-B</code> là dấu ngăn cách giữa các nhóm, không phải nội dung log."
      },
      {
        title: "[VPS] Dây chuyền đầu tiên: top username bị thử",
        text: "Chạy <b>từng đoạn một</b> để thấy dữ liệu biến đổi qua mỗi dấu <code>|</code>.",
        code: "grep -oP 'Invalid user \\K\\S+' sshd.log | head -5                 # 1) chỉ lấy username\ngrep -oP 'Invalid user \\K\\S+' sshd.log | sort | head -5          # 2) xếp cho giống nhau nằm cạnh nhau\ngrep -oP 'Invalid user \\K\\S+' sshd.log | sort | uniq -c | head -5    # 3) đếm\ngrep -oP 'Invalid user \\K\\S+' sshd.log | sort | uniq -c | sort -nr | head   # 4) top 10\ngrep -oP 'Invalid user \\K\\S+' sshd.log | sort -u | wc -l          # có bao nhiêu username khác nhau",
        why: "Chạy từng đoạn là cách <b>gỡ lỗi pipeline</b> và hiểu thật sự chứ không chép thuộc. Top username cho biết bot đang dùng danh sách gì: <code>ubuntu, admin, oracle, postgres, linaro</code> = <b>tài khoản mặc định</b> của cloud, database, thiết bị IoT → <b>T1110.001</b> + nhắm <b>T1078.001 Default Accounts</b>.",
        tip: "Ví dụ trên log mẫu: <code>4 ubuntu / 3 admin / 1 test / 1 postgres / 1 oracle</code>. Dòng <code>Invalid user  from ...</code> (bot gửi username rỗng – 2 dấu cách) bị <code>\\S+</code> bỏ qua – đó là chủ ý."
      },
      {
        title: "[VPS] Top IP tấn công & số IP khác nhau",
        code: "grep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' sshd.log | sort | uniq -c | sort -nr | head\ngrep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' sshd.log | sort -u | wc -l     # số IP khác nhau\n# IP nào thử mật khẩu (Failed password) nhiều nhất:\ngrep -oP 'Failed password for (invalid user )?\\S+ from \\K[0-9a-fA-F.:]+' sshd.log | sort | uniq -c | sort -nr | head",
        why: "<code>\\S*</code> (dấu sao: 0 hoặc nhiều ký tự) để vẫn khớp khi username rỗng; <code>[0-9a-fA-F.:]+</code> khớp cả IPv4 và IPv6. Tỷ lệ <b>số lượt / số IP</b> nói lên kiểu tấn công: vài IP rất nhiều lượt = brute force tập trung (fail2ban chặn hiệu quả); hàng trăm IP mỗi IP vài lượt = <b>botnet phân tán</b> (chặn IP vô ích, phải tắt mật khẩu).",
        tip: "Sau VPS-1, đăng nhập mật khẩu đã tắt nên <i>Failed password</i> có thể chỉ còn ở phần log trước khi gia cố. Tra IP top trên AbuseIPDB / ipinfo (VPS-2) – <b>không tấn công ngược</b>."
      },
      {
        title: "[VPS] Cắt cột bằng cut và awk",
        code: "grep \"Invalid user\" sshd.log | head -2\n# cột (theo dấu cách): 1=thời gian 2=host 3=sshd[PID]: 4=Invalid 5=user 6=username 7=from 8=IP\ngrep \"Invalid user\" sshd.log | cut -d' ' -f1,6,8 | head -3          # thời gian, user, IP\ngrep \"Invalid user\" sshd.log | awk '{print $6, $8}' | head -3\n# IP luôn là cột thứ 3 tính từ cuối (… from IP port SỐ) -> bền hơn khi username rỗng\nawk '/Invalid user/ {print $(NF-2)}' sshd.log | sort | uniq -c | sort -nr | head -5\n# Loại sự kiện = từ đầu tiên của nội dung (cột 4): Invalid, Connection, Accepted, Failed...\nawk '{print $4}' sshd.log | sort | uniq -c | sort -nr | head",
        why: "Nhiều log là “bảng” cách nhau bằng dấu cách – cắt đúng cột là kỹ năng nền cho mọi công cụ (SIEM cũng làm việc này khi <b>parse</b> log thành trường). <code>cut</code> nhanh, đơn giản nhưng coi 2 dấu cách liền nhau là có cột rỗng; <code>awk</code> coi mọi khoảng trắng như một và biết đếm từ cuối (<code>$NF</code>, <code>$(NF-2)</code>) – bền hơn với dòng lạ.",
        tip: "<code>awk '/mẫu/ {print ...}'</code> = vừa lọc dòng vừa in cột, không cần grep. Chỉ dùng hàm cơ bản (<code>substr</code>, <code>split</code>, <code>printf</code>) – awk mặc định của Ubuntu là mawk."
      },
      {
        title: "[VPS] Gom IP theo dải /24",
        code: "grep -oP 'Invalid user \\S* from \\K[0-9.]+' sshd.log | cut -d. -f1-3 | sort | uniq -c | sort -nr | head\n# Xem các IP cụ thể trong dải đứng đầu (thay 77.239.124 bằng dải của bạn):\ngrep -oP 'Invalid user \\S* from \\K77\\.239\\.124\\.[0-9]+' sshd.log | sort | uniq -c | sort -nr",
        why: "<code>cut -d. -f1-3</code> cắt theo dấu chấm, giữ 3 phần đầu của IPv4 = dải /24. Nhiều IP khác nhau cùng một /24, mỗi IP vài lượt, thử cùng danh sách user = <b>một nhóm điều phối</b> (botnet, hoặc một nhà cung cấp hosting bị lạm dụng). Thông tin này dùng cho <b>enrichment</b> và khi đề xuất chặn cả dải ở firewall biên.",
        tip: "Mẫu <code>[0-9.]+</code> chỉ lấy IPv4. Trong regex, <code>\\.</code> = dấu chấm thật (dấu chấm trơn nghĩa là “ký tự bất kỳ”). Ví dụ log mẫu: <code>9 77.239.124 / 4 193.32.162 / 2 103.77.240</code>."
      },
      {
        title: "[VPS] Số lượt tấn công theo giờ (có xử lý múi giờ)",
        code: "# 1) Log có những múi giờ nào? (ký tự 27-32 của dấu thời gian)\nawk '{print substr($1,27)}' sshd.log | sort | uniq -c\n#   6 +00:00     <- dòng trước khi đổi múi giờ\n#  23 +07:00\n# 2) Đếm nhanh theo giờ (CHƯA quy đổi):\ngrep \"Invalid user\" sshd.log | cut -c12-13 | sort | uniq -c\n# 3) Quy mọi dòng về giờ Việt Nam rồi đếm:\nawk '/Invalid user/ {h=substr($1,12,2)+0; if (substr($1,27)==\"+00:00\") h=(h+7)%24; printf \"%02d\\n\", h}' sshd.log | sort | uniq -c\n# 4) Theo ngày + giờ (để thấy đợt tấn công):\ngrep \"Invalid user\" sshd.log | cut -c1-13 | sort | uniq -c | sort -nr | head",
        why: "Dấu thời gian RFC3339 có <b>độ dài cố định</b> nên cắt theo vị trí ký tự là đủ: 12–13 = giờ, 27–32 = múi giờ. <code>+0</code> biến chuỗi “03” thành số 3; <code>%24</code> để 23+7 quay vòng thành 6. Biểu đồ theo giờ cho thấy <b>đợt tấn công</b> (burst) – trong SIEM đây là biểu đồ “events over time”, căn cứ để đặt ngưỡng cảnh báo.",
        tip: "Nếu bước 1 chỉ có <code>+07:00</code> thì không cần quy đổi. Ở bước 3, dòng +00:00 lúc gần nửa đêm UTC sẽ sang ngày hôm sau theo giờ VN – để đếm theo <b>giờ trong ngày</b> thì không sao, còn dựng timeline theo ngày thì phải nhớ điều này."
      },
      {
        title: "[VPS] Ai đã đăng nhập thành công?",
        code: "grep \"Accepted\" sshd.log | wc -l\nawk '/Accepted/ {print $1, $5, $7, $9}' sshd.log       # thời gian, phương thức, user, IP\ngrep -oP 'Accepted \\S+ for \\S+ from \\K\\S+' sshd.log | sort | uniq -c   # IP đăng nhập thành công\ngrep -oP 'Accepted publickey.*\\KSHA256:\\S+' sshd.log | sort | uniq -c    # fingerprint key đã dùng\ngrep -cE \"Failed password for root|authenticating user root\" sshd.log   # root bị nhắm bao nhiêu lần",
        why: "Câu hỏi số 1 sau mọi đợt brute force: <b>“có ai vào được không?”</b>. Kết quả an toàn: mọi IP trong danh sách <i>Accepted</i> đều là IP của bạn; phương thức gần đây là <code>publickey</code>; chỉ có <b>một fingerprint</b> và khớp key của bạn (VPS-1). Dòng <code>Accepted password for root</code> chỉ được phép nằm ở <b>trước</b> thời điểm gia cố.",
        tip: "Thấy <i>Accepted</i> từ IP lạ, hoặc fingerprint lạ → coi là <b>sự cố thật</b>: ghi lại, không xóa gì, báo cáo (LINUX-3 sẽ học cách lưu bằng chứng)."
      },
      {
        title: "[VPS] find: file nào thay đổi, file nào bất thường",
        code: "sudo find /etc -type f -mtime -1                      # file cấu hình sửa trong 24 giờ qua\nsudo find /etc -type f -mmin -60                      # ... trong 60 phút qua\nsudo find /etc -type f -newer ~/.ssh/authorized_keys  # sửa SAU lúc bạn đặt SSH key (VPS-1)\nsudo find /var/log -type f -size +1M -exec ls -lh {} \\;   # file log lớn hơn 1 MB\nsudo find /var/log -name \"*.gz\" | wc -l               # số log cũ đã nén\nfind ~ -type f -user nam -mmin -120                   # file của bạn trong 2 giờ qua\nfind / -name \"*.conf\" 2>/dev/null | wc -l            # 2>/dev/null: ẩn lỗi Permission denied",
        why: "Khi nghi bị xâm nhập lúc X, câu hỏi tiếp theo là <b>“từ lúc X, cái gì đã thay đổi?”</b>. <code>-newer file_mốc</code> rất tiện: lấy một file có thời gian đã biết làm mốc. File log phình to bất thường có thể là tấn công đang diễn ra hoặc lỗi lặp. Trên VPS có <code>unattended-upgrades</code>, vài file trong <code>/etc</code> thay đổi sau khi cập nhật là <b>bình thường</b> – phải đối chiếu với lịch cập nhật (<code>/var/log/apt/history.log</code>) trước khi kết luận.",
        tip: "<code>-mtime -1</code> = trong vòng 1 ngày; <code>+1</code> = cũ hơn 1 ngày. <code>{}</code> = tên từng file tìm được, <code>\\;</code> = kết thúc lệnh của <code>-exec</code>. <b>Không</b> dùng <code>-exec rm</code> hay <code>-delete</code> trong lab này."
      },
      {
        title: "Thử thách 1: Mỗi IP đã thử bao nhiêu username khác nhau?",
        text: "Xếp hạng các IP theo <b>số username khác nhau</b> mà chúng đã thử (không phải số lượt). IP thử nhiều username khác nhau đang <b>dò tìm tài khoản</b> (user enumeration).",
        why: "Cùng 10 lượt nhưng “10 lần cùng user <code>root</code>” (đoán mật khẩu) khác hẳn “10 user khác nhau” (dò tài khoản). Phân biệt được giúp mô tả đúng kỹ thuật trong báo cáo.",
        tip: "<b>Đáp án gợi ý:</b> <code>grep -oP 'Invalid user \\K\\S+ from \\S+' sshd.log | sort -u | awk '{print $3}' | sort | uniq -c | sort -nr | head</code><br><code>sort -u</code> bỏ các cặp (user, IP) trùng, rồi đếm số lần mỗi IP xuất hiện. Log mẫu: <code>3 77.239.124.32</code> (đã thử ubuntu, admin, centos)."
      },
      {
        title: "Thử thách 2: Có IP nào vừa tấn công vừa đăng nhập thành công?",
        text: "Tạo danh sách IP đăng nhập thành công, rồi kiểm tra xem có IP nào <b>cũng nằm trong</b> danh sách IP <i>Invalid user</i> không. Kết quả mong đợi: <b>rỗng</b>.",
        why: "Đây là <b>correlation</b> (đối chiếu) cơ bản – quy tắc SIEM kinh điển “nhiều lần thất bại rồi thành công từ cùng nguồn”. Kết quả có dòng nào = phải điều tra ngay.",
        tip: "<b>Đáp án gợi ý:</b><br><code>grep -oP 'Accepted \\S+ for \\S+ from \\K\\S+' sshd.log | sort -u &gt; ok_ips.txt</code><br><code>grep -oP 'Invalid user \\S* from \\K\\S+' sshd.log | sort -u | grep -Fxf ok_ips.txt</code><br><code>-F</code> = so chuỗi cố định, <code>-x</code> = khớp cả dòng, <code>-f file</code> = lấy danh sách mẫu từ file. Không in gì = không có IP trùng."
      }
    ],
    verify: [
      "Có <code>~/lab/sshd.log</code> thuộc <code>nam</code> và giải thích được vì sao lọc <code>sshd\\[</code> thay vì đếm thẳng trên auth.log.",
      "Có số liệu: tổng <i>Invalid user</i>, số username khác nhau, số IP khác nhau, top 10 username, top 10 IP.",
      "Có bảng gom theo dải /24 và nhận xét về botnet phân tán.",
      "Có bảng số lượt theo giờ đã <b>quy về +07:00</b>, biết log có bao nhiêu dòng mỗi múi giờ.",
      "Liệt kê mọi lần <i>Accepted</i>: IP, user, phương thức, fingerprint – và kết luận có/không bị xâm nhập.",
      "Chạy được <code>find</code> với <code>-mtime</code>, <code>-mmin</code>, <code>-newer</code>, <code>-size</code>, <code>-exec</code> và giải thích kết quả.",
      "Hoàn thành 2 thử thách; thử thách 2 cho kết quả rỗng (không IP tấn công nào đăng nhập thành công)."
    ],
    questions: [
      "Giải thích từng phần của <code>sort | uniq -c | sort -nr | head</code>. Bỏ <code>sort</code> đầu tiên thì sai thế nào?",
      "Vì sao chạy <code>sudo grep -c \"Invalid user\"</code> nhiều lần trên auth.log lại cho con số tăng dần? Bạn khắc phục thế nào?",
      "Một IP 500 lượt với 1 username khác gì 500 IP mỗi IP 1 lượt? Biện pháp phòng thủ cho mỗi trường hợp?",
      "Log lẫn <code>+00:00</code> và <code>+07:00</code> – bạn đếm số lượt theo giờ cho đúng thế nào?",
      "Khi nào dùng <code>cut</code>, khi nào dùng <code>awk</code>? Cho một ví dụ <code>cut</code> cho kết quả sai.",
      "Nghi server bị xâm nhập lúc 2h sáng nay – bạn dùng <code>find</code> thế nào để tìm file đã thay đổi? Kết quả nào là bình thường?",
      "Quy tắc correlation “nhiều lần thất bại rồi thành công từ cùng IP” – bạn kiểm tra thủ công bằng lệnh Linux thế nào?"
    ],
    output: "Writeup <b>\"Phân tích brute force SSH bằng dòng lệnh Linux\"</b>: (1) thời gian quan sát và số dòng mỗi múi giờ; (2) tổng lượt, số username/IP khác nhau; (3) top 10 username + ý nghĩa (tài khoản mặc định, T1110.001 / T1078.001); (4) top 10 IP và bảng /24, nhận xét botnet; (5) biểu đồ (bảng) số lượt theo giờ +07:00; (6) danh sách <i>Accepted</i> + fingerprint + kết luận; (7) kết quả <code>find</code> và giải thích; (8) <b>toàn bộ lệnh đã dùng</b> kèm 1 dòng giải thích mỗi lệnh. <b>Che IP VPS và IP nhà bạn.</b>"
  },

  {
    id: "LINUX-3",
    track: "chung",
    week: 2,
    optional: true,
    title: "Quản lý file & thư mục, chuyển hướng output, đóng gói bằng chứng",
    goal: "Thành thạo tạo/sao chép/di chuyển/xóa file <b>an toàn</b> trong <code>~/lab</code>; điều khiển nơi kết quả lệnh được ghi (<code>&gt;</code>, <code>&gt;&gt;</code>, <code>2&gt;</code>, <code>2&gt;&amp;1</code>, <code>/dev/null</code>, <code>tee</code>); rồi làm trọn một vòng <b>thu thập bằng chứng</b>: sao chép giữ nguyên thời gian, băm <b>SHA-256</b>, nén <code>tar</code>, tải về Windows bằng <code>scp</code> và <b>kiểm tra hash khớp</b> – chain of custody thu nhỏ.",
    time: "60–75 phút",
    prereq: ["VPS-1", "LINUX-2"],
    concepts: ["mkdir / touch / cp / mv / rm", "Redirection", "stdout / stderr", "/dev/null", "tee", "Hash SHA-256", "Integrity", "Chain of custody", "tar", "scp"],
    theory: [
      { title: "Ba luồng dữ liệu: stdin, stdout, stderr", body: "Mỗi lệnh có 3 “ống”: <b>0 = stdin</b> (đầu vào), <b>1 = stdout</b> (kết quả), <b>2 = stderr</b> (thông báo lỗi). Mặc định cả 1 và 2 đều in ra màn hình nên trông giống nhau, nhưng chúng là <b>hai luồng riêng</b> – vì vậy có thể lưu kết quả vào file và vẫn thấy lỗi trên màn hình, hoặc ngược lại." },
      { title: "Chuyển hướng: &gt;, &gt;&gt;, 2&gt;, 2&gt;&amp;1, /dev/null", body: "• <code>&gt; file</code>: ghi stdout vào file, <b>xóa nội dung cũ</b> (ghi đè).<br>• <code>&gt;&gt; file</code>: <b>ghi thêm</b> vào cuối file.<br>• <code>2&gt; file</code>: ghi riêng lỗi.<br>• <code>&gt; file 2&gt;&amp;1</code>: ghi cả kết quả lẫn lỗi vào một file (thứ tự quan trọng: <code>&gt; file</code> trước, <code>2&gt;&amp;1</code> sau).<br>• <code>/dev/null</code>: “hố đen” – ghi vào là biến mất. <code>2&gt;/dev/null</code> = ẩn lỗi." },
      { title: "tee – vừa xem vừa lưu", body: "<code>lệnh | tee file</code> in kết quả ra màn hình <b>và</b> ghi vào file cùng lúc (như chữ T của ống nước rẽ hai nhánh). <code>tee -a</code> = ghi thêm. <code>sudo tee</code> còn là cách đúng để ghi vào file của root, vì trong <code>sudo echo x &gt; /etc/file</code> thì phần <code>&gt;</code> do shell của <b>bạn</b> (không phải root) thực hiện → <i>Permission denied</i>." },
      { title: "Hash & tính toàn vẹn (integrity)", body: "<b>Hash</b> (SHA-256) là “dấu vân tay” 64 ký tự hex của nội dung file: cùng nội dung → cùng hash; sửa <b>một ký tự</b> → hash khác hoàn toàn (hiệu ứng tuyết lở). Không thể đảo ngược từ hash ra nội dung. Băm bằng chứng ngay khi thu thập, rồi băm lại lúc kiểm tra: khớp = <b>chưa bị sửa</b> – chữ I trong tam giác CIA (Khóa 1)." },
      { title: "Chain of custody (chuỗi lưu giữ bằng chứng)", body: "Khóa 6: bằng chứng chỉ có giá trị khi chứng minh được <b>ai thu thập, lúc nào, từ đâu, đã qua tay ai, có bị sửa không</b>. Phiên bản thu nhỏ trong lab: thư mục có <b>ngày giờ</b> trong tên, file ghi chú (ai/khi nào/lệnh gì), bản sao <b>giữ nguyên dấu thời gian</b> (<code>cp -p</code>), file <b>SHA256SUMS</b>, gói <code>tar.gz</code> có hash, và kiểm tra lại hash sau khi chuyển sang máy khác." },
      { title: "Dấu thời gian của file: mtime, ctime, atime", body: "<b>mtime</b> = lần sửa nội dung cuối (cái <code>ls -l</code> hiển thị); <b>ctime</b> = lần đổi metadata cuối (quyền, chủ); <b>atime</b> = lần đọc. <code>cp</code> thường tạo file mới với mtime = <b>bây giờ</b> → mất thông tin “file gốc sửa lúc nào”. <code>cp -p</code> (preserve) giữ mtime, quyền, chủ (khi chạy bằng root). Với điều tra, mất mtime gốc = mất một mảnh của timeline." },
      { title: "rm không có thùng rác", body: "Trên Linux, <code>rm</code> xóa <b>ngay lập tức, không có Recycle Bin</b>. <code>rm -r</code> xóa cả cây thư mục; thêm <code>-f</code> thì không hỏi gì. Một dấu cách nhầm (<code>rm -rf / tmp/x</code> thay vì <code>/tmp/x</code>) có thể xóa cả hệ thống. Quy tắc lab: <b>chỉ xóa trong <code>~/lab</code></b>, <code>pwd</code> + <code>ls</code> trước khi xóa, ưu tiên <code>rm -i</code>." }
    ],
    pitfalls: [
      "<b>Dùng <code>&gt;</code> khi muốn <code>&gt;&gt;</code></b> → mất sạch nội dung cũ, không có undo. Muốn shell chặn ghi đè nhầm: <code>set -o noclobber</code> (khi đó cần <code>&gt;|</code> để cố ý ghi đè).",
      "<b><code>sudo echo ... &gt; /etc/file</code> báo Permission denied</b>: phần <code>&gt;</code> chạy bằng quyền của bạn. Dùng <code>echo ... | sudo tee /etc/file</code> – nhưng trong lab này <b>không ghi vào /etc</b>.",
      "<b>Viết sai thứ tự <code>2&gt;&amp;1 &gt; file</code></b> → lỗi vẫn ra màn hình. Đúng là <code>&gt; file 2&gt;&amp;1</code>.",
      "<b>Băm <code>/var/log/auth.log</code> gốc và bản sao rồi thấy khác nhau</b>: file gốc vẫn đang được ghi thêm dòng mới mỗi phút. Băm <b>bản sao</b> ngay sau khi chép và coi đó là mốc.",
      "<b>Bản sao do <code>sudo cp -p</code> tạo ra vẫn thuộc <code>syslog:adm</code></b> → user nam không đọc/tải về được. Đổi chủ bản sao: <code>sudo chown nam:nam file</code> (mtime không đổi).",
      "<b>So hash Windows và Linux thấy “khác”</b>: <code>Get-FileHash</code> in chữ HOA, <code>sha256sum</code> in chữ thường – so từng ký tự không phân biệt hoa/thường."
    ],
    keycards: [
      { front: "<code>&gt;</code> khác <code>&gt;&gt;</code> thế nào? <code>2&gt;</code>, <code>2&gt;&amp;1</code>, <code>/dev/null</code> dùng làm gì?", def: "<code>&gt;</code> ghi đè (xóa nội dung cũ); <code>&gt;&gt;</code> ghi thêm vào cuối. <code>2&gt; file</code> ghi riêng lỗi (stderr); <code>&gt; file 2&gt;&amp;1</code> ghi cả kết quả và lỗi vào một file; <code>2&gt;/dev/null</code> vứt bỏ lỗi.", example: "<code>find / -name \"*.conf\" 2&gt;/dev/null</code> – chỉ thấy kết quả, không thấy hàng trăm dòng Permission denied.", trap: "Thứ tự: <code>&gt; file 2&gt;&amp;1</code> đúng; <code>2&gt;&amp;1 &gt; file</code> thì lỗi vẫn ra màn hình.", interview: "stdout và stderr là gì? Vì sao tách riêng hai luồng lại hữu ích khi viết script thu thập log?" },
      { front: "Vì sao <code>sudo echo \"x\" &gt; /etc/file</code> vẫn báo Permission denied? Cách đúng?", def: "<code>sudo</code> chỉ áp dụng cho <code>echo</code>; phần chuyển hướng <code>&gt;</code> do <b>shell của bạn</b> (user thường) thực hiện → không có quyền ghi /etc. Cách đúng: <code>echo \"x\" | sudo tee /etc/file &gt; /dev/null</code> (<code>tee -a</code> để ghi thêm).", example: "VPS-1 tạo file cấu hình SSH bằng <code>sudo tee /etc/ssh/sshd_config.d/00-hardening.conf</code> chính vì lý do này.", trap: "Tương tự: <code>sudo grep ... &gt; ~/lab/x.txt</code> tạo file thuộc <b>nam</b> (không phải root) – có lợi, như ở LINUX-2." },
      { front: "Hash SHA-256 dùng để làm gì khi thu thập bằng chứng? Kiểm tra lại thế nào?", def: "Tạo “dấu vân tay” của nội dung file. Băm ngay khi thu thập (<code>sha256sum file &gt; SHA256SUMS.txt</code>); sau này kiểm tra <code>sha256sum -c SHA256SUMS.txt</code> → <code>OK</code> = nội dung chưa đổi một bit nào. Chứng minh <b>integrity</b> – mắt xích quan trọng của <b>chain of custody</b>.", example: "Thêm 1 ký tự vào file → hash đổi hoàn toàn, <code>-c</code> báo <code>FAILED</code>.", trap: "Hash chứng minh <b>không bị sửa</b>, không chứng minh <b>ai</b> tạo ra file – vẫn cần ghi chú người thu thập, thời gian, nguồn.", interview: "Chain of custody là gì? Bạn đảm bảo log thu thập được không bị sửa như thế nào?" },
      { front: "<code>cp</code> và <code>cp -p</code> khác nhau thế nào? Vì sao quan trọng khi thu thập bằng chứng?", def: "<code>cp</code> tạo file mới với thời gian sửa (mtime) = <b>lúc copy</b>. <code>cp -p</code> (preserve) <b>giữ nguyên mtime</b>, quyền và (khi chạy bằng root) chủ sở hữu của file gốc. Mất mtime gốc = mất một mốc trong timeline điều tra.", example: "<code>ls -l --time-style=full-iso</code> cho thấy bản <code>cp -p</code> có đúng giờ của file gốc, bản <code>cp</code> mang giờ hiện tại.", trap: "<code>chown</code> sau đó không làm đổi mtime (chỉ đổi ctime) – bản sao vẫn giữ mốc thời gian gốc." },
      { front: "<code>rm</code>, <code>rm -r</code>, <code>rm -rf</code> nguy hiểm thế nào? Quy tắc an toàn?", def: "<code>rm</code> xóa vĩnh viễn, <b>không có thùng rác</b>. <code>-r</code> xóa cả thư mục và mọi thứ bên trong; <code>-f</code> không hỏi, không báo lỗi. Quy tắc: chỉ xóa trong thư mục làm việc (<code>~/lab</code>), chạy <code>pwd</code> + <code>ls</code> trước, dùng <code>rm -i</code>, <b>không bao giờ</b> <code>rm -rf</code> trên đường dẫn hệ thống hay đường dẫn có biến chưa kiểm tra.", trap: "Một dấu cách thừa: <code>rm -rf / tmp/x</code> = xóa <code>/</code> và <code>tmp/x</code>.", interview: "Kẻ tấn công xóa log bằng <code>rm</code> – SOC còn phát hiện được không? (log tập trung về SIEM, MITRE T1070)" },
      { front: "Đóng gói và chuyển bằng chứng từ Linux về Windows an toàn thế nào?", def: "1) <code>tar -czf evidence_&lt;ngày&gt;.tar.gz -C ~/lab evidence</code> (<code>c</code>=create, <code>z</code>=gzip, <code>f</code>=tên file).<br>2) <code>sha256sum</code> gói đó, ghi lại hash.<br>3) Windows: <code>scp nam@&lt;IP&gt;:lab/evidence_&lt;ngày&gt;.tar.gz .</code> (đi qua SSH, có mã hóa).<br>4) <code>Get-FileHash ... -Algorithm SHA256</code> → so với hash ở VPS.", trap: "<code>tar -tzf</code> để <b>xem</b> nội dung; <code>-x</code> mới giải nén. Hash Windows in chữ HOA – vẫn là cùng một giá trị.", interview: "Vì sao dùng scp/SFTP thay vì FTP để chuyển log?" },
      { front: "Lệnh <code>tee</code> làm gì? Khi nào dùng?", def: "Đọc từ stdin, <b>vừa in ra màn hình vừa ghi vào file</b> (như chữ T rẽ nhánh ống nước). <code>tee -a</code> = ghi thêm. Dùng khi muốn <b>xem kết quả ngay</b> và đồng thời <b>lưu làm bằng chứng</b>, hoặc để ghi vào file cần quyền root (<code>| sudo tee</code>).", example: "<code>grep ... | sort | uniq -c | sort -nr | tee analysis/top_ips.txt</code>" }
    ],
    steps: [
      {
        title: "[VPS] Quy tắc an toàn & dựng thư mục bằng chứng",
        text: "<b>Quy tắc của lab này</b>: chỉ tạo/sửa/xóa trong <code>~/lab</code>; không <code>rm -rf</code>, <code>chmod -R</code>, <code>chown -R</code> trên đường dẫn hệ thống; không sửa <code>/etc/ssh</code> hay UFW; không chạy lệnh <code>sudo</code> mà bạn chưa hiểu.",
        code: "date                    # Mon Nov 16 14:35:35 +07 2026\ndate +%F                # 2026-11-16      (ngày, dùng trong tên thư mục)\ndate +%F_%H%M           # 2026-11-16_1435\ndate -Iseconds          # 2026-11-16T14:35:35+07:00 (dùng trong ghi chú)\nmkdir -p ~/lab/evidence/$(date +%F)/{logs,analysis}\ncd ~/lab/evidence/$(date +%F)\npwd\nfind ~/lab -type d      # xem cây thư mục vừa tạo",
        why: "Thư mục có <b>ngày trong tên</b> là mắt xích đầu của chain of custody: nhìn là biết bằng chứng thu lúc nào. <code>$(lệnh)</code> = chèn kết quả của lệnh vào chỗ đó; <code>{logs,analysis}</code> = tạo 2 thư mục con trong một lệnh; <code>-p</code> = tạo cả thư mục cha nếu chưa có và không báo lỗi nếu đã tồn tại. Định dạng <code>YYYY-MM-DD</code> sắp xếp theo chữ cũng chính là theo thời gian.",
        tip: "Làm qua nửa đêm thì <code>$(date +%F)</code> sẽ ra ngày mới – khi đó gõ thẳng tên thư mục (vd <code>cd ~/lab/evidence/2026-11-16</code>)."
      },
      {
        title: "[VPS] touch & nano: tạo file ghi chú vụ việc",
        code: "touch notes.md\nls -l notes.md          # file rỗng, 0 byte\nnano notes.md\n# Gõ nội dung ví dụ:\n#   Vu viec: Phan tich brute force SSH tren soc-sensor\n#   Nguoi thu thap: nam\n#   Nguon: /var/log/auth.log\n# Ctrl+O -> Enter (lưu), Ctrl+X (thoát)\ncat notes.md\ntouch notes.md; ls -l notes.md   # touch file đã có -> chỉ cập nhật thời gian sửa",
        why: "<code>touch</code> tạo file rỗng, hoặc <b>cập nhật thời gian</b> của file đã có – nghĩa là thời gian file <b>có thể bị làm giả</b> (kẻ tấn công dùng <code>touch -d</code> để “timestomp”, <b>T1070.006</b>), vì vậy đừng tin mù quáng vào mtime. <code>nano</code> là trình soạn thảo dễ nhất (Khóa 4): không tự lưu, phải Ctrl+O.",
        tip: "Phím tắt nano hiện ở 2 dòng cuối màn hình; <code>^</code> = phím Ctrl. Lỡ tay sửa lung tung: Ctrl+X → <b>N</b> (không lưu)."
      },
      {
        title: "[VPS] Chuyển hướng &gt; và &gt;&gt;: lưu kết quả phân tích",
        code: "echo \"Bat dau: $(date -Iseconds)\" >> notes.md\n\n# Kết quả từ LINUX-2 lưu thành file (cần ~/lab/sshd.log; nếu chưa có, chạy lại bước 1 của LINUX-2)\ngrep -c \"Invalid user\" ~/lab/sshd.log > analysis/invalid_count.txt\ngrep -oP 'Invalid user \\K\\S+' ~/lab/sshd.log | sort | uniq -c | sort -nr | head > analysis/top_users.txt\ncat analysis/invalid_count.txt analysis/top_users.txt\n\n# Thấy tác hại của > :\necho \"dong 1\" > demo.txt\necho \"dong 2\" > demo.txt\ncat demo.txt            # chỉ còn 'dong 2'\necho \"dong 3\" >> demo.txt\ncat demo.txt            # dong 2, dong 3",
        why: "Kết quả chỉ nằm trên màn hình thì <b>mất</b> khi đóng cửa sổ; lưu ra file mới thành bằng chứng, gửi được cho người khác và băm được. <code>&gt;</code> ghi đè – tiện để tạo file kết quả mới, nhưng nguy hiểm với file ghi chú tích lũy (dùng <code>&gt;&gt;</code>).",
        tip: "Lo ghi đè nhầm: <code>set -o noclobber</code> → <code>&gt;</code> sẽ từ chối ghi vào file đã tồn tại (muốn cố ý ghi đè thì dùng <code>&gt;|</code>)."
      },
      {
        title: "[VPS] stderr, 2&gt;&amp;1, /dev/null và tee",
        code: "ls /etc/hostname /khongtontai                     # 1 dòng kết quả + 1 dòng lỗi\nls /etc/hostname /khongtontai > out.txt          # lỗi VẪN hiện: > chỉ bắt stdout\nls /etc/hostname /khongtontai > out.txt 2> err.txt\ncat out.txt; cat err.txt\nls /etc/hostname /khongtontai > all.txt 2>&1     # cả hai vào một file\nfind / -name \"*.conf\" | wc -l                    # màn hình đầy 'Permission denied'\nfind / -name \"*.conf\" 2>/dev/null | wc -l        # sạch\n\n# tee: vừa xem vừa lưu\ngrep -oP 'Invalid user \\S* from \\K[0-9a-fA-F.:]+' ~/lab/sshd.log | sort | uniq -c | sort -nr | head | tee analysis/top_ips.txt\nrm -i out.txt err.txt all.txt demo.txt           # dọn file thử (trả lời y)",
        why: "Kết quả (stdout) và lỗi (stderr) là <b>hai luồng riêng</b>: script thu thập log nên lưu lỗi riêng để biết bước nào thất bại (vd thiếu quyền) thay vì âm thầm thiếu dữ liệu. <code>2&gt;/dev/null</code> chỉ nên dùng khi bạn <b>biết</b> lỗi đó vô hại. <code>tee</code> hợp với điều tra: thấy ngay kết quả và đồng thời có file để đính kèm báo cáo.",
        tip: "Nhớ thứ tự: <code>&gt; file 2&gt;&amp;1</code> (“đưa stdout vào file, rồi cho stderr đi theo stdout”)."
      },
      {
        title: "[VPS] cp vs cp -p: thu thập log gốc giữ nguyên thời gian",
        code: "cp /etc/hostname h_cp.txt\ncp -p /etc/hostname h_cpp.txt\nls -l --time-style=full-iso /etc/hostname h_cp.txt h_cpp.txt\n# h_cp.txt mang giờ HIỆN TẠI, h_cpp.txt giữ giờ của file gốc\nrm -i h_cp.txt h_cpp.txt\n\n# Thu thập auth.log (cần sudo vì file thuộc syslog:adm)\nsudo cp -p /var/log/auth.log logs/\nls -l --time-style=full-iso logs/      # vẫn là syslog adm, giờ = giờ sửa của file gốc\nsudo chown nam:nam logs/auth.log       # đổi chủ BẢN SAO để nam đọc & tải về (LINUX-4 học kỹ)\nls -l --time-style=full-iso logs/      # chủ đổi, mtime KHÔNG đổi\ncp -p ~/lab/sshd.log logs/             # thêm bản lọc từ LINUX-2\necho \"Thu thap auth.log luc $(date -Iseconds) bang sudo cp -p\" >> notes.md",
        why: "Trong điều tra, <b>thời gian sửa cuối của file gốc</b> là một mốc timeline (vd log ngừng ghi lúc nào – dấu hiệu bị tắt/xóa log). <code>cp</code> thường làm mất mốc này; <code>cp -p</code> giữ lại. <code>chown</code> chỉ đổi metadata (ctime), không đổi nội dung hay mtime – vì vậy không ảnh hưởng hash. Mỗi thao tác đều được ghi vào <code>notes.md</code> = nhật ký chain of custody.",
        tip: "<code>cp -r</code> sao chép cả thư mục; <code>cp -rp</code> = cả thư mục và giữ thời gian. <b>Không</b> <code>chown</code> file gốc trong <code>/var/log</code> – chỉ đổi bản sao trong <code>~/lab</code>."
      },
      {
        title: "[VPS] mv & rm an toàn",
        code: "cd ~/lab\nmkdir -p tmp_test && touch tmp_test/a.txt tmp_test/b.txt\nmv tmp_test/a.txt tmp_test/a_renamed.txt     # mv = đổi tên\nmv tmp_test/b.txt .                          # mv = di chuyển (. = thư mục hiện tại)\nls tmp_test; ls b.txt\nrm -i b.txt                                  # -i: hỏi trước khi xóa\nrmdir tmp_test                               # lỗi: thư mục không rỗng\npwd; ls tmp_test                             # LUÔN kiểm tra trước khi xóa cả thư mục\nrm -r tmp_test",
        why: "<code>mv</code> vừa đổi tên vừa di chuyển, và <b>ghi đè không hỏi</b> nếu đích đã có file cùng tên (thêm <code>-i</code> để hỏi). <code>rm</code> không có thùng rác. Thói quen <b>pwd → ls → rm</b> giúp tránh xóa nhầm chỗ – sai lầm khó sửa nhất với người mới. <code>rmdir</code> chỉ xóa thư mục rỗng nên an toàn hơn <code>rm -r</code>.",
        tip: "<b>Không bao giờ</b>: <code>rm -rf /</code>, <code>rm -rf /*</code>, <code>rm -rf $BIEN/</code> khi chưa chắc biến có giá trị, <code>rm -rf</code> trên <code>/etc</code>, <code>/var</code>, <code>/usr</code>, <code>/home</code>. Trên máy thật, xóa log để “giải phóng chỗ” cũng là phá bằng chứng."
      },
      {
        title: "[VPS] sha256sum: băm bằng chứng & thấy hiệu ứng tuyết lở",
        code: "cd ~/lab/evidence/$(date +%F)\nsha256sum logs/* analysis/* > SHA256SUMS.txt\ncat SHA256SUMS.txt          # <64 ký tự hex>  logs/auth.log ...\nsha256sum -c SHA256SUMS.txt # mỗi file: OK\n\n# Thử sửa 1 ký tự trên một BẢN SAO:\ncp analysis/invalid_count.txt ~/lab/thu.txt\nsha256sum ~/lab/thu.txt\necho \"1\" >> ~/lab/thu.txt\nsha256sum ~/lab/thu.txt     # hash khác HOÀN TOÀN\nrm -i ~/lab/thu.txt\n\n# Vì sao không so với file gốc đang chạy:\nsudo sha256sum /var/log/auth.log logs/auth.log   # có thể khác: file gốc vừa có dòng mới",
        why: "Hash là cách chứng minh <b>integrity</b>: ai nhận bằng chứng chỉ cần chạy <code>sha256sum -c</code> – <code>OK</code> nghĩa là từng bit đều y nguyên kể từ lúc bạn thu thập. Hiệu ứng tuyết lở cho thấy không thể “sửa một chút” mà giữ được hash. Đây là cách SOC/forensics bàn giao log, ảnh đĩa, mẫu mã độc (VirusTotal cũng tra theo SHA-256).",
        tip: "<code>SHA256SUMS.txt</code> nằm ngoài <code>logs/</code> và <code>analysis/</code> nên không tự băm chính nó. Ghi thêm vào <code>notes.md</code>: <code>echo \"Da bam SHA-256 luc $(date -Iseconds)\" &gt;&gt; notes.md</code>."
      },
      {
        title: "[VPS] Đóng gói bằng chứng với tar",
        code: "cd ~/lab\ntar -czf evidence_$(date +%F).tar.gz -C ~/lab evidence\n#   c = create, z = nén gzip, f = tên file kết quả, -C ~/lab = đứng ở ~/lab khi đóng gói\ntar -tzf evidence_$(date +%F).tar.gz        # t = liệt kê nội dung (KHÔNG giải nén)\nls -lh evidence_*.tar.gz\nsha256sum evidence_$(date +%F).tar.gz | tee evidence_$(date +%F).tar.gz.sha256",
        why: "Một gói duy nhất dễ chuyển, dễ băm, dễ lưu trữ hơn hàng chục file rời. Log text nén rất tốt (thường giảm 5–10 lần). Hash của <b>cả gói</b> là thứ bạn ghi vào báo cáo/ticket để người nhận kiểm tra.",
        tip: "Nhớ chữ cái: <b>c</b>reate / e<b>x</b>tract / lis<b>t</b>, <b>z</b> = gzip, <b>f</b> luôn đứng cuối cụm vì ngay sau nó là tên file. <code>-C</code> giúp đường dẫn trong gói gọn (<code>evidence/...</code> thay vì <code>home/nam/lab/evidence/...</code>)."
      },
      {
        title: "[Windows] Tải bằng chứng về bằng scp & kiểm tra hash",
        text: "Mở PowerShell <b>trên Windows</b> (không phải trong phiên SSH). Thay <code>&lt;IP&gt;</code> và <code>&lt;ngay&gt;</code> (vd 2026-11-16) – xem tên file đúng bằng <code>ls ~/lab</code> trên VPS.",
        code: "# [Windows PowerShell]\ncd $env:USERPROFILE\\Downloads\nscp nam@<IP>:lab/evidence_<ngay>.tar.gz .\nscp nam@<IP>:lab/evidence_<ngay>.tar.gz.sha256 .\nGet-FileHash .\\evidence_<ngay>.tar.gz -Algorithm SHA256\ntype .\\evidence_<ngay>.tar.gz.sha256\n# So 2 chuỗi hash: Windows in chữ HOA, Linux chữ thường -> giống nhau là OK\ntar -tzf .\\evidence_<ngay>.tar.gz       # Windows 10/11 có sẵn tar",
        why: "<code>scp</code> chạy trên SSH nên dữ liệu được <b>mã hóa</b> khi truyền và dùng chính SSH key của bạn (không cần mở thêm port – UFW vẫn chỉ 22/tcp). Hash trên Windows khớp hash trên VPS = file <b>không bị hỏng hay bị sửa trên đường truyền</b> – mắt xích cuối của chain of custody trong lab.",
        tip: "Đường dẫn <code>lab/...</code> (không có <code>/</code> đầu) được tính từ home của nam trên VPS. Dấu <code>.</code> cuối lệnh = lưu vào thư mục hiện tại trên Windows."
      },
      {
        title: "Thử thách 1: Báo cáo nhanh một lệnh – có tiêu đề, giờ, top 5 IP",
        text: "Tạo <code>~/lab/evidence/&lt;ngày&gt;/analysis/report.txt</code> gồm: dòng tiêu đề có <b>hostname và thời gian ISO</b>, dòng tổng số <i>Invalid user</i>, rồi <b>top 5 IP</b>. Chỉ dùng <code>echo</code>, <code>$( )</code>, <code>&gt;</code> và <code>&gt;&gt;</code>.",
        why: "Ghép chuyển hướng với <code>$( )</code> là cách viết báo cáo tự động – nền tảng của script thu thập dùng trong SOC.",
        tip: "<b>Đáp án gợi ý:</b><br><code>R=~/lab/evidence/$(date +%F)/analysis/report.txt</code><br><code>echo \"Bao cao: $(hostname) $(date -Iseconds)\" &gt; $R</code><br><code>echo \"Tong Invalid user: $(grep -c 'Invalid user' ~/lab/sshd.log)\" &gt;&gt; $R</code><br><code>grep -oP 'Invalid user \\S* from \\K\\S+' ~/lab/sshd.log | sort | uniq -c | sort -nr | head -5 &gt;&gt; $R</code><br><code>cat $R</code>"
      },
      {
        title: "Thử thách 2: Người nhận kiểm tra lại bằng chứng",
        text: "Đóng vai người nhận: giải nén gói vào một thư mục <b>mới</b> <code>~/lab/check</code>, rồi dùng file <code>SHA256SUMS.txt</code> có sẵn trong gói để kiểm tra mọi file đều <code>OK</code>.",
        why: "Chain of custody chỉ có ý nghĩa khi <b>người khác</b> kiểm tra lại được độc lập bằng chính dữ liệu bạn bàn giao.",
        tip: "<b>Đáp án gợi ý:</b><br><code>mkdir -p ~/lab/check</code><br><code>tar -xzf ~/lab/evidence_$(date +%F).tar.gz -C ~/lab/check</code><br><code>cd ~/lab/check/evidence/$(date +%F) &amp;&amp; sha256sum -c SHA256SUMS.txt</code><br>Kết quả mong đợi: mỗi dòng <code>...: OK</code>. Xong thì <code>cd ~/lab &amp;&amp; rm -r check</code>."
      },
      {
        title: "Thử thách 3: Bao nhiêu lỗi đã bị /dev/null “nuốt”?",
        text: "Đếm xem lệnh <code>find / -name \"*.log\"</code> chạy bằng user thường tạo ra <b>bao nhiêu kết quả</b> và <b>bao nhiêu dòng Permission denied</b> – mỗi con số bằng một lệnh.",
        why: "Ẩn lỗi bằng <code>2&gt;/dev/null</code> tiện nhưng có thể che mất việc <b>thiếu dữ liệu</b>: user thường không tìm được file trong thư mục bị cấm – kết quả “không thấy” chưa chắc là “không có”.",
        tip: "<b>Đáp án gợi ý:</b><br><code>find / -name \"*.log\" 2&gt;/dev/null | wc -l</code> (số kết quả)<br><code>find / -name \"*.log\" 2&gt;&amp;1 &gt;/dev/null | grep -c \"Permission denied\"</code> (số lỗi – ở đây cố ý dùng thứ tự <code>2&gt;&amp;1 &gt;/dev/null</code>: lỗi đi vào ống, kết quả bị vứt)."
      }
    ],
    verify: [
      "Có cây <code>~/lab/evidence/&lt;ngày&gt;/{logs,analysis}</code> và <code>notes.md</code> ghi người thu thập, nguồn, thời gian từng thao tác.",
      "Giải thích được <code>&gt;</code> vs <code>&gt;&gt;</code>, <code>2&gt;</code>, <code>2&gt;&amp;1</code>, <code>/dev/null</code>, <code>tee</code> và vì sao <code>sudo echo ... &gt; /etc/x</code> thất bại.",
      "<code>ls -l --time-style=full-iso</code> chứng minh bản sao <code>cp -p</code> giữ đúng mtime của file gốc.",
      "<code>sha256sum -c SHA256SUMS.txt</code> báo <code>OK</code> cho mọi file; đã thấy hash đổi hoàn toàn khi sửa 1 ký tự.",
      "Có gói <code>evidence_&lt;ngày&gt;.tar.gz</code> + file hash; <code>tar -tzf</code> liệt kê đúng nội dung.",
      "Đã tải gói về Windows bằng <code>scp</code> và <code>Get-FileHash</code> khớp hash trên VPS.",
      "Không có lệnh xóa/sửa nào chạy ngoài <code>~/lab</code>."
    ],
    questions: [
      "stdout và stderr khác nhau thế nào? Viết lệnh lưu kết quả vào một file và lỗi vào file khác.",
      "Vì sao <code>sudo echo \"x\" &gt; /etc/test</code> báo Permission denied? Sửa thế nào?",
      "Vì sao phải dùng <code>cp -p</code> khi thu thập log? <code>chown</code> bản sao có làm hỏng bằng chứng không?",
      "Hash SHA-256 chứng minh được gì và <b>không</b> chứng minh được gì về một file bằng chứng?",
      "Chain of custody là gì? Kể các mắt xích bạn đã làm trong lab này.",
      "Vì sao băm <code>/var/log/auth.log</code> gốc và bản sao có thể ra hai giá trị khác nhau? Điều đó có nghĩa bản sao bị sửa không?",
      "Kẻ tấn công xóa log bằng <code>rm</code> hoặc sửa thời gian file bằng <code>touch</code> – SOC phòng/phát hiện thế nào?"
    ],
    output: "Gói bằng chứng <b>evidence_&lt;ngày&gt;.tar.gz</b> (đã tải về Windows) + writeup <b>\"Thu thập & bàn giao log theo chain of custody\"</b>: (1) cây thư mục và <code>notes.md</code>; (2) bảng so sánh <code>cp</code> vs <code>cp -p</code> (ảnh chụp <code>ls --time-style=full-iso</code>); (3) nội dung <code>SHA256SUMS.txt</code> và kết quả <code>sha256sum -c</code>; (4) hash gói trên VPS và trên Windows (khớp); (5) bảng cheat sheet chuyển hướng <code>&gt; &gt;&gt; 2&gt; 2&gt;&amp;1 /dev/null tee</code>. <b>Che IP.</b> Không đưa file auth.log gốc lên GitHub – chỉ đưa số liệu đã che IP."
  },

  {
    id: "LINUX-4",
    track: "chung",
    week: 2,
    optional: true,
    title: "Phân quyền & sở hữu file, bit đặc biệt, săn SUID",
    goal: "Đọc hiểu mọi ký tự trong <code>ls -l</code>; đổi quyền bằng <b>số</b> (755, 644, 600, 700) và <b>chữ</b> (u+x, g-w, o=); hiểu quyền <b>thư mục</b> khác quyền file; đổi chủ với <code>chown/chgrp</code>; hiểu <code>umask</code>. Sau đó nhìn bằng mắt SOC: <b>SUID/SGID/sticky</b>, săn file SUID và file ai cũng ghi được – điểm leo thang đặc quyền (<b>MITRE T1548.001</b>) – và giải thích vì sao <code>~/.ssh</code> là 700, <code>/etc/shadow</code> là 640.",
    time: "60–75 phút",
    prereq: ["VPS-1", "LINUX-3"],
    mitre: "T1548.001",
    concepts: ["Authorization", "rwx / ugo", "Octal permissions", "chmod / chown / chgrp", "umask", "Directory permissions", "SUID / SGID / sticky bit", "Privilege escalation T1548.001", "Least privilege"],
    theory: [
      { title: "Chuỗi 10 ký tự của <code>ls -l</code>", body: "Ví dụ <code>-rw-r-----</code>:<br>• Ký tự 1 = <b>loại</b>: <code>-</code> file, <code>d</code> thư mục, <code>l</code> liên kết (symlink).<br>• 2–4 = quyền của <b>u</b>ser (chủ sở hữu), 5–7 = <b>g</b>roup (nhóm), 8–10 = <b>o</b>ther (mọi người khác).<br>• <code>r</code> đọc, <code>w</code> ghi, <code>x</code> thực thi, <code>-</code> không có.<br>Khóa 4: đây là <b>authorization</b> (ủy quyền) – sau khi đã xác thực (authentication) bạn là ai, hệ thống quyết định bạn được làm gì." },
      { title: "Quyền dạng số (octal)", body: "<b>r = 4, w = 2, x = 1</b>, cộng lại cho từng nhóm u-g-o:<br>• <b>755</b> <code>rwxr-xr-x</code>: chương trình, thư mục công khai.<br>• <b>644</b> <code>rw-r--r--</code>: file thường ai cũng đọc (<code>/etc/passwd</code>).<br>• <b>640</b> <code>rw-r-----</code>: chủ ghi, nhóm đọc (<code>/var/log/auth.log</code>, <code>/etc/shadow</code>).<br>• <b>600</b> <code>rw-------</code>: chỉ chủ (khóa bí mật, <code>authorized_keys</code>).<br>• <b>700</b> <code>rwx------</code>: thư mục riêng tư (<code>~/.ssh</code>)." },
      { title: "Quyền trên THƯ MỤC khác trên file", body: "Với thư mục: <b>r</b> = <b>liệt kê</b> tên bên trong (<code>ls</code>); <b>x</b> = <b>đi vào</b> (<code>cd</code>) và truy cập file bên trong nếu biết tên; <b>w</b> = <b>tạo, xóa, đổi tên</b> file bên trong (cần kèm x). Hệ quả quan trọng: quyền <b>xóa</b> file phụ thuộc quyền <b>w của thư mục chứa nó</b>, không phải quyền của chính file – user có thể xóa file của root nếu file đó nằm trong thư mục của user." },
      { title: "Chủ sở hữu, nhóm & umask", body: "Mỗi file có <b>một chủ</b> và <b>một nhóm</b>. Chỉ <b>root</b> đổi được chủ (<code>sudo chown</code>); chủ file đổi được nhóm sang nhóm mà mình là thành viên (<code>chgrp</code>). <b>umask</b> là “mặt nạ” trừ bớt quyền khi tạo mới: file gốc 666, thư mục gốc 777. umask 022 → file 644, thư mục 755; umask 002 → file 664, thư mục 775; umask 077 → file 600, thư mục 700." },
      { title: "SUID, SGID, sticky bit", body: "• <b>SUID</b> (4000, chữ <code>s</code> ở chỗ x của user): chương trình chạy với quyền của <b>chủ file</b>, không phải người chạy. Ví dụ <code>/usr/bin/passwd</code> (chủ root) để user thường đổi được mật khẩu của mình trong <code>/etc/shadow</code>.<br>• <b>SGID</b> (2000, <code>s</code> ở chỗ x của group): chạy với quyền của <b>nhóm</b> file (vd <code>chage</code> thuộc nhóm <code>shadow</code>); trên thư mục: file tạo mới kế thừa nhóm.<br>• <b>Sticky</b> (1000, <code>t</code> ở cuối): trong thư mục ai cũng ghi được như <code>/tmp</code>, chỉ chủ file mới được xóa file của mình.<br>Chữ HOA <code>S</code>/<code>T</code> = có bit đặc biệt nhưng <b>không có x</b> (thường là cấu hình lỗi)." },
      { title: "Vì sao kẻ tấn công săn SUID (MITRE T1548.001)", body: "Chương trình SUID root là “cửa” để từ user thường <b>leo thang lên root</b> (privilege escalation). Nếu một chương trình có khả năng chạy lệnh khác (find, vim, python, bash…) mà bị gắn SUID root, kẻ tấn công dùng nó để mở shell root. Trang <b>GTFOBins</b> tổng hợp các chương trình Linux có thể bị lạm dụng như vậy. Vì thế SOC/sysadmin giữ <b>danh sách SUID baseline</b> và cảnh báo khi xuất hiện SUID mới. Tương tự: file hệ thống <b>ai cũng ghi được</b> (world-writable) cho phép cài mã vào thứ root sẽ chạy." },
      { title: "Quyền đúng của các file nhạy cảm", body: "• <code>~/.ssh</code> = <b>700</b>, <code>authorized_keys</code> = <b>600</b>: sshd (chế độ <i>StrictModes</i>) <b>từ chối dùng key</b> nếu người khác ghi được vào đây – vì ai sửa được file này là thêm được key của họ.<br>• <code>/etc/shadow</code> = <b>640 root:shadow</b>: chứa hash mật khẩu; ai đọc được là đem đi bẻ offline (<b>T1003.008</b>).<br>• <code>/etc/passwd</code> = <b>644</b>: ai cũng đọc được là bình thường, nhưng <b>không ai ngoài root được ghi</b>.<br>• <code>/var/log/auth.log</code> = <b>640 syslog:adm</b>: log chứa thông tin nhạy cảm – user thường không đọc được." }
    ],
    pitfalls: [
      "<b><code>chmod -R 777</code> “cho chạy được”</b> → mở toang quyền, tạo đúng thứ kẻ tấn công đi săn. Không bao giờ dùng 777, và <b>không bao giờ</b> <code>chmod -R</code>/<code>chown -R</code> trên đường dẫn hệ thống (<code>/</code>, <code>/etc</code>, <code>/usr</code>, <code>/var</code>, <code>/home</code>) – có thể làm hỏng sudo/SSH và tự khóa mình ở ngoài.",
      "<b>Nhầm <code>chmod 600</code> cho thư mục</b> → mất <code>x</code>, không <code>cd</code> vào được. Thư mục riêng tư là <b>700</b>, file riêng tư là <b>600</b>.",
      "<b><code>chmod +x</code> không chỉ rõ ai</b> → thêm x cho cả u, g, o (theo umask). Viết rõ <code>u+x</code>.",
      "<b>Tưởng file của root thì user không xóa được</b>: nếu file nằm trong thư mục user có quyền <code>w</code> thì user vẫn xóa được (rm sẽ hỏi <i>write-protected</i>). Quyền xóa thuộc về thư mục.",
      "<b><code>find / -perm -4000</code> chạy không có <code>-xdev</code></b> → lan vào <code>/proc</code>, <code>/snap</code>, hàng loạt lỗi và kết quả trùng. Dùng <code>sudo find / -xdev ... 2&gt;/dev/null</code>.",
      "<b>Lab này không tạo user mới</b> (để dành LINUX-5) và <b>không đổi quyền file hệ thống</b> – chỉ <b>đọc</b> quyền của chúng; mọi thao tác chmod/chown chỉ làm trên file trong <code>~/lab/perm</code>."
    ],
    keycards: [
      { front: "Đọc <code>-rw-r----- 1 syslog adm 52K ... /var/log/auth.log</code>. Vì sao user <code>nam</code> phải dùng sudo để đọc?", def: "<code>-</code> = file thường; <code>rw-</code> chủ <b>syslog</b> đọc+ghi; <code>r--</code> nhóm <b>adm</b> chỉ đọc; <code>---</code> người khác không có quyền gì (= <b>640</b>). <code>nam</code> không phải syslog, không thuộc nhóm adm (<code>id</code> chỉ có nam, sudo, users) → rơi vào “other” → không đọc được.", trap: "Cách sai: <code>chmod 644</code> file log. Cách đúng: dùng <code>sudo</code> khi cần, hoặc admin thêm user vào nhóm <code>adm</code> nếu công việc đòi hỏi.", interview: "Authentication và authorization khác nhau thế nào? Lấy ví dụ trên Linux." },
      { front: "Đổi quyền dạng số: 755, 644, 640, 600, 700 nghĩa là gì và dùng cho file nào?", def: "r=4, w=2, x=1. <b>755</b> rwxr-xr-x (chương trình, thư mục công khai); <b>644</b> rw-r--r-- (file thường, <code>/etc/passwd</code>); <b>640</b> rw-r----- (<code>/etc/shadow</code>, auth.log); <b>600</b> rw------- (khóa bí mật, <code>authorized_keys</code>); <b>700</b> rwx------ (<code>~/.ssh</code>).", example: "<code>chmod 600 secret.txt</code> = chỉ chủ đọc/ghi.", trap: "777 = ai cũng ghi – gần như không bao giờ đúng. 600 cho thư mục = không cd vào được (thiếu x)." },
      { front: "Quyền <code>r</code>, <code>w</code>, <code>x</code> trên một <b>thư mục</b> nghĩa là gì?", def: "<b>r</b> = liệt kê tên file (<code>ls</code>); <b>x</b> = đi vào (<code>cd</code>) và truy cập file bên trong nếu biết tên; <b>w</b> (kèm x) = tạo, xóa, đổi tên file bên trong.", example: "Thư mục 711 (<code>rwx--x--x</code>): người khác vào được và mở file nếu biết đúng tên, nhưng không liệt kê được.", trap: "Xóa được file hay không do quyền <b>w của thư mục</b> quyết định, không phải quyền của file – trừ khi thư mục có sticky bit.", interview: "Vì sao trong /tmp ai cũng ghi được nhưng không xóa được file của người khác?" },
      { front: "SUID là gì? Ví dụ hợp lệ và vì sao kẻ tấn công săn nó?", def: "SUID (bit 4000, chữ <code>s</code> thay x của user, vd <code>-rwsr-xr-x</code>): chương trình chạy với quyền của <b>chủ file</b>. Hợp lệ: <code>/usr/bin/passwd</code>, <code>sudo</code>, <code>su</code> (chủ root) để user thường làm việc cần root một cách có kiểm soát. Kẻ tấn công tìm chương trình SUID root <b>có thể chạy lệnh khác</b> (tra GTFOBins) để leo thang lên root – <b>MITRE T1548.001</b>.", example: "Lệnh săn: <code>sudo find / -xdev -perm -4000 -type f 2&gt;/dev/null</code>", trap: "Danh sách SUID chỉ có ý nghĩa khi so với <b>baseline</b>; SUID mới xuất hiện (nhất là trong /tmp, /home, hoặc trên bash/python/find) = cảnh báo nghiêm trọng.", interview: "Sau khi có shell user thường trên Linux, kẻ tấn công thường làm gì để lên root? Bạn phát hiện thế nào?" },
      { front: "Sticky bit là gì? Vì sao <code>/tmp</code> là <code>drwxrwxrwt</code> (1777)?", def: "Sticky bit (1000, chữ <code>t</code> cuối): trong thư mục có bit này, <b>chỉ chủ file</b> (hoặc chủ thư mục / root) mới xóa, đổi tên được file. <code>/tmp</code> cần mọi user ghi được (777) nhưng không để user này xóa/thay file của user khác → thêm sticky.", trap: "Thư mục world-writable mà <b>thiếu</b> sticky là lỗ hổng: ai cũng xóa/thay file của người khác. Tìm: <code>sudo find / -xdev -type d -perm -0002 ! -perm -1000 2&gt;/dev/null</code>." },
      { front: "<code>umask</code> là gì? umask 022, 002, 077 tạo ra quyền mặc định nào?", def: "Mặt nạ <b>trừ bớt</b> quyền khi tạo file/thư mục mới (file gốc 666, thư mục gốc 777). <b>022</b> → file 644, thư mục 755. <b>002</b> → 664 / 775 (Ubuntu thường đặt cho user thường có nhóm riêng). <b>077</b> → 600 / 700 (riêng tư tối đa).", example: "<code>umask</code> xem giá trị; <code>umask 077</code> chỉ có hiệu lực trong phiên shell hiện tại.", trap: "umask không bao giờ tự cấp quyền x cho file mới – file script vẫn phải <code>chmod u+x</code>." },
      { front: "Vì sao <code>~/.ssh</code> phải 700 và <code>authorized_keys</code> phải 600? <code>/etc/shadow</code> phải thế nào?", def: "Ai <b>ghi</b> được <code>authorized_keys</code> là thêm được key của họ = vào được tài khoản (<b>T1098.004</b>). Vì vậy sshd (<i>StrictModes yes</i>) <b>từ chối dùng key</b> nếu thư mục/file cho người khác ghi. <code>/etc/shadow</code> = <b>640 root:shadow</b>: chứa hash mật khẩu; lộ ra là bị bẻ offline (<b>T1003.008</b>).", trap: "Key đúng mà SSH vẫn hỏi mật khẩu → kiểm tra quyền <code>~</code>, <code>~/.ssh</code>, <code>authorized_keys</code> và chủ sở hữu.", interview: "Một user báo đăng nhập SSH bằng key bị từ chối dù key đúng – bạn kiểm tra gì?" },
      { front: "<code>chown</code> và <code>chgrp</code> khác nhau thế nào? Ai được dùng?", def: "<code>chown user:group file</code> đổi <b>chủ</b> (và nhóm) – chỉ <b>root</b> (sudo) làm được, để user không “đẩy” file sang tên người khác. <code>chgrp group file</code> đổi <b>nhóm</b> – chủ file làm được nếu là thành viên nhóm đích, ngoài ra cần sudo.", example: "<code>sudo chown nam:nam ~/lab/evidence/.../logs/auth.log</code> (LINUX-3) để nam đọc bản sao log.", trap: "<code>chown -R</code> sai đường dẫn (vd <code>/</code> hay <code>/usr</code>) có thể phá hỏng sudo và SSH – không bao giờ chạy trên đường dẫn hệ thống." }
    ],
    steps: [
      {
        title: "[VPS] Đọc ls -l, stat & id",
        text: "<b>Nhắc lại quy tắc</b>: chỉ chmod/chown trên file trong <code>~/lab/perm</code>; với file hệ thống chỉ <b>đọc</b> quyền.",
        code: "mkdir -p ~/lab/perm && cd ~/lab/perm\nid                           # uid=1000(nam) gid=1000(nam) groups=...,27(sudo),100(users)\nls -ld ~ ~/.ssh ~/lab /tmp\nls -l ~/.ssh/authorized_keys /etc/passwd /etc/shadow /var/log/auth.log\nstat -c '%A %a %U:%G %n' ~/.ssh ~/.ssh/authorized_keys /etc/shadow /var/log/auth.log /tmp\n# drwx------ 700  nam:nam     /home/nam/.ssh\n# -rw------- 600  nam:nam     /home/nam/.ssh/authorized_keys\n# -rw-r----- 640  root:shadow /etc/shadow\n# -rw-r----- 640  syslog:adm  /var/log/auth.log\n# drwxrwxrwt 1777 root:root   /tmp",
        why: "<code>stat -c '%A %a ...'</code> in <b>cùng lúc</b> dạng chữ và dạng số – cách nhanh nhất để học quy đổi. Đọc dòng <code>auth.log</code>: chủ <code>syslog</code> đọc/ghi, nhóm <code>adm</code> đọc, người khác không gì cả; <code>id</code> cho thấy <code>nam</code> không thuộc <code>adm</code> → đây chính là lý do từ LINUX-1 bạn phải dùng <code>sudo</code>. Đó là <b>authorization</b> đang hoạt động.",
        tip: "Home <code>~</code> trên Ubuntu 24.04 thường là <code>drwxr-x---</code> (750): user khác không vào được thư mục của bạn."
      },
      {
        title: "[VPS] chmod dạng số trên file của bạn",
        code: "cd ~/lab/perm\necho \"mat khau gia\" > secret.txt\nls -l secret.txt                 # quyền mặc định (644 hoặc 664 tùy umask)\nchmod 600 secret.txt; ls -l secret.txt    # -rw-------\nchmod 640 secret.txt; ls -l secret.txt    # -rw-r-----\nchmod 644 secret.txt; ls -l secret.txt    # -rw-r--r--\nchmod 600 secret.txt\nstat -c '%A %a %n' secret.txt",
        why: "Quy đổi: <b>r=4, w=2, x=1</b>, cộng cho từng nhóm u-g-o. 6 = 4+2 = rw, 4 = r, 0 = không có gì. Dạng số <b>đặt toàn bộ</b> quyền một lần – rõ ràng, lặp lại được, nên hay dùng trong hướng dẫn hardening (CIS Benchmark ghi “đặt 600 cho file X”).",
        tip: "Mẹo nhớ: 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--, 0 = ---."
      },
      {
        title: "[VPS] chmod dạng chữ & quyền thực thi",
        code: "cd ~/lab/perm\necho '#!/bin/bash' > hello.sh\necho 'echo \"Xin chao tu $(hostname), toi la $(whoami)\"' >> hello.sh\ncat hello.sh\n./hello.sh                   # Permission denied: chưa có x\nchmod u+x hello.sh; ls -l hello.sh\n./hello.sh                   # chạy được\nchmod g-w,o= hello.sh; ls -l hello.sh    # nhóm bỏ w, người khác không còn gì\nchmod a-x hello.sh; ./hello.sh           # a = all: bỏ x của mọi người -> lại bị từ chối\nchmod 750 hello.sh; ls -l hello.sh",
        why: "Dạng chữ <b>sửa một phần</b> mà không đụng phần còn lại: <code>u/g/o/a</code> (ai) + <code>+/-/=</code> (thêm/bớt/đặt đúng) + <code>r/w/x</code>. Khóa 4 dùng đúng kiểu này (<code>chmod g+w,o-r</code>). Linux chỉ chạy file khi có <b>x</b> – mã độc tải về <code>/tmp</code> thường kèm ngay lệnh <code>chmod +x</code>; trong log/lịch sử lệnh, chuỗi <i>wget … ; chmod +x … ; ./…</i> là dấu hiệu kinh điển.",
        tip: "<code>o=</code> (bằng rỗng) = xóa sạch quyền của other. Dòng <code>#!/bin/bash</code> (shebang) cho kernel biết dùng chương trình nào để chạy script."
      },
      {
        title: "[VPS] umask – quyền mặc định khi tạo mới",
        code: "cd ~/lab/perm\numask                 # thường 0002 (user thường trên Ubuntu) hoặc 0022 – GHI LẠI giá trị này\numask -S              # dạng chữ, vd u=rwx,g=rwx,o=rx\ntouch f_mac_dinh; mkdir d_mac_dinh\nls -ld f_mac_dinh d_mac_dinh\numask 077             # chỉ áp dụng cho phiên shell này\ntouch f_rieng; mkdir d_rieng\nls -ld f_rieng d_rieng           # -rw------- và drwx------\numask 0002            # đặt lại đúng giá trị bạn đã ghi ở dòng đầu",
        why: "File mới bắt đầu từ 666, thư mục từ 777, rồi <b>trừ đi umask</b>: 666−022 = 644, 777−022 = 755; 666−077 = 600. Hiểu umask giúp giải thích “vì sao file tôi tạo ra lại có quyền này” và vì sao script xử lý dữ liệu nhạy cảm (log, bằng chứng) nên đặt <code>umask 077</code> ở đầu – mọi file nó tạo ra đều riêng tư.",
        tip: "umask không bao giờ tự thêm x cho file mới. Đặt umask trong một phiên chỉ ảnh hưởng phiên đó; đăng nhập lại là về mặc định."
      },
      {
        title: "[VPS] Quyền thư mục: r = liệt kê, x = đi vào, w = tạo/xóa",
        code: "cd ~/lab/perm\nmkdir hop && echo \"noi dung\" > hop/a.txt\nchmod 600 hop        # r,w nhưng KHÔNG có x\nls hop               # thấy tên (có thể kèm lỗi/dấu ?), nhưng...\ncat hop/a.txt        # Permission denied\ncd hop               # Permission denied\nchmod 300 hop        # w,x nhưng KHÔNG có r\nls hop               # Permission denied: không liệt kê được\ncat hop/a.txt        # ĐỌC ĐƯỢC vì biết tên + có x\nchmod 500 hop        # r,x nhưng KHÔNG có w\nrm hop/a.txt         # Permission denied: không xóa được\ntouch hop/b.txt      # Permission denied: không tạo được\nchmod 755 hop; ls -ld hop    # trả lại bình thường",
        why: "Đây là phần nhiều người hiểu sai nhất. Với thư mục, <b>x</b> mới là quyền “đi qua cửa”; <b>r</b> chỉ là “nhìn danh sách”; <b>w</b> là quyền tạo/xóa/đổi tên. Vì thế <code>~/.ssh</code> cần <b>700</b> (có x), không phải 600; và một thư mục 711 cho phép người khác mở file nếu <b>đoán đúng tên</b> dù không liệt kê được.",
        tip: "Bạn đang làm với tư cách <b>chủ</b> thư mục, nên quyền của nhóm u được áp dụng. Root bỏ qua phần lớn kiểm tra này – đừng thử bằng <code>sudo</code>, sẽ không thấy hiệu ứng."
      },
      {
        title: "[VPS] File của root vs file của nam: chown & chgrp",
        code: "cd ~/lab/perm\nsudo touch root_file.txt\nls -l root_file.txt               # -rw-r--r-- root root\ncat root_file.txt                 # đọc được (other có r)\necho \"thu ghi\" >> root_file.txt   # Permission denied: nam là 'other', không có w\nrm root_file.txt                  # hỏi 'remove write-protected regular empty file?' -> gõ n\n#  -> nam XÓA ĐƯỢC nếu trả lời y, vì thư mục ~/lab/perm là của nam (có w)\nsudo chown nam:nam root_file.txt; ls -l root_file.txt   # giờ thuộc nam\necho \"thu ghi\" >> root_file.txt  # ghi được\n\n# chgrp: đổi nhóm. nam không thuộc nhóm adm nên cần sudo\nsudo chgrp adm root_file.txt; chmod 640 root_file.txt\nls -l root_file.txt               # -rw-r----- nam adm  (giống mô hình của auth.log)",
        why: "Thí nghiệm này thay cho việc tạo user mới (để dành LINUX-5): một file của <b>root</b> trong thư mục của <b>nam</b>. Nam không <b>sửa</b> được file (quyền file), nhưng <b>xóa</b> được (quyền thư mục) – minh họa “quyền xóa thuộc về thư mục”. Chỉ root đổi được chủ file, để không ai “đổ” file độc sang tên người khác. Mô hình <code>chủ:nhóm 640</code> chính là cách Linux chia sẻ log cho nhóm <code>adm</code> mà không lộ cho mọi người.",
        tip: "<b>Không</b> chạy <code>chown</code>/<code>chgrp</code>/<code>chmod</code> trên file ngoài <code>~/lab</code>, và tuyệt đối không dùng <code>-R</code> trên đường dẫn hệ thống."
      },
      {
        title: "[VPS] Bit đặc biệt: SUID, SGID, sticky",
        code: "ls -l /usr/bin/passwd /usr/bin/sudo     # -rwsr-xr-x root root   (SUID)\nls -l /usr/bin/chage /usr/bin/crontab   # -rwxr-sr-x root shadow / root crontab (SGID)\nls -ld /tmp                             # drwxrwxrwt (sticky)\nstat -c '%A %a %n' /usr/bin/passwd /usr/bin/chage /tmp   # 4755, 2755, 1777\n\n# Thấy bit trên file CỦA BẠN (script không bị kernel chạy theo SUID - chỉ để quan sát):\ncd ~/lab/perm\nchmod u+s hello.sh; ls -l hello.sh      # -rwsr-x--- : chữ s thay chỗ x\nchmod u-x hello.sh; ls -l hello.sh      # -rwSr-x--- : S HOA = có SUID nhưng không có x\nchmod 750 hello.sh                      # gỡ bỏ, về bình thường\nmkdir -p chung && chmod 1777 chung; ls -ld chung    # drwxrwxrwt giống /tmp",
        why: "<code>passwd</code> phải ghi vào <code>/etc/shadow</code> (của root) khi user thường đổi mật khẩu → nhờ <b>SUID</b>, nó chạy với quyền root nhưng chỉ cho phép đúng việc đó. <b>SGID</b> cho <code>chage</code> quyền nhóm <code>shadow</code> để đọc hạn mật khẩu. <b>Sticky</b> trên <code>/tmp</code>: ai cũng tạo file được, nhưng không xóa file của người khác. Linux bỏ qua SUID trên script vì lý do an toàn – nên thí nghiệm chỉ để <b>nhìn</b> bit.",
        tip: "Số 4 chữ số: chữ số đầu là bit đặc biệt – 4 = SUID, 2 = SGID, 1 = sticky (vd 4755, 2755, 1777)."
      },
      {
        title: "[VPS] Săn SUID & file ai cũng ghi được – lập baseline",
        code: "# 1) Mọi file SUID trên ổ hệ thống -> lưu làm baseline\nsudo find / -xdev -perm -4000 -type f 2>/dev/null | sort | tee ~/lab/suid_baseline.txt\nwc -l ~/lab/suid_baseline.txt\n# 2) File SGID\nsudo find / -xdev -perm -2000 -type f 2>/dev/null\n# 3) FILE ai cũng ghi được (world-writable) - trên máy sạch thường RỖNG\nsudo find / -xdev -type f -perm -0002 2>/dev/null\n# 4) THƯ MỤC ai cũng ghi được mà THIẾU sticky bit - nên RỖNG\nsudo find / -xdev -type d -perm -0002 ! -perm -1000 2>/dev/null",
        why: "Đây là việc kẻ tấn công làm <b>ngay sau</b> khi có shell user thường (privilege escalation, <b>T1548.001</b>) – nên defender phải làm trước. <code>-perm -4000</code> = “có ít nhất bit SUID”; <code>-xdev</code> = không đi sang hệ thống file khác (<code>/proc</code>, <code>/sys</code>, snap) → nhanh và sạch. Danh sách SUID bình thường trên Ubuntu gồm các chương trình như <code>passwd, sudo, su, mount, umount, chsh, chfn, gpasswd, newgrp, fusermount3, pkexec, ssh-keysign, dbus-daemon-launch-helper</code>. Thứ <b>không được có</b>: SUID trên <code>bash</code>, <code>find</code>, <code>vim</code>, <code>python</code>, hoặc bất kỳ file nào trong <code>/tmp</code>, <code>/home</code> – tra trên <b>GTFOBins</b> để biết chương trình nào bị lạm dụng được.",
        tip: "Ghi số lượng SUID vào baseline (VPS-2). Sau mỗi lần cập nhật hệ thống, danh sách có thể đổi nhẹ (gói mới) – đối chiếu với <code>/var/log/apt/history.log</code> trước khi báo động."
      },
      {
        title: "[VPS] Kiểm tra quyền của các file nhạy cảm (chỉ đọc)",
        code: "ls -ld ~ ~/.ssh; ls -l ~/.ssh/\nls -l /etc/passwd /etc/shadow /etc/group /etc/gshadow /etc/sudoers\nsudo ls -l /etc/ssh/ | grep host_    # khóa host: *_key = 600 root, *_key.pub = 644\nsudo ls -ld /root /root/.ssh 2>/dev/null",
        why: "Đây là checklist mà auditor và SOC dùng khi xem xét một máy Linux:<br>• <code>~/.ssh</code> 700, <code>authorized_keys</code> 600 – nếu người khác ghi được, sshd (<i>StrictModes</i>) sẽ <b>từ chối key</b>, và tệ hơn, kẻ khác có thể chèn key (<b>T1098.004</b>).<br>• <code>/etc/shadow</code>, <code>/etc/gshadow</code> 640 root:shadow – lộ hash là bị bẻ mật khẩu offline (<b>T1003.008</b>).<br>• <code>/etc/sudoers</code> 440 – không ai được ghi trực tiếp (dùng <code>visudo</code>).<br>• Khóa riêng của host SSH 600 – lộ ra là kẻ khác giả mạo được server (MITM).",
        tip: "Lab này <b>chỉ đọc</b>. Không sửa gì trong <code>/etc/ssh</code>, không đổi quyền file hệ thống. Nếu thấy sai lệch, ghi lại vào báo cáo."
      },
      {
        title: "Thử thách 1: Phát hiện SUID mới so với baseline",
        text: "Giả lập một ngày sau: chạy lại lệnh săn SUID và <b>so với</b> <code>~/lab/suid_baseline.txt</code>. Kết quả mong đợi: <b>không có khác biệt</b>.",
        why: "Phát hiện dựa trên <b>baseline</b>: một SUID mới xuất hiện là một trong những dấu hiệu leo thang đặc quyền / persistence rõ nhất trên Linux. Đây là logic mà công cụ FIM (File Integrity Monitoring) như Wazuh syscheck tự động hóa.",
        tip: "<b>Đáp án gợi ý:</b> <code>sudo find / -xdev -perm -4000 -type f 2&gt;/dev/null | sort | diff ~/lab/suid_baseline.txt -</code><br>Không in gì = giống hệt. Dòng bắt đầu bằng <code>&gt;</code> = SUID <b>mới</b> (điều tra ngay); <code>&lt;</code> = SUID đã biến mất. Dấu <code>-</code> cuối = đọc vế thứ hai từ pipe."
      },
      {
        title: "Thử thách 2: Sửa quyền cho một “khóa bí mật” bị đặt sai",
        text: "Tạo file giả <code>~/lab/perm/fake_id_ed25519</code> với quyền <b>644</b>, rồi sửa về đúng chuẩn của khóa bí mật. Đồng thời tạo thư mục <code>~/lab/perm/fake_ssh</code> và đặt quyền đúng như <code>~/.ssh</code>. Kiểm tra bằng <code>stat</code>.",
        why: "Khóa bí mật mà người khác đọc được = coi như đã lộ; OpenSSH còn từ chối dùng khóa có quyền quá rộng (<i>UNPROTECTED PRIVATE KEY FILE!</i>). Sửa quyền đúng là thao tác hardening hằng ngày.",
        tip: "<b>Đáp án gợi ý:</b><br><code>cd ~/lab/perm &amp;&amp; echo fake &gt; fake_id_ed25519 &amp;&amp; chmod 644 fake_id_ed25519</code><br><code>chmod 600 fake_id_ed25519</code><br><code>mkdir -p fake_ssh &amp;&amp; chmod 700 fake_ssh</code><br><code>stat -c '%A %a %U:%G %n' fake_id_ed25519 fake_ssh</code> → <code>-rw------- 600</code> và <code>drwx------ 700</code>."
      },
      {
        title: "Thử thách 3: Dọn dẹp & tổng kết bằng một lệnh find",
        text: "Liệt kê mọi file và thư mục trong <code>~/lab/perm</code> kèm <b>quyền dạng số, chủ và nhóm</b> (một lệnh <code>find</code>), chụp lại cho writeup, rồi xóa thư mục <code>~/lab/perm</code> an toàn.",
        why: "<code>find -printf</code> tạo bảng kiểm kê quyền nhanh – cách auditor xuất bằng chứng. Dọn dẹp đúng chỗ, đúng cách là kỷ luật cơ bản.",
        tip: "<b>Đáp án gợi ý:</b><br><code>find ~/lab/perm -printf '%m %u:%g %p\\n'</code><br><code>cd ~/lab &amp;&amp; pwd &amp;&amp; ls perm</code><br><code>rm -r ~/lab/perm</code> (nếu bị hỏi về file write-protected thì trả lời y – đó là file bạn tạo trong lab)."
      }
    ],
    verify: [
      "Đọc được mọi ký tự của <code>ls -l</code> và quy đổi qua lại chữ ↔ số (<code>stat -c '%A %a'</code> để tự kiểm tra).",
      "Đã thấy <code>Permission denied</code> khi chạy script chưa có x, và chạy được sau <code>chmod u+x</code>.",
      "Giải thích được thí nghiệm thư mục 600 / 300 / 500 và vì sao <code>~/.ssh</code> là 700 chứ không phải 600.",
      "Giải thích được vì sao nam xóa được file của root trong <code>~/lab/perm</code> nhưng không sửa được nội dung.",
      "Có <code>~/lab/suid_baseline.txt</code>, biết số lượng SUID và nhận ra các chương trình bình thường trong đó.",
      "Lệnh tìm file world-writable và thư mục world-writable thiếu sticky trả về rỗng (hoặc đã ghi lại và giải thích từng mục).",
      "Không có thay đổi quyền nào ngoài <code>~/lab</code>."
    ],
    questions: [
      "Giải thích <code>-rw-r----- 1 syslog adm</code>. Vì sao user nam phải dùng sudo để đọc auth.log, và vì sao không nên <code>chmod 644</code> file đó?",
      "755, 644, 640, 600, 700 – mỗi giá trị nghĩa là gì và dùng cho loại file nào?",
      "Quyền r, w, x trên thư mục khác trên file thế nào? Vì sao user có thể xóa file của root?",
      "SUID là gì? Vì sao <code>/usr/bin/passwd</code> cần SUID? Vì sao kẻ tấn công săn file SUID (MITRE nào)?",
      "Sticky bit trên <code>/tmp</code> giải quyết vấn đề gì?",
      "Key SSH đúng nhưng server vẫn từ chối – liên quan gì đến quyền file? Bạn kiểm tra những gì?",
      "Bạn sẽ giám sát thay đổi SUID và quyền file nhạy cảm trên hàng trăm server bằng cách nào? (baseline, FIM/Wazuh)"
    ],
    output: "Writeup <b>\"Kiểm tra quyền & săn SUID trên Linux\"</b>: (1) bảng quy đổi quyền chữ ↔ số với ví dụ thật (<code>~/.ssh</code>, <code>authorized_keys</code>, <code>/etc/shadow</code>, auth.log, <code>/tmp</code>); (2) kết quả thí nghiệm quyền thư mục (600/300/500) và giải thích; (3) thí nghiệm file root trong thư mục nam (xóa được, không sửa được); (4) danh sách SUID baseline + nhận xét từng nhóm, liên hệ <b>T1548.001</b> và GTFOBins; (5) kết quả tìm world-writable; (6) checklist quyền file nhạy cảm cho audit Linux. <b>Che IP.</b>"
  }
]);
