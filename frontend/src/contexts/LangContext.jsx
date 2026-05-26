import { createContext, useContext, useState } from 'react';
import en from '../translations/en';
import hi from '../translations/hi';

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = lang === 'hi' ? hi : en;
  const toggle = () => setLang((l) => (l === 'en' ? 'hi' : 'en'));
  return (
    <LangContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
