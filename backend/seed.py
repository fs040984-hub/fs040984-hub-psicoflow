"""Seed script to create initial admin user."""
from app.db import init_db, get_session
from app.crud import create_user, get_user_by_email

if __name__ == '__main__':
    init_db()
    with get_session() as session:
        existing = get_user_by_email(session, 'admin@psicoflow.com')
        if existing:
            print('admin already exists')
        else:
            create_user(session, nome='Admin', email='admin@psicoflow.com', password='Senha123!', tipo='admin')
            print('admin created')
