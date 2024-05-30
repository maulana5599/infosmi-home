import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "@/redux/store";
import "@/lang/i18n.ts";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }) {
  const { i18n, ready } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  if (!ready) return "loading translations...";
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
