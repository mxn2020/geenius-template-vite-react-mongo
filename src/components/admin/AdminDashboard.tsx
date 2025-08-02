import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Container, Div } from '../../lib/dev-container';
import { dataService } from '../../lib/services/data';
import {
  Users,
  FileText,
  Activity,
  TrendingUp,
  UserCheck,
  AlertCircle,
  Clock,
  BarChart3,
  Settings,
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalLogs: number;
  recentLogs: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalLogs: 0,
    recentLogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Fetch stats in parallel
        const [userCount, logCount, recentLogCount] = await Promise.all([
          dataService.count('userPreference'),
          dataService.count('auditLog'),
          dataService.count('auditLog', {
            createdAt: { gte: oneDayAgo },
          }),
        ]);

        // For active users, we'd need to query Better Auth sessions
        // For now, we'll estimate based on recent login logs
        const activeUserCount = await dataService.count('auditLog', {
          action: 'login',
          createdAt: { gte: oneDayAgo },
          success: true,
        });

        setStats({
          totalUsers: userCount,
          activeUsers: activeUserCount,
          totalLogs: logCount,
          recentLogs: recentLogCount,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Today',
      value: stats.activeUsers,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Logs',
      value: stats.totalLogs,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Recent Activity',
      value: stats.recentLogs,
      icon: Activity,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  if (loading) {
    return (
      <Container componentId="admin-dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container componentId="admin-dashboard">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of system activity and user statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    Updated just now
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Div
                devId="noID"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Users className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-medium">Manage Users</h3>
                  <p className="text-sm text-gray-600">View and edit user accounts</p>
                </div>
              </Div>
              <Div
                devId="noID"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <FileText className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <h3 className="font-medium">View Logs</h3>
                  <p className="text-sm text-gray-600">Monitor system activity</p>
                </div>
              </Div>
              <Div
                devId="noID"
                className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <Settings className="h-8 w-8 text-gray-600 mr-3" />
                <div>
                  <h3 className="font-medium">System Settings</h3>
                  <p className="text-sm text-gray-600">Configure application</p>
                </div>
              </Div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">New user registration</span>
                </div>
                <span className="text-sm text-gray-500">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">User login detected</span>
                </div>
                <span className="text-sm text-gray-500">5 minutes ago</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Password reset requested</span>
                </div>
                <span className="text-sm text-gray-500">15 minutes ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Database Status</span>
                  <span className="text-sm text-green-600">Healthy</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm text-green-600">45ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Error Rate</span>
                  <span className="text-sm text-green-600">0.1%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '99%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};