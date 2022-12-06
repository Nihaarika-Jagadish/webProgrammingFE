import { Button, Card, FormControl, makeStyles } from "@material-ui/core";
import { CardContent, TextField, Typography } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./userSlice";

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "10vh"
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
        width: '50%',
        marginTop: "30px",
        minWidth: "20vw",
        display: "block",
        overflow: "auto",
        margin: '0 auto',
    },
    textFieldClass: {
        marginTop:"100px",
    },
    submitButton: {
        color: "white",
        background: "#003566",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        left:"35%",
        marginTop:"10px",
        "&:hover": {
            color: "#003566",
            background: "white",
            fontFamily: 'Montserrat',
            fontWeight: "900",
        }
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
        profile_photo: ""
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
    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h3" className={classes.heading}>
                    Sign Up
                </Typography>
                <Typography variant="p" className={classes.heading1}>
                    Already have an account?{" "}
                    <a href="https://localhost:3000/login">Login</a>
                </Typography>
                <Card className={classes.cardClass}>
                    <CardContent>
                        <form id="createForm" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl>
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
                            {/* <br />
                <br /> */}
                            <TextField
                                id="last_name"
                                label="Last Name"
                                placeholder="Enter Last Name"
                                onChange={(event, value) => {
                                    handleInputChange(event.target.value, "last_name");
                                }}
                            />
                            {/* <br />
                <br /> */}
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
                            {/* <br />
                <br /> */}
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
                            {/* <br />
                <br /> */}

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
                            {/* <br />
                <br /> */}
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
                            {/* <br />
                <br /> */}

                            <Button variant="contained" onClick={submitForm} className={classes.submitButton}>
                                REGISTER
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Registration;
