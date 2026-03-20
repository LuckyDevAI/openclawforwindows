import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
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
        <h1 className="text-xl font-bold text-foreground">Privacy Policy & GDPR</h1>
        <p className="text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4">
          <h2 className="text-base font-semibold mt-6">1. Data Controller</h2>
          <p>OpenClaw ("we", "us") is the data controller responsible for your personal data. Contact: <span className="text-primary">privacy@openclaw.app</span></p>

          <h2 className="text-base font-semibold mt-6">2. Data We Collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Account data:</strong> email address, display name, avatar image</li>
            <li><strong>Usage data:</strong> workflows created, execution logs, feature usage</li>
            <li><strong>Technical data:</strong> IP address, browser type, device information</li>
            <li><strong>Payment data:</strong> processed securely by Stripe; we do not store card details</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">3. Legal Basis (GDPR Art. 6)</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Contract performance:</strong> to provide the Service you signed up for</li>
            <li><strong>Legitimate interest:</strong> analytics, security, service improvement</li>
            <li><strong>Consent:</strong> marketing communications (opt-in only)</li>
            <li><strong>Legal obligation:</strong> tax and accounting requirements</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">4. Your Rights (GDPR)</h2>
          <p>Under GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Rectify</strong> inaccurate data</li>
            <li><strong>Erase</strong> your data ("right to be forgotten")</li>
            <li><strong>Restrict</strong> processing</li>
            <li><strong>Data portability</strong> — receive your data in machine-readable format</li>
            <li><strong>Object</strong> to processing based on legitimate interest</li>
            <li><strong>Withdraw consent</strong> at any time</li>
          </ul>
          <p>To exercise any right, email <span className="text-primary">privacy@openclaw.app</span>. We respond within 30 days.</p>

          <h2 className="text-base font-semibold mt-6">5. Data Retention</h2>
          <p>We retain your data for as long as your account is active. Upon account deletion, personal data is erased within 30 days, except where retention is required by law.</p>

          <h2 className="text-base font-semibold mt-6">6. Data Transfers</h2>
          <p>Your data may be transferred to and processed in countries outside the EEA. We ensure adequate safeguards through Standard Contractual Clauses (SCCs) or adequacy decisions.</p>

          <h2 className="text-base font-semibold mt-6">7. Data Security</h2>
          <p>We implement industry-standard security measures including encryption in transit (TLS) and at rest, access controls, and regular security reviews.</p>

          <h2 className="text-base font-semibold mt-6">8. Third-Party Services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Authentication & Database:</strong> Supabase (hosting EU/US)</li>
            <li><strong>Payments:</strong> Stripe (PCI DSS compliant)</li>
            <li><strong>Analytics:</strong> privacy-focused, no third-party cookies</li>
          </ul>

          <h2 className="text-base font-semibold mt-6">9. Children's Privacy</h2>
          <p>The Service is not intended for children under 16. We do not knowingly collect data from children under 16.</p>

          <h2 className="text-base font-semibold mt-6">10. Supervisory Authority</h2>
          <p>You have the right to lodge a complaint with your local Data Protection Authority if you believe your data is being processed unlawfully.</p>

          <h2 className="text-base font-semibold mt-6">11. Changes</h2>
          <p>We will notify you of material changes to this policy via email or in-app notification at least 14 days before they take effect.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
