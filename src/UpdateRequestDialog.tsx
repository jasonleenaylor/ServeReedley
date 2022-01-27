import * as React from "react";
import Button from "@mui/material/Button";
import { NeedReason, NeedType, RequestStatus } from "./RequestAPI";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {
  defaultGroceries,
  getNeedTypes,
  IGroceriesType,
  IHomeRepairType,
  IMovingType,
  INeedTypes,
  NeedRequestType,
  RadioButtonState,
  IGraphQLTable,
  CREATE_TABLE,
  IMovingReqType,
  IHomeRepairReqType,
} from "./needRequestTypes";
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Container,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@material-ui/core";
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
  otherNeedCard,
} from "./needFormCards";
import theme from "./theme";

const emails = ["username@gmail.com", "user02@gmail.com"];

export interface SimpleDialogProps {
  open: boolean;
  requestData: NeedRequestType;
  onClose: () => void;
  onSave: (value: NeedRequestType) => void;
}

function UpdateRequestDialog(props: SimpleDialogProps) {
  const [requestData, setRequestData] = React.useState(props.requestData);
  const [currentNote, setCurrentNote] = React.useState("");
  const [movingConditions, setMovingConditions] = React.useState(true);
  const { onClose, onSave, open } = props;

  const handleClose = () => {
    onClose();
  };
  const handleDlgClose = (event: any, reason: string) => {
    if (reason && reason == "backdropClick") return;
    handleClose();
  };
  const handleSave = () => {
    onSave(requestData);
  };

  const handleNewNote = () => {
    if (!requestData.note) {
      requestData.note = [];
    }
    requestData.note.push(currentNote);
    setCurrentNote("");
  };
  const cardStyle = { padding: 12 };

  return (
    <Dialog onClose={handleDlgClose} open={open}>
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>Update Need Request</Box>
          <Box>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <Container>
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "fixed", top: 10, right: 10 }}
          onClick={handleSave}
        >
          <SaveIcon />
        </Fab>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            <Card style={cardStyle}>
              <CardHeader
                title="Status"
                titleTypographyProps={{ variant: "h6" }}
              />
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="status-select"
                  value={requestData.status}
                  label="Status"
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    setRequestData({
                      ...requestData,
                      status: event.target.value as RequestStatus,
                    });
                  }}
                >
                  <MenuItem value={RequestStatus.NEW}>New</MenuItem>
                  <MenuItem value={RequestStatus.INPROGRESS}>
                    In Progress
                  </MenuItem>
                  <MenuItem value={RequestStatus.FULFILLED}>
                    Fulfilled!
                  </MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>
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
          <Grid item>
            {forYouOrOtherCard(
              requestData.selfOrOtherInfo.forSelf
                ? RadioButtonState.YES
                : RadioButtonState.NO,
              (value: RadioButtonState) => {}
            )}
          </Grid>
          <Grid item>
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
          <Grid item>
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
          <Grid item>
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
          <Grid item>
            {needRequestCard(
              needTypeArrayToBooleans(requestData),
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setRequestData({
                  ...requestData,
                  needTypes: getNeedTypes({
                    ...needTypeArrayToBooleans(requestData),
                    [event.target.name]: event.target.checked,
                  }),
                });
              }
            )}
          </Grid>
          <Grid item>
            {(requestData.needTypes?.includes(NeedType.GROCERIES) ||
              requestData.needTypes?.includes(NeedType.MEALS)) &&
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
              )}{" "}
          </Grid>
          <Grid item>
            {requestData.needTypes.includes(NeedType.GROCERIES) &&
              groceriesCard(
                (requestData.foodRequest?.groceries as IGroceriesType) ||
                  defaultGroceries,
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  if (!requestData.foodRequest) {
                  }
                }
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
                  haveSpecialConditions: movingConditions
                    ? RadioButtonState.YES
                    : RadioButtonState.NO,
                  steepDriveway: requestData.movingRequest?.steepDriveway!,
                  stairs: requestData.movingRequest?.stairs!,
                  unpavedRoad: requestData.movingRequest?.unpavedRoad!,
                  other: requestData.movingRequest?.other!,
                  otherDetails: requestData.movingRequest?.otherDetails!,
                  liabilityAck: true,
                },
                (newMovingInfo: IMovingType) => {
                  setMovingConditions(
                    newMovingInfo.haveSpecialConditions == RadioButtonState.YES
                  );
                  let newInfo = editOrCreateMovingReq(
                    newMovingInfo,
                    requestData.movingRequest
                  );
                  let newRequest = { ...requestData, movingRequest: newInfo };
                  setRequestData(newRequest);
                }
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
                (homeRepair) => {
                  setRequestData({
                    ...requestData,
                    homeRepairType: editOrCreateHomeRepairReq(
                      homeRepair,
                      requestData.homeRepairType
                    ),
                  });
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
                          onChange={(_event, checked) =>
                            setRequestData({
                              ...requestData,
                              housingHelp: checked,
                            })
                          }
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
                (type) =>
                  setRequestData({ ...requestData, clothingType: type }),
                (size) => setRequestData({ ...requestData, clothingSize: size })
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.FURNITURE) && (
            <Grid item>
              {furnitureCard(requestData.furnitureType || "", (type) =>
                setRequestData({ ...requestData, furnitureType: type })
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.OTHER) && (
            <Grid item>
              {otherNeedCard(requestData.otherNeeds || "", (otherNeeds) =>
                setRequestData({ ...requestData, otherNeeds: otherNeeds })
              )}
            </Grid>
          )}
          <Grid item>
            <Card style={cardStyle}>
              <CardHeader
                title="Notes"
                titleTypographyProps={{ variant: "h6" }}
              />

              <Grid container spacing={3} style={{ padding: 4 }}>
                {requestData.note?.map((note, index) => {
                  return (
                    <Grid item xs={12}>
                      <Paper style={{ padding: theme.spacing(3) }}>
                        <Typography>{note}</Typography>
                      </Paper>
                    </Grid>
                  );
                })}
                <Grid xs={12} spacing={3} style={{ padding: 4 }}>
                  <TextField
                    fullWidth
                    label="New note"
                    variant="outlined"
                    value={currentNote}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setCurrentNote(e.currentTarget.value);
                    }}
                  />
                  <Button variant="outlined" onClick={handleNewNote}>
                    Add Note
                  </Button>
                </Grid>
              </Grid>
            </Card>
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
    electrical: homeRepairType?.electrical!!,
    painting: homeRepairType?.painting!!,
    plumbing: homeRepairType?.plumbing!!,
    yardwork: homeRepairType?.yardwork!!,
    other: homeRepairType?.other!!,
    details: homeRepairType?.details || "",
  };
}

export default function UpdateRequestDialogButton(props: SimpleDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = (value: NeedRequestType) => {
    setOpen(false);
    props.onSave(value);
  };
  const handleClose = () => {
    setOpen(false);
    props.onClose();
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <UpdateRequestDialog
        requestData={props.requestData}
        open={open}
        onClose={handleClose}
        onSave={handleSave}
      />
    </div>
  );
}

function getTableFields(
  existingTable: IGraphQLTable | null | undefined
): IGraphQLTable {
  if (existingTable) {
    return {
      __typename: existingTable.__typename,
      createdAt: existingTable.createdAt,
      updatedAt: existingTable.updatedAt,
      id: existingTable.id,
    };
  } else {
    return { __typename: "", createdAt: "", updatedAt: "", id: CREATE_TABLE };
  }
}

function editOrCreateHomeRepairReq(
  newHomeRepair: IHomeRepairType,
  existingTable: IGraphQLTable | null | undefined
): IHomeRepairReqType {
  return {
    ...getTableFields(existingTable),
    details: newHomeRepair.details,
    electrical: newHomeRepair.electrical,
    plumbing: newHomeRepair.plumbing,
    painting: newHomeRepair.painting,
    yardwork: newHomeRepair.yardwork,
    other: newHomeRepair.other,
  };
}

function editOrCreateMovingReq(
  newMovingInfo: IMovingType,
  existingTable: IGraphQLTable | null | undefined
): IMovingReqType | null | undefined {
  return {
    ...getTableFields(existingTable),
    items: newMovingInfo.items,
    haveTransportation:
      newMovingInfo.haveTransportation === RadioButtonState.YES,
    unpavedRoad:
      newMovingInfo.haveSpecialConditions === RadioButtonState.YES &&
      newMovingInfo.unpavedRoad,
    stairs:
      newMovingInfo.haveSpecialConditions === RadioButtonState.YES &&
      newMovingInfo.stairs,
    steepDriveway:
      newMovingInfo.haveSpecialConditions === RadioButtonState.YES &&
      newMovingInfo.steepDriveway,
    other:
      newMovingInfo.haveSpecialConditions === RadioButtonState.YES &&
      newMovingInfo.other,
    otherDetails:
      newMovingInfo.haveSpecialConditions === RadioButtonState.YES
        ? newMovingInfo.otherDetails
        : "",
  };
}
