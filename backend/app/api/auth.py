from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlmodel import Session
from app.db import get_session
from app.core.security import verify_password, create_access_token
from app.models import User
from app import crud

router = APIRouter()

class LoginIn(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginIn):
    with get_session() as session:
        user = session.exec((User.__table__).select().where(User.email==data.email)).first()
        # fallback to crud method
        if not user:
            user = crud.get_user_by_email(session, data.email)
        if not user or not verify_password(data.password, user.password_hash):
            raise HTTPException(status_code=401, detail="Invalid credentials")
        token = create_access_token({"sub": user.email, "user_id": user.id})
        return {"access_token": token, "token_type": "bearer", "user": {"email": user.email, "nome": user.nome, "tipo": user.tipo}}
