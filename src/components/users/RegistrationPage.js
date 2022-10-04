import { Box, Button, Card, Dialog, DialogTitle, FormControl, makeStyles } from "@material-ui/core";
import { CardContent, TextField, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./userSlice";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // marginTop: "10vh"
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
        marginTop: "100px",
    },
    submitButton: {
        color: "white",
        background: "#003566",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        marginTop: "10px",
        "&:hover": {
            color: "#003566",
            background: "white",
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
        margin: "10px",
        minWidth: '20vw',
        minHeight: "50px",
        maxHeight: "50px"
    },
    avatar: {
        verticalAlign: "middle",
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        "&:hover": {
            opacity: "0.7"
        }
        // marginRight:"100px",
        // marginLeft:"100px",
        // marginTop:"5%"
    },
    smallAvatar: {
        verticalAlign: "middle",
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        margin: "20px"
    },
    iconClass: {
        position: "absolute",
        top: "40%",
        left: "45%",


    }
}));

function Registration() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phoneNumber: "",
        password: "",
        secondPassword: "",
        profile_photo: "https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/profile.jpeg?alt=media&token=6f10ac11-b8dd-4214-9495-10584b6c1b3e"
    });
    const [inputValue, setInputValue] = React.useState("");
    const [submitBtn, setSubmitBtn] = useState(false);

    const handleInputChange = (value, key) => {
        switch (key) {
            case "first_name":
                setFormValue({ ...formValue, first_name: value });
                break;
            case "last_name":
                setFormValue({ ...formValue, last_name: value });
                break;

            case "email":
                setFormValue({ ...formValue, email: value });
                break;
            case "phoneNumber":
                setFormValue({ ...formValue, phoneNumber: value });
                break;
            case "password":
                setFormValue({ ...formValue, password: value });
                break;
            case "secondPassword":
                setFormValue({ ...formValue, secondPassword: value });
                break;
            default:
                break;
        }
    };
    const submitForm = () => {
        setSubmitBtn(true);
        if (formValue["first_name"] == "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
            formValue["email"]
        ) == false || /^[A-Za-z]\w{7,14}$/.test(formValue["password"]) == false || formValue["password"] != formValue["secondPassword"] || formValue["phoneNumber"] == "" ||
            formValue["phoneNumber"].length != 10) {
            console.log()
        }
        else {
            dispatch(registerUser(formValue))
        }
    };

    const formatPhoneNumber = (value) => {
        // if input value is falsy eg if the user deletes the input, then just return
        if (!value) return value;

        // clean the input for any non-digit values.
        const phoneNumber = value.replace(/[^\d]/g, "");
        // phoneNumberLength is used to know when to apply our formatting for the phone number
        const phoneNumberLength = phoneNumber.length;

        // we need to return the value with no formatting if its less then four digits
        // this is to avoid weird behavior that occurs if you  format the area code to early
        if (phoneNumberLength < 4) {
            setFormValue({ ...formValue, phoneNumber: phoneNumber });
            return phoneNumber;
        }

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
            setFormValue({ ...formValue, phoneNumber: phoneNumber });
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        setFormValue({ ...formValue, phoneNumber: phoneNumber });
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneInput = (e) => {
        // this is where we'll call the phoneNumberFormatter function
        const formattedPhoneNumber = formatPhoneNumber(e.target.value);
        // we'll set the input value using our setInputValue

        setInputValue(formattedPhoneNumber);
    };

    const [viewPencil, setViewPencil] = useState(false)
    const hoverFunc = (value) => {
        setViewPencil(value)
    }
    const [openDialog, setOpenDialog] = useState(false)
    const changeProfilePicture = () => {
        setOpenDialog(true);
    }
    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h3" className={classes.heading}>
                    Sign Up
                </Typography>
                <Typography variant="p" className={classes.heading1}>
                    Already have an account?{" "}
                    <a href="http://localhost:3000/login">Login</a>
                </Typography>
                <Card elevation={6} className={classes.cardClass}>
                    <CardContent>
                        <Box className={classes.optionsBox}>
                            <div style={{ position: "relative" }}>
                                <img src={formValue['profile_photo']} className={classes.avatar} onMouseEnter={() => hoverFunc(true)} onMouseLeave={() => hoverFunc(false)} onClick={changeProfilePicture}>

                                </img>
                                {viewPencil &&
                                    <ModeEditIcon className={classes.iconClass}></ModeEditIcon>
                                }
                            </div>

                            <Dialog onClose={() => setOpenDialog(false)} open={openDialog}>
                                <DialogTitle>
                                    Choose Profile Picture
                                </DialogTitle>
                                <Box className={classes.optionsBox}>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/1.png?alt=media&token=38dff3c5-25db-4916-9d80-701354d643b7" className={classes.smallAvatar} onClick={() => setFormValue({ ...formValue, profile_photo: "https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/1.png?alt=media&token=38dff3c5-25db-4916-9d80-701354d643b7" })}>
                                    </img>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/2.jpeg?alt=media&token=70e11a39-635b-408b-9633-3ce84d8b476a" className={classes.smallAvatar} onClick={() => setFormValue({ ...formValue, profile_photo: "https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/2.jpeg?alt=media&token=70e11a39-635b-408b-9633-3ce84d8b476a" })}>
                                    </img>
                                </Box>
                                <Box className={classes.optionsBox}>

                                    <img src="https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/3.jpeg?alt=media&token=baf9128e-aec8-4e4b-af9d-999947bfb60f" className={classes.smallAvatar} onClick={() => setFormValue({ ...formValue, profile_photo: "https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/3.jpeg?alt=media&token=baf9128e-aec8-4e4b-af9d-999947bfb60f" })}>
                                    </img>
                                    <img src="https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/4.jpeg?alt=media&token=b7b605a1-93be-4a6b-a23d-3ca2e3513362" className={classes.smallAvatar} onClick={() => setFormValue({ ...formValue, profile_photo: "https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/4.jpeg?alt=media&token=b7b605a1-93be-4a6b-a23d-3ca2e3513362" })}>
                                    </img>

                                </Box>
                            </Dialog>
                            <form id="createForm">
                                <Box className={classes.optionsBox}>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            required
                                            id="first_name"
                                            label="First Name"
                                            placeholder="Enter First Name"
                                            onChange={(event, value) => {
                                                handleInputChange(event.target.value, "first_name");
                                            }}
                                            error={submitBtn && formValue["first_name"] == ""}
                                            helperText={
                                                submitBtn && formValue["first_name"] == ""
                                                    ? "Required *"
                                                    : ""
                                            }
                                            className={classes.textFieldClass}
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>

                                        <TextField
                                            id="last_name"
                                            label="Last Name"
                                            placeholder="Enter Last Name"
                                            onChange={(event, value) => {
                                                handleInputChange(event.target.value, "last_name");
                                            }}
                                        />
                                    </FormControl>
                                </Box>
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
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            required
                                            id="password"
                                            label="Password"
                                            type="password"
                                            placeholder="Enter password"
                                            onChange={(event, value) => {
                                                handleInputChange(event.target.value, "password");
                                            }}
                                            error={
                                                submitBtn &&
                                                /^[A-Za-z]\w{7,14}$/.test(formValue["password"]) == false
                                            }
                                            helperText={
                                                submitBtn &&
                                                    /^[A-Za-z]\w{7,14}$/.test(formValue["password"]) == false
                                                    ? "Required *"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Box className={classes.optionsBox}>

                                    <FormControl className={classes.formControl}>


                                        <TextField
                                            required
                                            id="secondPassword"
                                            label="Re-Enter Password"
                                            type="password"
                                            placeholder="Re-Enter password"
                                            onChange={(event, value) => {
                                                handleInputChange(event.target.value, "secondPassword");
                                            }}
                                            error={
                                                submitBtn &&
                                                (/^[A-Za-z]\w{7,14}$/.test(formValue["secondPassword"]) == false
                                                    || formValue["password"] != formValue["secondPassword"])
                                            }
                                            helperText={
                                                submitBtn &&
                                                    (/^[A-Za-z]\w{7,14}$/.test(formValue["secondPassword"]) == false || formValue["password"] == formValue["secondPassword"])
                                                    ? "Passwords must match"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <TextField
                                            required
                                            id="phoneNumber"
                                            label="Phone Number"
                                            placeholder="Enter Phone Number"
                                            onChange={(e) => handlePhoneInput(e)}
                                            value={inputValue}
                                            error={
                                                submitBtn &&
                                                (formValue["phoneNumber"] == "" ||
                                                    formValue["phoneNumber"].length != 10)
                                            }
                                            helperText={
                                                submitBtn &&
                                                    (formValue["phoneNumber"] == "" ||
                                                        formValue["phoneNumber"].length != 10)
                                                    ? "Required *"
                                                    : ""
                                            }
                                        />
                                    </FormControl>
                                </Box>
                                <Button variant="contained" onClick={submitForm} className={classes.submitButton}>
                                    REGISTER
                                </Button>
                            </form>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Registration;
