import { Box, Button, Card, CardContent, Dialog, DialogTitle, FormControl, makeStyles, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordApi, forgotPswd, getProfileInfo, ProfileSelector, updateProfile } from "../users/userSlice";
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
    cancelButton: {
        color: "black",
        background: "#e5e5e5",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        marginTop: "10px",
        "&:hover": {
            color: "black",
            background: "#e5e5e5",
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
export function ProfilePage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const profileSelector = useSelector(ProfileSelector);

    const [editButton, setEditButton] = useState(true);
    const [changePassword, setChangePassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [formValue, setFormValue] = useState({});
    const [changePasswordForm, setChangePasswordForm] = useState({
        "oldPassword": '',
        "newPassword": '',
        "confirmNewPassword": ''
    });


    useEffect(() => {
        if (localStorage.getItem('token') != null || localStorage.getItem('token') != undefined) {
            dispatch(getProfileInfo(localStorage.getItem('token')))
        }
    }, [dispatch])

    useEffect(() => {
        if (profileSelector.length != 0) {
            console.log("inside", profileSelector[0])
            setFormValue(profileSelector[0])
            console.log(formValue)
        }
    }, [profileSelector])

    const [inputValue, setInputValue] = useState()

    const handlePhoneInput = (e) => {
        // this is where we'll call the phoneNumberFormatter function
        const formattedPhoneNumber = formatPhoneNumber(e[0]['user_phone']);
        // we'll set the input value using our setInputValue

        setInputValue(formattedPhoneNumber);
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

    const handleInputChange = (value, key) => {
        switch (key) {
            case "first_name":
                setFormValue({ ...formValue, first_name: value });
                console.log(formValue)
                break;
            case "last_name":
                setFormValue({ ...formValue, last_name: value });
                break;

            case "email":
                setFormValue({ ...formValue, email: value });
                break;
            case "user_phone":
                if (formValue['user_phone'].length < 10) {
                    setFormValue({ ...formValue, user_phone: value });
                }
                break;
            case "oldPassword":
                setChangePasswordForm({ ...changePasswordForm, oldPassword: value });
                break;
            case "newPassword":
                setChangePasswordForm({ ...changePasswordForm, newPassword: value });
                break;
            case "confirmNewPassword":
                setChangePasswordForm({ ...changePasswordForm, confirmNewPassword: value });
                break;

            default:
                break;
        }
    };

    const editForm = () => {
        if (editButton == false) {
            setSubmitted(true)
            console.log(formValue)
            if (formValue["first_name"] == "" || formValue["last_name"] == "" || formValue["user_phone"] == "" ||
                formValue["user_phone"].length != 10) {
                console.log()
            }
            else {
                const form = {
                    "first_name": formValue['first_name'],
                    "last_name": formValue['last_name'],
                    "user_phone": formValue['user_phone'],
                    "email": formValue['email'],
                    "profile_photo": formValue['profile_photo']
                }
                dispatch(updateProfile(form))
                setSubmitted(false)
                setEditButton(true)
            }

        }
        else {
            setEditButton(false)
        }
    }

    const changePasswordFunc = () => {
        if (changePassword == true) {
            setSubmitted(true)
            if (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["oldPassword"]) == false || /^[A-Za-z]\w{7,14}$/.test(changePasswordForm["newPassword"]) == false || /^[A-Za-z]\w{7,14}$/.test(changePasswordForm["confirmNewPassword"]) == false || changePasswordForm["oldPassword"] == changePasswordForm["newPassword"] || changePasswordForm["oldPassword"] == changePasswordForm["confirmNewPassword"] || changePasswordForm["newPassword"] != changePasswordForm["confirmNewPassword"]) {
                
                console.log(/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["oldPassword"]) == false, /^[A-Za-z]\w{7,14}$/.test(changePasswordForm["newPassword"]) == false || /^[A-Za-z]\w{7,14}$/.test(changePasswordForm["confirmNewPassword"]) == false, changePasswordForm["oldPassword"] == changePasswordForm["newPassword"], changePasswordForm["oldPassword"] == changePasswordForm["confirmNewPassword"], changePasswordForm["newPassword"] != changePasswordForm["confirmNewPassword"])
            }
            else {
                const form = {
                    "oldPassword": changePasswordForm['oldPassword'],
                    "newPassword": changePasswordForm['newPassword'],
                    "email": formValue['email']
                }
                dispatch(changePasswordApi(form))
                setSubmitted(false)
                setChangePassword(false)
            }
        }
        else {
            setChangePassword(true)
            setEditButton(true)

        }
    }

    const [viewPencil, setViewPencil] = useState(false)
    const hoverFunc = (value) => {
        setViewPencil(value)
    }
    const [openDialog, setOpenDialog] = useState(false)
    const changeProfilePicture = () => {
        if(editButton == false){
            setOpenDialog(true);
        }
    }

    const cancelFunc = () => {
        setChangePassword(false)
        setEditButton(true)

    }

    return (
        <div className={classes.root}>
            <div>
                <Typography variant="h3" className={classes.heading}>
                    Profile Information
                </Typography>
                <Typography variant="p" className={classes.heading1}>
                    Edit or Change your password on this page.
                </Typography>
                <Card elevation={6} className={classes.cardClass}>
                    {profileSelector.length != 0 && <CardContent>
                        <Box className={classes.optionsBox}>
                            <div style={{ position: "relative" }}>
                                <img src={formValue['profile_photo']} className={classes.avatar} onMouseEnter={() => hoverFunc(true)} onMouseLeave={() => hoverFunc(false)} onClick={changeProfilePicture}>

                                </img>
                                {viewPencil && !editButton &&
                                    <ModeEditIcon className={classes.iconClass}></ModeEditIcon>
                                }
                            </div>
                            <Dialog onClose={() => setOpenDialog(false)} open={openDialog && !editButton}>
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
                                        error={!editButton && submitted && formValue["first_name"] == ""}
                                        helperText={
                                            !editButton && submitted && formValue["first_name"] == ""
                                                ? "Required *"
                                                : ""
                                        }
                                        value={formValue["first_name"]}
                                        InputProps={{
                                            readOnly: editButton,
                                        }}
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
                                        value={formValue["last_name"]}
                                        InputProps={{
                                            readOnly: editButton,
                                        }}
                                    />
                                </FormControl>
                            </Box>
                            <Box className={classes.optionsBox}>
                                <FormControl className={classes.formControl}>
                                    <TextField
                                        required
                                        id="phoneNumber"
                                        label="Phone Number"
                                        placeholder="Enter Phone Number"
                                        onChange={(e) => handlePhoneInput(e)}
                                        value={formValue['user_phone']}
                                        error={
                                            !editButton && submitted &&
                                            (formValue["user_phone"] == "" ||
                                                formValue["user_phone"].length != 10)
                                        }
                                        helperText={
                                            !editButton && submitted &&
                                                (formValue["user_phone"] == "" ||
                                                    formValue["user_phone"].length != 10)
                                                ? "Required *"
                                                : ""
                                        }
                                    />
                                </FormControl>
                                {
                                changePassword &&  <FormControl className={classes.formControl}>
                                    <TextField
                                        required
                                        id="oldPassword"
                                        label="Old Password"
                                        type="password"
                                        placeholder="Enter Old Password"
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "oldPassword");
                                        }}
                                        error={
                                            changePassword && submitted &&
                                            (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["oldPassword"]) == false || changePasswordForm["oldPassword"] == changePasswordForm["newPassword"])
                                        }
                                        helperText={
                                            changePassword && submitted &&
                                                (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["oldPassword"]) == false || changePasswordForm["oldPassword"] == changePasswordForm["newPassword"])
                                                ? "Required *"
                                                : ""
                                        }
                                    />
                                </FormControl>}
                            </Box>
                            {
                                changePassword && <Box className={classes.optionsBox}>
                                    <FormControl className={classes.formControl}>
                                    <TextField
                                        required
                                        id="newPassword"
                                        label="Enter New Password"
                                        type="password"
                                        placeholder="Enter New Password"
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "newPassword");
                                        }}
                                        error={
                                            changePassword && submitted &&
                                            (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["newPassword"]) == false
                                                || changePasswordForm["oldPassword"] == changePasswordForm["newPassword"])
                                        }
                                        helperText={
                                            changePassword && submitted &&
                                                (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["newPassword"]) == false || changePasswordForm["oldPassword"] == changePasswordForm["newPassword"] )
                                                ? "Passwords must not be the same"
                                                : ""
                                        }
                                    />
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                    <TextField
                                        required
                                        id="newPassword"
                                        label="Confirm New Password"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "confirmNewPassword");
                                        }}
                                        error={
                                            changePassword && submitted &&
                                            (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["confirmNewPassword"]) == false
                                                || changePasswordForm["newPassword"] != changePasswordForm["confirmNewPassword"])
                                        }
                                        helperText={
                                            changePassword && submitted &&
                                                (/^[A-Za-z]\w{7,14}$/.test(changePasswordForm["confirmNewPassword"]) == false || changePasswordForm["newPassword"] != changePasswordForm["confirmNewPassword"])
                                                ? "Passwords must match"
                                                : ""
                                        }
                                    />
                                    </FormControl>
                                    </Box>
                            }
                            <Box className={classes.optionsBox}>
                            {editButton ? <Button variant="contained" onClick={editForm}  style={{display: changePassword ? "none" : ''}} className={classes.submitButton}>
                                edit info
                            </Button> : <Button variant="contained" onClick={editForm} style={{display: changePassword ? "none" : ''}}  className={classes.submitButton}>
                                Submit Info
                            </Button>}
                            {
                                !changePassword ? <Button variant="contained" onClick={changePasswordFunc} style={{display: !editButton ? "none" : ''}}  className={classes.submitButton}>
                                    Change Password
                                </Button> : <Button variant="contained" onClick={changePasswordFunc} style={{display: !editButton ? "none" : ''}} className={classes.submitButton}>
                                    Save Password
                                </Button>
                            }
                            {(!editButton || changePassword) && <Button variant="contained" onClick={cancelFunc} className={classes.cancelButton}>
                                    CANCEL
                                </Button>

                            }
                            </Box>
                        </form>
                        </Box>
                    </CardContent>}
                </Card>
            </div>
        </div>
    )
}