import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-3xl mx-auto flex items-center h-12 px-4">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs" asChild>
            <Link to="/auth"><ArrowLeft className="h-3.5 w-3.5" /> Back</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 py-10 space-y-6">
        <h1 className="text-xl font-bold text-foreground">Cookie Policy</h1>
        <p className="text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4">
          <h2 className="text-base font-semibold mt-6">1. What Are Cookies</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.</p>

          <h2 className="text-base font-semibold mt-6">2. Cookies We Use</h2>
          
          <h3 className="text-sm font-semibold mt-4">Essential Cookies (Strictly Necessary)</h3>
          <p>These cookies are required for the Service to function. They cannot be disabled.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Authentication:</strong> session tokens to keep you logged in</li>
            <li><strong>Security:</strong> CSRF protection tokens</li>
            <li><strong>Preferences:</strong> language, theme settings</li>
          </ul>

          <h3 className="text-sm font-semibold mt-4">Functional Cookies</h3>
          <p>These enhance your experience but are not strictly necessary.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Local storage:</strong> editor state, active project reference</li>
            <li><strong>UI preferences:</strong> panel sizes, sidebar state</li>
          </ul>

          <h3 className="text-sm font-semibold mt-4">Analytics Cookies</h3>
          <p>We use privacy-focused analytics that do not use third-party tracking cookies. No personal data is shared with advertisers.</p>

          <h2 className="text-base font-semibold mt-6">3. Third-Party Cookies</h2>
          <p>We minimize third-party cookies. The following services may set cookies:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Stripe:</strong> payment processing (fraud prevention)</li>
            <li><strong>Google OAuth:</strong> only when using "Sign in with Google"</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">4. Managing Cookies</h2>
          <p>You can control cookies through your browser settings. Note that disabling essential cookies may prevent the Service from functioning correctly.</p>
          <p>Most browsers allow you to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>View and delete existing cookies</li>
            <li>Block all or specific cookies</li>
            <li>Set preferences for specific websites</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">5. Cookie Retention</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Session cookies:</strong> deleted when you close your browser</li>
            <li><strong>Persistent cookies:</strong> retained for up to 12 months</li>
            <li><strong>Authentication tokens:</strong> valid for the session duration set in your settings</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">6. Updates</h2>
          <p>We may update this Cookie Policy periodically. Changes will be posted on this page with an updated date.</p>

          <h2 className="text-base font-semibold mt-6">7. Contact</h2>
          <p>For questions about our use of cookies, contact: <span className="text-primary">privacy@openclaw.app</span></p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
