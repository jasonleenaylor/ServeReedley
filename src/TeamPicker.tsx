import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Icon,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Auth } from "@aws-amplify/auth";
import Lambda from "aws-sdk/clients/lambda";
import { CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { useTeams } from "./useTeams";
import useRequestsById from "./useRequestsById";
import NeedSummaryForTeam from "./NeedSummaryForTeam";
import { NeedType, Team, TeamRequest } from "./RequestAPI";
import { getRequest, getTeamMember } from "./graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { NeedRequestType } from "./needRequestTypes";
import { CheckBox } from "@material-ui/icons";
import { createTeamMember, updateTeamMember } from "./graphql/mutations";

interface Person {
  id: string;
  first_name: string;
  last_name: string;
  last_contacted: string;
  last_filled: string;
  contacts_last_month: number;
}

interface PeopleProps {
  people: Person[];
  onSelectionChange: (selectedPeople: Person[]) => void;
}

const PeopleTable: React.FC<PeopleProps> = ({ people, onSelectionChange }) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const handleCheckboxChange = (personId: string) => {
    const updatedSelection = selectedPeople.some(
      (person) => person.id === personId
    )
      ? selectedPeople.filter((person) => person.id !== personId)
      : [...selectedPeople, people.find((person) => person.id === personId)!];
    setSelectedPeople(updatedSelection);
    onSelectionChange(updatedSelection);
  };

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
        <td style={cellStyle as CSSProperties}>{person.last_contacted}</td>
        <td style={cellStyle as CSSProperties}>{person.last_filled}</td>
        <td style={cellStyle as CSSProperties}>{person.contacts_last_month}</td>
      </tr>
    );
  });

  const handleMarkAsSent = async () => {
    try {
      const breezeId = "some-unique-identifier"; // Replace with actual data

      // Step 1: Check if the TeamMember exists
      const existingTeamMemberData: any = await API.graphql(
        graphqlOperation(getTeamMember, { id: breezeId })
      );

      if (existingTeamMemberData.data.getTeamMember) {
        // Step 2: If exists, update the TeamMember
        const updatedTeamMemberInput = {
          id: existingTeamMemberData.data.getTeamMember.id,
          breezeId: breezeId,
          name: "John Doe", // Replace with actual data
          // Add other fields as needed
        };

        const updatedTeamMember = await API.graphql(
          graphqlOperation(updateTeamMember, { input: updatedTeamMemberInput })
        );

        console.log("TeamMember record updated:", updatedTeamMember);
      } else {
        // Step 3: If doesn't exist, create a new TeamMember
        const newTeamMemberInput = {
          breezeId: breezeId,
          name: "John Doe", // Replace with actual data
          // Add other fields as needed
        };

        const newTeamMember = await API.graphql(
          graphqlOperation(createTeamMember, { input: newTeamMemberInput })
        );

        console.log("TeamMember record created:", newTeamMember);
      }
    } catch (err) {
      console.error("Error creating/updating TeamMember:", err);
    }
  };

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
          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
          >
            Send
          </Button>
          <Button variant="contained" color="primary">
            Mark as Sent
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
  return <Typography>{new Date(request.askDate).toDateString()}</Typography>;
};

const OpenTeamRequest: React.FC<TeamRequestProps> = ({
  request,
  team,
  people,
}) => {
  const [needRequest, setNeedRequest] = useState<NeedRequestType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response: any = await API.graphql(
          graphqlOperation(getRequest, { id: request.requestID })
        );
        setNeedRequest(response.data.getRequest as NeedRequestType);
      } catch (err) {
        setError("Error fetching request");
      }
    };

    fetchRequest();
  }, [request.requestID]);

  if (error) return <div>{error}</div>;
  if (!needRequest) return <div>Loading...</div>;

  return (
    <Card style={{ width: "90%", alignSelf: "center" }}>
      <NeedSummaryForTeam request={needRequest} needType={team.teamType} />
      {needRequest.note && (
        <Card style={{ width: "50%", alignSelf: "center" }}>
          <Typography>Coordinator Notes: {request.note}</Typography>
        </Card>
      )}
      <PeopleTable
        people={people}
        onSelectionChange={(people) => setSelectedPeople(people)}
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
  const { teamId } = useParams<{ teamId: string }>();
  const [people, setPeople] = useState<Person[]>([]);
  const { teams, loading: teamsLoading } = useTeams();
  const {
    requests,
    loading: requestsLoading,
    error: teamRequestError,
  } = useRequestsById(teamId);
  const team = teams.find((t) => t.id == teamId);

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

  function fillInPeopleInfo(value: Person[]) {
    setPeople(value);
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
      const credentials = await Auth.currentCredentials();
      const lambda = new Lambda({
        credentials: Auth.essentialCredentials(credentials),
      });
      const response = await lambda
        .invoke({
          FunctionName: "listPeopleOnTeam-prod",
          Payload: JSON.stringify({ teamId }),
        })
        .promise();

      const payloadParsed = JSON.parse(response.Payload as string);
      return JSON.parse(payloadParsed.body);
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return (
    <div>
      <h1>Active requests for {team?.teamName}</h1>
      {team &&
        requests
          .filter((request) => !request.filledDate)
          .map((openRequest) => (
            <Accordion>
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
          ))}
    </div>
  );
};

export default TeamPicker;
