from .base import db, BaseModel


class User(BaseModel, db.Model):

    __tablename__ = "users"

    id = db.Column(db.Integer,
                   autoincrement=True,
                   primary_key=True)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)
    salt = db.Column(db.String)
    is_verified = db.Column(db.Boolean, default=False)

    ratings = db.relationship("Rating", back_populates="user")

    def __repr__(self):
        return f'<User id={self.id} email={self.email}>'

    def to_json(self):
        return {"first_name": self.first_name,
                "last_name": self.last_name,
                "user_id": self.id}
