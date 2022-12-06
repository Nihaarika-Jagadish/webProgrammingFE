import React from 'react'
import App from './App';
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useSelector } from 'react-redux';
import LandingPage from './components/landingPage/LandingPage';
import Registration from './components/users/RegistrationPage';
import history from './History';
import LoginPage from './components/users/LoginPage';
import { RedirectPage } from './components/users/Redirect';
import { SearchPage } from './components/homePage/SearchPage';
import { ProfilePage } from './components/Profile/Profile';
import ForgotPasswordPage from './components/users/ForgotPassword';
import { AdminHomePage } from './components/homePage/AdminHomePage';
import MainPageUserGroup from './components/UserGroup.js/MainPage';
import { AnnotationPanel } from './components/AnnotationPanel/annotationHome';
import { EachFigureCopy } from './components/AnnotationPanel/EachFigureCopy';

export default function Routes () {
    return <div> <Router history={history}>
      <Switch>
        <Route path="/" exact component= {LandingPage} />
        <Route path="/redirect" exact component= {RedirectPage} />
        <Route path="/login" exact component= {LoginPage} />
        <Route path="/register" exact component= {Registration} />
        <Route path="/home" exact component= {SearchPage} />
        <Route path="/profile" exact component= {ProfilePage} />
        <Route path="/annotationpanel" exact component= {AnnotationPanel} />
        <Route path="/annotationpanel/:id" exact component= {EachFigureCopy} />
        <Route path="/forgotPassword" exact component= {ForgotPasswordPage} />
        <Route path="/adminHome" exact component= {AdminHomePage} />
        <Route path="/userGroup" exact component= {MainPageUserGroup} />


        




      </Switch>
      </Router>
    </div>
  
}