import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuditLogs, type AuditLog } from '../../lib/api/audit-logs';
import { Container, Button, Card, Badge, Alert } from '../../lib/dev-container';
import { 
  Shield, 
  Activity,
  Calendar,
  Filter,
  Clock,
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
  Settings
} from 'lucide-react';

export function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterAction, setFilterAction] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, [page, filterAction]);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAuditLogs({
        page,
        limit: 20,
        action: filterAction || undefined,
      });
      setLogs(response.logs);
      setTotalPages(response.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching audit logs:', err);
      setError('Failed to load activity logs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

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
      password_change: 'Password changed',
      password_reset_request: 'Password reset requested',
      password_reset_complete: 'Password reset completed',
      email_verification: 'Email verified',
      session_revoked: 'Session revoked',
      sessions_revoked_all: 'All sessions revoked',
      profile_update: 'Profile updated',
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
        return 'destructive';
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

  if (loading && page === 1) {
    return (
      <Container componentId="audit-logs-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading activity logs...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container componentId="audit-logs-page" className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Log</h1>
          <p className="text-gray-600 mt-1">View your account activity and security events</p>
        </div>
        <Button
          devId="back-button"
          variant="outline"
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert devId="error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error}</span>
        </Alert>
      )}

      {/* Filters */}
      <Card devId="filters-card" className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          <select
            value={filterAction}
            onChange={(e) => {
              setFilterAction(e.target.value);
              setPage(1);
            }}
            className="text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">All activities</option>
            <option value="login">Sign ins</option>
            <option value="logout">Sign outs</option>
            <option value="login_failed">Failed logins</option>
            <option value="password_change">Password changes</option>
            <option value="session_revoked">Session revocations</option>
          </select>
        </div>
      </Card>

      {/* Activity List */}
      <div className="space-y-3">
        {logs.length === 0 ? (
          <Card devId="no-logs-card" className="p-8 text-center">
            <div className="flex flex-col items-center">
              <div className="p-4 bg-gray-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No activity logs found</p>
              <p className="text-sm text-gray-500 mt-1">
                {filterAction ? 'Try changing your filters' : 'Your activity will appear here'}
              </p>
            </div>
          </Card>
        ) : (
          logs.map((log) => {
            const Icon = getActionIcon(log.action);
            return (
              <Card key={log.id} devId={`log-card-${log.id}`} className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${log.success ? 'bg-gray-100' : 'bg-red-100'}`}>
                    <Icon className={`h-5 w-5 ${log.success ? 'text-gray-600' : 'text-red-600'}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">
                            {getActionLabel(log.action)}
                          </span>
                          <Badge 
                            devId={`status-badge-${log.id}`}
                            variant={getActionColor(log.action, log.success)}
                            className="text-xs"
                          >
                            {log.success ? 'Success' : 'Failed'}
                          </Badge>
                        </div>
                        {log.error && (
                          <p className="text-sm text-red-600 mt-1">{log.error}</p>
                        )}
                        {log.details && (
                          <div className="text-sm text-gray-600 mt-1">
                            {log.action === 'sessions_revoked_all' && log.details.count && (
                              <span>{log.details.count} sessions revoked</span>
                            )}
                            {log.action === 'session_revoked' && log.details.sessionId && (
                              <span>Session ID: {log.details.sessionId.slice(0, 8)}...</span>
                            )}
                          </div>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          {log.ip && (
                            <span className="flex items-center gap-1">
                              <Shield className="h-3 w-3" />
                              {log.ip}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(log.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>

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
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                devId="next-page-button"
                variant="outline"
                size="sm"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </Container>
  );
}