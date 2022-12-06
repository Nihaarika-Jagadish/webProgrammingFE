import { makeStyles, Typography } from "@material-ui/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnnotatedPanelResultSelector, AnnotatedSearchResultSelector, getAnnotatedPanelResult, getAnnotatedSearchResult } from "../homePage/homeSlice";
import { EachFigure } from "./eachFigure";
const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginTop: "12vh"
    },
    wrapper:{
        width: "100%",
        maxWidth: "31.25rem",
        // margin: "6rem auto",
      },
      
      label: {
        fontSize: ".625rem",
        fontWeight: "400",
        textTransform: "uppercase",
        letterSpacing: "+1.3px",
        marginBottom: "1rem",
      },
      searchBar: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      
      searchQueryInput: {
        width: "100%",
        height: "2.8rem",
        background: "#f5f5f5",
        outline: "none",
        border: "none",
        borderRadius: "1.625rem",
        padding: "0 3.5rem 0 1.5rem",
        fontSize: "1rem",
      },
      
      searchQuerySubmit: {
        width: "3.5rem",
        height: "2.8rem",
        marginLeft: "-3.5rem",
        background: "none",
        border: "none",
        outline: "none",
        "&:hover":{
        cursor: "pointer",
        }
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
      submitButton1:{
        color:"white",
        background:"#003566",
        fontFamily: 'Montserrat',
        fontWeight: "900",
        // width:"1000px",
        "&:hover": {
            color:"#003566",
        background:"white",
        fontFamily: 'Montserrat',
        fontWeight: "900",
          }
      },
      heading: {
        fontFamily: "raleway",
        fontSize: "2.5em",
        color:"#003566",
        textShadow: "0px 2px, 2px 0px, 2px 2px",
        fontWeight: "900",
        padding: "40px",
      },
}))
export function AnnotationPanel() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const annotatedPanelResult = useSelector(AnnotatedPanelResultSelector);


    useEffect(() => {
        dispatch(getAnnotatedPanelResult(localStorage.getItem('user_id')))
    },[])

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.heading}>
                  List of Figures Assigned
                </Typography>
        {
     (annotatedPanelResult != undefined && annotatedPanelResult != null && Object.keys(annotatedPanelResult).length != 0) && 
     Object.keys(annotatedPanelResult).map((eachFigure) => (
        <EachFigure compoundFigureName={eachFigure} subFigures={annotatedPanelResult[eachFigure]}/>
     ))
    }
        </div>
    

    )
}