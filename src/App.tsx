import { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════
   BOOTSTRAP — fonts + global CSS
════════════════════════════════════════════════ */
const Bootstrap = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Fredoka+One&family=Nunito:wght@400;600;700;900&family=Space+Mono:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      :root {
        --cyan:   #29abe2;
        --pink:   #ff4d8d;
        --dark:   #0e0e1c;
        --darker: #07070f;
        --light:  #e6f4ff;
        --card:   rgba(255,255,255,0.04);
        --border: rgba(41,171,226,0.18);
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        background: var(--dark);
        color: var(--light);
        font-family: 'Nunito', sans-serif;
        overflow-x: hidden;
        cursor: none;
      }

      /* ── custom cursor ── */
      #cursor {
        width: 12px; height: 12px;
        background: var(--cyan);
        border-radius: 50%;
        position: fixed; top: 0; left: 0;
        pointer-events: none; z-index: 99999;
        transform: translate(-50%,-50%);
        transition: transform .08s, width .2s, height .2s, background .2s;
        mix-blend-mode: screen;
      }
      #cursor.big {
        width: 40px; height: 40px;
        background: var(--pink);
      }

      /* ── scrollbar ── */
      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: var(--darker); }
      ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 99px; }

      /* ── scroll progress ── */
      #scroll-prog {
        position: fixed; top: 0; left: 0; height: 3px;
        background: linear-gradient(90deg, var(--cyan), var(--pink));
        z-index: 9999; transition: width .04s linear;
        border-radius: 0 3px 3px 0;
      }

      /* ── fonts ── */
      .bebas   { font-family: 'Bebas Neue', sans-serif; }
      .fredoka { font-family: 'Fredoka One', cursive; }
      .mono    { font-family: 'Space Mono', monospace; }
      .nunito  { font-family: 'Nunito', sans-serif; }

      /* ── noise overlay ── */
      body::after {
        content:''; position:fixed; inset:0;
        pointer-events:none; z-index:9997; opacity:.025;
        background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      }

      /* ── grid pattern ── */
      .grid-bg {
        background-image:
          linear-gradient(rgba(41,171,226,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,171,226,0.04) 1px, transparent 1px);
        background-size: 48px 48px;
      }

      /* ── scan lines ── */
      .scanlines::before {
        content:''; position:absolute; inset:0;
        background: repeating-linear-gradient(
          0deg,
          transparent, transparent 2px,
          rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px
        );
        pointer-events:none; z-index:2;
      }

      /* ── animations ── */
      @keyframes floaty {
        0%,100%{ transform:translateY(0) rotate(-2deg); }
        50%    { transform:translateY(-18px) rotate(2deg); }
      }
      @keyframes floaty2 {
        0%,100%{ transform:translateY(0) rotate(1deg); }
        50%    { transform:translateY(-12px) rotate(-1deg); }
      }
      @keyframes blobSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
      @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      @keyframes marquee2 { from{transform:translateX(-50%)} to{transform:translateX(0)} }
      @keyframes pulseGlow {
        0%,100%{ box-shadow:0 0 20px rgba(41,171,226,0.3),0 0 0 0 rgba(41,171,226,0); }
        50%    { box-shadow:0 0 40px rgba(41,171,226,0.6),0 0 0 10px rgba(41,171,226,0.05); }
      }
      @keyframes glowPink {
        0%,100%{ text-shadow:0 0 20px rgba(255,77,141,0.4); }
        50%    { text-shadow:0 0 50px rgba(255,77,141,0.9),0 0 100px rgba(255,77,141,0.3); }
      }
      @keyframes slideUp {
        from{ opacity:0; transform:translateY(40px); }
        to  { opacity:1; transform:translateY(0); }
      }
      @keyframes countUp {
        from{ opacity:0; transform:scale(.5); }
        to  { opacity:1; transform:scale(1); }
      }
      @keyframes spin360 { from{transform:rotate(0)} to{transform:rotate(360deg)} }
      @keyframes shimmer {
        0%  { background-position: -200% center; }
        100%{ background-position:  200% center; }
      }
      @keyframes borderFlow {
        0%  { border-color: var(--cyan); }
        50% { border-color: var(--pink); }
        100%{ border-color: var(--cyan); }
      }

      .floaty  { animation: floaty  4s ease-in-out infinite; }
      .floaty2 { animation: floaty2 5.5s ease-in-out infinite; }
      .cursor-blink { animation: blink 1s step-end infinite; }

      /* ── fade in on scroll ── */
      .fade-in { opacity:0; transform:translateY(32px); transition:opacity .7s ease, transform .7s ease; }
      .fade-in.visible { opacity:1; transform:translateY(0); }

      /* ── card hover ── */
      .hover-card {
        transition: transform .3s cubic-bezier(.34,1.56,.64,1),
                    box-shadow .3s ease, border-color .3s ease;
      }
      .hover-card:hover {
        transform: translateY(-12px) scale(1.02);
      }

      /* ── btn ── */
      .btn {
        display:inline-flex; align-items:center; gap:8px;
        font-family:'Fredoka One',cursive; letter-spacing:.5px;
        border-radius:999px; text-decoration:none; cursor:none;
        transition: transform .2s cubic-bezier(.34,1.56,.64,1),
                    box-shadow .2s ease, background .2s, color .2s;
        border:none; outline:none;
      }
      .btn:hover  { transform:translateY(-4px) scale(1.05); }
      .btn:active { transform:translateY(0) scale(.97); }

      .btn-primary {
        background: var(--cyan); color: var(--dark);
        padding: 14px 36px; font-size: 17px;
        box-shadow: 0 6px 24px rgba(41,171,226,0.35);
      }
      .btn-primary:hover { box-shadow:0 12px 32px rgba(41,171,226,0.55); background:#3dc3ff; }

      .btn-outline {
        background: transparent; color: var(--cyan);
        border: 2px solid var(--cyan);
        padding: 12px 32px; font-size: 17px;
      }
      .btn-outline:hover { background:rgba(41,171,226,0.12); box-shadow:0 8px 24px rgba(41,171,226,0.2); }

      .btn-ghost {
        background: transparent; color: var(--light);
        border: 2px solid rgba(255,255,255,0.15);
        padding: 12px 28px; font-size: 15px;
      }
      .btn-ghost:hover { border-color:var(--cyan); color:var(--cyan); }

      /* ── pill tag ── */
      .tag {
        display:inline-flex; align-items:center;
        border-radius:999px; font-size:11px; font-weight:700;
        letter-spacing:1.5px; padding:4px 14px;
        font-family:'Space Mono',monospace;
      }

      /* ── member photo ── */
      .member-photo {
        width:100%; height:100%;
        object-fit:cover; object-position:center top;
        display:block;
        transition: transform .5s ease, filter .3s ease;
      }
      .member-photo-wrap:hover .member-photo {
        transform: scale(1.08);
        filter: saturate(1.2) brightness(1.05);
      }

      /* ── social btn ── */
      .social-btn {
        display:inline-flex; align-items:center; gap:9px;
        border-radius:999px; padding:11px 22px;
        font-family:'Fredoka One',cursive; font-size:14px;
        text-decoration:none; cursor:none;
        border: 2px solid rgba(41,171,226,0.25);
        background: rgba(41,171,226,0.08);
        color: var(--cyan);
        transition: all .2s cubic-bezier(.34,1.56,.64,1);
      }
      .social-btn:hover {
        background: var(--cyan); color: var(--dark);
        border-color: var(--cyan);
        transform: translateY(-5px) scale(1.06);
        box-shadow: 0 12px 28px rgba(41,171,226,0.4);
      }

      /* ── shimmer text ── */
      .shimmer-text {
        background: linear-gradient(90deg,
          var(--cyan) 0%, white 40%, var(--pink) 60%, var(--cyan) 100%);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: shimmer 3s linear infinite;
      }

      /* ── glitch ── */
      @keyframes glitch1 {
        0%,100%{ clip-path:inset(0 0 96% 0); transform:translateX(-3px); }
        20%    { clip-path:inset(30% 0 50% 0); transform:translateX(3px); }
        40%    { clip-path:inset(60% 0 20% 0); transform:translateX(-2px); }
        60%    { clip-path:inset(80% 0 5%  0); transform:translateX(2px); }
        80%    { clip-path:inset(10% 0 80% 0); transform:translateX(-3px); }
      }
      @keyframes glitch2 {
        0%,100%{ clip-path:inset(50% 0 30% 0); transform:translateX(3px); }
        20%    { clip-path:inset(10% 0 80% 0); transform:translateX(-3px); }
        40%    { clip-path:inset(80% 0 5%  0); transform:translateX(2px); }
        60%    { clip-path:inset(20% 0 60% 0); transform:translateX(-2px); }
        80%    { clip-path:inset(60% 0 20% 0); transform:translateX(3px); }
      }
      .glitch-wrap { position:relative; display:inline-block; }
      .glitch-wrap::before,
      .glitch-wrap::after {
        content: attr(data-text);
        position:absolute; top:0; left:0;
        width:100%; height:100%;
        font-family:inherit; font-size:inherit; font-weight:inherit;
        line-height:inherit; letter-spacing:inherit;
      }
      .glitch-wrap::before {
        color: var(--pink);
        animation: glitch1 4s steps(1) infinite;
        animation-delay: 1.5s;
      }
      .glitch-wrap::after {
        color: var(--cyan);
        animation: glitch2 4s steps(1) infinite;
        animation-delay: 1.5s;
      }

      /* ── rounded everything ── */
      .rounded-section-inner {
        border-radius: 32px;
        overflow: hidden;
      }

      /* stats cards */
      .stat-card {
        border-radius: 24px;
        border: 1px solid rgba(255,255,255,0.06);
        background: rgba(255,255,255,0.02);
        transition: border-color .3s, box-shadow .3s;
      }
      .stat-card:hover {
        border-color: rgba(41,171,226,0.3);
        box-shadow: 0 8px 32px rgba(41,171,226,0.1);
      }

      /* marquee pill */
      .marquee-pill {
        border-radius: 20px;
        overflow: hidden;
        margin: 0 20px;
      }

      /* responsive ── */
      @media(max-width:900px){
        .hide-md{ display:none !important; }
        .hero-flex{ flex-direction:column !important; padding:110px 24px 60px !important; }
        .members-grid{ grid-template-columns:1fr 1fr !important; }
        .projects-grid{ grid-template-columns:1fr 1fr !important; }
        .stats-grid{ grid-template-columns:1fr 1fr !important; }
        .section-pad{ padding:60px 24px !important; }
        .nav-pad{ padding:0 24px !important; }
      }
      @media(max-width:540px){
        .members-grid{ grid-template-columns:1fr !important; }
        .projects-grid{ grid-template-columns:1fr !important; }
        .stats-grid{ grid-template-columns:1fr 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); document.head.removeChild(link); };
  }, []);
  return null;
};

/* ════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════ */
const Cursor = () => {
  useEffect(() => {
    const el = document.getElementById("cursor");
    if (!el) return;
    const move = e => { el.style.left = e.clientX + "px"; el.style.top = e.clientY + "px"; };
    const over = () => el.classList.add("big");
    const out  = () => el.classList.remove("big");
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button,.hover-card,.btn").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div id="cursor" />;
};

/* ════════════════════════════════════════════════
   SCROLL PROGRESS
════════════════════════════════════════════════ */
const ScrollProgress = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setW(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div id="scroll-prog" style={{ width: `${w}%` }} />;
};

/* ════════════════════════════════════════════════
   useFadeIn hook
════════════════════════════════════════════════ */
function useFadeIn(delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.disconnect();
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

/* ════════════════════════════════════════════════
   LOGO CIRCLE 
════════════════════════════════════════════════ */
const LogoCircle = ({ size = 42 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: "2.5px solid rgba(41,171,226,0.6)",
    overflow: "hidden", flexShrink: 0,
    boxShadow: "0 0 18px rgba(41,171,226,0.4)",
  }}>
    <img
      src="/images/logo2.jpg"
      alt="The Bagaço"
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  </div>
);

/* ════════════════════════════════════════════════
   SOCIAL ICONS
════════════════════════════════════════════════ */
const IcInstagram = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const IcX = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IcYT = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IcTwitch = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
  </svg>
);
const IcDiscord = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.079.11 18.1.128 18.113a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 13.86 13.86 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

/* ════════════════════════════════════════════════
   BLOB background element
════════════════════════════════════════════════ */
const Blob = ({ color, size, style: s }) => (
  <div style={{
    width: size, height: size, position: "absolute",
    borderRadius: "60% 40% 55% 45% / 45% 55% 40% 60%",
    background: color, opacity: .14, pointerEvents: "none",
    animation: "blobSpin 20s linear infinite", ...s,
  }} />
);

/* ════════════════════════════════════════════════
   TYPING EFFECT
════════════════════════════════════════════════ */
const Typer = ({ phrases }) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[i];
    const t = setTimeout(() => {
      if (!del && text.length < full.length) setText(full.slice(0, text.length + 1));
      else if (!del && text.length === full.length) setDel(true);
      else if (del && text.length > 0) setText(text.slice(0, -1));
      else { setDel(false); setI((i + 1) % phrases.length); }
    }, del ? 40 : text.length === full.length ? 2000 : 75);
    return () => clearTimeout(t);
  }, [text, del, i, phrases]);
  return (
    <span style={{ color: "var(--cyan)" }}>
      {text}<span className="cursor-blink" style={{ color: "var(--pink)" }}>█</span>
    </span>
  );
};

/* ════════════════════════════════════════════════
   NAV
════════════════════════════════════════════════ */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className="nav-pad" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      height: 64,
      background: scrolled ? "rgba(14,14,28,0.97)" : "rgba(14,14,28,0.7)",
      backdropFilter: "blur(16px)",
      borderBottom: scrolled ? "1px solid rgba(41,171,226,0.3)" : "1px solid transparent",
      borderRadius: "0 0 32px 32px",
      padding: "0 48px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all .4s ease",
      boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
    }}>
      {/* logo */}
      <a href="#hero" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <LogoCircle size={46} />
        <span className="bebas" style={{ fontSize:22, color:"var(--cyan)", letterSpacing:3 }}>Chungas e Bungas</span>
      </a>

      {/* links */}
      <div className="hide-md" style={{ display:"flex", gap:32, alignItems:"center" }}>
        {[["#membros","GALERA"],["#projetos","PROJETOS"],["#stats","STATS"],["#contato","CONTATO"]].map(([href,label]) => (
          <a key={label} href={href} className="mono"
            style={{ fontSize:11, color:"rgba(230,244,255,0.7)", textDecoration:"none",
              letterSpacing:2, transition:"color .15s" }}
            onMouseEnter={e=>e.target.style.color="var(--cyan)"}
            onMouseLeave={e=>e.target.style.color="rgba(230,244,255,0.7)"}
          >{label}</a>
        ))}
      </div>

      {/* cta */}
      <a href="mailto:chungasbungascontato@gmail.com" className="btn btn-primary hide-md" style={{ fontSize:13, padding:"9px 22px" }}>
        FALA COM A GENTE
      </a>
    </nav>
  );
};

/* ════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════ */
const Hero = () => {
  const ref = useFadeIn(300);
  return (
    <section id="hero" className="grid-bg" style={{
      minHeight:"100vh", paddingTop:64, position:"relative",
      overflow:"hidden", display:"flex", alignItems:"center",
      borderRadius:"0 0 40px 40px",
      background: "radial-gradient(ellipse at 70% 50%, rgba(41,171,226,0.07) 0%, transparent 60%), var(--dark)",
    }}>
      <Blob color="var(--cyan)" size={700} style={{ top:-200, right:-200 }}/>
      <Blob color="var(--pink)" size={450} style={{ bottom:-100, left:-120 }}/>

      {/* corner accents */}
      <div style={{ position:"absolute", top:80, left:48, opacity:.4 }}>
        {[0,1,2].map(i=><div key={i} style={{
          width:40, height:2, background:"var(--cyan)", marginBottom:6,
          transform:`scaleX(${1-i*0.25})`, transformOrigin:"left",
        }}/>)}
      </div>
      <div style={{ position:"absolute", bottom:80, right:48, opacity:.4 }}>
        {[0,1,2].map(i=><div key={i} style={{
          width:40, height:2, background:"var(--pink)", marginBottom:6,
          transform:`scaleX(${1-i*0.25})`, transformOrigin:"right",
        }}/>)}
      </div>

      <div className="hero-flex" style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 80px", width:"100%", gap:60, zIndex:1, position:"relative",
      }}>

        {/* ── logo.jpg circular ── */}
        <div className="floaty" style={{ flexShrink:0 }}>
          <div style={{
            width:"min(300px,38vw)", height:"min(300px,38vw)",
            borderRadius:"50%",
            overflow:"hidden",
            border:"5px solid rgba(41,171,226,0.3)",
            animation:"pulseGlow 3s ease-in-out infinite",
            boxShadow:"0 0 40px rgba(41,171,226,0.3)",
          }}>
            <img
              src="/images/logo.jpg"
              alt="The Bagaço"
              style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}
            />
          </div>
        </div>

        {/* ── text ── */}
        <div ref={ref} className="fade-in" style={{ flex:1, minWidth:280 }}>
          <div className="tag mono" style={{
            background:"rgba(41,171,226,0.1)", border:"1.5px solid rgba(41,171,226,0.4)",
            color:"var(--cyan)", marginBottom:20, fontSize:10, letterSpacing:3,
          }}>▶  HUMOR • MÚSICA • JOGOS</div>

          <h1 className="bebas glitch-wrap" data-text="Chungas e Bungas" style={{
            fontSize:"clamp(70px,12vw,140px)", lineHeight:.9,
            color:"var(--light)", letterSpacing:4,
            display:"block",
          }}>
            Chungas e Bungas
          </h1>

          <p style={{
            fontFamily:"'Space Mono',monospace",
            fontSize:"clamp(13px,1.4vw,16px)", color:"rgba(230,244,255,0.65)",
            marginTop:18, lineHeight:1.6,
          }}>
            seu grupo favorito de{" "}
            <Typer phrases={["nerds 💻","beatmakers 🥁","gamers e geek 🕹️","não sei oque colocar kk","Chungas😎"]} />
          </p>

          <div style={{ display:"flex", gap:14, marginTop:36, flexWrap:"wrap" }}>
            <a href="#membros" className="btn btn-primary">CONHEÇA A GALERA</a>
            <a href="#projetos" className="btn btn-outline">VER PROJETOS →</a>
          </div>

       {/* stat pills 
<div style={{ display:"flex", gap:16, marginTop:40, flexWrap:"wrap" }}>
  {[["4","MEMBROS"],["???","Jogos"],["???","Musicas"],["???","Projetos"]].map(([v,l])=>(
    <div key={l} style={{
      textAlign:"center", padding:"12px 20px",
      background:"rgba(41,171,226,0.06)",
      border:"1px solid rgba(41,171,226,0.18)",
      borderRadius:20,
    }}>
      <div className="bebas" style={{ fontSize:32, color:"var(--cyan)", lineHeight:1 }}>{v}</div>
      <div className="mono" style={{ fontSize:9, color:"rgba(230,244,255,0.4)", letterSpacing:2 }}>{l}</div>
    </div>
  ))}
</div>
*/}
        </div>
      </div>

      {/* scroll hint */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", opacity:.5 }}>
        <div className="mono" style={{ fontSize:10, color:"var(--cyan)", letterSpacing:3, textAlign:"center", marginBottom:8 }}></div>
        <div style={{ width:1, height:40, background:"linear-gradient(var(--cyan),transparent)", margin:"0 auto", animation:"floaty2 2s ease-in-out infinite" }}/>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   MARQUEE
════════════════════════════════════════════════ */
const Marquee = () => {
  const words = ["O BAGAÇO","DEVS","BEATMAKERS","ARTISTAS","CLT SOFREU","CÓDIGO","HUMOR","ARTE","MÚSICA","CAOS"];
  const doubled = [...words,...words];
  return (
    <div style={{
      background:"var(--darker)", overflow:"hidden",
      borderTop:"1px solid rgba(41,171,226,0.25)",
      borderBottom:"1px solid rgba(41,171,226,0.25)",
      borderRadius:0,
      padding:"4px 0",
    }}>
      {/* fwd */}
      <div style={{ padding:"10px 0", borderBottom:"1px solid rgba(255,255,255,0.03)" }}>
        <div style={{ display:"flex", width:"max-content", animation:"marquee 25s linear infinite" }}>
          {doubled.map((w,i)=>(
            <span key={i} className="bebas" style={{
              fontSize:14, color: i%2===0 ? "var(--cyan)" : "rgba(230,244,255,0.2)",
              marginRight:36, letterSpacing:3,
            }}>{w}</span>
          ))}
        </div>
      </div>
      {/* rev */}
      <div style={{ padding:"10px 0" }}>
        <div style={{ display:"flex", width:"max-content", animation:"marquee2 30s linear infinite" }}>
          {doubled.reverse().map((w,i)=>(
            <span key={i} className="bebas" style={{
              fontSize:14, color: i%2===0 ? "var(--pink)" : "rgba(230,244,255,0.15)",
              marginRight:36, letterSpacing:3,
            }}>{w}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   MEMBERS
════════════════════════════════════════════════ */
const MEMBERS = [
  {
    id:"rafa", name:"RAFA", full:"Rafael",
    photo:"/images/rafa.jpg",
    tag:"Game Dev", tagColor:"#ff4d8d",
    desc:"Desenvolvedor do Bagaço Simulator e doido das ideia",
    skills:["Game Dev","Programador","Editor","Desenhista","Paiaço👅"],
    socials:["ig","tw"],
    accent:"#ff4d8d",
    num:"01",
  },
  {
    id:"zoidberg", name:"ZOIDBERG", full:"Zoidberg",
    photo:"/images/zoidberg.jpg",
    tag:"CLT", tagColor:"#0bbbf1",
    desc:"De dia sofre no CLT, de noite produz beats que ninguém pediu",
    skills:["Beatmaker","Mixer","Produção","Mixer","Farmador de aura"],
    socials:["ig","yt"],
    accent:"#0bbbf1",
    num:"02",
  },
  {
    id:"devys", name:"DEVYS", full:"Devys",
    photo:"/images/devys.jpg",
    tag:"Nerd", tagColor:"#a855f7",
    desc:"mlk só joga dark souls meu deus",
    skills:["Fullstack","Editor","Beatmaker","Mixer"],
    socials:["ig","tw","yt"],
    accent:"#a855f7",
    num:"03",
  },
  {
    id:"zakari", name:"ZAKARI", full:"Zakari",
    photo:"/images/zakari.jpg",
    tag:"Vagabundo", tagColor:"#f59e0b",
    desc:"esse ai é arretado, fica longe desse bobão",
    skills:["Desenhista","Atleta","Vagabundo"],
    socials:["ig","tw"],
    accent:"#f59e0b",
    num:"04",
  },
];

const MemberCard = ({ m, delay }) => {
  const ref = useFadeIn(delay);
  const [hov, setHov] = useState(false);

  return (
    <div ref={ref} className="fade-in hover-card"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:28, overflow:"hidden",
        background: hov
          ? `linear-gradient(160deg, ${m.accent}18, ${m.accent}0c, rgba(14,14,28,0.98))`
          : "rgba(255,255,255,0.03)",
        border:`1.5px solid ${hov ? m.accent+"88" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hov ? `0 24px 60px ${m.accent}28, 0 0 0 1px ${m.accent}22` : "0 4px 24px rgba(0,0,0,0.3)",
        transition:"all .35s ease",
        position:"relative",
      }}
    >
      {/* number watermark */}
      <div className="bebas" style={{
        position:"absolute", top:12, right:16, fontSize:72,
        color: hov ? m.accent : "rgba(255,255,255,0.04)",
        lineHeight:1, pointerEvents:"none", transition:"color .35s",
        zIndex:0,
      }}>{m.num}</div>

      {/* photo */}
      <div className="member-photo-wrap" style={{
        width:"100%", aspectRatio:"1", overflow:"hidden",
        borderBottom:`2px solid ${hov ? m.accent : "rgba(255,255,255,0.05)"}`,
        borderRadius:"20px 20px 0 0",
        position:"relative", transition:"border-color .35s", zIndex:1,
      }}>
        <img
          src={m.photo}
          alt={m.full}
          className="member-photo"
          style={{ filter: hov ? "none" : "grayscale(30%)" }}
          onError={e=>{
            e.target.style.display="none";
            e.target.nextSibling.style.display="flex";
          }}
        />
        {/* fallback emoji */}
        <div style={{
          display:"none", width:"100%", height:"100%",
          background:`linear-gradient(135deg, ${m.accent}33, ${m.accent}11)`,
          alignItems:"center", justifyContent:"center",
          fontSize:72,
        }}>
          {["👾","🦞","🤓","🎭"][MEMBERS.findIndex(x=>x.id===m.id)]}
        </div>

        {/* hover overlay */}
        <div style={{
          position:"absolute", inset:0,
          background:`linear-gradient(to top, ${m.accent}99 0%, transparent 60%)`,
          opacity: hov ? 1 : 0, transition:"opacity .35s",
        }}/>
      </div>

      {/* content */}
      <div style={{ padding:"20px 22px 24px", position:"relative", zIndex:1 }}>
        <div className="tag" style={{
          background:`${m.accent}1a`, color:m.accent,
          border:`1px solid ${m.accent}44`, fontSize:9, letterSpacing:2, marginBottom:10,
        }}>{m.tag}</div>

        <div className="bebas" style={{ fontSize:28, color:"var(--light)", letterSpacing:2, marginBottom:8 }}>{m.name}</div>
        <p className="nunito" style={{ fontSize:12.5, color:"rgba(230,244,255,0.55)", lineHeight:1.65, marginBottom:16 }}>{m.desc}</p>

        {/* skills */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {m.skills.map(s=>(
            <span key={s} className="mono" style={{
              fontSize:9, color: hov ? m.accent : "rgba(230,244,255,0.4)",
              border:`1px solid ${hov ? m.accent+"44" : "rgba(255,255,255,0.08)"}`,
              padding:"3px 10px", borderRadius:999,
              transition:"all .3s",
            }}>{s}</span>
          ))}
        </div>
      </div>

      {/* bottom bar */}
      <div style={{
        height:4,
        background:`linear-gradient(90deg, ${m.accent}, ${m.accent}44)`,
        borderRadius:"0 0 28px 28px",
        transform: hov ? "scaleX(1)" : "scaleX(0.3)",
        transformOrigin:"left",
        transition:"transform .4s ease",
      }}/>
    </div>
  );
};

const Members = () => {
  const hRef = useFadeIn(0);
  return (
    <section id="membros" className="section-pad" style={{
      background:`radial-gradient(ellipse at 20% 50%, rgba(41,171,226,0.05) 0%, transparent 60%), var(--darker)`,
      padding:"100px 80px", position:"relative", overflow:"hidden",
    }}>
      <Blob color="var(--cyan)" size={600} style={{ top:-200, right:-200, opacity:.06 }}/>
      <Blob color="var(--pink)" size={400} style={{ bottom:-150, left:-150, opacity:.06 }}/>

      {/* heading */}
      <div ref={hRef} className="fade-in" style={{
        display:"flex", alignItems:"flex-end", justifyContent:"space-between",
        marginBottom:64, flexWrap:"wrap", gap:24, position:"relative", zIndex:1,
      }}>
        <div>
          <div className="tag mono" style={{
            background:"rgba(41,171,226,0.08)", border:"1px solid rgba(41,171,226,0.3)",
            color:"var(--cyan)", marginBottom:14, fontSize:9, letterSpacing:3,
          }}>OS INTEGRANTES</div>
          <h2 className="bebas" style={{
            fontSize:"clamp(52px,7vw,96px)", color:"var(--light)",
            lineHeight:.9, letterSpacing:3,
          }}>
            A GALERA<br/>
            <span className="shimmer-text">DO BAGAÇO</span>
          </h2>
        </div>
        <p className="nunito" style={{
          color:"rgba(230,244,255,0.45)", fontSize:15, maxWidth:300,
          lineHeight:1.7, textAlign:"right",
        }}>
          4 amigos que criam conteúdo juntos<br/>e provavelmente não deveriam.
        </p>
      </div>

      <div className="members-grid" style={{
        display:"grid", gridTemplateColumns:"repeat(4,1fr)",
        gap:20, position:"relative", zIndex:1,
      }}>
        {MEMBERS.map((m,i)=><MemberCard key={m.id} m={m} delay={i*80}/>)}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   STATS — animated counters
════════════════════════════════════════════════ */
const STATS = [
  { val:"4",    suffix:"",  label:"INTEGRANTES",    icon:"👥", color:"var(--cyan)" },
  { val:"???",   suffix:"",  label:"MÚSICAS",  icon:"🎶", color:"var(--pink)" },
  { val:"???",  suffix:"",  label:"JOGOS",icon:"🕹️", color:"#a855f7" },
  { val:"???",  suffix:"",  label:"PROJETOS",       icon:"💻", color:"#f59e0b" },
];

const Stats = () => {
  const ref = useFadeIn(0);
  return (
    <section id="stats" ref={ref} className="fade-in" style={{
      background:"var(--dark)", padding:"60px 80px",
    }}>
      <div className="stats-grid" style={{
        display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16,
      }}>
        {STATS.map((s,i)=>(
          <div key={s.label} className="stat-card" style={{
            padding:"44px 24px", textAlign:"center",
            position:"relative", overflow:"hidden",
          }}>
            <div style={{ fontSize:36, marginBottom:12 }}>{s.icon}</div>
            <div className="bebas" style={{ fontSize:56, color:s.color, lineHeight:1 }}>{s.val}</div>
            <div className="mono" style={{ fontSize:9, color:"rgba(230,244,255,0.35)", letterSpacing:2.5, marginTop:6 }}>{s.label}</div>
            {/* glow dot */}
            <div style={{
              position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
              width:60, height:3, background:s.color, opacity:.4, borderRadius:"3px 3px 0 0",
            }}/>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════════ */
const PROJECTS = [
  {
    name:"Bagaço Simulator",
    desc:"A Maior Franquia de Jogos que o Rafa criou.",
    tag:"GAMING", num:"01",
    bg:"linear-gradient(135deg, #ff4d8d, #9b1b5a)",
    accent:"#ff4d8d", icon:"🎮",
  },
  {
    name:"BAGAÇO BEATS",
    desc:"Produção musical por pessoas que estao aprendendo a fazer música. Surpreendentemente decente, ou pelo menos é o que a gente acha.",
    tag:"MÚSICA", num:"02",
    bg:"linear-gradient(135deg, #29abe2, #0a5578)",
    accent:"#29abe2", icon:"🥁",
  },
  {
    name:"BAGAÇO CODES",
    desc:"Alguns Codings nossos , se alguem quiser pagar os devs ai.",
    tag:"DEV", num:"03",
    bg:"linear-gradient(135deg, #a855f7, #4c1d95)",
    accent:"#a855f7", icon:"💻",
  },
  {
    name:"BAGAÇO ARTES",
    desc:"Artes, muitas obras primas criadas pelo grupo.",
    tag:"ARTE", num:"04",
    bg:"linear-gradient(135deg, #f59e0b, #7c4208)",
    accent:"#f59e0b", icon:"🎨",
  },
];

const ProjectCard = ({ p, delay }) => {
  const ref = useFadeIn(delay);
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref} className="fade-in hover-card"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:28, overflow:"hidden",
        border:`1.5px solid ${hov ? p.accent+"88" : "rgba(255,255,255,0.06)"}`,
        boxShadow: hov ? `0 20px 50px ${p.accent}28` : "0 4px 20px rgba(0,0,0,0.3)",
        transition:"all .3s ease",
        background:"rgba(255,255,255,0.02)",
      }}
    >
      {/* thumb */}
      <div className="scanlines" style={{
        background:p.bg, minHeight:160,
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"36px 20px", position:"relative",
        borderBottom:`2px solid ${p.accent}44`,
        borderRadius:"22px 22px 0 0",
      }}>
        <div style={{ fontSize:52, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.4))", position:"relative", zIndex:3 }}>{p.icon}</div>
        <div className="tag mono" style={{
          background:"rgba(0,0,0,0.3)", color:"white",
          border:"1px solid rgba(255,255,255,0.2)",
          fontSize:9, letterSpacing:2.5, marginTop:12, position:"relative", zIndex:3,
        }}>{p.tag}</div>
        {/* num watermark */}
        <div className="bebas" style={{
          position:"absolute", bottom:-10, right:16, fontSize:80,
          color:"rgba(0,0,0,0.25)", lineHeight:1, zIndex:2,
        }}>{p.num}</div>
      </div>

      {/* body */}
      <div style={{ padding:"22px 22px 26px" }}>
        <div className="bebas" style={{ fontSize:22, color:"var(--light)", letterSpacing:1.5, marginBottom:10 }}>{p.name}</div>
        <p className="nunito" style={{ fontSize:13, color:"rgba(230,244,255,0.5)", lineHeight:1.65, marginBottom:20 }}>{p.desc}</p>
        <a href="#" className="btn" style={{
          display:"flex", justifyContent:"center",
          background: hov ? p.accent : "transparent",
          color: hov ? (p.accent==="var(--cyan)" ? "var(--dark)" : "#fff") : p.accent,
          border:`1.5px solid ${p.accent}66`,
          padding:"10px 20px", fontSize:13, letterSpacing:.5,
          borderRadius:12, transition:"all .25s",
        }}>VER PROJETO →</a>
      </div>
    </div>
  );
};

const Projects = () => {
  const hRef = useFadeIn(0);
  return (
    <section id="projetos" className="grid-bg section-pad" style={{
      background:`radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.06) 0%, transparent 50%), var(--dark)`,
      padding:"100px 80px", position:"relative", overflow:"hidden",
    }}>
      <div ref={hRef} className="fade-in" style={{
        display:"flex", alignItems:"flex-end", justifyContent:"space-between",
        marginBottom:64, flexWrap:"wrap", gap:24, position:"relative", zIndex:1,
      }}>
        <div>
          <div className="tag mono" style={{
            background:"rgba(255,77,141,0.08)", border:"1px solid rgba(255,77,141,0.3)",
            color:"var(--pink)", marginBottom:14, fontSize:19, letterSpacing:3,
          }}>CONHEÇA OS</div>
          <h2 className="bebas" style={{
            fontSize:"clamp(52px,7vw,96px)", color:"var(--light)",
            lineHeight:.9, letterSpacing:3,
          }}>
            NOSSOS<br/>
            <span style={{ color:"var(--pink)", animation:"glowPink 3s ease-in-out infinite" }}>PROJETOS</span>
          </h2>
        </div>
        <div className="bebas" style={{ fontSize:18, color:"rgba(230,244,255,0.3)", lineHeight:2, letterSpacing:3 }}>
{/* IDEIAS<br/>
  CÓDIGO<br/>
  ARTE<br/>
  CAOS 
*/}        </div>
      </div>

      <div className="projects-grid" style={{
        display:"grid", gridTemplateColumns:"repeat(4,1fr)",
        gap:20, position:"relative", zIndex:1,
      }}>
        {PROJECTS.map((p,i)=><ProjectCard key={p.name} p={p} delay={i*80}/>)}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   CONTACT
════════════════════════════════════════════════ */
const Contact = () => {
  const ref = useFadeIn(100);
  return (
    <section id="contato" style={{
      background:`radial-gradient(ellipse at 50% 0%, rgba(41,171,226,0.1) 0%, transparent 60%), var(--darker)`,
      padding:"100px 40px", minHeight:"55vh",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      textAlign:"center", position:"relative", overflow:"hidden",
    }}>
      <Blob color="var(--pink)" size={500} style={{ top:-150, left:-150, opacity:.08 }}/>
      <Blob color="var(--cyan)" size={400} style={{ bottom:-100, right:-100, opacity:.08 }}/>

      <div ref={ref} className="fade-in" style={{ position:"relative", zIndex:1, maxWidth:640 }}>
        {/* logo circle */}
        <div className="floaty" style={{ width:80, height:80, margin:"0 auto 28px" }}>
          <LogoCircle size={100} />
        </div>

        <div className="tag mono" style={{
          background:"rgba(41,171,226,0.08)", border:"1px solid rgba(41,171,226,0.3)",
          color:"var(--cyan)", marginBottom:20, fontSize:9, letterSpacing:3,
          display:"inline-block",
        }}>CONTATO</div>

        <h2 className="bebas" style={{
          fontSize:"clamp(52px,8vw,100px)", color:"var(--light)",
          lineHeight:.9, letterSpacing:3, marginBottom:20,
        }}>
          FALE COM<br/><span className="shimmer-text">A GENTE!</span>
        </h2>

        <p className="nunito" style={{
          fontSize:15, color:"rgba(230,244,255,0.5)", lineHeight:1.8, marginBottom:44,
        }}>
          Tem um projeto louco, proposta de publi,<br/>ou só quer mandar um oi? Manda bala!
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:48 }}>
          <a href="mailto:chungasbungascontato@gmail.com" className="btn btn-primary">📧 ENVIAR EMAIL</a>
          <a href="#" className="btn btn-outline"><IcDiscord /> DISCORD</a>
        </div>

      {/* socials row */}
    <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
      {[
        { Icon:IcInstagram, label:"Instagram" },
        // { Icon:IcX,      label:"Twitter / X" },
        { Icon:IcYT,        label:"YouTube" },
        // { Icon:IcTwitch,   label:"Twitch" },
      ].map(({ Icon, label })=>(
        <a key={label} href="#" className="social-btn">
          <Icon s={16}/> {label}
        </a>
      ))}
    </div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════ */
const Footer = () => (
  <footer style={{
    background:"var(--darker)",
    borderTop:"1px solid rgba(41,171,226,0.12)",
    padding:"52px 80px 40px",
  }}>
    <div style={{
      display:"flex", alignItems:"center", justifyContent:"space-between",
      flexWrap:"wrap", gap:32, marginBottom:40,
    }}>
      {/* brand */}
      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        <LogoCircle size={64} />
        <div>
          <div className="bebas" style={{ fontSize:22, color:"var(--cyan)", letterSpacing:3, lineHeight:1 }}>Chungas e Bungas</div>
          <div className="mono" style={{ fontSize:9, color:"rgba(230,244,255,0.3)", letterSpacing:2 }}>HUMOR • MÚSICA • JOGOS</div>
        </div>
      </div>

      {/* social icons */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {[
          { Icon:IcInstagram, label:"Instagram" },
        // { Icon:IcX,      label:"Twitter / X" },
          { Icon:IcYT,       label:"YouTube" },
        // { Icon:IcTwitch,   label:"Twitch" },
          { Icon:IcDiscord,  label:"Discord" },
        ].map(({ Icon, label })=>(
          <a key={label} href="#" className="social-btn" style={{ fontSize:12, padding:"9px 16px" }}>
            <Icon s={15}/> {label}
          </a>
        ))}
      </div>
    </div>

    {/* divider */}
    <div style={{ height:1, background:"linear-gradient(90deg,transparent,rgba(41,171,226,0.2),transparent)", marginBottom:32 }}/>

    {/* bottom row */}
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
      <div style={{ display:"flex", gap:28, flexWrap:"wrap" }}>
        {["Privacidade (lol)","Termos (nem li)","Lore do Canal"].map(l=>(
          <a key={l} href="#" className="mono" style={{
            fontSize:10, color:"rgba(230,244,255,0.2)", letterSpacing:1,
            textDecoration:"none", transition:"color .15s",
          }}
            onMouseEnter={e=>e.target.style.color="var(--cyan)"}
            onMouseLeave={e=>e.target.style.color="rgba(230,244,255,0.2)"}
          >{l}</a>
        ))}
      </div>
      <p className="mono" style={{ fontSize:10, color:"rgba(230,244,255,0.18)", letterSpacing:1 }}>
        © {new Date().getFullYear()} Chungas e Bungas
      </p>
    </div>
  </footer>
);

/* ════════════════════════════════════════════════
   APP
════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <Bootstrap />
      <Cursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <Marquee />
      <Members />
      <Stats />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}