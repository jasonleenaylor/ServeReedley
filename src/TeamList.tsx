import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import { useMemo } from "react";
import { useTeamsContext } from "./TeamsProvider";
import { useRequestCounts } from "./useRequestCounts";
import { Link } from "react-router-dom";

const TeamList = () => {
  const { teams, loading: teamsLoading } = useTeamsContext();
  const { requestCounts, loading: countsLoading } = useRequestCounts();

  // Memoize pending team requests counts to avoid recalculation on every render
  const pendingRequestsCounts = useMemo(() => {
    return teams.reduce((acc, team) => {
      acc[team.id] = team.requests?.items?.filter(
        (request) => request && !request.filledDate
      ).length || 0;
      return acc;
    }, {} as Record<string, number>);
  }, [teams]);

  if (teamsLoading || countsLoading) {
    return <CircularProgress />;
  }

  return (
    <List>
      {teams.map((team) => {
        const count = requestCounts[team.teamType] || 0;
        const pendingTeamRequests = pendingRequestsCounts[team.id];
        return (
          <ListItem key={team.id}>
            <ListItemText
              primary={team.teamName}
              secondary={
                <>
                  Team Type: {team.teamType} | Team Leader Email : {team.email} | 
                  Open Requests: {count} | Assigned Requests: {pendingTeamRequests} |{" "}
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
