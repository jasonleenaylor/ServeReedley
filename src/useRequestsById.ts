// src/hooks/useRequests.ts
import { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/api';
import { TeamRequest } from "./RequestAPI";
import { getTeamRequest, listTeamRequests } from "./graphql/queries";

interface UseRequestsResult {
  requests: TeamRequest[];
  loading: boolean;
  error: string | null;
}

const useRequestsById = (teamId: string | null): UseRequestsResult => {
  const [requests, setRequests] = useState<TeamRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const graphqlClient = generateClient();

  useEffect(() => {
    if (!teamId) {
      setRequests([]);
    }
    else {
      const fetchRequests = async () => {
        setLoading(true);
        try {
          const apiData: any = await graphqlClient.graphql({
            query: listTeamRequests,
            variables: { limit: 1000, filter: { teamID: { eq: teamId } } },
            authMode: 'userPool',
          });
          const requestsData = apiData.data.listTeamRequests.items;
          setRequests(requestsData);
        } catch (err) {
          setError(`error fetching team requests ${JSON.stringify(err)}`);
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();

    }
  }, [teamId]);

  return { requests, loading, error };
};

export default useRequestsById;
