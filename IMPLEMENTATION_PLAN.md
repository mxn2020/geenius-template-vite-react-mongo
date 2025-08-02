# Better Auth Implementation Plan

## Phase 1: Infrastructure Refactoring

### 1.1 Reorganize Library Structure
- [x] Create `lib/plugins/` directory
- [x] Move `lib/mongodb.ts` to `lib/plugins/mongodb.ts`
- [x] Move `lib/prisma.ts` to `lib/plugins/prisma.ts`
- [x] Create `lib/plugins/resend.ts` for Resend email service
- [x] Create `lib/services/email.ts` for centralized email handling
- [x] Create `lib/services/data.ts` for general CRUD operations
- [x] Update all imports to use new paths

### 1.2 Configure Resend Email Service
- [x] Install `resend` package
- [ ] Add `RESEND_API_KEY` to environment variables
- [x] Implement Resend plugin with error handling
- [x] Create email templates (verification, password reset, welcome)
- [ ] Test email sending functionality

## Phase 2: Role-Based Access Control (RBAC)

### 2.1 Database Schema Updates
- [x] Add `role` field to User model in Prisma schema
- [x] Create migration for role field with default 'user'
- [x] Update seed data to include admin user

### 2.2 Auth Configuration Updates
- [x] Update Better Auth configuration to include roles
- [x] Create role checking utilities
- [x] Add role-based middleware/guards
- [x] Update session types to include role

### 2.3 UI Components for RBAC
- [x] Create `AdminRoute` component for admin-only routes
- [x] Update navigation to show/hide based on roles
- [x] Add role indicators in user interface

## Phase 3: Admin Dashboard

### 3.1 Admin Layout and Navigation
- [x] Create admin layout component
- [x] Design admin navigation sidebar
- [x] Implement admin route structure
- [x] Add admin dashboard home page

### 3.2 User Management
- [x] Create users list page with pagination
- [x] Implement user search and filtering
- [x] Add user details view
- [x] Create user edit functionality
- [x] Implement user deletion with confirmation
- [x] Add role management UI

### 3.3 System Overview
- [x] Create dashboard statistics page
- [x] Add user activity metrics
- [x] Implement system health indicators

## Phase 4: Session Management UI

### 4.1 User Session Management
- [x] Create sessions list component
- [x] Show active sessions with details (device, location, last active)
- [x] Add "Revoke Session" functionality
- [x] Implement "Revoke All Other Sessions"
- [x] Add session expiry indicators

### 4.2 Current Session Information
- [x] Display current session details in user profile
- [x] Add session security warnings
- [x] Show session remaining time

## Phase 5: Audit Logging

### 5.1 Database Schema for Audit Logs
- [x] Create AuditLog model in Prisma
- [x] Add fields: userId, action, details, ip, userAgent, timestamp
- [x] Create database migration

### 5.2 Logging Implementation
- [x] Create audit logging service
- [x] Implement logging for auth events (login, logout, password change)
- [x] Add logging for admin actions
- [x] Log security events (failed logins, password resets)

### 5.3 Audit Log UI
- [x] Create audit log viewer for users (own logs only)
- [x] Create admin audit log viewer (all logs)
- [x] Add filtering by date, action type, user
- [x] Implement export functionality

## Phase 6: Password Reset Flow

### 6.1 Password Reset Pages
- [ ] Create "Forgot Password" page
- [ ] Implement password reset request form
- [ ] Create "Reset Password" page with token validation
- [ ] Add password strength indicator
- [ ] Implement success/error messaging

### 6.2 Backend Integration
- [ ] Configure Better Auth password reset with email
- [ ] Create password reset email template
- [ ] Add rate limiting for reset requests
- [ ] Implement token expiration handling

## Phase 7: Testing & Security

### 7.1 Security Enhancements
- [ ] Add rate limiting to auth endpoints
- [ ] Implement CSRF protection
- [ ] Add security headers
- [ ] Review and fix any security vulnerabilities

### 7.2 Testing
- [ ] Test all auth flows
- [ ] Verify email functionality
- [ ] Test role-based access
- [ ] Validate audit logging
- [ ] Check session management

## Deployment Checklist
- [ ] Update environment variables documentation
- [ ] Add deployment instructions for Resend
- [ ] Update README with new features
- [ ] Create admin user setup guide