import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

function NeedSubmitted() {
  const { t } = useTranslation();
  return (
    <div className="about">
      <Typography>{t("form_complete_note")}</Typography>
    </div>
  );
}

export default NeedSubmitted;
