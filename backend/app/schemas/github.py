from pydantic import BaseModel
from typing import Optional

class Repository(BaseModel):
    name: str
    description: Optional[str]
    html_url: str
    language: Optional[str]
    stargazers_count: int