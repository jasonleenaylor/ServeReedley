import React, { useEffect, useState } from "react";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import { createRequest, updateRequest } from "./graphql/mutations";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";
import {
  LeadSource,
  ListRequestsQuery,
  NeedReason,
  NeedType,
  RequestStatus,
  UpdateRequestInput,
} from "./RequestAPI";
import {
  IHomeRepairType,
  MovingInfoGQL,
  NeedRequestType,
} from "./needRequestTypes";
import UpdateRequestDialogButton from "./UpdateRequestDialog";

function NeedRequestTable() {
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
            onClose={async function (value: NeedRequestType) {
              await API.graphql(
                graphqlOperation(updateRequest, {
                  input: needUpdateFromNeedReqData(value),
                })
              );
              fetchNotes();
            }}
          />
        );
      },
    },
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
    { title: "Status", field: "status" },
    { title: "Note", field: "note" },
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

  async function addNotes() {
    let request = {
      dateOfRequest: "12/06/2020",
      firstName: "Teresa",
      lastName: "Pulido",
      address: "138 n Sunset Ave",
      city: "Reedley",
      zipCode: 93654,
      phone: "(559) 213-5203",
      email: null,
      spanishOnly: true,
      preferredContactTime: null,
      request: "Clothing",
      leadSource: LeadSource.OTHER,
      leadOtherDetails: "I heard it on the grapevine",
      needReason: [NeedReason.FINANCIAL, NeedReason.ILLNESS],
      needTypes: [NeedType.GROCERIES],
      status: RequestStatus.NEW,
      note: "Testing api",
    };
    await API.graphql(graphqlOperation(createRequest, { input: request }));
  }

  const handleSubmit = async (event: any) => {
    //  alert("need submitted: " + event.currentTarget.elements[0].value);
    addNotes();
    event.preventDefault();
  };

  return (
    <div className="App">
      {
        <form onSubmit={handleSubmit}>
          <input type="text" name="Add" />
          <input type="submit" value="Submit" />
        </form>
      }
      <div>
        <MaterialTable<any>
          columns={columns}
          icons={tableIcons}
          data={requests}
          title="Need Requests"
          options={{ filtering: true }}
          // editable={{
          //   onRowUpdate: (
          //     newData: ListRequestsQuery,
          //     oldData: ListRequestsQuery
          //   ) =>
          //     new Promise(async (resolve, reject) => {
          //       await props
          //         .onRowUpdate(newData, oldData)
          //         .then(resolve)
          //         .catch((reason) => {
          //           alert(translate(reason));
          //           reject(reason);
          //         });
          //     }),
          // }}
        />
      </div>
      <span style={{ width: "20%" }} />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(NeedRequestTable);
function needUpdateFromNeedReqData(value: NeedRequestType): UpdateRequestInput {
  return { id: value.id, firstName: value.firstName, lastName: value.lastName };
}
