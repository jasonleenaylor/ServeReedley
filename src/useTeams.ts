import { useEffect, useMemo, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listTeamsForManagement } from "./emailNotificationGraphql";
import { Team } from "./RequestAPI";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const graphqlClient = useMemo(() => generateClient(), []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        // Slim selection set — generated listTeams nests SysOps-only `coordinator`
        // and throws Unauthorized for Coordinators-group users.
        const apiData: any = await graphqlClient.graphql({
          query: listTeamsForManagement,
          variables: { limit: 1000 },
          authMode: "userPool",
        });
        setTeams(apiData.data.listTeams.items);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [graphqlClient]);

  return { teams, loading, setTeams };
};
