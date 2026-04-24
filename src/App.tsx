import { useEffect, useRef, useState } from 'react'
import { AppProvider } from './components/AppContext'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'

/**
 * Infinite loop scroll with Valentin Cheval inspired clean right-zoom transition.
 */
function LoopScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const copy1Ref = useRef<HTMLDivElement>(null);
  const copy2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const c1 = copy1Ref.current;
    const c2 = copy2Ref.current;
    
    if (!wrap || !c1 || !c2) return;

    const handleScroll = () => {
      const half = wrap.scrollHeight / 2;
      const pos = window.scrollY;
      const vh = window.innerHeight;

      // --- LÓGICA DA TRANSIÇÃO (CLEAN ZOOM RIGHT ACTIVATION) ---
      // Mantemos a resistência (transitionDistance), pois Valentin usa bastante.
      const transitionDistance = vh * 1.5; 
      const transitionStart = half - transitionDistance;

      if (pos >= transitionStart && pos < half) {
        // Progresso vai de 0 (início) até 1 (ponto exato do loop)
        const progress = (pos - transitionStart) / transitionDistance;

        // COPY 1 (Tela de Contato saindo):
        // Focamos a origem do zoom no canto direito inferior (vazio do form).
        c1.style.transformOrigin = 'right 80%';
        
        // CÁLCULO CLEAN C1:
        // 1. Anulamos o scroll (pos - transitionStart).
        // 2. Zoom suave: vai de 1x até apenas 1.8x (reduzido para ser 'clean').
        // 3. Movimento sutil para ESQUERDA: cria a paralaxe enquanto a direita aproxima.
        const c1Scale = 1 + progress * 0.8;
        const c1TranslateX = progress * -60; // move 60px para esquerda
        c1.style.transform = `translateY(${pos - transitionStart}px) translateX(${c1TranslateX}px) scale(${c1Scale})`;
        c1.style.opacity = (1 - progress).toString();
        // Adicionamos um blur sutil que aumenta com o zoom para suavizar
        c1.style.filter = `blur(${progress * 2}px)`;

        // COPY 2 (Próxima tela Hero entrando):
        c2.style.transformOrigin = 'center center';
        
        // CÁLCULO CLEAN C2 (Efeito Valentin de camadas):
        // 1. Anulamos scroll natural (-(half - pos)).
        // 2. Revelação de profundidade: surge menor (0.6x) e expande até 1x.
        // 3. Surge vindo levemente da DIREITA: complementa o movimento de C1.
        const c2Scale = 0.6 + progress * 0.4;
        const c2TranslateX = (1 - progress) * 40; // surge 40px da direita e centraliza
        c2.style.transform = `translateY(${-(half - pos)}px) translateX(${c2TranslateX}px) scale(${c2Scale})`;
        c2.style.opacity = progress.toString();
        // Hero começa levemente borrada e foca
        c2.style.filter = `blur(${(1 - progress) * 4}px)`;

      } else {
        // Resetamos os estilos quando estamos rolando o site normalmente
        c1.style.transform = 'none';
        c1.style.opacity = '1';
        c1.style.filter = 'none';

        c2.style.transform = 'none';
        // Garante que a cópia 2 esteja invisível e sem filtro fora da zona de loop
        c2.style.filter = 'none';
        c2.style.opacity = pos >= half ? '1' : '0'; 
      }
      // --- FIM DA LÓGICA DE TRANSIÇÃO ---

      // Scrolled past the first copy → jump to same position in first copy
      if (pos >= half) {
        window.scrollTo({ top: pos - half, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Dispara uma vez na montagem para garantir os opacities iniciais corretos
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      
      {/* ESPAÇO FANTASMA: 
        Necessário para dar a área de scroll que o JS transforma em animação.
      */}
      <div style={{ height: '150vh', pointerEvents: 'none' }} aria-hidden="true" />
    </>
  );

  return (
    <div ref={wrapRef}>
      {/* Copy 1 */}
      <div 
        ref={copy1Ref} 
        style={{ willChange: 'transform, opacity, filter' }} // Otimização para GPUs
      >
        {sections}
      </div>
      
      {/* Copy 2 — seamless clone below */}
      <div 
        ref={copy2Ref} 
        aria-hidden="true" 
        style={{ willChange: 'transform, opacity, filter', opacity: 0 }}
      >
        {sections}
      </div>
    </div>
  );
}

function SiteContent() {
  return (
    <div className="site-root">
      <Navbar />
      <LoopScroll />
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <AppProvider>
      {!loaded && <Loader onDone={() => setLoaded(true)} />}
      <div style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.5s ease 0.1s',
        visibility: loaded ? 'visible' : 'hidden',
      }}>
        <SiteContent />
      </div>
    </AppProvider>
  );
}