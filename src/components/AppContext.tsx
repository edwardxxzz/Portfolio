import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

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

  // Apply theme class directly on <html> so ALL CSS variables
  // (including body background-color) resolve correctly everywhere —
  // including during the loop scroll transition where copy2 is revealed.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("dark", "light");
    html.classList.add(theme);
  }, [theme]);

  // Set initial class on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  const toggleLang  = () => setLang((p)  => (p === "pt"   ? "en"    : "pt"));

  const t  = (pt: ReactNode, en: ReactNode): ReactNode => (lang === "pt" ? pt : en);
  const ts = (pt: string, en: string): string => (lang === "pt" ? pt : en);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t, ts }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);