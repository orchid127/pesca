import React, { useState } from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro';
import SessionList from './components/SessionList';
import Navbar from './components/Navbar';
import PopupForm from './components/PopupForm';

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [work, setWork] = useState(25);
  const [pause, setPause] = useState(5);
  const [longPause, setLongPause] = useState(15);

  const updateTimers = (newWork: number, newPause: number, newLongPause: number) => {
    setWork(newWork);
    setPause(newPause);
    setLongPause(newLongPause);
  };



  const managePopupForm = () => {
    setIsPopupOpen(!isPopupOpen);
  }

  return (
    <div className="m-2">
      <Navbar onOpenSettings={managePopupForm} />
      <Pomodoro work={work} pause={pause} longPause={longPause} />
      <PopupForm isOpen={isPopupOpen} setOpen={managePopupForm} />
    </div>
  );
}

export default App;
