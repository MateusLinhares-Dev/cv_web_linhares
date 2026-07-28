import { Header } from './components/Header';
import { TechStack } from './components/TechStack';
import { Experience } from './components/Experience';
import { ProjectList } from './features/projects/ProjectList';
import { ContactSection } from './components/ContactSection';

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30 pb-20">
      <Header />
      <TechStack />
      <Experience />
      <ProjectList />
      <ContactSection />
    </div>
  );
}