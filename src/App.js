import './App.css';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Navbar/Footer';


function App() {
  return (
    <div className="App">
 <Routes style={{height:'100vh'}}/>
 <Navbar/>
<Footer/>
    </div>
  );
}

export default App;
