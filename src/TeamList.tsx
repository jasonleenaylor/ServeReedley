import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useTeams } from "./useTeams"; // Adjust the import path accordingly
import { Link } from "react-router-dom";

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
            secondary={
              <>
                Team Type: {team.teamType} | Team Leader Email : {team.email} |{" "}
                <Link to={`/team?id=${team.id}`}>View Team Page</Link>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TeamList;
