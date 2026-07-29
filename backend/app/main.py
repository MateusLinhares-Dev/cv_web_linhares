from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import curriculo
from app.api.routes import feedback
from app.api.routes import contact
from app.core.tracing import setup_tracing
from app.core.limiter import limiter
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

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
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

setup_tracing(app)

app.include_router(curriculo.router)
app.include_router(feedback.router, tags=["feedback"])
app.include_router(contact.router, tags=["contact"])

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "Motor rodando liso."}