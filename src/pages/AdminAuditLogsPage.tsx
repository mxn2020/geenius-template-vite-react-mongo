import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAuditLogs } from '../../lib/api/audit-logs';
import { getUsers } from '../../lib/api/users';
import { useAuditLogs } from '../../hooks/useAuditLogQueries';
import { Container, Button, Card, Badge, Alert, Input, Label } from '../../lib/dev-container';
import type { ComponentRegistryId } from '../../registry/componentRegistry';
import { 
  Shield, 
  Activity,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LogIn,
  LogOut,
  UserPlus,
  KeyRound,
  UserCheck,
  ShieldAlert,
  Monitor,
  Settings,
  Download,
  UserCog,
  Trash2
} from 'lucide-react';

// Helper function for dynamic page button IDs
const getPageButtonId = (pageNum: number): ComponentRegistryId => {
  // Map common page numbers to specific IDs
  const pageIds: ComponentRegistryId[] = [
    'audit-page-button-1',
    'audit-page-button-2',
    'audit-page-button-3',
    'audit-page-button-4',
    'audit-page-button-5',
  ];
  // Use the specific ID if within range, otherwise use dynamic
  return pageNum <= 5 ? pageIds[pageNum - 1] : ('audit-page-button-dynamic' as ComponentRegistryId);
};

export function AdminAuditLogsPage() {
  const [page, setPage] = useState(1);
  const [filterAction, setFilterAction] = useState('');
  const [filterUserId, setFilterUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch users for the filter dropdown
  const { data: usersData } = useQuery({
    queryKey: ['users', 'filter-list'],
    queryFn: () => getUsers({ limit: 100 }),
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const users = usersData?.users || [];

  // Fetch audit logs with React Query
  const { data, isLoading, error } = useAuditLogs({
    page,
    limit: 50,
    action: filterAction || undefined,
    userId: filterUserId || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  const logs = data?.logs || [];
  const totalPages = data?.pagination.totalPages || 1;

  const handleExport = useCallback(async () => {
    try {
      const response = await getAuditLogs({
        limit: 10000, // Get all logs for export
        action: filterAction || undefined,
        userId: filterUserId || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      
      // Convert to CSV
      const headers = ['Date', 'User', 'Email', 'Action', 'Status', 'IP Address', 'Details'];
      const rows = response.logs.map(log => [
        new Date(log.createdAt).toLocaleString(),
        log.userName || 'Unknown',
        log.userEmail || log.userId,
        getActionLabel(log.action),
        log.success ? 'Success' : 'Failed',
        log.ip || 'Unknown',
        log.details ? JSON.stringify(log.details) : ''
      ]);
      
      const csv = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      ].join('\n');
      
      // Download
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting logs:', err);
      // Could show a toast notification here instead
    }
  }, [filterAction, filterUserId, startDate, endDate]);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'login':
        return LogIn;
      case 'logout':
        return LogOut;
      case 'login_failed':
        return ShieldAlert;
      case 'user_created':
        return UserPlus;
      case 'user_updated':
      case 'role_changed':
        return UserCog;
      case 'user_deleted':
        return Trash2;
      case 'password_change':
      case 'password_reset_request':
      case 'password_reset_complete':
        return KeyRound;
      case 'email_verification':
        return UserCheck;
      case 'session_revoked':
      case 'sessions_revoked_all':
        return Monitor;
      case 'profile_update':
        return Settings;
      case 'admin_access':
        return Shield;
      default:
        return Activity;
    }
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      login: 'Signed in',
      logout: 'Signed out',
      login_failed: 'Failed login attempt',
      user_created: 'Account created',
      user_updated: 'User updated',
      user_deleted: 'User deleted',
      role_changed: 'Role changed',
      password_change: 'Password changed',
      password_reset_request: 'Password reset requested',
      password_reset_complete: 'Password reset completed',
      email_verification: 'Email verified',
      session_revoked: 'Session revoked',
      sessions_revoked_all: 'All sessions revoked',
      profile_update: 'Profile updated',
      admin_access: 'Admin panel accessed',
    };
    return labels[action] || action;
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return 'destructive';
    
    switch (action) {
      case 'login':
      case 'user_created':
      case 'email_verification':
        return 'default';
      case 'logout':
      case 'session_revoked':
      case 'sessions_revoked_all':
        return 'secondary';
      case 'login_failed':
      case 'user_deleted':
        return 'destructive';
      case 'role_changed':
      case 'admin_access':
        return 'outline';
      case 'password_change':
      case 'password_reset_request':
      case 'password_reset_complete':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading && page === 1) {
    return (
      <Container componentId="admin-audit-logs-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="text-gray-600">Loading audit logs...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container componentId="admin-audit-logs-page" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">Monitor all system activity and security events</p>
        </div>
        <Button
          devId="export-button"
          variant="outline"
          onClick={handleExport}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert devId="error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error instanceof Error ? error.message : 'Failed to load audit logs'}</span>
        </Alert>
      )}

      {/* Filters */}
      <Card devId="filters-card" className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label devId="user-filter-label" htmlFor="user-filter">User</Label>
              <select
                id="user-filter"
                value={filterUserId}
                onChange={(e) => {
                  setFilterUserId(e.target.value);
                  setPage(1);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All users</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label devId="action-filter-label" htmlFor="action-filter">Action</Label>
              <select
                id="action-filter"
                value={filterAction}
                onChange={(e) => {
                  setFilterAction(e.target.value);
                  setPage(1);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="">All actions</option>
                <option value="login">Sign ins</option>
                <option value="logout">Sign outs</option>
                <option value="login_failed">Failed logins</option>
                <option value="user_created">User registrations</option>
                <option value="user_deleted">User deletions</option>
                <option value="role_changed">Role changes</option>
                <option value="password_change">Password changes</option>
                <option value="session_revoked">Session revocations</option>
              </select>
            </div>
            
            <div>
              <Label devId="start-date-label" htmlFor="start-date">Start Date</Label>
              <Input
                devId="start-date-input"
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label devId="end-date-label" htmlFor="end-date">End Date</Label>
              <Input
                devId="end-date-input"
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
                className="mt-1"
              />
            </div>
          </div>
          
          {(filterUserId || filterAction || startDate || endDate) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Active filters:</span>
              <Button
                devId="clear-filters-button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setFilterUserId('');
                  setFilterAction('');
                  setStartDate('');
                  setEndDate('');
                  setPage(1);
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Logs Table */}
      <Card devId="logs-table-card" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No audit logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const Icon = getActionIcon(log.action);
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {log.userName || 'Unknown'}
                          </div>
                          <div className="text-gray-500">
                            {log.userEmail || log.userId}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {getActionLabel(log.action)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge 
                          devId="audit-status-badge-dynamic"
                          variant={getActionColor(log.action, log.success)}
                        >
                          {log.success ? 'Success' : 'Failed'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ip || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {log.error && (
                          <span className="text-red-600">{log.error}</span>
                        )}
                        {log.details && (
                          <div className="max-w-xs truncate">
                            {log.action === 'role_changed' && log.details.targetUserId && (
                              <span>
                                Changed user role from {log.details.oldRole} to {log.details.newRole}
                              </span>
                            )}
                            {log.action === 'user_deleted' && log.details.targetUserEmail && (
                              <span>
                                Deleted user: {log.details.targetUserName} ({log.details.targetUserEmail})
                              </span>
                            )}
                            {log.action === 'sessions_revoked_all' && log.details.count && (
                              <span>{log.details.count} sessions revoked</span>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card devId="pagination-card" className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Page {page} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                devId="prev-page-button"
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      devId={getPageButtonId(pageNum)}
                      variant={page === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPage(pageNum)}
                      className="w-10"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>
              <Button
                devId="next-page-button"
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || isLoading}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
}