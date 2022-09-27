import React from 'react'
import App from './App';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import LandingPage from './components/landingPage/LandingPage';
import Registration from './components/users/RegistrationPage';

export default function Router () {
    return <div> <BrowserRouter>
      <Switch>
        <Route path="/" exact component= {LandingPage} />
        <Route path="/register" exact component= {Registration} />

      </Switch>
      </BrowserRouter>
    </div>
  
}