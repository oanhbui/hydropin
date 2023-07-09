from flask import Blueprint

health_page = Blueprint('health', __name__)

@health_page.route('/')
def health_check():
    """ Simple health check """
    return {'status': 'OK'}