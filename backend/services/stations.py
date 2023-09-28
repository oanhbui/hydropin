from typing import Optional
from models import db, Station, User, Rating, Price, Availability, Queue
from sqlalchemy import func
import math
from decimal import Decimal

def deg_to_rad(deg): 
    return deg * Decimal(math.pi/180)

def distance(point1, point2):
    [lat1, lon1] = point1
    [lat2, lon2] = point2
    R = 3958.756
    dLat = deg_to_rad(lat2 - lat1)
    dLon = deg_to_rad(lon2 - lon1)
    a = math.sin(dLat / 2) * math.sin(dLat/2) + math.cos(deg_to_rad(lat1)) * math.cos(deg_to_rad(lat2)) * math.sin(dLon/2) * math.sin(dLon/2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a)); 
    d = R * c
    return d

def sort_by_distance(point, stations, size=5):
    result = []
    for station in stations:
        sta_lat = station['latitude']
        sta_lon = station['longitude']
        station = station.copy()
        station['distance'] = distance(point, [sta_lat, sta_lon])
        result.append(station)
    result.sort(key=lambda station: station['distance'])
    return result[:size]


def station_list():
    return Station.query.all()

def reviews_list(station_id):
    reviews_tuple = db.session.query(User.first_name, User.last_name, 
                            Rating.review, Rating.score, Rating.updated_on).join(Rating).filter(
                                Rating.station_id == station_id
                            ).all()
    reviews = []
    for first_name, last_name, review, score, updated_on in reviews_tuple:
        review = {"first_name": first_name,
                  "last_name": last_name,
                  "review": review,
                  "score": score,
                  "updated_on": updated_on}
        reviews.append(review)
    return reviews

def create_review(station_id, user_id, review, score):
    review = Rating(station_id=station_id,
                    user_id=user_id,
                    review=review,
                    score=score)
    db.session.add(review)
    db.session.commit()
    return review

def average_score(station_id):
    avg_score = db.session.query(func.avg(Rating.score)).filter(Rating.station_id == station_id).first()
    if avg_score:
        return avg_score[0]
    return None

def get_price_history(station_id):
    price_history = db.session.query(Price.price, Price.updated_on).filter(Price.station_id == station_id).all()
    history = []
    for price, updated_on in price_history:
        update = {"price": price,
                  "updated_on": updated_on.strftime('%m/%y')}
        history.append(update)
    return history