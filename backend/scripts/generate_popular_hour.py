from server import app
from models import *
import json
from decimal import Decimal
from datetime import datetime, timedelta
from random import randint, uniform, choice, choices, randrange

def make_weights(template, min_val, max_val, min_delta = 1, max_delta = 2):
    size = max_val - min_val + 1
    weights = [1] * size
    for hot_point, left, right in template:
        if left > 0:
            left = -left
        mid = hot_point - min_val
        weights[mid] = 10
        for i in range(mid - 1, -1, -1):
            if weights[i] != 1:
                continue
            if i >= mid + left:
                weights[i] = max(1, weights[i + 1] - min_delta)
            else:
                weights[i] = max(1, weights[i + 1] - max_delta)

        for i in range(mid + 1, size):
            if weights[i] != 1:
                continue
            if i <= mid + right:
                weights[i] = max(1, weights[i - 1] - min_delta)
            else:
                weights[i] = max(1, weights[i - 1] - max_delta)

    return weights


def random_date(start, end):
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return start + timedelta(seconds=random_second)


def generate_popular_hour(station_id):
    start_date = datetime(year=2023, month=1, day=1)
    end_date = datetime.today()
    open_hours = (6, 23)
    busiest_hours = ( # (top_hour, span left, span right) <- used to generate (fake) curve, span left must be negative
        ((12, -3, 3), ),
        ((13, -2, 3), ),
        ((15, -2, 2), ),
        ((10, -2, 2), (21, -1, 1)),
        ((18, -2, 2), ),
        ((9, -2, 2), ),
    )
    selected_template = choice(busiest_hours)
    start, end = open_hours
    hours = list(range(start, end + 1))
    weights = make_weights(selected_template, start, end)
    for hour in choices(hours, weights=weights, k=1000):
        date = random_date(start_date, end_date)
        date = date.replace(hour=hour)
        queue = Queue(station_id=station_id, updated_on=date, cars_in_line=choice((1, 7)))
        db.session.add(queue)

    db.session.commit()


def get_all_station_ids():
    return [row[0] for row in db.session.query(Station.id).all()]

if __name__ == '__main__':
    connect_to_db(app)
    app.app_context().push()

    for station_id in get_all_station_ids():
        generate_popular_hour(station_id)
