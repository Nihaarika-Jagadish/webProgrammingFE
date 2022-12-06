import { makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
	width: '100%',
	left: '0',
	bottom: '0',
	background: '#003566',
	color: 'white',
	textAlign: 'center',
    fontSize:'0.7em'
    },
}));

function Footer() {
    const classes = useStyles();
  return (
    <footer className={classes.root}>
<p>Copyright &copy; 2022 Figure Annotation Project by Nihaarika</p>
    </footer>
  );
}

export default Footer;
