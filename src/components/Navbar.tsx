import { useState, useEffect, useRef } from "react";
import { useApp } from "./AppContext";

const navItems = [
  { id: "inicio", pt: "Início", en: "Home" },
  { id: "sobre", pt: "Sobre", en: "About" },
  { id: "skills", pt: "Skills", en: "Skills" },
  { id: "projetos", pt: "Projetos", en: "Projects" },
  { id: "contato", pt: "Contato", en: "Contact" },
];

export default function Navbar() {
  const { theme, lang, toggleTheme, toggleLang, t } = useApp();
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navItems.map((n) => document.getElementById(n.id));
      let cur = "inicio";
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top <= 130) cur = navItems[i].id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const idx = navItems.findIndex((n) => n.id === active);
    const btn = btnRefs.current[idx];
    if (btn) setPillStyle({ left: btn.offsetLeft, width: btn.offsetWidth });
  }, [active]);

  const go = (id: string) => {
    setActive(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar-scanline" />
        <div className="navbar-inner">
          {/* Logo */}
          <button onClick={() => go("inicio")} className="navbar-logo">
            <span className="navbar-logo-bracket">[</span>
            RE
            <span className="navbar-logo-cursor">_</span>
            <span className="navbar-logo-bracket">]</span>
          </button>

          {/* Center pill nav - hidden on mobile */}
          <div className="navbar-pills hidden md:flex">
            <div
              className="navbar-pill-indicator"
              style={{ left: pillStyle.left, width: pillStyle.width }}
            />
            {navItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => { btnRefs.current[i] = el; }}
                onClick={() => go(item.id)}
                className={`navbar-pill-btn ${active === item.id ? "active" : ""}`}
              >
                {lang === "pt" ? item.pt : item.en}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="navbar-controls">
            <button onClick={toggleLang} className="nav-ctrl-btn" title="Toggle language">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
              </svg>
              <span>{lang === "pt" ? "PT" : "EN"}</span>
            </button>

            <button onClick={toggleTheme} className="nav-ctrl-btn" title="Toggle theme">
              {theme === "dark" ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 12c0 5.385 4.365 9.75 9.75 9.75 4.57 0 8.42-3.14 9.502-7.374-.75.309-1.617.499-2.5.374z" />
                </svg>
              )}
              <span className="hidden sm:inline">{theme === "dark" ? t("Claro","Light") : t("Escuro","Dark")}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span className={`ham-line ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`ham-line ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`ham-line ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-menu-grid" />
        {navItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => go(item.id)}
            className={`mobile-menu-item ${menuOpen ? "item-visible" : ""}`}
            style={{ transitionDelay: menuOpen ? `${i * 70}ms` : "0ms" }}
          >
            <span className="mobile-num">0{i + 1}.</span>
            {lang === "pt" ? item.pt : item.en}
          </button>
        ))}
      </div>
    </>
  );
}