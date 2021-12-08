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
  getNeedTypes,
  NeedRequestType,
  RadioButtonState,
} from "./needRequestTypes";
import { Card, Container, Grid, TextField } from "@material-ui/core";
import PhoneInput from "react-phone-input-2";
import {
  contactCard,
  forOtherDetailsCard,
  forSelfDetailsCard,
  forYouOrOtherCard,
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
        </Grid>
      </Container>
    </Dialog>
  );
}

export interface RequestDialogButtonProps {
  rowData: NeedRequestType;
  onClose: (value: NeedRequestType) => void;
}

function needTypeArrayToBooleans(
  requestData: NeedRequestType
): import("c:/Repositories/ServeReedley/src/needRequestTypes").INeedTypes {
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
