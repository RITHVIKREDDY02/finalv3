import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Users, Settings, CheckCircle, Clock, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User, GameConfig } from "@shared/schema";

const GAME_NAMES = [
  "Win Go",
  "Trx Wingo", 
  "K3",
  "Moto Racing",
  "Mines Pro",
  "Mines",
  "Boom",
  "Aviator",
  "Limbo"
];

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // ALL HOOKS MUST BE AT TOP LEVEL - MOVED HERE
  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/admin/users"],
    enabled: isAuthenticated,
  });

  const { data: gameConfigs = [], isLoading: gamesLoading } = useQuery<GameConfig[]>({
    queryKey: ["/api/admin/games"],
    enabled: isAuthenticated,
  });

  const approveUserMutation = useMutation({
    mutationFn: async (uid: string) => {
      return await apiRequest(`/api/approve/${uid}`, "PATCH");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User approved successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to approve user",
        variant: "destructive",
      });
    },
  });

  const updateGameMutation = useMutation({
    mutationFn: async ({ gameName, isEnabled }: { gameName: string; isEnabled: boolean }) => {
      return await apiRequest(`/api/admin/games/${gameName}`, "PATCH", { isEnabled });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/games"] });
      toast({
        title: "Success",
        description: "Game configuration updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update game configuration",
        variant: "destructive",
      });
    },
  });

  // Login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const response = await apiRequest('/api/admin/login', 'POST', { password }) as { token: string };
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
      
      // Invalidate and refetch all queries after login
      queryClient.invalidateQueries();
      queryClient.refetchQueries();
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid password",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setPassword("");
  };

  // If not authenticated, show login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800/90 border-gray-700">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }



  const handleApproveUser = (uid: string) => {
    approveUserMutation.mutate(uid);
  };

  const handleToggleGame = (gameName: string, isEnabled: boolean) => {
    updateGameMutation.mutate({ gameName, isEnabled });
  };

  const getGameConfig = (gameName: string) => {
    return gameConfigs.find(config => config.gameName === gameName);
  };

  const isGameEnabled = (gameName: string) => {
    const config = getGameConfig(gameName);
    return config?.isEnabled ?? true; // Default to enabled if no config found
  };

  if (usersLoading || gamesLoading) {
    return (
      <div className="min-h-screen bg-[#231C21] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#FED358]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#231C21] p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="text-center space-y-2 flex-1">
            <h1 className="text-3xl font-bold text-[#FED358]">V3 GAME Admin Panel</h1>
            <p className="text-gray-400">Manage users and game configurations</p>
          </div>
          <Button 
            onClick={handleLogout}
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600"
          >
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#FED358]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Approved Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {users.filter(user => user.approved).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {users.filter(user => !user.approved).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Management */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#FED358] flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="max-h-96 overflow-y-auto space-y-3">
                {users.length === 0 ? (
                  <p className="text-gray-400 text-center py-4">No users registered yet</p>
                ) : (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">UID: {user.uid}</span>
                          <Badge variant={user.approved ? "default" : "secondary"}>
                            {user.approved ? "Approved" : "Pending"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">
                          Registered: {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!user.approved && (
                        <Button
                          onClick={() => handleApproveUser(user.uid)}
                          disabled={approveUserMutation.isPending}
                          className="bg-[#FED358] text-black hover:bg-[#FED358]/90"
                          size="sm"
                        >
                          {approveUserMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Approve"
                          )}
                        </Button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Game Configuration */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-[#FED358] flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Game Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {GAME_NAMES.map((gameName) => (
                  <div
                    key={gameName}
                    className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-white">{gameName}</span>
                      <Badge variant={isGameEnabled(gameName) ? "default" : "secondary"}>
                        {isGameEnabled(gameName) ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                    <Switch
                      checked={isGameEnabled(gameName)}
                      onCheckedChange={(checked) => handleToggleGame(gameName, checked)}
                      disabled={updateGameMutation.isPending}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}