import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

export default function EULA() {
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
        <h1 className="text-xl font-bold text-foreground">End User License Agreement (EULA)</h1>
        <p className="text-[10px] text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-sm dark:prose-invert max-w-none text-sm text-foreground/90 space-y-4">
          <h2 className="text-base font-semibold mt-6">1. License Grant</h2>
          <p>Subject to these terms, OpenClaw grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal or business automation needs.</p>

          <h2 className="text-base font-semibold mt-6">2. Restrictions</h2>
          <p>You may not: (a) sublicense, sell, resell, or redistribute the Service; (b) modify, disassemble, decompile, or reverse-engineer any part of the Service; (c) use the Service to build a competing product; (d) remove any proprietary notices.</p>

          <h2 className="text-base font-semibold mt-6">3. Ownership</h2>
          <p>OpenClaw retains all rights, title, and interest in the Service, including all intellectual property. This EULA does not grant you any ownership rights. Your workflow data and configurations remain your property.</p>

          <h2 className="text-base font-semibold mt-6">4. User Content</h2>
          <p>You retain ownership of all workflows, data, and content you create using the Service. You grant OpenClaw a limited license to host and process your content solely to provide the Service.</p>

          <h2 className="text-base font-semibold mt-6">5. Updates</h2>
          <p>OpenClaw may update the Service at any time. Updates may modify features, fix bugs, or change functionality. Continued use after updates constitutes acceptance of changes.</p>

          <h2 className="text-base font-semibold mt-6">6. Warranty Disclaimer</h2>
          <p>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>

          <h2 className="text-base font-semibold mt-6">7. Limitation of Liability</h2>
          <p>IN NO EVENT SHALL OPENCLAW BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

          <h2 className="text-base font-semibold mt-6">8. Termination</h2>
          <p>This EULA is effective until terminated. OpenClaw may terminate this license at any time if you breach any term. Upon termination, you must cease all use of the Service.</p>

          <h2 className="text-base font-semibold mt-6">9. Governing Law</h2>
          <p>This EULA is governed by the laws of the European Union and applicable local laws. Any disputes shall be resolved in the competent courts of the data controller's jurisdiction.</p>

          <h2 className="text-base font-semibold mt-6">10. Contact</h2>
          <p>For questions about this EULA, contact: <span className="text-primary">legal@openclaw.app</span></p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
