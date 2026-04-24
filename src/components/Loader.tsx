import { useEffect, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState<"idle" | "line" | "split" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 200);
    const t2 = setTimeout(() => setPhase("split"), 1200); // Dei +100ms pra dar tempo de ler
    const t3 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 2200); // Tempo total aumentado levemente para a animação da logo terminar suave

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div className={`loader-root ${phase}`} aria-hidden="true">
      <style>{`
        .loader-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }
        
        /* 1. OS PAINÉIS (EFEITO CORTINA CHEVAL) */
        .loader-panel {
          position: absolute;
          width: 300vmax;
          height: 300vmax;
          background: #0a0a0a; 
          left: 50%;
          top: 50%;
          transform-origin: center;
        }
        
        /* Painel Top-Left */
        .loader-panel-tl {
          transform: translate(-50%, -50%) rotate(-45deg) translateY(-50%);
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 1.2s ease;
        }
        /* Painel Bottom-Right */
        .loader-panel-br {
          transform: translate(-50%, -50%) rotate(-45deg) translateY(50%);
          transition: transform 1.2s cubic-bezier(0.77, 0, 0.175, 1), box-shadow 1.2s ease;
        }

        /* ANIMAÇÃO DA CORTINA ABRINDO COM PROFUNDIDADE */
        .loader-root.split .loader-panel-tl {
          transform: translate(-50%, -50%) rotate(-45deg) translateY(-110%);
          box-shadow: 0 20px 100px rgba(0, 255, 136, 0.15); /* Brilho de profundidade ao abrir */
        }
        .loader-root.split .loader-panel-br {
          transform: translate(-50%, -50%) rotate(-45deg) translateY(110%);
          box-shadow: 0 -20px 100px rgba(0, 255, 136, 0.15);
        }

        /* 2. A LINHA DIAGONAL VERDE */
        .loader-line-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 300vmax;
          height: 2px;
          transform: translate(-50%, -50%) rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: opacity 0.4s ease 0.1s; 
        }
        .loader-root.split .loader-line-wrapper {
          opacity: 0;
        }

        .loader-line {
          width: 100%;
          height: 100%;
          background: #00ff88;
          transform: scaleX(0);
          transition: transform 0.8s cubic-bezier(0.77, 0, 0.175, 1);
        }
        .loader-root.line .loader-line, 
        .loader-root.split .loader-line {
          transform: scaleX(1);
        }

        /* 3. LOGO [RE_] - A MÁGICA ACONTECE AQUI */
        .loader-logo {
          position: fixed;
          /* Posicionamento inicial: Centro absoluto da tela */
          top: 50%;
          left: 50%;
          
          /* O segredo pra ficar 'acima e a esquerda' da linha diagonal:
             Ao invés de -50%, -50% exatos, subtraímos 40px em ambos os eixos.
             Isso desliza a logo exatamente na mesma angulação da linha, 
             mantendo-a visualmente centralizada, mas flutuando no quadrante superior esquerdo. */
          transform: translate(calc(-50% - 40px), calc(-50% - 40px));
          
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
          opacity: 0;
          z-index: 10;
          
          /* Transição de TODOS os atributos físicos simultaneamente */
          transition: opacity 0.5s ease,
                      top 1s cubic-bezier(0.77, 0, 0.175, 1),
                      left 1s cubic-bezier(0.77, 0, 0.175, 1),
                      transform 1s cubic-bezier(0.77, 0, 0.175, 1),
                      font-size 1s cubic-bezier(0.77, 0, 0.175, 1);
        }
        
        .loader-logo-bracket { color: #00ff88; }
        .loader-logo-cursor {
          display: inline-block;
          width: 1ch;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        /* Faz a logo aparecer centralizada na fase Line */
        .loader-root.line .loader-logo {
          opacity: 1;
        }

        /* FAZ A LOGO VOAR PARA A NAVBAR NA FASE SPLIT */
        .loader-root.split .loader-logo {
          /* Valores aproximados baseados na Navbar padrão (ajuste se necessário) */
          top: 1.5rem; 
          left: 2rem; /* ou algo como 5vw dependendo do seu container */
          
          /* Removemos a compensação de centro e alinhavamos na ponta */
          transform: translate(0, 0); 
          
          /* Reduz o tamanho da fonte para bater com o tamanho do botão da Navbar */
          font-size: 1.25rem; 
        }

        /* 4. TEXTO DE LOADING */
        .loader-label {
          position: absolute;
          bottom: 2rem;
          right: 2rem;
          color: #00ff88;
          font-family: monospace;
          font-size: 0.9rem;
          z-index: 10;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .loader-root.line .loader-label { opacity: 1; }
        .loader-root.split .loader-label { opacity: 0; }
      `}</style>

      {/* Painéis */}
      <div className="loader-panel loader-panel-tl" />
      <div className="loader-panel loader-panel-br" />

      {/* Linha */}
      <div className="loader-line-wrapper">
        <div className="loader-line" />
      </div>

      {/* Logo Voadora */}
      <div className="loader-logo">
        <span className="loader-logo-bracket">[</span>
        <span className="loader-logo-name">RE</span>
        <span className="loader-logo-cursor">_</span>
        <span className="loader-logo-bracket">]</span>
      </div>

      {/* Loading */}
      <div className="loader-label">
        <LoadingText phase={phase} />
      </div>
    </div>
  );
}

function LoadingText({ phase }: { phase: string }) {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const i = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 350);
    return () => clearInterval(i);
  }, []);
  if (phase === "split") return <span className="loader-label-text">ENTERING</span>;
  return <span className="loader-label-text">LOADING{dots}</span>;
}