import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnotatedPanelResultSelector, AnnotatedSearchResultSelector, getAnnotatedPanelResult, getAnnotatedSearchResult } from "../homePage/homeSlice";
import { tableCellClasses } from '@mui/material/TableCell';

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
        // minWidth: '30vw',
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

export function EachFigure(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({});
    const [editButton, setEditButton] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [subfigures, setSubfigures] = useState([]);
    useEffect(() => {
        if(props != undefined && props != null && props.subFigures != [] && props.subFigures.length != 0){
            setSubfigures(props.subFigures);
        }
    },[])


    const handleInputChange = (value, key) => {
        switch (key) {
            case "howMany":
                setFormValue({ ...formValue, howMany: value });
                break;

            default:
                break;
        }
    };

    const submitAnnotation = () => {
        console.log()
    }

    return (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
                        <StyledTableCell align="center">Compund Figure Details</StyledTableCell>
                        <StyledTableCell align="center">Sub Figures Details</StyledTableCell> 

                
            
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>

                <img src={props.subFigures[0]?.figure_file_url}  width="450" height="680"/>
                <Typography><b>Compound Figure File Name: </b>{props.compoundFigureName}</Typography>
                <FormControl className={classes.formControl}>
                    <FormLabel id="demo-radio-buttons-group-label">Are the original figure segmented correctly?</FormLabel>
                    <RadioGroup
                    row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl className={classes.formControl}>
                <FormLabel id="demo-radio-buttons-group-label">How many subfigures should be segmented from the original figure?</FormLabel>
                                    <TextField
                                    variant="outlined"
                                    type="number"
                                        required
                                        id="howMany"
                                        label=""
                                        placeholder="Type a number"
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "howMany");
                                        }}
                                        error={!editButton && submitted && formValue["howMany"] == ""}
                                        helperText={
                                            !editButton && submitted && formValue["howMany"] == ""
                                                ? "Required *"
                                                : ""
                                        }
                                        value={formValue["howMany"]}
                                    />
                                </FormControl>
                </TableCell>
                <TableCell>
                    {
                        subfigures.length != 0 && subfigures.map((eachFig) => (
                            <>
                <Box className={classes.optionsBox}>

                <img src={'https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/subfigure%2F'+eachFig.subfigure_file+'?alt=media&token=7c65ef7d-8d1b-4e88-b97a-801a045579a3'}  width="350" height="300"/>
                </Box>
                <Box className={classes.optionsBox}>
            <div>
                <Typography><b>Caption:</b> {eachFig.caption}</Typography>
                <Typography><b>Figure ID:</b> {eachFig.figid}</Typography>
                <Typography><b>Object:</b> {eachFig.object}</Typography>
                <Typography><b>Aspect:</b> {eachFig.aspect}</Typography>
                </div>
                </Box>
                <Box className={classes.optionsBox}>
                <FormControl className={classes.formControl}>
                    <FormLabel id="demo-radio-buttons-group-label">Is the object identified correctly? </FormLabel>
                    <RadioGroup
                    row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                <br/>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl className={classes.formControl}>
                <FormLabel id="demo-radio-buttons-group-label">What’s the correct object if you answered “no” above? </FormLabel>
                <br/>
                                    <TextField
                                    variant="outlined"
                                        required
                                        id="howMany"
                                        label=""
                                        placeholder=""
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "howMany");
                                        }}
                                        error={!editButton && submitted && formValue["howMany"] == ""}
                                        helperText={
                                            !editButton && submitted && formValue["howMany"] == ""
                                                ? "Required *"
                                                : ""
                                        }
                                        value={formValue["howMany"]}
                                    />
                                </FormControl>

                </Box>

                <Box className={classes.optionsBox}>
                <FormControl className={classes.formControl}>
                    <FormLabel id="demo-radio-buttons-group-label">Is the aspect identified correctly? </FormLabel>
                    <RadioGroup
                    row
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                <br/>
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl className={classes.formControl}>
                <FormLabel id="demo-radio-buttons-group-label">What’s the correct aspect if you answered “no” above?  </FormLabel>
                <br/>
                                    <TextField
                                    variant="outlined"
                                        required
                                        id="howMany"
                                        label=""
                                        placeholder=""
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "howMany");
                                        }}
                                        error={!editButton && submitted && formValue["howMany"] == ""}
                                        helperText={
                                            !editButton && submitted && formValue["howMany"] == ""
                                                ? "Required *"
                                                : ""
                                        }
                                        value={formValue["howMany"]}
                                    />
                                </FormControl>

                </Box>
                </>
                        ))
                    }
                    <Button variant="contained" onClick={submitAnnotation} className={classes.submitButton}>
                                Submit Info
                            </Button>
                </TableCell>
            </TableRow>

        </TableBody>
        </Table>
</TableContainer>

    )
}