import { useState } from "react";
import DatePicker from "react-datepicker";
import "./App.css";
import { Amplify, API } from "aws-amplify";
import {
  AmplifySignOut,
  AmplifyAuthenticator,
  AmplifySignIn,
} from "@aws-amplify/ui-react";
import { listRequests } from "./graphql/queries";
import { ILocalizeProps, NeedRequestType } from "./needRequestTypes";
import awsExports from "./aws-exports";
import {
  Button,
  Card,
  CardHeader,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  Typography,
  TableHead,
  TableBody,
} from "@material-ui/core";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import "react-datepicker/dist/react-datepicker.css";
import { NeedType, RequestStatus } from "./RequestAPI";
import { request } from "http";

Amplify.configure(awsExports);

export function ReportForm(props: ILocalizeProps) {
  const [apiData, setApiData] = useState([{}]);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [submitting, setSubmitting] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  const needTypeTuples = [
    { label: "Car Repair", type: NeedType.CARREPAIR },
    { label: "Clothing", type: NeedType.CLOTHING },
    { label: "Furniture", type: NeedType.FURNITURE },
    { label: "Groceries", type: NeedType.GROCERIES },
    { label: "Home Repair", type: NeedType.HOMEREPAIR },
    { label: "Household Items", type: NeedType.HOUSEHOLDITEMS },
    { label: "Housing", type: NeedType.HOUSING },
    { label: "Hygene Items", type: NeedType.HYGENEITEMS },
    { label: "Job Training", type: NeedType.JOBTRAINING },
    { label: "Meals", type: NeedType.MEALS },
    { label: "Moving", type: NeedType.MOVING },
    { label: "Other", type: NeedType.OTHER },
  ];
  const statuses = [
    { label: "Fulfilled", type: RequestStatus.FULFILLED },
    { label: "Can't Fulfill", type: RequestStatus.CANTFULFILL },
    { label: "In Progress", type: RequestStatus.INPROGRESS },
    { label: "Vetted", type: RequestStatus.VETTED },
    { label: "New", type: RequestStatus.NEW },
    { label: "Ineligible", type: RequestStatus.INELIGIBLE },
  ];
  const unfulfilledStatuses = [
    { label: "In Progress", type: RequestStatus.INPROGRESS },
    { label: "Vetted", type: RequestStatus.VETTED },
    { label: "New", type: RequestStatus.NEW },
  ];

  function queryStartDate(date: Date): string {
    return new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    ).toISOString();
  }

  function queryEndDate(date: Date): string {
    let nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const utcDate = new Date(
      Date.UTC(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate())
    );
    utcDate.setMilliseconds(utcDate.getMilliseconds() - 1);
    return utcDate.toISOString();
  }

  async function fetchNeedRequests() {
    if (!startDate || !endDate) {
      return;
    }
    let filter = {
      createdAt: {
        between: [queryStartDate(startDate), queryEndDate(endDate)],
      },
    };
    const requests: any = await API.graphql({
      query: listRequests,
      variables: { limit: 1000, filter: filter },
    });
    setApiData(requests.data.listRequests.items);
  }

  function filterByType(items: {}[], needType: NeedType): {}[] {
    return items.filter((element: any, index: number, array: any) =>
      element.needTypes ? element.needTypes.includes(needType) : false
    );
  }

  function countByStatus(items: {}[], status: RequestStatus): number {
    return items.filter(
      (element: any, index: number, array: any) => element.status === status
    ).length;
  }

  function countByNeedType(items: {}[], needType: NeedType): number {
    return items.filter((element: any, index: number, array: any) =>
      element.needTypes ? element.needTypes.includes(needType) : false
    ).length;
  }

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>

      <ThemeProvider theme={theme}>
        <Grid container spacing={4} direction="column" justifyContent="center">
          <Grid item>
            <Card style={{ padding: 12, width: "60%", alignSelf: "center" }}>
              <CardHeader
                title={"Report Range"}
                titleTypographyProps={{ variant: "h6" }}
              />
              <Grid
                container
                direction="column"
                justifyContent="center"
                spacing={3}
              >
                <Grid item xs={4}>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    onClick={async () => {
                      setSubmitting(true);
                      await fetchNeedRequests();
                      setSubmitting(false);
                      setDataFetched(true);
                    }}
                  >
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          {dataFetched && (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={
                    "Requests from: " +
                    (startDate
                      ? startDate.toLocaleDateString()
                      : "Set start date") +
                    " to: " +
                    (endDate ? endDate.toLocaleDateString() : "Set end date")
                  }
                  titleTypographyProps={{ variant: "h6" }}
                />
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 20 }} align="left">
                          Total Requests
                        </TableCell>
                        {statuses.map((status) => (
                          <TableCell style={{ width: 14 }} align="left">
                            {status.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ width: 20 }} align="left">
                          {apiData.length}
                        </TableCell>
                        {statuses.map((status) => (
                          <TableCell style={{ width: 14 }} align="left">
                            {countByStatus(apiData, status.type)}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          )}
          {dataFetched && (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={"Requests fulfilled by need type"}
                  titleTypographyProps={{ variant: "h6" }}
                />
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 8 }}>Need Type</TableCell>
                        <TableCell style={{ width: 8 }}>Total</TableCell>
                        {statuses.map((status) => (
                          <TableCell style={{ width: 8 }} align="left">
                            {status.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {needTypeTuples.map((needType) => (
                        <TableRow>
                          <TableCell
                            style={{ width: 8 }}
                            component="th"
                            scope="row"
                          >
                            {needType.label}
                          </TableCell>
                          <TableCell style={{ width: 8 }}>
                            {countByNeedType(apiData, needType.type)}
                          </TableCell>
                          {statuses.map((s) => (
                            <TableCell style={{ width: 8 }} align="left">
                              {countByStatus(
                                filterByType(apiData, needType.type),
                                s.type
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          )}
          {dataFetched && (
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={"Unfulfilled Requests"}
                  titleTypographyProps={{ variant: "h6" }}
                />
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell style={{ width: 8 }}>Status</TableCell>
                        <TableCell style={{ width: 8 }}>Date</TableCell>
                        <TableCell style={{ width: 8 }}>Requestor</TableCell>
                        <TableCell style={{ width: 8 }}>Recipient</TableCell>
                        <TableCell style={{ width: 8 }}>
                          Incomplete Needs
                        </TableCell>
                        <TableCell style={{ width: 8 }}>Link</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData
                        .filter((element: any, index: number, array: any) =>
                          unfulfilledStatuses.some(
                            (s) => s.type === element.status
                          )
                        )
                        .sort((a: any, b: any) => {
                          return (
                            new Date(a.dateOfRequest).getTime() -
                            new Date(b.dateOfRequest).getTime()
                          );
                        })
                        .map((request: any) => {
                          function getUnfulfilledNeedsForRequest(
                            needTypes: [],
                            fulfilledNeeds: []
                          ): import("react").ReactNode {
                            return needTypes
                              .filter((x) => {
                                return (
                                  fulfilledNeeds == null ||
                                  !fulfilledNeeds.includes(x)
                                );
                              })
                              .map((n) => {
                                switch (n) {
                                  case "MEALS":
                                    return "Meals";
                                  case "GROCERIES":
                                    return "Groceries";
                                  case "MOVING":
                                    return "Moving";
                                  case "JOBTRAINING":
                                    return "Job Training";
                                  case "HOMEREPAIR":
                                    return "Home Repair";
                                  case "CARREPAIR":
                                    return "Car Repair";
                                  case "HOUSING":
                                    return "Housing";
                                  case "HOUSEHOLDITEMS":
                                    return "Household Items";
                                  case "HYGENEITEMS":
                                    return "Personal/Hygene Items";
                                  case "CLOTHING":
                                    return "Clothing";
                                  case "FURNITURE":
                                    return "Furniture";
                                  case "OTHER":
                                    return "Other";
                                  default:
                                    return "Unmapped";
                                }
                              })
                              .join(",");
                          }

                          return (
                            <TableRow>
                              <TableCell style={{ width: 8 }}>
                                {request.status}
                              </TableCell>
                              <TableCell style={{ width: 8 }}>
                                {new Date(
                                  request.dateOfRequest
                                ).toLocaleDateString("en-US", {
                                  weekday: undefined,
                                  year: "numeric",
                                  month: "short",
                                  day: "2-digit",
                                })}
                              </TableCell>
                              <TableCell style={{ width: 8 }}>
                                {request.firstName + " " + request.lastName}
                              </TableCell>
                              <TableCell style={{ width: 8 }}>
                                {request.selfOrOtherInfo.requestFor}
                              </TableCell>
                              <TableCell style={{ width: 8 }}>
                                {getUnfulfilledNeedsForRequest(
                                  request.needTypes,
                                  request.fulfilledNeeds
                                )}
                              </TableCell>
                              <TableCell style={{ width: 8 }}>
                                <a
                                  href={
                                    "https://crn.servereedley.org/requests?id=" +
                                    request.id
                                  }
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Edit Request
                                </a>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          )}
        </Grid>
      </ThemeProvider>
    </AmplifyAuthenticator>
  );
}
export default ReportForm;
