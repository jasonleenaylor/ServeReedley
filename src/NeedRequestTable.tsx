import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import { createRequest } from "./graphql/mutations";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";
import { LeadSource, NeedReason, NeedType, RequestStatus } from "./RequestAPI";

function NeedRequestTable() {
  const [requests, setRequests] = useState([]);
  const columns: Column<any>[] = [
    // Vernacular column
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
    { title: "Need Fulfiller", field: "needFulfiller" },
    { title: "Date Fulfilled", field: "dateFulfilled", type: "datetime" },
    { title: "Follow Up", field: "followUp" },
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

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
        <MaterialTable
          columns={columns}
          icons={tableIcons}
          data={requests}
          title="Need Requests"
          options={{ filtering: true }}
        />
      </div>
      <span style={{ width: "20%" }} />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(NeedRequestTable);
