from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    email: str = Field(index=True)
    password_hash: str
    tipo: str = "admin"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class Patient(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nome: str
    telefone: Optional[str] = None
    responsavel: Optional[str] = None
    cpf: Optional[str] = None
    data_nascimento: Optional[str] = None
    valor_sessao: Optional[float] = None
    dia_semana: Optional[str] = None
    horario: Optional[str] = None
    ativo: bool = True
    created_by: Optional[int] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
