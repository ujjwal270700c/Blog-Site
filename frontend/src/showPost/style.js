import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0),
      //width: theme.spacing(65),
      //height: theme.spacing(160),
    },
  },
  side: {
    width: "300px",
    height: "max",
    paddingTop:"500px"
    
  },
  main: {
    width: "900px",
    height: "max",
    padding:"40px"
  },
  img: {
    width: "10px",
    height: "100px",
  },
}));
