from typing import Dict
from .base import db, BaseModel

class Station(BaseModel, db.Model):

    __tablename__ = "stations"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True, )
    name = db.Column(db.String)
    image = db.Column(db.String)
    street_address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    zipcode = db.Column(db.String)
    latitude = db.Column(db.Numeric(precision=8, scale=6))
    longitude = db.Column(db.Numeric(precision=9, scale=6))
    operator = db.Column(db.String)
    operator_url = db.Column(db.String)
    status = db.Column(db.String)
    capacity = db.Column(db.Float)
    price = db.Column(db.Integer)
    cars_in_line = db.Column(db.Integer)

    ratings = db.relationship("Rating", back_populates="station")
    prices = db.relationship("Price", back_populates="station")
    availabilities = db.relationship("Availability", back_populates="station")
    queues = db.relationship("Queue", back_populates="station")

    def __init__(self, capacity: str=None, **kwarg: Dict[str, any]):
        super().__init__(**kwarg)
        self.capacity_from_str(capacity)


    def __repr__(self):
        return f'<Station id={self.id} name={self.name}>'
    
    def to_json(self):
        return {"id": self.id,
                "name": self.name,
                "image": self.image,
                "street_address": self.street_address,
                "city": self.city,
                "state": self.state,
                "zipcode": self.zipcode,
                "latitude": self.latitude,
                "longitude": self.longitude,
                "operator": self.operator,
                "operator_url": self.operator_url,
                "status": self.status,
                "capacity": self.capacity,
                "price": self.price,
                "cars_in_line": self.cars_in_line}

    def capacity_from_str(self, capacity: str):
        if capacity is None:
            self.capacity = None
            return
        try:
            self.capacity = float(capacity.split()[0])
        except ValueError:
            pass



class Rating(BaseModel, db.Model):

    __tablename__ = "ratings"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    station_id = db.Column(db.Integer, db.ForeignKey("stations.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    review = db.Column(db.String)
    score = db.Column(db.Integer)

    user = db.relationship("User", back_populates="ratings")
    station = db.relationship("Station", back_populates="ratings")

    def __repr__(self):
        return f'<Rating station_id={self.station_id} score={self.score}>'

class Price(db.Model):

    __tablename__ = "prices"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    station_id = db.Column(db.Integer, db.ForeignKey("stations.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    updated_on = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    price = db.Column(db.Integer)

    station = db.relationship("Station", back_populates="prices")

    def __repr__(self):
        return f'<Price station_id={self.station_id} score={self.score}>'

class Availability(db.Model):

    __tablename__ = "availabilities"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    station_id = db.Column(db.Integer, db.ForeignKey("stations.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    updated_on = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    status = db.Column(db.String)
    capacity = db.Column(db.Integer)

    station = db.relationship("Station", back_populates="availabilities")

    def __repr__(self):
        return f'<Availability station_id={self.station_id} status={self.status}>'

class Queue(db.Model):

    __tablename__ = "queues"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    station_id = db.Column(db.Integer, db.ForeignKey("stations.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    updated_on = db.Column(db.DateTime(timezone=True), onupdate=db.func.now())
    cars_in_line = db.Column(db.Integer)

    station = db.relationship("Station", back_populates="queues")

    def __repr__(self):
        return f'<Queue station_id={self.station_id} cars_in_line={self.cars_in_line}>'