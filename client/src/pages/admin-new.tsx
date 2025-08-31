import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Users, Settings, CheckCircle, Clock, Lock, ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User, GameConfig } from "@shared/schema";

const GAME_NAMES = [
  "Win Go",
  "K3",
  "Moto Racing",
  "Mines Pro",
  "Mines",
  "Boom",
  "Aviator",
  "Limbo"
];

function LoginForm({ onLogin, isLoading }: { onLogin: (password: string) => Promise<void>, isLoading: boolean }) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin(password);
  };

  return (
    <div className="min-h-screen bg-[#231C21] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-[#FED358]/30 shadow-2xl" 
        style={{ boxShadow: '0 0 30px rgba(254, 211, 88, 0.3)' }}>
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4"
            style={{ 
              backgroundColor: '#FED358',
              boxShadow: '0 0 15px rgba(254, 211, 88, 0.4)'
            }}>
            <Lock className="w-6 h-6 text-black" />
          </div>
          <CardTitle className="text-2xl font-bold text-[#FED358]">Admin</CardTitle>
          <p className="text-gray-400 text-sm mt-2">Secure Admin Portal</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-[#FED358] font-semibold">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-gray-700/50 border-[#FED358]/50 text-white placeholder:text-gray-400 focus:border-[#FED358] focus:ring-1 focus:ring-[#FED358]/20 rounded-lg mt-2"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full font-bold rounded-lg transition-all duration-200"
              style={{ 
                background: 'linear-gradient(180deg, #FED358, #FFB472)',
                color: '#231C21'
              }}
              onMouseEnter={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(180deg, #FFE082, #FFC894)'}
              onMouseLeave={(e) => (e.target as HTMLButtonElement).style.background = 'linear-gradient(180deg, #FED358, #FFB472)'}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Accessing Admin Panel...
                </>
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPanel() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Check if already authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // ALL HOOKS AT TOP LEVEL
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

  const deleteUserMutation = useMutation({
    mutationFn: async (uid: string) => {
      return await apiRequest(`/api/admin/users/${uid}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  // HANDLERS
  const handleLogin = async (password: string) => {
    setIsLoggingIn(true);
    try {
      const response = await apiRequest('/api/admin/login', 'POST', { password }) as { token: string };
      localStorage.setItem('adminToken', response.token);
      setIsAuthenticated(true);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };

  const handleApproveUser = (uid: string) => {
    approveUserMutation.mutate(uid);
  };

  const handleToggleGame = (gameName: string, isEnabled: boolean) => {
    updateGameMutation.mutate({ gameName, isEnabled });
  };

  const handleDeleteUser = (uid: string) => {
    if (window.confirm(`Are you sure you want to delete user ${uid}? This action cannot be undone.`)) {
      deleteUserMutation.mutate(uid);
    }
  };

  const getGameConfig = (gameName: string) => {
    return gameConfigs.find(config => config.gameName === gameName);
  };

  const isGameEnabled = (gameName: string) => {
    const config = getGameConfig(gameName);
    return config?.isEnabled ?? true;
  };

  // CONDITIONAL RENDERING
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} isLoading={isLoggingIn} />;
  }

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
        <div className="space-y-4">
          {/* Mobile: Navbar layout with back and logout */}
          <div className="md:hidden">
            <div className="flex items-center justify-between mb-4">
              <Button 
                onClick={() => window.history.back()}
                variant="ghost"
                size="sm"
                className="text-[#FED358] hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                size="sm"
              >
                Logout
              </Button>
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-[#FED358]">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Manage users and game configurations</p>
            </div>
          </div>
          
          {/* Desktop: Side by side layout */}
          <div className="hidden md:flex justify-between items-center">
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
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-[#FED358]/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#FED358]">Total Users</CardTitle>
              <Users className="h-4 w-4 text-[#FED358]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{users.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-green-500/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Approved Users</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {users.filter(user => user.approved).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-yellow-500/30 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Pending Approval</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {users.filter(user => !user.approved).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Management */}
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-[#FED358]/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#FED358] flex items-center gap-2 font-bold">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {users.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No users registered yet.</p>
            ) : (
              <div className="space-y-3">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700/80 to-gray-800/80 rounded-lg border border-[#FED358]/20 shadow-md">
                    <div className="space-y-1">
                      <p className="text-white font-medium">UID: {user.uid}</p>
                      <p className="text-gray-400 text-sm">
                        Registered: {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={user.approved ? "default" : "secondary"}>
                        {user.approved ? "Approved" : "Pending"}
                      </Badge>
                      <div className="flex gap-2">
                        {!user.approved && (
                          <Button
                            onClick={() => handleApproveUser(user.uid)}
                            disabled={approveUserMutation.isPending}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {approveUserMutation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeleteUser(user.uid)}
                          disabled={deleteUserMutation.isPending}
                          size="sm"
                          variant="outline"
                          className="bg-red-600 hover:bg-red-700 text-white border-red-600"
                        >
                          {deleteUserMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Configuration */}
        <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 border-[#FED358]/30 shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#FED358] flex items-center gap-2 font-bold">
              <Settings className="h-5 w-5" />
              Game Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {GAME_NAMES.map((gameName) => (
                <div key={gameName} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700/80 to-gray-800/80 rounded-lg border border-[#FED358]/20 shadow-md">
                  <span className="text-white font-medium">{gameName}</span>
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
  );
}