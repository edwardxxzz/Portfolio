import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

const projects = [
  {
    num: "001",
    title: "Arsense Mobile",
    pt_desc: "Aplicativo mobile desenvolvido com React Native — experiência nativa, performática e intuitiva.",
    en_desc: "Mobile app built with React Native — native, performant and intuitive experience.",
    tags: ["React Native", "TypeScript", "Mobile"],
    github: "https://github.com/edwardxxzz/Arsense.git",
    color: "proj--cyan",
  },
  {
    num: "002",
    title: "Arsense Web",
    pt_desc: "Versão web construída com React — interface moderna, responsiva e integrada ao ecossistema.",
    en_desc: "Web version built with React — modern, responsive interface integrated into the ecosystem.",
    tags: ["React", "JavaScript", "Web"],
    github: "https://github.com/edwardxxzz/Arsense-web.git",
    color: "proj--green",
  },
];

export default function Projects() {
  const { t } = useApp();
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
            {t("Ver todos ↗", "See all ↗")}
          </a>
        </div>

        <h2 className="section-title">
          {t(<>Trabalhos <span className="accent">recentes</span></>, <>Recent <span className="accent">work</span></>)}
        </h2>

        <div className="projects-list">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card ${p.color}`}
            >
              <div className="project-card-inner">
                <div className="project-top">
                  <span className="project-num">{p.num}</span>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <svg className="project-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{t(p.pt_desc, p.en_desc)}</p>
              </div>
              <div className="project-glow" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}