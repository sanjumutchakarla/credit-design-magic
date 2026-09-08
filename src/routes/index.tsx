import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";

import logo from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero.jpg";
import storyImg from "@/assets/story.jpg";
import showroomImg from "@/assets/showroom.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bikers Studio | Two-Wheeler Service & Franchise, Visakhapatnam" },
      {
        name: "description",
        content:
          "Premium two-wheeler accessories, multi-brand service and a proven FOCO franchise model across North Andhra. Est. 1997, Visakhapatnam.",
      },
      { property: "og:title", content: "Bikers Studio | Built for Riders. Engineered for Growth." },
      {
        property: "og:description",
        content:
          "Premium accessories, multi-brand service and franchise expansion across North Andhra Pradesh.",
      },
    ],
  }),
  component: Index,
});

/* ---------- helpers ---------- */

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { const e = entries[0]; if (!e) return;
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={shown ? "fade-up" : "opacity-0"} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => { const e = entries[0]; if (!e) return;
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - start) / 1400, 1);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="rule-red" />
      <span className="font-sans text-[11px] font-600 tracking-[0.28em] text-primary uppercase">
        {children}
      </span>
    </div>
  );
}

/* ---------- nav ---------- */

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Franchise", "#franchise"],
  ["Territories", "#territories"],
  ["Contact", "#contact"],
] as const;

function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-background/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="flex items-center">
          <img src={logo.url} alt="Bikers Studio" className="h-11 w-auto lg:h-14" />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-display text-sm font-600 tracking-[0.18em] text-foreground/80 uppercase transition-colors hover:text-primary"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden bg-primary px-6 py-3 font-display text-xs font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background lg:inline-block"
          >
            Become a Franchise Partner
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-border lg:hidden"
          >
            <span className={`h-px w-5 bg-foreground transition ${open ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-foreground transition ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-6 pb-8 pt-4 lg:hidden">
          {NAV.map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block border-b border-border py-4 font-display text-lg tracking-[0.14em] uppercase"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-6 block bg-primary py-4 text-center font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase"
          >
            Become a Franchise Partner
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- data ---------- */

const TIMELINE = [
  ["1997", "Automotive journey begins"],
  ["Expansion", "In-house manufacturing across Delhi NCR"],
  ["2017", "Flagship retail store launched in Visakhapatnam"],
  ["Today", "Premium accessories, service and franchise expansion"],
];

const WHY = [
  ["01", "30+ Years of Experience", "Deep automotive industry experience."],
  ["02", "Direct Manufacturing", "In-house parts and accessory manufacturing capabilities."],
  ["03", "Multi-Brand Network", "Professional two-wheeler service and accessories."],
  ["04", "Proven Operating Model", "Company-operated FOCO franchise framework."],
];

const SERVICES = [
  ["01", "Multi-Brand Service", "Professional maintenance, repair and technical care.", storyImg],
  ["02", "Spare Parts", "Quality replacement parts for two-wheelers.", heroImg],
  ["03", "Premium Accessories", "Upgrade, protect and personalize your ride.", showroomImg],
  ["04", "AMC & Rider Care", "Annual maintenance and customer engagement programs.", storyImg],
];

const FLOW = [
  "You invest",
  "Bikers Studio sets up",
  "We recruit & train",
  "We manage operations",
  "You receive your share",
];

const MANAGED = [
  "Staff recruitment",
  "Technical training",
  "Salary management",
  "Store operations",
  "Maintenance",
  "Billing software",
  "Operational expenses",
];

const TIERS = [
  {
    tier: "Tier 1",
    price: "₹45 Lakhs",
    featured: false,
    rows: [
      ["Area", "2,000 sq. ft."],
      ["Capacity", "25 vehicles / day"],
      ["Expected monthly revenue", "₹20 Lakhs"],
      ["Projected monthly net profit", "₹2.5 Lakhs"],
      ["Franchise share", "₹1.75 Lakhs"],
    ],
  },
  {
    tier: "Tier 2",
    price: "₹25 Lakhs",
    featured: true,
    rows: [
      ["Area", "1,500 sq. ft."],
      ["Capacity", "15 vehicles / day"],
      ["Expected monthly revenue", "₹12 Lakhs"],
      ["Projected monthly net profit", "₹1.5 Lakhs"],
      ["Franchise share", "₹1.05 Lakhs"],
    ],
  },
  {
    tier: "Tier 3",
    price: "₹10 Lakhs",
    featured: false,
    rows: [
      ["Area", "1,000 sq. ft."],
      ["Capacity", "10 vehicles / day"],
      ["Expected monthly revenue", "₹6 Lakhs"],
      ["Projected monthly net profit", "₹75,000"],
      ["Franchise share", "₹52,500"],
    ],
  },
];

const TERRITORIES: {
  tier: string;
  price: string;
  size: string;
  rows: { name: string; status: string; available: boolean }[];
}[] = [
  {
    tier: "Tier 1",
    price: "₹45 Lakhs",
    size: "2,000 sq. ft.",
    rows: [
      { name: "Vizag (Madhurawada)", status: "Booked (Work in Progress)", available: false },
      { name: "Vizag (NAD Junction)", status: "Booked (Work in Progress)", available: false },
      { name: "Gajuwaka", status: "Booked (Work in Progress)", available: false },
      { name: "Anakapalle", status: "Open for Franchise", available: true },
      { name: "Narsipatnam", status: "Open for Franchise", available: true },
      { name: "Srikakulam", status: "Open for Franchise", available: true },
      { name: "Vizianagaram", status: "Open for Franchise", available: true },
    ],
  },
  {
    tier: "Tier 2",
    price: "₹25 Lakhs",
    size: "1,500 sq. ft.",
    rows: [
      "Bobbili",
      "Parvathipuram",
      "Srungavarapukota (S.Kota)",
      "Rajam",
      "Tagarapuvalasa",
      "Ichchapuram",
      "Palasa",
      "Narasannapeta",
      "Tekkali",
      "Chodavaram",
      "Amadalavalasa",
    ].map((name) => ({ name, status: "Open for Franchise", available: true })),
  },
  {
    tier: "Tier 3",
    price: "₹10 Lakhs",
    size: "1,000 sq. ft.",
    rows: ["Salur", "Ranasthalam", "Cheepurupalli", "Gajapathinagaram", "Araku", "Paderu"].map(
      (name) => ({ name, status: "Open for Franchise", available: true }),
    ),
  },
];

const TERRITORY_STATS = [
  ["24", "Total Territories"],
  ["21", "Available"],
  ["3", "Booked / Work in Progress"],
] as const;


/* ---------- page ---------- */

function Index() {
  return (
    <div id="home" className="bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImg}
          alt="Premium motorcycle in a professional workshop"
          width={1600}
          height={900}
          className="slow-zoom absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-y-0 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent lg:block" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-32 pb-40 lg:px-10">
          <div className="fade-up max-w-3xl">
            <p className="mb-6 font-sans text-[11px] tracking-[0.35em] text-primary uppercase">
              Est. 1997 • Visakhapatnam
            </p>
            <h1 className="display-title text-[13vw] leading-[0.9] sm:text-6xl lg:text-8xl">
              Built for riders.
              <br />
              <span className="text-primary">Engineered</span> for growth.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
              Premium two-wheeler accessories, multi-brand service and a proven franchise model —
              backed by decades of automotive expertise.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#services"
                className="bg-primary px-8 py-4 text-center font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                Explore Services →
              </a>
              <a
                href="#franchise"
                className="border border-border px-8 py-4 text-center font-display text-sm font-700 tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                Become a Franchise Partner →
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-border bg-background/70 backdrop-blur-sm">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px px-6 lg:grid-cols-4 lg:px-10">
            {["30+ Years Experience", "In-House Manufacturing", "Multi-Brand Service", "FOCO Model"].map(
              (t) => (
                <div key={t} className="py-5 font-display text-xs tracking-[0.2em] uppercase lg:text-sm">
                  <span className="mr-3 text-primary">/</span>
                  {t}
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* BRAND STORY */}
      <section id="about" className="border-t border-border py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <img
              src={storyImg}
              alt="Mechanic servicing a motorcycle"
              loading="lazy"
              width={1000}
              height={1200}
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">
              Three decades.
              <br />
              One vision.
            </h2>
            <div className="mt-8 space-y-5 text-muted-foreground">
              <p>
                Driven by over three decades of deep industry expertise, the founders of Bikers Studio
                have been a trusted name in the two-wheeler automotive ecosystem since 1997.
              </p>
              <p>
                Beginning as primary accessory suppliers for leading OEMs like TVS, Bajaj, and Hero
                Honda, the enterprise expanded into in-house manufacturing across Delhi NCR,
                establishing a robust direct supply network for multi-brand showrooms across India.
              </p>
            </div>

            <div className="mt-12 space-y-0 border-l border-border pl-8">
              {TIMELINE.map(([year, text]) => (
                <div key={year} className="relative py-5">
                  <span className="absolute -left-[33px] top-[26px] h-2 w-2 bg-primary" />
                  <p className="font-display text-xl tracking-[0.12em] uppercase">{year}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-surface-light py-24 text-surface-light-foreground lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Why Bikers Studio</SectionLabel>
            <h2 className="display-title max-w-2xl text-4xl lg:text-6xl">
              Built on experience. Driven by trust.
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-px border-t border-surface-light-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([n, title, text], i) => (
              <Reveal key={n} delay={i * 90}>
                <div className="h-full border-b border-surface-light-foreground/15 py-10 pr-8 md:border-r">
                  <p className="font-display text-5xl text-primary">{n}</p>
                  <h3 className="mt-6 font-display text-xl tracking-[0.08em] uppercase">{title}</h3>
                  <p className="mt-3 text-sm text-surface-light-foreground/70">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Services</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">Everything your ride needs.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SERVICES.map(([n, title, text, img], i) => (
              <Reveal key={n as string} delay={i * 80}>
                <article className="group relative h-[380px] overflow-hidden lg:h-[440px]">
                  <img
                    src={img as string}
                    alt={title as string}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="font-display text-sm tracking-[0.3em] text-primary">{n}</p>
                    <h3 className="mt-3 font-display text-2xl tracking-[0.06em] uppercase lg:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWROOM */}
      <section className="relative overflow-hidden border-y border-border">
        <img
          src={showroomImg}
          alt="Bikers Studio showroom and workshop facility"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--primary) 18%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--primary) 12%, transparent) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10 lg:py-40">
          <Reveal>
            <SectionLabel>Dondaparthy, Visakhapatnam</SectionLabel>
            <h2 className="display-title max-w-3xl text-4xl lg:text-7xl">
              The next generation of two-wheeler care.
            </h2>
            <p className="mt-6 font-display text-lg tracking-[0.12em] text-muted-foreground uppercase">
              Integrated Showroom & Multi-Brand Service Workshop
            </p>
            <a
              href="#contact"
              className="mt-10 inline-block border border-primary px-8 py-4 font-display text-sm font-700 tracking-[0.18em] text-primary uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore the New Facility →
            </a>
          </Reveal>
        </div>
      </section>

      {/* FRANCHISE */}
      <section id="franchise" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Franchise Model</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">
              Own the opportunity.
              <br />
              We run the business.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <div className="border border-border bg-card p-10">
                <p className="display-title text-7xl text-primary lg:text-8xl">FOCO</p>
                <p className="mt-4 font-display text-sm tracking-[0.28em] uppercase">
                  Franchise Owned · Company Operated
                </p>
                <div className="mt-10 space-y-0">
                  {FLOW.map((step, i) => (
                    <div key={step} className="flex items-center gap-4 border-t border-border py-4">
                      <span className="font-display text-xs text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-lg tracking-[0.1em] uppercase">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="font-display text-sm tracking-[0.28em] text-muted-foreground uppercase">
                Company-managed responsibilities
              </p>
              <div className="mt-6 grid gap-px sm:grid-cols-2">
                {MANAGED.map((m) => (
                  <div key={m} className="border-b border-border py-4 text-sm">
                    <span className="mr-3 text-primary">—</span>
                    {m}
                  </div>
                ))}
              </div>
              <div className="mt-12 border border-primary/40 bg-primary/10 p-10">
                <p className="display-title text-5xl text-primary lg:text-6xl">70%</p>
                <p className="mt-3 font-display text-lg tracking-[0.16em] uppercase">
                  Franchise partner share
                </p>
                <p className="mt-2 text-sm text-muted-foreground">Automated monthly payouts.</p>
                <a
                  href="#investment"
                  className="mt-8 inline-block bg-primary px-8 py-4 font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
                >
                  View Franchise Opportunity →
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section id="investment" className="bg-surface-light py-24 text-surface-light-foreground lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionLabel>Investment Plans</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">
              Choose your
              <br />
              franchise format.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {TIERS.map((t, i) => (
              <Reveal key={t.tier} delay={i * 90}>
                <div
                  className={`h-full p-10 ${
                    t.featured
                      ? "bg-background text-foreground shadow-[0_30px_80px_-40px_rgba(0,0,0,0.6)]"
                      : "border border-surface-light-foreground/15"
                  }`}
                >
                  <p className="font-display text-xs tracking-[0.3em] text-primary uppercase">{t.tier}</p>
                  <p className="display-title mt-4 text-5xl">{t.price}</p>
                  <div className="mt-8">
                    {t.rows.map(([k, v]) => (
                      <div
                        key={k}
                        className={`flex items-baseline justify-between gap-6 border-t py-4 text-sm ${
                          t.featured ? "border-border" : "border-surface-light-foreground/15"
                        }`}
                      >
                        <span className={t.featured ? "text-muted-foreground" : "text-surface-light-foreground/60"}>
                          {k}
                        </span>
                        <span className="font-display text-base tracking-[0.06em] uppercase">{v}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="mt-8 block bg-primary py-4 text-center font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:opacity-90"
                  >
                    Enquire Now →
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-xs text-surface-light-foreground/60">
            Financial figures shown are projections provided in the Bikers Studio franchise proposal.
            Actual results may vary.
          </p>
        </div>
      </section>

      {/* TERRITORIES */}
      <section id="territories" className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal>
            <SectionLabel>North Andhra Expansion</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">
              North Andhra.
              <br />
              Our next frontier.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Phase-1 regional expansion across North Andhra Pradesh.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
              {TERRITORY_STATS.map(([n, label]) => (
                <div key={label} className="bg-card px-6 py-7">
                  <p className="display-title text-4xl text-primary">{n}</p>
                  <p className="mt-2 font-display text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-12 space-y-12">
            {TERRITORIES.map((group, i) => (
              <Reveal key={group.tier} delay={i * 80}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-primary/40 pb-4">
                  <p className="font-display text-sm tracking-[0.24em] text-primary uppercase">
                    {group.tier} — {group.price}
                  </p>
                  <p className="font-display text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                    {group.size} · {group.rows.length} locations
                  </p>
                </div>

                {/* desktop table */}
                <table className="mt-6 hidden w-full border-collapse text-left md:table">
                  <thead>
                    <tr className="font-display text-[10px] tracking-[0.24em] text-muted-foreground uppercase">
                      <th className="w-12 border-b border-border pb-3 font-500">#</th>
                      <th className="border-b border-border pb-3 font-500">Location</th>
                      <th className="border-b border-border pb-3 font-500">Status</th>
                      <th className="border-b border-border pb-3 text-right font-500">Availability</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.rows.map((r, idx) => (
                      <tr key={r.name} className="text-sm">
                        <td className="border-b border-border py-4 text-muted-foreground">
                          {String(idx + 1).padStart(2, "0")}
                        </td>
                        <td className="border-b border-border py-4">{r.name}</td>
                        <td className="border-b border-border py-4 text-muted-foreground">{r.status}</td>
                        <td className="border-b border-border py-4 text-right">
                          <span
                            className={`inline-block border px-3 py-1 font-display text-[10px] tracking-[0.2em] uppercase ${
                              r.available
                                ? "border-primary/50 text-primary"
                                : "border-border bg-secondary text-muted-foreground"
                            }`}
                          >
                            {r.available ? "Available" : "Unavailable"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* mobile cards */}
                <div className="mt-6 grid gap-4 md:hidden">
                  {group.rows.map((r) => (
                    <div key={r.name} className="border border-border bg-card p-5">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-base">{r.name}</p>
                        <span
                          className={`shrink-0 border px-2.5 py-1 font-display text-[10px] tracking-[0.2em] uppercase ${
                            r.available
                              ? "border-primary/50 text-primary"
                              : "border-border bg-secondary text-muted-foreground"
                          }`}
                        >
                          {r.available ? "Available" : "Unavailable"}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{r.status}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-10 text-sm text-muted-foreground">
              Territories are allocated on a first-come, first-served basis.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-block bg-primary px-8 py-4 font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              Check Territory Availability →
            </a>
          </Reveal>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="border-y border-border py-20">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
          {[
            [<Counter key="a" value={30} suffix="+" />, "Years of industry experience"],
            [<Counter key="b" value={28} />, "Strategic manufacturer partnerships"],
            [<Counter key="c" value={2017} />, "Visakhapatnam retail journey"],
            [<Counter key="d" value={70} suffix="%" />, "Franchise partner share"],
          ].map(([num, label], i) => (
            <div key={i}>
              <p className="display-title text-6xl text-primary lg:text-7xl">{num}</p>
              <p className="mt-4 font-display text-xs tracking-[0.24em] text-muted-foreground uppercase">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMER CARE */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-2 lg:px-10">
          <Reveal>
            <SectionLabel>Customer Care</SectionLabel>
            <h2 className="display-title text-4xl lg:text-6xl">
              Care that goes
              <br />
              beyond the service bay.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="border-l border-primary pl-8">
              <p className="font-display text-2xl tracking-[0.06em] uppercase">
                100% replacement warranty
              </p>
              <p className="mt-2 text-muted-foreground">
                On spare parts installed during repairs.
              </p>
            </div>
            <div className="mt-10 grid gap-px sm:grid-cols-2">
              {[
                "Annual maintenance service cards",
                "Customer engagement",
                "Monthly surprise gift coupons",
                "Gig-worker loyalty initiatives",
              ].map((c) => (
                <div key={c} className="border-b border-border py-4 text-sm">
                  <span className="mr-3 text-primary">—</span>
                  {c}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="border-t border-border py-28 lg:py-40">
        <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-10">
          <Reveal>
            <h2 className="display-title mx-auto max-w-4xl text-4xl lg:text-7xl">
              Ready to build the next Bikers Studio?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
              Join us in expanding premium two-wheeler service infrastructure across North Andhra.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="bg-primary px-10 py-5 font-display text-sm font-700 tracking-[0.18em] text-primary-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                Become a Franchise Partner →
              </a>
              <a
                href="#contact"
                className="border border-border px-10 py-5 font-display text-sm font-700 tracking-[0.18em] uppercase transition-colors hover:border-primary hover:text-primary"
              >
                Talk to our expansion team
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-16">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-5 lg:px-10">
          <div className="lg:col-span-1">
            <img src={logo.url} alt="Bikers Studio" className="h-16 w-auto" />
          </div>
          {[
            ["Company", ["About", "Services", "Our Story", "Contact"]],
            ["Franchise", ["FOCO Model", "Investment Plans", "Territories", "Apply Now"]],
            ["Services", ["Multi-Brand Service", "Spare Parts", "Accessories", "AMC"]],
            ["Contact", ["Visakhapatnam", "Dondaparthy", "North Andhra Expansion"]],
          ].map(([title, links]) => (
            <div key={title as string}>
              <p className="font-display text-xs tracking-[0.28em] text-primary uppercase">{title}</p>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {(links as string[]).map((l) => (
                  <li key={l}>
                    <a href="#home" className="transition-colors hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 flex max-w-[1400px] flex-col gap-4 border-t border-border px-6 pt-8 text-xs text-muted-foreground sm:flex-row sm:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Bikers Studio</p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#home" className="hover:text-foreground">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
