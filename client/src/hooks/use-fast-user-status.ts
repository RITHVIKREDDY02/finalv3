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
      const response = await fetch(`/api/user/${uid}/status`);
      return response.json();
    },
    enabled: !!uid && enabled,
    staleTime: 500, // Data fresh for 0.5 seconds
    gcTime: 5000, // Cache for 5 seconds
    refetchInterval: enabled ? 1000 : false, // Check every second when enabled
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: true, // Refetch when window gains focus
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