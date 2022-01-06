import * as React from "react";
import Button from "@mui/material/Button";
import {
  LeadSource,
  ListRequestsQuery,
  NeedReason,
  NeedType,
  RequestStatus,
} from "./RequestAPI";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import {
  defaultGroceries,
  getNeedTypes,
  IGroceriesType,
  IHomeRepairType,
  INeedTypes,
  NeedRequestType,
  RadioButtonState,
} from "./needRequestTypes";
import {
  Card,
  CardHeader,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import {
  carRepairCard,
  clothingCard,
  contactCard,
  foodInfoCard,
  forOtherDetailsCard,
  forSelfDetailsCard,
  forYouOrOtherCard,
  furnitureCard,
  groceriesCard,
  homeRepairCard,
  jobTrainingCard,
  movingCard,
  nameCard,
  needReasonCard,
  needRequestCard,
} from "./needFormCards";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  requestData: NeedRequestType;
  onClose: (value: NeedRequestType) => void;
}

function UpdateRequestDialog(props: SimpleDialogProps) {
  const [requestData, setRequestData] = React.useState(props.requestData);
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(requestData);
  };
  const cardStyle = { padding: 12 };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Update Request Information</DialogTitle>
      <Container>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            {nameCard(
              requestData.firstName,
              (value: string) =>
                setRequestData({ ...requestData, firstName: value }),
              requestData.lastName,
              (value: string) =>
                setRequestData({ ...requestData, lastName: value })
            )}
          </Grid>
          <Grid item>
            {contactCard(
              requestData.phone!,
              (value: string) => {
                setRequestData({ ...requestData, phone: value });
              },
              requestData.email ? requestData.email : "",
              (value: string) =>
                setRequestData({ ...requestData, email: value }),
              requestData.address!,
              (value: string) =>
                setRequestData({ ...requestData, address: value }),
              requestData.city,
              (value: string) =>
                setRequestData({ ...requestData, city: value }),
              requestData.zipCode ? requestData.zipCode.toString() : "",
              (value: string) =>
                setRequestData({
                  ...requestData,
                  zipCode: value ? parseInt(value) : null,
                })
            )}
          </Grid>
          <Grid>
            {forYouOrOtherCard(
              requestData.selfOrOtherInfo.forSelf
                ? RadioButtonState.YES
                : RadioButtonState.NO,
              (value: RadioButtonState) => {}
            )}
          </Grid>
          <Grid>
            {requestData.selfOrOtherInfo.forSelf &&
              forSelfDetailsCard(
                requestData.selfOrOtherInfo.usedOtherResources
                  ? RadioButtonState.YES
                  : RadioButtonState.NO,
                (value: RadioButtonState) => {},
                requestData.selfOrOtherInfo.otherResources!,
                (value: string) => {}
              )}
          </Grid>
          <Grid>
            {!requestData.selfOrOtherInfo.forSelf &&
              forOtherDetailsCard(
                requestData.selfOrOtherInfo.requestFor!,
                (value: string) =>
                  setRequestData({
                    ...requestData,
                    selfOrOtherInfo: {
                      ...requestData.selfOrOtherInfo,
                      requestFor: value,
                    },
                  }),
                requestData.selfOrOtherInfo.requestIsKnown
                  ? RadioButtonState.YES
                  : RadioButtonState.NO,
                (value: RadioButtonState) => {}
              )}
          </Grid>
          <Grid>
            {needReasonCard(
              {
                illness: requestData.needReason.includes(NeedReason.ILLNESS),
                financial: requestData.needReason.includes(
                  NeedReason.FINANCIAL
                ),
                covid: requestData.needReason.includes(NeedReason.COVID),
              },
              (value: React.ChangeEvent<HTMLInputElement>) => {}
            )}
          </Grid>
          <Grid>
            {needRequestCard(
              needTypeArrayToBooleans(requestData),
              (event: React.ChangeEvent<HTMLInputElement>) => {
                requestData.needTypes = getNeedTypes({
                  ...needTypeArrayToBooleans(requestData),
                  [event.target.name]: event.target.checked,
                });
              }
            )}
          </Grid>
          <Grid>
            {requestData.needTypes?.includes(NeedType.MEALS) ||
              (requestData.needTypes?.includes(NeedType.GROCERIES) &&
                foodInfoCard(
                  requestData.needTypes?.includes(NeedType.MEALS) ||
                    requestData.needTypes?.includes(NeedType.GROCERIES),
                  {
                    familyMembers: requestData.foodRequest?.familyMembers!,
                    children: requestData.foodRequest?.children || "",
                    haveAllergies: requestData.foodRequest?.haveAllergies
                      ? RadioButtonState.YES
                      : RadioButtonState.NO,
                    allergies: requestData.foodRequest?.allergies || "",
                  },
                  (newFoodInfo: {}) => {}
                ))}{" "}
          </Grid>
          <Grid>
            {requestData.needTypes.includes(NeedType.GROCERIES) &&
              groceriesCard(
                (requestData.foodRequest?.groceries as IGroceriesType) ||
                  defaultGroceries,
                (event: React.ChangeEvent<HTMLInputElement>) => {}
              )}{" "}
          </Grid>
          {requestData.needTypes.includes(NeedType.MOVING) && (
            <Grid item>
              {movingCard(
                {
                  withinRange: RadioButtonState.YES,
                  items: requestData.movingRequest?.items!,
                  haveTransportation: requestData.movingRequest
                    ?.haveTransportation
                    ? RadioButtonState.YES
                    : RadioButtonState.NO,
                  haveSpecialConditions: RadioButtonState.YES,
                  driveway: requestData.movingRequest?.steepDriveway!,
                  stairs: requestData.movingRequest?.stairs!,
                  unpavedRoad: requestData.movingRequest?.unpavedRoad!,
                  other: requestData.movingRequest?.other!,
                  otherDetails: requestData.movingRequest?.otherDetails!,
                  liabilityAck: true,
                },
                () => {},
                () => {}
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.JOBTRAINING) && (
            <Grid item>
              {jobTrainingCard(
                {
                  coverLetterHelp: requestData.coverLetterHelp
                    ? RadioButtonState.YES
                    : RadioButtonState.NO,
                  resumeHelp: requestData.resumeHelp
                    ? RadioButtonState.YES
                    : RadioButtonState.NO,
                },
                () => {}
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.CARREPAIR) && (
            <Grid item>
              {carRepairCard(requestData.carRepairDetails!, () => {})}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.HOMEREPAIR) && (
            <Grid item>
              {homeRepairCard(
                homeRepairRequestToInterface(requestData.homeRepairType!),
                () => {},
                (homeRepair) => {
                  requestData.homeRepairType!.details = homeRepair.details;
                }
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.HOUSING) && (
            <Grid item>
              <Card style={cardStyle}>
                <CardHeader
                  title="Housing Referrals"
                  titleTypographyProps={{ variant: "h6" }}
                />
                <Grid container spacing={4}>
                  {" "}
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={requestData.housingHelp!!}
                          name="housingHelp"
                        />
                      }
                      label="I would like additional help with housing"
                    />
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.CLOTHING) && (
            <Grid item>
              {clothingCard(
                requestData.clothingType || "",
                requestData.clothingSize || "",
                (type) => (requestData.clothingType = type),
                (size) => (requestData.clothingSize = size)
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.FURNITURE) && (
            <Grid item>
              {furnitureCard(
                requestData.furnitureType || "",
                (type) => (requestData.furnitureType = type)
              )}
            </Grid>
          )}
        </Grid>
      </Container>
    </Dialog>
  );
}

export interface RequestDialogButtonProps {
  rowData: NeedRequestType;
  onClose: (value: NeedRequestType) => void;
}

function needTypeArrayToBooleans(requestData: NeedRequestType): INeedTypes {
  return {
    carRepair: requestData.needTypes.includes(NeedType.CARREPAIR),
    housing: requestData.needTypes.includes(NeedType.HOUSING),
    homeRepair: requestData.needTypes.includes(NeedType.HOMEREPAIR),
    meals: requestData.needTypes.includes(NeedType.MEALS),
    furniture: requestData.needTypes.includes(NeedType.FURNITURE),
    groceries: requestData.needTypes.includes(NeedType.GROCERIES),
    moving: requestData.needTypes.includes(NeedType.MOVING),
    jobTraining: requestData.needTypes.includes(NeedType.JOBTRAINING),
    clothing: requestData.needTypes.includes(NeedType.CLOTHING),
    other: requestData.needTypes.includes(NeedType.OTHER),
  };
}

function homeRepairRequestToInterface(homeRepairType: {
  plumbing?: boolean | null;
  electrical?: boolean | null;
  painting?: boolean | null;
  yardwork?: boolean | null;
  other?: boolean | null;
  details?: string | null;
}): IHomeRepairType {
  return {
    electrical: homeRepairType.electrical!!,
    painting: homeRepairType.painting!!,
    plumbing: homeRepairType.plumbing!!,
    yardwork: homeRepairType.yardwork!!,
    other: homeRepairType.other!!,
    details: homeRepairType.details || "",
  };
}

export default function UpdateRequestDialogButton(props: SimpleDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: NeedRequestType) => {
    setOpen(false);
    props.onClose(value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <UpdateRequestDialog
        requestData={props.requestData}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
