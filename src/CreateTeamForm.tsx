import React, { useState } from "react";
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
import { createTeam } from "./graphql/mutations"; // Adjust the import path accordingly
import { useTeams } from "./useTeams"; // Adjust the import path accordingly
import { NeedType } from "./RequestAPI"; // Adjust the import path accordingly

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

const CreateTeamForm: React.FC = () => {
  const [teamName, setTeamName] = useState("");
  const [teamType, setTeamType] = useState<NeedType | "">("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { setTeams } = useTeams(); // to update the team list after creating a new team

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

    const graphqlClient = generateClient();
    try {
      const newTeam = { teamName, teamType, email };
      const apiData: any = await graphqlClient.graphql({
        query: createTeam,
        variables: { input: newTeam },
        authMode: "userPool",
      });
      setTeams((prevTeams) => [...prevTeams, apiData.data.createTeam]);
      setTeamName("");
      setTeamType("");
      setEmail("");
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
