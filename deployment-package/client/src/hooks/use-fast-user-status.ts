import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface FastUserStatus {
  approved: boolean;
  registered: boolean;
}

export function useFastUserStatus(uid: string, enabled: boolean = true) {
  return useQuery<FastUserStatus>({
    queryKey: [`/api/user/${uid}/status`],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/user/${uid}/status`);
        if (!response.ok) {
          // Return default values for failed requests instead of throwing
          return { approved: false, registered: false };
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.warn(`Fast user status check failed for ${uid}:`, error);
        // Return safe defaults instead of throwing
        return { approved: false, registered: false };
      }
    },
    enabled: !!uid && enabled && uid.trim().length > 0,
    staleTime: 1000, // Data fresh for 1 second
    gcTime: 10000, // Cache for 10 seconds
    refetchInterval: enabled ? 2000 : false, // Check every 2 seconds when enabled
    retry: false, // Don't retry failed requests to prevent error loops
    refetchOnWindowFocus: false, // Disable to prevent excessive requests
  });
}

export function useUserVerification(uid: string) {
  const {
    data: status,
    isLoading,
    refetch,
    error
  } = useFastUserStatus(uid);

  const isApproved = status?.approved || false;
  const isRegistered = status?.registered || false;
  
  // Provide immediate refresh function
  const refreshStatus = async () => {
    return await refetch();
  };

  return {
    isApproved,
    isRegistered,
    isLoading,
    refreshStatus,
    error,
    // Helper methods
    canAccessVipFeatures: isApproved && isRegistered,
    needsRegistration: !isRegistered,
    needsApproval: isRegistered && !isApproved,
  };
}