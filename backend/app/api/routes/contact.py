import os
import smtplib
import httpx
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, BackgroundTasks, HTTPException, Request
from app.schemas.contact import ContactForm
from app.core.limiter import limiter

router = APIRouter()

async def verify_turnstile(token: str, ip: str) -> bool:
    """Bate na API da Cloudflare para confirmar se o token do frontend é válido."""
    secret_key = os.getenv("TURNSTILE_SECRET_KEY")
    
    if not secret_key:
        print("⚠️ Aviso: TURNSTILE_SECRET_KEY não configurada. Ignorando validação (Apenas DEV).")
        return True 

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                "https://challenges.cloudflare.com/turnstile/v0/siteverify",
                data={
                    "secret": secret_key,
                    "response": token,
                    "remoteip": ip
                },
                timeout=5.0
            )
            result = response.json()
            return result.get("success", False)
        except Exception as e:
            print(f"🚨 ERRO ao conectar na Cloudflare: {e}")
            return False

def send_email_task(name: str, user_email: str, message: str):
    """Monta o payload do SMTP e dispara pelo Google."""
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_APP_PASSWORD")
    receiver_email = os.getenv("EMAIL_RECEIVER")

    if not sender_email or not sender_password:
        print("🚨 ERRO: As variáveis de ambiente do e-mail NÃO foram carregadas!")
        return

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"Nova Mensagem do Portfólio: {name}"

    body = f"Nome: {name}\nE-mail: {user_email}\n\nMensagem:\n{message}"
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        print(f"⏳ Tentando enviar e-mail de {sender_email} para {receiver_email}...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print("✅ E-mail enviado com sucesso!")
    except Exception as e:
        print(f"🚨 ERRO SMTP ao enviar e-mail: {e}")

@router.post("/contact")
@limiter.limit("3/minute")
async def send_contact(request: Request, form_data: ContactForm, background_tasks: BackgroundTasks):
    """Rota principal blindada com Limiter e Anti-Bot."""
    
    client_ip = request.client.host if request.client else "127.0.0.1"
    
    is_human = await verify_turnstile(form_data.cf_token, client_ip)
    if not is_human:
        print(f"🚨 BOT BLOQUEADO: Falha no Turnstile. IP: {client_ip}")
        raise HTTPException(status_code=403, detail="Falha na verificação de segurança (Anti-Bot).")

    try:
        background_tasks.add_task(send_email_task, form_data.name, form_data.email, form_data.message)
        return {"status": "success", "message": "Mensagem na fila de envio."}
    except Exception as e:
        print(f"🚨 ERRO na rota /contact: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao processar contato.")