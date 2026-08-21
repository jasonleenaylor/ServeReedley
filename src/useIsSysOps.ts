import { useEffect, useState } from "react";
import { fetchAuthSession } from "@aws-amplify/auth";

export function useIsSysOps(): boolean {
  const [isSysOps, setIsSysOps] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const session = await fetchAuthSession();
        const groups = session.tokens?.idToken?.payload?.["cognito:groups"];
        const groupList = Array.isArray(groups)
          ? groups
          : typeof groups === "string"
            ? [groups]
            : [];
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
