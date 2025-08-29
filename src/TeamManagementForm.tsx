import { Container, Typography } from "@mui/material";
import TeamList from "./TeamList"; // Adjust the import path accordingly
import CreateTeamForm from "./CreateTeamForm"; // Adjust the import path accordingly
import { Authenticator } from "@aws-amplify/ui-react";

const TeamManagement = () => {
  return (
    <Authenticator hideSignUp>
      <Container>
        <Typography variant="h4" gutterBottom>
          Team Management
        </Typography>
        <CreateTeamForm />
        <Typography variant="h5" gutterBottom>
          Teams
        </Typography>
        <TeamList />
      </Container>
    </Authenticator>
  );
};

export default TeamManagement;
