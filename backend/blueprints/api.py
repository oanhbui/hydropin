from flask import Blueprint
from services import stations as stations

api = Blueprint('api', __name__)

@api.route('/stations')
def station_list_api():
    station_list = [station.to_json() for station in stations.station_list()]
    return {'stations': station_list}