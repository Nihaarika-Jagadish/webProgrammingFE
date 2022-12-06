import { Box, Button, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import history from '../../History';

const useStyles = makeStyles(() => ({
    root: {
        // position: 'fixed',
	width: '100%',
	left: '0',
	bottom: '0',
	background: '#e5e5e5',
	color: 'black',
	textAlign: 'center',
    fontSize:'1em'
    },
    optionsBox: {
      display: 'flex',
      // marginBottom: "10px",
      marginLeft:"350px",
      marginRight:"250px",
      justifyContent: 'space-between'
  },
  loginButton:{
    color:"black",
    fontFamily: 'Montserrat',
    fontWeight: "900",
    // margin:"0px 10px 0px 10px",
    "&:hover": {
        // background:"black",
        // color:"#003566",
        fontFamily: 'Montserrat',
        fontWeight: "900"
      }
},
}));

function Footer() {
    const classes = useStyles();
  return (
    <footer className={classes.root}>
      <br/>
      <Box className={classes.optionsBox}>
      <img
        src={`/logo1.png`}
        alt=''
        loading="lazy"
        style={{height:"50px"}}
      />
      <div>
<p>Copyright &copy; 2022 <Button className={classes.loginButton} onClick={() => history.push('/home')}>Figure Annotation </Button> Project by Nihaarika using <a href='https://reactjs.org/' style={{color:'black'}}>ReactJS</a> and <a href='https://nodejs.org/en/'  style={{color:'black'}}>NodeJS</a></p>
</div>
</Box>
    </footer>
  );
}

export default Footer;
