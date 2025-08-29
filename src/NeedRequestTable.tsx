import React, { useEffect, useState } from "react";
import "./App.css";
import { generateClient } from "aws-amplify/api";
import { getCurrentUser } from "@aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
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
import {
  MaterialReactTable,
  MRT_ColumnSizingState,
  type MRT_ColumnDef,
} from "material-react-table";
import { NoteType, RequestStatus, UpdateRequestInput } from "./RequestAPI";
import {
  IHomeRepairType,
  ILocalizeProps,
  MovingInfoGQL,
  NeedRequestType,
} from "./needRequestTypes";
import UpdateRequestDialogButton from "./UpdateRequestDialog";
import { Box, Button, Grid, Paper, Snackbar, Typography } from "@mui/material";
import theme from "./theme";
import awsExports from "./aws-exports";
import Rating from "@mui/material/Rating";
import { Authenticator } from "@aws-amplify/ui-react";
import {
  noteCreateFromReqData,
  movingInfoCreateFromReqData,
  homeRepairCreateFromReqData,
  foodInfoCreateFromReqData,
  noteUpdateFromReqData,
  movingInfoUpdateFromReqData,
  homeRepairUpdateFromReqData,
  foodInfoUpdateFromReqData,
  createOrUpdate,
} from "./needRequestDataUtils";

Amplify.configure(awsExports);

function hasNotableNote(request: NeedRequestType): boolean {
  return !!request.note?.items.some((e) => e?.notable === true);
}
function NeedRequestTable(props: ILocalizeProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [requests, setRequests] = useState([]);
  const requestId = new URLSearchParams(window.location.search).get("id");
  const [editId, setEditId] = useState(requestId);
  const graphqlClient = generateClient();
  const [columnSizing, setColumnSizing] = useState<MRT_ColumnSizingState>({});
  const columns: MRT_ColumnDef<NeedRequestType>[] = [
    // Vernacular
    {
      accessorKey: "notable",
      header: "★",
      Cell: ({ row }) => (
        <Rating value={hasNotableNote(row.original) ? 1 : 0} max={1} />
      ),
    },
    // Work on Request
    {
      accessorKey: "modify",
      header: "Work on Request",
      Cell: ({ row }) => (
        <UpdateRequestDialogButton
          requestData={row.original}
          open={false}
          onClose={() => setSnackBarOpen(true)}
          onSave={async (value: NeedRequestType) => {
            await graphqlClient.graphql({
              query: updateRequest,
              variables: { input: await needUpdateFromNeedReqData(value) },
              authMode: "userPool",
            });
            fetchNeedRequests();
          }}
          t={props.t}
        />
      ),
      enableColumnFilter: false,
    },
    { accessorKey: "status", header: "Status" },
    // Date of Request
    {
      accessorKey: "dateOfRequest",
      header: "Date Of Request",
      Cell: ({ row }) =>
        new Date(row.original.dateOfRequest).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
      sortingFn: (rowA, rowB, columnId) =>
        new Date(rowA.getValue<string>(columnId)).getTime() -
        new Date(rowB.getValue<string>(columnId)).getTime(),
      muiTableBodyCellProps: { sx: { minWidth: 175 } },
    },
    { accessorKey: "firstName", header: "First" },
    { accessorKey: "lastName", header: "Last" },
    {
      accessorKey: "phone",
      header: "Phone",
      Cell: ({ row }) => (
        <a href={`tel:${row.original.phone}`}>{row.original.phone}</a>
      ),
      muiTableBodyCellProps: { sx: { minWidth: 150 } },
    },
    {
      accessorKey: "address",
      header: "Address",
      muiTableBodyCellProps: { sx: { minWidth: 185 } },
    },
    { accessorKey: "city", header: "City", enableColumnFilter: true },
    {
      accessorKey: "zipCode",
      header: "Zip Code",
      muiTableBodyCellProps: { align: "right" },
    },
    {
      accessorKey: "email",
      header: "Email",
      Cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
      ),
    },
    {
      accessorKey: "spanishOnly",
      header: "Spanish Only",
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
      muiTableBodyCellProps: { align: "center" },
    },
    { accessorKey: "specificNeed", header: "Specific Need" },
    { accessorKey: "preferredContactTime", header: "Preferred Contact Time" },
    { accessorKey: "leadSource", header: "Lead Source" },
    {
      accessorKey: "needReason",
      header: "Need Reason(s)",
      Cell: ({ row }) => row.original.needReason.join(", "),
    },
    {
      accessorKey: "needTypes",
      header: "Need Type(s)",
      Cell: ({ row }) => row.original.needTypes.join(", "),
      muiTableBodyCellProps: { sx: { minWidth: 350 } },
    },
    {
      accessorKey: "selfOrOtherInfo.forSelf",
      header: "Own Need",
    },
    {
      accessorKey: "selfOrOtherInfo.otherResources",
      header: "Other Resources Used",
    },
    {
      accessorKey: "selfOrOtherInfo.requestFor",
      header: "Requested For (if not self)",
      muiTableBodyCellProps: {
        sx: {
          maxWidth: 150,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
      },
    },
    {
      accessorKey: "selfOrOtherInfo.requestIsKnown",
      header: "Requested with knowledge",
    },
    {
      accessorKey: "foodRequest.familyMembers",
      header: "Family Size",
    },
    {
      accessorKey: "foodRequest.children",
      header: "Children",
    },
    {
      accessorKey: "foodRequest.allergies",
      header: "Allergies",
    },
    {
      accessorKey: "foodRequest.groceries",
      header: "Groceries",
      Cell: ({ row }) =>
        row.original.foodRequest
          ? printGroceryList(
              Object.fromEntries(
                Object.entries(row.original.foodRequest).map(([key, value]) => [
                  key,
                  value === null ? undefined : value,
                ])
              )
            )
          : "",
      muiTableBodyCellProps: {
        sx: {
          minWidth: 250,
          maxWidth: 350,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
      },
    },
    {
      accessorKey: "movingRequest.items",
      header: "Moving: Items",
      muiTableBodyCellProps: {
        sx: {
          maxWidth: 350,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        },
      },
    },
    {
      accessorKey: "movingRequest.haveTransportation",
      header: "Moving: Has Vehicle",
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
      muiTableBodyCellProps: { align: "center" },
    },
    {
      accessorKey: "movingRequest.specialConditions",
      header: "Moving: Special Conditions",
      Cell: ({ row }) =>
        row.original.movingRequest
          ? printMovingConditions(row.original.movingRequest)
          : "",
    },
    {
      accessorKey: "movingRequest.otherDetails",
      header: "Moving: Other Special Conditions",
    },
    {
      accessorKey: "resumeHelp",
      header: "Job: Resume Help",
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
      muiTableBodyCellProps: { align: "center" },
    },
    {
      accessorKey: "coverLetterHelp",
      header: "Job: Cover Letter Help",
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
      muiTableBodyCellProps: { align: "center" },
    },
    // …and similarly for the rest (Car Repair, Home Repair, Clothing, Furniture, Other Needs)
    {
      accessorKey: "dateFulfilled",
      header: "Date Fulfilled",
      Cell: ({ row }) =>
        row.original.dateFulfilled
          ? new Date(row.original.dateFulfilled).toLocaleDateString()
          : "",
      sortingFn: (rowA, rowB, columnId) => {
        const a = rowA.getValue<string>(columnId)
          ? new Date(rowA.getValue<string>(columnId)).getTime()
          : 0;
        const b = rowB.getValue<string>(columnId)
          ? new Date(rowB.getValue<string>(columnId)).getTime()
          : 0;
        return a - b;
      },
    },
    { accessorKey: "followUp", header: "Follow Up", enableColumnFilter: true },
  ];

  Hub.listen("auth", (data) => {
    switch (data.payload.event) {
      case "signedIn":
        setIsLoggedIn(true);
        break;
      case "signedOut":
        setIsLoggedIn(false);
        break;
    }
  });
  useEffect(() => {
    const savedSizing = localStorage.getItem("needRequestTableColumnSizing");
    if (savedSizing) {
      setColumnSizing(JSON.parse(savedSizing));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "needRequestTableColumnSizing",
      JSON.stringify(columnSizing)
    );
  }, [columnSizing]);
  useEffect(() => {
    fetchNeedRequests();
    getCurrentUser()
      .then(() => {
        // This code will ONLY run if a user is signed in.
        setIsLoggedIn(true);
      })
      .catch(() => {
        // This code will run if the user is not signed in,
        // or if there's any other authentication error.
        setIsLoggedIn(false);
      });
  }, []);

  function printGroceryList(
    groceries: Partial<{
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
      lunchMeat: boolean;
      hotdogs: boolean;
    }>
  ): string {
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
      if (groceries.lunchMeat) groceryList += ", Lunch Meat";
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
    const apiData: any = await graphqlClient.graphql({
      query: listRequests,
      variables: { limit: 1000 },
    });
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
      if (a.status === RequestStatus.NEW) return -1; // A is New sort above B
      if (b.status === RequestStatus.NEW) return 1; // B is New, sort above A
      if (a.status === RequestStatus.VETTED) return -1; // A is Vetted sort above B
      if (b.status === RequestStatus.VETTED) return 1; // B is Vetted sort above A
      if (a.status === RequestStatus.INPROGRESS) return -1; // A is In Progress sort above B
      if (b.status === RequestStatus.INPROGRESS) return 1; // B is In Progress sort above A
      if (a.status === RequestStatus.FULFILLED) return -1; // A is Fulfilled sort above B
      if (b.status === RequestStatus.FULFILLED) return 1; // B is Fulfilled sort above A
      if (a.status === RequestStatus.INELIGIBLE) return -1; // A is Ineligible sort above B
      if (b.status === RequestStatus.INELIGIBLE) return 1; // B is Ineligible sort above A
      alert("Your logic is flawed.");
      return 1;
    }
  };

  return (
    <Authenticator hideSignUp>
      {({ signOut }) => (
        <div className="App">
          <div
            style={{
              width: "auto",
              height: "auto",
              overflow: "auto",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                px: 3,
                py: 2,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            >
              <Typography variant="h6" component="div">
                Submitted Requests
              </Typography>
            </Box>
            <MaterialReactTable
              columns={columns} // use your fully migrated MRT columns array
              data={requests.sort(sortByStatusThenDate)}
              enableColumnFilters={true}
              enableColumnResizing
              state={{ columnSizing }}
              onColumnSizingChange={setColumnSizing}
              columnResizeMode="onEnd"
              enableMultiSort={false} // replaces thirdSortClick
              initialState={{
                pagination: {
                  pageSize: 20,
                  pageIndex: 0,
                },
                showColumnFilters: true,
              }}
              muiTableHeadCellProps={{
                sx: {
                  "& .MuiBox-root": {
                    // Targets the inner label container
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  },
                },
              }}
              muiPaginationProps={{ rowsPerPageOptions: [20, 40, 100] }}
              renderDetailPanel={({ row }) => (
                <div style={{ textAlign: "left" }}>
                  <Grid container spacing={2}>
                    {row.original.note?.items
                      ?.sort((a: NoteType | null, b: NoteType | null) => {
                        if (a === null || b === null) {
                          if (a === null) return b === null ? 0 : 1;
                          return -1;
                        }
                        return (
                          Date.parse(b.createdAt) - Date.parse(a.createdAt)
                        );
                      })
                      ?.map(
                        (note: NoteType | null) =>
                          note && (
                            <Grid item xs={12} key={note.createdAt}>
                              <Paper
                                style={{
                                  padding: theme.spacing(3),
                                  width: 350,
                                  background: note.notable ? "gold" : "white",
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
                          )
                      )}
                  </Grid>
                </div>
              )}
            />
            {isLoggedIn &&
            editId &&
            requests.length > 0 &&
            requests.findIndex((r: NeedRequestType) => r.id === editId) !==
              -1 ? (
              <UpdateRequestDialogButton
                // Couldn't figure out how to make all the type safety happy so I short circut with any :(
                requestData={
                  requests.find((r: NeedRequestType) => r.id === editId) as any
                }
                open={true}
                onClose={function () {
                  setSnackBarOpen(true);
                  setEditId(null);
                }}
                onSave={async function (value: NeedRequestType) {
                  await graphqlClient.graphql({
                    query: updateRequest,
                    variables: {
                      input: await needUpdateFromNeedReqData(value),
                    },
                    authMode: "userPool",
                  });
                  setEditId(null);
                  fetchNeedRequests();
                }}
                t={props.t}
              />
            ) : null}
          </div>
          <span style={{ width: "20%" }} />
          <Snackbar
            autoHideDuration={4000}
            message="No changes made"
            open={snackBarOpen}
            onClose={() => setSnackBarOpen(false)}
          />
          <Button
            onClick={signOut}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
          >
            Sign Out
          </Button>
        </div>
      )}
    </Authenticator>
  );
} // NoteRequestTable

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
    fulfilledNeeds: value.fulfilledNeeds,
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
    requestSelfOrOtherInfoId: value.selfOrOtherInfo.id,
  };
}

export default NeedRequestTable;
