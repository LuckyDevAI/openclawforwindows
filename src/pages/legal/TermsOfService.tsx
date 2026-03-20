import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function TermsOfService() {
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
        <h1 className="text-xl font-bold text-foreground">Terms of Service</h1>
        <p className="text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4">
          <h2 className="text-base font-semibold mt-6">1. Acceptance of Terms</h2>
          <p>By accessing or using OpenClaw ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use the Service.</p>

          <h2 className="text-base font-semibold mt-6">2. Description of Service</h2>
          <p>OpenClaw is a workflow automation platform that allows users to create, manage, and execute automated workflows. The Service includes a visual editor, execution engine, and cloud storage for workflows.</p>

          <h2 className="text-base font-semibold mt-6">3. User Accounts</h2>
          <p>You must register for an account to use the Service. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must be at least 16 years old to create an account.</p>

          <h2 className="text-base font-semibold mt-6">4. Acceptable Use</h2>
          <p>You agree not to: (a) use the Service for any unlawful purpose; (b) attempt to gain unauthorized access to the Service; (c) interfere with or disrupt the Service; (d) reverse-engineer the Service; (e) use the Service to send spam or malicious content.</p>

          <h2 className="text-base font-semibold mt-6">5. Intellectual Property</h2>
          <p>The Service, including its original content, features, and functionality, is owned by OpenClaw and is protected by international copyright, trademark, and other intellectual property laws. Your workflows and data remain your property.</p>

          <h2 className="text-base font-semibold mt-6">6. Subscriptions and Payments</h2>
          <p>Paid features are available through subscription plans. Subscriptions auto-renew unless cancelled before the renewal date. Prices may change with 30 days' notice. Refunds are handled according to applicable law.</p>

          <h2 className="text-base font-semibold mt-6">7. Termination</h2>
          <p>We may terminate or suspend your account at any time for violations of these Terms. You may delete your account at any time. Upon termination, your right to use the Service ceases immediately.</p>

          <h2 className="text-base font-semibold mt-6">8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, OpenClaw shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>

          <h2 className="text-base font-semibold mt-6">9. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the European Union and applicable local laws, without regard to conflict of law provisions.</p>

          <h2 className="text-base font-semibold mt-6">10. Changes to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through the Service. Continued use after changes constitutes acceptance.</p>

          <h2 className="text-base font-semibold mt-6">11. Contact</h2>
          <p>For questions about these Terms, contact us at: <span className="text-primary">legal@openclaw.app</span></p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
