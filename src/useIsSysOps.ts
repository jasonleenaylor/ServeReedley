import { useEffect, useState } from "react";
import { fetchAuthSession } from "@aws-amplify/auth";

function readCognitoGroups(session: Awaited<ReturnType<typeof fetchAuthSession>>): string[] {
  const idGroups = session.tokens?.idToken?.payload?.["cognito:groups"];
  const accessGroups = session.tokens?.accessToken?.payload?.["cognito:groups"];
  const raw = idGroups ?? accessGroups;
  if (Array.isArray(raw)) {
    return raw.filter((g): g is string => typeof g === "string");
  }
  if (typeof raw === "string") {
    return [raw];
  }
  return [];
}

export function useIsSysOps(): boolean {
  const [isSysOps, setIsSysOps] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await fetchAuthSession();
        const groupList = readCognitoGroups(session);
        if (!cancelled) {
          setIsSysOps(groupList.includes("SysOps"));
        }
      } catch {
        if (!cancelled) {
          setIsSysOps(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return isSysOps;
}
