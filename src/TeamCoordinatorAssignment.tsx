import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Team } from "./RequestAPI";
import { useTeams } from "./useTeams";
import { Coordinator } from "./emailNotificationTypes";
import {
  listCoordinators,
  updateTeamCoordinator,
} from "./emailNotificationGraphql";

const TeamCoordinatorAssignment: React.FC = () => {
  const { teams, loading: teamsLoading, setTeams } = useTeams();
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const graphqlClient = generateClient();

  useEffect(() => {
    (async () => {
      try {
        const result: any = await graphqlClient.graphql({
          query: listCoordinators,
          variables: { limit: 500 },
          authMode: "userPool",
        });
        setCoordinators(result.data?.listCoordinators?.items ?? []);
      } catch (err) {
        console.error("Error loading coordinators:", err);
      }
    })();
  }, [graphqlClient]);

  const coordinatorName = (id: string | null | undefined) => {
    if (!id) return "None";
    const c = coordinators.find((x) => x.id === id);
    return c ? `${c.name} (${c.email})` : id;
  };

  const handleAssign = async (team: Team, coordinatorID: string) => {
    try {
      const result: any = await graphqlClient.graphql({
        query: updateTeamCoordinator,
        variables: {
          input: {
            id: team.id,
            coordinatorID: coordinatorID || null,
          },
        },
        authMode: "userPool",
      });
      const updated = result.data?.updateTeam;
      if (updated) {
        setTeams((prev) =>
          prev.map((t) => (t.id === team.id ? { ...t, ...updated } : t))
        );
      }
    } catch (err) {
      console.error("Error assigning coordinator:", err);
    }
  };

  type TeamWithCoordinator = Team & { coordinatorID?: string | null };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Team coordinator assignment
      </Typography>
      {teamsLoading ? (
        <Typography>Loading teams…</Typography>
      ) : (
        <List dense>
          {(teams as TeamWithCoordinator[]).map((team) => (
            <ListItem key={team.id} sx={{ flexDirection: "column", alignItems: "stretch" }}>
              <ListItemText
                primary={`${team.teamName} (${team.teamType})`}
                secondary={`Team lead: ${team.email || "—"} · Coordinator: ${coordinatorName(team.coordinatorID)}`}
              />
              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <InputLabel id={`coord-${team.id}`}>Coordinator</InputLabel>
                <Select
                  labelId={`coord-${team.id}`}
                  label="Coordinator"
                  value={team.coordinatorID ?? ""}
                  onChange={(e) =>
                    handleAssign(team, e.target.value as string)
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {coordinators
                    .filter((c) => c.enabled)
                    .map((c) => (
                      <MenuItem key={c.id} value={c.id}>
                        {c.name} ({c.email})
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default TeamCoordinatorAssignment;
