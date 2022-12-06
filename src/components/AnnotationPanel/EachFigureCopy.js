import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Paper, Radio, RadioGroup, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnotatedPanelResultSelector, AnnotatedPanelResultSelector1, AnnotatedSearchResultSelector, annotateValue, getAnnotatedPanelResult, getAnnotatedPanelResult1, getAnnotatedSearchResult } from "../homePage/homeSlice";
import { tableCellClasses } from '@mui/material/TableCell';
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import history from '../../History';

const useStyles = makeStyles(() => ({
    root: {
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "12vh"
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

export function EachFigureCopy() {
    const { id } = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        "segmentedRight": '',
        "howMany": ''

    });
    const [submitted, setSubmitted] = useState(false);
    const [subfigures, setSubfigures] = useState([]);
    const annotatedPanelResults = useSelector(AnnotatedPanelResultSelector1);
    useEffect(() => {
        if (annotatedPanelResults != undefined && annotatedPanelResults != null && Object.keys(annotatedPanelResults).length != 0 && id != undefined && id != null) {
            setSubfigures(annotatedPanelResults[id]);
            annotatedPanelResults[id].map((eachFig, index) => {
                var temp = {...formValue};
                // temp["objectCorrect" + String(index)] = ''
                // temp["objectText" + String(index)] = ''
                // temp["aspectCorrect" + String(index)] = ''
                // temp["aspectText" + String(index)] = ''
                // setFormValue(temp);
            })
        }
    }, [annotatedPanelResults])

    useEffect(() => {
        if (id != undefined && id != null) {
            dispatch(getAnnotatedPanelResult1(id))
        }
    }, [])


    const handleInputChange = (value, key) => {
        switch (key) {
            case "howMany":
                setFormValue({ ...formValue, howMany: value });
                break;
            case "segmentedRight":
                setFormValue({ ...formValue, segmentedRight: value });
                break;
            default:
                var temp = {...formValue};
                temp[key] = value;
                console.log(key)
                setFormValue(temp)
                break;
        }
    };

    const submitAnnotation = () => {
        setSubmitted(true)
        console.log(formValue)
        if(Object.values(formValue).includes('')){
            Swal.fire('', 'Please fill all the fields. The missing values are highlighted.', 'error').then((result) => {
                })
        }
        else{
            dispatch(annotateValue(localStorage.getItem('user_id'),id))
            setSubmitted(false)
            history.push('/home')
        }
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.heading}>
                Annotation Panel
            </Typography>
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

                                <img src={subfigures[0]?.figure_file_url} width="400" height="450" />
                                <Typography><b>Compound Figure File Name: </b>{id}</Typography>
                                <FormControl className={classes.formControl}>
                                    <FormLabel id="demo-radio-buttons-group-label"
                                        error={submitted && formValue["segmentedRight"] == ""}
                                        helperText={
                                            submitted && formValue["segmentedRight"] == ""
                                                ? "Required *"
                                                : ""
                                        }>Are the original figure segmented correctly?</FormLabel>
                                    <br />
                                    <RadioGroup
                                        row
                                        required
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        onChange={(event, value) => {
                                            handleInputChange(event.target.value, "segmentedRight");
                                        }}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                                    </RadioGroup>
                                </FormControl>
                                <br />
                                <FormControl className={classes.formControl}>
                                    <FormLabel id="demo-radio-buttons-group-label">How many subfigures should be segmented from the original figure?</FormLabel>
                                    <br />
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
                                        error={submitted && formValue["howMany"] == ""}
                                        helperText={
                                            submitted && formValue["howMany"] == ""
                                                ? "Required *"
                                                : ""
                                        }
                                        value={formValue["howMany"]}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell>
                                {
                                    subfigures.length != 0 && subfigures.map((eachFig, index) => (
                                        <>
                                            <Box className={classes.optionsBox}>

                                                <img src={'https://firebasestorage.googleapis.com/v0/b/web-project-eb94d.appspot.com/o/subfigure%2F' + eachFig.subfigure_file + '?alt=media&token=7c65ef7d-8d1b-4e88-b97a-801a045579a3'} width="250" height="200" />
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
                                                    <FormLabel id="demo-radio-buttons-group-label"
                                                        error={submitted && (formValue["objectCorrect" + index] == undefined || formValue["objectCorrect" + index] == "")}
                                                        helperText={
                                                            submitted && (formValue["objectCorrect" + index] == undefined || formValue["objectCorrect" + index] == "")
                                                                ? "Required *"
                                                                : ""
                                                        }
                                                    >Is the object identified correctly? </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        required
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        onChange={(event, value) => {
                                                            handleInputChange(event.target.value, "objectCorrect" + index);
                                                        }}
                                                    >
                                                        <br />
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl className={classes.formControl}>
                                                    <FormLabel id="demo-radio-buttons-group-label">What’s the correct object if you answered “no” above? </FormLabel>
                                                    <br />
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        id="howMany"
                                                        label=""
                                                        placeholder=""
                                                        onChange={(event, value) => {
                                                            handleInputChange(event.target.value, "objectText" + index);
                                                        }}
                                                        // error={submitted && (formValue["objectText" + index] == undefined || formValue["objectText" + index] == "")}
                                                        error={submitted ? (formValue['objectCorrect' + index] == 'No' ? (formValue['objectText' + index] == undefined || formValue['objectText' + index] == '') : false) : false}

                                                        helperText={
                                                            (submitted ? (formValue['objectCorrect' + index] == 'No' ? (formValue['objectText' + index] == undefined || formValue['objectText' + index] == '') : false) : false)
                                                                ? "Required *"
                                                                : ""
                                                        }
                                                        value={formValue["objectText" + index]}
                                                    />
                                                </FormControl>

                                            </Box>
                                            <Box className={classes.optionsBox}>
                                                <FormControl className={classes.formControl}>
                                                    <FormLabel id="demo-radio-buttons-group-label"
                                                        error={submitted && (formValue["aspectCorrect" + index] == undefined || formValue["aspectCorrect" + index] == "")}
                                                        helperText={
                                                            submitted && (formValue["aspectCorrect" + index] == undefined || formValue["aspectCorrect" + index] == "")
                                                                ? "Required *"
                                                                : ""
                                                        }
                                                        
                                                    >Is the object identified correctly? </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        required
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name="radio-buttons-group"
                                                        onChange={(event, value) => {
                                                            handleInputChange(event.target.value, "aspectCorrect" + index);
                                                        }}
                                                    >
                                                        <br />
                                                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                                        <FormControlLabel value="No" control={<Radio />} label="No" />
                                                        <FormControlLabel value="Unknown" control={<Radio />} label="Unknown" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <br />
                                                <FormControl className={classes.formControl}>
                                                    <FormLabel id="demo-radio-buttons-group-label">What’s the correct object if you answered “no” above? </FormLabel>
                                                    <br />
                                                    <TextField
                                                        variant="outlined"
                                                        required
                                                        id="howMany"
                                                        label=""
                                                        placeholder=""
                                                        onChange={(event, value) => {
                                                            handleInputChange(event.target.value, "aspectText" + index);
                                                        }}
                                                        // error={submitted && (formValue["aspectText" + index] == undefined || formValue["aspectText" + index] == "")}
                                                        error = {submitted ? (formValue['aspectCorrect' + index] == 'No' ? (formValue['aspectText' + index] == undefined || formValue['aspectText' + index] == '') : false) : false}
                                                        helperText={
                                                            (submitted ? (formValue['aspectCorrect' + index] == 'No' ? (formValue['aspectText' + index] == undefined || formValue['aspectText' + index] == '') : false) : false)
                                                                ? "Required *"
                                                                : ""
                                                        }
                                                        value={formValue["aspectText" + index]}
                                                    />
                                                </FormControl>

                                            </Box>
                                        </>
                                    ))
                                }
                                <Button variant="contained" onClick={submitAnnotation} className={classes.submitButton}>
                                    Submit Info
                                </Button>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />

                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}