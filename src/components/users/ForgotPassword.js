import { Box, Button, Card, FormControl, makeStyles } from "@material-ui/core";
import { CardContent, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPswd, loginUser } from "./userSlice";

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

function ForgotPasswordPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [formValue, setFormValue] = useState({
    email: "",
    phoneNumber: ""
  });

  const [submitBtn, setSubmitBtn] = useState(false);

  const handleInputChange = (value, key) => {
    switch (key) {
      case "email":
        setFormValue({ ...formValue, email: value });
        break;
      case "password":
        setFormValue({ ...formValue, password: value });
        break;
      default:
        break;
    }
  };
  const submitForm = () => {
    setSubmitBtn(true);
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        formValue["email"]
      ) == false ){
console.log()
      }
      else{
        dispatch(forgotPswd(formValue))
      }
  };

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="h3" className={classes.heading}>
          Enter your email
        </Typography>
        <Typography variant="p" className={classes.heading1}>
            We will send an email with a temporary password.
        </Typography>
        <div>
          <Card className={classes.cardClass} elevation={6}>
            <CardContent>
              <form id="createForm">
              <Box className={classes.optionsBox}>
              <FormControl className={classes.formControl}>
                <TextField
                  required
                  id="email"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  onChange={(event, value) => {
                    handleInputChange(event.target.value, "email");
                  }}
                  error={
                    submitBtn &&
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      formValue["email"]
                    ) == false
                  }
                  helperText={
                    submitBtn &&
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                      formValue["email"]
                    ) == false
                      ? "Required *"
                      : ""
                  }
                />
                </FormControl>
                </Box>
                
                <br/>
                <Button variant="contained" onClick={submitForm} className={classes.submitButton}>
                  Reset Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
