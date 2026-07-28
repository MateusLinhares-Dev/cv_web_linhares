import { Header } from './components/Header.tsx';
import { TechStack } from './components/TechStack.tsx';
import { Experience } from './components/Experience.tsx';
import { ProjectList } from './features/projects/ProjectList.tsx';
import { ContactSection } from './components/ContactSection.tsx';

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