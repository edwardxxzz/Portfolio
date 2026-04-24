import { useEffect, useState } from "react";

interface LoaderProps {
  onDone: () => void;
}

export default function Loader({ onDone }: LoaderProps) {
  const [phase, setPhase] = useState<"idle" | "line" | "split" | "done">("idle");

  useEffect(() => {
    // Phase 1: idle → show line after tiny delay
    const t1 = setTimeout(() => setPhase("line"), 200);
    // Phase 2: line drawn → split panels open
    const t2 = setTimeout(() => setPhase("split"), 1100);
    // Phase 3: panels gone → tell App we're done
    const t3 = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 2000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div className={`loader-root ${phase}`} aria-hidden="true">
      {/* Top-left panel */}
      <div className="loader-panel loader-panel-tl" />
      {/* Bottom-right panel */}
      <div className="loader-panel loader-panel-br" />

      {/* The diagonal reveal line */}
      <div className="loader-line-wrapper">
        <div className="loader-line" />
      </div>

      {/* Logo / name that appears during load */}
      <div className="loader-logo">
        <span className="loader-logo-bracket">[</span>
        <span className="loader-logo-name">RE</span>
        <span className="loader-logo-cursor">_</span>
        <span className="loader-logo-bracket">]</span>
      </div>

      {/* Progress label */}
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