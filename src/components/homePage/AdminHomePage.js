import { Button, Card, CardContent, makeStyles, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AllUsersSelector, approveUser, getAllUsers } from "./homeSlice";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getProfileInfo } from "../users/userSlice";

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#caf0f8",
      color: "#003566",
      fontFamily: 'Montserrat',
      fontWeight: "900",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
export function AdminHomePage(){
    const dispatch = useDispatch();
    const allUsers = useSelector(AllUsersSelector);
    const classes = useStyles();

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getProfileInfo(localStorage.getItem('token')));
    },[dispatch])

    const approveUserFunc = (email) => {
        console.log("insideeeee")
        dispatch(approveUser(email));

    }

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
            // setFormValue({ ...formValue, phoneNumber: phoneNumber });
            return phoneNumber;
        }

        // if phoneNumberLength is greater than 4 and less the 7 we start to return
        // the formatted number
        if (phoneNumberLength < 7) {
            // setFormValue({ ...formValue, phoneNumber: phoneNumber });
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }

        // finally, if the phoneNumberLength is greater then seven, we add the last
        // bit of formatting and return it.
        // setFormValue({ ...formValue, phoneNumber: phoneNumber });
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
            3,
            6
        )}-${phoneNumber.slice(6, 10)}`;
    };

    return (

            <div className={classes.root}>
              <div>
                <Typography variant="h3" className={classes.heading}>
                  List of All Users
                </Typography>
                <Typography variant="p" className={classes.heading1}>
                    Please wait for your request to be approved by the admin.
                </Typography>
                <Card className={classes.cardClass} elevation={6}>
            <CardContent>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>



          <TableRow>
          <StyledTableCell>Profile</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Email Address</StyledTableCell>
            <StyledTableCell align="left">Phone Number</StyledTableCell>
            <StyledTableCell align="left">Role</StyledTableCell>
            <StyledTableCell align="left">Approve Status</StyledTableCell>

          </TableRow>
        </TableHead>
        {
            allUsers && allUsers != undefined && allUsers.length != 0 && allUsers[0] != undefined && 
            <TableBody>
                {
                    allUsers.map((row) => (
            <StyledTableRow key={row.user_id}>
                <StyledTableCell >
                    <img src={row.profile_photo} className={classes.avatar}>
                    </img>
                </StyledTableCell>
                <StyledTableCell>
                    {row.first_name}
                </StyledTableCell>
                <StyledTableCell>
                    {row.last_name}
                </StyledTableCell>
                <StyledTableCell>
                    {row.email}
                </StyledTableCell>
                <StyledTableCell>
                    {formatPhoneNumber(row.user_phone)}
                </StyledTableCell>
                <StyledTableCell>
                    {
                        row.role_id == 1? "Admin":"User"
                    }
                </StyledTableCell>
                <StyledTableCell align="center">
                    {
                        row.approved == 1?
                        <Tooltip title='Approved'>
                            <CheckBoxIcon color="green" style={{color:"green"}}/>
                        </Tooltip>
                        :
                        <Button variant="contained" className={classes.submitButton} onClick={() => approveUserFunc(row.email)}>
                            Approve
                        </Button>
                    }
                </StyledTableCell>


            </StyledTableRow>
                    ))
                }

            </TableBody>
        }
        </Table>
        </TableContainer>

            </CardContent>
          </Card>
              </div>
            </div>
    )
}