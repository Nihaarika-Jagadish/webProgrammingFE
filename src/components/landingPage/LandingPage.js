import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { setToken, TokenSelector } from "../users/userSlice";
import * as animationData from '../../images/search.json';
import { Button, Typography } from "@material-ui/core";
import Lottie from 'react-lottie';
import Navbar from "../Navbar/Navbar";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // background: 'white',
        minWidth: '100vw',
        minHeight:'100vh',
        // backgroundImage: "url(/back.jpeg)",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: "fixed",
        backgroundSize: 'cover'
    },
    leftDiv: {
        minWidth: "40vw",
        maxWidth: "40vw",
        minHeight: "120vh",
        zIndex: 3,
        // marginTop: "60px",
        marginLeft: "0px",
        float: "left",
        display: 'inline-block',
        color: "#003566"
    },
    rightDiv: {
        minWidth: "60vw",
        minHeight: '80vh',
        maxHeight: '80vh',
        maxWidth: "60vw",
        marginLeft: "0px",
        float: "right",
        // display:'inline-block',
    },
    welcomeText: {
        fontFamily: 'raleway',
        fontSize: "3.5em",
        marginTop: "30vh",
        textShadow: "0px 3px, 3px 0px, 3px 3px",
        fontWeight: "900"
    },
    legalText: {
        fontFamily: 'raleway',
        fontSize: "2.5em",
        marginTop: "5vh",
        fontWeight: "900"
    },
    belowText: {
        fontFamily: 'raleway',
        fontSize: "1em",
        textShadow: "0px 0.5px, 0.5px 0px, 0.5px 0.5px",
        margin: "5vh"
    },
    lottieClass:{
        marginTop:"100px"
    },
    getStartedButton:{
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
    }
}));

export default function LandingPage() {
    const classes = useStyles();

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const tokenSelector = useSelector(TokenSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
            dispatch(setToken(true))
        }
        else {
            dispatch(setToken(false))
        }
    }, [dispatch])


    return (
        <>
            {(!tokenSelector) ?
                <div className={classes.root}>
                    <div className={classes.leftDiv}>
          <Typography className={classes.welcomeText} variant="h1">WELCOME TO</Typography>
          <Typography className={classes.legalText} variant="h6">Figure Annotation</Typography>
          <Typography className={classes.belowText} variant="h6">Supports annotation of compound figure segmentation and semantic information extraction.</Typography>
          <Button variant="contained" className={classes.getStartedButton}>
            GET STARTED
          </Button>
        </div>
        <div className={classes.rightDiv}>
            <Lottie options={defaultOptions}
    style={{height: 500, width:500, marginTop:"100px"}}/>

        </div>
                </div>
                : <div> Not logged in</div>}
        </>
    )
}