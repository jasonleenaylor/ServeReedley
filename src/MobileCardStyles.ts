import { styled } from "@mui/material/styles";
import { Card, CardContent, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 300,
  margin: "auto",
  boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
  borderRadius: 10,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    margin: "10px",
  },
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  fontWeight: 500,
}));

export const Text = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
