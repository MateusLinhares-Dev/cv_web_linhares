import { Header } from './components/Header';
import { ExperienceSection } from './features/experience/ExperienceSection';
import { FeedbackSection } from './features/feedback/FeedbackSection';
import { ProjectList } from './features/projects/ProjectList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12 md:px-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Stack Tecnológico Principal</h2>
          <div className="flex flex-wrap gap-3">
            {['TypeScript', 'React', 'Node.js', 'Python', 'FastAPI', 'Docker', 'Nginx', 'AWS EC2', 'RPA', 'SQL'].map(skill => (
              <span key={skill} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <ExperienceSection />
        
        <ProjectList />

        <FeedbackSection/>
      </main>

      <footer className="bg-gray-900 text-center py-6 text-gray-400 text-sm mt-12">
        <p>Desenvolvido por Mateus Linhares © 2026</p>
      </footer>
    </div>
  );
}

export default App;