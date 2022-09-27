import { Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from "@material-ui/core";
import Navbar from "../Navbar/Navbar";
import back from '../../images/back.jpeg'

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
        background: 'green',
        minWidth: '100vw',
        backgroundImage: "url('../../images/back.jpeg')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: "fixed",
        backgroundSize: 'cover'
    },
    leftDiv: {
        minWidth: "40vw",
        maxWidth: "40vw",
        minHeight: "120vh",
        zIndex: 3,
        // marginTop: "60px",
        marginLeft: "0px",
        float: "left",
        display: 'inline-block',
        color: "#003566"
    },
    rightDiv: {
        minWidth: "60vw",
        minHeight: '80vh',
        maxHeight: '80vh',
        maxWidth: "60vw",
        marginLeft: "0px",
        float: "right",
        // display:'inline-block',
    },
    welcomeText: {
        fontFamily: 'raleway',
        fontSize: "3.5em",
        marginTop: "30vh",
        textShadow: "0px 3px, 3px 0px, 3px 3px",
        fontWeight: "900"
    },
    legalText: {
        fontFamily: 'raleway',
        fontSize: "2.5em",
        marginTop: "5vh",
        fontWeight: "900"
    },
    belowText: {
        fontFamily: 'raleway',
        fontSize: "1em",
        textShadow: "0px 0.5px, 0.5px 0px, 0.5px 0.5px",
        margin: "5vh"
    },
}))

function Registration() {
    const classes = useStyles();
    return (
        <div>
            <Navbar />
            <div className={classes.root} >
                <div className={classes.leftDiv}>
                    <Typography className={classes.welcomeText} variant="h1">WELCOME TO</Typography>
                    <Typography className={classes.legalText} variant="h6">Figure Annotation</Typography>
                    <Typography className={classes.belowText} variant="h6">Supports annotation of compound figure segmentation and semantic information extraction. </Typography>
                </div>
            </div>
        </div>
    )
}

export default Registration;