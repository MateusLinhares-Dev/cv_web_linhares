from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import curriculo
from app.api.routes import feedback
from app.api.routes import contact

app = FastAPI(
    title="Currículo API",
    description="API para prover dados dinâmicos para o currículo web",
    version="1.0.0",
    root_path="/api"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(curriculo.router)
app.include_router(feedback.router, tags=["feedback"])
app.include_router(contact.router, tags=["contact"])

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "Motor rodando liso."}