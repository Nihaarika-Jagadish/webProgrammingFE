import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AdbIcon from '@mui/icons-material/Adb';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        background:"#003566"
    },
    loginButton:{
        color:"white"
    },
    registerButton:{
        background:"white",
        color:"#003566"
    },
    flexClass:{
        display: 'flex', 
        justifyContent: 'space-between', 
        flexGrow: 1, 
        width: '100%',
    },
    iconClass:{
        padding:"10px 20px 0px 0px",
        height:"50px"
    },
    logoClass:{
        paddingTop:"-10px"
    }
}));
export default function Navbar() {
    const classes = useStyles()
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar className={classes.root}>
            <Box className={classes.flexClass}>
                <Box>
        <AdbIcon className={classes.iconClass}/>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              verticalAlign:"middle"
            }}
          >
            LOGO
          </Typography>
          </Box>
          <Box>
            <Button
            className={classes.loginButton}
            >
                login
            </Button>
            <Button
            className={classes.registerButton}
            >
                Sign up
            </Button>
          </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
