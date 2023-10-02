import os

class DefaultConfig(object):
    HOST = '0.0.0.0'
    PORT = 8000
    DEBUG = False
    DEVELOPMENT = False
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY', 'do not tell anyone')
    STATIC_URL = ''

    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI', 'postgresql:///hydropin')
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SESSION_COOKIE_NAME = 'flask_ss'

    NEWS_API_KEY = os.environ.get('NEWS_API_KEY', 'd132d879457741588afe3ce536829c03')

class DevelopmentConfig(DefaultConfig):
    DEBUG = True
    DEVELOPMENT = True
    STATIC_URL = 'http://localhost:3000'
    # SESSION_COOKIE_HTTPONLY = False


class ProductionConfig(DefaultConfig):
    pass