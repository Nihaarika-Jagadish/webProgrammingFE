import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { setToken, TokenSelector } from "../users/userSlice";
import * as animationData from '../../images/search.json';
import { Button, Typography } from "@material-ui/core";
import Lottie from 'react-lottie';
import Navbar from "../Navbar/Navbar";
import AddUserToGroup from "./AddUserToGroup";
import { UserGroupTable } from "./UserGroupTable";
const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      marginTop:"100px",
      // overflow:"scroll"
    },
    heading: {
      fontFamily: "raleway",
      fontSize: "2.5em",
      // marginTop: "30vh",
      textShadow: "0px 2px, 2px 0px, 2px 2px",
      fontWeight: "900",
      padding: "40px",
    },
    cardClass: {
      marginTop: "30px",
    },
    textFieldClass: {
      display: "block",
    },
    submitButton:{
      color:"white",
      background:"#003566",
      fontFamily: 'Montserrat',
      fontWeight: "900",
      "&:hover": {
          color:"#003566",
      background:"white",
      fontFamily: 'Montserrat',
      fontWeight: "900",
        }
    },
      optionsBox: {
          display: 'flex',
          marginBottom: "10px",
          justifyContent: 'space-evenly'
      },
      formControl: {
          margin: "15px",
          minWidth: '20vw',
          minHeight: "50px",
          maxHeight: "50px"
      },
      avatar:{
          verticalAlign: "middle",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          // marginRight:"100px",
          // marginLeft:"100px",
          // marginTop:"5%"
        },
        smallAvatar:{
          verticalAlign: "middle",
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          margin:"20px"
        },
        iconClass:{
          position:"absolute",
          top:"40%",
          left: "45%",
  
  
        },
        forgotPswd:{
          fontSize:"0.7em",
          textAlign:"left",
          marginTop:"10px",
          marginBottom:"20px"
        }
  }));

export default function MainPageUserGroup() {
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(() => {
    }, [dispatch])


    return (
<div className={classes.root}>
    <div>
    
    <AddUserToGroup/>
            <UserGroupTable/>
    </div>
            
        </div>
    )
}