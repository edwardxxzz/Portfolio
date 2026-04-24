import { useEffect, useRef, useMemo } from "react";
import { useApp } from "./AppContext";

export default function Hero() {
  const { ts } = useApp();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    heroRef.current?.classList.add("visible");
  }, []);

  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: `${(i * 137.5) % 100}%`,
        top:  `${(i * 97.3) % 100}%`,
        size: `${((i % 3) + 1)}px`,
        delay: `${(i * 0.19) % 4}s`,
        duration: `${2 + (i % 30) * 0.1}s`,
      })),
    []
  );

  return (
    <section id="inicio" ref={heroRef} className="hero-section section-reveal">
      <div className="starfield" aria-hidden="true">
        {stars.map((s) => (
          <div key={s.id} className="star"
            style={{ left: s.left, top: s.top, width: s.size, height: s.size,
                     animationDelay: s.delay, animationDuration: s.duration }} />
        ))}
      </div>
      <div className="hero-scanlines" aria-hidden="true" />
      <div className="hero-grid-floor" aria-hidden="true" />
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      <div className="hero-layout">
        {/* Left: text */}
        <div className="hero-content">
          <div className="sw-crawl-tag">
            <span className="sw-dot" />
            <span className="sw-text">A long time ago, in Manaus far far away...</span>
            <span className="sw-dot" />
          </div>

          <div className="hero-status">
            <span className="status-ping" />
            <span>{ts("Disponível para projetos", "Available for projects")}</span>
          </div>

          <h1 className="hero-name">
            <span className="hero-name-line1">Roberto</span>
            <span className="hero-name-line2">
              Edward
              <span className="hero-name-cursor" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero-subtitle">
            {ts(
              "Construo sites, sistemas e apps — do código ao deploy.",
              "I build websites, systems and apps — from code to deploy."
            )}
          </p>

          <div className="hero-tags">
            <span className="hero-tag">{ts("Programador", "Developer")}</span>
            <span className="hero-tag-divider">//</span>
            <span className="hero-tag">{ts("Cursando Informática", "CS Student")}</span>
            <span className="hero-tag-divider">//</span>
            <span className="hero-tag">Manaus, AM</span>
          </div>

          <div className="hero-ctas">
            <a href="#projetos" className="btn-primary">
              {ts("Ver Projetos", "See Projects")}
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a href="https://github.com/edwardxxzz" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="ml-2">GitHub</span>
            </a>
          </div>
        </div>

        {/* Right: portrait */}
        <div className="hero-image-col">
          <div className="hero-image-frame">
            {/*
              ╔══════════════════════════════════════════╗
              ║  TROQUE A URL PELA SUA FOTO              ║
              ║  Ideal: foto com fundo escuro,           ║
              ║  iluminação lateral verde/ciano,         ║
              ║  olhando levemente pro lado              ║
              ╚══════════════════════════════════════════╝
            */}
            <img
              src="https://images.unsplash.com/photo-1544890225-2f3faec4cd60?w=600&q=80"
              alt="Roberto Edward"
              className="hero-portrait"
            />
            <div className="hero-portrait-overlay" />
            <div className="hero-frame-corner hero-frame-tl" />
            <div className="hero-frame-corner hero-frame-tr" />
            <div className="hero-frame-corner hero-frame-bl" />
            <div className="hero-frame-corner hero-frame-br" />
            <div className="hero-image-badge">
              <span className="hero-badge-dot" />
              <span>{ts("Disponível", "Available")}</span>
            </div>
            <div className="hero-image-label">
              <span>Roberto Edward</span>
              <span className="hero-image-label-role">{ts("Desenvolvedor", "Developer")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint">
        <div className="scroll-mouse"><div className="scroll-wheel" /></div>
        <span>scroll</span>
      </div>
    </section>
  );
}