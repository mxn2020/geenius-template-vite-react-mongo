import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Button, Card } from '../lib/dev-container';
import { ArrowLeft, AlertCircle, Trash2 } from 'lucide-react';
import { useUserDetails } from '../hooks/useUserDetails';
import { UserInfo } from '../components/users/details/UserInfo';
import { UserActivity } from '../components/users/details/UserActivity';
import { UserSessions } from '../components/users/details/UserSessions';
import { useAuth } from '../components/auth/AuthProvider';

export function UserDetailsPage() {
  const { userId } = useParams<{ userId: string }>();
  const { user: currentUser } = useAuth();
  const {
    user,
    isLoading,
    error,
    updateRole,
    deleteUser,
    terminateSession,
    isUpdating,
    isDeleting,
  } = useUserDetails(userId!);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteUser = async () => {
    deleteUser();
  };

  if (isLoading) {
    return (
      <Container componentId="user-details-loading" className="space-y-6">
        <Card componentId="loading-card" className="p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600">Loading user details...</p>
          </div>
        </Card>
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container componentId="user-details-error" className="space-y-6">
        <Card componentId="error-card" className="bg-red-50 border-red-200 p-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
            <p className="text-red-700">{error?.message || 'User not found'}</p>
            <Link to="/admin/users">
              <Button componentId="back-button" variant="outline">
                Back to Users
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container componentId="user-details-page" className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <Link to="/admin/users">
            <Button componentId="back-button" variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
          </Link>
        </div>
        {currentUser?.id !== user.id && (
          <Button
            componentId="delete-user-button"
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete User
          </Button>
        )}
      </div>

      {/* User Info */}
      <UserInfo 
        user={user} 
        onRoleChange={updateRole}
        canChangeRole={currentUser?.id !== user.id}
      />

      {/* User Preferences */}
      <Card componentId="preferences-card" className="p-6">
        <h3 className="text-lg font-semibold mb-4">User Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-700">Theme</p>
            <p className="text-sm text-gray-600 capitalize">{user.preferences.theme}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Email Notifications</p>
            <p className="text-sm text-gray-600">{user.preferences.emailNotifications ? 'Enabled' : 'Disabled'}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Language</p>
            <p className="text-sm text-gray-600">{user.preferences.language.toUpperCase()}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Timezone</p>
            <p className="text-sm text-gray-600">{user.preferences.timezone}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <UserActivity activities={user.recentActivity} />

        {/* Active Sessions */}
        <UserSessions 
          sessions={user.sessions}
          currentSessionId={currentUser?.sessionId}
          onTerminateSession={terminateSession}
        />
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card componentId="delete-confirm-card" className="p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Delete User?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {user.name}? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                componentId="cancel-delete-button"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                componentId="confirm-delete-button"
                variant="destructive"
                onClick={handleDeleteUser}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete User'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Container>
  );
}