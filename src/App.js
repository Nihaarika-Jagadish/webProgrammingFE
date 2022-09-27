import './App.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Router from './Router';
import Cookies from 'universal-cookie';
import {TokenSelector, UserMeSelector} from './components/users/userSlice';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/landingPage/LandingPage';

function App() {

  const cookies = new Cookies();
const tokenSelector = useSelector(TokenSelector);
const [token, setToken] = React.useState(false)
const dispatch = useDispatch();
useEffect(() => {
  if(cookies.get('token') != null){
    setToken(true)
  }
  else{
    setToken(false)
  }
},[dispatch])




  return (
    <div className="App">
 <Router style={{height:'100vh'}}/>
      {(!token && !tokenSelector) ? 
      <></>
      :  <div> logged in</div>}

    </div>
  );
}

export default App;
