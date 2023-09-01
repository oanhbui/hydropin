from server import app
from models import *
import json
from decimal import Decimal

if __name__ == '__main__':
    connect_to_db(app)
    app.app_context().push()
    f = open("/Users/oanhbui/src/stations.json", "r")
    data = json.load(f)
    for key, value in data.items():
        station = Station(id=int(key),
                          name=value["title"],
                          image=value["image"],
                          street_address=value["street_address"],
                          city=value["city"],
                          state=value["state"],
                          zipcode=value["zipcode"],
                          latitude=Decimal(value["latitude"]),
                          longitude=Decimal(value["longitude"]),
                          operator=value["operator"],
                          operator_url=value["operator_url"],
                          status=value["h70_status"],
                          capacity=value["h70_capacity"]
                          )
        db.session.add(station)
    db.session.commit()
