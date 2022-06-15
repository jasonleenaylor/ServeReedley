import React, { useEffect, useState } from "react";
import "./App.css";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import {
  AmplifySignOut,
  AmplifyAuthenticator,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import {
  createFoodInfo,
  createHomeRepairType,
  createMovingInfo,
  createNoteType,
  updateFoodInfo,
  updateHomeRepairType,
  updateMovingInfo,
  updateNoteType,
  updateRequest,
} from "./graphql/mutations";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";
import {
  CreateFoodInfoInput,
  CreateHomeRepairTypeInput,
  CreateMovingInfoInput,
  CreateNoteTypeInput,
  NoteType,
  RequestStatus,
  UpdateFoodInfoInput,
  UpdateHomeRepairTypeInput,
  UpdateMovingInfoInput,
  UpdateNoteTypeInput,
  UpdateRequestInput,
} from "./RequestAPI";
import {
  CREATE_TABLE,
  IFoodInfoReqType,
  IGraphQLTable,
  IHomeRepairReqType,
  IHomeRepairType,
  ILocalizeProps,
  MovingInfoGQL,
  NeedRequestType,
} from "./needRequestTypes";
import UpdateRequestDialogButton from "./UpdateRequestDialog";
import { Grid, Paper, Snackbar, Typography } from "@material-ui/core";
import theme from "./theme";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function NeedRequestTable(props: ILocalizeProps) {
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [requests, setRequests] = useState([]);
  const columns: Column<any>[] = [
    // Vernacular column
    {
      title: "Work on Request",
      field: "modify",
      render: (rowData: NeedRequestType) => {
        return (
          <UpdateRequestDialogButton
            requestData={rowData}
            open={false}
            onClose={function () {
              setSnackBarOpen(true);
            }}
            onSave={async function (value: NeedRequestType) {
              await API.graphql({
                query: updateRequest,
                variables: {
                  input: await needUpdateFromNeedReqData(value),
                },
                authMode: "AMAZON_COGNITO_USER_POOLS",
              });
              fetchNeedRequests();
            }}
            t={props.t}
          />
        );
      },
    },
    { title: "Status", field: "status" },
    {
      title: "Date Of Request",
      field: "dateOfRequest",
      type: "datetime",
      customSort: (a, b) =>
        new Date(b.dateOfRequest).getTime() -
        new Date(a.dateOfRequest).getTime(),
      render: (rowData) =>
        new Date(rowData.dateOfRequest).toLocaleDateString("en-US", {
          weekday: undefined,
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
      cellStyle: { minWidth: 175 },
    },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    {
      title: "Phone",
      field: "phone",
      cellStyle: { minWidth: 150 },
      render: (rowData) => <a href={"tel:" + rowData.phone}>{rowData.phone}</a>,
    },
    { title: "Address", field: "address" },
    { title: "City", field: "city" },
    { title: "Zip Code", field: "zipCode", type: "numeric" },
    { title: "Email", field: "email" },
    { title: "Spanish Only", field: "spanishOnly", type: "boolean" },
    { title: "Specific Need", field: "specificNeed" },
    { title: "Preferred Contact Time", field: "preferredContactTime" },
    { title: "Lead Source", field: "leadSource" },
    {
      title: "Need Reason(s)",
      field: "needReason",
      render: (rowData) => rowData.needReason.join(", "),
    },
    {
      title: "Need Type(s)",
      field: "needTypes",
      cellStyle: { minWidth: 350 },
      render: (rowData) => rowData.needTypes.join(", "),
    },
    { title: "Own Need", field: "selfOrOtherInfo.forSelf" },
    { title: "Other Resources Used", field: "selfOrOtherInfo.otherResources" },
    {
      title: "Requested For (if not self)",
      field: "selfOrOtherInfo.requestFor",
    },
    {
      title: "Requested with knowledge",
      field: "selfOrOtherInfo.requestIsKnown",
    },
    {
      title: "Family Size",
      field: "foodRequest.familyMembers",
    },
    {
      title: "Children",
      field: "foodRequest.children",
    },
    {
      title: "Allergies",
      field: "foodRequest.allergies",
    },
    {
      title: "Groceries",
      field: "foodRequest.groceries",
      cellStyle: {
        minWidth: 250,
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
      render: (rowData) => printGroceryList(rowData.foodRequest), // JSON.stringify(rowData.foodRequest.groceries);
    },
    {
      title: "Moving: Items",
      field: "movingRequest.items",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Moving: Has Vehicle",
      field: "movingRequest.haveTransportation",
      type: "boolean",
    },
    {
      title: "Moving: Special Conditions",
      field: "movingRequest.specialConditions",
      render: (rowData) => printMovingConditions(rowData.movingRequest),
    },
    {
      title: "Moving: Other Special Conditions",
      field: "movingRequest.otherDetails",
    },
    {
      title: "Job: Resume Help",
      field: "resumeHelp",
      type: "boolean",
    },
    {
      title: "Job: Cover Letter Help",
      field: "coverLetterHelp",
      type: "boolean",
    },
    {
      title: "Car Repair Details",
      field: "carRepairDetails",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Home Repair Details",
      field: "homeRepairType.details",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Home Repair Categories",
      field: "homeRepairType",
      render: (rowData) => printHomeRepairList(rowData.homeRepairType), // JSON.stringify(rowData.foodRequest.groceries);
    },
    {
      title: "Clothing Type",
      field: "clothingType",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Clothing Size",
      field: "clothingSize",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Furniture",
      field: "furnitureType",
    },
    {
      title: "Furniture Dimensions",
      field: "furnitureSize",
    },
    {
      title: "Other Needs",
      field: "otherNeeds",
      cellStyle: {
        maxWidth: 350,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
      },
    },
    { title: "Need Fulfiller", field: "needFulfiller" },
    { title: "Date Fulfilled", field: "dateFulfilled", type: "datetime" },
    { title: "Follow Up", field: "followUp" },
  ];

  useEffect(() => {
    fetchNeedRequests();
  }, []);

  function printGroceryList(groceries: {
    milk: boolean;
    eggs: boolean;
    beans: boolean;
    rice: boolean;
    bread: boolean;
    butter: boolean;
    tortillas: boolean;
    peanutButter: boolean;
    jelly: boolean;
    fruit: boolean;
    lunchmeat: boolean;
    hotdogs: boolean;
  }): string {
    let groceryList = "";
    if (groceries) {
      if (groceries.milk) groceryList += ", Milk";
      if (groceries.eggs) groceryList += ", Eggs";
      if (groceries.beans) groceryList += ", Beans";
      if (groceries.bread) groceryList += ", Bread";
      if (groceries.butter) groceryList += ", Butter";
      if (groceries.rice) groceryList += ", Rice";
      if (groceries.tortillas) groceryList += ", Tortillas";
      if (groceries.fruit) groceryList += ", Fruit";
      if (groceries.peanutButter) groceryList += ", Peanut Butter";
      if (groceries.jelly) groceryList += ", Jelly";
      if (groceries.hotdogs) groceryList += ", Hot Dogs";
    }
    return groceryList.substring(2);
  }
  function printMovingConditions(movingRequest: MovingInfoGQL): string {
    let movingConditions = "";
    if (movingRequest) {
      if (movingRequest.steepDriveway) {
        movingConditions += ", Steep Driveway";
      }
      if (movingRequest.unpavedRoad) {
        movingConditions += ", Unpaved Road";
      }
      if (movingRequest.stairs) {
        movingConditions += ", Stairs";
      }
      if (movingRequest.other) {
        movingConditions += ", Other";
      }
    }
    return movingConditions.substring(2);
  }

  function printHomeRepairList(homeRepairType: IHomeRepairType): string {
    let homeRepairs = "";
    if (homeRepairType) {
      if (homeRepairType.plumbing) {
        homeRepairs += ", Plumbing";
      }
      if (homeRepairType.electrical) {
        homeRepairs += ", Electric";
      }
      if (homeRepairType.yardwork) {
        homeRepairs += ", Yardwork";
      }
      if (homeRepairType.painting) {
        homeRepairs += ", Painting";
      }
      if (homeRepairType.other) {
        homeRepairs += ", Other";
      }
    }
    return homeRepairs.substring(2);
  }

  async function fetchNeedRequests() {
    const apiData: any = await API.graphql({ query: listRequests });
    setRequests(apiData.data.listRequests.items);
  }

  const sortByStatusThenDate = (a: any, b: any): number => {
    if (a.status === b.status) {
      return (
        new Date(b.dateOfRequest).getTime() -
        new Date(a.dateOfRequest).getTime()
      );
    } else {
      // statuses are not equal
      if (a.status === RequestStatus.NEW) return -1; // A is new sort above B
      if (b.status === RequestStatus.NEW) return 1; // B is new, sort above A
      if (a.status === RequestStatus.INPROGRESS) return -1; // A is In Progress sort above B
      if (b.status === RequestStatus.INPROGRESS) return 1; // B is In Progress sort above A
      alert("Your logic is flawed.");
      return 1;
    }
  };

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
      <div className="App">
        <div
          style={{
            width: "auto",
            height: "auto",
            overflow: "auto",
            margin: "auto",
          }}
        >
          <MaterialTable<any>
            columns={columns}
            icons={tableIcons}
            data={requests.sort(sortByStatusThenDate)}
            detailPanel={[
              {
                tooltip: "Show Notes",
                render: (row: any) => {
                  return (
                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      {
                        <Grid container spacing={2}>
                          {row.rowData.note?.items
                            ?.sort((a: NoteType, b: NoteType) => {
                              return (
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                              );
                            })
                            ?.map((note: NoteType) => {
                              return (
                                <Grid item xs={12}>
                                  <Paper
                                    style={{
                                      padding: theme.spacing(3),
                                      width: 350,
                                    }}
                                  >
                                    <Typography>
                                      {new Date(
                                        note.createdAt
                                      ).toLocaleDateString()}
                                    </Typography>
                                    <Typography>{note.author}</Typography>
                                    <Typography>{note.content}</Typography>
                                  </Paper>
                                </Grid>
                              );
                            })}
                        </Grid>
                      }
                    </div>
                  );
                },
              },
            ]}
            title="Need Requests"
            options={{
              maxBodyHeight: "300px",
              filtering: true,
              paging: false,
              thirdSortClick: false,
              headerStyle: { position: "sticky" },
            }}
          />
        </div>
        <span style={{ width: "20%" }} />
        <Snackbar
          autoHideDuration={4000}
          message="No changes made"
          open={snackBarOpen}
          onClose={() => setSnackBarOpen(false)}
        />
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
} // NoteRequestTable

function noteCreateFromReqData(value: NoteType): CreateNoteTypeInput {
  return {
    author: value.author,
    content: value.content,
    dateCreated: value.dateCreated,
    requestID: value.requestID,
  };
}

function movingInfoCreateFromReqData(
  value: MovingInfoGQL
): CreateMovingInfoInput {
  return {
    items: value.items,
    haveTransportation: value.haveTransportation,
    other: value.other,
    otherDetails: value.otherDetails,
    liabilityAck: value.liabilityAck,
    stairs: value.stairs,
    steepDriveway: value.steepDriveway,
    unpavedRoad: value.unpavedRoad,
  };
}

function homeRepairCreateFromReqData(
  value: IHomeRepairReqType
): CreateHomeRepairTypeInput {
  return {
    other: value.other,
    painting: value.painting,
    plumbing: value.plumbing,
    yardwork: value.yardwork,
    electrical: value.electrical,
    details: value.details,
  };
}

function foodInfoCreateFromReqData(
  value: IFoodInfoReqType
): CreateFoodInfoInput {
  return {
    allergies: value.allergies,
    children: value.children,
    haveAllergies: value.haveAllergies,
    familyMembers: value.familyMembers,
    milk: value.milk,
    eggs: value.eggs,
    beans: value.beans,
    beef: value.beef,
    bread: value.bread,
    butter: value.butter,
    peanutButter: value.peanutButter,
    cheese: value.cheese,
    fruit: value.fruit,
    hotdogs: value.hotdogs,
    jelly: value.jelly,
    lunchMeat: value.lunchMeat,
    rice: value.rice,
    tortillas: value.tortillas,
  };
}

function noteUpdateFromReqData(value: NoteType): UpdateNoteTypeInput {
  return {
    id: value.id,
    author: value.author,
    content: value.content,
    dateCreated: value.dateCreated,
    requestID: value.requestID,
  };
}

function movingInfoUpdateFromReqData(
  value: MovingInfoGQL & IGraphQLTable
): UpdateMovingInfoInput {
  return {
    id: value.id,
    items: value.items,
    haveTransportation: value.haveTransportation,
    other: value.other,
    otherDetails: value.otherDetails,
    liabilityAck: value.liabilityAck,
    stairs: value.stairs,
    steepDriveway: value.steepDriveway,
    unpavedRoad: value.unpavedRoad,
  };
}

function homeRepairUpdateFromReqData(
  value: IHomeRepairReqType
): UpdateHomeRepairTypeInput {
  return {
    id: value.id,
    other: value.other,
    painting: value.painting,
    plumbing: value.plumbing,
    yardwork: value.yardwork,
    electrical: value.electrical,
    details: value.details,
  };
}

function foodInfoUpdateFromReqData(
  value: IFoodInfoReqType
): UpdateFoodInfoInput {
  return {
    id: value.id,
    allergies: value.allergies,
    children: value.children,
    haveAllergies: value.haveAllergies,
    familyMembers: value.familyMembers,
    milk: value.milk,
    eggs: value.eggs,
    beans: value.beans,
    beef: value.beef,
    bread: value.bread,
    butter: value.butter,
    peanutButter: value.peanutButter,
    cheese: value.cheese,
    fruit: value.fruit,
    hotdogs: value.hotdogs,
    jelly: value.jelly,
    lunchMeat: value.lunchMeat,
    rice: value.rice,
    tortillas: value.tortillas,
  };
}

async function needUpdateFromNeedReqData(
  value: NeedRequestType
): Promise<UpdateRequestInput> {
  if (value.note?.items) {
    value.note?.items
      .filter((n) => n !== null)
      .forEach(async function (note) {
        await createOrUpdate(
          note!,
          createNoteType,
          noteCreateFromReqData,
          updateNoteType,
          noteUpdateFromReqData,
          (_newRowData: any) => {
            // no id needed, notes have the request ID because it is a one to many relationship
            return "";
          }
        );
      });
  }
  if (value.movingRequest) {
    value.movingRequest = await createOrUpdate(
      value.movingRequest,
      createMovingInfo,
      movingInfoCreateFromReqData,
      updateMovingInfo,
      movingInfoUpdateFromReqData,
      (newRowData: any) => {
        return newRowData.createMovingInfo.id;
      }
    );
  }
  if (value.homeRepairType) {
    value.homeRepairType = await createOrUpdate(
      value.homeRepairType,
      createHomeRepairType,
      homeRepairCreateFromReqData,
      updateHomeRepairType,
      homeRepairUpdateFromReqData,
      (newRowData: any) => {
        return newRowData.createHomeRepairType.id;
      }
    );
  }
  if (value.foodRequest) {
    value.foodRequest = await createOrUpdate(
      value.foodRequest,
      createFoodInfo,
      foodInfoCreateFromReqData,
      updateFoodInfo,
      foodInfoUpdateFromReqData,
      (newRowData: any) => {
        return newRowData.createFoodInfo.id;
      }
    );
  }

  return {
    id: value.id,
    firstName: value.firstName,
    lastName: value.lastName,
    needTypes: value.needTypes,
    status: value.status,
    requestMovingRequestId: value.movingRequest?.id,
    requestHomeRepairTypeId: value.homeRepairType?.id,
    requestFoodRequestId: value.foodRequest?.id,
    clothingSize: value.clothingSize,
    clothingType: value.clothingType,
    housingHelp: value.housingHelp,
    resumeHelp: value.resumeHelp,
    coverLetterHelp: value.coverLetterHelp,
    carRepairDetails: value.carRepairDetails,
    furnitureType: value.furnitureType,
    otherNeeds: value.otherNeeds,
    phone: value.phone,
    address: value.address,
    city: value.city,
    email: value.email,
    dateFulfilled: value.dateFulfilled,
    leadSource: value.leadSource,
    zipCode: value.zipCode,
    spanishOnly: value.spanishOnly,
    needFulfiller: value.needFulfiller,
    followUp: value.followUp,
    leadOtherDetails: value.followUp,
    needReason: value.needReason,
  };

  async function createOrUpdate<TableType extends IGraphQLTable>(
    requestTable: TableType,
    createOperation: string,
    tableCreateFromReqData: (reqData: TableType) => any,
    updateOperation: string,
    tableUpdateFromReqData: (reqData: TableType) => any,
    getIdFromCreate: (newRowData: any) => string
  ): Promise<TableType> {
    if (requestTable.id === CREATE_TABLE) {
      let newRow: any = await API.graphql(
        graphqlOperation(createOperation, {
          input: tableCreateFromReqData(requestTable),
        })
      );
      requestTable.id = getIdFromCreate(newRow.data);
    } else if (requestTable.id === "DELETE_TABLE") {
      // delete the row from the table and set requestTable to null
    } else {
      // update the row in the table
      await API.graphql({
        query: updateOperation,
        variables: {
          input: tableUpdateFromReqData(requestTable),
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
    }
    return requestTable;
  }
}

export default NeedRequestTable;
