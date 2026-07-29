import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.api.routes import curriculo, feedback, contact
from app.core.tracing import setup_tracing
from app.core.limiter import limiter

app = FastAPI(
    title="Currículo API",
    description="API blindada para o currículo web",
    version="1.0.0",
    root_path="/api"
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

ENVIRONMENT = os.getenv("ENVIRONMENT", "production")

if ENVIRONMENT == "development":
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
else:
    origins = [
        "https://linharescvweb.com.br",
        "https://www.linharescvweb.com.br",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

setup_tracing(app)

app.include_router(curriculo.router)
app.include_router(feedback.router, tags=["feedback"])
app.include_router(contact.router, tags=["contact"])

@app.get("/health")
def health_check():
    return {"status": "OK", "message": "Motor rodando liso."}