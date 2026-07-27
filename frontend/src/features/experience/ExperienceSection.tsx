export function ExperienceSection() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Experiência Profissional</h2>
      
      <div className="mb-8">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="text-2xl font-bold text-gray-800">Engenheiro de Software I</h3>
          <span className="text-gray-500 text-sm">4 anos</span>
        </div>
        
        <h4 className="text-lg text-blue-600 font-semibold mb-4">SoftExpert</h4>
        
        <p className="text-gray-700 mb-6 leading-relaxed">
          Atuação direta na engenharia e manutenção de sistemas empresariais complexos, priorizando arquiteturas escaláveis, observabilidade, automação de processos e disseminação da cultura de Clean Code.
        </p>
        
        <ul className="list-disc list-outside ml-5 text-gray-700 space-y-3 leading-relaxed">
          <li>
            <strong className="text-gray-900">Arquitetura & APIs:</strong> Desenvolvimento de APIs em Node.js e Python, aplicando práticas de TDD e documentação via Swagger/OpenAPI para definição rigorosa de contratos. Engenharia de arquitetura de webhooks em FastAPI focada em desacoplamento e processamento assíncrono em filas (background tasks).
          </li>
          <li>
            <strong className="text-gray-900">Cloud & Serverless:</strong> Criação e manutenção de arquiteturas Serverless orientadas a eventos utilizando AWS SAM. Provisionamento de infraestrutura como código (IaC) via templates padronizados, orquestrando integrações modulares entre API Gateway e funções Lambda.
          </li>
          <li>
            <strong className="text-gray-900">Automação & RPA:</strong> Desenvolvimento de robôs de automação de processos (RPA) em Python focados em eficiência e redução de tarefas manuais operacionais, interagindo diretamente com rotinas de planilhas locais e botões de Macro (VBA).
          </li>
          <li>
            <strong className="text-gray-900">IA & Chatbots:</strong> Desenvolvimento de chatbots corporativos utilizando Microsoft Bot Framework (BotBuilder) com integração nativa ao Microsoft Teams. Implementação de arquitetura <span className="italic">stateful</span> para gestão fluida de contexto conversacional e persistência de dados no Azure Blob Storage.
          </li>
          <li>
            <strong className="text-gray-900">Fullstack & Segurança:</strong> Criação de dashboards analíticos integrando backend Python e frontend React. Implementação de utilitários de segurança e formulários de configuração em instâncias Amazon EC2 isoladas com proxy reverso Nginx.
          </li>
          <li>
            <strong className="text-gray-900">Banco de Dados:</strong> Refatoração profunda de lógicas de relatórios e consultas, otimizando funções agregadoras para somas globais e aplicando delimitações estritas de mês civil para garantir a máxima performance e precisão na extração de dados.
          </li>
        </ul>
      </div>
    </section>
  );
}