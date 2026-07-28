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
        return

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = f"Nova Mensagem do Portfólio: {name}"

    body = f"Nome: {name}\nE-mail: {user_email}\n\nMensagem:\n{message}"
    
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
    except Exception:
        pass

@router.post("/contact")
async def send_contact(form_data: ContactForm, background_tasks: BackgroundTasks):
    try:
        background_tasks.add_task(send_email_task, form_data.name, form_data.email, form_data.message)
        return {"status": "success"}
    except Exception:
        raise HTTPException(status_code=500, detail="Erro interno")