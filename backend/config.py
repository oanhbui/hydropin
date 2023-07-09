import os

class DefaultConfig(object):
    HOST = '0.0.0.0'
    PORT = 8000
    DEBUG = False
    DEVELOPMENT = False
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'do not tell anyone')
    STATIC_URL = ''


class DevelopmentConfig(DefaultConfig):
    DEBUG = True
    DEVELOPMENT = True
    STATIC_URL = 'http://localhost:3000'


class ProductionConfig(DefaultConfig):
    pass