import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listTeams } from "./graphql/queries"; // Adjust the import path accordingly
import { Team } from "./RequestAPI";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const graphqlClient = generateClient();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiData: any = await graphqlClient.graphql({
          query: listTeams,
          variables: { limit: 1000 },
          authMode: 'userPool',
        });
        setTeams(apiData.data.listTeams.items);
      } catch (error) {
        console.error("Error fetching teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return { teams, loading, setTeams };
};
