import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import { useTeams } from "./useTeams"; // Adjust the import path accordingly

const TeamList = () => {
  const { teams, loading } = useTeams();

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {teams.map((team) => (
        <ListItem key={team.id}>
          <ListItemText
            primary={team.teamName}
            secondary={`Team ID: ${team.teamType}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TeamList;
