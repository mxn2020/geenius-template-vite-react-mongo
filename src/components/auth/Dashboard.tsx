import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession, signOut } from '../../lib/auth-client';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { LogOut, User, Mail, Calendar, Shield, Heart, FileText, Clock, Users, Stethoscope, Activity, AlertCircle } from 'lucide-react';
import { Container } from '../../lib/dev-container';

export const Dashboard: React.FC = () => {
  const { data: session, isPending } = useSession();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isPending) {
    return (
      <Container componentId="dashboard-loading">
        <div className="min-h-screen flex items-center justify-center bg-medical-bg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-primary mx-auto mb-4"></div>
            <p className="text-medical-muted">Loading your patient portal...</p>
          </div>
        </div>
      </Container>
    );
  }

  if (!session) {
    return (
      <Container componentId="dashboard-unauthorized">
        <div className="min-h-screen flex items-center justify-center bg-medical-bg">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <Shield className="h-12 w-12 text-medical-muted mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2 text-medical-dark">Access Denied</h2>
                <p className="text-medical-muted mb-4">
                  Please log in to access your patient portal.
                </p>
                <Button onClick={() => navigate('/login')} className="w-full bg-medical-primary hover:bg-medical-primary-dark">
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

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', icon: Heart },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const upcomingAppointments = [
    { date: '2024-01-15', time: '10:00 AM', type: 'Annual Physical', doctor: 'Dr. Krautz' },
    { date: '2024-01-22', time: '2:30 PM', type: 'Follow-up', doctor: 'Dr. Krautz' }
  ];

  const recentRecords = [
    { date: '2024-01-08', type: 'Lab Results', status: 'Normal', description: 'Complete Blood Count' },
    { date: '2024-01-01', type: 'Prescription', status: 'Active', description: 'Blood pressure medication refill' },
    { date: '2023-12-15', type: 'Visit Summary', status: 'Complete', description: 'Routine checkup and consultation' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Container componentId="overview-content">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-medical-light">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 text-medical-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-medical-dark">
                        {upcomingAppointments.length}
                      </div>
                      <p className="text-sm text-medical-muted">Upcoming Appointments</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-medical-light">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-medical-secondary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-medical-dark">
                        {recentRecords.length}
                      </div>
                      <p className="text-sm text-medical-muted">Recent Records</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-medical-light">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Heart className="h-8 w-8 text-medical-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-medical-dark">
                        Active
                      </div>
                      <p className="text-sm text-medical-muted">Health Status</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-medical-light">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-medical-dark">
                      <Calendar className="h-5 w-5" />
                      Upcoming Appointments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingAppointments.map((appointment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-medical-bg rounded-lg">
                          <div>
                            <p className="font-medium text-medical-dark">{appointment.type}</p>
                            <p className="text-sm text-medical-muted">{appointment.doctor}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-medical-primary">{appointment.date}</p>
                            <p className="text-sm text-medical-muted">{appointment.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-medical-light">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-medical-dark">
                      <FileText className="h-5 w-5" />
                      Recent Medical Records
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentRecords.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-medical-bg rounded-lg">
                          <div>
                            <p className="font-medium text-medical-dark">{record.type}</p>
                            <p className="text-sm text-medical-muted">{record.description}</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={record.status === 'Normal' || record.status === 'Active' ? 'default' : 'secondary'} 
                                   className="mb-1">
                              {record.status}
                            </Badge>
                            <p className="text-sm text-medical-muted">{record.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Container>
        );

      case 'appointments':
        return (
          <Container componentId="appointments-content">
            <Card className="border-medical-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <Calendar className="h-5 w-5" />
                  Appointment Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-16 w-16 text-medical-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-medical-dark mb-2">Schedule New Appointment</h3>
                  <p className="text-medical-muted mb-4">Book your next appointment with Dr. Krautz</p>
                  <Button className="bg-medical-primary hover:bg-medical-primary-dark">
                    Schedule Appointment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Container>
        );

      case 'records':
        return (
          <Container componentId="records-content">
            <Card className="border-medical-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <FileText className="h-5 w-5" />
                  Medical Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="h-16 w-16 text-medical-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-medical-dark mb-2">Your Medical History</h3>
                  <p className="text-medical-muted mb-4">Access your complete medical records and test results</p>
                  <Button className="bg-medical-primary hover:bg-medical-primary-dark">
                    View Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Container>
        );

      case 'prescriptions':
        return (
          <Container componentId="prescriptions-content">
            <Card className="border-medical-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <Heart className="h-5 w-5" />
                  Prescriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-16 w-16 text-medical-muted mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-medical-dark mb-2">Prescription Management</h3>
                  <p className="text-medical-muted mb-4">View and manage your current prescriptions</p>
                  <Button className="bg-medical-primary hover:bg-medical-primary-dark">
                    View Prescriptions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Container>
        );

      case 'profile':
        return (
          <Container componentId="profile-content">
            <Card className="border-medical-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-medical-dark">
                  <User className="h-5 w-5" />
                  Patient Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.image || undefined} alt={user.name || 'Patient'} />
                    <AvatarFallback className="text-lg bg-medical-primary text-white">
                      {getUserInitials(user.name || 'P')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg text-medical-dark">{user.name}</h3>
                    <p className="text-sm text-medical-muted">{user.email}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-medical-muted" />
                      <span className="text-sm text-medical-dark">Email</span>
                    </div>
                    <Badge variant={user.emailVerified ? "default" : "secondary"} 
                           className={user.emailVerified ? "bg-medical-primary" : ""}>
                      {user.emailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-medical-muted" />
                      <span className="text-sm text-medical-dark">Patient since</span>
                    </div>
                    <span className="text-sm text-medical-muted">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        );

      default:
        return null;
    }
  };

  return (
    <Container componentId="dashboard-page">
      <div className="min-h-screen bg-medical-bg">
        <Container componentId="dashboard-header">
          <div className="bg-white shadow-sm border-b border-medical-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-medical-primary to-medical-secondary rounded-full flex items-center justify-center">
                      <Stethoscope className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-semibold text-medical-dark">
                      Patient Portal
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-medical-muted">
                    Welcome, {user.name?.split(' ')[0]}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-medical-muted hover:text-medical-dark"
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
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Container componentId="dashboard-sidebar">
                <Card className="lg:col-span-1 border-medical-light">
                  <CardContent className="p-0">
                    <nav className="space-y-1 p-4">
                      {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                              activeTab === item.id
                                ? 'bg-medical-primary text-white'
                                : 'text-medical-muted hover:text-medical-dark hover:bg-medical-bg'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </button>
                        );
                      })}
                    </nav>
                  </CardContent>
                </Card>
              </Container>

              <Container componentId="dashboard-main">
                <div className="lg:col-span-3">
                  {renderTabContent()}
                </div>
              </Container>
            </div>
          </div>
        </Container>
      </div>
    </Container>
  );
};