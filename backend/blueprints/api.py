from http import HTTPStatus
from flask import Blueprint, request, session, current_app
from services import stations as stations
from decimal import Decimal
import requests

api = Blueprint('api', __name__)

@api.route('/stations')
def station_list_api():
    station_list = [station.to_json() for station in stations.station_list()]
    latitude = request.args.get("lat", type=Decimal)
    longitude = request.args.get("long", type=Decimal)
    if latitude and longitude:
        center_point = [latitude, longitude]
        station_list = stations.sort_by_distance(center_point, station_list)
    return {'stations': station_list}

@api.route('/stations/<int:station_id>/reviews')
def review_list_api(station_id):
    return {
        'reviews': stations.reviews_list(station_id),
        'average': stations.average_score(station_id)
    }

@api.route('/stations/<int:station_id>/reviews', methods=["POST"])
def post_review(station_id):
    user = session.get("user")
    if not user:
        return {'error': True, 'message': 'Login to post a review!'}, HTTPStatus.UNAUTHORIZED
    user_id = user["user_id"]
    request_body = request.json
    review = request_body["review"]
    score = request_body["score"]
    review = stations.create_review(station_id, user_id, review, score)
    return {'review': review.to_json()}

@api.route('/stations/<int:station_id>/prices')
def price_history(station_id):
    price_history = stations.get_price_history(station_id)
    return {"price_history": price_history}

@api.route('/stations/<int:station_id>/queue')
def queue_history(station_id):
    queue_history = stations.get_queue_history(station_id)
    return {"queue_history": queue_history}


@api.route('/news')
def get_news():
    params = request.args.to_dict()
    params['apiKey'] = current_app.config['NEWS_API_KEY']
    response = requests.get('https://newsapi.org/v2/everything', params=params)
    return response.json()