import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

export default function About() {
  const { t } = useApp();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const principles = [
    {
      n: "01",
      pt_title: "Foco no resultado",
      en_title: "Result-driven",
      pt_desc: "Cada linha de código tem propósito claro.",
      en_desc: "Every line of code has a clear purpose.",
    },
    {
      n: "02",
      pt_title: "Aprendizado contínuo",
      en_title: "Continuous learning",
      pt_desc: "Sempre estudando algo novo para entregar melhor.",
      en_desc: "Always studying something new to deliver better.",
    },
    {
      n: "03",
      pt_title: "Comunicação clara",
      en_title: "Clear communication",
      pt_desc: "Complexidade técnica em linguagem simples.",
      en_desc: "Technical complexity in plain language.",
    },
  ];

  return (
    <section id="sobre" ref={ref} className="section-reveal content-section">
      <div className="section-container">
        <div className="section-label">
          <span className="section-num">001</span>
          <div className="section-line" />
          <span className="section-tag">{t("Sobre mim", "About me")}</span>
        </div>

        <div className="about-grid">
          <div className="about-left">
            <h2 className="about-headline">
              {t(<>Código<br /><em>com alma.</em></>, <>Code<br /><em>with soul.</em></>)}
            </h2>
            <p className="about-body">
              {t(
                <>Sou <strong>Roberto Edward</strong>, programador de Manaus. Estudante de Informática movido pela necessidade de construir coisas que funcionam de verdade.</>,
                <>I'm <strong>Roberto Edward</strong>, a developer from Manaus. CS student driven by the need to build things that actually work.</>
              )}
            </p>
            <p className="about-body-dim">
              {t(
                "Minha stack vive no ecossistema JavaScript — Node.js no back, React e React Native na frente. Mas quando o projeto pede, C++, Python e Java entram no jogo.",
                "My stack lives in the JavaScript ecosystem — Node.js on the back, React and React Native on the front. But when the project calls for it, C++, Python and Java join the game."
              )}
            </p>
          </div>

          <div className="about-right">
            {principles.map((p) => (
              <div key={p.n} className="principle-row">
                <span className="principle-num">{p.n}</span>
                <div>
                  <p className="principle-title">{t(p.pt_title, p.en_title)}</p>
                  <p className="principle-desc">{t(p.pt_desc, p.en_desc)}</p>
                </div>
                <div className="principle-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}