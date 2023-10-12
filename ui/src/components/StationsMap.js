
import * as React from 'react';
import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons';
import StationPin from './StationPin';
import DetailSideBar from "./DetailSideBar";
import CenterPointPin from './CenterPointPin';
import * as config from "../config"

// Set your mapbox token here

const Legend = React.memo(({ statusColorMap }) => {
  return <div className='color-direction container'>
    {
      Object.entries(statusColorMap).map(([status, style]) => (
        <div className='row'>
          <div className='col-3'>
            <FontAwesomeIcon icon={faMapMarker} style={{ color: style.fill }} />
          </div>
          <div className='col-9'>
            <p style={{ fontSize: "15px", }}>{status}</p>
          </div>
        </div>))
    }
  </div>
});

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

const statusColorMap = {
  'online': onlinePinStyle,
  'offline': offlinePinStyle,
  'unknown': otherPinStyle
};

export default function StaionsMap({ mapData, loggedInUser, centerPoint, handleCenterPointChange }) {
  const [sidebarData, setSidebarData] = useState(null);
  const mapRef = useRef();
  const geolocateRef = useRef();

  useEffect(() => {
    if (centerPoint && mapRef.current) {
      mapRef.current.flyTo({
        center: centerPoint,
        essential: true,
        zoom: 11
      })
    }
  }, [centerPoint]);

  useEffect(() => {
    if (!geolocateRef || !geolocateRef.current) {
      return;
    }

    const geoHandler = (data) => {
      console.log('Position', data);
      if (typeof handleCenterPointChange === 'function' && data && data.coords) {
        handleCenterPointChange(data.coords.longitude, data.coords.latitude);
      }
    }

    geolocateRef.current.on('geolocate', geoHandler);

    return () => {
      geolocateRef.current.off('geolocate', geoHandler);
    }
  }, [geolocateRef.current])

  const pinColor = useCallback((status) => {
    return statusColorMap[status] || otherPinStyle
  }, [])

  const pins = useMemo(
    () => mapData.map((station, index) => (
      <Marker
        key={`marker-${index}`}
        longitude={station.longitude}
        latitude={station.latitude}
        anchor='bottom'
        onClick={e => {
          e.originalEvent.stopPropagation();
          setSidebarData(station);
        }}
      >
        <StationPin style={pinColor(station.status)} size={sidebarData === station ? '3em' : '2em'}/><br />
        {station.distance ? <Popup
          anchor="top"
          longitude={station.longitude}
          latitude={station.latitude}
          closeButton={false}
        >
          <div className="popup-distance">
            {station.distance.toFixed(1)} miles
          </div>
        </Popup>
          : null}
      </Marker>
    )),
    [mapData, sidebarData]
  );


  return (
    <>
    <div className='map-anchor' id="map"></div>
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
        style={{ width: "100%", height: "90vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={config.MAPBOX_TOKEN}
      >
        <GeolocateControl position="top-right" ref={geolocateRef}/>
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

        <DetailSideBar sidebarData={sidebarData} loggedInUser={loggedInUser} />

        <Legend statusColorMap={statusColorMap} />
      </Map>
    </div>
    </>
    
  );
}