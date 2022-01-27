import React, { useEffect, useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import {
  createHomeRepairType,
  createMovingInfo,
  createRequest,
  updateHomeRepairType,
  updateMovingInfo,
  updateRequest,
} from "./graphql/mutations";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";
import {
  CreateHomeRepairTypeInput,
  CreateMovingInfoInput,
  HomeRepairType,
  LeadSource,
  ListRequestsQuery,
  NeedReason,
  NeedType,
  UpdateHomeRepairTypeInput,
  UpdateMovingInfoInput,
  UpdateRequestInput,
} from "./RequestAPI";
import {
  CREATE_TABLE,
  IGraphQLTable,
  IHomeRepairReqType,
  IHomeRepairType,
  IMovingType,
  MovingInfoGQL,
  NeedRequestType,
  RadioButtonState,
} from "./needRequestTypes";
import UpdateRequestDialogButton from "./UpdateRequestDialog";
import {
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import theme from "./theme";

function NeedRequestTable() {
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
              await API.graphql(
                graphqlOperation(updateRequest, {
                  input: await needUpdateFromNeedReqData(value),
                })
              );
              fetchNotes();
            }}
          />
        );
      },
    },
    { title: "Status", field: "status" },
    { title: "Date Of Request", field: "dateOfRequest", type: "datetime" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Address", field: "address" },
    { title: "City", field: "city" },
    { title: "Zip Code", field: "zipCode", type: "numeric" },
    { title: "Phone", field: "phone" },
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
      render: (rowData) => printGroceryList(rowData.foodRequest?.groceries), // JSON.stringify(rowData.foodRequest.groceries);
    },
    {
      title: "Moving: Items",
      field: "movingRequest.items",
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
    },
    {
      title: "Home Repair Details",
      field: "homeRepairType.details",
    },
    {
      title: "Home Repair Categories",
      field: "homeRepairType",
      render: (rowData) => printHomeRepairList(rowData.homeRepairType), // JSON.stringify(rowData.foodRequest.groceries);
    },
    {
      title: "Clothing Type",
      field: "clothingType",
    },
    {
      title: "Clothing Size",
      field: "clothingSize",
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
    },
    { title: "Need Fulfiller", field: "needFulfiller" },
    { title: "Date Fulfilled", field: "dateFulfilled", type: "datetime" },
    { title: "Follow Up", field: "followUp" },
  ];

  useEffect(() => {
    fetchNotes();
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

  async function fetchNotes() {
    const apiData: any = await API.graphql({ query: listRequests });
    setRequests(apiData.data.listRequests.items);
  }

  return (
    <div className="App">
      <div>
        <MaterialTable<any>
          columns={columns}
          icons={tableIcons}
          data={requests}
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
                        {row.rowData.note?.map((note: any) => {
                          return (
                            <Grid item xs={12}>
                              <Paper
                                style={{
                                  padding: theme.spacing(3),
                                  width: 350,
                                }}
                              >
                                <Typography>{note}</Typography>
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
            filtering: true,
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
  );
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

async function needUpdateFromNeedReqData(
  value: NeedRequestType
): Promise<UpdateRequestInput> {
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

  return {
    id: value.id,
    firstName: value.firstName,
    lastName: value.lastName,
    note: value.note,
    needTypes: value.needTypes,
    status: value.status,
    requestMovingRequestId: value.movingRequest?.id,
    requestHomeRepairTypeId: value.homeRepairType?.id,
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
    if (requestTable.id == CREATE_TABLE) {
      alert(JSON.stringify(tableCreateFromReqData(requestTable)));
      let newRow: any = await API.graphql(
        graphqlOperation(createOperation, {
          input: tableCreateFromReqData(requestTable),
        })
      );
      requestTable.id = getIdFromCreate(newRow.data);
    } else if (requestTable.id == "DELETE_TABLE") {
      // delete the row from the table and set requestTable to null
    } else {
      // update the row in the table
      await API.graphql(
        graphqlOperation(updateOperation, {
          input: tableUpdateFromReqData(requestTable),
        })
      );
    }
    return requestTable;
  }
}

export default withAuthenticator(NeedRequestTable);
