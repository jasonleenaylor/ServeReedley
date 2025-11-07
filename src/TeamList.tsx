import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useTeams } from "./useTeams"; // Adjust the import path accordingly
import { useRequestCounts } from "./useRequestCounts";
import { Link } from "react-router-dom";

const TeamList = () => {
  const { teams, loading: teamsLoading } = useTeams();
  const { requestCounts, loading: countsLoading } = useRequestCounts();

  if (teamsLoading || countsLoading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {teams.map((team) => {
        const count = requestCounts[team.teamType] || 0;
        // Count pending team requests (where filledDate is null)
        const pendingTeamRequests = team.requests?.items?.filter(
          (request) => request && !request.filledDate
        ).length || 0;
        return (
          <ListItem key={team.id}>
            <ListItemText
              primary={team.teamName}
              secondary={
                <>
                  Team Type: {team.teamType} | Team Leader Email : {team.email} | 
                  Open Requests: {count} | Pending Team Requests: {pendingTeamRequests} |{" "}
                  <Link to={`/team?id=${team.id}`}>View Team Page</Link>
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default TeamList;
