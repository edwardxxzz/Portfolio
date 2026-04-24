import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "dark" | "light";
type Lang = "pt" | "en";

interface AppCtx {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (pt: ReactNode, en: ReactNode) => ReactNode;
  ts: (pt: string, en: string) => string;
}

const AppContext = createContext<AppCtx>({} as AppCtx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("pt");

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const toggleLang  = () => setLang((p)  => (p === "pt"   ? "en"    : "pt"));

  // t  → accepts strings OR JSX (returns ReactNode, use in JSX)
  const t  = (pt: ReactNode, en: ReactNode): ReactNode => (lang === "pt" ? pt : en);
  // ts → strings only (safe to use where string is required, e.g. title/aria)
  const ts = (pt: string, en: string): string => (lang === "pt" ? pt : en);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t, ts }}>
      <div data-theme={theme} className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);