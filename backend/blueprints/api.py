from http import HTTPStatus
from flask import Blueprint, request, session
from services import stations as stations
from decimal import Decimal

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
    from time import sleep
    sleep(2)
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
