import { useEffect, useRef, useState } from "react";
import { useApp } from "./AppContext";
import emailjs from '@emailjs/browser';

export default function Contact() {
  const { t } = useApp();
  const ref = useRef<HTMLElement>(null);
  
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) ref.current?.classList.add("visible"); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    setStatus("loading");

    // SUBSTITUA PELAS SUAS CHAVES REAIS DO EMAILJS
    emailjs.sendForm(
      'service_n2h7t1h', 
      'template_ztu7khn', // <--- Troque aqui
      form.current, 
      'slw604xUYeeHvVDY1'   // <--- Troque aqui
    )
    .then(() => {
        setStatus("success");
        form.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
    }, (error) => {
        console.error(error.text);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
    });
  };

  return (
    <section id="contato" ref={ref} className="section-reveal content-section">
      <style>{`
        /* Container principal do conteúdo para criar o layout Flex */
        .contact-content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 4rem;
          margin-top: 3rem;
          width: 100%;
        }

        /* Lado esquerdo: Textos e botões atuais */
        .contact-info-side {
          flex: 1;
          max-width: 500px;
        }

        /* Lado direito: O container do Card */
        .contact-form-side {
          flex: 1;
          display: flex;
          justify-content: flex-end; /* Empurra o card para a direita */
        }

        /* ESTILO DO CARD */
        .contact-card {
          background: #0a0a0a; /* Preto ligeiramente mais claro que o fundo */
          border: 1px solid #1a1a1a; /* Borda sutil */
          padding: 2.5rem;
          width: 100%;
          max-width: 450px; /* Largura fixa do card */
          box-shadow: 10px 10px 0px rgba(0, 255, 136, 0.03); /* Sombra rígida verde bem sutil */
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .contact-card:hover {
          transform: translate(-5px, -5px);
          box-shadow: 15px 15px 0px rgba(0, 255, 136, 0.05);
        }

        .contact-card-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #fff;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border-left: 3px solid #00ff88;
          padding-left: 1rem;
        }

        /* Estilos dos inputs dentro do Card */
        .custom-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-group { display: flex; flex-direction: column; }
        
        .custom-input {
          background: #111; /* Fundo interno do input */
          border: 1px solid #222;
          color: #fff;
          padding: 1rem;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
        }
        .custom-input::placeholder { color: #555; }
        .custom-input:focus {
          border-color: #00ff88; /* Verde industrial */
          background: #151515;
        }

        /* Botão Enviar dentro do Card */
        .custom-btn {
          background: transparent;
          color: #00ff88;
          border: 2px solid #00ff88;
          padding: 1rem;
          font-family: inherit;
          font-weight: 700;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }
        .custom-btn:hover:not(:disabled) {
          background: #00ff88;
          color: #000;
        }
        .custom-btn:disabled { opacity: 0.5; cursor: wait; }

        .form-status { margin-top: 1rem; font-size: 0.85rem; text-align: center;}
        .status-success { color: #00ff88; }
        .status-error { color: #ff4444; }

        /* Responsividade básica */
        @media (max-width: 900px) {
          .contact-content-wrapper {
            flex-direction: column;
            gap: 3rem;
          }
          .contact-form-side { justify-content: flex-start; }
          .contact-card { max-width: 100%; }
        }
      `}</style>

      <div className="section-container">
        <div className="section-label">
          <span className="section-num">004</span>
          <div className="section-line" />
          <span className="section-tag">{t("Contato", "Contact")}</span>
        </div>

        {/* NOVA ESTRUTURA DE LAYOUT EM DUAS COLUNAS */}
        <div className="contact-content-wrapper">
          
          {/* LADO ESQUERDO: INFOS */}
          <div className="contact-info-side">
            <h2 className="contact-headline">
              {t(
                <>{`Tem um projeto?`}<br /><span className="accent">{`Me chama.`}</span></>,
                <>{`Got a project?`}<br /><span className="accent">{`Let's talk.`}</span></>
              )}
            </h2>
            <p className="contact-sub" style={{marginBottom: '2rem'}}>
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

          {/* LADO DIREITO: O CARD DO FORMULÁRIO */}
          <div className="contact-form-side">
            <div className="contact-card">
              <h3 className="contact-card-title">{t("Enviar Mensagem", "Send Message")}</h3>
              
              <form ref={form} onSubmit={sendEmail} className="custom-form">
                <div className="form-group">
                  <input 
                    type="text" 
                    name="user_name" 
                    className="custom-input" 
                    placeholder={t("Seu nome", "Your name") as string} 
                    required 
                  />
                </div>
                
                <div className="form-group">
                  <input 
                    type="email" 
                    name="user_email" 
                    className="custom-input" 
                    placeholder={t("Seu email", "Your email") as string} 
                    required 
                  />
                </div>

                <div className="form-group">
                  <textarea 
                    name="message" 
                    className="custom-input" 
                    placeholder={t("Sua mensagem", "Your message") as string} 
                    rows={5} 
                    required 
                  />
                </div>

                <button type="submit" className="custom-btn" disabled={status === "loading"}>
                  {status === "loading" 
                    ? t("Enviando...", "Sending...") 
                    : t("Enviar", "Send")}
                </button>

                {status === "success" && (
                  <p className="form-status status-success">
                    {t("Mensagem enviada!", "Message sent!")}
                  </p>
                )}
                {status === "error" && (
                  <p className="form-status status-error">
                    {t("Erro. Tente novamente.", "Error. Try again.")}
                  </p>
                )}
              </form>
            </div>
          </div>

        </div> {/* Fim do contact-content-wrapper */}

        <div className="footer-bar">
          <p className="footer-copy">© {new Date().getFullYear()} Roberto Edward</p>
          <p className="footer-made">{t("Feito em Manaus", "Made in Manaus")}</p>
        </div>
      </div>
    </section>
  );
}