import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import history from '../../History';
import { getProfileInfo, ProfileSelector, UserMeSelector } from "./userSlice";
import { makeStyles, Typography } from "@material-ui/core";
import Lottie from 'react-lottie';
import * as animationData from '../../images/approve.json';

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      // marginTop:"10vh"
    },
    heading: {
      fontFamily: "raleway",
      fontSize: "2.5em",
      marginTop: "30vh",
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
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          "&:hover":{
              opacity:"0.7"
          }
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

export function RedirectPage(){
    const dispatch = useDispatch();
    const classes = useStyles();

    const userInfo = useSelector(UserMeSelector);
    const [flag, setFlag] = useState(false);
    const profileSelector = useSelector(ProfileSelector);

    useEffect(() => {
        if (localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
            dispatch(getProfileInfo(localStorage.getItem('token')))
        }
        else{
            history.push('/')
        }
    }, [dispatch])

    useEffect(() => {
        if(profileSelector[0] != undefined && Object.keys(profileSelector[0]).length != 0){
            console.log(profileSelector[0])
            if(profileSelector[0]['approved'] == 1){
                if(profileSelector[0]['role_id'] == 2){
                    history.push('/home')
                }
                else{
                    history.push('/adminHome')
                }   
            }
            else{
                console.log('helloooo')
                setFlag(true);
            }
        }
    }, [profileSelector])

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    return (
        <>
        {
            flag && 
            <div className={classes.root}>
              <div>
                <Typography variant="h3" className={classes.heading}>
                  Permission Denied
                </Typography>
                <Typography variant="p" className={classes.heading1}>
                    Please wait for your request to be approved by the admin.
                </Typography>
                <Lottie options={defaultOptions}
    height={500}
    width={500}
    />
              </div>
            </div>
          
        }
        </>
    )
}