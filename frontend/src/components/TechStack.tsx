import { motion } from 'framer-motion';
import { Layers, Database, LayoutTemplate, CloudCog } from 'lucide-react';

const skills = [
  {
    category: "Backend & Arquitetura",
    icon: <Layers className="text-blue-500 mb-4" size={28} />,
    items: [
      { name: "Python / FastAPI / Django", level: 95, label: "Especialista" },
      { name: "Node.js", level: 85, label: "Avançado" },
      { name: "Design Patterns (Factory, Strategy)", level: 90, label: "Avançado" },
      { name: "Mensageria (RabbitMQ, EventBridge)", level: 85, label: "Avançado" }
    ]
  },
  {
    category: "Infra & Cloud",
    icon: <CloudCog className="text-purple-500 mb-4" size={28} />,
    items: [
      { name: "AWS (EC2, Microserviços)", level: 90, label: "Avançado" },
      { name: "Docker & CI/CD", level: 95, label: "Especialista" },
      { name: "RPA & Automação", level: 88, label: "Avançado" },
      { name: "Nginx / Proxy Reverso", level: 85, label: "Avançado" }
    ]
  },
  {
    category: "Frontend & UI",
    icon: <LayoutTemplate className="text-emerald-500 mb-4" size={28} />,
    items: [
      { name: "React & TypeScript", level: 90, label: "Avançado" },
      { name: "JavaScript", level: 95, label: "Especialista" },
      { name: "Tailwind CSS", level: 85, label: "Avançado" },
      { name: "Integração de APIs / Webhooks", level: 95, label: "Especialista" }
    ]
  },
  {
    category: "Dados & DB",
    icon: <Database className="text-orange-500 mb-4" size={28} />,
    items: [
      { name: "PostgreSQL / SQL", level: 90, label: "Avançado" },
      { name: "Otimização de Queries", level: 85, label: "Avançado" },
      { name: "Modelagem Relacional", level: 88, label: "Avançado" },
      { name: "Manipulação PL/pgSQL", level: 80, label: "Intermediário" }
    ]
  }
];

export function TechStack() {
  return (
    <section className="max-w-5xl mx-auto my-20 px-6">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-slate-100 mb-10 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-blue-500 rounded"></div>
          Stack Tecnológico & Níveis
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="bg-slate-900/40 border border-slate-800/60 p-8 rounded-2xl hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4 mb-6">
                {skillGroup.icon}
                <h3 className="text-xl font-bold text-slate-200">{skillGroup.category}</h3>
              </div>
              
              <div className="space-y-6">
                {skillGroup.items.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-slate-300">{item.name}</span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-800/50 px-2 py-1 rounded">{item.label}</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}