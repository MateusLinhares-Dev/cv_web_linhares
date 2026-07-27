from fastapi import APIRouter, HTTPException
from app.services.github_service import GitHubService
from app.schemas.github import Repository

router = APIRouter()
github_service = GitHubService()

@router.get("/projetos", response_model=list[Repository])
async def get_projetos():
    try:
        repos = await github_service.fetch_recent_repos()
        return repos
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao buscar dados do GitHub")