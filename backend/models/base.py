from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class BaseModel():
    created_on = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    updated_on = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())


def connect_to_db(flask_app: Flask):
    # db.app = flask_app
    db.init_app(flask_app)
    print('Connected to db')