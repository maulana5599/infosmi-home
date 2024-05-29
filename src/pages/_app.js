import "@/lang/i18n.ts";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function App({ Component, pageProps }) {
  const { i18n, ready} = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  if(!ready) return "loading translations...";
  return <Component {...pageProps} />;
}
