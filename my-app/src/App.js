import './App.css';
import React from 'react';
import { BrowserRouter as Router ,Routes, Route, Switch } from 'react-router-dom';
import { Register } from './pages/LoginYRegister/Register';
import { Login } from './pages/LoginYRegister/Login';
import { MainPage } from './pages/chefMainPage/mainPage';
import { ProfileChef } from './pages/chefProfile/ProfileChef';
import { ChefReviews } from './pages/chefReviews/ChefReviews';
import { Chat } from './pages/chefChats/Chat';
import { Solicitud } from './pages/Solicitud/solicitud';
import {TestPage} from "./pages/TestPage.tsx";
import { Toaster } from 'react-hot-toast';
import {CalendarChef} from "./pages/chefCalendar/CalendarChef.tsx";

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
          <Route path='/solicitud' element={<Solicitud/>}/>
          <Route path="/test" element={<TestPage/>}/>
            <Route path={"/calendarChef"} element={<CalendarChef/>}/>
        </Routes>
      </Router>
        <Toaster
            reverseOrder={false}
            toastOptions={{
                duration: 1000,
                position: 'bottom-center',
                style: {
                    width: '20vw',
                    height: '5vh',
                    fontSize: '20px'
                },
                success: {
                    style: {
                        background: '#B4EBCA'
                    }
                },
                error: {
                    style: {
                        background: '#fd8899'
                    }
                }
            }}
        />
    </div>
  );
}

export default App;
