import { useEffect, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

/**
 * Phases:
 * idle   → blank screen, panels closed
 * line   → diagonal line draws from bottom-right → top-left (0.9s)
 * split  → panels slide open like a curtain along the diagonal (0.9s)
 * fly    → [RE_] logo flies to exact navbar position (0.6s)
 * done   → unmounts
 */
export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState<"idle" | "line" | "split" | "fly" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"),  200);   // start drawing line
    const t2 = setTimeout(() => setPhase("split"), 1100);  // line done → curtain opens
    const t3 = setTimeout(() => setPhase("fly"),   2100);  // curtain done → logo flies
    const t4 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 2800);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div className={`ldr ldr--${phase}`} aria-hidden="true">

      {/* ── PANELS ── two halves split along the diagonal */}
      <div className="ldr-panel ldr-panel--top" />
      <div className="ldr-panel ldr-panel--bot" />

      {/* ── DIAGONAL LINE ── draws from bottom-right to top-left */}
      <div className="ldr-line-track">
        <div className="ldr-line" />
      </div>

      {/* ── LOGO ── appears on line, then flies to navbar */}
      <div className="ldr-logo">
        <span className="ldr-bracket">[</span>
        <span className="ldr-name">RE</span>
        <span className="ldr-cursor">_</span>
        <span className="ldr-bracket">]</span>
      </div>

      {/* ── LOADING TEXT ── bottom-center, highly visible */}
      <div className="ldr-status">
        <LoadingDots phase={phase} />
      </div>

    </div>
  );
}

function LoadingDots({ phase }: { phase: string }) {
  const [dots, setDots] = useState(".");
  useEffect(() => {
    const iv = setInterval(() => setDots(d => d.length >= 3 ? "." : d + "."), 280);
    return () => clearInterval(iv);
  }, []);
  if (phase === "split" || phase === "fly") return <span>ENTERING</span>;
  return <span>INITIALIZING{dots}</span>;
}