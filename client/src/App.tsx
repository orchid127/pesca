import React from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro';
import SessionList from './components/SessionList';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="m-2">
      <Navbar />
      <Pomodoro />
    </div>
  );
}

export default App;
