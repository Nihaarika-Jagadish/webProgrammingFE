import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { AnnotatedSearchResultSelector, ElasticSearchSelector } from './homeSlice';
import TablePagination from '@mui/material/TablePagination';
import { initializeApp } from "firebase/app";
import {ref, getDownloadURL, getStorage, connectStorageEmulator} from "firebase/storage"
import { makeStyles, Typography } from '@material-ui/core';
import { Print } from '@material-ui/icons';
import { styled } from "@material-ui/core";
import { tableCellClasses } from '@mui/material/TableCell';
const firebaseConfig = {
  apiKey: "AIzaSyDlOjVs-VQaFQR7JhAwEp7g5k_c9YrRTcQ",
  authDomain: "web-project-eb94d.firebaseapp.com",
  projectId: "web-project-eb94d",
  storageBucket: "web-project-eb94d.appspot.com",
  messagingSenderId: "358575218186",
  appId: "1:358575218186:web:da61aa44cbac3dbf0989f3",
  measurementId: "G-VL2LXJ13TR"
};
const app = initializeApp({
    apiKey: "AIzaSyDlOjVs-VQaFQR7JhAwEp7g5k_c9YrRTcQ",
    authDomain: "web-project-eb94d.firebaseapp.com",
    projectId: "web-project-eb94d",
    storageBucket: "web-project-eb94d.appspot.com",
    messagingSenderId: "358575218186",
    appId: "1:358575218186:web:da61aa44cbac3dbf0989f3",
    measurementId: "G-VL2LXJ13TR"
  });
const storage = getStorage(app);


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles(() => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      marginTop:"200px",
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


export default function DisplayAnnotatedResultTable() {
    const annotatedSearchResult = useSelector(AnnotatedSearchResultSelector);
    const [totalValue, setTotalValue] = React.useState({})
    const [result, setResult] = React.useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [page, setPage] = React.useState(0);
    React.useEffect(() => {
        if(annotatedSearchResult.length != 0){
            setTotalValue(annotatedSearchResult.length)
            setResult(annotatedSearchResult)
        }
        
    },[annotatedSearchResult])

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
  return (
    <>
    <Typography variant='h4'>The total number of results found: {totalValue}</Typography>
    <br/>
    <br/>

    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
                        <StyledTableCell align="center">Compund Figure File Name</StyledTableCell>
                        <StyledTableCell align="center">Compund Figure</StyledTableCell> 
                        <StyledTableCell align="center">Caption of the figure</StyledTableCell> 
                        {/* <StyledTableCell align="center">Sub figure</StyledTableCell>  */}

                
            
          </TableRow>
        </TableHead>
        <TableBody>
          {result != undefined && result.length != 0 && result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((eachRow, index) => {
            return (
                <TableRow
              key={eachRow.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell>{eachRow['figure_file']}</TableCell>
                <TableCell>
                    <img src={eachRow['figure_file_url']}  width="400" height="400"/>
                </TableCell>
                <TableCell>{eachRow['caption']}</TableCell>
                {/* <TableCell>{eachRow['subfigure_file']}</TableCell> */}

            </TableRow>

            )
            
})}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={result.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}