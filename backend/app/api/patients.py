from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlmodel import Session
from app.db import get_session
from app import crud

router = APIRouter()

class PatientIn(BaseModel):
    nome: str
    telefone: str | None = None
    responsavel: str | None = None
    cpf: str | None = None
    data_nascimento: str | None = None
    valor_sessao: float | None = None
    dia_semana: str | None = None
    horario: str | None = None
    ativo: bool = True

@router.post("/")
def create_patient(patient: PatientIn):
    with get_session() as session:
        p = crud.create_patient(session, **patient.dict())
        return p

@router.get("/")
def list_patients():
    with get_session() as session:
        return crud.list_patients(session)

@router.get("/{patient_id}")
def get_patient(patient_id: int):
    with get_session() as session:
        p = crud.get_patient(session, patient_id)
        if not p:
            raise HTTPException(404, "not found")
        return p

@router.put("/{patient_id}")
def update_patient(patient_id: int, patient: PatientIn):
    with get_session() as session:
        p = crud.update_patient(session, patient_id, **patient.dict())
        if not p:
            raise HTTPException(404, "not found")
        return p

@router.delete("/{patient_id}")
def delete_patient(patient_id: int):
    with get_session() as session:
        ok = crud.delete_patient(session, patient_id)
        if not ok:
            raise HTTPException(404, "not found")
        return {"ok": True}
