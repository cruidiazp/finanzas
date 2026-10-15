// Lógica de la app (dominio, store, cálculos, respaldo, PIN). Extraído de App-DvqdBcyG.js líneas 8432-9837.
// Variables locales minificadas por Vite; propiedades, textos y estructura intactos.
const lc = Oe("Preferences", {
    web: () =>
      Cn(
        () => import("./web-BJ7AmQ2j.js"),
        __vite__mapDeps([6, 1, 2]),
        import.meta.url,
      ).then((e) => new e.PreferencesWeb()),
  }),
  cc = (e) => String(e).padStart(2, "0");
function bi(e, t, s) {
  return `${e}-${cc(t)}-${cc(s)}`;
}
function tt(e = new Date()) {
  return bi(e.getFullYear(), e.getMonth() + 1, e.getDate());
}
function Vi(e) {
  const [t, s, n] = e.slice(0, 10).split("-").map(Number);
  return { y: t, m: s, d: n };
}
function It(e) {
  if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e)) return !1;
  const { y: t, m: s, d: n } = Vi(e);
  return s >= 1 && s <= 12 && n >= 1 && n <= qa(t, s);
}
function qa(e, t) {
  return new Date(e, t, 0).getDate();
}
function pt(e, t) {
  const { y: s, m: n, d: i } = Vi(e),
    o = s * 12 + (n - 1) + t,
    a = Math.floor(o / 12),
    r = (o % 12) + 1;
  return bi(a, r, Math.min(i, qa(a, r)));
}
function gn(e, t) {
  const { y: s, m: n, d: i } = Vi(e),
    o = new Date(s, n - 1, i + t);
  return tt(o);
}
function Rt(e) {
  return e.slice(0, 7);
}
function Ps(e = new Date()) {
  return Rt(tt(e));
}
function yn(e, t) {
  return Rt(pt(`${e}-01`, t));
}
function Za(e) {
  const [t, s] = e.split("-").map(Number);
  return { start: bi(t, s, 1), end: bi(t, s, qa(t, s)) };
}
function Ja(e, t) {
  const [s, n] = e.split("-").map(Number),
    [i, o] = t.split("-").map(Number);
  return (i - s) * 12 + (o - n);
}
const fb = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ],
  Ih = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
function Nt(e, t = !1) {
  const [s, n] = e.split("-").map(Number),
    i = (t ? Ih : fb)[n - 1];
  return t
    ? `${i} ${String(s).slice(2)}`
    : `${i[0].toUpperCase()}${i.slice(1)} ${s}`;
}
function At(e, t = {}) {
  if (!e || !It(e)) return "—";
  const { y: s, m: n, d: i } = Vi(e);
  return `${i} ${Ih[n - 1]}${t.withYear === !1 ? "" : ` ${s}`}`;
}
function Qa(e, t = tt()) {
  if (e === t) return "Hoy";
  if (e === gn(t, -1)) return "Ayer";
  if (e === gn(t, 1)) return "Mañana";
  const s = e.slice(0, 4) === t.slice(0, 4);
  return At(e, { withYear: !s });
}
const mb = [
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#64748b",
  ],
  pb = [
    "Banknote",
    "Briefcase",
    "Laptop",
    "ChartLine",
    "Gift",
    "HandCoins",
    "Coins",
    "Store",
    "House",
    "ShoppingCart",
    "Utensils",
    "Coffee",
    "Car",
    "Fuel",
    "Bus",
    "Plane",
    "Zap",
    "Droplets",
    "Wifi",
    "Smartphone",
    "Tv",
    "HeartPulse",
    "Stethoscope",
    "Dumbbell",
    "GraduationCap",
    "BookOpen",
    "Gamepad2",
    "Film",
    "Popcorn",
    "Music",
    "Shirt",
    "Scissors",
    "Baby",
    "PawPrint",
    "Hammer",
    "Receipt",
    "CreditCard",
    "Landmark",
    "Shield",
    "HandHeart",
    "PiggyBank",
    "Target",
    "Sprout",
    "Award",
    "Sparkles",
  ],
  ge = {
    BANK: { label: "Cuenta bancaria", icon: "Landmark" },
    CASH: { label: "Efectivo", icon: "Banknote" },
    WALLET: { label: "Billetera digital", icon: "Smartphone" },
    CREDIT: { label: "Tarjeta de crédito", icon: "CreditCard" },
    INVESTMENT: { label: "Inversión", icon: "ChartLine" },
  },
  tr = [
    { code: "COP", label: "Peso colombiano" },
    { code: "USD", label: "Dólar estadounidense" },
    { code: "EUR", label: "Euro" },
    { code: "MXN", label: "Peso mexicano" },
    { code: "ARS", label: "Peso argentino" },
    { code: "CLP", label: "Peso chileno" },
    { code: "PEN", label: "Sol peruano" },
  ],
  gb = [
    ["Salario", "INCOME", "#10b981", "Briefcase"],
    ["Freelance", "INCOME", "#14b8a6", "Laptop"],
    ["Inversiones", "INCOME", "#6366f1", "ChartLine"],
    ["Ventas", "INCOME", "#06b6d4", "Store"],
    ["Regalos", "INCOME", "#ec4899", "Gift"],
    ["Otros ingresos", "INCOME", "#64748b", "Coins"],
    ["Vivienda", "EXPENSE", "#6366f1", "House"],
    ["Mercado", "EXPENSE", "#10b981", "ShoppingCart"],
    ["Restaurantes", "EXPENSE", "#f97316", "Utensils"],
    ["Transporte", "EXPENSE", "#3b82f6", "Car"],
    ["Servicios", "EXPENSE", "#f59e0b", "Zap"],
    ["Internet y celular", "EXPENSE", "#06b6d4", "Wifi"],
    ["Salud", "EXPENSE", "#ef4444", "HeartPulse"],
    ["Educación", "EXPENSE", "#8b5cf6", "GraduationCap"],
    ["Entretenimiento", "EXPENSE", "#d946ef", "Film"],
    ["Ropa", "EXPENSE", "#ec4899", "Shirt"],
    ["Créditos y deudas", "EXPENSE", "#f43f5e", "Landmark"],
    ["Seguros", "EXPENSE", "#14b8a6", "Shield"],
    ["Mascotas", "EXPENSE", "#84cc16", "PawPrint"],
    ["Otros gastos", "EXPENSE", "#64748b", "Receipt"],
  ];
function Lh() {
  return gb.map(([e, t, s, n], i) => ({
    id: `sys-${i + 1}`,
    name: e,
    kind: t,
    color: s,
    icon: n,
    system: !0,
  }));
}
function Rh() {
  return {
    userName: "",
    currency: "COP",
    theme: "system",
    pinHash: null,
    hideAmounts: !1,
    onboarded: !1,
  };
}
function er() {
  return {
    version: 1,
    settings: Rh(),
    accounts: [],
    categories: Lh(),
    movements: [],
    savings: [],
    transfers: [],
  };
}
let yo = 0;
function oe(e = "id") {
  return (
    (yo = (yo + 1) % 1e6),
    `${e}-${Date.now().toString(36)}-${yo.toString(36)}-${Math.random().toString(36).slice(2, 7)}`
  );
}
function Oh(e, t = new Date()) {
  const s = er(),
    n = tt(t),
    i = t.toISOString(),
    o = pt(n.slice(0, 8) + "01", -5),
    a = (l) => s.categories.find((c) => c.name === l).id;
  ((s.settings = { ...s.settings, userName: e, onboarded: !0 }),
    (s.accounts = [
      {
        id: "acc-main",
        name: "Bancolombia",
        type: "BANK",
        color: "#10b981",
        initialBalance: 25e5,
        createdAt: i,
      },
      {
        id: "acc-cash",
        name: "Efectivo",
        type: "CASH",
        color: "#f59e0b",
        initialBalance: 3e5,
        createdAt: i,
      },
      {
        id: "acc-nequi",
        name: "Nequi",
        type: "WALLET",
        color: "#8b5cf6",
        initialBalance: 15e4,
        createdAt: i,
      },
    ]),
    (s.categories = s.categories.map((l) =>
      l.name === "Mercado"
        ? { ...l, budget: 9e5 }
        : l.name === "Restaurantes"
          ? { ...l, budget: 35e4 }
          : l.name === "Transporte"
            ? { ...l, budget: 25e4 }
            : l,
    )));
  const r = (l) => ({
    id: oe("mov"),
    accountId: "acc-main",
    createdAt: i,
    ...l,
  });
  return (
    (s.movements = [
      r({
        kind: "INCOME",
        categoryId: a("Salario"),
        amount: 52e5,
        date: pt(o, 0).slice(0, 8) + "28",
        description: "Salario mensual",
        party: "Empresa S.A.S.",
        recurrence: "INDEFINITE",
      }),
      r({
        kind: "INCOME",
        categoryId: a("Freelance"),
        amount: 12e5,
        date: pt(o, 4).slice(0, 8) + "15",
        description: "Proyecto diseño web",
        party: "Cliente independiente",
        recurrence: "ONCE",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Vivienda"),
        amount: 14e5,
        date: pt(o, 0).slice(0, 8) + "05",
        description: "Arriendo apartamento",
        party: "Inmobiliaria",
        recurrence: "INDEFINITE",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Servicios"),
        amount: 23e4,
        date: pt(o, 0).slice(0, 8) + "12",
        description: "Energía, agua y gas",
        recurrence: "INDEFINITE",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Internet y celular"),
        amount: 12e4,
        date: pt(o, 0).slice(0, 8) + "18",
        description: "Plan hogar + móvil",
        party: "Claro",
        recurrence: "INDEFINITE",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Mercado"),
        amount: 82e4,
        date: pt(o, 0).slice(0, 8) + "02",
        description: "Mercado del mes",
        party: "Éxito",
        recurrence: "INDEFINITE",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Restaurantes"),
        amount: 185e3,
        date: n,
        description: "Cena de cumpleaños",
        recurrence: "ONCE",
        accountId: "acc-nequi",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Transporte"),
        amount: 9e4,
        date: n,
        description: "Gasolina",
        recurrence: "ONCE",
        accountId: "acc-cash",
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Educación"),
        amount: 35e4,
        date: pt(o, 2).slice(0, 8) + "10",
        description: "Curso de inglés",
        party: "Instituto",
        recurrence: "FIXED",
        months: 6,
      }),
      r({
        kind: "EXPENSE",
        categoryId: a("Créditos y deudas"),
        amount: 78e4,
        date: pt(o, 0).slice(0, 8) + "20",
        description: "Crédito de vehículo",
        party: "Banco de Bogotá",
        recurrence: "CALCULATED",
        debt: {
          principal: 3e7,
          balance: 245e5,
          monthlyRate: 1.45,
          charges: 45e3,
        },
        extraPayments: [],
      }),
    ]),
    (s.savings = [
      {
        id: "sav-emergency",
        accountId: "acc-main",
        name: "Fondo de emergencia",
        description: "6 meses de gastos fijos",
        installment: 4e5,
        periodicity: 1,
        initialBalance: 15e5,
        annualRate: 9.5,
        target: 12e6,
        recurrence: "INDEFINITE",
        startDate: pt(o, 0).slice(0, 8) + "28",
        contributions: [],
        color: "#14b8a6",
        icon: "Shield",
        createdAt: i,
      },
      {
        id: "sav-travel",
        accountId: "acc-main",
        name: "Viaje a Cartagena",
        installment: 25e4,
        periodicity: 1,
        initialBalance: 0,
        annualRate: 0,
        target: 3e6,
        recurrence: "FIXED",
        months: 12,
        startDate: pt(o, 3).slice(0, 8) + "01",
        contributions: [],
        color: "#f97316",
        icon: "Plane",
        createdAt: i,
      },
    ]),
    (s.transfers = [
      {
        id: oe("trf"),
        fromAccountId: "acc-main",
        toAccountId: "acc-nequi",
        amount: 2e5,
        date: pt(n, -1),
        note: "Recarga",
        createdAt: i,
      },
    ]),
    s
  );
}
const Fh = "finance-app-mobile";
function yb(e, t = new Date()) {
  const s = { app: Fh, exportedAt: t.toISOString(), data: e };
  return JSON.stringify(s, null, 2);
}
const on = (e) => typeof e == "object" && e !== null && !Array.isArray(e),
  Mt = (e) => typeof e == "number" && Number.isFinite(e),
  J = (e) => typeof e == "string";
function mt(e) {
  throw new Error(`Respaldo inválido: ${e}`);
}
function Vh(e) {
  on(e) || mt("el contenido no es un objeto.");
  const t = (f) => {
      const p = e[f];
      return p === void 0
        ? []
        : (Array.isArray(p) || mt(`"${f}" debe ser una lista.`), p);
    },
    s = t("accounts").map(
      (f, p) => (
        (!J(f.id) || !J(f.name)) && mt(`cuenta #${p + 1} sin id o nombre.`),
        {
          id: f.id,
          name: f.name,
          type: ["BANK", "CASH", "WALLET", "CREDIT", "INVESTMENT"].includes(
            f.type,
          )
            ? f.type
            : "BANK",
          color: J(f.color) ? f.color : "#10b981",
          initialBalance: Mt(f.initialBalance) ? f.initialBalance : 0,
          createdAt: J(f.createdAt) ? f.createdAt : new Date().toISOString(),
          archived: f.archived === !0,
        }
      ),
    ),
    n = new Set(s.map((f) => f.id)),
    i = t("categories").map(
      (f, p) => (
        (!J(f.id) || !J(f.name)) && mt(`categoría #${p + 1} sin id o nombre.`),
        f.kind !== "INCOME" &&
          f.kind !== "EXPENSE" &&
          mt(`categoría "${f.name}" con tipo inválido.`),
        {
          id: f.id,
          name: f.name,
          kind: f.kind,
          color: J(f.color) ? f.color : "#64748b",
          icon: J(f.icon) ? f.icon : "Receipt",
          system: f.system === !0,
          budget: Mt(f.budget) && f.budget > 0 ? f.budget : void 0,
          archived: f.archived === !0,
        }
      ),
    ),
    o = i.length ? i : Lh(),
    a = new Set(o.map((f) => f.id)),
    r = t("movements").map((f, p) => {
      const g = `movimiento #${p + 1}`;
      (J(f.id) || mt(`${g} sin id.`),
        f.kind !== "INCOME" &&
          f.kind !== "EXPENSE" &&
          mt(`${g} con tipo inválido.`),
        (!J(f.accountId) || !n.has(f.accountId)) &&
          mt(`${g} referencia una cuenta inexistente.`),
        (!J(f.categoryId) || !a.has(f.categoryId)) &&
          mt(`${g} referencia una categoría inexistente.`),
        (!Mt(f.amount) || f.amount <= 0) && mt(`${g} con monto inválido.`),
        It(f.date) || mt(`${g} con fecha inválida.`));
      const y = ["ONCE", "FIXED", "INDEFINITE", "CALCULATED"].includes(
          f.recurrence,
        )
          ? f.recurrence
          : "ONCE",
        x = on(f.debt)
          ? {
              principal: Mt(f.debt.principal) ? f.debt.principal : 0,
              balance: Mt(f.debt.balance) ? f.debt.balance : 0,
              monthlyRate: Mt(f.debt.monthlyRate) ? f.debt.monthlyRate : 0,
              charges: Mt(f.debt.charges) ? f.debt.charges : 0,
            }
          : void 0;
      return (
        y === "CALCULATED" &&
          !x &&
          mt(`${g} es una deuda sin datos de cálculo.`),
        {
          id: f.id,
          kind: f.kind,
          accountId: f.accountId,
          categoryId: f.categoryId,
          amount: f.amount,
          date: f.date,
          description: J(f.description) ? f.description : "",
          party: J(f.party) ? f.party : void 0,
          recurrence: y,
          months:
            Mt(f.months) && f.months > 0
              ? Math.round(f.months)
              : y === "FIXED"
                ? 1
                : void 0,
          debt: x,
          extraPayments: Array.isArray(f.extraPayments)
            ? f.extraPayments
                .filter(
                  (b) => J(b.id) && It(b.date) && Mt(b.amount) && b.amount > 0,
                )
                .map((b) => ({
                  id: b.id,
                  date: b.date,
                  amount: b.amount,
                  note: J(b.note) ? b.note : void 0,
                }))
            : void 0,
          createdAt: J(f.createdAt) ? f.createdAt : new Date().toISOString(),
        }
      );
    }),
    l = t("savings").map((f, p) => {
      const g = `ahorro #${p + 1}`;
      return (
        (!J(f.id) || !J(f.name)) && mt(`${g} sin id o nombre.`),
        (!J(f.accountId) || !n.has(f.accountId)) &&
          mt(`${g} referencia una cuenta inexistente.`),
        It(f.startDate) || mt(`${g} con fecha de inicio inválida.`),
        {
          id: f.id,
          accountId: f.accountId,
          name: f.name,
          description: J(f.description) ? f.description : void 0,
          installment:
            Mt(f.installment) && f.installment >= 0 ? f.installment : 0,
          periodicity:
            Mt(f.periodicity) && f.periodicity >= 1
              ? Math.round(f.periodicity)
              : 1,
          initialBalance: Mt(f.initialBalance) ? f.initialBalance : 0,
          annualRate: Mt(f.annualRate) ? f.annualRate : void 0,
          target: Mt(f.target) && f.target > 0 ? f.target : void 0,
          recurrence: f.recurrence === "FIXED" ? "FIXED" : "INDEFINITE",
          months: Mt(f.months) && f.months > 0 ? Math.round(f.months) : void 0,
          startDate: f.startDate,
          contributions: Array.isArray(f.contributions)
            ? f.contributions
                .filter((y) => J(y.id) && It(y.date) && Mt(y.amount))
                .map((y) => ({
                  id: y.id,
                  date: y.date,
                  amount: y.amount,
                  note: J(y.note) ? y.note : void 0,
                }))
            : [],
          color: J(f.color) ? f.color : "#14b8a6",
          icon: J(f.icon) ? f.icon : "PiggyBank",
          createdAt: J(f.createdAt) ? f.createdAt : new Date().toISOString(),
        }
      );
    }),
    c = t("transfers").map((f, p) => {
      const g = `transferencia #${p + 1}`;
      return (
        J(f.id) || mt(`${g} sin id.`),
        (!J(f.fromAccountId) ||
          !n.has(f.fromAccountId) ||
          !J(f.toAccountId) ||
          !n.has(f.toAccountId)) &&
          mt(`${g} referencia cuentas inexistentes.`),
        (!Mt(f.amount) || f.amount <= 0) && mt(`${g} con monto inválido.`),
        It(f.date) || mt(`${g} con fecha inválida.`),
        {
          id: f.id,
          fromAccountId: f.fromAccountId,
          toAccountId: f.toAccountId,
          amount: f.amount,
          date: f.date,
          note: J(f.note) ? f.note : void 0,
          createdAt: J(f.createdAt) ? f.createdAt : new Date().toISOString(),
        }
      );
    }),
    u = on(e.settings) ? e.settings : {},
    h = Rh();
  return {
    version: 1,
    settings: {
      userName: J(u.userName) ? u.userName : h.userName,
      currency: J(u.currency) ? u.currency : h.currency,
      theme: u.theme === "light" || u.theme === "dark" ? u.theme : "system",
      pinHash: J(u.pinHash) ? u.pinHash : null,
      hideAmounts: u.hideAmounts === !0,
      onboarded: u.onboarded === !0 || s.length > 0,
    },
    accounts: s,
    categories: o,
    movements: r,
    savings: l,
    transfers: c,
  };
}
function xb(e) {
  let t;
  try {
    t = JSON.parse(e);
  } catch {
    mt("el archivo no es un JSON válido.");
  }
  (on(t) || mt("formato desconocido."),
    (t.app !== Fh || !on(t.data)) &&
      mt("el archivo no fue generado por esta app."));
  const s = Vh(t.data);
  return (s.accounts.length || mt("el respaldo no contiene cuentas."), s);
}
const dc = "finance-data-v1",
  Bh = w.createContext(null),
  Fs = (e, t) =>
    e.some((s) => s.id === t.id)
      ? e.map((s) => (s.id === t.id ? t : s))
      : [...e, t];
function bb(e) {
  return {
    replaceAll: (t) => e(() => t),
    updateSettings: (t) =>
      e((s) => ({ ...s, settings: { ...s.settings, ...t } })),
    saveAccount: (t) => e((s) => ({ ...s, accounts: Fs(s.accounts, t) })),
    removeAccount: (t) => {
      let s = "deleted";
      return (
        e((n) => {
          const i =
            n.movements.some((o) => o.accountId === t) ||
            n.savings.some((o) => o.accountId === t) ||
            n.transfers.some(
              (o) => o.fromAccountId === t || o.toAccountId === t,
            );
          return (
            (s = i ? "archived" : "deleted"),
            {
              ...n,
              accounts: i
                ? n.accounts.map((o) =>
                    o.id === t ? { ...o, archived: !0 } : o,
                  )
                : n.accounts.filter((o) => o.id !== t),
            }
          );
        }),
        s
      );
    },
    saveCategory: (t) => e((s) => ({ ...s, categories: Fs(s.categories, t) })),
    removeCategory: (t) => {
      let s = "deleted";
      return (
        e((n) => {
          const i = n.movements.some((o) => o.categoryId === t);
          return (
            (s = i ? "archived" : "deleted"),
            {
              ...n,
              categories: i
                ? n.categories.map((o) =>
                    o.id === t ? { ...o, archived: !0 } : o,
                  )
                : n.categories.filter((o) => o.id !== t),
            }
          );
        }),
        s
      );
    },
    saveMovement: (t) => e((s) => ({ ...s, movements: Fs(s.movements, t) })),
    removeMovement: (t) =>
      e((s) => ({ ...s, movements: s.movements.filter((n) => n.id !== t) })),
    addExtraPayment: (t, s) =>
      e((n) => ({
        ...n,
        movements: n.movements.map((i) => {
          var o;
          return i.id === t
            ? {
                ...i,
                extraPayments: [
                  ...((o = i.extraPayments) != null ? o : []),
                  { ...s, id: oe("ext") },
                ],
              }
            : i;
        }),
      })),
    removeExtraPayment: (t, s) =>
      e((n) => ({
        ...n,
        movements: n.movements.map((i) => {
          var o;
          return i.id === t
            ? {
                ...i,
                extraPayments: ((o = i.extraPayments) != null ? o : []).filter(
                  (a) => a.id !== s,
                ),
              }
            : i;
        }),
      })),
    saveSaving: (t) => e((s) => ({ ...s, savings: Fs(s.savings, t) })),
    removeSaving: (t) =>
      e((s) => ({ ...s, savings: s.savings.filter((n) => n.id !== t) })),
    addContribution: (t, s) =>
      e((n) => ({
        ...n,
        savings: n.savings.map((i) =>
          i.id === t
            ? {
                ...i,
                contributions: [...i.contributions, { ...s, id: oe("ctb") }],
              }
            : i,
        ),
      })),
    removeContribution: (t, s) =>
      e((n) => ({
        ...n,
        savings: n.savings.map((i) =>
          i.id === t
            ? { ...i, contributions: i.contributions.filter((o) => o.id !== s) }
            : i,
        ),
      })),
    saveTransfer: (t) => e((s) => ({ ...s, transfers: Fs(s.transfers, t) })),
    removeTransfer: (t) =>
      e((s) => ({ ...s, transfers: s.transfers.filter((n) => n.id !== t) })),
    resetAll: () => e(() => er()),
  };
}
function vb({ children: e }) {
  const [t, s] = w.useState(er),
    [n, i] = w.useState(!1),
    o = w.useRef(t),
    a = w.useRef(null),
    r = w.useCallback(async () => {
      (a.current && (clearTimeout(a.current), (a.current = null)),
        await lc.set({ key: dc, value: JSON.stringify(o.current) }));
    }, []);
  w.useEffect(() => {
    let h = !0;
    lc.get({ key: dc })
      .then(({ value: p }) => {
        if (!(!h || !p))
          try {
            const g = Vh(JSON.parse(p));
            ((o.current = g), s(g));
          } catch (g) {
            console.error("Datos locales corruptos; se inicia vacío", g);
          }
      })
      .finally(() => h && i(!0));
    const m = ei.addListener("appStateChange", ({ isActive: p }) => {
        p || r();
      }),
      f = () => document.visibilityState === "hidden" && void r();
    return (
      document.addEventListener("visibilitychange", f),
      () => {
        ((h = !1),
          m.then((p) => p.remove()),
          document.removeEventListener("visibilitychange", f));
      }
    );
  }, [r]);
  const l = w.useCallback(
      (h) => {
        const m = h(o.current);
        ((o.current = m),
          s(m),
          a.current && clearTimeout(a.current),
          (a.current = setTimeout(() => void r(), 250)));
      },
      [r],
    ),
    c = w.useMemo(() => bb(l), [l]),
    u = w.useMemo(
      () => ({ data: t, ready: n, update: l, actions: c }),
      [t, n, l, c],
    );
  return d.jsx(Bh.Provider, { value: u, children: e });
}
function it() {
  const e = w.useContext(Bh);
  if (!e) throw new Error("useStore debe usarse dentro de StoreProvider");
  return e;
}
function ve() {
  const { data: e } = it();
  return w.useMemo(() => {
    const t = new Map(e.accounts.map((o) => [o.id, o])),
      s = new Map(e.categories.map((o) => [o.id, o])),
      n = new Map(e.movements.map((o) => [o.id, o])),
      i = new Map(e.savings.map((o) => [o.id, o]));
    return { accounts: t, categories: s, movements: n, savings: i };
  }, [e]);
}
const zh = w.createContext(null);
function kb({ children: e }) {
  const [t, s] = w.useState("home"),
    [n, i] = w.useState(Ps()),
    [o, a] = w.useState(null),
    [r, l] = w.useState([]),
    [c, u] = w.useState([]),
    [h, m] = w.useState(null),
    f = w.useRef(0),
    p = w.useCallback((C) => {
      f.current += 1;
      const S = f.current;
      l((M) => [...M, { key: S, spec: C, closing: !1 }]);
    }, []),
    g = w.useCallback(
      () =>
        l((C) => {
          const S = C.map((M) => M.closing).lastIndexOf(!1);
          return S < 0
            ? C
            : C.map((M, P) => (P === S ? { ...M, closing: !0 } : M));
        }),
      [],
    ),
    y = w.useCallback(
      () => l((C) => C.map((S) => ({ ...S, closing: !0 }))),
      [],
    ),
    x = w.useCallback((C) => l((S) => S.filter((M) => M.key !== C)), []),
    b = r.filter((C) => !C.closing).length,
    v = w.useCallback((C, S = "success") => {
      f.current += 1;
      const M = f.current;
      (u((P) => [...P.slice(-2), { id: M, text: C, tone: S }]),
        setTimeout(() => u((P) => P.filter((A) => A.id !== M)), 2800));
    }, []),
    j = w.useCallback((C) => new Promise((S) => m({ ...C, resolve: S })), []),
    k = w.useCallback((C) => {
      m((S) => (S == null || S.resolve(C), null));
    }, []),
    _ = w.useMemo(
      () => ({
        tab: t,
        setTab: s,
        month: n,
        setMonth: i,
        accountFilter: o,
        setAccountFilter: a,
        sheets: r,
        openCount: b,
        openSheet: p,
        closeSheet: g,
        closeAllSheets: y,
        removeSheet: x,
        toasts: c,
        toast: v,
        confirmState: h,
        confirm: j,
        closeConfirm: k,
      }),
      [t, n, o, r, b, p, g, y, x, c, v, h, j, k],
    );
  return d.jsx(zh.Provider, { value: _, children: e });
}
function at() {
  const e = w.useContext(zh);
  if (!e) throw new Error("useUI debe usarse dentro de UIProvider");
  return e;
}
const Bi = 600,
  Z = (e) => Math.round((e + Number.EPSILON) * 100) / 100,
  Gt = (e) => Z(e.reduce((t, s) => t + s, 0));
function $h(e) {
  return (Math.pow(1 + e / 100, 1 / 12) - 1) * 100;
}
const uc = (e) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(e);
function Sb(e, t) {
  if (!(t.balance > 0))
    return "El saldo actual de la deuda debe ser mayor a 0.";
  if (t.monthlyRate < 0) return "La tasa de interés no puede ser negativa.";
  if (t.charges < 0) return "Los cargos adicionales no pueden ser negativos.";
  const s = e - t.charges;
  if (s <= 0)
    return "La cuota debe ser mayor que los cargos adicionales mensuales.";
  const n = t.balance * (t.monthlyRate / 100);
  return s <= n
    ? `La cuota disponible para capital (${uc(s)}) debe superar el interés del primer mes (${uc(n)}); de lo contrario la deuda nunca se paga.`
    : null;
}
function es(e) {
  var m;
  const t = {
    rows: [],
    months: 0,
    totalInterest: 0,
    totalPaid: 0,
    payoffDate: null,
    appliedExtras: {},
  };
  if (!e.debt)
    return { ...t, error: "La deuda no tiene información de cálculo." };
  const s = Sb(e.amount, e.debt);
  if (s) return { ...t, error: s };
  const n = e.debt.monthlyRate / 100,
    i = e.debt.charges,
    o = e.amount - i,
    a = [...((m = e.extraPayments) != null ? m : [])].sort((f, p) =>
      f.date.localeCompare(p.date),
    ),
    r = {};
  a.forEach((f) => (r[f.id] = 0));
  let l = e.debt.balance,
    c = 0;
  const u = [];
  for (let f = 0; l > 0.005 && f < Bi; f++) {
    const p = pt(e.date, f);
    let g = 0;
    for (; c < a.length && a[c].date < p && l > 0.005; ) {
      const b = a[c],
        v = Z(Math.min(b.amount, l));
      ((r[b.id] = v), (l = Z(l - v)), (g += v), c++);
    }
    if (l <= 0.005) {
      u.length && (u[u.length - 1].extra += g);
      break;
    }
    const y = Z(l * n),
      x = Z(Math.min(l, o - y));
    ((l = Z(l - x)),
      u.push({
        index: f,
        date: p,
        payment: Z(x + y + i),
        principal: x,
        interest: y,
        charges: i,
        extra: Z(g),
        balance: Math.max(0, l),
      }));
  }
  const h = Gt(Object.values(r));
  return {
    rows: u,
    months: u.length,
    totalInterest: Gt(u.map((f) => f.interest)),
    totalPaid: Z(Gt(u.map((f) => f.payment)) + h),
    payoffDate: u.length ? u[u.length - 1].date : null,
    appliedExtras: r,
  };
}
function sr(e) {
  var t;
  switch (e.recurrence) {
    case "ONCE":
      return e.date;
    case "FIXED":
      return pt(e.date, Math.max(1, (t = e.months) != null ? t : 1) - 1);
    case "INDEFINITE":
      return null;
    case "CALCULATED":
      return es(e).payoffDate;
  }
}
function nr(e, t, s) {
  var l, c, u;
  const n = {
      sourceId: e.id,
      kind: e.kind,
      accountId: e.accountId,
      categoryId: e.categoryId,
    },
    i = [],
    o = (h) => h >= t && h <= s;
  if (e.recurrence === "ONCE")
    return (
      o(e.date) &&
        i.push({
          ...n,
          source: "MOVEMENT",
          date: e.date,
          amount: e.amount,
          installment: 1,
          totalInstallments: 1,
        }),
      i
    );
  if (e.recurrence === "CALCULATED") {
    const h = es(e);
    for (const m of h.rows) {
      if (m.date > s) break;
      o(m.date) &&
        i.push({
          ...n,
          source: "MOVEMENT",
          date: m.date,
          amount: m.payment,
          installment: m.index + 1,
          totalInstallments: h.months,
        });
    }
    for (const m of (l = e.extraPayments) != null ? l : []) {
      const f = (c = h.appliedExtras[m.id]) != null ? c : 0;
      f > 0 &&
        o(m.date) &&
        i.push({
          ...n,
          sourceId: `${e.id}:${m.id}`,
          source: "EXTRA",
          date: m.date,
          amount: f,
        });
    }
    return i;
  }
  const a =
      e.recurrence === "FIXED"
        ? Math.max(1, (u = e.months) != null ? u : 1)
        : 1 / 0,
    r = Math.max(0, Ja(Rt(e.date), Rt(t)) - 1);
  for (let h = r; h < a && h < r + Bi; h++) {
    const m = pt(e.date, h);
    if (m > s) break;
    m >= t &&
      i.push({
        ...n,
        source: "MOVEMENT",
        date: m,
        amount: e.amount,
        installment: h + 1,
        totalInstallments: Number.isFinite(a) ? a : void 0,
      });
  }
  return i;
}
function Hh(e) {
  var t;
  return e.recurrence !== "FIXED"
    ? 1 / 0
    : Math.max(
        1,
        Math.ceil(
          ((t = e.months) != null ? t : 1) / Math.max(1, e.periodicity),
        ),
      );
}
function Qo(e) {
  return e.recurrence !== "FIXED"
    ? null
    : pt(e.startDate, (Hh(e) - 1) * Math.max(1, e.periodicity));
}
function Wh(e, t, s) {
  const n = [],
    i = Math.max(1, e.periodicity),
    o = Hh(e);
  if (e.installment > 0) {
    const a = Math.max(0, Math.floor((Ja(Rt(e.startDate), Rt(t)) - 1) / i));
    for (let r = a; r < o && r < a + Bi; r++) {
      const l = pt(e.startDate, r * i);
      if (l > s) break;
      l >= t &&
        n.push({
          sourceId: e.id,
          source: "SAVING",
          kind: "SAVING",
          accountId: e.accountId,
          date: l,
          amount: e.installment,
          installment: r + 1,
          totalInstallments: Number.isFinite(o) ? o : void 0,
        });
    }
  }
  for (const a of e.contributions)
    a.date >= t &&
      a.date <= s &&
      n.push({
        sourceId: `${e.id}:${a.id}`,
        source: "CONTRIBUTION",
        kind: "SAVING",
        accountId: e.accountId,
        date: a.date,
        amount: a.amount,
      });
  return n;
}
function zi(e, t) {
  var c;
  const s =
      ((c = e.annualRate) != null ? c : 0) > 0 ? $h(e.annualRate) / 100 : 0,
    n = Rt(e.startDate),
    i = Rt(t),
    o = [];
  if (i < n) return o;
  const a = Wh(e, e.startDate, t);
  let r = e.initialBalance;
  const l = Math.min(Ja(n, i), Bi);
  for (let u = 0; u <= l; u++) {
    const h = yn(n, u),
      m = u === 0 ? 0 : Z(r * s),
      f = Gt(a.filter((p) => Rt(p.date) === h).map((p) => p.amount));
    ((r = Z(r + m + f)),
      o.push({ month: h, deposits: f, interest: m, balance: r }));
  }
  return o;
}
function $i(e, t = tt()) {
  if (t < e.startDate) return e.initialBalance;
  const s = zi(e, t);
  return s.length ? s[s.length - 1].balance : e.initialBalance;
}
function ir(e, t = tt()) {
  if (!e.target || e.target <= 0) return null;
  const s = pt(t > e.startDate ? t : e.startDate, 12 * 50),
    i = zi(e, s).find((o) => o.balance >= e.target);
  return i ? i.month : null;
}
function Hi(e, t, s, n) {
  const i = [];
  for (const o of e.movements)
    (n && o.accountId !== n) || i.push(...nr(o, t, s));
  for (const o of e.savings) (n && o.accountId !== n) || i.push(...Wh(o, t, s));
  return i;
}
const jb = "1900-01-01";
function En(e, t, s = tt()) {
  const n = e.accounts.find((o) => o.id === t);
  if (!n) return 0;
  let i = n.initialBalance;
  for (const o of Hi(e, jb, s, t))
    i += o.kind === "INCOME" ? o.amount : -o.amount;
  for (const o of e.transfers)
    o.date > s ||
      (o.fromAccountId === t && (i -= o.amount),
      o.toAccountId === t && (i += o.amount));
  return Z(i);
}
function Uh(e, t = tt()) {
  return Gt(e.accounts.filter((s) => !s.archived).map((s) => En(e, s.id, t)));
}
function Xh(e, t = tt()) {
  return Gt(e.savings.map((s) => $i(s, t)));
}
function hc(e, t) {
  var n, i;
  const s = new Map();
  for (const o of e) {
    const a = (n = o.categoryId) != null ? n : "unknown",
      r = (i = s.get(a)) != null ? i : { total: 0, count: 0 };
    ((r.total += o.amount), (r.count += 1), s.set(a, r));
  }
  return [...s.entries()]
    .map(([o, a]) => ({
      categoryId: o,
      total: Z(a.total),
      count: a.count,
      percentage: t > 0 ? Z((a.total * 100) / t) : 0,
    }))
    .sort((o, a) => a.total - o.total);
}
function Wi(e, t, s = {}) {
  const { start: n, end: i } = Za(t),
    o = Hi(e, n, i, s.accountId).sort((p, g) => g.date.localeCompare(p.date)),
    a = o.filter((p) => p.kind === "INCOME"),
    r = o.filter((p) => p.kind === "EXPENSE"),
    l = o.filter((p) => p.kind === "SAVING"),
    c = Gt(a.map((p) => p.amount)),
    u = Gt(r.map((p) => p.amount)),
    h = Gt(l.map((p) => p.amount)),
    m = hc(r, u),
    f = e.categories
      .filter((p) => {
        var g;
        return (
          p.kind === "EXPENSE" &&
          !p.archived &&
          ((g = p.budget) != null ? g : 0) > 0
        );
      })
      .map((p) => {
        var y, x;
        const g =
          (x =
            (y = m.find((b) => b.categoryId === p.id)) == null
              ? void 0
              : y.total) != null
            ? x
            : 0;
        return {
          categoryId: p.id,
          budget: p.budget,
          spent: g,
          ratio: g / p.budget,
        };
      })
      .sort((p, g) => g.ratio - p.ratio);
  return {
    month: t,
    isFuture: t > Ps(s.now),
    totalIncomes: c,
    totalExpenses: u,
    totalSavings: h,
    netCashFlow: Z(c - u - h),
    savingsRate: c > 0 ? Math.max(0, Z((h * 100) / c)) : 0,
    incomesCount: a.length,
    expensesCount: r.length,
    expenseBreakdown: m,
    incomeBreakdown: hc(a, c),
    budgets: f,
    flows: o,
  };
}
function wb(e, t, s, n) {
  const i = [];
  for (let o = s - 1; o >= 0; o--) {
    const a = Wi(e, yn(t, -o), { accountId: n });
    i.push({
      month: a.month,
      incomes: a.totalIncomes,
      expenses: a.totalExpenses,
      savings: a.totalSavings,
      net: a.netCashFlow,
    });
  }
  return i;
}
function Cb(e, t, s = new Date()) {
  const n = tt(s);
  let i = Uh(e, n);
  const o = [],
    a = Ps(s);
  for (let r = 0; r < t; r++) {
    const l = yn(a, r),
      { start: c, end: u } = Za(l),
      h = r === 0 ? gn(n, 1) : c,
      m = h <= u ? Hi(e, h, u) : [],
      f = Gt(m.map((p) => (p.kind === "INCOME" ? p.amount : -p.amount)));
    ((i = Z(i + f)), o.push({ month: l, net: f, balance: i }));
  }
  return o;
}
function Mb(e, t, s = new Date()) {
  const n = tt(s);
  return Hi(e, gn(n, 1), gn(n, t))
    .filter((i) => i.source === "MOVEMENT" || i.source === "SAVING")
    .sort((i, o) => i.date.localeCompare(o.date));
}
function Ui(e, t = tt()) {
  var s, n, i;
  if (e.kind !== "EXPENSE") return null;
  if (e.recurrence === "CALCULATED") {
    const o = es(e);
    if (o.error || !e.debt) return null;
    const a = o.rows.filter((h) => h.date <= t),
      r = ((s = e.extraPayments) != null ? s : [])
        .filter((h) => h.date <= t)
        .reduce((h, m) => {
          var f;
          return h + ((f = o.appliedExtras[m.id]) != null ? f : 0);
        }, 0),
      l = a.reduce((h, m) => h + m.principal, 0) + r,
      c = Math.max(0, Z(e.debt.balance - l)),
      u = (n = o.rows.find((h) => h.date > t)) != null ? n : null;
    return {
      movementId: e.id,
      remaining: c,
      original: e.debt.balance,
      paidRatio: e.debt.balance > 0 ? Math.min(1, l / e.debt.balance) : 1,
      paidInstallments: a.length,
      totalInstallments: o.months,
      nextDate: c > 0 && u ? u.date : null,
      nextAmount: c > 0 && u ? u.payment : 0,
      payoffDate: o.payoffDate,
      totalInterest: o.totalInterest,
    };
  }
  if (e.recurrence === "FIXED") {
    const o = Math.max(1, (i = e.months) != null ? i : 1),
      a = sr(e),
      r = nr(e, e.date, t).length,
      l = Z(e.amount * o),
      c = Z(e.amount * (o - r));
    return {
      movementId: e.id,
      remaining: c,
      original: l,
      paidRatio: r / o,
      paidInstallments: r,
      totalInstallments: o,
      nextDate: r < o ? pt(e.date, r) : null,
      nextAmount: r < o ? e.amount : 0,
      payoffDate: a,
      totalInterest: 0,
    };
  }
  return null;
}
function Kh(e, t = tt()) {
  return Gt(
    e.movements
      .filter((s) => s.kind === "EXPENSE" && s.recurrence === "CALCULATED")
      .map((s) => {
        var n, i;
        return (i = (n = Ui(s, t)) == null ? void 0 : n.remaining) != null
          ? i
          : 0;
      }),
  );
}
const fc = new Map();
function _b(e, t) {
  const s = `${e}|${t}`;
  let n = fc.get(s);
  if (!n) {
    const i = ["COP", "CLP", "ARS"].includes(e);
    ((n = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: e,
      notation: t ? "compact" : "standard",
      maximumFractionDigits: t ? 1 : i ? 0 : 2,
      minimumFractionDigits: 0,
    })),
      fc.set(s, n));
  }
  return n;
}
function Gh(e, t = "COP", s = {}) {
  const n = Number.isFinite(e) ? e : 0,
    i = _b(t, !!s.compact)
      .format(Math.abs(n))
      .replace(/[  ]/g, " ")
      .replace(/^(\D*?)\s+(?=\d)/, "$1");
  return n < 0 ? `-${i}` : s.sign && n > 0 ? `+${i}` : i;
}
const Yh = "••••••";
function qh(e) {
  const t = e.replace(/[^\d,]/g, ""),
    [s, n] = t.split(","),
    i = (s || "")
      .replace(/^0+(?=\d)/, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return n !== void 0 ? `${i || "0"},${n.slice(0, 2)}` : i;
}
function Ab(e) {
  return e ? Number(e.replace(/\./g, "").replace(",", ".")) : NaN;
}
function Pb(e) {
  if (e === void 0 || !Number.isFinite(e)) return "";
  const [t, s] = String(Math.round(e * 100) / 100).split(".");
  return qh(s ? `${t},${s}` : t);
}
function xo(e, t = 1) {
  return `${e.toLocaleString("es-CO", { maximumFractionDigits: t })} %`;
}
function Tb(e = new Date()) {
  const t = e.getHours();
  return t < 12 ? "Buenos días" : t < 19 ? "Buenas tardes" : "Buenas noches";
}
