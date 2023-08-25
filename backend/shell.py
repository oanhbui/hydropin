""" Interactive shell """
from server import app
from models import *

if __name__ == '__main__':
    connect_to_db(app)
    app.app_context().push()