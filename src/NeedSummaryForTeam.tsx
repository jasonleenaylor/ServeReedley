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
  ContactCard,
  ContactCardData,
  getCopyTextForContactInfo,
  getGroceriesListText,
  getHouseholdItemsText,
  getHygeneItemsText,
} from "./needFormCards";
import { ContentCopy } from "@mui/icons-material";
import { NeedType } from "./RequestAPI";
import BasicContactInfoCard from "./BasicContactInfoCard";
import mobileCardStyles from "./MobileCardStyles";

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
    details += `Family Size - ${request.foodRequest.familyMembers}\n`;
  }

  if (request.foodRequest?.children) {
    details += `Children ages - ${request.foodRequest.children}\n`;
  }

  if (request.foodRequest?.deliveryTime) {
    details += `Preferred Delivery Time - ${request.foodRequest.deliveryTime}\n`;
  }
  return details;
};

export const getSummaryDetails = (
  needType: NeedType,
  request: NeedRequestType
) => {
  switch (needType) {
    case NeedType.GROCERIES:
      return `${getDeliveryDetails(request)}\nItems - ${getGroceriesListText(
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
      return `${getDeliveryDetails(request)}\nItems - ${getHygeneItemsText(
        request.householdItems as HouseholdItemsGQL
      )}`;
    case NeedType.HOUSEHOLDITEMS:
      return `${getDeliveryDetails(request)}\nItems - ${getHouseholdItemsText(
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

const NeedSummaryForTeam: React.FC<NeedSummaryForTeamProps> = ({
  needType,
  request,
}) => {
  // Function to get the summary details based on needType and request

  var cardStyle = mobileCardStyles();
  return (
    <Card>
      <CardContent>
        <BasicContactInfoCard
          name={request.firstName?.trim() + " " + request.lastName?.trim()}
          address={
            (request.address ? `${request.address}, "` : "") +
            request.city + // City is the only required field (to support homeless requests)
            (request.zipCode ? ", " + request.zipCode : "")
          }
          phone={
            "" +
            (request.selfOrOtherInfo.phoneNumber
              ? request.selfOrOtherInfo.phoneNumber
              : request.phone)
          }
          email={request.email ? request.email : ""}
        />
        <Card className={cardStyle.card}>
          {getSummaryDetails(needType, request)
            .trim()
            .split("\n")
            .map((line, index) => (
              <Typography
                className={cardStyle.text}
                key={index}
                variant="body1"
              >
                {line}
              </Typography>
            ))}
        </Card>
      </CardContent>
    </Card>
  );
};

export default NeedSummaryForTeam;
