import os
import uuid
import ssl

ssl._create_default_https_context = ssl._create_unverified_context
from supabase import create_client, Client


SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Credenciais do Supabase ausentes no ambiente.")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def generate_token(colleague_name: str) -> str:
    token_hash = str(uuid.uuid4())
    supabase.table("tokens").insert({
        "hash": token_hash,
        "colleague_name": colleague_name,
        "is_used": False
    }).execute()
    return token_hash

def validate_token(token_hash: str) -> bool:
    response = supabase.table("tokens").select("*").eq("hash", token_hash).execute()
    if not response.data:
        return False
    token_data = response.data[0]
    if token_data.get("is_used"):
        return False
    return True

def create_feedback(token_hash: str, author: str, role: str, message: str) -> bool:
    if not validate_token(token_hash):
        return False
    
    supabase.table("feedbacks").insert({
        "author": author,
        "role": role,
        "message": message,
        "is_visible": True
    }).execute()
    
    supabase.table("tokens").update({"is_used": True}).eq("hash", token_hash).execute()
    return True

def get_visible_feedbacks() -> list[dict]:
    response = supabase.table("feedbacks").select("*").eq("is_visible", True).execute()
    return response.data