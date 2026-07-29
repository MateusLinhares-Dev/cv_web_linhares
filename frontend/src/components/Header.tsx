import { motion } from 'framer-motion';
import { Download, MapPin, Smartphone, Mail, User, Terminal } from 'lucide-react';

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a12.8 12.8 0 0 0-7 0C6.2 1.2 5 1.6 5 1.6a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.2c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function Header() {
  return (
    <header className="max-w-5xl mx-auto mb-16 mt-12 px-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-2">
            Mateus Linhares
          </h1>
          <h2 className="text-xl md:text-2xl text-blue-400 font-medium flex items-center gap-2">
            <Terminal size={24} />
            Engenheiro de Software | Infraestrutura & Cloud
          </h2>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          onClick={() => window.print()}
          className="print:hidden group inline-flex items-center gap-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 hover:border-blue-500 text-slate-100 font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow-lg"
        >
          <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          Baixar CV
        </motion.button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {[
          { icon: <MapPin size={16} />, text: 'Balneário Piçarras, SC' },
          { icon: <Smartphone size={16} />, text: '(47) 99662-3051' },
          { icon: <User size={16} />, text: '23 anos' },
          { icon: <Mail size={16} />, text: 'mateuslinhares16@gmail.com', link: 'mailto:mateuslinhares16@gmail.com' },
          { icon: <LinkedinIcon size={16} />, text: 'LinkedIn', link: 'https://linkedin.com/in/mateus-linhares-942271204' },
          { icon: <GithubIcon size={16} />, text: 'GitHub', link: 'https://github.com/MateusLinhares-Dev' },
        ].map((item, idx) => (
          item.link ? (
            <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-lg text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors text-sm">
              {item.icon} {item.text}
            </a>
          ) : (
            <span key={idx} className="flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-lg text-slate-400 text-sm">
              {item.icon} {item.text}
            </span>
          )
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-10">
        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-blue-500 rounded"></div>
          Resumo Profissional
        </h3>
        
        <div className="space-y-4 text-slate-400 text-lg leading-relaxed bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50">
          <p>
            Com 4 anos de experiência atuando no <strong className="text-blue-400 font-semibold">core da SoftExpert</strong>, sou especializado na engenharia de sistemas distribuídos e orquestração de infraestrutura na nuvem. Minha atuação foca em projetar arquiteturas orientadas a eventos (EDA) de alta resiliência, utilizando mensageria (RabbitMQ, EventBridge) e microsserviços de altíssima performance (Fastify, Node.js, Python/FastAPI).
          </p>
          <p>
            Tenho forte vivência em infraestrutura como código (IaC via AWS CDK e SAM), implementação de telemetria avançada (OpenTelemetry, Jaeger) para observabilidade de ponta a ponta, e orquestração de automações complexas (RPA) interagindo via bots.
          </p>
          <p>
            Sou obcecado por Clean Code, testes automatizados e pela cultura de DevSecOps (Docker Compose, Multi-stage builds, CI/CD). Meu objetivo é garantir que as aplicações sejam escaláveis, altamente manuteníveis, seguras e prontas para tráfego pesado.
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
        <div className="bg-gradient-to-r from-blue-900/20 to-transparent border-l-4 border-blue-500 p-6 rounded-r-xl">
          <p className="text-lg text-slate-300 italic font-light">
            "Minha maior meta é ser o alicerce que garante a tranquilidade financeira daqueles que amo!"
          </p>
        </div>
      </motion.div>
    </header>
  );
}