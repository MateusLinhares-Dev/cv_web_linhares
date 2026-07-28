import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section className="max-w-3xl mx-auto my-16 px-6">
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <h2 className="text-3xl font-bold text-slate-100 mb-8 flex items-center gap-3">
          <div className="h-[2px] w-8 bg-blue-500 rounded"></div>
          Vamos conversar?
        </h2>

        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl">
          {status === 'success' ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-slate-100 mb-2">Mensagem Enviada!</h3>
              <p className="text-slate-400">Recebi seu contato e responderei o mais rápido possível.</p>
              <button onClick={() => setStatus('idle')} className="mt-6 text-blue-400 hover:text-blue-300 underline">Enviar nova mensagem</button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Nome</label>
                  <input 
                    required 
                    className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg text-slate-100 outline-none transition-all" 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">E-mail corporativo</label>
                  <input 
                    required 
                    type="email"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg text-slate-100 outline-none transition-all" 
                    placeholder="john@empresa.com" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Mensagem</label>
                <textarea 
                  required 
                  className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 p-3 rounded-lg text-slate-100 outline-none transition-all h-32 resize-none" 
                  placeholder="Como posso te ajudar?" 
                  value={formData.message} 
                  onChange={e => setFormData({...formData, message: e.target.value})} 
                />
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? 'Enviando...' : (
                  <>Enviar Mensagem <Send size={18} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}