from pydantic import BaseModel, EmailStr, Field

class ContactForm(BaseModel):
    name: str = Field(
        ..., 
        min_length=2, 
        max_length=80, 
        pattern=r"^[a-zA-ZÀ-ÿ\s]+$",
        description="Apenas letras e espaços, no máximo 80 caracteres."
    )
    email: EmailStr = Field(..., description="Validação nativa de formato de e-mail.")
    message: str = Field(
        ..., 
        min_length=10, 
        max_length=1500, 
        description="Mensagem restrita a 1500 caracteres para evitar buffer overflow."
    )
    cf_token: str = Field(..., description="Token gerado pelo Cloudflare Turnstile no Frontend")