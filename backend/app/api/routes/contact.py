import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, BackgroundTasks, HTTPException
from app.schemas.contact import ContactForm

router = APIRouter()

def send_email_task(name: str, user_email: str, message: str):
    sender_email = os.getenv("EMAIL_USER")
    sender_password = os.getenv("EMAIL_APP_PASSWORD")
    receiver_email = os.getenv("EMAIL_RECEIVER")

    if not sender_email or not sender_password:
        print("🚨 ERRO: As variáveis de ambiente do e-mail (EMAIL_USER ou EMAIL_APP_PASSWORD) NÃO foram carregadas!")
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
async def send_contact(form_data: ContactForm, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(send_email_task, form_data.name, form_data.email, form_data.message)
        return {"status": "success"}
    except Exception as e:
        print(f"🚨 ERRO na rota /contact: {e}")
        raise HTTPException(status_code=500, detail="Erro interno")