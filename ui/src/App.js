import logo from './logo.svg';
import NavBar from './components/NavBar';
import StaionsMap from './components/StationsMap';
import { useState, useEffect } from 'react';
import * as API from './api';
import './App.css';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mapData, setMapData] = useState([]);
  const [centerPoint, setCenterPoint] = useState(null);

  const handleCenterPointChange = (long, lat) => {
    setCenterPoint([long, lat])
  };

  useEffect(() => {
    (async () => {
      const data = await API.currentSession();
      if (data.user) {
        setLoggedInUser(data.user)
      }
    })()
  }, []);

  useEffect(() => {
    (async () => {
      const data = await API.stations(centerPoint);
      setMapData(data.stations)
    })()
  }, [centerPoint])
  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} handleCenterPointChange={handleCenterPointChange} />
      <StaionsMap mapData={mapData} loggedInUser={loggedInUser} centerPoint={centerPoint} />
    </div>
  );
}

export default App;
