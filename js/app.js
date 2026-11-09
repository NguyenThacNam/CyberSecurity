/* SOC Prep – ứng dụng chính (HTML/JS thuần, không build). */
(function () {
  "use strict";

  /* ---------- Tiện ích ---------- */
  function D(name) { return (window.DATA && Array.isArray(window.DATA[name])) ? window.DATA[name] : []; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function uniq(arr) { return arr.filter(function (x, i) { return x && arr.indexOf(x) === i; }); }
  function pct(a, b) { return b ? Math.round(a * 100 / b) : 0; }
  var app = document.getElementById("app");

  var TRACKS = { chung: "Chung", soc: "SOC", mang: "Mạng" };
  var TYPE_LABEL = { review: "Ôn tập", english: "Tiếng Anh", lab: "Lab", writeup: "Writeup", extra: "Khác" };
  var VOCAB_TAGS = { network: "Mạng", security: "Bảo mật", soc: "SOC", linux: "Linux", windows: "Windows", question: "Mẫu câu hỏi", general: "Chung" };

  function bar(value, total, label) {
    var p = pct(value, total);
    return '<div class="bar" role="progressbar" aria-valuenow="' + p + '" aria-valuemin="0" aria-valuemax="100" aria-label="' + esc(label || "") + '"><span style="width:' + p + '%"></span></div>';
  }
  function emptyNote(file) {
    return '<div class="empty">Chưa có dữ liệu. Kiểm tra file <code>data/' + file + '</code>.</div>';
  }
  function toast(msg) {
    var t = document.createElement("div");
    t.className = "toast"; t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add("show"); }, 10);
    setTimeout(function () { t.classList.remove("show"); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  /* ---------- Router ---------- */
  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var q = {}, qi = h.indexOf("?");
    if (qi >= 0) {
      h.slice(qi + 1).split("&").forEach(function (kv) {
        var p = kv.split("="); if (p[0]) q[decodeURIComponent(p[0])] = decodeURIComponent(p[1] || "");
      });
      h = h.slice(0, qi);
    }
    var parts = h.split("/").filter(Boolean).map(decodeURIComponent);
    return { parts: parts, q: q };
  }
  function qs(obj) {
    var k = Object.keys(obj).filter(function (x) { return obj[x]; });
    return k.length ? "?" + k.map(function (x) { return encodeURIComponent(x) + "=" + encodeURIComponent(obj[x]); }).join("&") : "";
  }

  var session = null; // phiên ôn thẻ đang chạy

  function route() {
    session = null;
    var r = parseHash(), p = r.parts;
    var name = p[0] || "home";
    var navKey = name === "lab" ? "labs" : name;
    document.querySelectorAll("#nav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-route") === navKey);
    });
    var views = {
      home: viewHome,
      review: function () { return p[1] === "list" ? viewCardList(r.q) : viewReview(r.q); },
      english: function () { return p[1] === "logs" ? viewLogs(r.q) : p[1] === "list" ? viewVocabList(r.q) : viewEnglish(r.q); },
      weak: function () { return p[1] === "list" ? viewWeakList(r.q) : viewWeak(r.q); },
      labs: viewLabs,
      lab: function () { return viewLab(p[1]); },
      roadmap: viewRoadmap,
      settings: viewSettings
    };
    var fn = views[name] || viewHome;
    app.innerHTML = fn();
    window.scrollTo(0, 0);
  }

  /* ---------- Định nghĩa các bộ thẻ ---------- */
  var DECKS = {
    cards: {
      label: "Kiến thức",
      items: function (q) {
        return D("cards").filter(function (c) {
          return (!q.track || c.track === q.track) && (!q.topic || c.topic === q.topic);
        });
      },
      front: function (c) {
        return '<div class="chips">' + trackChip(c.track) + '<span class="chip">' + esc(c.topic) + '</span>' +
          (c.course ? '<span class="chip ghost">' + esc(c.course) + '</span>' : '') +
          '<span class="chip ghost">' + (c.tier === 3 ? "⭐⭐⭐" : "⭐⭐") + '</span></div>' +
          '<h2 class="q">' + c.front + '</h2>';
      },
      back: function (c) {
        return '<div class="ans">' +
          field("Định nghĩa", c.def, "def") +
          field("💡 Ví dụ đời thường", c.example) +
          field("⚠️ Bẫy hay nhầm", c.trap, "trap") +
          field("🎤 Câu hỏi phỏng vấn", c.interview) +
          (c.terms && c.terms.length ? '<div class="chips terms">' + c.terms.map(function (t) { return '<span class="chip en">' + esc(t) + '</span>'; }).join("") + '</div>' : "") +
          '</div>';
      }
    },
    vocab: {
      label: "Từ vựng",
      items: function (q) {
        return D("vocab").filter(function (v) {
          return (!q.tag || v.tag === q.tag) && (!q.multi || v.multi);
        });
      },
      front: function (v) {
        return '<div class="chips"><span class="chip">' + esc(VOCAB_TAGS[v.tag] || v.tag) + '</span>' +
          (v.multi ? '<span class="chip warn">Nghĩa IT khác nghĩa thường</span>' : '') + '</div>' +
          '<h2 class="word">' + esc(v.word) + ' <small>' + esc(v.pos || "") + '</small></h2>' +
          (v.ex ? '<p class="ex">“' + v.ex + '”</p>' : '') +
          '<p class="hint">Nghĩa của từ này trong câu trên là gì?</p>';
      },
      back: function (v) {
        return '<div class="ans">' +
          field("Nghĩa trong IT", v.it, "def") +
          field("Nghĩa thông thường", v.dict) +
          field("Dịch câu ví dụ", v.exVi) +
          '</div>';
      }
    },
    weak: {
      label: "Điểm yếu",
      items: function (q) {
        return D("weak").filter(function (w) { return (!q.course || w.course === q.course) && (!q.topic || w.topic === q.topic); });
      },
      front: function (w) {
        return '<div class="chips"><span class="chip">' + esc(w.topic || "") + '</span><span class="chip ghost">' + esc(w.source || w.course) + '</span></div>' +
          '<h2 class="q">' + w.question + '</h2>' +
          (w.options && w.options.length ? '<ol class="opts" type="A">' + w.options.map(function (o) { return "<li>" + o + "</li>"; }).join("") + '</ol>' : "");
      },
      back: function (w) {
        return '<div class="ans">' + field("Đáp án", w.answer, "def") + field("Vì sao", w.explain) + '</div>';
      }
    }
  };

  function field(label, html, cls) {
    if (!html) return "";
    return '<div class="field ' + (cls || "") + '"><div class="flabel">' + label + '</div><div class="fbody">' + html + '</div></div>';
  }
  function trackChip(t) { return '<span class="chip track-' + esc(t) + '">' + esc(TRACKS[t] || t) + '</span>'; }

  /* ---------- Trang chủ ---------- */
  function currentWeek() {
    var rm = D("roadmap");
    for (var i = 0; i < rm.length; i++) {
      if (rm[i].tasks.some(function (t) { return !taskDone(t); })) return rm[i];
    }
    return rm[rm.length - 1] || null;
  }
  function taskDone(t) {
    var s = Store.state;
    if (s.tasks[t.id]) return true;
    var m = t.link && t.link.match(/^#\/lab\/(.+)$/);
    return !!(m && s.labs[m[1]] && s.labs[m[1]].done);
  }

  function deckTile(deck, link, icon, desc) {
    var items = DECKS[deck].items({});
    var st = SRS.stats(items);
    var todayN = items.length ? SRS.queue(deck, items).length : 0;
    return '<a class="tile" href="' + link + '">' +
      '<div class="tile-head"><span class="ico">' + icon + '</span><span class="tile-title">' + DECKS[deck].label + '</span>' +
      (todayN ? '<span class="badge">' + todayN + '</span>' : (items.length ? '<span class="badge ok">✓</span>' : '')) + '</div>' +
      '<p class="muted">' + desc + '</p>' +
      bar(st.known, st.total, DECKS[deck].label) +
      '<div class="tile-foot"><span>Đã nhớ <b>' + st.known + '</b>/' + st.total + '</span><span>' +
      (todayN ? "Hôm nay: " + todayN + " thẻ" : (items.length ? "Xong hôm nay" : "Chưa có dữ liệu")) + '</span></div></a>';
  }

  function viewHome() {
    var wk = currentWeek();
    var labs = D("labs");
    var labsDone = labs.filter(function (l) { return Store.state.labs[l.id] && Store.state.labs[l.id].done; }).length;
    var rm = D("roadmap"), allTasks = [];
    rm.forEach(function (w) { allTasks = allTasks.concat(w.tasks); });
    var tasksDone = allTasks.filter(taskDone).length;
    var streak = SRS.streak();
    var hour = new Date().getHours();
    var hi = hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";

    var next = wk ? wk.tasks.filter(function (t) { return !taskDone(t); }).slice(0, 4) : [];

    return '<section class="hero">' +
      '<div><h1>' + hi + ' 👋</h1><p class="muted">Mỗi ngày 1–2 giờ: ôn thẻ → 10 từ tiếng Anh → làm lab.</p></div>' +
      '<div class="streak"><b>' + streak + '</b><span>ngày liên tục</span></div></section>' +

      '<h3 class="sec">Hôm nay ôn gì?</h3><div class="grid3">' +
      deckTile("cards", "#/review", "📘", "Kiến thức trọng tâm SOC & Mạng") +
      deckTile("vocab", "#/english", "🔤", "Từ vựng tiếng Anh chuyên ngành") +
      deckTile("weak", "#/weak", "🎯", "Những câu bạn từng làm sai") +
      '</div>' +

      '<h3 class="sec">Việc tiếp theo' + (wk ? ' · Tuần ' + wk.week + ': ' + esc(wk.title) : '') + '</h3>' +
      (next.length ? '<ul class="tasklist">' + next.map(taskRow).join("") + '</ul>' : '<div class="empty">Đã xong toàn bộ lộ trình 🎉</div>') +
      '<p><a class="link" href="#/roadmap">Xem toàn bộ lộ trình →</a></p>' +

      '<h3 class="sec">Tiến độ tổng</h3><div class="grid2">' +
      '<div class="panel"><div class="row"><span>🧪 Lab đã hoàn thành</span><b>' + labsDone + '/' + labs.length + '</b></div>' + bar(labsDone, labs.length, "Lab") + '</div>' +
      '<div class="panel"><div class="row"><span>🗺️ Đầu việc lộ trình</span><b>' + tasksDone + '/' + allTasks.length + '</b></div>' + bar(tasksDone, allTasks.length, "Lộ trình") + '</div>' +
      '</div>';
  }

  function taskRow(t) {
    var done = taskDone(t);
    var isLab = t.link && /^#\/lab\//.test(t.link);
    return '<li class="task' + (done ? " done" : "") + '">' +
      '<label><input type="checkbox" data-action="task" data-id="' + esc(t.id) + '"' + (done ? " checked" : "") + (isLab ? ' disabled title="Tự đánh dấu khi hoàn thành lab"' : "") + '>' +
      '<span class="ttype t-' + esc(t.type) + '">' + esc(TYPE_LABEL[t.type] || t.type) + '</span>' +
      '<span class="ttext">' + t.text + '</span></label>' +
      (t.link ? '<a class="go" href="' + esc(t.link) + '" aria-label="Mở">→</a>' : "") + '</li>';
  }

  /* ---------- Trang bộ thẻ chung ---------- */
  function deckPage(deck, q, cfg) {
    var items = DECKS[deck].items(q);
    var all = DECKS[deck].items({});
    if (!all.length) return '<h1>' + cfg.title + '</h1>' + emptyNote(cfg.file);
    var st = SRS.stats(items);
    var todayIds = SRS.queue(deck, items);
    window.__deckCtx = { deck: deck, q: q };
    return '<div class="pagehead"><div><h1>' + cfg.title + '</h1><p class="muted">' + cfg.subtitle + '</p></div>' + (cfg.tabs || "") + '</div>' +
      (cfg.filters || "") +
      '<div class="stats">' +
      stat("Tổng", st.total) + stat("Mới", st.fresh) + stat("Đang học", st.learning) + stat("Đã nhớ", st.known) + stat("Đến hạn", st.due) +
      '</div>' + bar(st.known, st.total, "Đã nhớ") +
      '<div class="actions">' +
      '<button class="btn primary" data-action="start" data-mode="today"' + (todayIds.length ? "" : " disabled") + '>' +
      (todayIds.length ? "Bắt đầu ôn hôm nay (" + todayIds.length + ")" : "Hôm nay đã xong ✓") + '</button>' +
      '<button class="btn" data-action="start" data-mode="cram">Ôn tự do 20 thẻ</button>' +
      '<a class="btn ghost" href="' + cfg.listLink + '">Xem danh sách</a>' +
      '</div>' +
      '<p class="muted small">Mẹo: <kbd>Space</kbd> lật thẻ · <kbd>1</kbd> Quên · <kbd>2</kbd> Mang máng · <kbd>3</kbd> Nhớ chắc. Ôn tự do không làm thay đổi lịch ôn.</p>';
  }
  function stat(label, n) { return '<div class="stat"><b>' + n + '</b><span>' + label + '</span></div>'; }

  function filterBar(base, q, groups) {
    return '<div class="filters">' + groups.map(function (g) {
      if (g.type === "pills") {
        return '<div class="pills">' + g.options.map(function (o) {
          var nq = Object.assign({}, q); nq[g.key] = o.value; if (g.reset) nq[g.reset] = "";
          var active = (q[g.key] || "") === o.value;
          return '<a class="pill' + (active ? " active" : "") + '" href="' + base + qs(nq) + '">' + esc(o.label) + '</a>';
        }).join("") + '</div>';
      }
      return '<select data-action="filter" data-base="' + esc(base) + '" data-key="' + esc(g.key) + '" data-q="' + esc(JSON.stringify(q)) + '">' +
        '<option value="">' + esc(g.placeholder) + '</option>' +
        g.options.map(function (o) { return '<option value="' + esc(o) + '"' + (q[g.key] === o ? " selected" : "") + '>' + esc(o) + '</option>'; }).join("") +
        '</select>';
    }).join("") + '</div>';
  }

  /* ---------- Kiến thức ---------- */
  function viewReview(q) {
    var topics = uniq(D("cards").filter(function (c) { return !q.track || c.track === q.track; }).map(function (c) { return c.topic; }));
    return deckPage("cards", q, {
      title: "📘 Kiến thức", subtitle: "Thẻ tầng ⭐⭐⭐: phần chung, SOC và Mạng (CCNA cốt lõi).", file: "cards.js",
      listLink: "#/review/list" + qs(q),
      filters: filterBar("#/review", q, [
        { type: "pills", key: "track", reset: "topic", options: [{ label: "Tất cả", value: "" }, { label: "Chung", value: "chung" }, { label: "SOC", value: "soc" }, { label: "Mạng", value: "mang" }] },
        { type: "select", key: "topic", placeholder: "Mọi chủ đề", options: topics }
      ])
    });
  }

  function viewCardList(q) {
    var items = DECKS.cards.items(q), st = Store.state.srs;
    var search = q.s || "";
    var shown = items.filter(function (c) {
      if (!search) return true;
      var hay = (c.front + " " + c.def + " " + c.topic + " " + (c.terms || []).join(" ")).toLowerCase();
      return hay.indexOf(search.toLowerCase()) >= 0;
    });
    return '<div class="pagehead"><div><h1>📘 Danh sách thẻ</h1><p class="muted">' + shown.length + ' thẻ</p></div><a class="btn ghost" href="#/review' + qs({ track: q.track, topic: q.topic }) + '">← Quay lại ôn</a></div>' +
      searchBox("#/review/list", q) +
      '<div class="list">' + shown.map(function (c) {
        return '<details class="item"><summary>' + levelDot(st[c.id]) + trackChip(c.track) + ' <span>' + c.front + '</span></summary>' + DECKS.cards.back(c) + '</details>';
      }).join("") + '</div>';
  }

  function levelDot(c) {
    var cls = !c ? "new" : c.box >= 3 ? "known" : "learning";
    var t = !c ? "Mới" : c.box >= 3 ? "Đã nhớ" : "Đang học";
    return '<span class="dot ' + cls + '" title="' + t + '"></span>';
  }
  function searchBox(base, q) {
    return '<form class="search" data-action="search" data-base="' + esc(base) + '" data-q="' + esc(JSON.stringify(q)) + '">' +
      '<input type="search" name="s" placeholder="Tìm…" value="' + esc(q.s || "") + '" aria-label="Tìm kiếm"><button class="btn">Tìm</button></form>';
  }

  /* ---------- Tiếng Anh ---------- */
  function englishTabs(active) {
    var tabs = [["vocab", "#/english", "Từ vựng"], ["logs", "#/english/logs", "Đọc log"], ["list", "#/english/list", "Danh sách từ"]];
    return '<div class="tabs">' + tabs.map(function (t) {
      return '<a class="tab' + (t[0] === active ? " active" : "") + '" href="' + t[1] + '">' + t[2] + '</a>';
    }).join("") + '</div>';
  }

  function viewEnglish(q) {
    var tagOpts = [{ label: "Tất cả", value: "" }].concat(Object.keys(VOCAB_TAGS).map(function (k) { return { label: VOCAB_TAGS[k], value: k }; }));
    return deckPage("vocab", q, {
      title: "🔤 Tiếng Anh chuyên ngành", subtitle: "~10 từ mới/ngày. Ưu tiên từ có nghĩa IT khác nghĩa thường.", file: "vocab.js",
      tabs: englishTabs("vocab"), listLink: "#/english/list" + qs(q),
      filters: filterBar("#/english", q, [
        { type: "pills", key: "tag", options: tagOpts },
        { type: "pills", key: "multi", options: [{ label: "Mọi từ", value: "" }, { label: "⚠️ Chỉ từ nhiều nghĩa", value: "1" }] }
      ])
    });
  }

  function viewVocabList(q) {
    var items = DECKS.vocab.items(q), st = Store.state.srs, s = (q.s || "").toLowerCase();
    var shown = items.filter(function (v) { return !s || (v.word + " " + v.it + " " + v.dict).toLowerCase().indexOf(s) >= 0; });
    return '<div class="pagehead"><div><h1>🔤 Danh sách từ</h1><p class="muted">' + shown.length + ' từ</p></div>' + englishTabs("list") + '</div>' +
      searchBox("#/english/list", q) +
      '<div class="table-wrap"><table class="vtable"><thead><tr><th></th><th>Từ</th><th>Nghĩa trong IT</th><th>Nghĩa thường</th></tr></thead><tbody>' +
      shown.map(function (v) {
        return '<tr><td>' + levelDot(st[v.id]) + '</td><td><b>' + esc(v.word) + '</b> <small class="muted">' + esc(v.pos || "") + '</small>' + (v.multi ? ' <span class="chip warn sm">⚠️</span>' : '') +
          '</td><td>' + v.it + '</td><td class="muted">' + v.dict + '</td></tr>';
      }).join("") + '</tbody></table></div>';
  }

  function viewLogs(q) {
    var logs = D("logs");
    if (!logs.length) return '<h1>🔤 Đọc log</h1>' + englishTabs("logs") + emptyNote("logs.js");
    var seen = Store.state.logsSeen;
    return '<div class="pagehead"><div><h1>🔤 Đọc log từng chữ</h1><p class="muted">Tự đọc và đoán nghĩa trước, sau đó mới bấm “Giải nghĩa”.</p></div>' + englishTabs("logs") + '</div>' +
      '<div class="list">' + logs.map(function (l) {
        return '<div class="logcard' + (seen[l.id] ? " seen" : "") + '" id="' + esc(l.id) + '">' +
          '<div class="chips"><span class="chip">' + esc(l.source) + '</span><span class="chip ghost">Cấp ' + esc(l.level) + '</span>' + (seen[l.id] ? '<span class="chip ok">Đã đọc</span>' : '') + '</div>' +
          '<pre class="logline"><code>' + esc(l.line) + '</code></pre>' +
          '<details data-action="log-open" data-id="' + esc(l.id) + '"><summary class="btn sm">Giải nghĩa</summary>' +
          '<table class="parts"><tbody>' + (l.parts || []).map(function (p) { return '<tr><td><code>' + esc(p[0]) + '</code></td><td>' + p[1] + '</td></tr>'; }).join("") + '</tbody></table>' +
          field("Tóm lại", l.meaning, "def") + field("🛡️ Góc nhìn SOC", l.soc) +
          '</details></div>';
      }).join("") + '</div>';
  }

  /* ---------- Điểm yếu ---------- */
  function viewWeak(q) {
    var courses = uniq(D("weak").map(function (w) { return w.course; }));
    var copts = [{ label: "Tất cả", value: "" }].concat(courses.map(function (c) { return { label: c.replace(/^K/, "Khóa "), value: c }; }));
    return deckPage("weak", q, {
      title: "🎯 Điểm yếu của tôi", subtitle: "Các câu bạn từng làm sai hoặc đánh dấu “chú ý” trong ghi chép.", file: "weak.js",
      listLink: "#/weak/list" + qs(q),
      filters: filterBar("#/weak", q, [{ type: "pills", key: "course", options: copts }])
    });
  }

  function viewWeakList(q) {
    var items = DECKS.weak.items(q), st = Store.state.srs;
    return '<div class="pagehead"><div><h1>🎯 Danh sách điểm yếu</h1><p class="muted">' + items.length + ' câu</p></div><a class="btn ghost" href="#/weak' + qs({ course: q.course }) + '">← Quay lại ôn</a></div>' +
      '<div class="list">' + items.map(function (w) {
        return '<details class="item"><summary>' + levelDot(st[w.id]) + '<span class="chip ghost">' + esc(w.course) + '</span> <span>' + w.question + '</span></summary>' +
          (w.options && w.options.length ? '<ol class="opts" type="A">' + w.options.map(function (o) { return "<li>" + o + "</li>"; }).join("") + '</ol>' : "") +
          DECKS.weak.back(w) + '</details>';
      }).join("") + '</div>';
  }

  /* ---------- Phiên ôn thẻ ---------- */
  function startSession(mode) {
    var ctx = window.__deckCtx; if (!ctx) return;
    var items = DECKS[ctx.deck].items(ctx.q);
    var ids = mode === "cram" ? SRS.cram(items, 20) : SRS.queue(ctx.deck, items);
    if (!ids.length) { toast("Không có thẻ nào để ôn."); return; }
    session = { deck: ctx.deck, q: ctx.q, mode: mode, ids: ids, i: 0, flipped: false, requeued: {}, count: [0, 0, 0] };
    renderSession();
  }

  function renderSession() {
    var s = session;
    if (s.i >= s.ids.length) return renderDone();
    var deck = DECKS[s.deck];
    var item = byId(D(s.deck === "cards" ? "cards" : s.deck), s.ids[s.i]);
    if (!item) { s.i++; return renderSession(); }
    var back = window.location.hash || "#/";
    app.innerHTML =
      '<div class="session">' +
      '<div class="shead"><button class="btn ghost sm" data-action="quit">✕ Thoát</button>' +
      '<span class="muted">' + (s.mode === "cram" ? "Ôn tự do · " : "") + (s.i + 1) + ' / ' + s.ids.length + '</span></div>' +
      bar(s.i, s.ids.length, "Tiến độ phiên") +
      '<article class="flash' + (s.flipped ? " flipped" : "") + '">' +
      deck.front(item) +
      (s.flipped ? '<hr>' + deck.back(item) : '') +
      '</article>' +
      (s.flipped
        ? '<div class="rate"><button class="btn r0" data-action="rate" data-g="0"><b>Quên</b><small>1</small></button>' +
          '<button class="btn r1" data-action="rate" data-g="1"><b>Mang máng</b><small>2</small></button>' +
          '<button class="btn r2" data-action="rate" data-g="2"><b>Nhớ chắc</b><small>3</small></button></div>'
        : '<div class="rate"><button class="btn primary wide" data-action="flip">Hiện đáp án <small>Space</small></button></div>') +
      '</div>';
    app.setAttribute("data-back", back);
  }

  function rate(g) {
    var s = session; if (!s || !s.flipped) return;
    var id = s.ids[s.i];
    if (s.mode === "today") SRS.rate(s.deck, id, g);
    s.count[g]++;
    if (g === 0 && !s.requeued[id]) { s.ids.push(id); s.requeued[id] = true; }
    s.i++; s.flipped = false;
    renderSession();
  }

  function renderDone() {
    var s = session;
    var back = { cards: "#/review", vocab: "#/english", weak: "#/weak" }[s.deck];
    app.innerHTML = '<div class="done">' +
      '<div class="big">🎉</div><h1>Xong phiên ôn!</h1>' +
      '<div class="stats center">' + stat("Nhớ chắc", s.count[2]) + stat("Mang máng", s.count[1]) + stat("Quên", s.count[0]) + '</div>' +
      (s.mode === "today" ? '<p class="muted">Thẻ “Quên” và “Mang máng” sẽ quay lại vào ngày mai.</p>' : '<p class="muted">Ôn tự do không làm thay đổi lịch ôn.</p>') +
      '<div class="actions center"><a class="btn primary" href="#/">Về trang Hôm nay</a><a class="btn" href="' + back + '" data-action="reload">Ôn tiếp</a></div></div>';
    session = null;
  }

  /* ---------- Lab ---------- */
  function labState(id) {
    var s = Store.state.labs;
    if (!s[id]) s[id] = { steps: {}, done: false, notes: "" };
    return s[id];
  }

  function viewLabs() {
    var labs = D("labs");
    if (!labs.length) return '<h1>🧪 Lab</h1>' + emptyNote("labs.js");
    var weeks = uniq(labs.map(function (l) { return l.week; })).sort();
    return '<div class="pagehead"><div><h1>🧪 Lab thực hành</h1><p class="muted">Chạy trên máy nhà (VMware). Làm theo thứ tự; snapshot trước mỗi bài.</p></div></div>' +
      weeks.map(function (w) {
        return '<h3 class="sec">Tuần ' + w + '</h3><div class="grid2">' + labs.filter(function (l) { return l.week === w; }).map(function (l) {
          var st = Store.state.labs[l.id] || { steps: {} };
          var n = (l.steps || []).length, d = Object.keys(st.steps || {}).filter(function (k) { return st.steps[k]; }).length;
          return '<a class="tile" href="#/lab/' + encodeURIComponent(l.id) + '">' +
            '<div class="tile-head">' + trackChip(l.track) + '<span class="tile-title">' + esc(l.id) + '</span>' + (st.done ? '<span class="badge ok">✓</span>' : '') + '</div>' +
            '<p><b>' + esc(l.title) + '</b></p><p class="muted small">' + esc(l.time || "") + '</p>' +
            bar(st.done ? n : d, n, "Bước") + '</a>';
        }).join("") + '</div>';
      }).join("") +
      '<p class="muted small">Các lab tuần 2–6 sẽ được bổ sung ở giai đoạn sau.</p>';
  }

  function viewLab(id) {
    var labs = D("labs"), l = byId(labs, id);
    if (!l) return '<h1>Không tìm thấy lab “' + esc(id) + '”</h1><p><a class="link" href="#/labs">← Danh sách lab</a></p>';
    var st = labState(id);
    var steps = l.steps || [];
    var doneN = steps.filter(function (_, i) { return st.steps[i]; }).length;
    return '<p><a class="link" href="#/labs">← Danh sách lab</a></p>' +
      '<div class="pagehead"><div><div class="chips">' + trackChip(l.track) + '<span class="chip ghost">Tuần ' + esc(l.week) + '</span>' +
      (l.time ? '<span class="chip ghost">⏱ ' + esc(l.time) + '</span>' : '') + (l.mitre ? '<span class="chip ghost">MITRE ' + esc(l.mitre) + '</span>' : '') +
      '</div><h1>' + esc(l.id) + ' · ' + esc(l.title) + '</h1><p>' + (l.goal || "") + '</p></div></div>' +
      (l.prereq && l.prereq.length ? '<p class="muted">Cần làm trước: ' + l.prereq.map(function (p) { return '<a class="link" href="#/lab/' + encodeURIComponent(p) + '">' + esc(p) + '</a>'; }).join(", ") + '</p>' : '') +
      (l.concepts && l.concepts.length ? '<div class="chips">' + l.concepts.map(function (c) { return '<span class="chip en">' + esc(c) + '</span>'; }).join("") + '</div>' : '') +
      '<div class="panel sticky-progress"><div class="row"><span>Tiến độ</span><b>' + doneN + '/' + steps.length + ' bước</b></div>' + bar(doneN, steps.length, "Bước") + '</div>' +
      '<ol class="steps">' + steps.map(function (s, i) {
        return '<li class="step' + (st.steps[i] ? " done" : "") + '">' +
          '<label class="stephead"><input type="checkbox" data-action="step" data-lab="' + esc(id) + '" data-i="' + i + '"' + (st.steps[i] ? " checked" : "") + '><span>' + esc(s.title) + '</span></label>' +
          '<div class="stepbody">' + (s.text ? '<p>' + s.text + '</p>' : '') +
          (s.code ? '<div class="code"><pre><code>' + esc(s.code) + '</code></pre><button class="copy" data-action="copy">Sao chép</button></div>' : '') +
          (s.tip ? '<div class="tip">💡 ' + s.tip + '</div>' : '') + '</div></li>';
      }).join("") + '</ol>' +
      (l.verify && l.verify.length ? '<h3 class="sec">✅ Kiểm tra</h3><ul class="bul">' + l.verify.map(function (v) { return "<li>" + v + "</li>"; }).join("") + '</ul>' : '') +
      (l.questions && l.questions.length ? '<h3 class="sec">🧠 Tự hỏi bản thân</h3><ul class="bul">' + l.questions.map(function (v) { return "<li>" + v + "</li>"; }).join("") + '</ul>' : '') +
      (l.output ? '<h3 class="sec">📁 Đầu ra cho portfolio</h3><p>' + l.output + '</p>' : '') +
      '<h3 class="sec">📝 Ghi chú của bạn</h3><textarea class="notes" data-action="notes" data-lab="' + esc(id) + '" placeholder="Ghi lại IP, lỗi gặp phải, cách sửa… (tự lưu) – sau này dùng để viết writeup">' + esc(st.notes || "") + '</textarea>' +
      '<div class="actions"><button class="btn ' + (st.done ? "" : "primary") + '" data-action="labdone" data-lab="' + esc(id) + '">' + (st.done ? "↺ Bỏ đánh dấu hoàn thành" : "✓ Đánh dấu hoàn thành lab") + '</button></div>';
  }

  /* ---------- Lộ trình ---------- */
  function viewRoadmap() {
    var rm = D("roadmap");
    if (!rm.length) return '<h1>🗺️ Lộ trình</h1>' + emptyNote("roadmap.js");
    var cw = currentWeek();
    return '<div class="pagehead"><div><h1>🗺️ Lộ trình 6–8 tuần</h1><p class="muted">Sáng ôn ~25 phút · tối lab 45–60 phút · cuối tuần viết writeup. Bận thì đi chậm lại, không sao.</p></div></div>' +
      rm.map(function (w) {
        var done = w.tasks.filter(taskDone).length;
        return '<details class="week"' + (cw && cw.week === w.week ? " open" : "") + '><summary>' +
          '<span class="wk">Tuần ' + w.week + '</span><span class="wtitle"><b>' + esc(w.title) + '</b><small class="muted">' + esc(w.focus || "") + '</small></span>' +
          '<span class="wcount">' + done + '/' + w.tasks.length + '</span></summary>' +
          bar(done, w.tasks.length, "Tuần " + w.week) +
          '<ul class="tasklist">' + w.tasks.map(taskRow).join("") + '</ul></details>';
      }).join("");
  }

  /* ---------- Cài đặt ---------- */
  function viewSettings() {
    var s = Store.state.settings;
    function num(key, label, min, max) {
      return '<label class="setting"><span>' + label + '</span><input type="number" min="' + min + '" max="' + max + '" value="' + esc(s[key]) + '" data-action="setting" data-key="' + key + '"></label>';
    }
    return '<h1>⚙️ Cài đặt</h1>' +
      '<div class="panel"><h3>Giao diện</h3><div class="pills">' +
      [["auto", "Theo máy"], ["light", "Sáng"], ["dark", "Tối"]].map(function (t) {
        return '<button class="pill' + (s.theme === t[0] ? " active" : "") + '" data-action="theme" data-v="' + t[0] + '">' + t[1] + '</button>';
      }).join("") + '</div></div>' +
      '<div class="panel"><h3>Số thẻ mới mỗi ngày</h3>' +
      num("newCards", "Kiến thức", 0, 50) + num("newVocab", "Từ vựng", 0, 50) + num("newWeak", "Điểm yếu", 0, 50) + '</div>' +
      '<div class="panel"><h3>Sao lưu tiến độ</h3><p class="muted small">Hiện tiến độ lưu trên trình duyệt này. Đồng bộ điện thoại ↔ máy tính (Firebase) sẽ bật ở bước sau. Trong lúc chờ, có thể xuất/nhập file.</p>' +
      '<div class="actions"><button class="btn" data-action="export">⬇ Xuất file tiến độ</button>' +
      '<label class="btn">⬆ Nhập file tiến độ<input type="file" accept="application/json,.json" data-action="import" hidden></label>' +
      '<button class="btn danger" data-action="reset">Xóa toàn bộ tiến độ</button></div></div>' +
      '<div class="panel"><h3>Dữ liệu đang có</h3><ul class="bul">' +
      '<li>Thẻ kiến thức: <b>' + D("cards").length + '</b></li><li>Điểm yếu: <b>' + D("weak").length + '</b></li>' +
      '<li>Từ vựng: <b>' + D("vocab").length + '</b></li><li>Bài đọc log: <b>' + D("logs").length + '</b></li>' +
      '<li>Lab: <b>' + D("labs").length + '</b></li></ul></div>';
  }

  function applyTheme() {
    var t = Store.state.settings.theme;
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }

  /* ---------- Sự kiện ---------- */
  function bumpTasks() {
    var d = SRS.today(), log = Store.state.daily[d] || (Store.state.daily[d] = {});
    log.tasks = (log.tasks || 0) + 1;
  }

  app.addEventListener("click", function (e) {
    var el = e.target.closest("[data-action]"); if (!el) return;
    var a = el.getAttribute("data-action");
    if (a === "start") { startSession(el.getAttribute("data-mode")); }
    else if (a === "flip") { if (session) { session.flipped = true; renderSession(); } }
    else if (a === "rate") { rate(+el.getAttribute("data-g")); }
    else if (a === "quit") { session = null; route(); }
    else if (a === "reload") { e.preventDefault(); location.hash = el.getAttribute("href"); route(); }
    else if (a === "labdone") {
      var st = labState(el.getAttribute("data-lab")); st.done = !st.done;
      if (st.done) { bumpTasks(); toast("Tuyệt! Nhớ viết writeup cho lab này 📝"); }
      Store.save(); route();
    }
    else if (a === "copy") {
      var code = el.parentNode.querySelector("code").textContent;
      (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(function () { toast("Đã sao chép"); }, function () { toast("Không sao chép được – hãy bôi đen để copy"); });
    }
    else if (a === "theme") { Store.state.settings.theme = el.getAttribute("data-v"); Store.save(); applyTheme(); route(); }
    else if (a === "export") {
      var blob = new Blob([Store.exportJSON()], { type: "application/json" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob); link.download = "socprep-tien-do-" + SRS.today() + ".json";
      document.body.appendChild(link); link.click(); link.remove();
    }
    else if (a === "reset") {
      if (confirm("Xóa toàn bộ tiến độ ôn tập, lab và lộ trình? Không thể hoàn tác.")) { Store.reset(); applyTheme(); toast("Đã xóa tiến độ"); route(); }
    }
  });

  app.addEventListener("change", function (e) {
    var el = e.target, a = el.getAttribute("data-action");
    if (a === "task") {
      var id = el.getAttribute("data-id");
      if (el.checked) { Store.state.tasks[id] = true; bumpTasks(); } else delete Store.state.tasks[id];
      Store.save(); route();
    } else if (a === "step") {
      var st = labState(el.getAttribute("data-lab"));
      st.steps[el.getAttribute("data-i")] = el.checked;
      Store.save();
      var li = el.closest(".step"); if (li) li.classList.toggle("done", el.checked);
      var steps = (byId(D("labs"), el.getAttribute("data-lab")) || {}).steps || [];
      var n = steps.filter(function (_, i) { return st.steps[i]; }).length;
      var prog = app.querySelector(".sticky-progress");
      if (prog) { prog.querySelector("b").textContent = n + "/" + steps.length + " bước"; prog.querySelector(".bar span").style.width = pct(n, steps.length) + "%"; }
      if (n === steps.length && steps.length && !st.done) toast("Xong hết các bước! Bấm “Đánh dấu hoàn thành lab” ở cuối trang.");
    } else if (a === "filter") {
      var q = JSON.parse(el.getAttribute("data-q") || "{}");
      q[el.getAttribute("data-key")] = el.value;
      location.hash = el.getAttribute("data-base") + qs(q);
    } else if (a === "setting") {
      var v = Math.max(0, Math.min(50, parseInt(el.value, 10) || 0));
      Store.state.settings[el.getAttribute("data-key")] = v; Store.save(); toast("Đã lưu");
    } else if (a === "import") {
      var f = el.files && el.files[0]; if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try { Store.importJSON(reader.result); applyTheme(); toast("Đã nhập tiến độ"); route(); }
        catch (err) { alert("Không đọc được file: " + err.message); }
      };
      reader.readAsText(f);
    }
  });

  var notesTimer = null;
  app.addEventListener("input", function (e) {
    var el = e.target;
    if (el.getAttribute("data-action") === "notes") {
      labState(el.getAttribute("data-lab")).notes = el.value;
      clearTimeout(notesTimer); notesTimer = setTimeout(function () { Store.save(); }, 600);
    }
  });

  app.addEventListener("toggle", function (e) {
    var el = e.target;
    if (el.getAttribute && el.getAttribute("data-action") === "log-open" && el.open) {
      var id = el.getAttribute("data-id");
      if (!Store.state.logsSeen[id]) { Store.state.logsSeen[id] = true; Store.save(); }
    }
  }, true);

  app.addEventListener("submit", function (e) {
    var f = e.target; if (f.getAttribute("data-action") !== "search") return;
    e.preventDefault();
    var q = JSON.parse(f.getAttribute("data-q") || "{}"); q.s = f.elements.s.value.trim();
    location.hash = f.getAttribute("data-base") + qs(q);
  });

  document.addEventListener("keydown", function (e) {
    if (!session) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if ((e.key === " " || e.key === "Enter") && !session.flipped) { e.preventDefault(); session.flipped = true; renderSession(); }
    else if (session.flipped && (e.key === "1" || e.key === "2" || e.key === "3")) { e.preventDefault(); rate(+e.key - 1); }
    else if (e.key === "Escape") { session = null; route(); }
  });

  window.addEventListener("hashchange", route);
  Store.onChange(function () { /* chỗ móc đồng bộ Firebase sau này */ });
  applyTheme();
  route();
})();
