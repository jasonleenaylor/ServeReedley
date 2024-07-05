import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { listTeams } from "./graphql/queries"; // Adjust the import path accordingly
import { Team } from "./RequestAPI";

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiData: any = await API.graphql({
          query: listTeams,
          variables: { limit: 1000 },
          authMode: "AMAZON_COGNITO_USER_POOLS",
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
