import { Card, CardMedia, Typography, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { cardStyle } from "./needRequestForm";
import logo from "./ServeReedleyLogo.webp";
import theme from "./theme";

function NeedSubmitted() {
  const { t } = useTranslation();
  let small = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Card style={cardStyle}>
      <CardMedia
        component="img"
        height="140"
        image={logo}
        alt="Serve Reedley"
        style={{
          width: !small ? "295px" : "590px",
          height: !small ? "57px" : "114px",
          justifyContent: "left",
        }}
      />{" "}
      <div className="about">
        <Typography>{t("form_complete_note")}</Typography>
      </div>
    </Card>
  );
}

export default NeedSubmitted;
