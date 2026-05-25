import WorkflowEditor from '@/components/WorkflowEditor';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="flex flex-col h-screen">
    <main className="flex-1 min-h-0">
      <h1 className="sr-only">OpenClaw — Visual Automation Builder</h1>
      <WorkflowEditor />
    </main>
    <Footer />
  </div>
);

export default Index;
