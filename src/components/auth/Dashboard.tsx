import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { LogOut, User, Mail, Calendar, Shield, Home } from 'lucide-react';
import { Container } from '../../lib/dev-container';

export const Dashboard: React.FC = () => {
  console.log('[Dashboard] Component rendering');
  const { data: session, isPending } = useSession();
  console.log('[Dashboard] Session state:', { session, isPending });
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