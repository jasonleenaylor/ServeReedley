import { Container, Divider, Typography } from "@mui/material";
import TeamList from "./TeamList";
import CreateTeamForm from "./CreateTeamForm";
import { Authenticator } from "@aws-amplify/ui-react";
import { useIsSysOps } from "./useIsSysOps";
import NotificationRecipientsAdmin from "./NotificationRecipientsAdmin";
import EmailSettingsAdmin from "./EmailSettingsAdmin";
import CoordinatorsAdmin from "./CoordinatorsAdmin";
import TeamCoordinatorAssignment from "./TeamCoordinatorAssignment";

const TeamManagement = () => {
  const isSysOps = useIsSysOps();

  return (
    <Authenticator hideSignUp>
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
    </Authenticator>
  );
};

export default TeamManagement;
