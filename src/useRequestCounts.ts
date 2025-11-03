import { useEffect, useState } from "react";
import { generateClient } from 'aws-amplify/api';
import { listRequests } from "./graphql/queries";
import { NeedType, RequestStatus } from "./API";

export const useRequestCounts = () => {
  const [requestCounts, setRequestCounts] = useState<Record<NeedType, number>>({} as Record<NeedType, number>);
  const [loading, setLoading] = useState(true);
  const graphqlClient = generateClient();

  useEffect(() => {
    const fetchRequestCounts = async () => {
      try {
        // Fetch vetted requests
        const vettedData: any = await graphqlClient.graphql({
          query: listRequests,
          variables: { 
            filter: { status: { eq: RequestStatus.VETTED } },
            limit: 1000 
          },
          authMode: 'userPool',
        });

        // Fetch in-progress requests
        const inProgressData: any = await graphqlClient.graphql({
          query: listRequests,
          variables: { 
            filter: { status: { eq: RequestStatus.INPROGRESS } },
            limit: 1000 
          },
          authMode: 'userPool',
        });

        // Combine both lists
        const allRequests = [
          ...(vettedData.data.listRequests.items || []),
          ...(inProgressData.data.listRequests.items || [])
        ];

        // Count requests by need type
        const counts: Record<NeedType, number> = {} as Record<NeedType, number>;
        
        // Initialize all counts to 0
        Object.values(NeedType).forEach(needType => {
          counts[needType] = 0;
        });

        // Count each request for each of its need types
        allRequests.forEach(request => {
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
