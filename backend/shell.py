""" Interactive shell """
from flask_migrate import Migrate
from server import app
from models import *



connect_to_db(app)
migrate = Migrate(app, db)
app.app_context().push()