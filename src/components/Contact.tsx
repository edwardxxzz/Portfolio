import { useEffect, useRef } from "react";
import { useApp } from "./AppContext";

export default function Contact() {
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

  return (
    <section id="contato" ref={ref} className="section-reveal content-section">
      <div className="section-container">
        <div className="section-label">
          <span className="section-num">004</span>
          <div className="section-line" />
          <span className="section-tag">{t("Contato", "Contact")}</span>
        </div>

        <div className="contact-block">
          <h2 className="contact-headline">
            {t(
              <>{`Tem um projeto?`}<br /><span className="accent">{`Me chama.`}</span></>,
              <>{`Got a project?`}<br /><span className="accent">{`Let's talk.`}</span></>
            )}
          </h2>
          <p className="contact-sub">
            {t(
              "Ideia no papel, sonho na cabeça ou problema pra resolver — estou pronto para transformar em código.",
              "An idea on paper, a dream in mind or a problem to solve — I'm ready to turn it into code."
            )}
          </p>

          <div className="contact-btns">
            <a href="mailto:roberto01fonsec@gmail.com" className="btn-primary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span>roberto01fonsec@gmail.com</span>
            </a>
            <a href="https://github.com/edwardxxzz" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="footer-bar">
          <p className="footer-copy">© {new Date().getFullYear()} Roberto Edward</p>
          <p className="footer-made">{t("Feito em Manaus com ♥ e código", "Made in Manaus with ♥ and code")}</p>
        </div>
      </div>
    </section>
  );
}