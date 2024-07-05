import React from "react";
import { Typography, Card, CardContent, Box, Button } from "@material-ui/core";
import { t } from "i18next";
import {
  HouseholdItemsGQL,
  IGroceriesType,
  NeedRequestType,
  RadioButtonState,
} from "./needRequestTypes";
import {
  ContactCardData,
  getCopyTextForContactInfo,
  getGroceriesListText,
  getHouseholdItemsText,
} from "./needFormCards";
import { ContentCopy } from "@mui/icons-material";
import { NeedType } from "./RequestAPI";

interface NeedSummaryForTeamProps {
  needType: NeedType;
  request: NeedRequestType;
}
function mapNeedRequestToContactCardData(
  request: NeedRequestType
): ContactCardData {
  return {
    ...request,
    phone: request.phone || "",
    email: request.email || "",
    address: request.address || "",
    zip: request.zipCode?.toString() || "",
    agent: request.selfOrOtherInfo.forSelf
      ? RadioButtonState.YES
      : RadioButtonState.NO,
    referee: request.selfOrOtherInfo.requestFor || "",
    otherPersonsPhone: request.selfOrOtherInfo.phoneNumber || "",
  };
}
const CopyableText = (text: string) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <Box>
      <Typography style={{ whiteSpace: "pre-wrap" }}>{text}</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCopy}
        startIcon={<ContentCopy />}
      >
        Copy
      </Button>
    </Box>
  );
};

const getDeliveryDetails = (request: NeedRequestType): string => {
  let details = "";

  if (request.foodRequest?.familyMembers) {
    details += `Family Size| ${request.foodRequest.familyMembers}\n`;
  }

  if (request.foodRequest?.deliveryTime) {
    details += `Preferred Delivery Time| ${request.foodRequest.deliveryTime}\n`;
  }
  return details;
};

const NeedSummaryForTeam: React.FC<NeedSummaryForTeamProps> = ({
  needType,
  request,
}) => {
  // Function to get the summary details based on needType and request
  const getSummaryDetails = () => {
    switch (needType) {
      case NeedType.GROCERIES:
        return `${getDeliveryDetails(request)}Items| ${getGroceriesListText(
          request.foodRequest as IGroceriesType
        )}`;
      case NeedType.MEALS:
        return t("meals_summary");
      case NeedType.CLOTHING:
        return t("clothing_summary");
      case NeedType.FURNITURE:
        return t("furniture_summary");
      case NeedType.CARREPAIR:
        return t("car_repair_summary");
      case NeedType.HOMEREPAIR:
        return t("home_repair_summary");
      case NeedType.HYGENEITEMS:
        return t("hygiene_items_summary");
      case NeedType.HOUSEHOLDITEMS:
        return `${getDeliveryDetails(request)}Items| ${getHouseholdItemsText(
          request.householdItems as HouseholdItemsGQL
        )}`;
      case NeedType.HOUSING:
        return t("housing_summary");
      case NeedType.JOBTRAINING:
        return t("job_training_summary");
      case NeedType.MOVING:
        return t("moving_assistance_summary");
      case NeedType.OTHER:
        return t("other_summary");
      default:
        return t("default_summary");
    }
  };

  return (
    <Card>
      <CardContent>
        {CopyableText(
          getCopyTextForContactInfo(mapNeedRequestToContactCardData(request)) +
            "\n" +
            getSummaryDetails()
        )}
      </CardContent>
    </Card>
  );
};

export default NeedSummaryForTeam;
