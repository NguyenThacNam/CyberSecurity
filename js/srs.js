/* SRS – ôn lặp lại ngắt quãng (kiểu Leitner).
 * box 0 = mới; box 1..6 tương ứng khoảng cách 1, 3, 7, 14, 30, 60 ngày.
 * Đánh giá: 0 = Quên, 1 = Mang máng, 2 = Nhớ chắc.
 */
(function () {
  var INTERVALS = [0, 1, 3, 7, 14, 30, 60];
  var MAX_BOX = INTERVALS.length - 1;

  function pad(n) { return n < 10 ? "0" + n : "" + n; }
  function dateStr(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function today() { return dateStr(new Date()); }
  function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return dateStr(d); }

  function dayLog(date) {
    var s = Store.state;
    if (!s.daily[date]) s.daily[date] = {};
    return s.daily[date];
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var SRS = {
    INTERVALS: INTERVALS,
    today: today,

    /* Thống kê một bộ thẻ */
    stats: function (items) {
      var st = Store.state.srs, t = today();
      var r = { total: items.length, fresh: 0, learning: 0, known: 0, due: 0 };
      items.forEach(function (x) {
        var c = st[x.id];
        if (!c) { r.fresh++; return; }
        if (c.box >= 3) r.known++; else r.learning++;
        if (c.due <= t) r.due++;
      });
      return r;
    },

    newLimit: function (deck) {
      var set = Store.state.settings;
      var lim = deck === "vocab" ? set.newVocab : deck === "weak" ? set.newWeak : set.newCards;
      var used = (Store.state.daily[today()] || {})["new_" + deck] || 0;
      return Math.max(0, lim - used);
    },

    /* Hàng đợi hôm nay: thẻ đến hạn (trộn) + thẻ mới (theo thứ tự dữ liệu) trong giới hạn/ngày */
    queue: function (deck, items) {
      var st = Store.state.srs, t = today();
      var due = items.filter(function (x) { return st[x.id] && st[x.id].due <= t; });
      var fresh = items.filter(function (x) { return !st[x.id]; }).slice(0, SRS.newLimit(deck));
      return shuffle(due).concat(fresh).map(function (x) { return x.id; });
    },

    /* Ôn tự do: lấy ngẫu nhiên n thẻ đã học (không đổi lịch) */
    cram: function (items, n) {
      var st = Store.state.srs;
      var learned = items.filter(function (x) { return st[x.id]; });
      var pool = learned.length >= 5 ? learned : items;
      return shuffle(pool).slice(0, n).map(function (x) { return x.id; });
    },

    rate: function (deck, id, grade) {
      var st = Store.state.srs, t = today();
      var c = st[id];
      var isNew = !c;
      if (!c) c = { box: 0, due: t, reps: 0, lapses: 0 };
      var box;
      if (grade === 2) box = Math.min(MAX_BOX, c.box + 1);
      else if (grade === 1) box = Math.max(1, Math.min(c.box, 2));
      else { box = 1; if (!isNew) c.lapses++; }
      c.box = box;
      c.due = grade === 2 ? addDays(INTERVALS[box]) : addDays(1);
      c.reps++;
      c.last = t;
      st[id] = c;

      var log = dayLog(t);
      log[deck] = (log[deck] || 0) + 1;
      if (isNew) log["new_" + deck] = (log["new_" + deck] || 0) + 1;
      Store.save();
    },

    /* Chuỗi ngày học liên tục (tính cả hôm nay nếu đã học) */
    streak: function () {
      var daily = Store.state.daily;
      function active(d) {
        var x = daily[d]; if (!x) return false;
        return (x.cards || 0) + (x.vocab || 0) + (x.weak || 0) + (x.tasks || 0) > 0;
      }
      var n = 0, d = new Date();
      if (!active(dateStr(d))) d.setDate(d.getDate() - 1);
      while (active(dateStr(d))) { n++; d.setDate(d.getDate() - 1); }
      return n;
    },

    shuffle: shuffle
  };

  window.SRS = SRS;
})();
