import { useState, useEffect } from 'react';
import { getUserSessions, revokeSession, revokeAllOtherSessions, type Session } from '../../lib/api/sessions';
import { Container, Button, Card, Badge, Alert } from '../../lib/dev-container';
import { 
  Shield, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Globe, 
  Clock, 
  AlertCircle,
  LogOut,
  Chrome,
  Compass
} from 'lucide-react';

export function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [revokingAll, setRevokingAll] = useState(false);
  const [showRevokeAllConfirm, setShowRevokeAllConfirm] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserSessions();
      setSessions(response.sessions);
    } catch (err) {
      console.error('Error fetching sessions:', err);
      setError('Failed to load sessions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      setRevokingId(sessionId);
      setError(null);
      await revokeSession(sessionId);
      await fetchSessions(); // Refresh the list
    } catch (err) {
      console.error('Error revoking session:', err);
      setError('Failed to revoke session. Please try again.');
    } finally {
      setRevokingId(null);
    }
  };

  const handleRevokeAllOthers = async () => {
    try {
      setRevokingAll(true);
      setError(null);
      const result = await revokeAllOtherSessions();
      setShowRevokeAllConfirm(false);
      await fetchSessions(); // Refresh the list
      if (result.count > 0) {
        // Could show a success message
      }
    } catch (err) {
      console.error('Error revoking sessions:', err);
      setError('Failed to revoke sessions. Please try again.');
    } finally {
      setRevokingAll(false);
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

  const getTimeRemaining = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case 'chrome':
        return Chrome;
      case 'safari':
        return Compass;
      default:
        return Globe;
    }
  };

  const activeSessions = sessions.filter(s => s.active);
  const currentSession = sessions.find(s => s.current);

  if (loading) {
    return (
      <Container componentId="sessions-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading sessions...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container componentId="sessions-page" className="space-y-6 max-w-4xl mx-auto p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Active Sessions</h1>
        <p className="text-gray-600 mt-1">Manage your active sessions and enhance your account security</p>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert devId="error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error}</span>
        </Alert>
      )}

      {/* Security Overview */}
      <Card devId="security-overview" className="p-6 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900">Security Status</h3>
            <p className="text-sm text-blue-700 mt-1">
              You have {activeSessions.length} active session{activeSessions.length !== 1 ? 's' : ''}.
              {activeSessions.length > 3 && ' Consider reviewing and revoking unused sessions.'}
            </p>
            {activeSessions.length > 1 && (
              <Button
                devId="revoke-all-button"
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => setShowRevokeAllConfirm(true)}
                disabled={revokingAll}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out all other sessions
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Revoke All Confirmation */}
      {showRevokeAllConfirm && (
        <Alert devId="revoke-all-confirm" variant="destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Sign out all other sessions?</p>
              <p className="text-sm mt-1">This will sign you out from all devices except this one.</p>
            </div>
            <div className="flex gap-2">
              <Button
                devId="cancel-revoke-all"
                variant="outline"
                size="sm"
                onClick={() => setShowRevokeAllConfirm(false)}
                disabled={revokingAll}
              >
                Cancel
              </Button>
              <Button
                devId="confirm-revoke-all"
                variant="destructive"
                size="sm"
                onClick={handleRevokeAllOthers}
                disabled={revokingAll}
              >
                {revokingAll ? 'Signing out...' : 'Sign out all'}
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {/* Current Session */}
      {currentSession && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Session</h2>
          <Card devId="current-session-card" className="p-6 border-green-200 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  {(() => {
                    const Icon = getDeviceIcon(currentSession.device);
                    return <Icon className="h-6 w-6 text-green-600" />;
                  })()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">
                      {currentSession.device} - {currentSession.browser}
                    </h3>
                    <Badge devId="current-badge" variant="outline" className="text-green-700 border-green-300">
                      Current
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{currentSession.os}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {currentSession.ipAddress}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {getTimeRemaining(currentSession.expiresAt)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Signed in {formatDate(currentSession.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Other Sessions */}
      {activeSessions.filter(s => !s.current).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Other Sessions</h2>
          <div className="space-y-3">
            {activeSessions.filter(s => !s.current).map((session) => (
              <Card key={session.id} devId={`session-card-${session.id}`} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      {(() => {
                        const Icon = getDeviceIcon(session.device);
                        return <Icon className="h-6 w-6 text-gray-600" />;
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {session.device} - {session.browser}
                      </h3>
                      <p className="text-sm text-gray-600">{session.os}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {session.ipAddress}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {getTimeRemaining(session.expiresAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Last active {formatDate(session.updatedAt)}
                      </p>
                    </div>
                  </div>
                  <Button
                    devId={`revoke-button-${session.id}`}
                    variant="outline"
                    size="sm"
                    onClick={() => handleRevokeSession(session.id)}
                    disabled={revokingId === session.id}
                  >
                    {revokingId === session.id ? 'Revoking...' : 'Revoke'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* No Other Sessions */}
      {activeSessions.filter(s => !s.current).length === 0 && (
        <Card devId="no-sessions-card" className="p-8 text-center">
          <div className="flex flex-col items-center">
            <div className="p-4 bg-gray-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No other active sessions</p>
            <p className="text-sm text-gray-500 mt-1">You're only signed in on this device</p>
          </div>
        </Card>
      )}
    </Container>
  );
}