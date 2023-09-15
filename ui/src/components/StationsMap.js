
import * as React from 'react';
import {useState, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Pin from './pin';
import DetailSideBar from "./DetailSideBar";


const TOKEN = "pk.eyJ1Ijoib2FuaC1idWkiLCJhIjoiY2xtMDN2MnhzMWxjNDNlbWRjOWpvZDQ5cCJ9.69n3gal5uW-vgtiaLqjYCA"; // Set your mapbox token here

export default function StaionsMap({mapData}) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);

  const pins = useMemo(
    () => mapData.map((station, index) => (
      <Marker 
        key={`marker-${index}`}
        longitude={station.longitude}
        latitude={station.latitude}
        anchor='bottom'
        onClick={ e => {
          e.originalEvent.stopPropagation();
          setSidebarData(station);
        }}
      >
        <Pin /> 
      </Marker>
    )),
    [mapData]
  );


  return (
    <div className="mapbox-map">
      <Map
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 8,
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 14
        }}
        style={{width: "100%", height: 650}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />

        {pins}

        {/* {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.name}, {popupInfo.zipcode}
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}; */}
      </Map>
      {sidebarData && (
        <DetailSideBar sidebarData={sidebarData} />
      )}
    </div>
  );
}