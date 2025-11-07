import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { listRequests } from "./graphql/queries";
import { NeedType, RequestStatus } from "./API";

export const useRequestCounts = () => {
  const [requestCounts, setRequestCounts] = useState<Record<NeedType, number>>(
    {} as Record<NeedType, number>
  );
  const [loading, setLoading] = useState(true);
  const graphqlClient = generateClient();

  useEffect(() => {
    const fetchRequestCounts = async () => {
      try {
        // Fetch vetted and in-progress requests in a single query
        const requestsData: any = await graphqlClient.graphql({
          query: listRequests,
          variables: {
            filter: {
              or: [
                { status: { eq: RequestStatus.VETTED } },
                { status: { eq: RequestStatus.INPROGRESS } },
              ],
            },
            limit: 1000,
          },
          authMode: "userPool",
        });

        const allRequests = requestsData.data.listRequests.items || [];

        // Count requests by need type
        const counts: Record<NeedType, number> = {} as Record<NeedType, number>;

        // Initialize all counts to 0
        Object.values(NeedType).forEach((needType) => {
          counts[needType] = 0;
        });

        // Count each request for each of its need types
        allRequests.forEach((request: { needTypes: NeedType[] }) => {
          if (request.needTypes && Array.isArray(request.needTypes)) {
            request.needTypes.forEach((needType: NeedType) => {
              if (needType && counts[needType] !== undefined) {
                counts[needType]++;
              }
            });
          }
        });

        setRequestCounts(counts);
      } catch (error) {
        console.error("Error fetching request counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestCounts();
  }, []);

  return { requestCounts, loading };
};
