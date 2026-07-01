from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import init_db
from app.api import auth, patients

app = FastAPI(title="PsicoFlow API")

@app.on_event("startup")
def on_startup():
    init_db()

# CORS (simple, configured via env in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth")
app.include_router(patients.router, prefix="/api/patients")

@app.get("/api/health")
def health():
    return {"status":"ok"}
