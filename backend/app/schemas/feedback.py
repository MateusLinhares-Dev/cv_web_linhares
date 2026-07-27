from pydantic import BaseModel, Field

class TokenCreate(BaseModel):
    colleague_name: str = Field(..., max_length=100)

class FeedbackCreate(BaseModel):
    author: str = Field(..., max_length=100)
    role: str = Field(..., max_length=100)
    message: str = Field(..., max_length=1000)

class FeedbackResponse(BaseModel):
    author: str
    role: str
    message: str