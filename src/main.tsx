import { createRoot } from "react-dom/client";
// @ts-ignore
import "@fontsource/press-start-2p";
import App from "./App.tsx";
import "./index.css";

// Service worker disabled: unregister any previously installed worker
// and clear caches to avoid serving stale content to existing users.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  }).catch(() => {});
  if ('caches' in window) {
    caches.keys().then((keys) => keys.forEach((k) => caches.delete(k))).catch(() => {});
  }
}

createRoot(document.getElementById("root")!).render(<App />);
