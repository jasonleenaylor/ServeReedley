import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import MaterialTable, { Column } from "@material-table/core";
import tableIcons from "./tableIcons";

function App() {
  const [requests, setRequests] = useState([]);
  const columns: Column<any>[] = [
    // Vernacular column
    { title: "Date Of Request", field: "dateOfRequest" },
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Address 1", field: "address1" },
    { title: "Address 2", field: "address2" },
    { title: "City", field: "city" },
    { title: "Zip Code", field: "zipCode", type: "numeric" },
    { title: "Phone", field: "phone" },
    { title: "Email", field: "email" },
    { title: "Spanish Only", field: "spanishOnly" },
    { title: "Specific Need", field: "specificNeed" },
    { title: "Preferred Contact Time", field: "preferredContactTime" },
    { title: "Request", field: "request" },
    { title: "Status", field: "status" },
    { title: "Note", field: "note" },
    { title: "Need Fulfiller", field: "needFulfiller" },
    { title: "Date Fulfilled", field: "dateFulfilled" },
    { title: "Follow Up", field: "followUp" },
  ];

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData: any = await API.graphql({ query: listRequests });
    setRequests(apiData.data.listRequests.items);
  }

  return (
    <div className="App">
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

export default withAuthenticator(App);
