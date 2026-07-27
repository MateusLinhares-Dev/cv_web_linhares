import { useState, useEffect } from 'react';

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isForm, setIsForm] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [hash, setHash] = useState('');
  const [formData, setFormData] = useState({ author: '', role: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenUrl = params.get('hash');
    
    if (tokenUrl) {
      setIsForm(true);
      setHash(tokenUrl);
      fetch(`/api/tokens/${tokenUrl}`)
        .then(res => {
          if (res.ok) setIsValidToken(true);
        })
        .catch(() => setIsValidToken(false));
    } else {
      fetch('/api/feedbacks')
        .then(res => res.json())
        .then(data => setFeedbacks(data))
        .catch(() => setFeedbacks([]));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/feedbacks?token_hash=${hash}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) setSubmitted(true);
  };

  if (isForm) {
    if (submitted) return <div className="p-8 text-center text-green-600 font-bold">Feedback enviado!</div>;
    if (!isValidToken) return <div className="p-8 text-center text-red-600 font-bold">Link inválido ou expirado.</div>;
    
    return (
      <section className="my-8 max-w-2xl mx-auto border border-gray-200 p-6 rounded-lg bg-white">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Deixar Recomendação</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Seu Nome" className="w-full border border-gray-300 p-2 rounded text-gray-900" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
          <input required placeholder="Seu Cargo" className="w-full border border-gray-300 p-2 rounded text-gray-900" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
          <textarea required placeholder="Sua recomendação..." className="w-full border border-gray-300 p-2 rounded h-32 text-gray-900" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-bold hover:bg-blue-700 w-full">Enviar</button>
        </form>
      </section>
    );
  }

  if (feedbacks.length === 0) return null;

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b border-gray-300 pb-2">Recomendações</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {feedbacks.map((f, i) => (
          <div key={i} className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <p className="text-gray-700 italic mb-4 leading-relaxed">"{f.message}"</p>
            <p className="font-bold text-gray-900">{f.author}</p>
            <p className="text-sm text-gray-600">{f.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}