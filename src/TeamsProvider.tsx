import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listTeams } from "./graphql/queries";
import { Team } from "./RequestAPI";

type TeamsContextValue = {
  teams: Team[];
  loading: boolean;
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  refetchTeams: () => Promise<void>;
};

const TeamsContext = createContext<TeamsContextValue | null>(null);

export function TeamsProvider({ children }: { children: React.ReactNode }) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const graphqlClient = generateClient();

  const refetchTeams = useCallback(async () => {
    const apiData: any = await graphqlClient.graphql({
      query: listTeams,
      variables: { limit: 1000 },
      authMode: "userPool",
    });
    setTeams(apiData.data.listTeams.items);
  }, [graphqlClient]);

  useEffect(() => {
    refetchTeams()
      .catch((error) => console.error("Error fetching teams:", error))
      .finally(() => setLoading(false));
  }, [refetchTeams]);

  return (
    <TeamsContext.Provider value={{ teams, loading, setTeams, refetchTeams }}>
      {children}
    </TeamsContext.Provider>
  );
}

export function useTeamsContext(): TeamsContextValue {
  const value = useContext(TeamsContext);
  if (!value) {
    throw new Error("useTeamsContext must be used within TeamsProvider");
  }
  return value;
}
