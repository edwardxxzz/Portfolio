import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

export default function Hero() {
  const { t } = useApp();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    heroRef.current?.classList.add("visible");
  }, []);

  return (
    <section id="inicio" ref={heroRef} className="hero-section section-reveal">
      {/* Starfield background */}
      <div className="starfield" aria-hidden="true">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Horizontal scan lines */}
      <div className="hero-scanlines" aria-hidden="true" />

      {/* Grid perspective floor */}
      <div className="hero-grid-floor" aria-hidden="true" />

      {/* Glow orbs */}
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />

      {/* Main content — centered */}
      <div className="hero-content">
        {/* Star Wars style crawl teaser — small, subtle */}
        <div className="sw-crawl-tag">
          <span className="sw-dot" />
          <span className="sw-text">
            {t("A long time ago, in Manaus far far away...", "A long time ago, in Manaus far far away...")}
          </span>
          <span className="sw-dot" />
        </div>

        {/* Status */}
        <div className="hero-status">
          <span className="status-ping" />
          <span>{t("Disponível para projetos", "Available for projects")}</span>
        </div>

        {/* Name */}
        <h1 className="hero-name">
          <span className="hero-name-line1">Roberto</span>
          <span className="hero-name-line2">
            Edward
            <span className="hero-name-cursor" aria-hidden="true" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          {t(
            <>Construo <em>sites</em>, <em>sistemas</em> e <em>apps</em> — do código ao deploy.</>,
            <>I build <em>websites</em>, <em>systems</em> and <em>apps</em> — from code to deploy.</>
          )}
        </p>

        {/* Tags */}
        <div className="hero-tags">
          <span className="hero-tag">{t("Programador", "Developer")}</span>
          <span className="hero-tag-divider">//</span>
          <span className="hero-tag">{t("Cursando Informática", "CS Student")}</span>
          <span className="hero-tag-divider">//</span>
          <span className="hero-tag">Manaus, AM</span>
        </div>

        {/* CTA Buttons */}
        <div className="hero-ctas">
          <a href="#projetos" className="btn-primary">
            {t("Ver Projetos", "See Projects")}
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

      {/* Scroll indicator */}
      <div className="hero-scroll-hint">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>{t("scroll", "scroll")}</span>
      </div>
    </section>
  );
}