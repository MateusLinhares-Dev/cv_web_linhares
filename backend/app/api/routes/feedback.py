import os
from fastapi import APIRouter, HTTPException, Header, Depends
from app.schemas.feedback import TokenCreate, FeedbackCreate, FeedbackResponse
from app.services import feedback_service

router = APIRouter()

ADMIN_SECRET = os.environ.get("ADMIN_API_KEY", "senha_super_secreta")

def verify_admin(x_api_key: str = Header(...)):
    if x_api_key != ADMIN_SECRET:
        raise HTTPException(status_code=401, detail="Acesso negado. Credencial inválida.")

@router.post("/admin/tokens", dependencies=[Depends(verify_admin)])
def create_token(data: TokenCreate):
    token = feedback_service.generate_token(data.colleague_name)
    return {"hash": token}

@router.get("/tokens/{token_hash}")
def check_token(token_hash: str):
    if not feedback_service.validate_token(token_hash):
        raise HTTPException(status_code=400, detail="Token invalido")
    return {"valid": True}

@router.post("/feedbacks")
def submit_feedback(token_hash: str, data: FeedbackCreate):
    if not feedback_service.create_feedback(token_hash, data.author, data.role, data.message):
        raise HTTPException(status_code=400, detail="Token invalido")
    return {"message": "Success"}

@router.get("/feedbacks", response_model=list[FeedbackResponse])
def list_feedbacks():
    return feedback_service.get_visible_feedbacks()