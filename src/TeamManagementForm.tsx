import { Container, Divider, Typography } from "@mui/material";
import TeamList from "./TeamList";
import CreateTeamForm from "./CreateTeamForm";
import { Authenticator } from "@aws-amplify/ui-react";
import { useIsSysOps } from "./useIsSysOps";
import NotificationRecipientsAdmin from "./NotificationRecipientsAdmin";
import EmailSettingsAdmin from "./EmailSettingsAdmin";
import CoordinatorsAdmin from "./CoordinatorsAdmin";
import TeamCoordinatorAssignment from "./TeamCoordinatorAssignment";
import { TeamsProvider } from "./TeamsProvider";

/** Runs inside Authenticator after sign-in so auth session and teams state are shared. */
function TeamManagementContent() {
  const isSysOps = useIsSysOps();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Team Management
      </Typography>
      <CreateTeamForm showCoordinatorSelect={isSysOps} />
      <Typography variant="h5" gutterBottom>
        Teams
      </Typography>
      <TeamList />
      {isSysOps && (
        <>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h5" gutterBottom>
            Email notification settings (SysOps)
          </Typography>
          <EmailSettingsAdmin />
          <NotificationRecipientsAdmin />
          <CoordinatorsAdmin />
          <TeamCoordinatorAssignment />
        </>
      )}
    </Container>
  );
}

const TeamManagement = () => {
  return (
    <Authenticator hideSignUp>
      <TeamsProvider>
        <TeamManagementContent />
      </TeamsProvider>
    </Authenticator>
  );
};

export default TeamManagement;
