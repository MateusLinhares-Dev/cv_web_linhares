export const fetchProjects = async () => {
  const response = await fetch('/api/projetos');
  if (!response.ok) {
    throw new Error('Falha ao buscar projetos do servidor');
  }
  return response.json();
};