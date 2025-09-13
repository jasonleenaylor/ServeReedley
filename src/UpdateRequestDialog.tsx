import * as React from "react";
import { NeedReason, NeedType, NoteType, RequestStatus } from "./RequestAPI";
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
  IFoodInfo,
  IFoodInfoReqType,
  HouseholdItemsGQL,
  IJobTraining,
  ILocalizeProps,
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
  Snackbar,
  TextField,
} from "@mui/material";
import {
  carRepairCard,
  clothingCard,
  ContactCard,
  familySizeCard,
  foodInfoCard,
  forSelfDetailsCard,
  furnitureCard,
  groceriesCard,
  homeRepairCard,
  householdItemsCard,
  hygeneItemsCard,
  jobTrainingCard,
  movingCard,
  needReasonCard,
  otherNeedCard,
} from "./needFormCards";
import theme from "./theme";
import { fetchUserAttributes } from "@aws-amplify/auth";
import Rating from "@mui/material/Rating";
import { RequestedNeedTypesCard } from "./RequestedNeedTypesCard";

export interface SimpleDialogProps {
  open: boolean;
  requestData: NeedRequestType;
  onClose: () => void;
  onSave: (value: NeedRequestType) => void;
}

function UpdateRequestDialog(props: SimpleDialogProps & ILocalizeProps) {
  const [requestData, setRequestData] = React.useState(props.requestData);
  const [currentNote, setCurrentNote] = React.useState("");
  const [movingConditions, setMovingConditions] = React.useState(true);
  const [currentNotable, setCurrentNotable] = React.useState<number | null>(0);
  const { onClose, onSave, open } = props;
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState("");

  const handleClose = () => {
    onClose();
  };
  const handleDlgClose = (event: any, reason: string) => {
    if (reason && reason === "backdropClick") return;
    handleClose();
  };
  const handleSave = async () => {
    await handleNewNote();
    onSave(requestData);
  };

  const handleNewNote = async () => {
    if (!currentNote) return;
    if (!requestData.note?.items) {
      requestData.note!.items = [];
    }
    let userInfo = await fetchUserAttributes();
    if (!userInfo || !userInfo.email) {
      throw new Error("No user email info found");
    }
    requestData.note?.items.push({
      id: CREATE_TABLE,
      content: currentNote,
      author: userInfo.email,
      requestID: requestData.id,
      notable: currentNotable === 0 ? false : true,
      dateCreated: new Date().toUTCString(),
      createdAt: new Date().toUTCString(),
      updatedAt: "",
      __typename: "NoteType",
    });
    setCurrentNote("");
  };
  const cardStyle = { padding: 12 };

  function showSnackBarMessage(message: string): void {
    setSnackBarMessage(message);
    setSnackBarOpen(true);
  }

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
                title="Spanish Speaking"
                titleTypographyProps={{ variant: "h6" }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!requestData.spanishOnly}
                    onChange={(_event, checked) =>
                      setRequestData({ ...requestData, spanishOnly: checked })
                    }
                    name="spanishPreferred"
                  />
                }
                label="Spanish Preferred"
              />
            </Card>
          </Grid>
          <Grid item>
            <ContactCard
              firstName={requestData.firstName}
              setFirstName={(value: string) =>
                setRequestData({ ...requestData, firstName: value })
              }
              lastName={requestData.lastName}
              setLastName={(value: string) =>
                setRequestData({ ...requestData, lastName: value })
              }
              phone={requestData.phone!}
              setPhone={(value: string) => {
                setRequestData({ ...requestData, phone: value });
              }}
              email={requestData.email ? requestData.email : ""}
              setEmail={(value: string) =>
                setRequestData({ ...requestData, email: value })
              }
              address={requestData.address!}
              setAddress={(value: string) =>
                setRequestData({ ...requestData, address: value })
              }
              city={requestData.city}
              setCity={(value: string) =>
                setRequestData({ ...requestData, city: value })
              }
              zip={requestData.zipCode ? requestData.zipCode.toString() : ""}
              setZip={(value: string) =>
                setRequestData({
                  ...requestData,
                  zipCode: value ? parseInt(value) : null,
                })
              }
              agent={
                requestData.selfOrOtherInfo.forSelf
                  ? RadioButtonState.YES
                  : RadioButtonState.NO
              }
              setAgent={(value: RadioButtonState) => {}}
              referee={requestData.selfOrOtherInfo.requestFor!}
              setReferee={(value: string) =>
                setRequestData({
                  ...requestData,
                  selfOrOtherInfo: {
                    ...requestData.selfOrOtherInfo,
                    requestFor: value,
                  },
                })
              }
              refereeKnows={
                requestData.selfOrOtherInfo.requestIsKnown
                  ? RadioButtonState.YES
                  : RadioButtonState.NO
              }
              setRefereeKnows={(value: RadioButtonState) => {}}
              otherPersonsPhone={requestData.selfOrOtherInfo.phoneNumber!}
              setOtherPersonsPhone={(value: string) =>
                setRequestData({
                  ...requestData,
                  selfOrOtherInfo: {
                    ...requestData.selfOrOtherInfo,
                    phoneNumber: value,
                  },
                })
              }
              copy={() => {
                showSnackBarMessage("Copied");
              }}
            />
          </Grid>
          <Grid item>
            {requestData.selfOrOtherInfo.forSelf &&
              forSelfDetailsCard(
                requestData.selfOrOtherInfo.usedOtherResources
                  ? RadioButtonState.YES
                  : RadioButtonState.NO,
                (value: RadioButtonState) => {},
                requestData.selfOrOtherInfo.otherResources!,
                (value: string) => {},
                props.t
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
            {RequestedNeedTypesCard(
              needTypeArrayToBooleans(requestData.needTypes),
              (event: React.ChangeEvent<HTMLInputElement>) => {
                setRequestData({
                  ...requestData,
                  needTypes: getNeedTypes({
                    ...needTypeArrayToBooleans(requestData.needTypes),
                    [event.target.name]: event.target.checked,
                  }),
                });
              }
            )}
          </Grid>
          <Grid item>
            {familySizeCard(
              getFoodInfoFromFoodRequest(requestData.foodRequest),
              (newFoodInfo: IFoodInfo) => {
                setRequestData({
                  ...requestData,
                  foodRequest: editOrCreateFoodInfoReq(
                    newFoodInfo,
                    requestData.foodRequest
                  ),
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
                getFoodInfoFromFoodRequest(requestData.foodRequest),
                (newFoodInfo: IFoodInfo) => {
                  setRequestData({
                    ...requestData,
                    foodRequest: editOrCreateFoodInfoReq(
                      newFoodInfo,
                      requestData.foodRequest
                    ),
                  });
                }
              )}{" "}
          </Grid>
          <Grid item>
            {requestData.needTypes.includes(NeedType.GROCERIES) &&
              groceriesCard(
                (requestData.foodRequest as IGroceriesType) || defaultGroceries,
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  // build foodinfo from existing with event data for grocery type
                  let newFoodInfo = {
                    ...getFoodInfoFromFoodRequest(requestData.foodRequest),
                    [event.target.name]: event.target.checked,
                  };
                  setRequestData({
                    ...requestData,
                    foodRequest: editOrCreateFoodInfoReq(
                      newFoodInfo,
                      requestData.foodRequest
                    ),
                  });
                },

                () => showSnackBarMessage("Copied")
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
                    newMovingInfo.haveSpecialConditions === RadioButtonState.YES
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
                (jt: IJobTraining) => {
                  setRequestData({
                    ...requestData,
                    resumeHelp: jt.resumeHelp === RadioButtonState.YES,
                    coverLetterHelp:
                      jt.coverLetterHelp === RadioButtonState.YES,
                  });
                }
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.CARREPAIR) && (
            <Grid item>
              {carRepairCard(requestData.carRepairDetails!, (details) => {
                setRequestData({ ...requestData, carRepairDetails: details });
              })}
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
          {requestData.needTypes.includes(NeedType.HOUSEHOLDITEMS) && (
            <Grid item>
              {householdItemsCard(
                requestData.householdItems || {},
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  // build foodinfo from existing with event data for grocery type
                  let newItems = {
                    ...requestData.householdItems,
                    [event.target.name]: event.target.checked,
                  };
                  setRequestData({
                    ...requestData,
                    householdItems: editOrCreateHouseholdItems(
                      newItems,
                      requestData.householdItems
                    ),
                  });
                },
                () => showSnackBarMessage("Copied")
              )}
            </Grid>
          )}

          {requestData.needTypes.includes(NeedType.HYGENEITEMS) && (
            <Grid item>
              {hygeneItemsCard(
                requestData.householdItems || {},
                (event: React.ChangeEvent<HTMLInputElement>) => {
                  // build foodinfo from existing with event data for grocery type
                  let newItems = {
                    ...requestData.householdItems,
                    [event.target.name]: event.target.checked,
                  };
                  setRequestData({
                    ...requestData,
                    householdItems: editOrCreateHouseholdItems(
                      newItems,
                      requestData.householdItems
                    ),
                  });
                },
                () => showSnackBarMessage("Copied")
              )}
            </Grid>
          )}
          {requestData.needTypes.includes(NeedType.CLOTHING) && (
            <Grid item>
              {clothingCard(
                requestData.clothingType || "",
                requestData.clothingSize || "",
                (type) =>
                  setRequestData({ ...requestData, clothingType: type }),
                (size) =>
                  setRequestData({ ...requestData, clothingSize: size }),
                () => showSnackBarMessage("Copied")
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
                title="Notes And Status"
                titleTypographyProps={{ variant: "h6" }}
              />

              <Grid container spacing={3} style={{ padding: 4 }}>
                <Grid item xs={12}>
                  <Card style={cardStyle}>
                    <CardHeader
                      title="Status"
                      titleTypographyProps={{ variant: "h6" }}
                    />
                    <FormControl fullWidth>
                      <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={requestData.status}
                        label="Status"
                        onChange={(
                          event: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setRequestData({
                            ...requestData,
                            status: event.target.value as RequestStatus,
                          });
                        }}
                      >
                        <MenuItem value={RequestStatus.NEW}>New</MenuItem>
                        <MenuItem value={RequestStatus.VETTED}>Vetted</MenuItem>
                        <MenuItem value={RequestStatus.INPROGRESS}>
                          In Progress
                        </MenuItem>
                        <MenuItem value={RequestStatus.FULFILLED}>
                          Fulfilled!
                        </MenuItem>
                        <MenuItem value={RequestStatus.INELIGIBLE}>
                          Ineligible
                        </MenuItem>
                        <MenuItem value={RequestStatus.CANTFULFILL}>
                          Can't Fulfill
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Card>
                </Grid>{" "}
                <Grid item xs={12}>
                  {RequestedNeedTypesCard(
                    needTypeArrayToBooleans(requestData.needTypes),
                    (event: React.ChangeEvent<HTMLInputElement>) => {
                      let fullfilled = getNeedTypes({
                        ...needTypeArrayToBooleans(requestData.fulfilledNeeds!),
                        [event.target.name]: event.target.checked,
                      });
                      setRequestData({
                        ...requestData,
                        status: updateStatusFromData(requestData, fullfilled),
                        fulfilledNeeds: fullfilled,
                      });
                    },
                    needTypeArrayToBooleans(requestData.fulfilledNeeds),
                    false,
                    requestData,
                    showSnackBarMessage
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Paper style={{ padding: theme.spacing(3) }}>
                    <TextField
                      fullWidth
                      label="New note"
                      variant="outlined"
                      multiline
                      value={currentNote}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCurrentNote(e.currentTarget.value);
                      }}
                    />
                    <Rating
                      name="notableStar"
                      value={currentNotable}
                      max={1}
                      onChange={(_event, newValue) => {
                        setCurrentNotable(newValue);
                      }}
                    />
                  </Paper>
                </Grid>
                {requestData.note?.items
                  ?.sort((a: NoteType | null, b: NoteType | null) => {
                    if (a === null || b === null) {
                      if (a === null) return b === null ? 0 : -1;
                      return 1;
                    }
                    return Date.parse(b.createdAt) - Date.parse(a.createdAt);
                  })
                  .map((note, index) => {
                    return (
                      <Grid item xs={12}>
                        <Paper style={{ padding: theme.spacing(3) }}>
                          <Typography>{note!.createdAt}</Typography>
                          <Typography>{note!.author}</Typography>
                          <Typography>{note!.content}</Typography>
                          <Rating value={note!.notable ? 1 : 0} max={1} />
                        </Paper>
                      </Grid>
                    );
                  })}
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Snackbar
          autoHideDuration={4000}
          message={snackBarMessage}
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
        />
      </Container>
    </Dialog>
  );
}

export interface RequestDialogButtonProps {
  rowData: NeedRequestType;
  onClose: (value: NeedRequestType) => void;
}

function getFoodInfoFromFoodRequest(
  foodRequest: IFoodInfoReqType | null | undefined
): IFoodInfo {
  if (!foodRequest) {
    return {
      familyMembers: 0,
      children: "",
      allergies: "",
      haveAllergies: RadioButtonState.NO,
      deliveryTime: "",
      ...defaultGroceries,
    };
  }
  return {
    // Convert foodinfo type
    ...foodRequest,
    familyMembers: foodRequest?.familyMembers!,
    children: foodRequest?.children || "",
    haveAllergies: foodRequest?.haveAllergies
      ? RadioButtonState.YES
      : RadioButtonState.NO,
    deliveryTime: foodRequest?.deliveryTime || "",
    allergies: foodRequest?.allergies || "",
    beans: foodRequest.beans!!,
    beef: foodRequest.beef!!,
    bread: foodRequest.bread!!,
    butter: foodRequest.butter!!,
    cheese: foodRequest.cheese!!,
    eggs: foodRequest.eggs!!,
    fruit: foodRequest.fruit!!,
    hotdogs: foodRequest.hotdogs!!,
    jelly: foodRequest.jelly!!,
    lunchMeat: foodRequest.lunchMeat!!,
    milk: foodRequest.milk!!,
    peanutButter: foodRequest.peanutButter!!,
    rice: foodRequest.rice!!,
    tortillas: foodRequest.tortillas!!,
  };
}

function needTypeArrayToBooleans(
  requestData: Array<NeedType | null> | null | undefined
): INeedTypes {
  return {
    carRepair: !!requestData?.includes(NeedType.CARREPAIR),
    housing: !!requestData?.includes(NeedType.HOUSING),
    homeRepair: !!requestData?.includes(NeedType.HOMEREPAIR),
    householdItems: !!requestData?.includes(NeedType.HOUSEHOLDITEMS),
    hygeneItems: !!requestData?.includes(NeedType.HYGENEITEMS),
    meals: !!requestData?.includes(NeedType.MEALS),
    furniture: !!requestData?.includes(NeedType.FURNITURE),
    groceries: !!requestData?.includes(NeedType.GROCERIES),
    moving: !!requestData?.includes(NeedType.MOVING),
    jobTraining: !!requestData?.includes(NeedType.JOBTRAINING),
    clothing: !!requestData?.includes(NeedType.CLOTHING),
    other: !!requestData?.includes(NeedType.OTHER),
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

export default function UpdateRequestDialogButton(
  props: SimpleDialogProps & ILocalizeProps
) {
  const [open, setOpen] = React.useState(props.open);

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
        t={props.t}
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

function editOrCreateFoodInfoReq(
  newFoodInfo: IFoodInfo,
  existingTable: IGraphQLTable | null | undefined
): IFoodInfoReqType {
  return {
    ...getTableFields(existingTable),
    haveAllergies: newFoodInfo.haveAllergies === RadioButtonState.YES,
    allergies: newFoodInfo.allergies,
    familyMembers: newFoodInfo.familyMembers,
    deliveryTime: newFoodInfo.deliveryTime,
    children: newFoodInfo.children,
    beans: newFoodInfo.beans,
    beef: newFoodInfo.beef,
    bread: newFoodInfo.bread,
    butter: newFoodInfo.butter,
    eggs: newFoodInfo.eggs,
    fruit: newFoodInfo.fruit,
    hotdogs: newFoodInfo.hotdogs,
    jelly: newFoodInfo.jelly,
    lunchMeat: newFoodInfo.lunchMeat,
    milk: newFoodInfo.milk,
    peanutButter: newFoodInfo.peanutButter,
    rice: newFoodInfo.rice,
    tortillas: newFoodInfo.tortillas,
  };
}
function editOrCreateHouseholdItems(
  items: HouseholdItemsGQL,
  existingTable: IGraphQLTable | null | undefined
): IHomeRepairReqType {
  return {
    ...items,
    ...getTableFields(existingTable),
  };
}

function editOrCreateHomeRepairReq(
  newHomeRepair: IHomeRepairType,
  existingTable: IGraphQLTable | null | undefined
): IHomeRepairReqType {
  return {
    ...getTableFields(existingTable),
    ...newHomeRepair,
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

function updateStatusFromData(
  requestData: NeedRequestType,
  fulfilled: NeedType[]
): RequestStatus {
  if (
    requestData.needTypes.length === fulfilled.length &&
    fulfilled.every((fulfilledItem) =>
      requestData.needTypes.includes(fulfilledItem)
    )
  ) {
    return RequestStatus.FULFILLED;
  }
  return RequestStatus.INPROGRESS;
}
