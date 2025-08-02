import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getUserById, updateUser, deleteUser, type User } from '../../lib/api/users';
import { Container, Button, Card, Badge, Alert, Tabs, TabsContent, TabsList, TabsTrigger } from '../../lib/dev-container';
import { ArrowLeft, User as UserIcon, Mail, Calendar, Shield, Trash2, Save, AlertCircle } from 'lucide-react';

export function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getUserById(userId!);
      setUser(userData);
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('Failed to load user details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (newRole: 'user' | 'admin') => {
    if (!user) return;
    
    try {
      setSaving(true);
      setError(null);
      const updatedUser = await updateUser(user.id, { role: newRole });
      setUser(updatedUser);
    } catch (err) {
      console.error('Error updating user role:', err);
      setError('Failed to update user role. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    
    try {
      setDeleting(true);
      setError(null);
      await deleteUser(user.id);
      navigate('/admin/users');
    } catch (err) {
      console.error('Error deleting user:', err);
      setError('Failed to delete user. Please try again.');
      setShowDeleteConfirm(false);
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <Container componentId="user-details-loading" className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading user details...</p>
        </div>
      </Container>
    );
  }

  if (error && !user) {
    return (
      <Container componentId="user-details-error" className="p-8">
        <Card devId="error-card" className="bg-red-50 border-red-200 p-6">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
          <Button
            devId="back-button"
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/admin/users')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Users
          </Button>
        </Card>
      </Container>
    );
  }

  if (!user) return null;

  return (
    <Container componentId="user-details-page" className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/users">
            <Button devId="back-link" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
            <p className="text-gray-600 mt-1">View and manage user information</p>
          </div>
        </div>
        <Button
          devId="delete-button"
          variant="destructive"
          onClick={() => setShowDeleteConfirm(true)}
          disabled={deleting}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete User
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert devId="error-alert" variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <span className="ml-2">{error}</span>
        </Alert>
      )}

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <Alert devId="delete-confirm-alert" variant="destructive">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Are you sure you want to delete this user?</p>
              <p className="text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-2">
              <Button
                devId="cancel-delete"
                variant="outline"
                size="sm"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                devId="confirm-delete"
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Alert>
      )}

      {/* User Info Card */}
      <Card devId="user-info-card" className="p-6">
        <div className="flex items-start gap-6">
          <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-2xl font-medium text-gray-600">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-1" />
                <span>{user.email}</span>
              </div>
              <Badge devId="role-badge" variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                {user.role}
              </Badge>
              {user.emailVerified && (
                <Badge devId="verified-badge" variant="outline" className="text-green-700 border-green-300">
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs devId="user-tabs" defaultValue="details" className="w-full">
        <TabsList devId="tabs-list">
          <TabsTrigger devId="details-tab" value="details">Details</TabsTrigger>
          <TabsTrigger devId="activity-tab" value="activity">Activity</TabsTrigger>
          <TabsTrigger devId="sessions-tab" value="sessions">Sessions</TabsTrigger>
          <TabsTrigger devId="permissions-tab" value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent devId="details-content" value="details">
          <Card devId="details-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="mt-1 text-sm font-mono bg-gray-50 p-2 rounded">{user.id}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-sm">{formatDate(user.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Active</label>
                  <p className="mt-1 text-sm">{formatDate(user.lastActive)}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">User Preferences</label>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Theme</span>
                    <span className="font-medium">{user.preferences?.theme || 'Light'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Language</span>
                    <span className="font-medium">{user.preferences?.language || 'English'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Email Notifications</span>
                    <span className="font-medium">{user.preferences?.emailNotifications ? 'Enabled' : 'Disabled'}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent devId="activity-content" value="activity">
          <Card devId="activity-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <p className="text-gray-600">Activity tracking coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent devId="sessions-content" value="sessions">
          <Card devId="sessions-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
            <p className="text-gray-600">Session management coming soon...</p>
          </Card>
        </TabsContent>

        <TabsContent devId="permissions-content" value="permissions">
          <Card devId="permissions-card" className="p-6">
            <h3 className="text-lg font-semibold mb-4">Role & Permissions</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Current Role</label>
                <div className="mt-2 flex items-center gap-4">
                  <Badge devId="current-role-badge" variant={user.role === 'admin' ? 'destructive' : 'secondary'}>
                    {user.role}
                  </Badge>
                  <Button
                    devId="change-role-button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRoleChange(user.role === 'admin' ? 'user' : 'admin')}
                    disabled={saving}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    {saving ? 'Saving...' : `Change to ${user.role === 'admin' ? 'User' : 'Admin'}`}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Permissions</label>
                <div className="mt-2 space-y-2 text-sm">
                  {user.role === 'admin' ? (
                    <>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Full system access
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> User management
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> System configuration
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Audit log access
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Basic user access
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <span>✓</span> Profile management
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span>✗</span> Admin features
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </Container>
  );
}