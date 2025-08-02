# Admin Guide

This guide explains how to use the admin features in the Geenius Template application.

## Setting Up Admin Access

### 1. Create an Admin User

After registering a user through the normal registration flow, you can grant admin privileges using the provided script:

```bash
# First, register a user normally through the app
# Then note the user ID from Better Auth (you can find this in MongoDB or from the session)

# Grant admin role to a user
npx tsx scripts/create-admin.ts <userId>

# Example:
npx tsx scripts/create-admin.ts 507f1f77bcf86cd799439011
```

### 2. Accessing the Admin Panel

Once you have admin privileges:

1. Log in to your account normally
2. Navigate to `/dashboard`
3. Click the "Admin Panel" button in the header
4. Or directly navigate to `/admin`

## Admin Features

### Dashboard Overview
- View total users count
- Monitor active users
- Track audit logs
- View system health metrics

### User Management (Coming Soon)
- List all users
- Search and filter users
- Edit user roles
- Disable/enable accounts
- View user activity

### Audit Logs (Coming Soon)
- View all system events
- Filter by user, action, or date
- Export logs for analysis
- Monitor security events

### Settings (Coming Soon)
- Configure application settings
- Manage email templates
- Set up system notifications

## Role-Based Access Control

The application supports two roles:
- **User**: Default role for all registered users
- **Admin**: Full access to admin features

### Checking User Roles

In your React components:

```typescript
import { useAuth } from './components/auth/AuthProvider';

function MyComponent() {
  const { isAdmin, role } = useAuth();
  
  if (isAdmin) {
    // Show admin features
  }
}
```

### Protecting Admin Routes

Admin routes are automatically protected using the `AdminRoute` component:

```typescript
<Route
  path="/admin/feature"
  element={
    <AdminRoute>
      <YourAdminComponent />
    </AdminRoute>
  }
/>
```

## Security Considerations

1. **Admin Creation**: Only create admin users for trusted individuals
2. **Audit Logging**: All admin actions are logged for security
3. **Session Management**: Admin sessions follow the same security rules as regular users
4. **Database Access**: Admin role is stored separately from Better Auth's user system

## Troubleshooting

### Can't see admin features after granting role
1. Log out and log back in
2. Clear browser cache
3. Check the UserPreference collection in MongoDB

### Admin route returns "Access Denied"
1. Verify the user has admin role in UserPreference
2. Check browser console for errors
3. Ensure Better Auth session is valid

### Script fails to create admin
1. Ensure MongoDB is running
2. Check DATABASE_URL in .env
3. Verify the userId exists in Better Auth