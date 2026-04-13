import { createContext, useContext, useState, } from "react";
import type { ReactNode } from "react";

type Theme = "dark" | "light";
type Lang = "pt" | "en";

interface AppCtx {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (pt: ReactNode, en: ReactNode) => ReactNode;
}

const AppContext = createContext<AppCtx>({} as AppCtx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLang] = useState<Lang>("pt");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };
  const toggleLang = () => {
    setLang((prev) => (prev === "pt" ? "en" : "pt"));
  };
  const t = (pt: ReactNode, en: ReactNode) => (lang === "pt" ? pt : en);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      <div data-theme={theme} className={theme}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);