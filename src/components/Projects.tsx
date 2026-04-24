import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

const projects = [
  {
    num: "001",
    title: "Arsense Mobile",
    pt_desc: "Aplicativo mobile desenvolvido com React Native — experiência nativa, performática e intuitiva. Interface fluida.",
    en_desc: "Mobile app built with React Native — native, performant and intuitive. Fluid interface.",
    tags: ["React Native", "TypeScript", "Mobile"],
    github: "https://github.com/edwardxxzz/Arsense.git",
    color: "proj--cyan",
    /*
      ╔═══════════════════════════════════════╗
      ║  TROQUE a URL abaixo por um           ║
      ║  screenshot do seu projeto mobile     ║
      ║  Tamanho ideal: 800x500px             ║
      ╚═══════════════════════════════════════╝
    */
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    year: "2024",
  },
  {
    num: "002",
    title: "Arsense Web",
    pt_desc: "Versão web construída com React — interface moderna, industrial, responsiva e integrada ao ecossistema. Design limpo e performático.",
    en_desc: "Web version built with React — modern, industrial, responsive and ecosystem-integrated. Clean design and high performance.",
    tags: ["React", "JavaScript", "Web"],
    github: "https://github.com/edwardxxzz/Arsense-web.git",
    color: "proj--green",
    /*
      ╔═══════════════════════════════════════╗
      ║  TROQUE a URL abaixo por um           ║
      ║  screenshot do seu projeto web        ║
      ║  Tamanho ideal: 800x500px             ║
      ╚═══════════════════════════════════════╝
    */
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    year: "2024",
  },
];

export default function Projects() {
  const { ts, lang } = useApp();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projetos" ref={ref} className="section-reveal content-section">
      <div className="section-container">
        <div className="section-label">
          <span className="section-num">003</span>
          <div className="section-line" />
          <a href="https://github.com/edwardxxzz" target="_blank" rel="noopener noreferrer" className="section-link">
            {ts("Ver todos ↗", "See all ↗")}
          </a>
        </div>

        <h2 className="section-title">
          {lang === "pt"
            ? <>Trabalhos <span className="accent">recentes</span></>
            : <>Recent <span className="accent">work</span></>}
        </h2>

        <div className="projects-list">
          {projects.map((p, idx) => (
            <div key={p.title} className={`project-card ${p.color} ${idx % 2 === 1 ? "proj-reverse" : ""}`}>
              {/* Image side */}
              <div className="project-img-side">
                <div className="project-img-wrapper">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="project-img"
                  />
                  <div className="project-img-overlay" />
                  <div className="project-img-num">{p.num}</div>
                  <div className="project-img-year">{p.year}</div>
                </div>
              </div>

              {/* Content side */}
              <div className="project-content-side">
                <div className="project-tags-row">
                  {p.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>

                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{ts(p.pt_desc, p.en_desc)}</p>

                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link-btn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  {ts("Ver no GitHub", "View on GitHub")}
                  <svg className="w-3 h-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}