import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { setToken, TokenSelector } from "../users/userSlice";
import * as animationData from '../../images/search.json';
import { Box, Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
import Lottie from 'react-lottie';
import Navbar from "../Navbar/Navbar";
import { AllGroupSelector, AllUsersSelector, assignGroup, getAllGroups, getAllUsers } from "../homePage/homeSlice";
const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
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
        marginTop: "100px",
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

export default function AddUserToGroup() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const allGroups = useSelector(AllGroupSelector);
    const allUsers = useSelector(AllUsersSelector);

    const [group, setGroup] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        dispatch(getAllGroups())
        dispatch(getAllUsers())
    }, [dispatch])

    const handleUserChange = (event) => {
        setUser(event.target.value);
      };

      const handleGroupChange = (event) => {
        setGroup(event.target.value);
      };

      const addUserToGroupFunction = () => {
        var form = {}
        form['user_id'] = user
        form['groupID'] = group
        dispatch(assignGroup(form))
        document.getElementById('createForm').reset()
        setUser('')
        setGroup('')
    
      }
    return (
        <Card elevation={6} className={classes.cardClass}>
                    <CardContent>
                    <Typography variant="h3" className={classes.heading}>
                        Assign User to Groups
                </Typography>
        <Box className={classes.optionsBox}>
        <form id="createForm">

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">User</InputLabel>
                <Select
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    value={user}
                    label="User"
                    onChange={handleUserChange}
                >
                    {
                        (allUsers || []).map((eachUser) => {
                            return(
                                <MenuItem value={eachUser.user_id}>{eachUser['first_name'] + " " + eachUser['last_name']}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Group</InputLabel>
                <Select
                    labelId="demo-simple-select-label1"
                    id="demo-simple-select"
                    value={group}
                    label="Group"
                    onChange={handleGroupChange}
                >
                    {
                        (allGroups || []).map((eachUser) => {
                            return(
                                <MenuItem value={eachUser.groupID}>{eachUser['groupID']}</MenuItem>
                            )
                        })
                    }
                </Select>
            </FormControl>
            </form>
            <Button variant="contained" onClick={addUserToGroupFunction} className={classes.submitButton}>
                                    Assign User
                                </Button>
        </Box>
        </CardContent>
        </Card>
    )
}