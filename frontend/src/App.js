import './index.css';
import {Switch, Route, Redirect} from "react-router-dom";
//imports
import NavBar from './components/NavBar';
import HomePage from './views/HomePage';
import SearchPage from './views/SearchPage';
import TrackPage from './views/TrackPage';
import LoginPage from './views/LoginPage';
import PrivateRoute from './util/PrivateRoute';
import StorePage from './views/StorePage';
import CheckoutPage from './views/CheckoutPage';
import ReportPage from './views/ReportPage';

import { useState, useEffect } from 'react';

//web page application
function App() {
  //log in handlers
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userID) => {
    sessionStorage.setItem('userID', userID);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('userID');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    let data = sessionStorage.getItem('userID');

    if(data) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

  }, []);
  //nav bar
  return (
    <div className="App">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
      <Switch>
        <Route path="/" exact>
          <HomePage/>
        </Route>
        <Route path="/search">
          <SearchPage/>
        </Route>
        <Route path="/track">
          <TrackPage/>
        </Route>       
        <PrivateRoute isLoggedIn={isLoggedIn} path="/login">
          <LoginPage handleLogin={handleLogin}/>
        </PrivateRoute>
        <Route path="/book/:ibsn">
          <StorePage />
        </Route>
        <Route path="/report">
          <ReportPage />
        </Route>
        <Route path="/checkout">
          <CheckoutPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
