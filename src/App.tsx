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
 * Infinite loop scroll:
 * We render the content TWICE stacked vertically.
 * A scroll listener watches: when the user crosses the midpoint
 * (end of first copy / start of second copy), we silently
 * teleport the scroll position back to the equivalent spot
 * in the first copy — creating a seamless infinite downward loop.
 * Scrolling up past the top teleports to the equivalent spot in copy 2.
 */
function LoopScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const handleScroll = () => {
      const half = wrap.scrollHeight / 2;
      const pos  = window.scrollY;

      // Scrolled past the first copy → jump to same position in first copy
      if (pos >= half) {
        window.scrollTo({ top: pos - half, behavior: 'instant' as ScrollBehavior });
      }
      // Scrolled above zero (browser rubber-band) — guard for upward loop
      if (pos <= 0 && window.scrollY === 0) {
        window.scrollTo({ top: half, behavior: 'instant' as ScrollBehavior });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );

  return (
    <div ref={wrapRef}>
      {/* Copy 1 */}
      <div>{sections}</div>
      {/* Copy 2 — seamless clone below */}
      <div aria-hidden="true">{sections}</div>
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