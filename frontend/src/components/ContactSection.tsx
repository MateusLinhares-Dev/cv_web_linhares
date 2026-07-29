import { useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [cfToken, setCfToken] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const apiUrl = import.meta.env.VITE_API_URL || 'https://linharescvweb.com.br/api';
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cfToken) {
      alert("⚠️ Aguarde a verificação de segurança (Anti-Bot).");
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          cf_token: cfToken
        }),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar a mensagem.');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setCfToken('');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#020617]">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-white">Vamos conversar?</h2>
        
        {status === 'success' ? (
          <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-500 text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Mensagem Enviada!</h3>
            <p className="text-slate-400 mb-6">Recebi seu contato e responderei o mais rápido possível.</p>
            <button 
              onClick={() => setStatus('idle')}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Enviar nova mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nome</label>
              <input
                id="name"
                type="text"
                required
                minLength={2}
                maxLength={80}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">E-mail</label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Mensagem</label>
              <textarea
                id="message"
                required
                minLength={10}
                maxLength={1500}
                rows={5}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white transition-all resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="flex justify-center">
              <Turnstile
                siteKey={siteKey}
                options={{
                  theme: 'dark',
                  language: 'pt-br',
                }}
                onSuccess={(token) => setCfToken(token)}
                onError={() => setStatus('error')}
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">
                Ocorreu um erro. Verifique sua conexão ou tente novamente mais tarde.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || !cfToken}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-lg transition-all"
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}