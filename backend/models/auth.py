from .base import db, BaseModel
from werkzeug.security import check_password_hash, generate_password_hash


class User(BaseModel, db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    is_verified = db.Column(db.Boolean, default=False)

    ratings = db.relationship("Rating", back_populates="user")

    def __init__(self, password: str, **kwargs):
        super().__init__(**kwargs)
        self.set_password(password)

    def __repr__(self):
        return f'<User id={self.id} email={self.email}>'

    def to_json(self):
        return {"first_name": self.first_name,
                "last_name": self.last_name,
                "user_id": self.id}

    def set_password(self, password: str) -> None:
        self.password = generate_password_hash(password)

    def verify_password(self, password: str) -> bool:
        return check_password_hash(self.password, password)
