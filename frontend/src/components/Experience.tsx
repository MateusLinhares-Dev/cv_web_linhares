import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

export function Experience() {
  return (
    <section className="max-w-5xl mx-auto my-20 px-6">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-blue-500 rounded"></div>
          Trajetória Profissional
        </h2>

        <div className="relative border-l border-slate-800 ml-3 md:ml-4 space-y-12">
          
          <div className="relative pl-8 md:pl-12">
            <div className="absolute -left-[17px] top-1 bg-blue-600 p-2 rounded-full border-4 border-[#020617]">
              <Briefcase size={16} className="text-white" />
            </div>
            
            <div className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl hover:border-blue-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">Software Engineer I</h3>
                  <h4 className="text-lg text-slate-400 font-medium">SoftExpert</h4>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm mt-2 md:mt-0 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full w-fit">
                  <Calendar size={14} />
                  <span>5 anos de experiência</span>
                </div>
              </div>

              <div className="space-y-4 text-slate-400 text-base relative z-10">
                <p>
                  Atuação direta no desenvolvimento e manutenção do core da plataforma empresarial, focando em alta performance e escalabilidade.
                </p>
                <ul className="space-y-3 mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    <span><strong>Banco de Dados:</strong> Refatoração profunda de lógicas de relatórios e consultas, otimizando funções agregadoras para somas globais e aplicando delimitações estritas de mês civil para garantir máxima performance.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    <span><strong>Arquitetura & Clean Code:</strong> Desenvolvimento de endpoints de webhooks (FastAPI) estruturados com os padrões Factory e Strategy para processamento concorrente em background.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">▹</span>
                    <span><strong>Liderança Técnica:</strong> Criação de documentações arquiteturais, gestão de ambientes da equipe PDI e treinamento do time focado em Clean Code e coesão estrutural.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}