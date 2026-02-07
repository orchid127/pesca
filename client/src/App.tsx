import React, { useState } from 'react';
import './App.css';
import Pomodoro from './components/Pomodoro';
import Navbar from './components/Navbar';
import PopupForm from './components/PopupForm';

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [work, setWork] = useState(25);
  const [pause, setPause] = useState(5);
  const [longPause, setLongPause] = useState(15);

  console.log("App rendered with:", work, pause, longPause);

  // opening or closing the pop up form
  const openPopupForm = () => {
    setIsPopupOpen(true);
  }

  const closePopupForm = () => {
    setIsPopupOpen(false);
  }


  const updateTimers = (newWork: number, newPause: number, newLongPause: number) => {
    console.log("updateTimers called with:", newWork, newPause, newLongPause);

    // updating timers only if the value exists
    setWork(newWork);
    setPause(newPause);
    setLongPause(newLongPause);
  };




  return (
    <div className="m-2">
      <Navbar onOpenSettings={openPopupForm} />
      <Pomodoro work={work} pause={pause} longPause={longPause} />
      <PopupForm isOpen={isPopupOpen} currWork={work} currPause={pause} currLongPause={pause} onClose={closePopupForm} onSave={updateTimers} />
    </div>
  );
}

export default App;
