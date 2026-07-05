import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import CookieConsent from "@/components/CookieConsent";
import SubscriptionGate from "@/components/SubscriptionGate";
import Index from "./pages/Index.tsx";
import Home from "./pages/Home.tsx";
import Admin from "./pages/Admin.tsx";
import AdminSecurity from "./pages/AdminSecurity.tsx";
import Auth from "./pages/Auth.tsx";
import Pricing from "./pages/Pricing.tsx";
import Install from "./pages/Install.tsx";
import NotFound from "./pages/NotFound.tsx";
import TermsOfService from "./pages/legal/TermsOfService.tsx";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy.tsx";
import EULA from "./pages/legal/EULA.tsx";
import CookiePolicy from "./pages/legal/CookiePolicy.tsx";
import AgeRating from "./pages/legal/AgeRating.tsx";
import Support from "./pages/Support.tsx";
import DownloadPage from "./pages/Download.tsx";
import Sitemap from "./pages/Sitemap.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import SupportWidget from "./components/SupportWidget";

const queryClient = new QueryClient();

// In Electron the app is loaded via file://, where BrowserRouter breaks (shows 404).
const isFileProtocol = window.location.protocol === "file:";
const Router = isFileProtocol ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SettingsProvider>
        <Toaster />
        <Sonner />
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/eula" element={<EULA />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/age-rating" element={<AgeRating />} />
              <Route path="/sitemap" element={<Sitemap />} />
              <Route path="/download" element={<ProtectedRoute><DownloadPage /></ProtectedRoute>} />
              <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/install" element={<ProtectedRoute><Install /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/" element={<ProtectedRoute><SubscriptionGate><Index /></SubscriptionGate></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/admin/security" element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <SupportWidget />
          </AuthProvider>
          <CookieConsent />
        </Router>
      </SettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
