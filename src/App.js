import './App.css';
import MyAppBar from './components/Appbar';
import MyButton from './components/Button';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoomList from './components/RoomList';

function App() {
  return (
    <Router>
      <MyAppBar />
      <Routes>
        <Route exact path="/" element={<MyButton />} />
        <Route path="/hotels/:hotelId/rooms" element={<RoomList />} />
      </Routes>
    </Router>
  );
}

export default App;
