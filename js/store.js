/* Store – lưu toàn bộ tiến độ người học.
 * Hiện tại: localStorage. Sau này: Sync (Firebase) đăng ký Store.onChange để đẩy lên Firestore
 * và gọi Store.replace(remoteState) khi kéo về.
 */
(function () {
  var KEY = "socprep.v1";
  var listeners = [];

  function defaults() {
    return {
      version: 1,
      srs: {},        // id -> { box, due, reps, lapses, last }
      daily: {},      // "YYYY-MM-DD" -> { cards, vocab, weak, new_cards, new_vocab, new_weak }
      tasks: {},      // roadmap task id -> true
      labs: {},       // lab id -> { steps: {i:true}, done: bool, notes: "" }
      logsSeen: {},   // log id -> true
      settings: { theme: "auto", newCards: 10, newVocab: 10, newWeak: 5 },
      updatedAt: 0
    };
  }

  function merge(base, extra) {
    var out = defaults();
    Object.keys(out).forEach(function (k) {
      if (extra && extra[k] !== undefined) {
        out[k] = (typeof out[k] === "object" && out[k] !== null && !Array.isArray(out[k]))
          ? Object.assign({}, out[k], extra[k])
          : extra[k];
      }
    });
    return out;
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      return merge(defaults(), raw ? JSON.parse(raw) : null);
    } catch (e) {
      return defaults();
    }
  }

  var state = load();

  function persist() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* chế độ riêng tư / bị chặn */ }
  }

  var Store = {
    get state() { return state; },
    save: function () {
      state.updatedAt = Date.now();
      persist();
      listeners.forEach(function (fn) { try { fn(state); } catch (e) { console.error(e); } });
    },
    replace: function (next, silent) {
      state = merge(defaults(), next);
      persist();
      if (!silent) listeners.forEach(function (fn) { try { fn(state); } catch (e) {} });
    },
    onChange: function (fn) { listeners.push(fn); },
    exportJSON: function () { return JSON.stringify(state, null, 2); },
    importJSON: function (text) {
      var obj = JSON.parse(text);
      if (!obj || typeof obj !== "object" || !obj.srs) throw new Error("File không đúng định dạng tiến độ.");
      Store.replace(obj);
    },
    reset: function () { Store.replace(defaults()); }
  };

  window.Store = Store;
})();
