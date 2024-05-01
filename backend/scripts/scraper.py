import json
import requests
from random import random
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

H2FCP_URL = "https://h2fcp.org"
H2FCP_MAP_URL = f"{H2FCP_URL}/stationmap"
MAX_WORKERS = 4

STATION_SCHEMA = {
    "id": None,
    "title": None,
    "h2fcp_url": None,
    "image": None,
    "street_address": None,
    "city": None,
    "state": None,
    "zipcode": None,
    "latitude": None,
    "longitude": None,
    "operator": None,
    "operator_url": None,
    "h70_status": None,
    "h35_status": None,
    "h70_capacity": None,
    "h35_capacity": None,
}

STATUSES = {
    1: "online",
    2: "limited",
    3: "offline",
    4: "unknown",
    5: "offhours",
    6: "refreshing",
}


def h2fcp_stations():
    r = requests.get(H2FCP_MAP_URL)
    r.raise_for_status()

    stations = {}

    body = BeautifulSoup(r.content, "html.parser")
    station_list_el = body.select_one("div#station-list")
    if not station_list_el:
        raise Exception("Unable to find station list #station-list")

    for station_el in station_list_el.select("div[data-station]"):
        station_id = station_el.attrs["data-station"]
        station = STATION_SCHEMA.copy()
        station["id"] = station_id
        # Image & Url
        a_img = station_el.select_one("div.views-field-field-station-image a")
        if a_img:
            station["h2fcp_url"] = f'{H2FCP_URL}{a_img.attrs["href"]}'
            img = a_img.find("img")
            if img:
                station["image"] = img.attrs["src"]

        # Title
        a_title = station_el.select_one("div.views-field-title a")
        if a_title:
            station["h2fcp_url"] = f'{H2FCP_URL}{a_title.attrs["href"]}'
            station["title"] = a_title.get_text(strip=True)

        stations[station_id] = station
    return stations


def enrich_station(station):
    station_id = station["id"]
    r = requests.get(f"{H2FCP_URL}/cafcp-station-details/{station_id}")
    if r.status_code != 200:
        print(f"Could not fetch data for station #{station_id}. {r.content}")

    data = r.json()
    if "location" in data:
        station["street_address"] = data["location"].get("street")
        station["city"] = data["location"].get("city")
        station["state"] = data["location"].get("province")
        station["zipcode"] = data["location"].get("postal_code")
        station["latitude"] = data["location"].get("latitude")
        station["longitude"] = data["location"].get("longitude")

    html = BeautifulSoup(data["node_view"], "html.parser")

    operator_el = html.select_one('td:-soup-contains("Station Operator")')
    if operator_el:
        station["operator"] = operator_el.nextSibling.get_text(strip=True)

    operator_site_el = html.select_one('td:-soup-contains("Station Website")')
    if operator_site_el:
        station["operator_url"] = operator_site_el.nextSibling.find("a").attrs["href"]


def enrich_stations(stations):
    print("Enriching station data")
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        executor.map(enrich_station, stations.values())

    print("Done enrich")
    return stations


def update_stations_status(stations):
    r = requests.get(
        f"{H2FCP_URL}/nocache/soss2-status-mini.json?_={random()}",
        headers={"Cache-Control": "no-cache", "Pragma": "no-cache"},
    )
    r.raise_for_status()
    data = r.json()
    for item in data:
        station = item['n']
        station_id = station['s']
        if station_id in stations:
            stations[station_id].update({
                "h70_status": STATUSES.get(station['s7'], 'unknown'),
                "h35_status": STATUSES.get(station['s3'], 'unknown'),
                "h70_capacity": station['c7'],
                "h35_capacity": station['c3'],
            })


if __name__ == "__main__":
    stations = h2fcp_stations()
    enrich_stations(stations)
    update_stations_status(stations)
    print(stations)
    with open('stations.json', 'w') as f:
        json.dump(stations, f)
