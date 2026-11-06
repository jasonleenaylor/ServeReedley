import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { generateClient } from "aws-amplify/api";
import { listCoordinators } from "./emailNotificationGraphql";
import { Coordinator } from "./emailNotificationTypes";

type CoordinatorsContextValue = {
  coordinators: Coordinator[];
  refetchCoordinators: () => Promise<void>;
};

const CoordinatorsContext = createContext<CoordinatorsContextValue | null>(
  null,
);

/** Coordinator is SysOps-only; pass enabled={false} for other users to skip the fetch. */
export function CoordinatorsProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const graphqlClient = useMemo(() => generateClient(), []);

  const refetchCoordinators = useCallback(async () => {
    if (!enabled) {
      setCoordinators([]);
      return;
    }
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
  }, [enabled, graphqlClient]);

  useEffect(() => {
    refetchCoordinators();
  }, [refetchCoordinators]);

  return (
    <CoordinatorsContext.Provider value={{ coordinators, refetchCoordinators }}>
      {children}
    </CoordinatorsContext.Provider>
  );
}

export function useCoordinatorsContext(): CoordinatorsContextValue {
  const value = useContext(CoordinatorsContext);
  if (!value) {
    throw new Error(
      "useCoordinatorsContext must be used within CoordinatorsProvider",
    );
  }
  return value;
}
