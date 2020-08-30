import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import moment from 'moment'

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(()=>{
    fetch('/time').then(res => res.json()).then(data =>{
      let localTime = data.time;
      let formatTime = moment(localTime).local().format('llll')
      setCurrentTime(formatTime);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
          <p>{currentTime}</p>
      </header>
    </div>
  );
}

export default App;
