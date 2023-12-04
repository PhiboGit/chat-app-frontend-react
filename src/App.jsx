import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home'
import GamePage from './components/game/GamePage';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path='/game' element={<PrivateRoute/>}>
          <Route exact path='/game' element={<GamePage/>}/>
        </Route>
      </Routes>
    </Router>
  );
}
