import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Button, makeStyles } from '@material-ui/core';
import history from '../../History';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, TokenSelector } from '../users/userSlice';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
    flexGrow: 1
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        background:"#003566",
      },
    loginButton:{
        color:"white",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        margin:"0px 10px 0px 10px",
        "&:hover": {
            background:"white",
            color:"#003566",
            fontFamily: 'Montserrat',
            fontWeight: "900"
          }
    },
    registerButton:{
        background:"white",
        color:"#003566",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        margin:"0px 10px 0px 10px",
        "&:hover": {
            color:"white",
        fontFamily: 'Montserrat',
        fontWeight: "900",
          }
    },
    flexClass:{
        display: 'flex', 
        justifyContent: 'space-between', 
        flexGrow: 1, 

    },
    iconClass:{
        padding:"10px 20px 0px 0px",
        height:"50px"
    },
    logoClass:{
        paddingTop:"-10px",
        fontFamily: 'raleway',
        fontWeight: "900",
        color:"white"
    }
}));
export default function Navbar() {
    const classes = useStyles()
    const dispatch = useDispatch();

    const tokenSelector = useSelector(TokenSelector)
    useEffect(() => {
      if(localStorage.getItem("token") != null && localStorage.getItem("token") != undefined){
        dispatch(setToken(true))
      }
      else{
        dispatch(setToken(false));
      }
    })

    const logoutFunction = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenPresent')
      dispatch(setToken(false))
    }

  return (
    <div className={classes.root}>
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Button className={classes.logoClass}>
          Figure LOGO
        </Button>
        <div>
          {!tokenSelector &&  <Button className={classes.loginButton} onClick={() => history.push('/')}>Home </Button>}
          {tokenSelector &&  <Button className={classes.loginButton} onClick={() => history.push('/home')}>Home </Button>}
          {!tokenSelector &&  <Button className={classes.loginButton} onClick={() => history.push('/login')}>LOG IN</Button>}
          {!tokenSelector &&  <Button className={classes.registerButton} onClick={() => history.push('/register')}>SIGN UP</Button>}
          {tokenSelector && localStorage.getItem('role_id') == 1 && <Button className={classes.loginButton} onClick={() => history.push('/userGroup')}>User Groups</Button>}
          {tokenSelector && <Button className={classes.loginButton} onClick={() => history.push('/profile')}>My Profile</Button>}
          {tokenSelector && <Button className={classes.registerButton} onClick={() => {logoutFunction(); history.push('/')}}>LOG OUT</Button>}
        </div>
      </Toolbar>
    </AppBar>

  </div>
  );
}
