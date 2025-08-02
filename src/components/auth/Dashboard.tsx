import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { useAuth } from './AuthProvider';
import { getUserSessions, type Session } from '../../lib/api/sessions';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { LogOut, User, Mail, Calendar, Shield, Home, Settings, Monitor, Globe, Clock, AlertTriangle, Activity } from 'lucide-react';
import { Container, Alert } from '../../lib/dev-container';

export const Dashboard: React.FC = () => {
  console.log('[Dashboard] Component rendering');
  const { data: session, isPending } = useSession();
  const { isAdmin, role } = useAuth();
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const [multipleSessions, setMultipleSessions] = useState(false);
  console.log('[Dashboard] Session state:', { session, isPending });
  console.log('[Dashboard] User role:', role, 'isAdmin:', isAdmin);
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('[Dashboard] Logout initiated');
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('[Dashboard] Logout failed:', error);
    }
  };

  const getUserInitials = (name: string) => {
    console.log('[Dashboard] Getting initials for:', name);
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  useEffect(() => {
    if (session?.user) {
      setSessionsLoading(true);
      getUserSessions()
        .then(response => {
          const current = response.sessions.find(s => s.current);
          const activeSessions = response.sessions.filter(s => s.active);
          setCurrentSession(current || null);
          setMultipleSessions(activeSessions.length > 1);
        })
        .catch(err => {
          console.error('[Dashboard] Failed to fetch sessions:', err);
        })
        .finally(() => {
          setSessionsLoading(false);
        });
    }
  }, [session]);

  if (isPending) {
    console.log('[Dashboard] Showing loading state');
    return (
      <Container componentId="dashboard-loading">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    console.log('[Dashboard] No session found, showing unauthorized view');
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
                <p className="text-muted-foreground mb-4">
                  Please log in to access your dashboard.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  const user = session.user;
  console.log('[Dashboard] User data:', user);
  console.log('[Dashboard] Rendering dashboard for user:', user?.name || 'Unknown');

  // Check for any missing user properties that might cause errors
  if (!user) {
    console.error('[Dashboard] User object is undefined in session');
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">Session Error</h2>
                <p className="text-red-600 mb-4">Error: User data is missing from session</p>
                <p className="text-sm text-muted-foreground mb-4">
                  The authentication service returned invalid data. Please try logging in again.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full">
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container componentId="dashboard-page">
      <div className="min-h-screen bg-gray-50">
        <Container componentId="dashboard-header">
          <div className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-semibold text-gray-900">
                    Dashboard
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    Back to Home
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      onClick={() => navigate('/admin')}
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Admin Panel
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container componentId="dashboard-content">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Container componentId="user-profile-card">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={user.image || undefined} alt={user.name || 'User'} onError={(e) => console.error('[Dashboard] Avatar image failed to load:', e)} />
                        <AvatarFallback className="text-lg">
                          {getUserInitials(user.name || 'U')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name || 'Unknown User'}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.email || 'No email'}
                        </p>
                        {isAdmin && (
                          <Badge variant="default" className="mt-1">
                            Administrator
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Email</span>
                        </div>
                        <Badge variant={user.emailVerified ? "default" : "secondary"}>
                          {user.emailVerified ? "Verified" : "Unverified"}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Member since</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}
                        </span>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="pt-4 space-y-2">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate('/sessions')}
                      >
                        <Monitor className="h-4 w-4 mr-2" />
                        Manage Sessions
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate('/audit-logs')}
                      >
                        <Activity className="h-4 w-4 mr-2" />
                        View Activity Log
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Container>

              <Container componentId="dashboard-stats">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Welcome back, {user.name?.split(' ')[0] || 'User'}!</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        You're successfully logged in to your account. This is your personal dashboard 
                        where you can manage your profile and account settings.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {user.createdAt ? Math.floor((Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 0}
                              </div>
                              <p className="text-sm text-muted-foreground">Days as member</p>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                Active
                              </div>
                              <p className="text-sm text-muted-foreground">Session status</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Session Security Warning */}
                  {multipleSessions && (
                    <Alert devId="multiple-sessions-warning" variant="default" className="border-yellow-200 bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div className="ml-2">
                        <p className="font-semibold text-yellow-900">Multiple active sessions detected</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          You're signed in on multiple devices. Review your sessions for security.
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate('/sessions')}
                        >
                          Review Sessions
                        </Button>
                      </div>
                    </Alert>
                  )}

                  {/* Current Session Info */}
                  {currentSession && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Monitor className="h-5 w-5" />
                          Current Session
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Device</span>
                            <span className="text-sm font-medium">
                              {currentSession.device} - {currentSession.browser}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">IP Address</span>
                            <span className="text-sm font-medium flex items-center gap-1">
                              <Globe className="h-3 w-3" />
                              {currentSession.ipAddress}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Session expires in</span>
                            <span className="text-sm font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {getTimeRemaining(currentSession.expiresAt)}
                            </span>
                          </div>
                          <Separator />
                          <div className="text-xs text-muted-foreground">
                            Signed in {new Date(currentSession.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Successfully logged in</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Profile accessed</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date().toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
};