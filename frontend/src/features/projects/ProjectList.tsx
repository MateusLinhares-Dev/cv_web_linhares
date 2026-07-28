import { motion } from 'framer-motion';
import { Star, Code, ArrowUpRight } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';

export function ProjectList() {
  const { projects, loading, error } = useProjects();

  if (loading) return <div className="text-center text-slate-500 py-10 animate-pulse">Carregando infraestrutura e projetos...</div>;
  if (error) return <div className="text-center text-red-400 py-10">{error}</div>;

  return (
    <section className="max-w-5xl mx-auto my-16 px-6">
      <h2 className="text-3xl font-bold text-slate-100 mb-8 flex items-center gap-3">
        <div className="h-[2px] w-8 bg-blue-500 rounded"></div>
        Projetos em Destaque
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((repo, index) => (
          <motion.a 
            href={repo.html_url}
            target="_blank" 
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={repo.name} 
            className="group block bg-slate-900/40 border border-slate-800 p-6 rounded-2xl hover:bg-slate-800/60 hover:border-blue-500/50 transition-all duration-300 relative overflow-hidden"
          >

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h3 className="text-xl font-bold text-slate-200 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                {repo.name}
              </h3>
              <ArrowUpRight className="text-slate-600 group-hover:text-blue-400 transition-colors w-5 h-5" />
            </div>
            
            <p className="text-slate-400 mb-6 relative z-10 line-clamp-2 h-12">
              {repo.description || 'Repositório focado em orquestração, automação e arquitetura de software.'}
            </p>
            
            <div className="flex items-center justify-between mt-auto relative z-10 border-t border-slate-800 pt-4">
              <span className="flex items-center gap-2 text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1 rounded-full">
                <Code size={14} className="text-blue-400" />
                {repo.language || 'Multi-stack'}
              </span>
              <span className="flex items-center gap-1 text-sm text-slate-400">
                <Star size={16} className="text-yellow-500" /> {repo.stargazers_count}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}