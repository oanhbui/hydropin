from typing import Optional
from models import User, db

def get_user_by_email(email: str) -> Optional[User]:
    return User.query.filter(User.email == email).first()

def verify_user(email: str, password: str) -> Optional[User]:
    user = get_user_by_email(email)
    if user is not None and user.verify_password(password):
        return user
    return None

def create_user(first_name: str, last_name: str, email: str, password: str) -> User:
    user = User(first_name=first_name,
                last_name=last_name,
                email=email,
                password=password)
    db.session.add(user)
    db.session.commit()
    return user