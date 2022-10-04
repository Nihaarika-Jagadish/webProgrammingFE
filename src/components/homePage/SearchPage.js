import { Button, makeStyles } from "@material-ui/core"
import SearchIcon from '@mui/icons-material/Search';
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // marginTop: "10vh"
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
      }
}))
export function SearchPage() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div>
            <img
        src={`/logo1.png`}
        // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt=''
        loading="lazy"
        style={{height:"150px"}}
      />
      <div className={classes.wrapper}>
  <div className={classes.label}>Submit your search</div>
  <div className={classes.searchBar}>
    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value="" className={classes.searchQueryInput}/>
    <Button variant="contained" className={classes.submitButton}>
        <SearchIcon/>
                </Button>
  </div>
</div>
</div>
        </div>
    )
}