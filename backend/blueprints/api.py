from flask import Blueprint

api = Blueprint('api', __name__)

@api.route('/')
def index_api():
    """ Simple health check """
    return {'status': 'OK', 'version': '1.0'}