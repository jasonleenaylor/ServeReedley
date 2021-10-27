import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import { createRequest } from "./graphql/mutations";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";

function NeedRequestTable() {
  const [requests, setRequests] = useState([]);
  const columns: Column<any>[] = [
    // Vernacular column
    { title: "Date Of Request", field: "dateOfRequest", type: "datetime" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Address 1", field: "address1" },
    { title: "Address 2", field: "address2" },
    { title: "City", field: "city" },
    { title: "Zip Code", field: "zipCode", type: "numeric" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Spanish Only", field: "spanishOnly", type: "boolean" },
    { title: "Specific Need", field: "specificNeed" },
    { title: "Preferred Contact Time", field: "preferredContactTime" },
    { title: "Request", field: "request" },
    { title: "Status", field: "status" },
    { title: "Note", field: "note" },
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
      address1: "138 n Sunset Ave",
      address2: "",
      city: "Reedley",
      zipCode: 93654,
      phone: "(559) 213-5203",
      email: null,
      spanishOnly: true,
      preferredContactTime: null,
      request: "Clothing",
      specificNeed: "Clothing for 15yr daughter",
      status: "Fulfilled",
      note: "",
      needFulfiller:
        "Audrey Taylor-2 gift baskets/giftcard       Damaris Nunez-pjs",
      dateFulfilled: "",
      followUp: "",
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
      {/* <form onSubmit={handleSubmit}>
        <input type="text" name="Add" />
        <input type="submit" value="Submit" />
      </form> */}
      <div>
        <MaterialTable
          columns={columns}
          icons={tableIcons}
          data={requests}
          title="Need Requests"
        />
      </div>
      <span style={{ width: "20%" }} />
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(NeedRequestTable);
