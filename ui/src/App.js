import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import * as API from './api';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await API.currentSession();
      if (data.user) {
        setLoggedInUser(data.user)
      }
    })()
  }, [])
  return (
    <div className="App">
      <NavBar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
    </div>
  );
}

export default App;
