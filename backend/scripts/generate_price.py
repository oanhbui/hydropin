from server import app
from models import *
import json
from decimal import Decimal
from datetime import datetime, timedelta
from random import randint, uniform


def wiggle_date(real_value: datetime, min_day=-1, max_day=1) -> datetime:
    delta = randint(min_day, max_day)
    return real_value + timedelta(days=delta)


def wiggle_float(real_value: float, min_val=-1, max_val=1) -> float:
    return real_value + uniform(min_val, max_val)


def generate_price(station_id):
    templates = (
        (datetime(year=2021, month=10, day=15), 11.00),
        (datetime(year=2022, month=3, day=15), 13.00),
        (datetime(year=2022, month=7, day=15), 15.00),
        (datetime(year=2022, month=9, day=15), 19.00),
        (datetime(year=2022, month=10, day=15), 21.00),
        (datetime(year=2022, month=12, day=15), 18.00),
        (datetime(year=2023, month=12, day=15), 18.00),
        (datetime(year=2023, month=3, day=15), 23.00),
        (datetime(year=2023, month=8, day=15), 36.00),
    )
    for updated_on, price in templates:
        item = Price(station_id=station_id, price=wiggle_float(price, -3, 3), updated_on=wiggle_date(updated_on, -10, 15))
        db.session.add(item)

    db.session.commit()


def get_all_station_ids():
    return (row[0] for row in db.session.query(Station.id).all())

if __name__ == '__main__':
    connect_to_db(app)
    app.app_context().push()

    for station_id in get_all_station_ids():
        generate_price(station_id)