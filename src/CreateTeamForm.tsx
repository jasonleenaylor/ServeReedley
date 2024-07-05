import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { API } from "aws-amplify";
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
  const [teamId, setTeamId] = useState<NeedType | "">("");
  const [loading, setLoading] = useState(false);
  const { setTeams } = useTeams(); // to update the team list after creating a new team

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const newTeam = { teamName, teamId };
      const apiData: any = await API.graphql({
        query: createTeam,
        variables: { input: newTeam },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });
      setTeams((prevTeams) => [...prevTeams, apiData.data.createTeam]);
      setTeamName("");
      setTeamId("");
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
      <FormControl required>
        <InputLabel>Team ID</InputLabel>
        <Select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value as NeedType)}
          displayEmpty
        >
          <MenuItem value="">
            <em>Select a Team ID</em>
          </MenuItem>
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
