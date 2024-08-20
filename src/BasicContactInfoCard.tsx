import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import mobileCardStyles from "./MobileCardStyles";

interface ContactInfoProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ContactInfoCard: React.FC<ContactInfoProps> = ({
  name,
  email,
  phone,
  address,
}) => {
  const classes = mobileCardStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textPrimary" gutterBottom>
          {name}
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          {email}
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          {phone}
        </Typography>
        <Typography className={classes.text} color="textSecondary">
          {address}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ContactInfoCard;
