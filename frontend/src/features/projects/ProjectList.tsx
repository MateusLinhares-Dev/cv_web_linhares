import { useProjects } from '../../hooks/useProjects';

export function ProjectList() {
  const { projects, loading, error } = useProjects();

  if (loading) return <p className="text-gray-500">Carregando infraestrutura e projetos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-4">Projetos em Destaque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((repo) => (
          <div key={repo.name} className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold text-blue-600">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            </h3>
            <p className="text-gray-600 mt-2">{repo.description || 'Sem descrição'}</p>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{repo.language && `Tech: ${repo.language}`}</span>
              <span>⭐ {repo.stargazers_count}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}