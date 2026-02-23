import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import PopupForm from './components/PopupForm';
import SignUp from './pages/SignUp';

function App() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [work, setWork] = useState(25);
  const [pause, setPause] = useState(5);
  const [longPause, setLongPause] = useState(15);

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
    <Router>
      <Navbar onOpenSettings={openPopupForm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <PopupForm isOpen={isPopupOpen} currWork={work} currPause={pause} currLongPause={longPause} onClose={closePopupForm} onSave={updateTimers} />
    </Router>

  );
}

export default App;
