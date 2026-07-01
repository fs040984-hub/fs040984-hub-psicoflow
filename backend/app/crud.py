from typing import List
from sqlmodel import Session, select
from app.db import engine
from app.models import User, Patient
from app.core.security import hash_password

def get_user_by_email(session: Session, email: str):
    return session.exec(select(User).where(User.email == email)).first()

def create_user(session: Session, nome: str, email: str, password: str, tipo: str = "admin"):
    user = User(nome=nome, email=email, password_hash=hash_password(password), tipo=tipo)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user

# Patients

def create_patient(session: Session, **data):
    patient = Patient(**data)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient

def list_patients(session: Session, limit: int = 100):
    return session.exec(select(Patient).limit(limit)).all()

def get_patient(session: Session, patient_id: int):
    return session.get(Patient, patient_id)

def update_patient(session: Session, patient_id: int, **data):
    patient = session.get(Patient, patient_id)
    if not patient:
        return None
    for k,v in data.items():
        setattr(patient, k, v)
    session.add(patient)
    session.commit()
    session.refresh(patient)
    return patient

def delete_patient(session: Session, patient_id: int):
    patient = session.get(Patient, patient_id)
    if not patient:
        return False
    session.delete(patient)
    session.commit()
    return True
