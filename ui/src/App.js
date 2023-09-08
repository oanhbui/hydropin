import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import StaionsMap from './components/StationsMap';
import { useState, useEffect } from 'react';
import * as API from './api';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [mapData, setMapData] = useState([]);
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
      const data = await API.stations();
      setMapData(data.stations)
    })()
  }, [])
  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <StaionsMap mapData={mapData} />
    </div>
  );
}

export default App;
