import { makeStyles } from "@material-ui/core/styles";

const mobileCardStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      margin: "10px",
    },
  },
  content: {
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  text: {
    marginBottom: theme.spacing(1),
  },
}));

export default mobileCardStyles;
