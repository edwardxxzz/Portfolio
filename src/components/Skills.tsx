import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

const techSkills = [
  { name: "Node.js",      mono: "node",  color: "skill--green"  },
  { name: "React Native", mono: "rn",    color: "skill--cyan"   },
  { name: "React",        mono: "jsx",   color: "skill--blue"   },
  { name: "Next.js",      mono: "next",  color: "skill--purple" },
  { name: "Vite",         mono: "vite",  color: "skill--cyan"   },
  { name: "TypeScript",   mono: "ts",    color: "skill--blue"   },
  { name: "JavaScript",   mono: "js",    color: "skill--yellow" },
  { name: "CSS",          mono: "css",   color: "skill--pink"   },
  { name: "C++",          mono: "c++",   color: "skill--purple" },
  { name: "Java",         mono: "java",  color: "skill--orange" },
  { name: "VSCode",       mono: "ide",   color: "skill--cyan"   },
];

const softSkills = [
  { pt: "Comunicação Clara",      en: "Clear Communication",  pt_d: "Técnica em linguagem simples",   en_d: "Technical in plain language"   },
  { pt: "Resolução de Problemas", en: "Problem Solving",      pt_d: "Soluções rápidas e eficientes",  en_d: "Fast and efficient solutions"  },
  { pt: "Liderança Técnica",      en: "Technical Leadership", pt_d: "Guio equipes com clareza",       en_d: "Guide teams with clarity"      },
];

export default function Skills() {
  const { ts, lang } = useApp();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} className="section-reveal content-section">
      <div className="section-container">
        <div className="section-label">
          <span className="section-num">002</span>
          <div className="section-line" />
          <span className="section-tag">{ts("Tecnologias", "Technologies")}</span>
        </div>

        {/* Two-column: chips + image */}
        <div className="skills-layout">
          <div className="skills-left">
            <h2 className="section-title" style={{ marginBottom: "2rem" }}>
              {lang === "pt"
                ? <>Minha <span className="accent">stack</span></>
                : <>My <span className="accent">stack</span></>}
            </h2>

            <div className="skills-grid">
              {techSkills.map((s) => (
                <div key={s.name} className={`skill-chip ${s.color}`}>
                  <span className="skill-mono">{s.mono}</span>
                  <span className="skill-name">{s.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative image panel */}
          <div className="skills-image-col">
            <div className="skills-image-frame">
              {/*
                ╔═══════════════════════════════════════╗
                ║  TROQUE a URL por uma imagem do seu   ║
                ║  setup de trabalho ou algo que        ║
                ║  represente sua área de atuação       ║
                ║  Sugestão: foto do seu teclado/desk   ║
                ╚═══════════════════════════════════════╝
              */}
              <img
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=700&q=80"
                alt="Setup"
                className="skills-img"
              />
              <div className="skills-img-overlay" />
              {/* Floating stats */}
              <div className="skills-stat skills-stat-1">
                <span className="skills-stat-num">10+</span>
                <span className="skills-stat-label">{ts("Tecnologias", "Technologies")}</span>
              </div>
              <div className="skills-stat skills-stat-2">
                <span className="skills-stat-num">2+</span>
                <span className="skills-stat-label">{ts("Anos codando", "Years coding")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Soft skills */}
        <div className="soft-divider">
          <div className="soft-line" />
          <span className="soft-label">Soft Skills</span>
          <div className="soft-line" />
        </div>

        <div className="soft-grid">
          {softSkills.map((s, i) => (
            <div key={i} className="soft-card">
              <div className="soft-card-num">0{i + 1}</div>
              <p className="soft-card-title">{ts(s.pt, s.en)}</p>
              <p className="soft-card-desc">{ts(s.pt_d, s.en_d)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}