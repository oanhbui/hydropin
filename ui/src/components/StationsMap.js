
import * as React from 'react';
import {useState, useMemo, useRef, useEffect} from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import { MapRef } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import StationPin from './StationPin';
import DetailSideBar from "./DetailSideBar";
import CenterPointPin from './CenterPointPin';
import * as config from "../config"

 // Set your mapbox token here

export default function StaionsMap({mapData, loggedInUser, centerPoint}) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [sidebarData, setSidebarData] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (centerPoint && mapRef) {
      mapRef.current.flyTo({
        center: centerPoint,
        essential: true,
        zoom: 11
      })
    }
  }, [centerPoint]);

  const offlinePinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
  };

  const onlinePinStyle = {
    cursor: 'pointer',
    fill: '#0078c1',
    stroke: 'none'
  };

  const otherPinStyle = {
    cursor: 'pointer',
    fill: '#feb21b',
    stroke: 'none'
  };

  const pinColor = (status) => {
    const statusColorMap = {
      'online': onlinePinStyle,
      'offline': offlinePinStyle
    }
    return statusColorMap[status] || otherPinStyle
  }

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
        <StationPin style={pinColor(station.status)} /><br/>
        {station.distance ? <Popup
            anchor="top"
            longitude={station.longitude}
            latitude={station.latitude}
            closeButton={false}
          >
            <div>
              {station.distance.toFixed(1)} miles
            </div>
          </Popup>
          : null}
      </Marker>
    )),
    [mapData]
  );


  return (
    <div className="mapbox-map">
      <Map
          ref={mapRef}
          initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 8,
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 14
        }}
        style={{width: "100%", height: 650}}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={config.MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />

        {centerPoint ? 
          <Marker 
            longitude={centerPoint[0]}
            latitude={centerPoint[1]}
            anchor='bottom'
          >
          <CenterPointPin /> 
          </Marker>
        : null
        }
        {pins}
      </Map>
      {sidebarData && (
        <DetailSideBar sidebarData={sidebarData} loggedInUser={loggedInUser} />
      )}
    </div>
  );
}