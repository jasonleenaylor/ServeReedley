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
import {
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  ThemeProvider,
  Typography,
} from "@mui/material";
import theme, { amplifyTheme } from "./theme";
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
      size: 50,
      minSize: 40,
      maxSize: 60,
      Cell: ({ row }) => (
        <Rating value={hasNotableNote(row.original) ? 1 : 0} max={1} />
      ),
    },
    // Work on Request
    {
      accessorKey: "modify",
      header: "Work on Request",
      size: 120,
      minSize: 100,
      maxSize: 150,
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
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    // Date of Request
    {
      accessorKey: "dateOfRequest",
      header: "Date Of Request",
      size: 120,
      minSize: 100,
      maxSize: 150,
      Cell: ({ row }) =>
        new Date(row.original.dateOfRequest).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
      sortingFn: (rowA, rowB, columnId) =>
        new Date(rowA.getValue<string>(columnId)).getTime() -
        new Date(rowB.getValue<string>(columnId)).getTime(),
    },
    {
      accessorKey: "firstName",
      header: "First",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorKey: "lastName",
      header: "Last",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      size: 130,
      minSize: 120,
      maxSize: 160,
      Cell: ({ row }) => (
        <a href={`tel:${row.original.phone}`}>{row.original.phone}</a>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      size: 200,
      minSize: 150,
      maxSize: 300,
    },
    {
      accessorKey: "city",
      header: "City",
      enableColumnFilter: true,
      size: 120,
      minSize: 100,
      maxSize: 180,
    },
    {
      accessorKey: "zipCode",
      header: "Zip Code",
      size: 90,
      minSize: 70,
      maxSize: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 250,
      minSize: 200,
      maxSize: 350,
      Cell: ({ row }) => (
        <a href={`mailto:${row.original.email}`}>{row.original.email}</a>
      ),
    },
    {
      accessorKey: "spanishOnly",
      header: "Spanish Only",
      size: 100,
      minSize: 90,
      maxSize: 120,
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
    },
    {
      accessorKey: "specificNeed",
      header: "Specific Need",
      size: 200,
      minSize: 150,
      maxSize: 350,
    },
    {
      accessorKey: "preferredContactTime",
      header: "Preferred Contact Time",
      size: 180,
      minSize: 150,
      maxSize: 250,
    },
    {
      accessorKey: "leadSource",
      header: "Lead Source",
      size: 120,
      minSize: 100,
      maxSize: 180,
    },
    {
      accessorKey: "needReason",
      header: "Need Reason(s)",
      size: 200,
      minSize: 150,
      maxSize: 350,
      Cell: ({ row }) => row.original.needReason.join(", "),
    },
    {
      accessorKey: "needTypes",
      header: "Need Type(s)",
      size: 250,
      minSize: 200,
      maxSize: 400,
      Cell: ({ row }) => row.original.needTypes.join(", "),
    },
    // Updated with null checks
    {
      accessorFn: (row) => row.selfOrOtherInfo?.forSelf || "",
      id: "selfOrOtherInfo.forSelf",
      header: "Own Need",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorFn: (row) => row.selfOrOtherInfo?.otherResources || "",
      id: "selfOrOtherInfo.otherResources",
      header: "Other Resources Used",
      size: 180,
      minSize: 150,
      maxSize: 250,
    },
    {
      accessorFn: (row) => row.selfOrOtherInfo?.requestFor || "",
      id: "selfOrOtherInfo.requestFor",
      header: "Requested For (if not self)",
      size: 180,
      minSize: 150,
      maxSize: 250,
    },
    {
      accessorFn: (row) => row.selfOrOtherInfo?.requestIsKnown || "",
      id: "selfOrOtherInfo.requestIsKnown",
      header: "Requested with knowledge",
      size: 180,
      minSize: 150,
      maxSize: 250,
    },
    {
      accessorFn: (row) => row.foodRequest?.familyMembers || "",
      id: "foodRequest.familyMembers",
      header: "Family Size",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorFn: (row) => {
        console.log(`${JSON.stringify(row)}`);
        return row.foodRequest?.children || "";
      },
      id: "foodRequest.children",
      header: "Children",
      size: 100,
      minSize: 80,
      maxSize: 150,
    },
    {
      accessorFn: (row) => row.foodRequest?.allergies || "",
      id: "foodRequest.allergies",
      header: "Allergies",
      size: 150,
      minSize: 120,
      maxSize: 250,
    },
    {
      accessorFn: (row) =>
        row.foodRequest
          ? printGroceryList(
              Object.fromEntries(
                Object.entries(row.foodRequest).map(([key, value]) => [
                  key,
                  value === null ? undefined : value,
                ])
              )
            )
          : "",
      id: "foodRequest.groceries",
      header: "Groceries",
      size: 300,
      minSize: 200,
      maxSize: 400,
    },
    {
      accessorFn: (row) => row.movingRequest?.items || "",
      id: "movingRequest.items",
      header: "Moving: Items",
      size: 250,
      minSize: 200,
      maxSize: 400,
    },
    {
      accessorFn: (row) => row.movingRequest?.haveTransportation,
      id: "movingRequest.haveTransportation",
      header: "Moving: Has Vehicle",
      size: 120,
      minSize: 100,
      maxSize: 150,
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
    },
    {
      accessorFn: (row) =>
        row.movingRequest ? printMovingConditions(row.movingRequest) : "",
      id: "movingRequest.specialConditions",
      header: "Moving: Special Conditions",
      size: 220,
      minSize: 180,
      maxSize: 350,
    },
    {
      accessorFn: (row) => row.movingRequest?.otherDetails || "",
      id: "movingRequest.otherDetails",
      header: "Moving: Other Special Conditions",
      size: 250,
      minSize: 200,
      maxSize: 400,
    },
    {
      accessorKey: "resumeHelp",
      header: "Job: Resume Help",
      size: 120,
      minSize: 100,
      maxSize: 150,
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
    },
    {
      accessorKey: "coverLetterHelp",
      header: "Job: Cover Letter Help",
      size: 150,
      minSize: 120,
      maxSize: 180,
      Cell: ({ cell }) => (cell.getValue<boolean>() ? "✅" : "❌"),
      sortingFn: (rowA, rowB, columnId) =>
        (rowA.getValue<boolean>(columnId) ? 1 : 0) -
        (rowB.getValue<boolean>(columnId) ? 1 : 0),
    },
    {
      accessorKey: "dateFulfilled",
      header: "Date Fulfilled",
      size: 130,
      minSize: 110,
      maxSize: 160,
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
    {
      accessorKey: "followUp",
      header: "Follow Up",
      enableColumnFilter: true,
      size: 120,
      minSize: 100,
      maxSize: 180,
    },
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
  const authComponents = {
    SignIn: {
      Header() {
        return (
          <Typography
            variant="h5"
            align="center"
            sx={{
              mb: 2,
              mt: 3, // Add top margin
              pt: 2, // Add top padding
              fontWeight: 600,
            }}
          >
            Sign in to Serve Reedley CRN
          </Typography>
        );
      },
    },
  };
  return (
    <ThemeProvider theme={theme}>
      <Authenticator components={authComponents} hideSignUp>
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
                muiTableProps={{
                  sx: {
                    tableLayout: "fixed",
                    "& .MuiTableCell-body": {
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                    },
                  },
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
                    requests.find(
                      (r: NeedRequestType) => r.id === editId
                    ) as any
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
    </ThemeProvider>
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
