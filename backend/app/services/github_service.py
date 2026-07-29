import httpx
import os
from app.schemas.github import Repository

class GitHubService:
    def __init__(self):
        self.username = "MateusLinhares-Dev"
        self.base_url = f"https://api.github.com/users/{self.username}/repos"
        self.github_token = os.getenv("GITHUB_TOKEN")

    async def fetch_recent_repos(self) -> list[Repository]:
        headers = {}
        if self.github_token:
            headers["Authorization"] = f"Bearer {self.github_token}"

        repos_desejados = {
            "projeto-cdk": "Arquitetura Serverless orquestrada em AWS CDK com WebSockets e EventBridge.",
            "chatbot_ia": "Agente de IA construído com Flask e LangChain (Groq/Mixtral) para orquestração de workflows dinâmicos.",
            "site-pets-refactoring": "Refatoração de sistema legado aplicando Clean Code e componentização.",
            "microservicesVideo": "Ecossistema de microsserviços instrumentado com OpenTelemetry e Contratos."
        }

        async with httpx.AsyncClient() as client:
            response = await client.get(f"{self.base_url}?sort=updated&per_page=30", headers=headers)
            response.raise_for_status()
            
            data = response.json()
            repos_filtrados = []
            
            for repo in data:
                if repo["name"] in repos_desejados:
                    repo["description"] = repos_desejados[repo["name"]]
                    repos_filtrados.append(repo)
                    
            return [Repository(**repo) for repo in repos_filtrados]