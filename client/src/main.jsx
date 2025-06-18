import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Windmill } from "@windmill/react-ui";
import myTheme from "./assets/config/myTheme.js";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { SnackbarProvider } from "./context/SnackbarContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FlowFactProvider } from "./context/FlowFactContext";
import ThemedSuspense from "./components/ThemedSuspense";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
// import './assets/css/tailwind.output.css'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import FirebaseProvider from "./Firebase/FirebaseProvider.jsx";
import { StripeProvider } from "./context/StripeContext.jsx";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(I18nextBrowserLanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ["en", "de"],
    fallbackLng: "en",
    detection: {
      order: ["htmlTag", "cookie", "localStorage", "path", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });

createRoot(document.getElementById("root")).render(
  <Windmill theme={myTheme}>
    <SidebarProvider>
      <SnackbarProvider>
      <StripeProvider>
        <AuthProvider>
          <FlowFactProvider>
            <Suspense fallback={<ThemedSuspense />}>
              <Windmill>  
                <App />   
              </Windmill>
              <Toaster />
            </Suspense>
          </FlowFactProvider>
        </AuthProvider>
        </StripeProvider>
      </SnackbarProvider>
    </SidebarProvider>
  </Windmill>
);
