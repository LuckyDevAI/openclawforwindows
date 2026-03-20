import WorkflowEditor from '@/components/WorkflowEditor';
import Footer from '@/components/Footer';

const Index = () => (
  <div className="flex flex-col h-screen">
    <div className="flex-1 min-h-0">
      <WorkflowEditor />
    </div>
    <Footer />
  </div>
);

export default Index;
