import './App.css';
import React from 'react';
import { BrowserRouter as Router,Routes, Route, Switch } from 'react-router-dom';
import { Register } from './pages/LoginYRegister/Register';
import { Login } from './pages/LoginYRegister/Login';
import { MainPage } from './pages/chefMainPage/mainPage';
import { ProfileChef } from './pages/chefProfile/ProfileChef';
import { ChefReviews } from './pages/chefReviews/ChefReviews';
import { Chat } from './pages/chefChats/Chat';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/mainPage" element= {<MainPage/>}/>
          <Route path='/profile' element={<ProfileChef/>}/>
          <Route path='/review' element={<ChefReviews/>}/>
          <Route path="/chat" element={ <Chat/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
