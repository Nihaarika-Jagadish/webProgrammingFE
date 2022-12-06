import { Button, Card, CardContent, makeStyles, Paper, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@material-ui/core";
import { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { AllUserGroupSelector, AllUsersSelector, approveUser, getAllUsers } from "../homePage/homeSlice";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { getAllUserGroups } from "../homePage/homeSlice";
import moment from "moment";

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // height: "100vh",
      // marginTop:"200px",
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
export function UserGroupTable(){
    const dispatch = useDispatch();
    const classes = useStyles();
    const allUserGrops = useSelector(AllUserGroupSelector)

    useEffect(() => {
        dispatch(getAllUserGroups());
    },[dispatch])

    return (

            <div className={classes.root}>
              <div>
                <Typography variant="h3" className={classes.heading}>
                  List of All User Groups
                </Typography>
                <Card className={classes.cardClass} elevation={6}>
            <CardContent>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>



          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell align="left">Last Name</StyledTableCell>
            <StyledTableCell align="left">Assigned Group ID</StyledTableCell>
            <StyledTableCell align="left">Assigned Datetime</StyledTableCell>
            <StyledTableCell align="left">#Compound figures</StyledTableCell>
            <StyledTableCell align="left">#Finished</StyledTableCell>

          </TableRow>
        </TableHead>
        {
            allUserGrops && allUserGrops != undefined && allUserGrops.length != 0 && allUserGrops[0] != undefined && 
            <TableBody>
                {
                    allUserGrops.map((row) => (
            <StyledTableRow key={row.user_id}>
                <StyledTableCell>
                    {row.first_name}
                </StyledTableCell>
                <StyledTableCell>
                    {row.last_name}
                </StyledTableCell>
                <StyledTableCell>
                    {row.groupID}
                </StyledTableCell>
                <StyledTableCell>
                    {moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")}
                </StyledTableCell>
                <StyledTableCell>
                    {row.count_of_compoundfigures}
                </StyledTableCell>
                <StyledTableCell>
                    0
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