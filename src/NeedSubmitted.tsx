import { Card, CardMedia, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { cardStyle } from "./needRequestForm";
import logo from "./ServeReedleyLogo.webp";

function NeedSubmitted() {
  const { t } = useTranslation();
  return (
    <Card style={cardStyle}>
      <CardMedia
        component="img"
        height="140"
        image={logo}
        alt="Serve Reedley"
        style={{ width: "590px", height: "114px", justifyContent: "left" }}
      />{" "}
      <div className="about">
        <Typography>{t("form_complete_note")}</Typography>
      </div>
    </Card>
  );
}

export default NeedSubmitted;
