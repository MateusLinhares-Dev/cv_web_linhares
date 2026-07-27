export function Header() {
  return (
    <header className="max-w-4xl mx-auto mb-12 mt-12 px-4 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
            Mateus Linhares
          </h1>
          <h2 className="text-2xl text-blue-600 font-semibold">
            Engenheiro de Software | Infraestrutura & Cloud
          </h2>
        </div>
        
        <button 
          onClick={() => window.print()}
          className="print:hidden inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg shadow-sm transition-colors duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Salvar como PDF
        </button>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600 mb-10 font-medium border-b border-gray-200 pb-6">
        <span className="flex items-center gap-1">📍 Balneário Piçarras, SC</span>
        
        <span className="flex items-center gap-1">📱 (47) 99662-3051</span>
        
        <a href="mailto:mateuslinhares16@gmail.com" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          ✉️ mateuslinhares16@gmail.com
        </a>
        
        <a href="https://linkedin.com/in/mateus-linhares-942271204" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          🔗 linkedin.com/in/mateus-linhares-942271204
        </a>

        <a href="https://github.com/MateusLinhares-Dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-gray-900 transition-colors">
          💻 github.com/MateusLinhares-Dev
        </a>
        
        <span className="flex items-center gap-1">👤 23 anos</span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
          Resumo Profissional
        </h3>
        
        <div className="space-y-4 text-gray-700 text-base leading-relaxed text-justify">
          <p>
            Com 4 anos de experiência atuando no <strong>core</strong> da SoftExpert, sou especializado na engenharia de sistemas distribuídos e orquestração de infraestrutura na nuvem. 
            Minha atuação foca em projetar arquiteturas orientadas a eventos (EDA) de alta resiliência, utilizando mensageria (RabbitMQ, EventBridge) e microsserviços de altíssima performance (Fastify, Zod, Node.js, Python).
          </p>
          
          <p>
            Tenho forte vivência em infraestrutura como código (IaC via AWS CDK e SAM), implementação de telemetria avançada (OpenTelemetry, Jaeger) para observabilidade de ponta a ponta, 
            e orquestração de automações complexas (RPA) interagindo com planilhas e scripts VBA/Macros. 
          </p>
          
          <p>
            Sou obcecado por Clean Code, testes automatizados e pela cultura de DevSecOps (orquestração via Docker Compose, <em>Multi-stage builds</em>, CI/CD). Meu objetivo é garantir que as aplicações sejam não apenas escaláveis, mas altamente manuteníveis, seguras e prontas para alto tráfego.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-8">
        <p className="text-sm text-gray-600 italic">
          "Minha maior meta é ser o alicerce que garante a tranquilidade financeira daqueles que amo!"
        </p>
      </div>
    </header>
  );
}