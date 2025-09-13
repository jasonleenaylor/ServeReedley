import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { CSSProperties } from "react";
import { useTeams } from "./useTeams";
import useRequestsById from "./useRequestsById";
import NeedSummaryForTeam, { getSummaryDetails } from "./NeedSummaryForTeam";
import {
  GetRequestQuery,
  NeedType,
  Team,
  TeamMember,
  TeamRequest,
  UpdateRequestMutation,
} from "./RequestAPI";
import { getRequest, getTeamMember, listTeamMembers } from "./graphql/queries";
import { generateClient } from "aws-amplify/api";
import { fetchAuthSession } from "@aws-amplify/auth";
import { NeedRequestType } from "./needRequestTypes";
import { CheckBox } from "@mui/icons-material";
import {
  createAskedMembers,
  createTeamMember,
  updateRequest,
  updateTeamRequest,
} from "./graphql/mutations";
import { Authenticator } from "@aws-amplify/ui-react";

interface Person {
  id: string;
  first_name: string;
  last_name: string;
  last_contacted: string;
  last_filled: string;
  contacts_last_month: number;
  phone: string;
}

interface PeopleProps {
  people: Person[];
  message: string;
  onSelectionChange: (selectedPeople: Person[]) => void;
  onSend: () => void;
  onMarkAsSent: () => void;
  onMarkFulfilled: () => void;
}

const PeopleTable: React.FC<PeopleProps> = ({
  people,
  message,
  onSelectionChange,
  onMarkAsSent,
  onMarkFulfilled,
}) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const [phoneNumbers, setPhoneNumbers] = useState<{ [key: string]: string }>(
    {}
  );

  const getContactInfo = async (
    id: string
  ): Promise<{ mobileNumber: string }> => {
    try {
      const { credentials } = await fetchAuthSession();

      if (!credentials) {
        throw new Error("No credentials available.");
      }

      const client = new LambdaClient({
        region: "us-west-1",
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
      });

      const command = new InvokeCommand({
        FunctionName: `getUserContactInfo-${import.meta.env.VITE_FUNCTION_ENV}`,
        Payload: new TextEncoder().encode(JSON.stringify({ id })),
      });

      const response = await client.send(command);

      if (!response.Payload) {
        return { mobileNumber: "" };
      }

      const payloadParsed = JSON.parse(
        new TextDecoder().decode(response.Payload)
      );
      return JSON.parse(payloadParsed.body);
    } catch (err) {
      console.error(err);
      return { mobileNumber: "" };
    }
  };

  const handleCheckboxChange = async (personId: string) => {
    const updatedSelection = selectedPeople.some(
      (person) => person.id === personId
    )
      ? selectedPeople.filter((person) => person.id !== personId)
      : [...selectedPeople, people.find((person) => person.id === personId)!];
    setSelectedPeople(updatedSelection);
    onSelectionChange(updatedSelection);
    // If the person is newly selected, fetch their phone number from Lambda
    if (!phoneNumbers[personId]) {
      let { mobileNumber } = await getContactInfo(personId);
      if (mobileNumber) {
        setPhoneNumbers((prevNumbers) => ({
          ...prevNumbers,
          [personId]: mobileNumber,
        }));
      }
    }
  };
  // Construct the appropriate SMS link based on the OS
  const isIOS = /iPhone/.test(navigator.userAgent);

  const rows: JSX.Element[] = [];
  people.forEach((person) => {
    rows.push(
      <tr key={person.id}>
        <td style={cellStyle as CSSProperties}>
          <input
            type="checkbox"
            checked={selectedPeople.some(
              (selectedPerson) => selectedPerson.id === person.id
            )}
            onChange={() => handleCheckboxChange(person.id)}
          />
        </td>
        <td style={cellStyle as CSSProperties}>
          {person.first_name?.trim()} {person.last_name?.trim()}
        </td>
        <td style={cellStyle as CSSProperties}>
          {person.last_contacted
            ? new Date(person.last_contacted).toDateString()
            : ""}
        </td>
        <td style={cellStyle as CSSProperties}>
          {person.last_filled
            ? new Date(person.last_filled).toDateString()
            : ""}
        </td>
        <td style={cellStyle as CSSProperties}>{person.contacts_last_month}</td>
      </tr>
    );
  });

  function buildSmsHref(): string {
    const selectedPhoneNumbers = selectedPeople
      .map((p) => `+1${phoneNumbers[p.id]?.replace(/[\+\(\) -]/g, "")}`)
      .join(","); // Join numbers with a comma

    if (isIOS) {
      return `sms://open?addresses=${selectedPhoneNumbers}&body=${encodeURIComponent(
        message
      )}`;
    }

    return `sms:${selectedPhoneNumbers};?&body=${encodeURIComponent(message)}`;
  }

  return (
    <Card>
      <CardHeader title="Select People" />
      <CardContent>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={headerStyle as CSSProperties}>
                <CheckBox />
              </th>
              <th style={headerStyle as CSSProperties}>Name</th>
              <th style={headerStyle as CSSProperties}>Last Contacted</th>
              <th style={headerStyle as CSSProperties}>Last Filled</th>
              <th style={headerStyle as CSSProperties}>
                Contacts in Last Month
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <div>
          <h2>Selected People ({selectedPeople.length})</h2>
          <ul>
            {selectedPeople.map((person) => (
              <li key={person.id}>
                {person.first_name} {person.last_name}
              </li>
            ))}
          </ul>
          <a href={buildSmsHref()}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: "8px" }}
              disabled={selectedPeople.length < 1}
              onClick={onMarkAsSent}
            >
              Send
            </Button>
          </a>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
            disabled={selectedPeople.length < 1}
            onClick={onMarkAsSent}
          >
            Mark as Sent
          </Button>
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
            disabled={selectedPeople.length !== 1}
            onClick={onMarkFulfilled}
          >
            Fulfilled
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface TeamRequestProps {
  request: TeamRequest;
  team: Team;
  people: Person[];
}

interface RequestSummaryProps {
  request: TeamRequest;
}

const OpenTeamRequestSummary: React.FC<RequestSummaryProps> = ({ request }) => {
  return (
    <Typography>{`${new Date(request.askDate).toDateString()} - ${
      request.request.firstName
    }`}</Typography>
  );
};

const OpenTeamRequest: React.FC<TeamRequestProps> = ({
  request,
  team,
  people,
}) => {
  const [needRequest, setNeedRequest] = useState<NeedRequestType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const graphqlClient = generateClient();
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response: any = await graphqlClient.graphql({
          query: getRequest,
          variables: { id: request.requestID },
        });
        setNeedRequest(response.data.getRequest as NeedRequestType);
      } catch (err) {
        setError("Error fetching request");
      }
    };

    fetchRequest();
  }, [request.requestID]);

  if (error) return <div>{error}</div>;
  if (!needRequest) return <div>Loading...</div>;

  const updateFulfilledNeeds = async (
    requestId: string,
    newNeedType: NeedType
  ): Promise<void> => {
    try {
      // Fetch the existing Request data first
      const requestData = (await graphqlClient.graphql({
        query: getRequest,
        variables: { id: requestId },
      })) as { data: GetRequestQuery }; // Cast response to specific query type

      const existingFulfilledNeeds: (NeedType | null)[] =
        requestData.data.getRequest?.fulfilledNeeds || [];

      // Create a new fulfilledNeeds array that includes the new NeedType
      const updatedFulfilledNeeds: (NeedType | null)[] = [
        ...existingFulfilledNeeds,
        newNeedType,
      ];

      // Prepare input for the update mutation
      const input = {
        id: requestId,
        fulfilledNeeds: updatedFulfilledNeeds,
      };

      // Execute the update mutation
      const result = (await graphqlClient.graphql({
        query: updateRequest,
        variables: { input: input },
        authMode: "userPool",
      })) as { data: UpdateRequestMutation }; // Cast response to specific mutation type

      console.log(
        "Request fulfilledNeeds updated successfully:",
        result.data.updateRequest
      );
    } catch (error) {
      console.error("Error updating fulfilledNeeds:", error);
    }
  };

  const handleFulfilled = async () => {
    if (selectedPeople.length != 1) {
      alert("Logic error, only one person can fulfill each request");
      return;
    }
    let askee = selectedPeople[0];
    try {
      // Update team request as fulfilled
      const teamRequest = await graphqlClient.graphql({
        query: updateTeamRequest,
        variables: {
          input: {
            id: request.id,
            filledDate: new Date().toISOString(),
            filledBy: askee.id,
          },
        },
        authMode: "userPool",
      });
      // Step 1: Check if the TeamMember exists
      const existingTeamMemberData = (await graphqlClient.graphql({
        query: getTeamMember,
        variables: {
          breezeId: askee.id,
        },
        authMode: "userPool",
      })) as GraphQLResult<{ getTeamMember: TeamMember }>;
      console.log("Looking up team member:");
      console.log(JSON.stringify(existingTeamMemberData));
      if (existingTeamMemberData.data?.getTeamMember) {
        // Step 2: If exists, update the join table to record the ask
        // unless they already were for this request
        if (
          !existingTeamMemberData.data?.getTeamMember.asks?.items.find(
            (a) => a?.teamRequestID == request.id
          )
        ) {
          const updatedTeamMember = await graphqlClient.graphql({
            query: createAskedMembers,
            variables: {
              input: { teamRequestID: request.id, teamMemberID: askee.id },
            },
            authMode: "userPool",
          });

          console.log("Join table updated:", updatedTeamMember);
        } else {
          console.log("Already asked about this one.");
        }
      } else {
        // Step 3: If doesn't exist, create a new TeamMember
        const newTeamMemberInput = {
          breezeId: askee.id,
          name: askee.first_name.trim() + " " + askee.last_name.trim(),
        };
        console.log("Attempting to create new member.");
        const newTeamMember = await graphqlClient.graphql({
          query: createTeamMember,
          variables: { input: newTeamMemberInput },
          authMode: "userPool",
        });
        console.log("Attempting to update join table.");
        const updatedJoinTable = await graphqlClient.graphql({
          query: createAskedMembers,
          variables: {
            input: { teamRequestID: request.id, teamMemberID: askee.id },
          },
          authMode: "userPool",
        });
        console.log("TeamMember record created:", newTeamMember);
        console.log("Join table updated:", updatedJoinTable);
      }
      updateFulfilledNeeds(request.requestID, request.type);
    } catch (err) {
      console.error("Error creating/updating TeamMember:", err);
    }
  };

  const handleMarkAsSent = async () => {
    for (let askee of selectedPeople) {
      try {
        // Step 1: Check if the TeamMember exists
        const existingTeamMemberData = (await graphqlClient.graphql({
          query: getTeamMember,
          variables: {
            breezeId: askee.id, // Correctly pass the breezeId here
          },
          authMode: "userPool",
        })) as GraphQLResult<{ getTeamMember: TeamMember }>;
        console.log("Looking up team member:");
        console.log(JSON.stringify(existingTeamMemberData));
        if (existingTeamMemberData.data?.getTeamMember) {
          // Step 2: If exists, update the join table to record the ask
          // unless they already were for this request
          if (
            !existingTeamMemberData.data?.getTeamMember.asks?.items.find(
              (a) => a?.teamRequestID == request.id
            )
          ) {
            const updatedTeamMember = await graphqlClient.graphql({
              query: createAskedMembers,
              variables: {
                input: { teamRequestID: request.id, teamMemberID: askee.id },
              },
              authMode: "userPool",
            });

            console.log("Join table updated:", updatedTeamMember);
          } else {
            console.log("Already asked about this one.");
          }
        } else {
          // Step 3: If doesn't exist, create a new TeamMember
          const newTeamMemberInput = {
            breezeId: askee.id,
            name: askee.first_name.trim() + " " + askee.last_name.trim(),
          };
          console.log("Attempting to create new member.");
          const newTeamMember = await graphqlClient.graphql({
            query: createTeamMember,
            variables: { input: newTeamMemberInput },
            authMode: "userPool",
          });
          console.log("Attempting to update join table.");
          const updatedJoinTable = await graphqlClient.graphql({
            query: createAskedMembers,
            variables: {
              input: { teamRequestID: request.id, teamMemberID: askee.id },
            },
            authMode: "userPool",
          });
          console.log("TeamMember record created:", newTeamMember);
          console.log("Join table updated:", updatedJoinTable);
        }
      } catch (err) {
        console.error("Error creating/updating TeamMember:", err);
      }
    }
  };

  return (
    <Card style={{ width: "90%", alignSelf: "center" }}>
      <NeedSummaryForTeam request={needRequest} needType={team.teamType} />
      {request.note && (
        <Card style={{ width: "50%", alignSelf: "center" }}>
          <Typography>Coordinator Notes: {request.note}</Typography>
        </Card>
      )}
      <PeopleTable
        people={people}
        message={getSummaryDetails(team.teamType, needRequest)}
        onSelectionChange={(people) => setSelectedPeople(people)}
        onMarkAsSent={handleMarkAsSent}
        onMarkFulfilled={handleFulfilled}
        onSend={handleMarkAsSent}
      />
    </Card>
  );
};

const headerStyle: CSSProperties = {
  border: "1px solid #dddddd",
  backgroundColor: "#f2f2f2",
  padding: "8px",
  textAlign: "left",
};

const cellStyle: CSSProperties = {
  border: "1px solid #dddddd",
  padding: "8px",
  textAlign: "left",
};

const TeamPicker: React.FC = () => {
  const teamId = new URLSearchParams(window.location.search).get("id");
  const [people, setPeople] = useState<Person[]>([]);
  const { teams, loading: teamsLoading } = useTeams();
  const {
    requests,
    loading: requestsLoading,
    error: teamRequestError,
  } = useRequestsById(teamId);
  const team = teams.find((t) => t.id == teamId);
  const graphqlClient = generateClient();
  const options = [
    { needType: NeedType.OTHER, option_id: "42", name: "Baby Needs" },
    { needType: NeedType.CARREPAIR, option_id: "7", name: "Car Repair" },
    { needType: NeedType.CLOTHING, option_id: "41", name: "Clothing Needs" },
    {
      needType: NeedType.OTHER,
      option_id: "392",
      name: "Counseling or Social Service Support",
    },
    { needType: NeedType.FURNITURE, option_id: "44", name: "Furniture Needs" },
    {
      needType: NeedType.GROCERIES,
      option_id: "9",
      name: "Groceries + Delivery",
    },
    {
      needType: NeedType.HOMEREPAIR,
      option_id: "8",
      name: "Handyman Maintenance",
    },
    {
      needType: NeedType.HOUSEHOLDITEMS,
      option_id: "43",
      name: "Household Items (Bathroom, kitchen, cleaning supplies)",
    },
    { needType: NeedType.MEALS, option_id: "40", name: "Meals + Delivery" },
    { needType: NeedType.MOVING, option_id: "45", name: "Moving + Hauling" },
    {
      needType: NeedType.HYGENEITEMS,
      option_id: "390",
      name: "Personal Care + Hygiene Products",
    },
    {
      needType: NeedType.OTHER,
      option_id: "10",
      name: "Providing Transportation",
    },
    { needType: NeedType.OTHER, option_id: "11", name: "Yard Care" },
  ];

  async function fillInPeopleInfo(people: Person[]) {
    try {
      // Fetch all TeamMembers from the API
      const teamMembersData: any = await graphqlClient.graphql({
        query: listTeamMembers,
        authMode: "userPool",
      });

      if (teamMembersData.data.listTeamMembers.items) {
        const teamMembers: TeamMember[] =
          teamMembersData.data.listTeamMembers.items;

        // Iterate over each person in the provided array
        people.forEach((person) => {
          // Find the corresponding TeamMember by matching the `breezeId`
          const matchingTeamMember = teamMembers.find(
            (member) => member.breezeId === person.id
          );
          // If a matching TeamMember is found, update the person's details
          if (matchingTeamMember) {
            console.log(
              `fulfilled values: ${JSON.stringify(
                matchingTeamMember.fulfilled?.items
              )}`
            );
            // Safely handle `fulfilled` field, which could be null or empty
            const lastFilledDate =
              matchingTeamMember.fulfilled?.items?.reduce(
                (latest, item) =>
                  item!.filledDate && item!.filledDate > latest
                    ? item!.filledDate
                    : latest,
                ""
              ) || "";

            // Safely handle `asks` field, which could be null or empty
            const contactsLastMonth =
              matchingTeamMember.asks?.items?.filter((ask) => {
                const askDate = new Date(ask!.createdAt);
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                return askDate >= lastMonth;
              }).length || 0;

            // Update the person with the new information
            person.first_name =
              matchingTeamMember.name.split(" ")[0] || person.first_name;
            person.last_name =
              matchingTeamMember.name.split(" ")[1] || person.last_name;
            person.last_contacted = matchingTeamMember.asks?.items.sort(a => {
              return new Date(a!.createdAt).getTime();
            })[0]?.createdAt || "";
            person.last_filled = lastFilledDate;
            person.contacts_last_month = contactsLastMonth;
          }
        });
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
    setPeople(people);
  }

  useEffect(() => {
    if (teamsLoading || requestsLoading) return;

    const needType = team?.teamType;
    const selectedOption = options.find(
      (option) => option.needType === needType
    );

    if (selectedOption) {
      getBreezeTeam(selectedOption.option_id).then(fillInPeopleInfo);
    }
  }, [teams, requests, teamsLoading, requestsLoading]);

  const getBreezeTeam = async (teamId: string): Promise<Person[]> => {
    try {
      const { credentials } = await fetchAuthSession();

      if (!credentials) {
        throw new Error("No credentials available.");
      }
      const client = new LambdaClient({
        region: "us-west-1",
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
          sessionToken: credentials.sessionToken,
        },
      });

      const command = new InvokeCommand({
        FunctionName: `listPeopleOnTeam-${import.meta.env.VITE_FUNCTION_ENV}`,
        Payload: new TextEncoder().encode(JSON.stringify({ teamId })),
      });

      const response = await client.send(command);
      if (response.Payload) {
        const payloadString = new TextDecoder().decode(response.Payload);
        const payloadParsed = JSON.parse(payloadString);

        // Handle Lambda function errors
        if (payloadParsed.statusCode !== 200) {
          console.error("Lambda function error:", payloadParsed.body);
          throw new Error(
            `Lambda function returned ${payloadParsed.statusCode}: ${payloadParsed.body}`
          );
        }

        return JSON.parse(payloadParsed.body);
      }
    } catch (err) {
      console.log(err);
    }
    return [];
  };
  if (teamsLoading || requestsLoading) {
    return <div>Loading team data…</div>;
  }
  return (
    <Authenticator hideSignUp>
      <div style={{ margin: "15px" }}>
        <h1>Active requests for {team?.teamName}</h1>
        {team &&
          (() => {
            const unfulfilled = requests.filter((r) => !r.filledDate);
            if (unfulfilled.length === 0) {
              return <p>No unfulfilled requests.</p>;
            }
            return unfulfilled.map((openRequest) => (
              <Accordion key={openRequest.id}>
                <AccordionSummary>
                  <OpenTeamRequestSummary request={openRequest} />
                </AccordionSummary>
                <AccordionDetails>
                  <OpenTeamRequest
                    request={openRequest}
                    team={team}
                    people={people}
                  />
                </AccordionDetails>
              </Accordion>
            ));
          })()}
      </div>
    </Authenticator>
  );
};

export default TeamPicker;
