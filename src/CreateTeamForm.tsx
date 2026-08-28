import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { generateClient } from "aws-amplify/api";
import { useTeams } from "./useTeams";
import { NeedType } from "./RequestAPI";
import { Coordinator } from "./emailNotificationTypes";
import {
  createTeamWithCoordinator,
  listCoordinators,
} from "./emailNotificationGraphql";

const needTypeLabels = {
  [NeedType.MEALS]: "Meals",
  [NeedType.GROCERIES]: "Groceries",
  [NeedType.MOVING]: "Moving",
  [NeedType.JOBTRAINING]: "Job Training",
  [NeedType.HOMEREPAIR]: "Home Repair",
  [NeedType.CARREPAIR]: "Car Repair",
  [NeedType.HOUSING]: "Housing",
  [NeedType.HOUSEHOLDITEMS]: "Household Items",
  [NeedType.HYGENEITEMS]: "Hygiene Items",
  [NeedType.CLOTHING]: "Clothing",
  [NeedType.FURNITURE]: "Furniture",
  [NeedType.OTHER]: "Other",
};

const CreateTeamForm: React.FC<{ showCoordinatorSelect?: boolean }> = ({
  showCoordinatorSelect = false,
}) => {
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState<NeedType | "">("");
  const [email, setEmail] = useState("");
  const [coordinatorID, setCoordinatorID] = useState("");
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const [loading, setLoading] = useState(false);
  const { setTeams } = useTeams();
  const graphqlClient = generateClient();

  useEffect(() => {
    if (!showCoordinatorSelect) return;
    (async () => {
      try {
        const result: any = await graphqlClient.graphql({
          query: listCoordinators,
          variables: { limit: 500 },
          authMode: "userPool",
        });
        setCoordinators(result.data?.listCoordinators?.items ?? []);
      } catch (err) {
        console.error("Error loading coordinators:", err);
      }
    })();
  }, [showCoordinatorSelect, graphqlClient]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    if (teamType === "") {
      console.error("Team type is required");
      setLoading(false);
      return;
    }
    if (!email || !email.trim()) {
      console.error("Email is required");
      setLoading(false);
      return;
    }

    try {
      const input: Record<string, unknown> = {
        teamName,
        teamType,
        email,
      };
      if (showCoordinatorSelect && coordinatorID) {
        input.coordinatorID = coordinatorID;
      }
      const apiData: any = await graphqlClient.graphql({
        query: createTeamWithCoordinator,
        variables: { input },
        authMode: "userPool",
      });
      setTeams((prevTeams) => [...prevTeams, apiData.data.createTeam]);
      setTeamName("");
      setTeamType("");
      setEmail("");
      setCoordinatorID("");
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      flexDirection="column"
    >
      <TextField
        label="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        required
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormControl required>
        <InputLabel>Team Type</InputLabel>
        <Select
          value={teamType}
          onChange={(e) => setTeamType(e.target.value as NeedType)}
          displayEmpty
        >
          {Object.entries(NeedType).map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {needTypeLabels[value as NeedType]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {showCoordinatorSelect && (
        <FormControl fullWidth margin="dense">
          <InputLabel id="create-team-coordinator-label">Coordinator</InputLabel>
          <Select
            labelId="create-team-coordinator-label"
            label="Coordinator"
            value={coordinatorID}
            onChange={(e) => setCoordinatorID(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {coordinators
              .filter((c) => c.enabled)
              .map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name} ({c.email})
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Team"}
      </Button>
    </Box>
  );
};

export default CreateTeamForm;
