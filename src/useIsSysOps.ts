import { useEffect, useState } from "react";
import { fetchAuthSession } from "@aws-amplify/auth";
import { Hub } from "aws-amplify/utils";

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

async function checkIsSysOps(): Promise<boolean> {
  try {
    const session = await fetchAuthSession();
    return readCognitoGroups(session).includes("SysOps");
  } catch {
    return false;
  }
}

export function useIsSysOps(): boolean {
  const [isSysOps, setIsSysOps] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const refresh = async () => {
      const sysOps = await checkIsSysOps();
      if (!cancelled) {
        setIsSysOps(sysOps);
      }
    };

    refresh();

    const hubCancel = Hub.listen("auth", ({ payload }) => {
      if (
        payload.event === "signedIn" ||
        payload.event === "signedOut" ||
        payload.event === "tokenRefresh"
      ) {
        refresh();
      }
    });

    return () => {
      cancelled = true;
      hubCancel();
    };
  }, []);

  return isSysOps;
}
