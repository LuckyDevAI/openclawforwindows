import { createRoot } from "react-dom/client";
// @ts-ignore
import "@fontsource/press-start-2p";
import App from "./App.tsx";
import "./index.css";

// Register Service Worker (skip in Lovable preview / iframe contexts)
const isInIframe = (() => {
  try { return window.self !== window.top; } catch { return true; }
})();
const isPreviewHost =
  window.location.hostname.includes('id-preview--') ||
  window.location.hostname.includes('lovableproject.com') ||
  window.location.hostname.includes('lovable.app');

if ('serviceWorker' in navigator) {
  if (isInIframe || isPreviewHost) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => r.unregister());
    }).catch(() => {});
  } else {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((reg) => console.log('✅ Service Worker registrato:', reg.scope))
        .catch((err) => console.error('❌ Errore registrazione Service Worker:', err));
    });
  }
}

createRoot(document.getElementById("root")!).render(<App />);
