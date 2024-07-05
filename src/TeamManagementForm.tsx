import { Container, Typography } from "@material-ui/core";
import TeamList from "./TeamList"; // Adjust the import path accordingly
import CreateTeamForm from "./CreateTeamForm"; // Adjust the import path accordingly
import { AmplifyAuthenticator } from "@aws-amplify/ui-react";

const TeamManagement = () => {
  return (
    <AmplifyAuthenticator>
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
    </AmplifyAuthenticator>
  );
};

export default TeamManagement;
