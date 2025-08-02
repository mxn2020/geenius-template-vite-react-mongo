import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Container, Div } from '../../lib/dev-container';
import { getAdminStats, type AdminStats } from '../../lib/api/admin';
import {
  Users,
  FileText,
  Activity,
  UserCheck,
  Clock,
  BarChart3,
  Settings,
  UserPlus,
  MessageSquare,
  FileEdit,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching admin stats:', error);
        setError('Failed to load dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registration':
        return UserPlus;
      case 'post_created':
        return FileEdit;
      case 'comment_added':
        return MessageSquare;
      default:
        return Activity;
    }
  };

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

  if (error || !stats) {
    return (
      <Container componentId="admin-dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-600">{error || 'Failed to load dashboard'}</p>
          </div>
        </div>
      </Container>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.users.total,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      subtitle: `${stats.users.verified} verified`,
    },
    {
      title: 'Active Today',
      value: stats.users.active,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      subtitle: `${stats.users.activeSessions} sessions`,
    },
    {
      title: 'Total Posts',
      value: stats.content.posts,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      subtitle: `${stats.content.publishedPosts} published`,
    },
    {
      title: 'Comments',
      value: stats.content.comments,
      icon: MessageSquare,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      subtitle: `${stats.content.recentComments} today`,
    },
  ];

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
                    {stat.subtitle}
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
              <Link to="/admin-users">
                <Div
                  devId="manage-users-action"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-medium">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and edit user accounts</p>
                  </div>
                </Div>
              </Link>
              <Link to="/admin-audit-logs">
                <Div
                  devId="view-logs-action"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <FileText className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <h3 className="font-medium">View Logs</h3>
                    <p className="text-sm text-gray-600">Monitor system activity</p>
                  </div>
                </Div>
              </Link>
              <Link to="/admin/settings">
                <Div
                  devId="system-settings-action"
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <Settings className="h-8 w-8 text-gray-600 mr-3" />
                  <div>
                    <h3 className="font-medium">System Settings</h3>
                    <p className="text-sm text-gray-600">Configure application</p>
                  </div>
                </Div>
              </Link>
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
              {stats.recentActivities.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity</p>
              ) : (
                stats.recentActivities.slice(0, 5).map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={index} className="flex items-center justify-between py-2 border-b">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-${activity.color}-100 flex items-center justify-center`}>
                          <Icon className={`h-4 w-4 text-${activity.color}-600`} />
                        </div>
                        <span className="text-sm">{activity.description}</span>
                      </div>
                      <span className="text-sm text-gray-500">{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  );
                })
              )}
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
                  <span className="text-sm text-green-600 capitalize">{stats.systemHealth.database.status}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${stats.systemHealth.database.percentage}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">API Response Time</span>
                  <span className="text-sm text-green-600">{stats.systemHealth.api.responseTime}ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${stats.systemHealth.api.percentage}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Error Rate</span>
                  <span className="text-sm text-green-600">{stats.systemHealth.errorRate.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${stats.systemHealth.errorRate.percentage}%` }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};