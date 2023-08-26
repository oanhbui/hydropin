from typing import Optional
from models import User, db
from werkzeug.security import check_password_hash, generate_password_hash

def get_user_by_email(email: str) -> Optional[User]:
    return User.query.filter(User.email == email).first()

def verify_user(email: str, password: str) -> Optional[User]:
    user = get_user_by_email(email)
    if user is not None and check_password_hash(user.password, password):
        return user
    return None

def create_user(first_name: str, last_name: str, email: str, password: str) -> User:
    save_password = generate_password_hash(password)
    user = User(first_name=first_name,
                last_name=last_name,
                email=email,
                password=save_password)
    db.session.add(user)
    db.session.commit()
    return user