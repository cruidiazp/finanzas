// Interfaz de la app (componentes React, gráficos, pantallas). Extraído de App-DvqdBcyG.js líneas 19970-26094.
// Nombres de variables locales minificados por Vite; JSX compilado a d.jsx(...).
function Gn(e, t, s) {
  let n = 0,
    i = e.length - 1,
    o,
    a,
    r,
    l;
  s
    ? (t >= e[n].pos && t <= e[i].pos && ({ lo: n, hi: i } = Ye(e, "pos", t)),
      ({ pos: o, time: r } = e[n]),
      ({ pos: a, time: l } = e[i]))
    : (t >= e[n].time &&
        t <= e[i].time &&
        ({ lo: n, hi: i } = Ye(e, "time", t)),
      ({ time: o, pos: r } = e[n]),
      ({ time: a, pos: l } = e[i]));
  const c = a - o;
  return c ? r + ((l - r) * (t - o)) / c : r;
}
class Ed extends Ai {
  constructor(t) {
    (super(t),
      (this._table = []),
      (this._minPos = void 0),
      (this._tableRange = void 0));
  }
  initOffsets() {
    const t = this._getTimestampsForTable(),
      s = (this._table = this.buildLookupTable(t));
    ((this._minPos = Gn(s, this.min)),
      (this._tableRange = Gn(s, this.max) - this._minPos),
      super.initOffsets(t));
  }
  buildLookupTable(t) {
    const { min: s, max: n } = this,
      i = [],
      o = [];
    let a, r, l, c, u;
    for (a = 0, r = t.length; a < r; ++a)
      ((c = t[a]), c >= s && c <= n && i.push(c));
    if (i.length < 2)
      return [
        { time: s, pos: 0 },
        { time: n, pos: 1 },
      ];
    for (a = 0, r = i.length; a < r; ++a)
      ((u = i[a + 1]),
        (l = i[a - 1]),
        (c = i[a]),
        Math.round((u + l) / 2) !== c && o.push({ time: c, pos: a / (r - 1) }));
    return o;
  }
  _generate() {
    const t = this.min,
      s = this.max;
    let n = super.getDataTimestamps();
    return (
      (!n.includes(t) || !n.length) && n.splice(0, 0, t),
      (!n.includes(s) || n.length === 1) && n.push(s),
      n.sort((i, o) => i - o)
    );
  }
  _getTimestampsForTable() {
    let t = this._cache.all || [];
    if (t.length) return t;
    const s = this.getDataTimestamps(),
      n = this.getLabelTimestamps();
    return (
      s.length && n.length
        ? (t = this.normalize(s.concat(n)))
        : (t = s.length ? s : n),
      (t = this._cache.all = t),
      t
    );
  }
  getDecimalForValue(t) {
    return (Gn(this._table, t) - this._minPos) / this._tableRange;
  }
  getValueForPixel(t) {
    const s = this._offsets,
      n = this.getDecimalForPixel(t) / s.factor - s.end;
    return Gn(this._table, n * this._tableRange + this._minPos, !0);
  }
}
(R(Ed, "id", "timeseries"), R(Ed, "defaults", Ai.defaults));
const Hf = "label";
function Nd(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function dS(e, t) {
  const s = e.options;
  s && t && Object.assign(s, t);
}
function Wf(e, t) {
  e.labels = t;
}
function Uf(e, t, s = Hf) {
  const n = [];
  e.datasets = t.map((i) => {
    const o = e.datasets.find((a) => a[s] === i[s]);
    return !o || !i.data || n.includes(o)
      ? { ...i }
      : (n.push(o), Object.assign(o, i), o);
  });
}
function uS(e, t = Hf) {
  const s = { labels: [], datasets: [] };
  return (Wf(s, e.labels), Uf(s, e.datasets, t), s);
}
function hS(e, t) {
  const {
      height: s = 150,
      width: n = 300,
      redraw: i = !1,
      datasetIdKey: o,
      type: a,
      data: r,
      options: l,
      plugins: c = [],
      fallbackContent: u,
      updateMode: h,
      ...m
    } = e,
    f = w.useRef(null),
    p = w.useRef(null),
    g = () => {
      f.current &&
        ((p.current = new qi(f.current, {
          type: a,
          data: uS(r, o),
          options: l && { ...l },
          plugins: c,
        })),
        Nd(t, p.current));
    },
    y = () => {
      (Nd(t, null), p.current && (p.current.destroy(), (p.current = null)));
    };
  return (
    w.useEffect(() => {
      !i && p.current && l && dS(p.current, l);
    }, [i, l]),
    w.useEffect(() => {
      !i && p.current && Wf(p.current.config.data, r.labels);
    }, [i, r.labels]),
    w.useEffect(() => {
      !i && p.current && r.datasets && Uf(p.current.config.data, r.datasets, o);
    }, [i, r.datasets]),
    w.useEffect(() => {
      p.current && (i ? (y(), setTimeout(g)) : p.current.update(h));
    }, [i, l, r.labels, r.datasets, h]),
    w.useEffect(() => {
      p.current && (y(), setTimeout(g));
    }, [a]),
    w.useEffect(() => (g(), () => y()), []),
    d.jsx("canvas", {
      ref: f,
      role: "img",
      height: s,
      width: n,
      ...m,
      children: u,
    })
  );
}
const fS = w.forwardRef(hS);
function br(e, t) {
  return (
    qi.register(t),
    w.forwardRef((s, n) => d.jsx(fS, { ...s, ref: n, type: e }))
  );
}
const mS = br("line", ii),
  Xf = br("bar", ni),
  pS = br("doughnut", Gs);
qi.register(qs, li, ca, da, Pe, ri, zk, eS, Kk);
function Qi() {
  const { data: e } = it(),
    t = getComputedStyle(document.documentElement),
    s = (i) => t.getPropertyValue(i).trim(),
    n = (i, o = !0) =>
      e.settings.hideAmounts
        ? "•••"
        : Gh(i, e.settings.currency, { compact: o });
  return {
    text: s("--text") || "#0f172a",
    muted: s("--muted") || "#64748b",
    grid: s("--border") || "rgba(0,0,0,0.08)",
    surface: s("--surface") || "#fff",
    font: s("--font"),
    money: n,
  };
}
function vr(e) {
  return {
    responsive: !0,
    maintainAspectRatio: !1,
    animation: { duration: 900, easing: "easeOutQuart" },
    interaction: { mode: "index", intersect: !1 },
    plugins: {
      legend: { display: !1 },
      tooltip: {
        backgroundColor: e.text,
        titleColor: e.surface,
        bodyColor: e.surface,
        padding: 10,
        cornerRadius: 10,
        displayColors: !0,
        boxPadding: 4,
        callbacks: {
          label: (t) =>
            ` ${t.dataset.label}: ${e.money(Number(t.parsed.y), !1)}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: !1 },
        ticks: { color: e.muted, font: { size: 10, weight: 600 } },
        border: { display: !1 },
      },
      y: {
        grid: { color: e.grid },
        border: { display: !1 },
        ticks: {
          color: e.muted,
          font: { size: 10 },
          maxTicksLimit: 5,
          callback: (t) => e.money(Number(t)),
        },
      },
    },
  };
}
function gS({ values: e, colors: t, labels: s }) {
  const n = Qi();
  return d.jsx(pS, {
    data: {
      labels: s,
      datasets: [
        {
          data: e,
          backgroundColor: t,
          borderWidth: 3,
          borderColor: n.surface,
          hoverOffset: 6,
          borderRadius: 6,
        },
      ],
    },
    options: {
      cutout: "72%",
      responsive: !0,
      maintainAspectRatio: !1,
      animation: { animateRotate: !0, duration: 1e3, easing: "easeOutQuart" },
      plugins: {
        legend: { display: !1 },
        tooltip: {
          callbacks: {
            label: (i) => ` ${i.label}: ${n.money(Number(i.parsed), !1)}`,
          },
        },
      },
    },
  });
}
function yS({ labels: e, series: t }) {
  const s = Qi();
  return d.jsx(Xf, {
    data: {
      labels: e,
      datasets: t.map((n) => ({
        label: n.label,
        data: n.data,
        backgroundColor: n.color,
        borderRadius: 6,
        borderSkipped: !1,
        maxBarThickness: 16,
        categoryPercentage: 0.7,
        barPercentage: 0.85,
      })),
    },
    options: vr(s),
  });
}
function xS({ labels: e, series: t }) {
  const s = Qi(),
    n = vr(s);
  return d.jsx(Xf, {
    data: {
      labels: e,
      datasets: t.map((i) => ({
        label: i.label,
        data: i.data,
        backgroundColor: i.color,
        borderRadius: 3,
        maxBarThickness: 14,
      })),
    },
    options: {
      ...n,
      scales: {
        x: { ...n.scales.x, stacked: !0 },
        y: { ...n.scales.y, stacked: !0 },
      },
    },
  });
}
function Pi({ labels: e, series: t }) {
  const s = Qi();
  return d.jsx(mS, {
    data: {
      labels: e,
      datasets: t.map((n, i) => ({
        label: n.label,
        data: n.data,
        borderColor: n.color,
        borderWidth: 2.5,
        borderDash: n.dashed ? [6, 5] : void 0,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: n.color,
        tension: 0.35,
        fill: i === 0,
        backgroundColor: (o) => {
          const { ctx: a, chartArea: r } = o.chart;
          if (!r) return `${n.color}22`;
          const l = a.createLinearGradient(0, r.top, 0, r.bottom);
          return (
            l.addColorStop(0, `${n.color}55`),
            l.addColorStop(1, `${n.color}00`),
            l
          );
        },
      })),
    },
    options: vr(s),
  });
}
const bS = {
  Award: ox,
  Baby: ax,
  Banknote: rx,
  BookOpen: lx,
  Briefcase: cx,
  Bus: dx,
  Car: hx,
  ChartLine: pn,
  Coffee: gx,
  Coins: yx,
  CreditCard: xx,
  Droplets: Sx,
  Dumbbell: jx,
  Film: Cx,
  Fuel: Mx,
  Gamepad2: _x,
  Gift: Ax,
  GraduationCap: Px,
  Hammer: Tx,
  HandCoins: si,
  HandHeart: Ex,
  HeartPulse: Nx,
  House: Ah,
  Landmark: os,
  Laptop: Lx,
  Music: zx,
  PawPrint: $x,
  PiggyBank: ts,
  Plane: Hx,
  Popcorn: Wx,
  Receipt: Ph,
  Scissors: Ux,
  Shield: Gx,
  Shirt: Yx,
  ShoppingCart: qx,
  Smartphone: Zx,
  Sparkles: Jx,
  Sprout: Qx,
  Stethoscope: tb,
  Store: eb,
  Target: Eh,
  Tv: nb,
  Utensils: ab,
  Wifi: rb,
  Zap: Dh,
};
function kr({ name: e, size: t = 20, strokeWidth: s = 2.1 }) {
  var i;
  const n = (i = bS[e]) != null ? i : Ph;
  return d.jsx(n, { size: t, strokeWidth: s });
}
function $t({ icon: e, color: t, size: s = "md", solid: n = !1 }) {
  const i = s === "sm" ? 17 : s === "lg" ? 26 : 20;
  return d.jsx("span", {
    className: `bubble ${s === "md" ? "" : s}`,
    style: { background: n ? t : `${t}${vS(0.15)}`, color: n ? "#fff" : t },
    children: d.jsx(kr, { name: e, size: i }),
  });
}
function vS(e) {
  return Math.round(e * 255)
    .toString(16)
    .padStart(2, "0");
}
function Sr() {
  const { data: e } = it(),
    { currency: t, hideAmounts: s } = e.settings;
  return (n, i = {}) => (s && !i.ignoreHide ? Yh : Gh(n, t, i));
}
function B({ value: e, sign: t, compact: s, className: n }) {
  const i = Sr();
  return d.jsx("span", {
    className: `num ${n != null ? n : ""}`,
    children: i(e, { sign: t, compact: s }),
  });
}
function Es({ value: e, className: t }) {
  const s = Sr(),
    { data: n } = it(),
    i = yh(0),
    o = vy(i, (r) => s(Math.round(r))),
    a = w.useRef(!0);
  return (
    w.useEffect(() => {
      const r = zy(i, e, {
        duration: a.current ? 1.1 : 0.6,
        ease: [0.16, 1, 0.3, 1],
      });
      return ((a.current = !1), r.stop);
    }, [e, i]),
    n.settings.hideAmounts
      ? d.jsx("span", { className: `num ${t != null ? t : ""}`, children: Yh })
      : d.jsx(O.span, { className: `num ${t != null ? t : ""}`, children: o })
  );
}
const Kf = w.createContext({ closing: !1, onExited: () => {} });
function jt({
  title: e,
  onClose: t,
  children: s,
  footer: n,
  headerRight: i,
  z: o = 0,
}) {
  const a = Wy(),
    { closing: r, onExited: l } = w.useContext(Kf),
    c = (h) => !r && a.start(h),
    u = () => !r && t();
  return d.jsxs(d.Fragment, {
    children: [
      d.jsx(O.div, {
        className: "backdrop",
        style: { zIndex: 60 + o * 2, pointerEvents: r ? "none" : "auto" },
        initial: { opacity: 0 },
        animate: { opacity: r ? 0 : 1 },
        transition: { duration: 0.2 },
        onClick: u,
      }),
      d.jsxs(O.div, {
        className: "sheet",
        style: { zIndex: 61 + o * 2, pointerEvents: r ? "none" : "auto" },
        initial: { y: "100%" },
        animate: { y: r ? "110%" : 0 },
        transition: r
          ? { duration: 0.24, ease: [0.4, 0, 1, 1] }
          : { type: "spring", damping: 32, stiffness: 340, mass: 0.9 },
        onAnimationComplete: () => r && l(),
        drag: "y",
        dragControls: a,
        dragListener: !1,
        dragConstraints: { top: 0, bottom: 0 },
        dragElastic: { top: 0.05, bottom: 0.9 },
        onDragEnd: (h, m) => {
          (m.offset.y > 110 || m.velocity.y > 600) && u();
        },
        role: "dialog",
        "aria-modal": "true",
        children: [
          d.jsx("div", {
            className: "sheet-grab",
            onPointerDown: c,
            children: d.jsx("span", {}),
          }),
          (e || i) &&
            d.jsxs("div", {
              className: "sheet-header",
              onPointerDown: c,
              children: [
                d.jsx("div", {
                  className: "sheet-title ellipsis",
                  children: e,
                }),
                d.jsxs("div", {
                  className: "row",
                  style: { gap: 8 },
                  children: [
                    i,
                    d.jsx("button", {
                      className: "icon-btn",
                      onClick: u,
                      "aria-label": "Cerrar",
                      children: d.jsx(Ya, { size: 20 }),
                    }),
                  ],
                }),
              ],
            }),
          d.jsx("div", { className: "sheet-body", children: s }),
          n && d.jsx("div", { className: "sheet-footer", children: n }),
        ],
      }),
    ],
  });
}
function U({ label: e, hint: t, children: s }) {
  return d.jsxs("div", {
    className: "field",
    children: [
      e && d.jsx("label", { children: e }),
      s,
      t && d.jsx("span", { className: "hint", children: t }),
    ],
  });
}
function Xt(e) {
  const [t, s] = w.useState(Pb(e));
  return { text: t, setText: (n) => s(qh(n)), value: Ab(t) };
}
function Ne({
  value: e,
  onChange: t,
  placeholder: s = "0",
  invalid: n,
  autoFocus: i,
}) {
  return d.jsxs("div", {
    className: "input-wrap has-prefix",
    children: [
      d.jsx("span", { className: "prefix", children: "$" }),
      d.jsx("input", {
        className: `input num ${n ? "invalid" : ""}`,
        inputMode: "decimal",
        value: e,
        placeholder: s,
        autoFocus: i,
        onChange: (o) => t(o.target.value),
      }),
    ],
  });
}
function to({ value: e, onChange: t, color: s, label: n }) {
  const { data: i } = it();
  return d.jsxs("div", {
    className: "amount-box",
    children: [
      d.jsxs("div", {
        className: "cur",
        children: [n, " · ", i.settings.currency],
      }),
      d.jsx("input", {
        className: "amount-input",
        style: { color: s },
        inputMode: "decimal",
        placeholder: "$0",
        value: e ? `$${e}` : "",
        onChange: (o) => t(o.target.value),
      }),
    ],
  });
}
function Gf({ value: e, onChange: t, placeholder: s = "0" }) {
  return d.jsxs("div", {
    className: "input-wrap has-suffix",
    children: [
      d.jsx("input", {
        className: "input num",
        inputMode: "decimal",
        value: e,
        placeholder: s,
        onChange: (n) => {
          const i = n.target.value.replace(",", ".").replace(/[^\d.]/g, ""),
            [o, ...a] = i.split(".");
          t(a.length ? `${o}.${a.join("").slice(0, 4)}` : o);
        },
      }),
      d.jsx("span", { className: "suffix", children: "%" }),
    ],
  });
}
function Le({ options: e, value: t, onChange: s, layoutId: n }) {
  return d.jsx("div", {
    className: "segmented",
    children: e.map((i) =>
      d.jsxs(
        "button",
        {
          type: "button",
          className: i.value === t ? "active" : "",
          onClick: () => {
            (lt.light(), s(i.value));
          },
          children: [
            i.value === t &&
              d.jsx(O.span, {
                layoutId: n,
                className: "pill",
                transition: { type: "spring", stiffness: 500, damping: 38 },
              }),
            i.label,
          ],
        },
        i.value,
      ),
    ),
  });
}
function Dd({ on: e, onChange: t }) {
  return d.jsx("button", {
    type: "button",
    className: `switch ${e ? "on" : ""}`,
    onClick: () => {
      (lt.light(), t(!e));
    },
    role: "switch",
    "aria-checked": e,
    children: d.jsx(O.span, {
      className: "knob",
      animate: { x: e ? 20 : 0 },
      transition: { type: "spring", stiffness: 600, damping: 34 },
    }),
  });
}
function jr({ value: e, onChange: t }) {
  return d.jsx("div", {
    className: "picker-grid",
    children: mb.map((s) =>
      d.jsx(
        "button",
        {
          type: "button",
          className: s === e ? "active" : "",
          onClick: () => t(s),
          "aria-label": s,
          children: d.jsx("span", {
            className: "swatch",
            style: { background: s },
          }),
        },
        s,
      ),
    ),
  });
}
function Yf({ value: e, onChange: t, color: s }) {
  return d.jsx("div", {
    className: "picker-grid",
    children: pb.map((n) =>
      d.jsx(
        "button",
        {
          type: "button",
          className: n === e ? "active" : "",
          onClick: () => t(n),
          style: { color: n === e ? s : void 0 },
          children: d.jsx(kr, { name: n, size: 20 }),
        },
        n,
      ),
    ),
  });
}
function kS({ categories: e, value: t, onChange: s, onCreate: n }) {
  return d.jsxs("div", {
    className: "cat-grid",
    children: [
      e.map((i) =>
        d.jsxs(
          "button",
          {
            type: "button",
            className: `cat-cell ${i.id === t ? "active" : ""}`,
            onClick: () => {
              (lt.light(), s(i.id));
            },
            children: [
              d.jsx($t, { icon: i.icon, color: i.color, solid: i.id === t }),
              d.jsx("span", { className: "name", children: i.name }),
            ],
          },
          i.id,
        ),
      ),
      n &&
        d.jsxs("button", {
          type: "button",
          className: "cat-cell",
          onClick: n,
          children: [
            d.jsx("span", {
              className: "bubble",
              style: {
                border: "2px dashed var(--surface-3)",
                color: "var(--muted)",
              },
              children: d.jsx(kr, { name: "Sparkles", size: 18 }),
            }),
            d.jsx("span", { className: "name", children: "Nueva" }),
          ],
        }),
    ],
  });
}
function wr({ ratio: e, color: t, delay: s = 0 }) {
  const n = Math.max(0, Math.min(1, e)) * 100;
  return d.jsx("div", {
    className: "progress",
    children: d.jsx(O.div, {
      style: { background: t },
      initial: { width: 0 },
      animate: { width: `${n}%` },
      transition: { duration: 0.9, delay: s, ease: [0.16, 1, 0.3, 1] },
    }),
  });
}
function qf({ ratio: e, color: t, size: s = 56, stroke: n = 6, label: i }) {
  const o = (s - n) / 2,
    a = 2 * Math.PI * o,
    r = Math.max(0, Math.min(1, e));
  return d.jsxs("div", {
    className: "ring",
    style: { width: s, height: s },
    children: [
      d.jsxs("svg", {
        width: s,
        height: s,
        style: { transform: "rotate(-90deg)" },
        children: [
          d.jsx("circle", {
            cx: s / 2,
            cy: s / 2,
            r: o,
            stroke: "var(--surface-3)",
            strokeWidth: n,
            fill: "none",
          }),
          d.jsx(O.circle, {
            cx: s / 2,
            cy: s / 2,
            r: o,
            stroke: t,
            strokeWidth: n,
            fill: "none",
            strokeLinecap: "round",
            strokeDasharray: a,
            initial: { strokeDashoffset: a },
            animate: { strokeDashoffset: a * (1 - r) },
            transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
          }),
        ],
      }),
      i !== void 0 && d.jsx("span", { className: "ring-label", children: i }),
    ],
  });
}
function Cs({ icon: e, title: t, text: s, action: n }) {
  return d.jsxs(O.div, {
    className: "empty",
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    children: [
      d.jsx("div", { className: "art", children: e }),
      d.jsx("h4", { children: t }),
      s && d.jsx("p", { children: s }),
      n,
    ],
  });
}
function Zf({ month: e, onChange: t }) {
  const s = Ps(),
    n = e === s ? "Mes actual" : e > s ? "Proyección" : "Histórico";
  return d.jsxs("div", {
    className: "month-switch",
    children: [
      d.jsx("button", {
        className: "icon-btn plain",
        onClick: () => {
          (lt.light(), t(yn(e, -1)));
        },
        "aria-label": "Mes anterior",
        children: d.jsx(mx, { size: 20 }),
      }),
      d.jsxs("button", {
        className: "label",
        onClick: () => t(s),
        children: [
          d.jsx(
            O.span,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.18 },
              children: Nt(e),
            },
            e,
          ),
          d.jsx("span", { className: "tiny", children: n }),
        ],
      }),
      d.jsx("button", {
        className: "icon-btn plain",
        onClick: () => {
          (lt.light(), t(yn(e, 1)));
        },
        "aria-label": "Mes siguiente",
        children: d.jsx(Xa, { size: 20 }),
      }),
    ],
  });
}
function ae({ children: e }) {
  return d.jsxs(O.div, {
    className: "error-box",
    initial: { opacity: 0, y: -6 },
    animate: { opacity: 1, y: 0 },
    children: [d.jsx(Nh, { size: 16 }), d.jsx("span", { children: e })],
  });
}
function Jf({ children: e }) {
  return d.jsxs("div", {
    className: "info-box",
    children: [
      d.jsx(Ka, { size: 16, color: "var(--saving)" }),
      d.jsx("span", { children: e }),
    ],
  });
}
function ut({ k: e, v: t }) {
  return d.jsxs("div", {
    className: "kv",
    children: [
      d.jsx("span", { className: "k", children: e }),
      d.jsx("span", { className: "v", children: t }),
    ],
  });
}
function SS() {
  const { toasts: e } = at();
  return d.jsx("div", {
    className: "toasts",
    children: e.map((t) =>
      d.jsxs(
        O.div,
        {
          className: "toast",
          style: { pointerEvents: "none" },
          initial: { opacity: 0, y: -20, scale: 0.95 },
          animate: {
            opacity: [0, 1, 1, 0],
            y: [-20, 0, 0, -12],
            scale: [0.95, 1, 1, 0.97],
          },
          transition: {
            duration: 2.8,
            times: [0, 0.08, 0.88, 1],
            ease: "easeOut",
          },
          children: [
            t.tone === "error"
              ? d.jsx(Nh, { size: 17, color: "var(--expense)" })
              : t.tone === "info"
                ? d.jsx(Ka, { size: 17 })
                : d.jsx(fx, { size: 17, color: "var(--income)" }),
            t.text,
          ],
        },
        t.id,
      ),
    ),
  });
}
function jS() {
  var s;
  const { confirmState: e, closeConfirm: t } = at();
  return e
    ? d.jsxs(d.Fragment, {
        children: [
          d.jsx(O.div, {
            className: "backdrop",
            style: { zIndex: 79 },
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            onClick: () => t(!1),
          }),
          d.jsx("div", {
            className: "dialog-wrap",
            onClick: () => t(!1),
            children: d.jsxs(O.div, {
              className: "dialog",
              role: "alertdialog",
              onClick: (n) => n.stopPropagation(),
              initial: { opacity: 0, scale: 0.9, y: 10 },
              animate: { opacity: 1, scale: 1, y: 0 },
              transition: { type: "spring", stiffness: 420, damping: 30 },
              children: [
                d.jsx("h3", { children: e.title }),
                d.jsx("p", { children: e.message }),
                d.jsxs("div", {
                  className: "row",
                  style: { marginTop: 20 },
                  children: [
                    d.jsx("button", {
                      className: "btn secondary",
                      onClick: () => t(!1),
                      children: "Cancelar",
                    }),
                    d.jsx("button", {
                      className: `btn ${e.danger ? "solid-danger" : "primary"}`,
                      onClick: () => {
                        (e.danger && lt.warning(), t(!0));
                      },
                      children: (s = e.confirmLabel) != null ? s : "Confirmar",
                    }),
                  ],
                }),
              ],
            }),
          }),
        ],
      })
    : null;
}
const rs = { hidden: {}, show: { transition: { staggerChildren: 0.04 } } },
  Ns = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 380, damping: 30 },
    },
  },
  wS = {
    ONCE: "Único",
    FIXED: "Plazo fijo",
    INDEFINITE: "Mensual",
    CALCULATED: "Crédito",
  };
function Qf(e) {
  var t;
  return e.recurrence === "FIXED"
    ? `${(t = e.months) != null ? t : 1} ${e.months === 1 ? "mes" : "meses"}`
    : wS[e.recurrence];
}
function Cr({ flow: e, showDate: t = !1 }) {
  var g, y, x, b, v, j, k, _;
  const { movements: s, savings: n, categories: i, accounts: o } = ve(),
    { openSheet: a } = at();
  let r = "",
    l = "",
    c = "Receipt",
    u = "#64748b",
    h = () => {};
  if (e.source === "MOVEMENT" || e.source === "EXTRA") {
    const C = e.source === "EXTRA" ? e.sourceId.split(":")[0] : e.sourceId,
      S = s.get(C),
      M = S ? i.get(S.categoryId) : void 0;
    ((c = (g = M == null ? void 0 : M.icon) != null ? g : "Receipt"),
      (u = (y = M == null ? void 0 : M.color) != null ? y : u),
      (r =
        e.source === "EXTRA"
          ? `Abono · ${(S == null ? void 0 : S.description) || (M == null ? void 0 : M.name)}`
          : (S == null ? void 0 : S.description) ||
            (M == null ? void 0 : M.name) ||
            "Movimiento"));
    const P = [
      M == null ? void 0 : M.name,
      (x = o.get(e.accountId)) == null ? void 0 : x.name,
    ];
    (e.source === "MOVEMENT" &&
      S &&
      S.recurrence !== "ONCE" &&
      P.push(
        e.totalInstallments
          ? `Cuota ${e.installment}/${e.totalInstallments}`
          : "Mensual",
      ),
      (l = P.filter(Boolean).join(" · ")),
      (h = () => S && a({ type: "movementDetail", id: S.id })));
  } else {
    const C = e.sourceId.split(":")[0],
      S = n.get(C);
    ((c = (b = S == null ? void 0 : S.icon) != null ? b : "PiggyBank"),
      (u = (v = S == null ? void 0 : S.color) != null ? v : "var(--saving)"));
    const M =
      e.source === "CONTRIBUTION"
        ? e.amount >= 0
          ? "Aporte extra"
          : "Retiro"
        : "Aporte programado";
    ((r = (j = S == null ? void 0 : S.name) != null ? j : "Ahorro"),
      (l = [M, (k = o.get(e.accountId)) == null ? void 0 : k.name]
        .filter(Boolean)
        .join(" · ")),
      (h = () => S && a({ type: "savingDetail", id: S.id })));
  }
  const m = e.kind === "INCOME" || (e.kind === "SAVING" && e.amount < 0),
    f =
      e.kind === "INCOME"
        ? "income"
        : e.kind === "SAVING"
          ? "saving"
          : "expense",
    p = Math.abs(e.amount);
  return d.jsxs(O.button, {
    variants: Ns,
    className: "list-item",
    onClick: h,
    children: [
      d.jsx($t, { icon: c, color: u }),
      d.jsxs("div", {
        className: "col grow",
        children: [
          d.jsx("span", { className: "semibold ellipsis", children: r }),
          d.jsxs("span", {
            className: "small muted ellipsis",
            children: [t ? `${Qa(e.date)} · ` : "", l],
          }),
        ],
      }),
      d.jsxs("div", {
        className: "col",
        style: { alignItems: "flex-end", gap: 2 },
        children: [
          d.jsx(B, { className: `amount ${f}`, value: m ? p : -p, sign: !0 }),
          e.source === "MOVEMENT" &&
            ((_ = s.get(e.sourceId)) == null ? void 0 : _.recurrence) !==
              "ONCE" &&
            d.jsx(Th, { size: 12, color: "var(--muted)" }),
        ],
      }),
    ],
  });
}
function CS({ t: e, showDate: t = !1 }) {
  var i, o;
  const { accounts: s } = ve(),
    { openSheet: n } = at();
  return d.jsxs(O.button, {
    variants: Ns,
    className: "list-item",
    onClick: () => n({ type: "transfer", transfer: e }),
    children: [
      d.jsx("span", {
        className: "bubble",
        style: { background: "var(--surface-2)", color: "var(--text-2)" },
        children: d.jsx(Tn, { size: 19 }),
      }),
      d.jsxs("div", {
        className: "col grow",
        children: [
          d.jsx("span", {
            className: "semibold ellipsis",
            children: e.note || "Transferencia",
          }),
          d.jsxs("span", {
            className: "small muted ellipsis",
            children: [
              t ? `${Qa(e.date)} · ` : "",
              (i = s.get(e.fromAccountId)) == null ? void 0 : i.name,
              " → ",
              (o = s.get(e.toAccountId)) == null ? void 0 : o.name,
            ],
          }),
        ],
      }),
      d.jsx(B, { className: "amount", value: e.amount }),
    ],
  });
}
const Se = (e) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.05 * e, type: "spring", stiffness: 260, damping: 28 },
});
function MS() {
  const { data: e, actions: t } = it(),
    { categories: s } = ve(),
    { month: n, setMonth: i, openSheet: o } = at(),
    a = Sr(),
    r = tt(),
    l = w.useMemo(() => Wi(e, n), [e, n]),
    c = w.useMemo(() => Uh(e, r), [e, r]),
    u = w.useMemo(() => Xh(e, r), [e, r]),
    h = w.useMemo(() => Kh(e, r), [e, r]),
    m = w.useMemo(() => Mb(e, 30).slice(0, 5), [e]),
    f = w.useMemo(() => wb(e, Ps(), 6), [e]),
    p = e.accounts.filter((v) => !v.archived),
    g = l.expenseBreakdown.slice(0, 5),
    y = l.expenseBreakdown.slice(5).reduce((v, j) => v + j.total, 0),
    x = [
      ...g.map((v) => {
        var j, k, _, C;
        return {
          label:
            (k = (j = s.get(v.categoryId)) == null ? void 0 : j.name) != null
              ? k
              : "—",
          color:
            (C = (_ = s.get(v.categoryId)) == null ? void 0 : _.color) != null
              ? C
              : "#64748b",
          value: v.total,
          pct: v.percentage,
        };
      }),
      ...(y > 0
        ? [
            {
              label: "Otras",
              color: "#94a3b8",
              value: y,
              pct: l.totalExpenses ? (y * 100) / l.totalExpenses : 0,
            },
          ]
        : []),
    ],
    b = w.useMemo(() => {
      if (l.totalIncomes === 0 && l.totalExpenses === 0) return null;
      const v = l.budgets.find((j) => j.ratio > 1);
      if (l.netCashFlow < 0)
        return {
          tone: "var(--expense)",
          text: `Tus salidas superan tus ingresos por ${a(-l.netCashFlow)} en ${Nt(n).toLowerCase()}. Revisa tus gastos recurrentes.`,
        };
      if (v) {
        const j = s.get(v.categoryId);
        return {
          tone: "var(--debt)",
          text: `Superaste el presupuesto de ${j == null ? void 0 : j.name} en ${a(v.spent - v.budget)} (${xo(v.ratio * 100, 0)} usado).`,
        };
      }
      if (l.savingsRate >= 20)
        return {
          tone: "var(--income)",
          text: `¡Excelente! Estás ahorrando el ${xo(l.savingsRate, 0)} de tus ingresos. La meta recomendada es 20 %.`,
        };
      if (l.totalIncomes > 0) {
        const j = l.totalIncomes * 0.2;
        return {
          tone: "var(--saving)",
          text: `Ahorras el ${xo(l.savingsRate, 0)} de tus ingresos. Apartar ${a(j)} al mes te llevaría al 20 % recomendado.`,
        };
      }
      return null;
    }, [l, n, s, a]);
  return d.jsxs("div", {
    children: [
      d.jsxs(O.div, {
        className: "screen-header",
        ...Se(0),
        children: [
          d.jsxs("div", {
            className: "col",
            children: [
              d.jsxs("span", {
                className: "small muted semibold",
                children: [Tb(), ","],
              }),
              d.jsxs("span", {
                className: "screen-title ellipsis",
                children: [e.settings.userName || "Hola", " 👋"],
              }),
            ],
          }),
          d.jsx("button", {
            className: "icon-btn",
            "aria-label": "Ocultar montos",
            onClick: () => {
              (lt.light(),
                t.updateSettings({ hideAmounts: !e.settings.hideAmounts }));
            },
            children: e.settings.hideAmounts
              ? d.jsx(_h, { size: 20 })
              : d.jsx(wx, { size: 20 }),
          }),
        ],
      }),
      d.jsxs(O.div, {
        className: "hero",
        ...Se(1),
        children: [
          d.jsx("div", {
            className: "hero-label",
            children: "Saldo disponible total",
          }),
          d.jsx("div", {
            className: "hero-amount",
            children: d.jsx(Es, { value: c }),
          }),
          d.jsxs("div", {
            className: "hero-stats",
            children: [
              d.jsxs("div", {
                className: "hero-stat",
                children: [
                  d.jsxs("div", {
                    className: "tiny",
                    children: [d.jsx(ts, { size: 12 }), " Ahorrado"],
                  }),
                  d.jsx("div", {
                    className: "v",
                    children: d.jsx(B, { value: u, compact: !0 }),
                  }),
                ],
              }),
              d.jsxs("div", {
                className: "hero-stat",
                children: [
                  d.jsxs("div", {
                    className: "tiny",
                    children: [d.jsx(Yo, { size: 12 }), " Deudas"],
                  }),
                  d.jsx("div", {
                    className: "v",
                    children: d.jsx(B, { value: h, compact: !0 }),
                  }),
                ],
              }),
              d.jsxs("div", {
                className: "hero-stat",
                children: [
                  d.jsxs("div", {
                    className: "tiny",
                    children: [d.jsx(Fi, { size: 12 }), " Patrimonio"],
                  }),
                  d.jsx("div", {
                    className: "v",
                    children: d.jsx(B, { value: c + u - h, compact: !0 }),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      d.jsxs(O.div, {
        className: "section",
        ...Se(2),
        children: [
          d.jsxs("div", {
            className: "section-head",
            children: [
              d.jsx("span", {
                className: "section-title",
                children: "Mis cuentas",
              }),
              d.jsx("button", {
                className: "link",
                onClick: () => o({ type: "accounts" }),
                children: "Administrar",
              }),
            ],
          }),
          d.jsxs("div", {
            className: "chips",
            style: { gap: 10, paddingBottom: 8 },
            children: [
              p.map((v) =>
                d.jsxs(
                  "button",
                  {
                    className: "card pressable tight",
                    style: { minWidth: 150, textAlign: "left" },
                    onClick: () => o({ type: "accountDetail", id: v.id }),
                    children: [
                      d.jsxs("div", {
                        className: "row",
                        style: { gap: 8 },
                        children: [
                          d.jsx($t, {
                            icon: ge[v.type].icon,
                            color: v.color,
                            size: "sm",
                          }),
                          d.jsx("span", {
                            className: "small semibold ellipsis",
                            children: v.name,
                          }),
                        ],
                      }),
                      d.jsx("div", {
                        className: "bold num",
                        style: { marginTop: 10, fontSize: 16 },
                        children: d.jsx(B, { value: En(e, v.id, r) }),
                      }),
                    ],
                  },
                  v.id,
                ),
              ),
              d.jsx("button", {
                className: "card pressable tight",
                style: {
                  minWidth: 110,
                  display: "grid",
                  placeItems: "center",
                  color: "var(--muted)",
                },
                onClick: () => o({ type: "account" }),
                children: d.jsxs("div", {
                  className: "col",
                  style: { alignItems: "center" },
                  children: [
                    d.jsx(be, { size: 20 }),
                    d.jsx("span", {
                      className: "small semibold",
                      children: "Nueva",
                    }),
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
      d.jsxs(O.div, {
        className: "section",
        ...Se(3),
        children: [
          d.jsx(Zf, { month: n, onChange: i }),
          d.jsxs("div", {
            className: "kpi-grid",
            style: { marginTop: 12 },
            children: [
              d.jsx(Yn, {
                label: "Ingresos",
                icon: d.jsx(Mh, { size: 14 }),
                color: "var(--income)",
                value: l.totalIncomes,
              }),
              d.jsx(Yn, {
                label: "Gastos",
                icon: d.jsx(Yo, { size: 14 }),
                color: "var(--expense)",
                value: l.totalExpenses,
              }),
              d.jsx(Yn, {
                label: "Ahorro",
                icon: d.jsx(ts, { size: 14 }),
                color: "var(--saving)",
                value: l.totalSavings,
              }),
              d.jsx(Yn, {
                label: "Flujo neto",
                icon: d.jsx(pn, { size: 14 }),
                color: l.netCashFlow < 0 ? "var(--expense)" : "var(--primary)",
                value: l.netCashFlow,
              }),
            ],
          }),
          b &&
            d.jsxs(
              O.div,
              {
                className: "insight",
                style: { marginTop: 12 },
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                children: [
                  d.jsx("span", {
                    className: "bubble sm",
                    style: { background: "var(--surface)", color: b.tone },
                    children: d.jsx(Rx, { size: 17 }),
                  }),
                  d.jsx("span", {
                    className: "small",
                    style: { color: "var(--text-2)" },
                    children: b.text,
                  }),
                ],
              },
              b.text,
            ),
        ],
      }),
      d.jsxs(O.div, {
        className: "section",
        ...Se(4),
        children: [
          d.jsx("div", {
            className: "section-head",
            children: d.jsx("span", {
              className: "section-title",
              children: "Gastos por categoría",
            }),
          }),
          d.jsx("div", {
            className: "card",
            children:
              x.length === 0
                ? d.jsx(Cs, {
                    icon: d.jsx(pn, { size: 30 }),
                    title: "Sin gastos este mes",
                    text: "Cuando registres gastos verás aquí su distribución.",
                  })
                : d.jsxs("div", {
                    className: "row",
                    style: { gap: 16, alignItems: "center" },
                    children: [
                      d.jsxs("div", {
                        className: "donut-wrap",
                        children: [
                          d.jsx(
                            gS,
                            {
                              values: x.map((v) => v.value),
                              colors: x.map((v) => v.color),
                              labels: x.map((v) => v.label),
                            },
                            n,
                          ),
                          d.jsxs("div", {
                            className: "donut-center",
                            children: [
                              d.jsx("span", {
                                className: "tiny muted semibold",
                                children: "Total",
                              }),
                              d.jsx("span", {
                                className: "bold num",
                                style: { fontSize: 14 },
                                children: d.jsx(B, {
                                  value: l.totalExpenses,
                                  compact: !0,
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      d.jsx("div", {
                        className: "legend",
                        children: x.map((v) =>
                          d.jsxs(
                            "div",
                            {
                              className: "legend-row",
                              children: [
                                d.jsx("span", {
                                  className: "legend-dot",
                                  style: { background: v.color },
                                }),
                                d.jsx("span", {
                                  className: "ellipsis grow",
                                  children: v.label,
                                }),
                                d.jsxs("span", {
                                  className: "semibold num",
                                  children: [Math.round(v.pct), "%"],
                                }),
                              ],
                            },
                            v.label,
                          ),
                        ),
                      }),
                    ],
                  }),
          }),
        ],
      }),
      l.budgets.length > 0 &&
        d.jsxs(O.div, {
          className: "section",
          ...Se(5),
          children: [
            d.jsxs("div", {
              className: "section-head",
              children: [
                d.jsx("span", {
                  className: "section-title",
                  children: "Presupuestos",
                }),
                d.jsx("button", {
                  className: "link",
                  onClick: () => o({ type: "categories" }),
                  children: "Editar",
                }),
              ],
            }),
            d.jsx("div", {
              className: "card stack",
              children: l.budgets.map((v, j) => {
                var C, S, M;
                const k = s.get(v.categoryId),
                  _ =
                    v.ratio > 1
                      ? "var(--expense)"
                      : v.ratio > 0.8
                        ? "var(--debt)"
                        : (C = k == null ? void 0 : k.color) != null
                          ? C
                          : "var(--primary)";
                return d.jsxs(
                  "div",
                  {
                    className: "col",
                    style: { gap: 7 },
                    children: [
                      d.jsxs("div", {
                        className: "row between",
                        children: [
                          d.jsxs("div", {
                            className: "row",
                            style: { gap: 8, minWidth: 0 },
                            children: [
                              d.jsx($t, {
                                icon:
                                  (S = k == null ? void 0 : k.icon) != null
                                    ? S
                                    : "Receipt",
                                color:
                                  (M = k == null ? void 0 : k.color) != null
                                    ? M
                                    : "#64748b",
                                size: "sm",
                              }),
                              d.jsx("span", {
                                className: "semibold small ellipsis",
                                children: k == null ? void 0 : k.name,
                              }),
                            ],
                          }),
                          d.jsxs("span", {
                            className: "small num",
                            children: [
                              d.jsx(B, { value: v.spent, compact: !0 }),
                              " ",
                              d.jsxs("span", {
                                className: "muted",
                                children: [
                                  "/ ",
                                  d.jsx(B, { value: v.budget, compact: !0 }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      d.jsx(wr, { ratio: v.ratio, color: _, delay: j * 0.06 }),
                    ],
                  },
                  v.categoryId,
                );
              }),
            }),
          ],
        }),
      d.jsxs(O.div, {
        className: "section",
        ...Se(6),
        children: [
          d.jsxs("div", {
            className: "section-head",
            children: [
              d.jsx("span", {
                className: "section-title",
                children: "Próximos 30 días",
              }),
              d.jsx(oc, { size: 18, color: "var(--muted)" }),
            ],
          }),
          d.jsx("div", {
            className: "card",
            style: { paddingTop: 4, paddingBottom: 4 },
            children:
              m.length === 0
                ? d.jsx(Cs, {
                    icon: d.jsx(oc, { size: 30 }),
                    title: "Nada programado",
                    text: "Los pagos y cobros recurrentes aparecerán aquí.",
                  })
                : d.jsx(O.div, {
                    className: "list",
                    variants: rs,
                    initial: "hidden",
                    animate: "show",
                    children: m.map((v) =>
                      d.jsx(
                        Cr,
                        { flow: v, showDate: !0 },
                        `${v.sourceId}-${v.date}`,
                      ),
                    ),
                  }),
          }),
        ],
      }),
      d.jsxs(O.div, {
        className: "section",
        ...Se(7),
        children: [
          d.jsxs("div", {
            className: "section-head",
            children: [
              d.jsx("span", {
                className: "section-title",
                children: "Últimos 6 meses",
              }),
              d.jsx("button", {
                className: "link",
                onClick: () => o({ type: "projection" }),
                children: "Ver proyección",
              }),
            ],
          }),
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsxs("div", {
                className: "row",
                style: { gap: 14, marginBottom: 8 },
                children: [
                  d.jsxs("span", {
                    className: "legend-row",
                    children: [
                      d.jsx("span", {
                        className: "legend-dot",
                        style: { background: "var(--income)" },
                      }),
                      "Ingresos",
                    ],
                  }),
                  d.jsxs("span", {
                    className: "legend-row",
                    children: [
                      d.jsx("span", {
                        className: "legend-dot",
                        style: { background: "var(--expense)" },
                      }),
                      "Gastos",
                    ],
                  }),
                  d.jsxs("span", {
                    className: "legend-row",
                    children: [
                      d.jsx("span", {
                        className: "legend-dot",
                        style: { background: "var(--saving)" },
                      }),
                      "Ahorro",
                    ],
                  }),
                ],
              }),
              d.jsx("div", {
                className: "chart-box",
                style: { height: 190 },
                children: d.jsx(yS, {
                  labels: f.map((v) => Nt(v.month, !0)),
                  series: [
                    {
                      label: "Ingresos",
                      data: f.map((v) => v.incomes),
                      color: "#10b981",
                    },
                    {
                      label: "Gastos",
                      data: f.map((v) => v.expenses),
                      color: "#f43f5e",
                    },
                    {
                      label: "Ahorro",
                      data: f.map((v) => v.savings),
                      color: "#0ea5e9",
                    },
                  ],
                }),
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function Yn({ label: e, icon: t, color: s, value: n }) {
  return d.jsxs("div", {
    className: "kpi",
    children: [
      d.jsxs("div", {
        className: "label",
        children: [d.jsx("span", { style: { color: s }, children: t }), e],
      }),
      d.jsx("div", {
        className: "value",
        style: { color: s },
        children: d.jsx(Es, { value: n }),
      }),
      d.jsx("div", { className: "bar", style: { background: s } }),
    ],
  });
}
const _S = [
  { value: "ALL", label: "Todos" },
  { value: "INCOME", label: "Ingresos" },
  { value: "EXPENSE", label: "Gastos" },
  { value: "SAVING", label: "Ahorros" },
  { value: "TRANSFER", label: "Transferencias" },
];
function AS() {
  const { data: e } = it(),
    { movements: t, savings: s, categories: n, accounts: i } = ve(),
    { month: o, setMonth: a, accountFilter: r, setAccountFilter: l } = at(),
    [c, u] = w.useState("ALL"),
    [h, m] = w.useState(""),
    f = w.useMemo(() => Wi(e, o, { accountId: r }), [e, o, r]),
    p = w.useMemo(() => {
      var _, C, S, M, P;
      const y = h.trim().toLowerCase(),
        { start: x, end: b } = Za(o),
        v = (A) =>
          !y ||
          A.some((E) => (E == null ? void 0 : E.toLowerCase().includes(y))),
        j = [];
      if (c !== "TRANSFER")
        for (const A of f.flows) {
          if (c !== "ALL" && A.kind !== c) continue;
          const E = A.sourceId.split(":")[0],
            I = t.get(E),
            D = s.get(E),
            F = I
              ? [
                  I.description,
                  I.party,
                  (_ = n.get(I.categoryId)) == null ? void 0 : _.name,
                  (C = i.get(I.accountId)) == null ? void 0 : C.name,
                ]
              : [
                  D == null ? void 0 : D.name,
                  D == null ? void 0 : D.description,
                  (S = i.get(A.accountId)) == null ? void 0 : S.name,
                ];
          v(F) &&
            j.push({ date: A.date, key: `${A.sourceId}-${A.date}`, flow: A });
        }
      if (c === "ALL" || c === "TRANSFER")
        for (const A of e.transfers)
          A.date < x ||
            A.date > b ||
            (r && A.fromAccountId !== r && A.toAccountId !== r) ||
            (v([
              A.note,
              (M = i.get(A.fromAccountId)) == null ? void 0 : M.name,
              (P = i.get(A.toAccountId)) == null ? void 0 : P.name,
              "transferencia",
            ]) &&
              j.push({ date: A.date, key: A.id, transfer: A }));
      j.sort((A, E) => E.date.localeCompare(A.date));
      const k = [];
      for (const A of j) {
        let E = k[k.length - 1];
        ((!E || E.date !== A.date) &&
          ((E = { date: A.date, items: [], net: 0 }), k.push(E)),
          E.items.push(A),
          A.flow &&
            (E.net +=
              A.flow.kind === "INCOME" ? A.flow.amount : -A.flow.amount));
      }
      return { groups: k, count: j.length };
    }, [f, c, h, e.transfers, o, r, t, s, n, i]),
    g = e.accounts.filter((y) => !y.archived);
  return d.jsxs("div", {
    children: [
      d.jsxs("div", {
        className: "screen-header",
        children: [
          d.jsx("span", { className: "screen-title", children: "Movimientos" }),
          d.jsxs("span", {
            className: "badge",
            children: [p.count, " registros"],
          }),
        ],
      }),
      d.jsx(Zf, { month: o, onChange: a }),
      d.jsxs("div", {
        className: "grid-2",
        style: { marginTop: 12 },
        children: [
          d.jsxs("div", {
            className: "card tight",
            children: [
              d.jsx("div", {
                className: "tiny muted semibold",
                children: "Entradas",
              }),
              d.jsx("div", {
                className: "bold income",
                children: d.jsx(B, { value: f.totalIncomes }),
              }),
            ],
          }),
          d.jsxs("div", {
            className: "card tight",
            children: [
              d.jsx("div", {
                className: "tiny muted semibold",
                children: "Salidas (gastos + ahorro)",
              }),
              d.jsx("div", {
                className: "bold expense",
                children: d.jsx(B, { value: f.totalExpenses + f.totalSavings }),
              }),
            ],
          }),
        ],
      }),
      d.jsxs("div", {
        className: "search",
        style: { marginTop: 14 },
        children: [
          d.jsx(ac, { size: 18 }),
          d.jsx("input", {
            className: "input",
            placeholder: "Buscar descripción, categoría, cuenta…",
            value: h,
            onChange: (y) => m(y.target.value),
          }),
        ],
      }),
      d.jsx("div", {
        className: "chips",
        style: { marginTop: 12 },
        children: _S.map((y) =>
          d.jsx(
            "button",
            {
              className: `chip ${c === y.value ? "active" : ""}`,
              onClick: () => u(y.value),
              children: y.label,
            },
            y.value,
          ),
        ),
      }),
      g.length > 1 &&
        d.jsxs("div", {
          className: "chips",
          children: [
            d.jsx("span", {
              className: "chip",
              style: {
                border: 0,
                background: "transparent",
                paddingLeft: 0,
                paddingRight: 4,
              },
              children: d.jsx(Ox, { size: 15 }),
            }),
            d.jsx("button", {
              className: `chip ${r === null ? "active" : ""}`,
              onClick: () => l(null),
              children: "Todas las cuentas",
            }),
            g.map((y) =>
              d.jsxs(
                "button",
                {
                  className: `chip ${r === y.id ? "active" : ""}`,
                  onClick: () => l(y.id),
                  children: [
                    d.jsx("span", {
                      className: "legend-dot",
                      style: { background: y.color },
                    }),
                    y.name,
                  ],
                },
                y.id,
              ),
            ),
          ],
        }),
      p.groups.length === 0
        ? d.jsx(Cs, {
            icon: d.jsx(ac, { size: 30 }),
            title: h ? "Sin resultados" : "Sin movimientos",
            text: h
              ? "Prueba con otra palabra o cambia los filtros."
              : "Toca el botón + para registrar tu primer movimiento del mes.",
          })
        : d.jsx(
            O.div,
            {
              variants: rs,
              initial: "hidden",
              animate: "show",
              children: p.groups.map((y) =>
                d.jsxs(
                  "div",
                  {
                    children: [
                      d.jsxs("div", {
                        className: "day-label",
                        children: [
                          d.jsx("span", { children: Qa(y.date) }),
                          y.net !== 0 &&
                            d.jsx(B, {
                              value: y.net,
                              sign: !0,
                              className: y.net > 0 ? "income" : "",
                            }),
                        ],
                      }),
                      d.jsx("div", {
                        className: "card",
                        style: { paddingTop: 2, paddingBottom: 2 },
                        children: d.jsx("div", {
                          className: "list",
                          children: y.items.map((x) =>
                            x.flow
                              ? d.jsx(Cr, { flow: x.flow }, x.key)
                              : d.jsx(CS, { t: x.transfer }, x.key),
                          ),
                        }),
                      }),
                    ],
                  },
                  y.date,
                ),
              ),
            },
            `${o}-${c}-${r}`,
          ),
    ],
  });
}
function PS() {
  const [e, t] = w.useState("savings");
  return d.jsxs("div", {
    children: [
      d.jsx("div", {
        className: "screen-header",
        children: d.jsx("span", {
          className: "screen-title",
          children: "Metas y deudas",
        }),
      }),
      d.jsx(Le, {
        layoutId: "plans-seg",
        value: e,
        onChange: t,
        options: [
          {
            value: "savings",
            label: d.jsxs(d.Fragment, {
              children: [d.jsx(ts, { size: 16 }), " Ahorros"],
            }),
          },
          {
            value: "debts",
            label: d.jsxs(d.Fragment, {
              children: [d.jsx(os, { size: 16 }), " Deudas"],
            }),
          },
        ],
      }),
      d.jsx(
        O.div,
        {
          initial: { opacity: 0, x: e === "savings" ? -20 : 20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.2 },
          children: e === "savings" ? d.jsx(TS, {}) : d.jsx(ES, {}),
        },
        e,
      ),
    ],
  });
}
function TS() {
  const { data: e } = it(),
    { openSheet: t } = at(),
    s = tt(),
    n = w.useMemo(() => Xh(e, s), [e, s]),
    i = e.savings.reduce(
      (o, a) => o + a.installment / Math.max(1, a.periodicity),
      0,
    );
  return d.jsxs("div", {
    style: { marginTop: 16 },
    children: [
      d.jsxs("div", {
        className: "hero",
        style: {
          background:
            "linear-gradient(135deg,#0284c7 0%,#0d9488 60%,#059669 100%)",
        },
        children: [
          d.jsx("div", { className: "hero-label", children: "Total ahorrado" }),
          d.jsx("div", {
            className: "hero-amount",
            children: d.jsx(Es, { value: n }),
          }),
          d.jsxs("div", {
            className: "row between small",
            children: [
              d.jsxs("span", {
                style: { opacity: 0.9 },
                children: [
                  e.savings.length,
                  " ",
                  e.savings.length === 1 ? "plan activo" : "planes activos",
                ],
              }),
              d.jsxs("span", {
                style: { opacity: 0.9 },
                children: ["≈ ", d.jsx(B, { value: i }), " / mes"],
              }),
            ],
          }),
        ],
      }),
      d.jsxs("div", {
        className: "section-head",
        style: { marginTop: 22 },
        children: [
          d.jsx("span", { className: "section-title", children: "Mis planes" }),
          d.jsxs("button", {
            className: "btn sm secondary",
            onClick: () => t({ type: "saving" }),
            children: [d.jsx(be, { size: 16 }), " Nuevo"],
          }),
        ],
      }),
      e.savings.length === 0
        ? d.jsx(Cs, {
            icon: d.jsx(ts, { size: 32 }),
            title: "Aún no tienes planes de ahorro",
            text: "Crea un fondo de emergencia, una meta de viaje o tu próxima compra y sigue su progreso.",
            action: d.jsxs("button", {
              className: "btn primary sm",
              onClick: () => t({ type: "saving" }),
              children: [d.jsx(be, { size: 16 }), " Crear plan"],
            }),
          })
        : d.jsx(O.div, {
            className: "stack",
            variants: rs,
            initial: "hidden",
            animate: "show",
            children: e.savings.map((o) => {
              const a = $i(o, s),
                r = o.target ? a / o.target : 0,
                l = ir(o, s);
              return d.jsxs(
                O.button,
                {
                  variants: Ns,
                  className: "card pressable",
                  style: { textAlign: "left" },
                  onClick: () => t({ type: "savingDetail", id: o.id }),
                  children: [
                    d.jsxs("div", {
                      className: "row",
                      children: [
                        d.jsx($t, { icon: o.icon, color: o.color, size: "lg" }),
                        d.jsxs("div", {
                          className: "col grow",
                          children: [
                            d.jsx("span", {
                              className: "bold ellipsis",
                              children: o.name,
                            }),
                            d.jsxs("span", {
                              className: "small muted",
                              children: [
                                d.jsx(B, { value: o.installment }),
                                " ",
                                o.periodicity === 1
                                  ? "mensual"
                                  : `cada ${o.periodicity} meses`,
                                o.annualRate ? ` · ${o.annualRate}% E.A.` : "",
                              ],
                            }),
                          ],
                        }),
                        o.target
                          ? d.jsx(qf, {
                              ratio: r,
                              color: o.color,
                              label: `${Math.min(100, Math.round(r * 100))}%`,
                            })
                          : null,
                      ],
                    }),
                    d.jsxs("div", {
                      className: "row between",
                      style: { marginTop: 12 },
                      children: [
                        d.jsx("span", {
                          className: "bold num",
                          style: { fontSize: 18 },
                          children: d.jsx(B, { value: a }),
                        }),
                        o.target
                          ? d.jsxs("span", {
                              className: "small muted",
                              children: [
                                "Meta ",
                                d.jsx(B, { value: o.target, compact: !0 }),
                              ],
                            })
                          : d.jsx("span", {
                              className: "badge",
                              children: "Sin meta",
                            }),
                      ],
                    }),
                    o.target
                      ? d.jsx("div", {
                          className: "small muted",
                          style: { marginTop: 6 },
                          children:
                            a >= o.target
                              ? "🎉 ¡Meta alcanzada!"
                              : l
                                ? `Alcanzarás tu meta en ${Nt(l).toLowerCase()}`
                                : "Con los aportes actuales no se alcanza la meta",
                        })
                      : null,
                  ],
                },
                o.id,
              );
            }),
          }),
    ],
  });
}
function ES() {
  const { data: e } = it(),
    { categories: t } = ve(),
    { openSheet: s } = at(),
    n = tt(),
    i = w.useMemo(() => Kh(e, n), [e, n]),
    o = w.useMemo(
      () =>
        e.movements
          .filter(
            (l) =>
              l.kind === "EXPENSE" &&
              (l.recurrence === "CALCULATED" || l.recurrence === "FIXED"),
          )
          .map((l) => ({ m: l, st: Ui(l, n) }))
          .filter((l) => l.st)
          .sort((l, c) => c.st.remaining - l.st.remaining),
      [e, n],
    ),
    a = o.filter((l) => l.st.remaining > 0).length,
    r = o.filter((l) => l.st.remaining > 0).reduce((l, c) => l + c.m.amount, 0);
  return d.jsxs("div", {
    style: { marginTop: 16 },
    children: [
      d.jsxs("div", {
        className: "hero",
        style: {
          background:
            "linear-gradient(135deg,#e11d48 0%,#f97316 60%,#f59e0b 100%)",
          boxShadow: "0 18px 40px rgba(244,63,94,0.3)",
        },
        children: [
          d.jsx("div", {
            className: "hero-label",
            children: "Saldo total en créditos",
          }),
          d.jsx("div", {
            className: "hero-amount",
            children: d.jsx(Es, { value: i }),
          }),
          d.jsxs("div", {
            className: "row between small",
            children: [
              d.jsxs("span", {
                style: { opacity: 0.9 },
                children: [
                  a,
                  " ",
                  a === 1 ? "compromiso activo" : "compromisos activos",
                ],
              }),
              d.jsxs("span", {
                style: { opacity: 0.9 },
                children: [d.jsx(B, { value: r }), " / mes"],
              }),
            ],
          }),
        ],
      }),
      d.jsxs("div", {
        className: "section-head",
        style: { marginTop: 22 },
        children: [
          d.jsx("span", {
            className: "section-title",
            children: "Créditos y compromisos",
          }),
          d.jsxs("button", {
            className: "btn sm secondary",
            onClick: () => s({ type: "movement", kind: "EXPENSE", debt: !0 }),
            children: [d.jsx(be, { size: 16 }), " Nuevo"],
          }),
        ],
      }),
      o.length === 0
        ? d.jsx(Cs, {
            icon: d.jsx(os, { size: 32 }),
            title: "Sin deudas registradas",
            text: "Registra créditos con su tasa de interés para calcular plazos, intereses y simular abonos.",
            action: d.jsxs("button", {
              className: "btn primary sm",
              onClick: () => s({ type: "movement", kind: "EXPENSE", debt: !0 }),
              children: [d.jsx(be, { size: 16 }), " Registrar crédito"],
            }),
          })
        : d.jsx(O.div, {
            className: "stack",
            variants: rs,
            initial: "hidden",
            animate: "show",
            children: o.map(({ m: l, st: c }) => {
              var m, f, p;
              const u = t.get(l.categoryId),
                h = c.remaining <= 0;
              return d.jsxs(
                O.button,
                {
                  variants: Ns,
                  className: "card pressable",
                  style: { textAlign: "left", opacity: h ? 0.7 : 1 },
                  onClick: () => s({ type: "movementDetail", id: l.id }),
                  children: [
                    d.jsxs("div", {
                      className: "row",
                      children: [
                        d.jsx($t, {
                          icon:
                            (m = u == null ? void 0 : u.icon) != null
                              ? m
                              : "Landmark",
                          color:
                            (f = u == null ? void 0 : u.color) != null
                              ? f
                              : "#f43f5e",
                        }),
                        d.jsxs("div", {
                          className: "col grow",
                          children: [
                            d.jsx("span", {
                              className: "bold ellipsis",
                              children:
                                l.description || (u == null ? void 0 : u.name),
                            }),
                            d.jsxs("span", {
                              className: "small muted ellipsis",
                              children: [
                                l.party ? `${l.party} · ` : "",
                                l.recurrence === "CALCULATED"
                                  ? `${(p = l.debt) == null ? void 0 : p.monthlyRate}% MV`
                                  : Qf(l),
                              ],
                            }),
                          ],
                        }),
                        d.jsx("span", {
                          className: "badge",
                          style: h
                            ? { background: "var(--income)", color: "#fff" }
                            : void 0,
                          children: h
                            ? "Pagado"
                            : `${c.paidInstallments}/${c.totalInstallments}`,
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      className: "row between",
                      style: { marginTop: 12, marginBottom: 8 },
                      children: [
                        d.jsx("span", {
                          className: "small muted",
                          children: "Pendiente",
                        }),
                        d.jsx("span", {
                          className: "bold num expense",
                          children: d.jsx(B, { value: c.remaining }),
                        }),
                      ],
                    }),
                    d.jsx(wr, {
                      ratio: c.paidRatio,
                      color: h ? "var(--income)" : "var(--debt)",
                    }),
                    d.jsxs("div", {
                      className: "row between tiny muted",
                      style: { marginTop: 8 },
                      children: [
                        d.jsxs("span", {
                          children: [Math.round(c.paidRatio * 100), "% pagado"],
                        }),
                        d.jsx("span", {
                          children: c.nextDate
                            ? `Próxima: ${At(c.nextDate)}`
                            : c.payoffDate
                              ? `Finaliza: ${At(c.payoffDate)}`
                              : "",
                        }),
                      ],
                    }),
                  ],
                },
                l.id,
              );
            }),
          }),
    ],
  });
}
const NS = "1.0.0";
function DS() {
  var m, f;
  const { data: e, actions: t } = it(),
    { openSheet: s, toast: n, confirm: i } = at(),
    o = e.settings,
    a = (o.userName || "?")
      .trim()
      .split(/\s+/)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase(),
    r = async () => {
      try {
        (await ub(`finanzas-respaldo-${tt()}.json`, yb(e)),
          n("Respaldo generado"));
      } catch (p) {
        n(p instanceof Error ? p.message : "No se pudo exportar", "error");
      }
    },
    l = async () => {
      try {
        const p = await hb();
        if (!p) return;
        const g = xb(p);
        if (
          !(await i({
            title: "Restaurar respaldo",
            message: `Se reemplazarán tus datos actuales por ${g.accounts.length} cuentas y ${g.movements.length} movimientos del respaldo. Esta acción no se puede deshacer.`,
            confirmLabel: "Restaurar",
            danger: !0,
          }))
        )
          return;
        (t.replaceAll({
          ...g,
          settings: {
            ...g.settings,
            pinHash: o.pinHash,
            theme: o.theme,
            onboarded: !0,
          },
        }),
          lt.success(),
          n("Datos restaurados"));
      } catch (p) {
        n(p instanceof Error ? p.message : "No se pudo importar", "error");
      }
    },
    c = async () => {
      if (
        !(await i({
          title: "Cargar datos de ejemplo",
          message:
            "Se reemplazarán todos tus datos actuales por datos de demostración. Te recomendamos exportar un respaldo antes.",
          confirmLabel: "Cargar ejemplo",
          danger: !0,
        }))
      )
        return;
      const g = Oh(o.userName || "Usuario");
      (t.replaceAll({
        ...g,
        settings: {
          ...g.settings,
          pinHash: o.pinHash,
          theme: o.theme,
          currency: o.currency,
        },
      }),
        n("Datos de ejemplo cargados"));
    },
    u = async () => {
      (await i({
        title: "¿Borrar todos los datos?",
        message:
          "Se eliminarán cuentas, movimientos, ahorros y configuración de este dispositivo. Esta acción no se puede deshacer.",
        confirmLabel: "Borrar todo",
        danger: !0,
      })) && (t.resetAll(), n("Datos eliminados", "info"));
    },
    h = async (p) => {
      p
        ? s({ type: "pin", mode: "set" })
        : (await i({
            title: "Desactivar PIN",
            message:
              "Cualquier persona con acceso a tu teléfono podrá ver tus finanzas.",
            confirmLabel: "Desactivar",
          })) &&
          (t.updateSettings({ pinHash: null }),
          n("Bloqueo con PIN desactivado", "info"));
    };
  return d.jsxs("div", {
    children: [
      d.jsx("div", {
        className: "screen-header",
        children: d.jsx("span", {
          className: "screen-title",
          children: "Ajustes",
        }),
      }),
      d.jsxs(O.button, {
        className: "card pressable row",
        style: { width: "100%", textAlign: "left" },
        onClick: () => s({ type: "profile" }),
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        children: [
          d.jsx("span", {
            className: "bubble lg",
            style: {
              background: "var(--brand-grad)",
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
            },
            children: a,
          }),
          d.jsxs("div", {
            className: "col grow",
            children: [
              d.jsx("span", {
                className: "bold",
                children: o.userName || "Sin nombre",
              }),
              d.jsxs("span", {
                className: "small muted",
                children: [
                  "Moneda: ",
                  (f =
                    (m = tr.find((p) => p.code === o.currency)) == null
                      ? void 0
                      : m.label) != null
                    ? f
                    : o.currency,
                ],
              }),
            ],
          }),
          d.jsx(Xa, { size: 18, color: "var(--muted)" }),
        ],
      }),
      d.jsx("div", { className: "settings-label", children: "Finanzas" }),
      d.jsxs("div", {
        className: "settings-group",
        children: [
          d.jsx(de, {
            icon: d.jsx(os, { size: 18 }),
            color: "#10b981",
            label: "Cuentas",
            detail: `${e.accounts.filter((p) => !p.archived).length}`,
            onClick: () => s({ type: "accounts" }),
          }),
          d.jsx(de, {
            icon: d.jsx(sb, { size: 18 }),
            color: "#8b5cf6",
            label: "Categorías y presupuestos",
            onClick: () => s({ type: "categories" }),
          }),
          d.jsx(de, {
            icon: d.jsx(Tn, { size: 18 }),
            color: "#0ea5e9",
            label: "Transferir entre cuentas",
            onClick: () => s({ type: "transfer" }),
          }),
          d.jsx(de, {
            icon: d.jsx(pn, { size: 18 }),
            color: "#f59e0b",
            label: "Proyección a 12 meses",
            onClick: () => s({ type: "projection" }),
          }),
        ],
      }),
      d.jsx("div", {
        className: "settings-label",
        children: "Apariencia y privacidad",
      }),
      d.jsxs("div", {
        className: "settings-group",
        children: [
          d.jsxs("div", {
            className: "settings-item",
            style: { flexDirection: "column", alignItems: "stretch" },
            children: [
              d.jsxs("div", {
                className: "row",
                children: [
                  d.jsx(ds, {
                    color: "#6366f1",
                    children: d.jsx(Bx, { size: 18 }),
                  }),
                  d.jsx("span", {
                    className: "semibold grow",
                    children: "Tema",
                  }),
                ],
              }),
              d.jsx("div", {
                style: { marginTop: 10 },
                children: d.jsx(Le, {
                  layoutId: "theme-seg",
                  value: o.theme,
                  onChange: (p) => t.updateSettings({ theme: p }),
                  options: [
                    { value: "system", label: "Sistema" },
                    { value: "light", label: "Claro" },
                    { value: "dark", label: "Oscuro" },
                  ],
                }),
              }),
            ],
          }),
          d.jsxs("div", {
            className: "settings-item",
            children: [
              d.jsx(ds, {
                color: "#64748b",
                children: d.jsx(_h, { size: 18 }),
              }),
              d.jsxs("div", {
                className: "col grow",
                children: [
                  d.jsx("span", {
                    className: "semibold",
                    children: "Ocultar montos",
                  }),
                  d.jsx("span", {
                    className: "tiny muted",
                    children: "Útil al usar la app en público",
                  }),
                ],
              }),
              d.jsx(Dd, {
                on: o.hideAmounts,
                onChange: (p) => t.updateSettings({ hideAmounts: p }),
              }),
            ],
          }),
          d.jsxs("div", {
            className: "settings-item",
            children: [
              d.jsx(ds, {
                color: "#f43f5e",
                children: d.jsx(Vx, { size: 18 }),
              }),
              d.jsxs("div", {
                className: "col grow",
                children: [
                  d.jsx("span", {
                    className: "semibold",
                    children: "Bloqueo con PIN",
                  }),
                  d.jsx("span", {
                    className: "tiny muted",
                    children: "Se pide al abrir la app",
                  }),
                ],
              }),
              d.jsx(Dd, { on: !!o.pinHash, onChange: h }),
            ],
          }),
          o.pinHash &&
            d.jsx(de, {
              icon: d.jsx(Ix, { size: 18 }),
              color: "#f97316",
              label: "Cambiar PIN",
              onClick: () => s({ type: "pin", mode: "change" }),
            }),
        ],
      }),
      d.jsx("div", { className: "settings-label", children: "Datos" }),
      d.jsxs("div", {
        className: "settings-group",
        children: [
          d.jsx(de, {
            icon: d.jsx(kx, { size: 18 }),
            color: "#10b981",
            label: "Exportar respaldo",
            detail: "JSON",
            onClick: r,
          }),
          d.jsx(de, {
            icon: d.jsx(ib, { size: 18 }),
            color: "#0ea5e9",
            label: "Restaurar respaldo",
            onClick: l,
          }),
          d.jsx(de, {
            icon: d.jsx(bx, { size: 18 }),
            color: "#8b5cf6",
            label: "Cargar datos de ejemplo",
            onClick: c,
          }),
          d.jsx(de, {
            icon: d.jsx(As, { size: 18 }),
            color: "#f43f5e",
            label: "Borrar todos los datos",
            onClick: u,
            danger: !0,
          }),
        ],
      }),
      d.jsx("div", { className: "settings-label", children: "Acerca de" }),
      d.jsxs("div", {
        className: "settings-group",
        children: [
          d.jsxs("div", {
            className: "settings-item",
            children: [
              d.jsx(ds, {
                color: "#0d9488",
                children: d.jsx(Ka, { size: 18 }),
              }),
              d.jsxs("div", {
                className: "col grow",
                children: [
                  d.jsxs("span", {
                    className: "semibold",
                    children: ["Finanzas · v", NS],
                  }),
                  d.jsx("span", {
                    className: "tiny muted",
                    children: "Tus datos se guardan solo en este dispositivo.",
                  }),
                ],
              }),
            ],
          }),
          d.jsxs("div", {
            className: "settings-item",
            children: [
              d.jsx(ds, {
                color: "#64748b",
                children: d.jsx(ob, { size: 18 }),
              }),
              d.jsx("span", {
                className: "small muted grow",
                children:
                  "Hecho para controlar ingresos, gastos, créditos y metas de ahorro.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function ds({ color: e, children: t }) {
  return d.jsx("span", {
    className: "bubble sm",
    style: { background: `${e}22`, color: e },
    children: t,
  });
}
function de({ icon: e, color: t, label: s, detail: n, onClick: i, danger: o }) {
  return d.jsxs("button", {
    className: "settings-item",
    onClick: i,
    children: [
      d.jsx(ds, { color: t, children: e }),
      d.jsx("span", {
        className: `semibold grow ${o ? "expense" : ""}`,
        children: s,
      }),
      n && d.jsx("span", { className: "small muted", children: n }),
      d.jsx(Xa, { size: 18, color: "var(--muted)" }),
    ],
  });
}
const He = [
  {
    icon: d.jsx(Fi, { size: 64, strokeWidth: 1.6 }),
    title: "Todas tus finanzas en un solo lugar",
    text: "Registra ingresos, gastos y transferencias entre tus cuentas, billeteras y efectivo.",
  },
  {
    icon: d.jsx(os, { size: 64, strokeWidth: 1.6 }),
    title: "Domina tus créditos",
    text: "Calcula plazos, intereses y descubre cuánto ahorras haciendo abonos a capital.",
  },
  {
    icon: d.jsx(ts, { size: 64, strokeWidth: 1.6 }),
    title: "Ahorra con metas claras",
    text: "Planes con aportes periódicos, rendimiento E.A. y la fecha estimada para lograr tu meta.",
  },
  {
    icon: d.jsx(pn, { size: 64, strokeWidth: 1.6 }),
    title: "Mira hacia el futuro",
    text: "Presupuestos por categoría y proyección de tu saldo para los próximos 12 meses.",
  },
];
function IS() {
  const { actions: e, data: t } = it(),
    [s, n] = w.useState(0),
    [i, o] = w.useState(""),
    [a, r] = w.useState("COP"),
    [l, c] = w.useState(""),
    [u, h] = w.useState("BANK"),
    m = Xt(),
    [f, p] = w.useState(null),
    g = s === He.length,
    y = () => {
      if ((p(null), !i.trim())) return p("¿Cómo te llamas?");
      if (!l.trim()) return p("Ponle un nombre a tu primera cuenta.");
      (e.replaceAll({
        ...t,
        settings: {
          ...t.settings,
          userName: i.trim(),
          currency: a,
          onboarded: !0,
        },
        accounts: [
          {
            id: oe("acc"),
            name: l.trim(),
            type: u,
            color: "#10b981",
            initialBalance: Number.isFinite(m.value) ? Z(m.value) : 0,
            createdAt: new Date().toISOString(),
          },
        ],
      }),
        lt.success());
    },
    x = () => {
      const b = Oh(i.trim() || "Invitado");
      (e.replaceAll({
        ...b,
        settings: { ...b.settings, currency: a, theme: t.settings.theme },
      }),
        lt.success());
    };
  return d.jsxs("div", {
    className: "fullscreen",
    children: [
      g
        ? d.jsxs(
            O.div,
            {
              className: "stack",
              style: { flex: 1, overflowY: "auto", paddingBottom: 12 },
              initial: { opacity: 0, x: 40 },
              animate: { opacity: 1, x: 0 },
              children: [
                d.jsxs("div", {
                  className: "col",
                  style: { gap: 6, marginTop: 8 },
                  children: [
                    d.jsx("span", {
                      className: "bubble lg",
                      style: { background: "var(--brand-grad)", color: "#fff" },
                      children: d.jsx(Kx, { size: 26 }),
                    }),
                    d.jsx("h1", {
                      className: "onb-title",
                      style: { marginTop: 10 },
                      children: "Configuremos tu app",
                    }),
                    d.jsx("p", {
                      className: "muted small",
                      children:
                        "Tus datos se guardan solo en este teléfono. Puedes exportar respaldos cuando quieras.",
                    }),
                  ],
                }),
                f && d.jsx(ae, { children: f }),
                d.jsx(U, {
                  label: "Tu nombre",
                  children: d.jsx("input", {
                    className: "input",
                    placeholder: "Ej. Juan",
                    value: i,
                    onChange: (b) => o(b.target.value),
                    maxLength: 40,
                  }),
                }),
                d.jsx(U, {
                  label: "Moneda",
                  children: d.jsx("select", {
                    className: "select",
                    value: a,
                    onChange: (b) => r(b.target.value),
                    children: tr.map((b) =>
                      d.jsxs(
                        "option",
                        { value: b.code, children: [b.code, " · ", b.label] },
                        b.code,
                      ),
                    ),
                  }),
                }),
                d.jsx(U, {
                  label: "Tu primera cuenta",
                  children: d.jsx("input", {
                    className: "input",
                    placeholder: "Ej. Cuenta de ahorros",
                    value: l,
                    onChange: (b) => c(b.target.value),
                    maxLength: 40,
                  }),
                }),
                d.jsx("div", {
                  className: "chips",
                  style: { margin: 0, padding: 0, flexWrap: "wrap" },
                  children: ["BANK", "CASH", "WALLET"].map((b) =>
                    d.jsx(
                      "button",
                      {
                        className: `chip ${u === b ? "active" : ""}`,
                        onClick: () => h(b),
                        children: ge[b].label,
                      },
                      b,
                    ),
                  ),
                }),
                d.jsx(U, {
                  label: "¿Cuánto dinero tiene hoy?",
                  children: d.jsx(Ne, { value: m.text, onChange: m.setText }),
                }),
              ],
            },
            "setup",
          )
        : d.jsxs(
            O.div,
            {
              className: "onb-hero",
              initial: { opacity: 0, x: 40 },
              animate: { opacity: 1, x: 0 },
              transition: { type: "spring", stiffness: 260, damping: 28 },
              children: [
                d.jsx(O.div, {
                  className: "onb-art",
                  initial: { scale: 0.6, rotate: -10 },
                  animate: { scale: 1, rotate: 0 },
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 14,
                    delay: 0.05,
                  },
                  children: He[s].icon,
                }),
                d.jsx("div", { style: { height: 18 } }),
                d.jsx("h1", { className: "onb-title", children: He[s].title }),
                d.jsx("p", { className: "onb-text", children: He[s].text }),
              ],
            },
            s,
          ),
      d.jsx("div", {
        className: "dots",
        children: [...He, null].map((b, v) =>
          d.jsx("span", { className: v === s ? "on" : "" }, v),
        ),
      }),
      g
        ? d.jsxs("div", {
            className: "stack",
            style: { gap: 8 },
            children: [
              d.jsxs("button", {
                className: "btn primary",
                onClick: y,
                children: ["Crear mi espacio ", d.jsx(nc, { size: 18 })],
              }),
              d.jsx("button", {
                className: "btn secondary",
                onClick: x,
                children: "Explorar con datos de ejemplo",
              }),
            ],
          })
        : d.jsxs("div", {
            className: "stack",
            style: { gap: 8 },
            children: [
              d.jsxs("button", {
                className: "btn primary",
                onClick: () => {
                  (lt.light(), n((b) => b + 1));
                },
                children: [
                  s === He.length - 1 ? "Empezar" : "Siguiente",
                  " ",
                  d.jsx(nc, { size: 18 }),
                ],
              }),
              d.jsx("button", {
                className: "btn ghost",
                onClick: () => n(He.length),
                children: "Saltar",
              }),
            ],
          }),
    ],
  });
}
function LS({ z: e, account: t }) {
  var k, _, C, S;
  const { data: s, actions: n } = it(),
    { closeSheet: i, toast: o, confirm: a } = at(),
    r = !!t,
    [l, c] = w.useState((k = t == null ? void 0 : t.name) != null ? k : ""),
    [u, h] = w.useState((_ = t == null ? void 0 : t.type) != null ? _ : "BANK"),
    [m, f] = w.useState(
      (C = t == null ? void 0 : t.color) != null ? C : "#10b981",
    ),
    p = Xt(t == null ? void 0 : t.initialBalance),
    [g, y] = w.useState(
      ((S = t == null ? void 0 : t.initialBalance) != null ? S : 0) < 0,
    ),
    [x, b] = w.useState(null),
    v = () => {
      var A, E;
      if ((b(null), !l.trim())) return b("Ingresa el nombre de la cuenta.");
      if (
        s.accounts.find(
          (I) =>
            I.id !== (t == null ? void 0 : t.id) &&
            !I.archived &&
            I.name.trim().toLowerCase() === l.trim().toLowerCase(),
        )
      )
        return b("Ya tienes una cuenta con ese nombre.");
      const P = Number.isFinite(p.value) ? Math.abs(p.value) : 0;
      (n.saveAccount({
        id: (A = t == null ? void 0 : t.id) != null ? A : oe("acc"),
        name: l.trim(),
        type: u,
        color: m,
        initialBalance: Z(g ? -P : P),
        createdAt:
          (E = t == null ? void 0 : t.createdAt) != null
            ? E
            : new Date().toISOString(),
        archived: t == null ? void 0 : t.archived,
      }),
        lt.success(),
        o(r ? "Cuenta actualizada" : "Cuenta creada"),
        i());
    },
    j = async () => {
      if (!t) return;
      if (s.accounts.filter((A) => !A.archived).length <= 1 && !t.archived)
        return b("Debes tener al menos una cuenta activa.");
      if (
        !(await a({
          title: "Eliminar cuenta",
          message:
            "Si la cuenta tiene movimientos se archivará para conservar el historial; si no, se eliminará.",
          confirmLabel: "Continuar",
          danger: !0,
        }))
      )
        return;
      const P = n.removeAccount(t.id);
      (o(P === "archived" ? "Cuenta archivada" : "Cuenta eliminada", "info"),
        i());
    };
  return d.jsx(jt, {
    z: e,
    title: r ? "Editar cuenta" : "Nueva cuenta",
    onClose: i,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: v,
      children: "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        x && d.jsx(ae, { children: x }),
        d.jsx(U, {
          label: "Nombre",
          children: d.jsx("input", {
            className: "input",
            placeholder: "Ej. Bancolombia ahorros",
            value: l,
            onChange: (M) => c(M.target.value),
            maxLength: 40,
          }),
        }),
        d.jsxs("div", {
          className: "field",
          children: [
            d.jsx("span", { className: "field-label", children: "Tipo" }),
            d.jsx("div", {
              className: "option-list",
              children: Object.keys(ge).map((M) =>
                d.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `option ${u === M ? "active" : ""}`,
                    onClick: () => h(M),
                    children: [
                      d.jsx($t, {
                        icon: ge[M].icon,
                        color: m,
                        size: "sm",
                        solid: u === M,
                      }),
                      d.jsx("span", {
                        className: "semibold",
                        children: ge[M].label,
                      }),
                    ],
                  },
                  M,
                ),
              ),
            }),
          ],
        }),
        d.jsx(U, {
          label: "Saldo inicial",
          hint: "Dinero disponible en la cuenta al empezar a usar la app.",
          children: d.jsx(Ne, { value: p.text, onChange: p.setText }),
        }),
        d.jsxs("label", {
          className: "row small semibold",
          style: { gap: 8 },
          children: [
            d.jsx("input", {
              type: "checkbox",
              checked: g,
              onChange: (M) => y(M.target.checked),
              style: { width: 18, height: 18 },
            }),
            "El saldo inicial es negativo (sobregiro / tarjeta con deuda)",
          ],
        }),
        d.jsx(U, {
          label: "Color",
          children: d.jsx(jr, { value: m, onChange: f }),
        }),
        (t == null ? void 0 : t.archived) &&
          d.jsxs("button", {
            className: "btn secondary",
            onClick: () => {
              (n.saveAccount({ ...t, archived: !1 }),
                o("Cuenta reactivada"),
                i());
            },
            children: [d.jsx(Ch, { size: 18 }), " Reactivar cuenta"],
          }),
        r &&
          !t.archived &&
          d.jsxs("button", {
            className: "btn danger",
            onClick: j,
            children: [d.jsx(As, { size: 18 }), " Eliminar cuenta"],
          }),
      ],
    }),
  });
}
function RS({ z: e, id: t }) {
  const { data: s } = it(),
    { accounts: n } = ve(),
    { closeSheet: i, openSheet: o } = at(),
    a = n.get(t),
    r = Ps(),
    l = w.useMemo(() => Wi(s, r, { accountId: t }), [s, r, t]);
  if (!a)
    return d.jsx(jt, {
      z: e,
      title: "Cuenta",
      onClose: i,
      children: d.jsx("p", {
        className: "muted",
        children: "La cuenta no existe.",
      }),
    });
  const c = En(s, t, tt()),
    u = l.flows.filter((h) => h.date <= tt()).slice(0, 8);
  return d.jsx(jt, {
    z: e,
    title: a.name,
    onClose: i,
    headerRight: d.jsx("button", {
      className: "icon-btn",
      "aria-label": "Editar",
      onClick: () => o({ type: "account", account: a }),
      children: d.jsx(Ga, { size: 18 }),
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsxs("div", {
          className: "hero",
          style: {
            background: `linear-gradient(135deg, ${a.color} 0%, #0f172a 140%)`,
            boxShadow: "none",
          },
          children: [
            d.jsxs("div", {
              className: "row",
              style: { gap: 10 },
              children: [
                d.jsx($t, {
                  icon: ge[a.type].icon,
                  color: "#ffffff",
                  size: "sm",
                }),
                d.jsx("span", {
                  className: "hero-label",
                  children: ge[a.type].label,
                }),
              ],
            }),
            d.jsx("div", {
              className: "hero-amount",
              style: { marginBottom: 6 },
              children: d.jsx(Es, { value: c }),
            }),
            d.jsxs("div", {
              className: "small",
              style: { opacity: 0.85 },
              children: [
                "Saldo inicial ",
                d.jsx(B, { value: a.initialBalance }),
              ],
            }),
          ],
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsxs("div", {
              className: "card tight",
              children: [
                d.jsx("div", {
                  className: "tiny muted semibold",
                  children: "Ingresos del mes",
                }),
                d.jsx(B, { value: l.totalIncomes, className: "bold income" }),
              ],
            }),
            d.jsxs("div", {
              className: "card tight",
              children: [
                d.jsx("div", {
                  className: "tiny muted semibold",
                  children: "Gastos + ahorro",
                }),
                d.jsx(B, {
                  value: l.totalExpenses + l.totalSavings,
                  className: "bold expense",
                }),
              ],
            }),
          ],
        }),
        d.jsxs("button", {
          className: "btn secondary",
          onClick: () => o({ type: "transfer" }),
          children: [d.jsx(Tn, { size: 18 }), " Transferir"],
        }),
        d.jsxs("div", {
          className: "card",
          style: { paddingTop: 4, paddingBottom: 4 },
          children: [
            d.jsx("div", {
              className: "semibold",
              style: { padding: "10px 4px 4px" },
              children: "Movimientos recientes del mes",
            }),
            u.length === 0
              ? d.jsx("p", {
                  className: "small muted",
                  style: { padding: "4px 4px 12px" },
                  children: "Sin movimientos este mes.",
                })
              : d.jsx(O.div, {
                  className: "list",
                  variants: rs,
                  initial: "hidden",
                  animate: "show",
                  children: u.map((h) =>
                    d.jsx(
                      Cr,
                      { flow: h, showDate: !0 },
                      `${h.sourceId}-${h.date}`,
                    ),
                  ),
                }),
          ],
        }),
      ],
    }),
  });
}
function OS({ z: e }) {
  const { data: t } = it(),
    { closeSheet: s, openSheet: n } = at(),
    [i, o] = w.useState(!1),
    a = tt(),
    r = t.accounts.filter((l) => i || !l.archived);
  return d.jsx(jt, {
    z: e,
    title: "Cuentas",
    onClose: s,
    footer: d.jsxs("button", {
      className: "btn primary",
      onClick: () => n({ type: "account" }),
      children: [d.jsx(be, { size: 18 }), " Nueva cuenta"],
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        r.length === 0
          ? d.jsx(Cs, {
              icon: d.jsx(be, { size: 28 }),
              title: "Sin cuentas",
              text: "Crea tu primera cuenta para comenzar.",
            })
          : d.jsx(O.div, {
              className: "card",
              style: { paddingTop: 2, paddingBottom: 2 },
              variants: rs,
              initial: "hidden",
              animate: "show",
              children: d.jsx("div", {
                className: "list",
                children: r.map((l) =>
                  d.jsxs(
                    O.button,
                    {
                      variants: Ns,
                      className: "list-item",
                      onClick: () => n({ type: "account", account: l }),
                      style: { opacity: l.archived ? 0.55 : 1 },
                      children: [
                        d.jsx($t, { icon: ge[l.type].icon, color: l.color }),
                        d.jsxs("div", {
                          className: "col grow",
                          children: [
                            d.jsx("span", {
                              className: "semibold ellipsis",
                              children: l.name,
                            }),
                            d.jsxs("span", {
                              className: "small muted",
                              children: [
                                ge[l.type].label,
                                l.archived ? " · Archivada" : "",
                              ],
                            }),
                          ],
                        }),
                        d.jsx(B, {
                          value: En(t, l.id, a),
                          className: "amount",
                        }),
                      ],
                    },
                    l.id,
                  ),
                ),
              }),
            }),
        t.accounts.some((l) => l.archived) &&
          d.jsx("button", {
            className: "btn ghost",
            onClick: () => o((l) => !l),
            children: i ? "Ocultar archivadas" : "Mostrar archivadas",
          }),
        d.jsx(Jf, {
          children:
            "El saldo de cada cuenta se calcula con su saldo inicial más los ingresos, gastos, aportes de ahorro y transferencias registrados hasta hoy.",
        }),
      ],
    }),
  });
}
function FS({ z: e, category: t, kind: s, onSaved: n }) {
  var S, M, P, A, E;
  const { data: i, actions: o } = it(),
    { closeSheet: a, toast: r, confirm: l } = at(),
    c = !!t,
    [u, h] = w.useState(
      (M = (S = t == null ? void 0 : t.kind) != null ? S : s) != null
        ? M
        : "EXPENSE",
    ),
    [m, f] = w.useState((P = t == null ? void 0 : t.name) != null ? P : ""),
    [p, g] = w.useState(
      (A = t == null ? void 0 : t.color) != null
        ? A
        : u === "INCOME"
          ? "#10b981"
          : "#6366f1",
    ),
    [y, x] = w.useState(
      (E = t == null ? void 0 : t.icon) != null
        ? E
        : u === "INCOME"
          ? "Coins"
          : "Receipt",
    ),
    b = Xt(t == null ? void 0 : t.budget),
    [v, j] = w.useState(null),
    k = t ? i.movements.filter((I) => I.categoryId === t.id).length : 0,
    _ = () => {
      var z;
      j(null);
      const I = m.trim();
      if (!I) return j("Ingresa el nombre de la categoría.");
      if (
        i.categories.find(
          (L) =>
            L.id !== (t == null ? void 0 : t.id) &&
            !L.archived &&
            L.kind === u &&
            L.name.toLowerCase() === I.toLowerCase(),
        )
      )
        return j("Ya existe una categoría con ese nombre.");
      if (c && u !== t.kind && k > 0)
        return j("No puedes cambiar el tipo de una categoría con movimientos.");
      const F = (z = t == null ? void 0 : t.id) != null ? z : oe("cat");
      (o.saveCategory({
        id: F,
        name: I,
        kind: u,
        color: p,
        icon: y,
        system: t == null ? void 0 : t.system,
        budget: u === "EXPENSE" && b.value > 0 ? Z(b.value) : void 0,
        archived: t == null ? void 0 : t.archived,
      }),
        lt.success(),
        r(c ? "Categoría actualizada" : "Categoría creada"),
        n == null || n(F),
        a());
    },
    C = async () => {
      if (
        !t ||
        !(await l({
          title: "Eliminar categoría",
          message:
            k > 0
              ? `Tiene ${k} movimientos; se archivará para conservarlos y no aparecerá en nuevos registros.`
              : "La categoría se eliminará.",
          confirmLabel: k > 0 ? "Archivar" : "Eliminar",
          danger: !0,
        }))
      )
        return;
      const D = o.removeCategory(t.id);
      (r(
        D === "archived" ? "Categoría archivada" : "Categoría eliminada",
        "info",
      ),
        a());
    };
  return d.jsx(jt, {
    z: e,
    title: c ? "Editar categoría" : "Nueva categoría",
    onClose: a,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: _,
      children: "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsxs("div", {
          className: "col",
          style: { alignItems: "center", gap: 8 },
          children: [
            d.jsx(
              O.div,
              {
                initial: { scale: 0.8, rotate: -8 },
                animate: { scale: 1, rotate: 0 },
                transition: { type: "spring", stiffness: 400, damping: 18 },
                children: d.jsx($t, {
                  icon: y,
                  color: p,
                  size: "lg",
                  solid: !0,
                }),
              },
              `${y}${p}`,
            ),
            d.jsx("span", { className: "bold", children: m || "Vista previa" }),
          ],
        }),
        v && d.jsx(ae, { children: v }),
        !s &&
          d.jsx(Le, {
            layoutId: "cat-kind",
            value: u,
            onChange: h,
            options: [
              { value: "EXPENSE", label: "Gasto" },
              { value: "INCOME", label: "Ingreso" },
            ],
          }),
        d.jsx(U, {
          label: "Nombre",
          children: d.jsx("input", {
            className: "input",
            placeholder: "Ej. Gimnasio",
            value: m,
            onChange: (I) => f(I.target.value),
            maxLength: 30,
            autoFocus: !c,
          }),
        }),
        u === "EXPENSE" &&
          d.jsx(U, {
            label: "Presupuesto mensual (opcional)",
            hint: "Te avisaremos en el inicio cuando te acerques al límite.",
            children: d.jsx(Ne, { value: b.text, onChange: b.setText }),
          }),
        d.jsx(U, {
          label: "Ícono",
          children: d.jsx(Yf, { value: y, onChange: x, color: p }),
        }),
        d.jsx(U, {
          label: "Color",
          children: d.jsx(jr, { value: p, onChange: g }),
        }),
        (t == null ? void 0 : t.archived) &&
          d.jsxs("button", {
            className: "btn secondary",
            onClick: () => {
              (o.saveCategory({ ...t, archived: !1 }),
                r("Categoría reactivada"),
                a());
            },
            children: [d.jsx(Ch, { size: 18 }), " Reactivar"],
          }),
        c &&
          !t.archived &&
          d.jsxs("button", {
            className: "btn danger",
            onClick: C,
            children: [d.jsx(As, { size: 18 }), " Eliminar categoría"],
          }),
      ],
    }),
  });
}
function VS({ z: e }) {
  const { data: t } = it(),
    { closeSheet: s, openSheet: n } = at(),
    [i, o] = w.useState("EXPENSE"),
    a = t.categories
      .filter((c) => c.kind === i && !c.archived)
      .sort((c, u) => c.name.localeCompare(u.name)),
    r = t.categories.filter((c) => c.kind === i && c.archived),
    l = a.reduce((c, u) => {
      var h;
      return c + ((h = u.budget) != null ? h : 0);
    }, 0);
  return d.jsx(jt, {
    z: e,
    title: "Categorías",
    onClose: s,
    footer: d.jsxs("button", {
      className: "btn primary",
      onClick: () => n({ type: "category", kind: i }),
      children: [d.jsx(be, { size: 18 }), " Nueva categoría"],
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx(Le, {
          layoutId: "cats-kind",
          value: i,
          onChange: o,
          options: [
            { value: "EXPENSE", label: "Gastos" },
            { value: "INCOME", label: "Ingresos" },
          ],
        }),
        i === "EXPENSE" &&
          l > 0 &&
          d.jsxs("div", {
            className: "card tight row between",
            children: [
              d.jsx("span", {
                className: "small semibold",
                children: "Presupuesto mensual total",
              }),
              d.jsx(B, { value: l, className: "bold" }),
            ],
          }),
        d.jsx(
          O.div,
          {
            className: "card",
            style: { paddingTop: 2, paddingBottom: 2 },
            variants: rs,
            initial: "hidden",
            animate: "show",
            children: d.jsx("div", {
              className: "list",
              children: [...a, ...r].map((c) =>
                d.jsxs(
                  O.button,
                  {
                    variants: Ns,
                    className: "list-item",
                    onClick: () =>
                      n({ type: "category", category: c, kind: c.kind }),
                    style: { opacity: c.archived ? 0.5 : 1 },
                    children: [
                      d.jsx($t, { icon: c.icon, color: c.color }),
                      d.jsxs("div", {
                        className: "col grow",
                        children: [
                          d.jsx("span", {
                            className: "semibold ellipsis",
                            children: c.name,
                          }),
                          d.jsx("span", {
                            className: "tiny muted",
                            children: c.archived
                              ? "Archivada"
                              : c.budget
                                ? d.jsxs(d.Fragment, {
                                    children: [
                                      "Presupuesto ",
                                      d.jsx(B, { value: c.budget }),
                                    ],
                                  })
                                : i === "EXPENSE"
                                  ? "Sin presupuesto"
                                  : "Ingreso",
                          }),
                        ],
                      }),
                    ],
                  },
                  c.id,
                ),
              ),
            }),
          },
          i,
        ),
      ],
    }),
  });
}
const Do = 4;
function tm({ title: e, subtitle: t, error: s, onComplete: n }) {
  const [i, o] = w.useState(""),
    [a, r] = w.useState(0),
    [l, c] = w.useState(!1),
    u = async (h) => {
      if (l || i.length >= Do) return;
      lt.light();
      const m = i + h;
      if ((o(m), m.length === Do)) {
        c(!0);
        const f = await n(m);
        (c(!1), f || (lt.error(), r((p) => p + 1)), o(""));
      }
    };
  return d.jsxs("div", {
    className: "col",
    style: { alignItems: "center", gap: 4 },
    children: [
      d.jsx("span", {
        className: "bold",
        style: { fontSize: 18, textAlign: "center" },
        children: e,
      }),
      t && d.jsx("span", { className: "small muted", children: t }),
      d.jsx(
        O.div,
        {
          className: `pin-dots ${a ? "shake" : ""}`,
          children: Array.from({ length: Do }, (h, m) =>
            d.jsx(
              O.span,
              {
                className: m < i.length ? "on" : "",
                animate: { scale: m < i.length ? 1.15 : 1 },
                transition: { type: "spring", stiffness: 600, damping: 20 },
              },
              m,
            ),
          ),
        },
        a,
      ),
      d.jsx("span", {
        className: "small expense semibold",
        style: { minHeight: 20 },
        children: s != null ? s : "",
      }),
      d.jsxs("div", {
        className: "keypad",
        style: { marginTop: 10 },
        children: [
          ["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((h) =>
            d.jsx(
              "button",
              { className: "key", onClick: () => u(h), children: h },
              h,
            ),
          ),
          d.jsx("span", {}),
          d.jsx("button", {
            className: "key",
            onClick: () => u("0"),
            children: "0",
          }),
          d.jsx("button", {
            className: "key plain",
            "aria-label": "Borrar",
            onClick: () => o((h) => h.slice(0, -1)),
            children: d.jsx(vx, { size: 24 }),
          }),
        ],
      }),
    ],
  });
}
function BS({ z: e }) {
  const { closeSheet: t, openSheet: s } = at(),
    n = (o) => {
      (lt.light(), t(), setTimeout(o, 120));
    },
    i = [
      {
        icon: d.jsx(Yo, { size: 22 }),
        color: "#f43f5e",
        title: "Gasto",
        text: "Compras, servicios, suscripciones",
        run: () => s({ type: "movement", kind: "EXPENSE" }),
      },
      {
        icon: d.jsx(Mh, { size: 22 }),
        color: "#10b981",
        title: "Ingreso",
        text: "Salario, ventas, otros ingresos",
        run: () => s({ type: "movement", kind: "INCOME" }),
      },
      {
        icon: d.jsx(os, { size: 22 }),
        color: "#f59e0b",
        title: "Crédito o deuda",
        text: "Calcula plazo e intereses",
        run: () => s({ type: "movement", kind: "EXPENSE", debt: !0 }),
      },
      {
        icon: d.jsx(ts, { size: 22 }),
        color: "#0ea5e9",
        title: "Plan de ahorro",
        text: "Metas con aportes periódicos",
        run: () => s({ type: "saving" }),
      },
      {
        icon: d.jsx(Tn, { size: 22 }),
        color: "#8b5cf6",
        title: "Transferencia",
        text: "Mover dinero entre tus cuentas",
        run: () => s({ type: "transfer" }),
      },
    ];
  return d.jsx(jt, {
    z: e,
    title: "¿Qué quieres registrar?",
    onClose: t,
    children: d.jsx("div", {
      className: "option-list",
      style: { paddingBottom: 10 },
      children: i.map((o, a) =>
        d.jsxs(
          O.button,
          {
            className: "option",
            style: {
              background: "var(--surface)",
              border: "1px solid var(--border)",
            },
            initial: { opacity: 0, y: 14 },
            animate: { opacity: 1, y: 0 },
            transition: {
              delay: a * 0.04,
              type: "spring",
              stiffness: 400,
              damping: 30,
            },
            onClick: () => n(o.run),
            children: [
              d.jsx("span", {
                className: "bubble",
                style: { background: o.color, color: "#fff" },
                children: o.icon,
              }),
              d.jsxs("div", {
                className: "col grow",
                children: [
                  d.jsx("span", { className: "bold", children: o.title }),
                  d.jsx("span", { className: "small muted", children: o.text }),
                ],
              }),
            ],
          },
          o.title,
        ),
      ),
    }),
  });
}
function zS({ z: e, transfer: t }) {
  var _, C, S, M, P, A, E, I;
  const { data: s, actions: n } = it(),
    { closeSheet: i, toast: o, confirm: a } = at(),
    r = s.accounts.filter(
      (D) =>
        !D.archived ||
        D.id === (t == null ? void 0 : t.fromAccountId) ||
        D.id === (t == null ? void 0 : t.toAccountId),
    ),
    l = Xt(t == null ? void 0 : t.amount),
    [c, u] = w.useState(
      (S =
        (C = t == null ? void 0 : t.fromAccountId) != null
          ? C
          : (_ = r[0]) == null
            ? void 0
            : _.id) != null
        ? S
        : "",
    ),
    [h, m] = w.useState(
      (A =
        (P = t == null ? void 0 : t.toAccountId) != null
          ? P
          : (M = r[1]) == null
            ? void 0
            : M.id) != null
        ? A
        : "",
    ),
    [f, p] = w.useState((E = t == null ? void 0 : t.date) != null ? E : tt()),
    [g, y] = w.useState((I = t == null ? void 0 : t.note) != null ? I : ""),
    [x, b] = w.useState(null);
  if (r.length < 2)
    return d.jsx(jt, {
      z: e,
      title: "Transferencia",
      onClose: i,
      children: d.jsx(ae, {
        children:
          "Necesitas al menos dos cuentas activas para transferir dinero.",
      }),
    });
  const v = () => {
      var D, F;
      if ((b(null), !(l.value > 0))) return b("Ingresa un monto mayor a 0.");
      if (!c || !h || c === h)
        return b("Elige cuentas de origen y destino diferentes.");
      if (!It(f)) return b("La fecha no es válida.");
      (n.saveTransfer({
        id: (D = t == null ? void 0 : t.id) != null ? D : oe("trf"),
        fromAccountId: c,
        toAccountId: h,
        amount: Z(l.value),
        date: f,
        note: g.trim() || void 0,
        createdAt:
          (F = t == null ? void 0 : t.createdAt) != null
            ? F
            : new Date().toISOString(),
      }),
        lt.success(),
        o(t ? "Transferencia actualizada" : "Transferencia registrada"),
        i());
    },
    j = async () => {
      t &&
        (await a({
          title: "Eliminar transferencia",
          message: "Se revertirán los saldos de ambas cuentas.",
          confirmLabel: "Eliminar",
          danger: !0,
        })) &&
        (n.removeTransfer(t.id), o("Transferencia eliminada", "info"), i());
    },
    k = c ? En(s, c, tt()) : 0;
  return d.jsx(jt, {
    z: e,
    title: t ? "Editar transferencia" : "Transferir",
    onClose: i,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: v,
      children: "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx(to, {
          value: l.text,
          onChange: l.setText,
          color: "var(--text)",
          label: "Monto",
        }),
        x && d.jsx(ae, { children: x }),
        d.jsx(U, {
          label: "Desde",
          hint: d.jsxs(d.Fragment, {
            children: ["Saldo disponible: ", d.jsx(B, { value: k })],
          }),
          children: d.jsx("select", {
            className: "select",
            value: c,
            onChange: (D) => u(D.target.value),
            children: r.map((D) =>
              d.jsx("option", { value: D.id, children: D.name }, D.id),
            ),
          }),
        }),
        d.jsx("div", {
          style: { display: "grid", placeItems: "center" },
          children: d.jsx(O.button, {
            className: "icon-btn",
            whileTap: { rotate: 180 },
            onClick: () => {
              (u(h), m(c));
            },
            "aria-label": "Intercambiar cuentas",
            children: d.jsx(Tn, {
              size: 18,
              style: { transform: "rotate(90deg)" },
            }),
          }),
        }),
        d.jsx(U, {
          label: "Hacia",
          children: d.jsx("select", {
            className: "select",
            value: h,
            onChange: (D) => m(D.target.value),
            children: r.map((D) =>
              d.jsx("option", { value: D.id, children: D.name }, D.id),
            ),
          }),
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsx(U, {
              label: "Fecha",
              children: d.jsx("input", {
                className: "input",
                type: "date",
                value: f,
                onChange: (D) => p(D.target.value),
              }),
            }),
            d.jsx(U, {
              label: "Nota",
              children: d.jsx("input", {
                className: "input",
                placeholder: "Opcional",
                value: g,
                onChange: (D) => y(D.target.value),
                maxLength: 50,
              }),
            }),
          ],
        }),
        t &&
          d.jsxs("button", {
            className: "btn danger",
            onClick: j,
            children: [d.jsx(As, { size: 18 }), " Eliminar"],
          }),
      ],
    }),
  });
}
function $S({ z: e, mode: t, targetId: s }) {
  const { actions: n } = it(),
    { movements: i, savings: o } = ve(),
    { closeSheet: a, toast: r } = at(),
    l = Xt(),
    [c, u] = w.useState(tt()),
    [h, m] = w.useState(""),
    [f, p] = w.useState(null),
    g = w.useMemo(() => {
      var v, j;
      if (t === "extraPayment") {
        const k = i.get(s);
        return k &&
          (j = (v = Ui(k, It(c) ? c : tt())) == null ? void 0 : v.remaining) !=
            null
          ? j
          : 0;
      }
      if (t === "withdrawal") {
        const k = o.get(s);
        return k ? $i(k, It(c) ? c : tt()) : 0;
      }
      return 1 / 0;
    }, [t, s, c, i, o]),
    y = {
      extraPayment: "Abono a capital",
      contribution: "Aporte extra",
      withdrawal: "Retiro del ahorro",
    },
    x = {
      extraPayment: "var(--income)",
      contribution: "var(--saving)",
      withdrawal: "var(--debt)",
    },
    b = () => {
      if ((p(null), !(l.value > 0))) return p("Ingresa un monto mayor a 0.");
      if (!It(c)) return p("La fecha no es válida.");
      if (l.value > g + 0.001)
        return p(
          t === "extraPayment"
            ? "El abono supera el saldo pendiente de la deuda en esa fecha."
            : "No puedes retirar más del saldo ahorrado.",
        );
      if (t === "extraPayment")
        n.addExtraPayment(s, {
          date: c,
          amount: Z(l.value),
          note: h.trim() || void 0,
        });
      else {
        const v = Z(l.value);
        n.addContribution(s, {
          date: c,
          amount: t === "withdrawal" ? -v : v,
          note: h.trim() || void 0,
        });
      }
      (lt.success(), r(`${y[t]} registrado`), a());
    };
  return d.jsx(jt, {
    z: e,
    title: y[t],
    onClose: a,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: b,
      children: "Registrar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx(to, {
          value: l.text,
          onChange: l.setText,
          color: x[t],
          label: "Monto",
        }),
        Number.isFinite(g) &&
          d.jsxs("div", {
            className: "small muted",
            style: { textAlign: "center" },
            children: [
              t === "extraPayment" ? "Saldo pendiente" : "Saldo disponible",
              ": ",
              d.jsx(B, { value: g, className: "bold" }),
            ],
          }),
        f && d.jsx(ae, { children: f }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsx(U, {
              label: "Fecha",
              children: d.jsx("input", {
                className: "input",
                type: "date",
                value: c,
                onChange: (v) => u(v.target.value),
              }),
            }),
            d.jsx(U, {
              label: "Nota",
              children: d.jsx("input", {
                className: "input",
                placeholder: "Opcional",
                value: h,
                onChange: (v) => m(v.target.value),
                maxLength: 50,
              }),
            }),
          ],
        }),
        t === "extraPayment" &&
          d.jsx("p", {
            className: "small muted",
            children:
              "El abono se descuenta de la cuenta del crédito y reduce el plazo de la deuda manteniendo la misma cuota.",
          }),
      ],
    }),
  });
}
function HS({ z: e, mode: t }) {
  const { data: s, actions: n } = it(),
    { closeSheet: i, toast: o } = at(),
    [a, r] = w.useState(t === "change" ? "current" : "new"),
    [l, c] = w.useState(""),
    [u, h] = w.useState(null),
    m = async (p) => (
      h(null),
      a === "current"
        ? (await Jo(p)) !== s.settings.pinHash
          ? (h("PIN incorrecto"), !1)
          : (r("new"), !0)
        : a === "new"
          ? (c(p), r("confirm"), !0)
          : p !== l
            ? (h("Los PIN no coinciden, inténtalo de nuevo"), r("new"), !1)
            : (n.updateSettings({ pinHash: await Jo(p) }),
              lt.success(),
              o("PIN guardado. Se pedirá al abrir la app."),
              i(),
              !0)
    ),
    f = {
      current: "Ingresa tu PIN actual",
      new: "Crea un PIN de 4 dígitos",
      confirm: "Confirma tu nuevo PIN",
    };
  return d.jsx(jt, {
    z: e,
    title: t === "set" ? "Activar PIN" : "Cambiar PIN",
    onClose: i,
    children: d.jsx("div", {
      style: { paddingBottom: 12 },
      children: d.jsx(tm, { title: f[a], error: u, onComplete: m }, a),
    }),
  });
}
function WS({ z: e }) {
  const { data: t, actions: s } = it(),
    { closeSheet: n, toast: i } = at(),
    [o, a] = w.useState(t.settings.userName),
    [r, l] = w.useState(t.settings.currency);
  return d.jsx(jt, {
    z: e,
    title: "Perfil",
    onClose: n,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: () => {
        (s.updateSettings({ userName: o.trim(), currency: r }),
          i("Perfil actualizado"),
          n());
      },
      children: "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx(U, {
          label: "Tu nombre",
          children: d.jsx("input", {
            className: "input",
            value: o,
            onChange: (c) => a(c.target.value),
            maxLength: 40,
          }),
        }),
        d.jsx(U, {
          label: "Moneda",
          hint: "Solo cambia el formato de visualización; no convierte montos.",
          children: d.jsx("select", {
            className: "select",
            value: r,
            onChange: (c) => l(c.target.value),
            children: tr.map((c) =>
              d.jsxs(
                "option",
                { value: c.code, children: [c.code, " · ", c.label] },
                c.code,
              ),
            ),
          }),
        }),
      ],
    }),
  });
}
function US({ z: e }) {
  const { data: t } = it(),
    { closeSheet: s } = at(),
    n = w.useMemo(() => Cb(t, 12), [t]),
    i = n.reduce((a, r) => (r.balance < a.balance ? r : a), n[0]),
    o = n[n.length - 1];
  return d.jsx(jt, {
    z: e,
    title: "Proyección a 12 meses",
    onClose: s,
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx("p", {
          className: "small muted",
          children:
            "Saldo disponible estimado según tus ingresos, gastos recurrentes, cuotas de créditos y aportes de ahorro programados.",
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsxs("div", {
              className: "card tight",
              children: [
                d.jsx("div", {
                  className: "tiny muted semibold",
                  children: "En 12 meses",
                }),
                d.jsx(B, {
                  value: o.balance,
                  className: `bold ${o.balance < 0 ? "expense" : "income"}`,
                }),
              ],
            }),
            d.jsxs("div", {
              className: "card tight",
              children: [
                d.jsx("div", {
                  className: "tiny muted semibold",
                  children: "Punto más bajo",
                }),
                d.jsx(B, {
                  value: i.balance,
                  className: `bold ${i.balance < 0 ? "expense" : ""}`,
                }),
                d.jsx("div", {
                  className: "tiny muted",
                  children: Nt(i.month),
                }),
              ],
            }),
          ],
        }),
        i.balance < 0 &&
          d.jsxs(ae, {
            children: [
              "Con tus compromisos actuales tu saldo sería negativo en ",
              Nt(i.month).toLowerCase(),
              ". Considera ajustar gastos o planes.",
            ],
          }),
        d.jsx("div", {
          className: "card",
          children: d.jsx("div", {
            className: "chart-box",
            children: d.jsx(Pi, {
              labels: n.map((a) => Nt(a.month, !0)),
              series: [
                {
                  label: "Saldo proyectado",
                  data: n.map((a) => a.balance),
                  color: "#0d9488",
                },
              ],
            }),
          }),
        }),
        d.jsx("div", {
          className: "card",
          children: n.map((a) =>
            d.jsx(
              ut,
              {
                k: Nt(a.month),
                v: d.jsxs("span", {
                  children: [
                    d.jsx(B, {
                      value: a.net,
                      sign: !0,
                      className: a.net < 0 ? "expense" : "income",
                    }),
                    " ",
                    d.jsx("span", { className: "muted", children: "→" }),
                    " ",
                    d.jsx(B, { value: a.balance }),
                  ],
                }),
              },
              a.month,
            ),
          ),
        }),
      ],
    }),
  });
}
function XS({ z: e, id: t }) {
  var A, E, I, D, F, z, L;
  const { actions: s } = it(),
    { movements: n, categories: i, accounts: o } = ve(),
    { closeSheet: a, openSheet: r, confirm: l, toast: c } = at(),
    [u, h] = w.useState("balance"),
    [m, f] = w.useState(!1),
    p = n.get(t),
    g = tt(),
    y = w.useMemo(
      () =>
        (p == null ? void 0 : p.recurrence) === "CALCULATED" ? es(p) : null,
      [p],
    ),
    x = w.useMemo(() => {
      var T;
      return (p == null ? void 0 : p.recurrence) === "CALCULATED" &&
        (T = p.extraPayments) != null &&
        T.length
        ? es({ ...p, extraPayments: [] })
        : null;
    }, [p]),
    b = w.useMemo(() => (p ? Ui(p, g) : null), [p, g]);
  if (!p)
    return d.jsx(jt, {
      z: e,
      title: "Movimiento",
      onClose: a,
      children: d.jsx("p", {
        className: "muted",
        children: "Este movimiento ya no existe.",
      }),
    });
  const v = i.get(p.categoryId),
    j = o.get(p.accountId),
    k = p.kind === "INCOME",
    _ = sr(p),
    C = nr(p, p.date, g).filter((T) => T.source === "MOVEMENT").length,
    S = async () => {
      (await l({
        title: "Eliminar movimiento",
        message:
          p.recurrence === "ONCE"
            ? "Se eliminará este movimiento y se recalcularán los saldos."
            : "Se eliminarán todas sus cuotas (pasadas y futuras) y se recalcularán los saldos. Si solo quieres que deje de repetirse, usa “Finalizar”.",
        confirmLabel: "Eliminar",
        danger: !0,
      })) && (s.removeMovement(p.id), c("Movimiento eliminado", "info"), a());
    },
    M = async () => {
      (await l({
        title: "Finalizar recurrencia",
        message: `Se conservarán las ${C} cuotas ya ocurridas y no se generarán más a partir de ${Nt(Rt(g)).toLowerCase()}.`,
        confirmLabel: "Finalizar",
      })) &&
        (s.saveMovement({ ...p, recurrence: "FIXED", months: Math.max(1, C) }),
        lt.success(),
        c("Recurrencia finalizada"));
    },
    P = y ? [At(p.date), ...y.rows.map((T) => Nt(Rt(T.date), !0))] : [];
  return d.jsx(jt, {
    z: e,
    title: "Detalle",
    onClose: a,
    headerRight: d.jsx("button", {
      className: "icon-btn",
      "aria-label": "Editar",
      onClick: () => r({ type: "movement", kind: p.kind, movement: p }),
      children: d.jsx(Ga, { size: 18 }),
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsxs(O.div, {
          className: "col",
          style: { alignItems: "center", textAlign: "center", gap: 8 },
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          children: [
            d.jsx($t, {
              icon: (A = v == null ? void 0 : v.icon) != null ? A : "Receipt",
              color: (E = v == null ? void 0 : v.color) != null ? E : "#64748b",
              size: "lg",
              solid: !0,
            }),
            d.jsx("span", {
              className: "bold",
              style: { fontSize: 17 },
              children: p.description || (v == null ? void 0 : v.name),
            }),
            d.jsx(B, {
              value: k ? p.amount : -p.amount,
              sign: !0,
              className: `bold ${k ? "income" : "expense"}`,
            }),
            d.jsxs("div", {
              className: "row",
              style: { justifyContent: "center", flexWrap: "wrap", gap: 6 },
              children: [
                d.jsx("span", {
                  className: "badge",
                  children: k ? "Ingreso" : "Gasto",
                }),
                d.jsx("span", { className: "badge", children: Qf(p) }),
                p.recurrence !== "ONCE" &&
                  d.jsx("span", {
                    className: "badge",
                    children:
                      p.recurrence === "CALCULATED"
                        ? "Cuota mensual"
                        : "Valor mensual",
                  }),
              ],
            }),
          ],
        }),
        d.jsxs("div", {
          className: "card",
          children: [
            d.jsx(ut, {
              k: "Categoría",
              v: (I = v == null ? void 0 : v.name) != null ? I : "—",
            }),
            d.jsx(ut, {
              k: "Cuenta",
              v: (D = j == null ? void 0 : j.name) != null ? D : "—",
            }),
            d.jsx(ut, {
              k: p.recurrence === "ONCE" ? "Fecha" : "Primera cuota",
              v: At(p.date),
            }),
            p.recurrence !== "ONCE" &&
              d.jsx(ut, {
                k: "Última cuota",
                v: _ ? At(_) : "Sin fecha final",
              }),
            p.recurrence !== "ONCE" &&
              d.jsx(ut, { k: "Cuotas ocurridas", v: C }),
            p.party &&
              d.jsx(ut, {
                k: k ? "Fuente" : "Acreedor / establecimiento",
                v: p.party,
              }),
            p.debt &&
              d.jsxs(d.Fragment, {
                children: [
                  d.jsx(ut, {
                    k: "Desembolso",
                    v: d.jsx(B, { value: p.debt.principal }),
                  }),
                  d.jsx(ut, {
                    k: "Saldo inicial",
                    v: d.jsx(B, { value: p.debt.balance }),
                  }),
                  d.jsx(ut, { k: "Tasa", v: `${p.debt.monthlyRate}% MV` }),
                  p.debt.charges > 0 &&
                    d.jsx(ut, {
                      k: "Seguros y cargos",
                      v: d.jsx(B, { value: p.debt.charges }),
                    }),
                ],
              }),
          ],
        }),
        b &&
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsxs("div", {
                className: "row between",
                style: { marginBottom: 8 },
                children: [
                  d.jsx("span", {
                    className: "semibold",
                    children:
                      p.recurrence === "CALCULATED"
                        ? "Saldo pendiente"
                        : "Compromiso restante",
                  }),
                  d.jsx(B, { value: b.remaining, className: "bold expense" }),
                ],
              }),
              d.jsx(wr, {
                ratio: b.paidRatio,
                color: b.remaining <= 0 ? "var(--income)" : "var(--debt)",
              }),
              d.jsxs("div", {
                className: "row between tiny muted",
                style: { marginTop: 6 },
                children: [
                  d.jsxs("span", {
                    children: [
                      Math.round(b.paidRatio * 100),
                      "% pagado · ",
                      b.paidInstallments,
                      "/",
                      b.totalInstallments,
                      " cuotas",
                    ],
                  }),
                  b.nextDate &&
                    d.jsxs("span", { children: ["Próxima ", At(b.nextDate)] }),
                ],
              }),
              p.recurrence === "CALCULATED" &&
                d.jsxs("div", {
                  className: "grid-2",
                  style: { marginTop: 12 },
                  children: [
                    d.jsxs("div", {
                      className: "card flat tight",
                      style: { background: "var(--surface-2)" },
                      children: [
                        d.jsx("div", {
                          className: "tiny muted semibold",
                          children: "Intereses totales",
                        }),
                        d.jsx(B, { value: b.totalInterest, className: "bold" }),
                      ],
                    }),
                    d.jsxs("div", {
                      className: "card flat tight",
                      style: { background: "var(--surface-2)" },
                      children: [
                        d.jsx("div", {
                          className: "tiny muted semibold",
                          children: "Fecha de pago final",
                        }),
                        d.jsx("span", {
                          className: "bold",
                          children: At((F = b.payoffDate) != null ? F : void 0),
                        }),
                      ],
                    }),
                  ],
                }),
              x &&
                y &&
                d.jsxs("div", {
                  className: "info-box",
                  style: { marginTop: 12 },
                  children: [
                    d.jsx(si, { size: 16, color: "var(--income)" }),
                    d.jsxs("span", {
                      children: [
                        "Gracias a tus abonos ahorras ",
                        d.jsx("b", {
                          children: d.jsx(B, {
                            value: x.totalInterest - y.totalInterest,
                          }),
                        }),
                        " en intereses y terminas",
                        " ",
                        d.jsxs("b", {
                          children: [
                            x.months - y.months,
                            " ",
                            x.months - y.months === 1 ? "mes" : "meses",
                          ],
                        }),
                        " antes.",
                      ],
                    }),
                  ],
                }),
            ],
          }),
        y &&
          !y.error &&
          y.rows.length > 0 &&
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsx(Le, {
                layoutId: "debt-chart",
                value: u,
                onChange: h,
                options: [
                  { value: "balance", label: "Saldo" },
                  { value: "parts", label: "Composición" },
                ],
              }),
              d.jsx("div", {
                className: "chart-box",
                style: { marginTop: 14 },
                children:
                  u === "balance"
                    ? d.jsx(Pi, {
                        labels: x
                          ? [
                              At(p.date),
                              ...x.rows.map((T) => Nt(Rt(T.date), !0)),
                            ]
                          : P,
                        series: [
                          {
                            label: "Saldo",
                            data: [
                              p.debt.balance,
                              ...y.rows.map((T) => T.balance),
                            ],
                            color: "#f43f5e",
                          },
                          ...(x
                            ? [
                                {
                                  label: "Sin abonos",
                                  data: [
                                    p.debt.balance,
                                    ...x.rows.map((T) => T.balance),
                                  ],
                                  color: "#94a3b8",
                                  dashed: !0,
                                },
                              ]
                            : []),
                        ],
                      })
                    : d.jsx(xS, {
                        labels: y.rows.map((T) => Nt(Rt(T.date), !0)),
                        series: [
                          {
                            label: "Capital",
                            data: y.rows.map((T) => T.principal),
                            color: "#10b981",
                          },
                          {
                            label: "Intereses",
                            data: y.rows.map((T) => T.interest),
                            color: "#f59e0b",
                          },
                          {
                            label: "Cargos",
                            data: y.rows.map((T) => T.charges),
                            color: "#94a3b8",
                          },
                        ],
                      }),
              }),
              d.jsx("button", {
                className: "btn ghost",
                onClick: () => f((T) => !T),
                children: m
                  ? "Ocultar tabla de amortización"
                  : "Ver tabla de amortización",
              }),
              m &&
                d.jsx("div", {
                  className: "table-scroll",
                  children: d.jsxs("table", {
                    className: "table",
                    children: [
                      d.jsx("thead", {
                        children: d.jsxs("tr", {
                          children: [
                            d.jsx("th", { children: "#" }),
                            d.jsx("th", { children: "Fecha" }),
                            d.jsx("th", { children: "Cuota" }),
                            d.jsx("th", { children: "Interés" }),
                            d.jsx("th", { children: "Saldo" }),
                          ],
                        }),
                      }),
                      d.jsx("tbody", {
                        children: y.rows.map((T) =>
                          d.jsxs(
                            "tr",
                            {
                              style: { opacity: T.date <= g ? 0.55 : 1 },
                              children: [
                                d.jsx("td", { children: T.index + 1 }),
                                d.jsx("td", { children: At(T.date) }),
                                d.jsx("td", {
                                  children: d.jsx(B, {
                                    value: T.payment,
                                    compact: !0,
                                  }),
                                }),
                                d.jsx("td", {
                                  children: d.jsx(B, {
                                    value: T.interest,
                                    compact: !0,
                                  }),
                                }),
                                d.jsx("td", {
                                  children: d.jsx(B, {
                                    value: T.balance,
                                    compact: !0,
                                  }),
                                }),
                              ],
                            },
                            T.index,
                          ),
                        ),
                      }),
                    ],
                  }),
                }),
            ],
          }),
        b &&
          p.recurrence === "FIXED" &&
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsx("div", {
                className: "semibold",
                style: { marginBottom: 8 },
                children: "Compromiso restante",
              }),
              d.jsx("div", {
                className: "chart-box",
                style: { height: 180 },
                children: d.jsx(Pi, {
                  labels: Array.from(
                    { length: b.totalInstallments + 1 },
                    (T, W) => (W === 0 ? "Inicio" : `${W}`),
                  ),
                  series: [
                    {
                      label: "Restante",
                      data: Array.from(
                        { length: b.totalInstallments + 1 },
                        (T, W) => p.amount * (b.totalInstallments - W),
                      ),
                      color: "#f59e0b",
                    },
                  ],
                }),
              }),
            ],
          }),
        p.recurrence === "CALCULATED" &&
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsxs("div", {
                className: "row between",
                style: { marginBottom: 6 },
                children: [
                  d.jsx("span", {
                    className: "semibold",
                    children: "Abonos a capital",
                  }),
                  b &&
                    b.remaining > 0 &&
                    d.jsxs("button", {
                      className: "btn sm secondary",
                      onClick: () =>
                        r({
                          type: "amountEntry",
                          mode: "extraPayment",
                          targetId: p.id,
                        }),
                      children: [d.jsx(si, { size: 16 }), " Abonar"],
                    }),
                ],
              }),
              ((z = p.extraPayments) != null ? z : []).length === 0
                ? d.jsx("p", {
                    className: "small muted",
                    children:
                      "Registra pagos extraordinarios para reducir el plazo y los intereses.",
                  })
                : d.jsx("div", {
                    className: "list",
                    children: [...((L = p.extraPayments) != null ? L : [])]
                      .sort((T, W) => W.date.localeCompare(T.date))
                      .map((T) => {
                        var W;
                        return d.jsxs(
                          "div",
                          {
                            className: "list-item",
                            children: [
                              d.jsx("span", {
                                className: "bubble sm",
                                style: {
                                  background: "var(--surface-2)",
                                  color: "var(--income)",
                                },
                                children: d.jsx(si, { size: 16 }),
                              }),
                              d.jsxs("div", {
                                className: "col grow",
                                children: [
                                  d.jsx("span", {
                                    className: "semibold small",
                                    children: T.note || "Abono extraordinario",
                                  }),
                                  d.jsx("span", {
                                    className: "tiny muted",
                                    children: At(T.date),
                                  }),
                                ],
                              }),
                              d.jsx(B, {
                                value:
                                  (W =
                                    y == null
                                      ? void 0
                                      : y.appliedExtras[T.id]) != null
                                    ? W
                                    : T.amount,
                                className: "bold",
                              }),
                              d.jsx("button", {
                                className: "icon-btn plain",
                                "aria-label": "Eliminar abono",
                                onClick: async () => {
                                  (await l({
                                    title: "Eliminar abono",
                                    message:
                                      "Se recalculará la amortización del crédito.",
                                    confirmLabel: "Eliminar",
                                    danger: !0,
                                  })) && s.removeExtraPayment(p.id, T.id);
                                },
                                children: d.jsx(Ya, { size: 16 }),
                              }),
                            ],
                          },
                          T.id,
                        );
                      }),
                  }),
            ],
          }),
        d.jsxs("div", {
          className: "stack",
          style: { gap: 10 },
          children: [
            p.recurrence === "INDEFINITE" &&
              C > 0 &&
              d.jsxs("button", {
                className: "btn secondary",
                onClick: M,
                children: [
                  d.jsx(px, { size: 18 }),
                  " Finalizar (dejar de repetir)",
                ],
              }),
            d.jsxs("button", {
              className: "btn danger",
              onClick: S,
              children: [d.jsx(As, { size: 18 }), " Eliminar"],
            }),
          ],
        }),
      ],
    }),
  });
}
const KS = [
  {
    value: "ONCE",
    title: "Único",
    text: "Ocurre una sola vez en la fecha indicada.",
    icon: d.jsx(Dh, { size: 18 }),
  },
  {
    value: "INDEFINITE",
    title: "Mensual sin fin",
    text: "Se repite cada mes (arriendo, salario, suscripciones).",
    icon: d.jsx(Dx, { size: 18 }),
  },
  {
    value: "FIXED",
    title: "Plazo fijo",
    text: "Se repite cada mes durante N meses (cuotas sin interés).",
    icon: d.jsx(Th, { size: 18 }),
  },
  {
    value: "CALCULATED",
    title: "Crédito con interés",
    text: "Calcula el plazo con la tasa, el saldo y la cuota.",
    icon: d.jsx(os, { size: 18 }),
    onlyExpense: !0,
  },
];
function GS({ z: e, kind: t, movement: s, debt: n }) {
  var ke, Ds, Is, Ls, Mr, _r, Ar, Pr, Tr, Er, Nr, Dr, Ir;
  const { data: i, actions: o } = it(),
    { closeSheet: a, openSheet: r, toast: l } = at(),
    c = !!s,
    [u, h] = w.useState((ke = s == null ? void 0 : s.kind) != null ? ke : t),
    m = Xt(s == null ? void 0 : s.amount),
    [f, p] = w.useState(
      (Ds = s == null ? void 0 : s.description) != null ? Ds : "",
    ),
    [g, y] = w.useState((Is = s == null ? void 0 : s.party) != null ? Is : ""),
    x = i.accounts.filter(
      ($) => !$.archived || $.id === (s == null ? void 0 : s.accountId),
    ),
    [b, v] = w.useState(
      (_r =
        (Mr = s == null ? void 0 : s.accountId) != null
          ? Mr
          : (Ls = x[0]) == null
            ? void 0
            : Ls.id) != null
        ? _r
        : "",
    ),
    [j, k] = w.useState((Ar = s == null ? void 0 : s.date) != null ? Ar : tt()),
    [_, C] = w.useState(
      (Pr = s == null ? void 0 : s.recurrence) != null
        ? Pr
        : n
          ? "CALCULATED"
          : "ONCE",
    ),
    [S, M] = w.useState(s != null && s.months ? String(s.months) : ""),
    P = i.categories.find(
      ($) =>
        $.kind === "EXPENSE" && !$.archived && /cr[eé]dito|deuda/i.test($.name),
    ),
    [A, E] = w.useState(
      (Tr = s == null ? void 0 : s.categoryId) != null
        ? Tr
        : n && P
          ? P.id
          : "",
    ),
    I = Xt((Er = s == null ? void 0 : s.debt) == null ? void 0 : Er.principal),
    D = Xt((Nr = s == null ? void 0 : s.debt) == null ? void 0 : Nr.balance),
    F = Xt((Dr = s == null ? void 0 : s.debt) == null ? void 0 : Dr.charges),
    [z, L] = w.useState(
      s != null && s.debt ? String(Z(s.debt.monthlyRate * 1e4) / 1e4) : "",
    ),
    [T, W] = w.useState("MV"),
    [G, Y] = w.useState(null),
    ct = i.categories.filter(
      ($) =>
        $.kind === u &&
        (!$.archived || $.id === (s == null ? void 0 : s.categoryId)),
    ),
    et = u === "INCOME",
    ht = et ? "var(--income)" : "var(--expense)",
    H = et && _ === "CALCULATED" ? "ONCE" : _,
    nt = w.useMemo(() => {
      const $ = Number(z);
      return !z || !Number.isFinite($) ? NaN : T === "EA" ? $h($) : $;
    }, [z, T]),
    Ct = () => {
      var le, Lr, Rr;
      const $ = Number.isFinite(D.value) && D.value > 0 ? D.value : I.value;
      return {
        id: (le = s == null ? void 0 : s.id) != null ? le : oe("mov"),
        kind: u,
        accountId: b,
        categoryId: A,
        amount: Z(m.value),
        date: j,
        description: f.trim(),
        party: g.trim() || void 0,
        recurrence: H,
        months: H === "FIXED" ? Math.round(Number(S)) : void 0,
        debt:
          H === "CALCULATED"
            ? {
                principal: Z(Number.isFinite(I.value) ? I.value : $),
                balance: Z($),
                monthlyRate: Z(nt * 1e4) / 1e4,
                charges: Z(Number.isFinite(F.value) ? F.value : 0),
              }
            : void 0,
        extraPayments:
          H === "CALCULATED"
            ? (Lr = s == null ? void 0 : s.extraPayments) != null
              ? Lr
              : []
            : void 0,
        createdAt:
          (Rr = s == null ? void 0 : s.createdAt) != null
            ? Rr
            : new Date().toISOString(),
      };
    },
    vt = w.useMemo(
      () =>
        H !== "CALCULATED" ||
        !(m.value > 0) ||
        !(I.value > 0 || D.value > 0) ||
        !Number.isFinite(nt)
          ? null
          : es(Ct()),
      [H, m.value, I.value, D.value, nt, F.value, j],
    ),
    qt = () => {
      if ((Y(null), !(m.value > 0)))
        return Y(
          H === "CALCULATED"
            ? "Ingresa el valor de la cuota mensual."
            : "Ingresa un monto mayor a 0.",
        );
      if (!A) return Y("Selecciona una categoría.");
      if (!b) return Y("Selecciona la cuenta.");
      if (!It(j)) return Y("La fecha no es válida.");
      if (H === "FIXED") {
        const le = Number(S);
        if (!Number.isInteger(le) || le < 1 || le > 600)
          return Y("Indica el número de meses (entre 1 y 600).");
      }
      if (H === "CALCULATED") {
        if (!(I.value > 0) && !(D.value > 0))
          return Y("Ingresa el monto del crédito o su saldo actual.");
        if (!Number.isFinite(nt) || nt < 0)
          return Y("Ingresa la tasa de interés (puede ser 0).");
        if (D.value > 0 && I.value > 0 && D.value > I.value)
          return Y(
            "El saldo actual no puede ser mayor que el desembolso inicial.",
          );
        const le = es(Ct());
        if (le.error) return Y(le.error);
      }
      const $ = Ct();
      (o.saveMovement($),
        lt.success(),
        l(
          c
            ? "Cambios guardados"
            : et
              ? "Ingreso registrado"
              : H === "CALCULATED"
                ? "Crédito registrado"
                : "Gasto registrado",
        ),
        a());
    },
    K = c
      ? "Editar movimiento"
      : H === "CALCULATED" && n
        ? "Nuevo crédito"
        : et
          ? "Nuevo ingreso"
          : "Nuevo gasto",
    re =
      H === "FIXED" && Number(S) > 0 && It(j)
        ? sr({ ...Ct(), months: Number(S) })
        : null;
  return d.jsx(jt, {
    z: e,
    title: K,
    onClose: a,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: qt,
      children: c ? "Guardar cambios" : "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        !c &&
          !n &&
          d.jsx(Le, {
            layoutId: "mov-kind",
            value: u,
            onChange: ($) => {
              (h($), E(""));
            },
            options: [
              { value: "EXPENSE", label: "Gasto" },
              { value: "INCOME", label: "Ingreso" },
            ],
          }),
        d.jsx(to, {
          value: m.text,
          onChange: m.setText,
          color: ht,
          label:
            H === "CALCULATED"
              ? "Cuota mensual"
              : H === "ONCE"
                ? "Monto"
                : "Valor mensual",
        }),
        G && d.jsx(ae, { children: G }),
        d.jsx(U, {
          label: "Descripción",
          children: d.jsx("input", {
            className: "input",
            placeholder: et
              ? "Ej. Salario de octubre"
              : "Ej. Mercado de la semana",
            value: f,
            onChange: ($) => p($.target.value),
            maxLength: 80,
          }),
        }),
        d.jsxs("div", {
          className: "field",
          children: [
            d.jsx("span", { className: "field-label", children: "Categoría" }),
            d.jsx(kS, {
              categories: ct,
              value: A,
              onChange: E,
              onCreate: () =>
                r({ type: "category", kind: u, onSaved: ($) => E($) }),
            }),
          ],
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsx(U, {
              label: "Cuenta",
              children: d.jsx("select", {
                className: "select",
                value: b,
                onChange: ($) => v($.target.value),
                children: x.map(($) =>
                  d.jsx("option", { value: $.id, children: $.name }, $.id),
                ),
              }),
            }),
            d.jsx(U, {
              label: H === "ONCE" ? "Fecha" : "Primera cuota",
              children: d.jsx("input", {
                className: "input",
                type: "date",
                value: j,
                onChange: ($) => k($.target.value),
              }),
            }),
          ],
        }),
        d.jsx(U, {
          label: et
            ? "Fuente / pagador (opcional)"
            : "Establecimiento / acreedor (opcional)",
          children: d.jsx("input", {
            className: "input",
            placeholder: et ? "Ej. Empresa S.A.S." : "Ej. Banco de Bogotá",
            value: g,
            onChange: ($) => y($.target.value),
            maxLength: 60,
          }),
        }),
        d.jsxs("div", {
          className: "field",
          children: [
            d.jsx("span", { className: "field-label", children: "Frecuencia" }),
            d.jsx("div", {
              className: "option-list",
              children: KS.filter(($) => !($.onlyExpense && et)).map(($) =>
                d.jsxs(
                  "button",
                  {
                    type: "button",
                    className: `option ${H === $.value ? "active" : ""}`,
                    onClick: () => {
                      (lt.light(), C($.value));
                    },
                    children: [
                      d.jsx("span", {
                        className: "bubble sm",
                        style: {
                          background: "var(--surface)",
                          color:
                            H === $.value ? "var(--primary)" : "var(--muted)",
                        },
                        children: $.icon,
                      }),
                      d.jsxs("div", {
                        className: "col grow",
                        children: [
                          d.jsx("span", {
                            className: "semibold",
                            children: $.title,
                          }),
                          d.jsx("span", {
                            className: "tiny muted",
                            children: $.text,
                          }),
                        ],
                      }),
                    ],
                  },
                  $.value,
                ),
              ),
            }),
          ],
        }),
        d.jsxs(d.Fragment, {
          children: [
            H === "FIXED" &&
              d.jsxs(
                O.div,
                {
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  style: { overflow: "hidden" },
                  children: [
                    d.jsx(U, {
                      label: "Número de meses",
                      hint: re ? `Última cuota: ${At(re)}` : void 0,
                      children: d.jsx("input", {
                        className: "input num",
                        inputMode: "numeric",
                        placeholder: "Ej. 12",
                        value: S,
                        onChange: ($) =>
                          M($.target.value.replace(/\D/g, "").slice(0, 3)),
                      }),
                    }),
                    re &&
                      m.value > 0 &&
                      d.jsxs("div", {
                        className: "small muted",
                        style: { marginTop: 6 },
                        children: [
                          "Compromiso total: ",
                          d.jsx(B, {
                            value: m.value * Number(S),
                            className: "bold",
                          }),
                        ],
                      }),
                  ],
                },
                "fixed",
              ),
            H === "CALCULATED" &&
              d.jsxs(
                O.div,
                {
                  className: "stack",
                  initial: { opacity: 0, height: 0 },
                  animate: { opacity: 1, height: "auto" },
                  style: { overflow: "hidden" },
                  children: [
                    d.jsxs("div", {
                      className: "grid-2",
                      children: [
                        d.jsx(U, {
                          label: "Monto desembolsado",
                          children: d.jsx(Ne, {
                            value: I.text,
                            onChange: I.setText,
                          }),
                        }),
                        d.jsx(U, {
                          label: "Saldo actual",
                          hint: "Vacío = igual al desembolso",
                          children: d.jsx(Ne, {
                            value: D.text,
                            onChange: D.setText,
                          }),
                        }),
                      ],
                    }),
                    d.jsxs("div", {
                      className: "grid-2",
                      children: [
                        d.jsx(U, {
                          label: "Tasa de interés",
                          children: d.jsx(Gf, {
                            value: z,
                            onChange: L,
                            placeholder: "1,5",
                          }),
                        }),
                        d.jsx(U, {
                          label: "Tipo de tasa",
                          children: d.jsx(Le, {
                            layoutId: "rate-type",
                            value: T,
                            onChange: W,
                            options: [
                              { value: "MV", label: "% MV" },
                              { value: "EA", label: "% EA" },
                            ],
                          }),
                        }),
                      ],
                    }),
                    d.jsx(U, {
                      label: "Seguros y cargos mensuales",
                      hint: "Incluidos en la cuota; no abonan a capital.",
                      children: d.jsx(Ne, {
                        value: F.text,
                        onChange: F.setText,
                      }),
                    }),
                    T === "EA" &&
                      Number.isFinite(nt) &&
                      d.jsxs("span", {
                        className: "tiny muted",
                        children: [
                          "Equivale a ",
                          nt.toFixed(4),
                          " % mes vencido.",
                        ],
                      }),
                    vt &&
                      !vt.error &&
                      d.jsxs(O.div, {
                        className: "card flat",
                        initial: { opacity: 0, scale: 0.98 },
                        animate: { opacity: 1, scale: 1 },
                        style: { background: "var(--surface)" },
                        children: [
                          d.jsxs("div", {
                            className: "row",
                            style: { marginBottom: 6 },
                            children: [
                              d.jsx(ux, { size: 16, color: "var(--primary)" }),
                              d.jsx("span", {
                                className: "bold small",
                                children: "Simulación del crédito",
                              }),
                            ],
                          }),
                          d.jsx(ut, {
                            k: "Plazo estimado",
                            v: `${vt.months} meses`,
                          }),
                          d.jsx(ut, {
                            k: "Última cuota",
                            v: At((Ir = vt.payoffDate) != null ? Ir : void 0),
                          }),
                          d.jsx(ut, {
                            k: "Intereses totales",
                            v: d.jsx(B, {
                              value: vt.totalInterest,
                              className: "expense",
                            }),
                          }),
                          d.jsx(ut, {
                            k: "Total a pagar",
                            v: d.jsx(B, { value: vt.totalPaid }),
                          }),
                        ],
                      }),
                    (vt == null ? void 0 : vt.error) &&
                      d.jsx(ae, { children: vt.error }),
                  ],
                },
                "calc",
              ),
          ],
        }),
        c &&
          s.recurrence !== "ONCE" &&
          d.jsx(Jf, {
            children:
              "Los cambios se aplican a todas las cuotas, pasadas y futuras. Para dejar de repetir un movimiento usa “Finalizar” en su detalle.",
          }),
      ],
    }),
  });
}
const YS = [
  { v: 1, l: "Mensual" },
  { v: 2, l: "Bimestral" },
  { v: 3, l: "Trimestral" },
  { v: 6, l: "Semestral" },
  { v: 12, l: "Anual" },
];
function qS({ z: e, saving: t }) {
  var G, Y, ct, et, ht, H, nt, Ct, vt, qt;
  const { data: s, actions: n } = it(),
    { closeSheet: i, toast: o } = at(),
    a = !!t,
    r = s.accounts.filter(
      (K) => !K.archived || K.id === (t == null ? void 0 : t.accountId),
    ),
    [l, c] = w.useState((G = t == null ? void 0 : t.name) != null ? G : ""),
    [u, h] = w.useState(
      (Y = t == null ? void 0 : t.description) != null ? Y : "",
    ),
    m = Xt(t == null ? void 0 : t.installment),
    f = Xt((t == null ? void 0 : t.initialBalance) || void 0),
    p = Xt(t == null ? void 0 : t.target),
    [g, y] = w.useState(
      (ct = t == null ? void 0 : t.periodicity) != null ? ct : 1,
    ),
    [x, b] = w.useState(
      (H =
        (ht = t == null ? void 0 : t.accountId) != null
          ? ht
          : (et = r[0]) == null
            ? void 0
            : et.id) != null
        ? H
        : "",
    ),
    [v, j] = w.useState(
      (nt = t == null ? void 0 : t.startDate) != null ? nt : tt(),
    ),
    [k, _] = w.useState(
      (Ct = t == null ? void 0 : t.recurrence) != null ? Ct : "INDEFINITE",
    ),
    [C, S] = w.useState(t != null && t.months ? String(t.months) : ""),
    [M, P] = w.useState(t != null && t.annualRate ? String(t.annualRate) : ""),
    [A, E] = w.useState(
      (vt = t == null ? void 0 : t.color) != null ? vt : "#14b8a6",
    ),
    [I, D] = w.useState(
      (qt = t == null ? void 0 : t.icon) != null ? qt : "PiggyBank",
    ),
    [F, z] = w.useState(null),
    L = () => {
      var K, re, ke;
      return {
        id: (K = t == null ? void 0 : t.id) != null ? K : oe("sav"),
        accountId: x,
        name: l.trim(),
        description: u.trim() || void 0,
        installment: Number.isFinite(m.value) ? Z(m.value) : 0,
        periodicity: g,
        initialBalance: Number.isFinite(f.value) ? Z(f.value) : 0,
        annualRate: M ? Number(M) : void 0,
        target: p.value > 0 ? Z(p.value) : void 0,
        recurrence: k,
        months: k === "FIXED" ? Math.round(Number(C)) : void 0,
        startDate: v,
        contributions:
          (re = t == null ? void 0 : t.contributions) != null ? re : [],
        color: A,
        icon: I,
        createdAt:
          (ke = t == null ? void 0 : t.createdAt) != null
            ? ke
            : new Date().toISOString(),
      };
    },
    T = w.useMemo(() => {
      var Ds, Is, Ls;
      if (!It(v) || !(m.value >= 0)) return null;
      const K = L();
      if (K.recurrence === "FIXED" && !(K.months > 0)) return null;
      const re = (Ds = Qo(K)) != null ? Ds : pt(v, 11),
        ke = zi(K, re);
      return {
        end: re,
        final:
          (Ls = (Is = ke[ke.length - 1]) == null ? void 0 : Is.balance) != null
            ? Ls
            : K.initialBalance,
        goal: ir(K, tt()),
        fixed: K.recurrence === "FIXED",
      };
    }, [m.value, f.value, g, v, k, C, M, p.value]),
    W = () => {
      if ((z(null), !l.trim())) return z("Dale un nombre a tu plan de ahorro.");
      if (!(m.value >= 0) || (m.value === 0 && !(p.value > 0)))
        return z(
          "Ingresa la cuota periódica (o una meta si solo harás aportes manuales).",
        );
      if (!x) return z("Selecciona la cuenta de la que sale el ahorro.");
      if (!It(v)) return z("La fecha de inicio no es válida.");
      if (k === "FIXED") {
        const K = Number(C);
        if (!Number.isInteger(K) || K < 1 || K > 600)
          return z("Indica la duración en meses (1 a 600).");
      }
      if (M && !(Number(M) >= 0 && Number(M) <= 100))
        return z("La tasa de rendimiento debe estar entre 0 y 100 %.");
      (n.saveSaving(L()),
        lt.success(),
        o(a ? "Plan actualizado" : "Plan de ahorro creado"),
        i());
    };
  return d.jsx(jt, {
    z: e,
    title: a ? "Editar plan de ahorro" : "Nuevo plan de ahorro",
    onClose: i,
    footer: d.jsx("button", {
      className: "btn primary",
      onClick: W,
      children: "Guardar",
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsx(to, {
          value: m.text,
          onChange: m.setText,
          color: "var(--saving)",
          label: "Cuota de ahorro",
        }),
        F && d.jsx(ae, { children: F }),
        d.jsx(U, {
          label: "Nombre",
          children: d.jsx("input", {
            className: "input",
            placeholder: "Ej. Fondo de emergencia",
            value: l,
            onChange: (K) => c(K.target.value),
            maxLength: 50,
          }),
        }),
        d.jsx(U, {
          label: "Periodicidad del aporte",
          children: d.jsx("div", {
            className: "chips",
            style: { margin: 0, padding: 0 },
            children: YS.map((K) =>
              d.jsx(
                "button",
                {
                  type: "button",
                  className: `chip ${g === K.v ? "active" : ""}`,
                  onClick: () => y(K.v),
                  children: K.l,
                },
                K.v,
              ),
            ),
          }),
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsx(U, {
              label: "Sale de la cuenta",
              children: d.jsx("select", {
                className: "select",
                value: x,
                onChange: (K) => b(K.target.value),
                children: r.map((K) =>
                  d.jsx("option", { value: K.id, children: K.name }, K.id),
                ),
              }),
            }),
            d.jsx(U, {
              label: "Primer aporte",
              children: d.jsx("input", {
                className: "input",
                type: "date",
                value: v,
                onChange: (K) => j(K.target.value),
              }),
            }),
          ],
        }),
        d.jsx(U, {
          label: "Duración",
          children: d.jsx(Le, {
            layoutId: "sav-rec",
            value: k,
            onChange: _,
            options: [
              { value: "INDEFINITE", label: "Indefinida" },
              { value: "FIXED", label: "Plazo fijo" },
            ],
          }),
        }),
        k === "FIXED" &&
          d.jsx(U, {
            label: "Meses de duración",
            children: d.jsx("input", {
              className: "input num",
              inputMode: "numeric",
              placeholder: "Ej. 12",
              value: C,
              onChange: (K) => S(K.target.value.replace(/\D/g, "").slice(0, 3)),
            }),
          }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsx(U, {
              label: "Meta (opcional)",
              children: d.jsx(Ne, { value: p.text, onChange: p.setText }),
            }),
            d.jsx(U, {
              label: "Rendimiento E.A.",
              children: d.jsx(Gf, { value: M, onChange: P, placeholder: "0" }),
            }),
          ],
        }),
        d.jsx(U, {
          label: "Saldo que ya tienes ahorrado",
          hint: "No se descuenta de la cuenta.",
          children: d.jsx(Ne, { value: f.text, onChange: f.setText }),
        }),
        d.jsx(U, {
          label: "Descripción (opcional)",
          children: d.jsx("input", {
            className: "input",
            value: u,
            onChange: (K) => h(K.target.value),
            maxLength: 100,
          }),
        }),
        d.jsx(U, {
          label: "Ícono",
          children: d.jsx(Yf, { value: I, onChange: D, color: A }),
        }),
        d.jsx(U, {
          label: "Color",
          children: d.jsx(jr, { value: A, onChange: E }),
        }),
        T &&
          d.jsxs("div", {
            className: "card flat",
            style: { background: "var(--surface)" },
            children: [
              d.jsx("div", {
                className: "bold small",
                style: { marginBottom: 4 },
                children: "Proyección",
              }),
              d.jsx(ut, {
                k: T.fixed
                  ? `Saldo al finalizar (${At(T.end)})`
                  : "Saldo en 12 meses",
                v: d.jsx(B, { value: T.final, className: "saving" }),
              }),
              p.value > 0 &&
                d.jsx(ut, {
                  k: "Meta alcanzada en",
                  v: T.goal ? Nt(T.goal) : "No se alcanza",
                }),
            ],
          }),
      ],
    }),
  });
}
function ZS({ z: e, id: t }) {
  var b, v;
  const { actions: s } = it(),
    { savings: n, accounts: i } = ve(),
    { closeSheet: o, openSheet: a, confirm: r, toast: l } = at(),
    c = n.get(t),
    u = tt(),
    h = w.useMemo(() => {
      var k;
      if (!c) return [];
      const j =
        (k = Qo(c)) != null ? k : pt(u > c.startDate ? u : c.startDate, 24);
      return zi(c, j > u ? j : pt(u, 6));
    }, [c, u]);
  if (!c)
    return d.jsx(jt, {
      z: e,
      title: "Ahorro",
      onClose: o,
      children: d.jsx("p", {
        className: "muted",
        children: "Este plan ya no existe.",
      }),
    });
  const m = $i(c, u),
    f = c.target ? m / c.target : 0,
    p = ir(c, u),
    g = Qo(c),
    y = h.filter((j) => j.month <= Rt(u)).reduce((j, k) => j + k.interest, 0),
    x = async () => {
      (await r({
        title: "Eliminar plan de ahorro",
        message:
          "Se eliminará el plan y su historial. Los aportes dejarán de descontarse de la cuenta (el dinero vuelve a estar disponible).",
        confirmLabel: "Eliminar",
        danger: !0,
      })) && (s.removeSaving(c.id), l("Plan eliminado", "info"), o());
    };
  return d.jsx(jt, {
    z: e,
    title: "Plan de ahorro",
    onClose: o,
    headerRight: d.jsx("button", {
      className: "icon-btn",
      "aria-label": "Editar",
      onClick: () => a({ type: "saving", saving: c }),
      children: d.jsx(Ga, { size: 18 }),
    }),
    children: d.jsxs("div", {
      className: "stack",
      children: [
        d.jsxs(O.div, {
          className: "col",
          style: { alignItems: "center", textAlign: "center", gap: 8 },
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          children: [
            c.target
              ? d.jsx(qf, {
                  ratio: f,
                  color: c.color,
                  size: 120,
                  stroke: 10,
                  label: d.jsxs("span", {
                    style: { fontSize: 22 },
                    children: [Math.min(100, Math.round(f * 100)), "%"],
                  }),
                })
              : d.jsx($t, {
                  icon: c.icon,
                  color: c.color,
                  size: "lg",
                  solid: !0,
                }),
            d.jsx("span", {
              className: "bold",
              style: { fontSize: 17 },
              children: c.name,
            }),
            d.jsx("span", {
              className: "bold num saving",
              style: { fontSize: 28 },
              children: d.jsx(Es, { value: m }),
            }),
            c.target &&
              d.jsxs("span", {
                className: "small muted",
                children: [
                  "de ",
                  d.jsx(B, { value: c.target }),
                  " · ",
                  m >= c.target
                    ? "🎉 ¡Meta cumplida!"
                    : p
                      ? `meta en ${Nt(p).toLowerCase()}`
                      : "meta no alcanzable con los aportes actuales",
                ],
              }),
          ],
        }),
        d.jsxs("div", {
          className: "grid-2",
          children: [
            d.jsxs("button", {
              className: "btn secondary",
              onClick: () =>
                a({
                  type: "amountEntry",
                  mode: "contribution",
                  targetId: c.id,
                }),
              children: [d.jsx(sc, { size: 18 }), " Aportar"],
            }),
            d.jsxs("button", {
              className: "btn secondary",
              onClick: () =>
                a({ type: "amountEntry", mode: "withdrawal", targetId: c.id }),
              disabled: m <= 0,
              children: [d.jsx(ic, { size: 18 }), " Retirar"],
            }),
          ],
        }),
        d.jsxs("div", {
          className: "card",
          children: [
            d.jsx(ut, {
              k: "Cuota",
              v: d.jsxs(d.Fragment, {
                children: [
                  d.jsx(B, { value: c.installment }),
                  " ",
                  c.periodicity === 1 ? "/ mes" : `cada ${c.periodicity} meses`,
                ],
              }),
            }),
            d.jsx(ut, {
              k: "Cuenta de origen",
              v:
                (v = (b = i.get(c.accountId)) == null ? void 0 : b.name) != null
                  ? v
                  : "—",
            }),
            d.jsx(ut, { k: "Inicio", v: At(c.startDate) }),
            d.jsx(ut, { k: "Finaliza", v: g ? At(g) : "Indefinido" }),
            d.jsx(ut, {
              k: "Rendimiento",
              v: c.annualRate ? `${c.annualRate}% E.A.` : "Sin rendimiento",
            }),
            y > 0 &&
              d.jsx(ut, {
                k: "Intereses ganados",
                v: d.jsx(B, { value: y, className: "income" }),
              }),
            c.initialBalance > 0 &&
              d.jsx(ut, {
                k: "Saldo inicial",
                v: d.jsx(B, { value: c.initialBalance }),
              }),
            c.description && d.jsx(ut, { k: "Descripción", v: c.description }),
          ],
        }),
        h.length > 1 &&
          d.jsxs("div", {
            className: "card",
            children: [
              d.jsx("div", {
                className: "semibold",
                style: { marginBottom: 8 },
                children: "Evolución proyectada",
              }),
              d.jsx("div", {
                className: "chart-box",
                style: { height: 200 },
                children: d.jsx(Pi, {
                  labels: h.map((j) => Nt(j.month, !0)),
                  series: [
                    {
                      label: "Saldo",
                      data: h.map((j) => j.balance),
                      color: "#0ea5e9",
                    },
                    ...(c.target
                      ? [
                          {
                            label: "Meta",
                            data: h.map(() => c.target),
                            color: "#10b981",
                            dashed: !0,
                          },
                        ]
                      : []),
                  ],
                }),
              }),
            ],
          }),
        d.jsxs("div", {
          className: "card",
          children: [
            d.jsx("div", {
              className: "semibold",
              style: { marginBottom: 4 },
              children: "Aportes y retiros extra",
            }),
            c.contributions.length === 0
              ? d.jsx("p", {
                  className: "small muted",
                  children:
                    "Los aportes programados se registran automáticamente. Aquí verás los movimientos extra.",
                })
              : d.jsx("div", {
                  className: "list",
                  children: [...c.contributions]
                    .sort((j, k) => k.date.localeCompare(j.date))
                    .map((j) =>
                      d.jsxs(
                        "div",
                        {
                          className: "list-item",
                          children: [
                            d.jsx("span", {
                              className: "bubble sm",
                              style: {
                                background: "var(--surface-2)",
                                color:
                                  j.amount >= 0
                                    ? "var(--saving)"
                                    : "var(--debt)",
                              },
                              children:
                                j.amount >= 0
                                  ? d.jsx(sc, { size: 16 })
                                  : d.jsx(ic, { size: 16 }),
                            }),
                            d.jsxs("div", {
                              className: "col grow",
                              children: [
                                d.jsx("span", {
                                  className: "semibold small",
                                  children:
                                    j.note ||
                                    (j.amount >= 0 ? "Aporte extra" : "Retiro"),
                                }),
                                d.jsx("span", {
                                  className: "tiny muted",
                                  children: At(j.date),
                                }),
                              ],
                            }),
                            d.jsx(B, {
                              value: j.amount,
                              sign: !0,
                              className: `bold ${j.amount >= 0 ? "saving" : ""}`,
                            }),
                            d.jsx("button", {
                              className: "icon-btn plain",
                              "aria-label": "Eliminar",
                              onClick: async () => {
                                (await r({
                                  title: "Eliminar registro",
                                  message:
                                    "Se recalcularán el saldo del plan y de la cuenta.",
                                  confirmLabel: "Eliminar",
                                  danger: !0,
                                })) && s.removeContribution(c.id, j.id);
                              },
                              children: d.jsx(Ya, { size: 16 }),
                            }),
                          ],
                        },
                        j.id,
                      ),
                    ),
                }),
          ],
        }),
        d.jsxs("button", {
          className: "btn danger",
          onClick: x,
          children: [d.jsx(As, { size: 18 }), " Eliminar plan"],
        }),
      ],
    }),
  });
}
const JS = 450;
function QS(e, t) {
  switch (e.type) {
    case "quickAdd":
      return d.jsx(BS, { z: t });
    case "movement":
      return d.jsx(GS, {
        z: t,
        kind: e.kind,
        movement: e.movement,
        debt: e.debt,
      });
    case "movementDetail":
      return d.jsx(XS, { z: t, id: e.id });
    case "saving":
      return d.jsx(qS, { z: t, saving: e.saving });
    case "savingDetail":
      return d.jsx(ZS, { z: t, id: e.id });
    case "account":
      return d.jsx(LS, { z: t, account: e.account });
    case "accountDetail":
      return d.jsx(RS, { z: t, id: e.id });
    case "accounts":
      return d.jsx(OS, { z: t });
    case "category":
      return d.jsx(FS, {
        z: t,
        category: e.category,
        kind: e.kind,
        onSaved: e.onSaved,
      });
    case "categories":
      return d.jsx(VS, { z: t });
    case "transfer":
      return d.jsx(zS, { z: t, transfer: e.transfer });
    case "amountEntry":
      return d.jsx($S, { z: t, mode: e.mode, targetId: e.targetId });
    case "pin":
      return d.jsx(HS, { z: t, mode: e.mode });
    case "profile":
      return d.jsx(WS, { z: t });
    case "projection":
      return d.jsx(US, { z: t });
  }
}
function tj() {
  const { sheets: e, removeSheet: t } = at(),
    s = e
      .filter((n) => n.closing)
      .map((n) => n.key)
      .join(",");
  return (
    w.useEffect(() => {
      if (!s) return;
      const n = s.split(",").map(Number),
        i = setTimeout(() => n.forEach(t), JS);
      return () => clearTimeout(i);
    }, [s, t]),
    d.jsx(d.Fragment, {
      children: e.map((n, i) =>
        d.jsx(
          Kf.Provider,
          {
            value: { closing: n.closing, onExited: () => t(n.key) },
            children: QS(n.spec, i),
          },
          n.key,
        ),
      ),
    })
  );
}
const ej = 6e4;
function sj() {
  return d.jsx(vb, { children: d.jsx(kb, { children: d.jsx(ij, {}) }) });
}
function nj() {
  const { data: e } = it(),
    t = e.settings.theme;
  w.useEffect(() => {
    const s = window.matchMedia("(prefers-color-scheme: dark)"),
      n = () => {
        var a;
        const i = t === "dark" || (t === "system" && s.matches);
        document.documentElement.dataset.theme = i ? "dark" : "light";
        const o = i ? "#0b1220" : "#f3f5fa";
        ((a = document.querySelector('meta[name="theme-color"]')) == null ||
          a.setAttribute("content", o),
          db(i, o));
      };
    return (
      n(),
      s.addEventListener("change", n),
      () => s.removeEventListener("change", n)
    );
  }, [t]);
}
function ij() {
  const { data: e, ready: t } = it(),
    s = at(),
    [n, i] = w.useState(null),
    o = w.useRef(null),
    a = w.useRef(s);
  return (
    (a.current = s),
    nj(),
    w.useEffect(() => {
      t && n === null && i(!!e.settings.pinHash);
    }, [t, n, e.settings.pinHash]),
    w.useEffect(() => {
      const r = ei.addListener("appStateChange", ({ isActive: l }) => {
        l
          ? o.current && Date.now() - o.current > ej && i(!0)
          : (o.current = Date.now());
      });
      return () => void r.then((l) => l.remove());
    }, []),
    w.useEffect(() => {
      if (!Ce) return;
      const r = ei.addListener("backButton", () => {
        const l = a.current;
        l.confirmState
          ? l.closeConfirm(!1)
          : l.openCount
            ? l.closeSheet()
            : l.tab !== "home"
              ? l.setTab("home")
              : ei.minimizeApp();
      });
      return () => void r.then((l) => l.remove());
    }, []),
    !t || n === null
      ? d.jsx("div", {
          className: "splash",
          children: d.jsx(O.div, {
            className: "onb-art",
            style: { width: 96, height: 96, borderRadius: 30 },
            animate: { scale: [1, 1.06, 1] },
            transition: { repeat: 1 / 0, duration: 1.4 },
            children: d.jsx(Fi, { size: 44 }),
          }),
        })
      : !e.settings.onboarded || e.accounts.length === 0
        ? d.jsx(IS, {})
        : e.settings.pinHash && n
          ? d.jsx(aj, { onUnlock: () => i(!1) })
          : d.jsxs("div", {
              className: "app",
              children: [
                d.jsxs(
                  O.main,
                  {
                    className: "screen",
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
                    children: [
                      s.tab === "home" && d.jsx(MS, {}),
                      s.tab === "movements" && d.jsx(AS, {}),
                      s.tab === "plans" && d.jsx(PS, {}),
                      s.tab === "more" && d.jsx(DS, {}),
                    ],
                  },
                  s.tab,
                ),
                d.jsx(oj, {}),
                d.jsx(tj, {}),
                d.jsx(jS, {}),
                d.jsx(SS, {}),
              ],
            })
  );
}
const qn = [
  { tab: "home", label: "Inicio", icon: Ah },
  { tab: "movements", label: "Movimientos", icon: Fx },
  { tab: "plans", label: "Metas", icon: Eh },
  { tab: "more", label: "Ajustes", icon: Xx },
];
function oj() {
  const { tab: e, setTab: t, openSheet: s } = at(),
    n = (i) => {
      const o = i.icon,
        a = e === i.tab;
      return d.jsxs(
        "button",
        {
          className: `nav-item ${a ? "active" : ""}`,
          onClick: () => {
            (a || lt.light(), t(i.tab));
          },
          children: [
            d.jsxs("span", {
              className: "nav-icon",
              children: [
                a &&
                  d.jsx(O.span, {
                    layoutId: "nav-dot",
                    className: "dot",
                    style: {
                      position: "absolute",
                      top: -5,
                      left: "50%",
                      marginLeft: -18,
                    },
                    transition: { type: "spring", stiffness: 500, damping: 35 },
                  }),
                d.jsx(O.span, {
                  animate: { scale: a ? 1.08 : 1 },
                  style: { display: "grid" },
                  children: d.jsx(o, { size: 22, strokeWidth: a ? 2.4 : 2 }),
                }),
              ],
            }),
            i.label,
          ],
        },
        i.tab,
      );
    };
  return d.jsxs("nav", {
    className: "nav",
    children: [
      n(qn[0]),
      n(qn[1]),
      d.jsx(O.button, {
        className: "fab",
        whileTap: { scale: 0.9, rotate: 90 },
        onClick: () => {
          (lt.medium(), s({ type: "quickAdd" }));
        },
        "aria-label": "Registrar",
        children: d.jsx(be, { size: 28, strokeWidth: 2.6 }),
      }),
      n(qn[2]),
      n(qn[3]),
    ],
  });
}
function aj({ onUnlock: e }) {
  const { data: t } = it(),
    [s, n] = w.useState(null),
    [i, o] = w.useState(0);
  return d.jsx("div", {
    className: "fullscreen",
    style: { justifyContent: "center" },
    children: d.jsxs(O.div, {
      className: "col",
      style: { alignItems: "center", gap: 14 },
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      children: [
        d.jsx("div", {
          className: "onb-art",
          style: { width: 84, height: 84, borderRadius: 28 },
          children: d.jsx(Fi, { size: 38 }),
        }),
        d.jsx("div", { style: { height: 8 } }),
        d.jsx(tm, {
          title: `Hola${t.settings.userName ? `, ${t.settings.userName}` : ""}`,
          subtitle: "Ingresa tu PIN para continuar",
          error: s,
          onComplete: async (a) => {
            if ((await Jo(a)) === t.settings.pinHash)
              return (lt.success(), e(), !0);
            const r = i + 1;
            return (
              o(r),
              n(
                r >= 3
                  ? "PIN incorrecto. Si lo olvidaste, reinstala la app o restaura un respaldo."
                  : "PIN incorrecto",
              ),
              !1
            );
          },
        }),
      ],
    }),
  });
}
