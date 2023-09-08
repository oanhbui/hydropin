from typing import Optional
from models import db, Station

def station_list():
    return Station.query.all()