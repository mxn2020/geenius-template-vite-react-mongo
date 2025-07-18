# AI Agent Guide for Geenius Template Updates

## Overview

This document provides comprehensive guidance for AI agents to understand, maintain, and update the Geenius React Template. The template includes a sophisticated dev-container package for live feedback collection and change management.

## Template Architecture

### Core Technologies
- **Frontend**: React 18 + TypeScript + Vite
- **Authentication**: Better Auth with MongoDB adapter
- **Database**: MongoDB + Prisma ORM
- **Routing**: React Router v7
- **Styling**: Tailwind CSS + Radix UI components
- **State Management**: Zustand for dev-container state
- **Build Tool**: Vite with HMR
- **Package Manager**: pnpm

### Key Dependencies
```json
{
  "react": "^18.2.0",
  "vite": "^4.4.5",
  "typescript": "^5.0.2",
  "mongodb": "^6.17.0",
  "prisma": "^6.12.0",
  "better-auth": "^1.2.12",
  "react-router-dom": "^7.7.0",
  "zustand": "^4.4.0",
  "tailwindcss": "^3.3.3",
  "@radix-ui/*": "Latest versions",
  "lucide-react": "^0.263.1"
}
```

## Authentication System

### Better Auth Implementation

The template uses Better Auth with MongoDB adapter for authentication. This provides:

- **Email/Password Authentication**: Local account creation and login
- **Social Authentication**: Google and GitHub OAuth integration
- **Session Management**: Secure session handling with MongoDB storage
- **Type Safety**: Full TypeScript support with type inference

### Authentication Architecture

```typescript
// Authentication flow
src/lib/auth.ts          // Server-side Better Auth configuration
src/lib/auth-client.ts   // Client-side authentication hooks
src/lib/mongodb.ts       // MongoDB connection for auth
src/lib/prisma.ts        // Prisma client for app data
```

### Authentication Components

1. **Login Component** (`src/components/auth/Login.tsx`)
   - Email/password login form
   - Social authentication buttons (Google, GitHub)
   - Form validation and error handling
   - Responsive design with Tailwind CSS

2. **Register Component** (`src/components/auth/Register.tsx`)
   - User registration with email/password
   - Social registration options
   - Password confirmation validation
   - Account creation flow

3. **Dashboard Component** (`src/components/auth/Dashboard.tsx`)
   - Protected user dashboard
   - User profile display
   - Session information and statistics
   - Logout functionality

4. **ProtectedRoute Component** (`src/components/auth/ProtectedRoute.tsx`)
   - Route protection wrapper
   - Authentication state checking
   - Redirect to login for unauthorized users
   - Loading states during auth checks

5. **AuthProvider Component** (`src/components/auth/AuthProvider.tsx`)
   - Global authentication context
   - Session state management
   - Authentication status tracking
   - Error handling for auth operations

### Database Architecture

The template uses a dual-database approach:

1. **Better Auth Collections** (MongoDB native)
   - `users` - User accounts and profiles
   - `sessions` - Active user sessions
   - `accounts` - Social provider accounts
   - `verificationTokens` - Email verification tokens

2. **Prisma Models** (MongoDB via Prisma)
   - `Post` - Blog posts or content
   - `Comment` - User comments
   - `Category` - Content categories
   - `UserPreference` - User settings
   - `AppSetting` - Application configuration

### Environment Variables

```env
# Database Configuration
DATABASE_URL="mongodb://localhost:27017/geenius-template"
MONGODB_URI="mongodb://localhost:27017/geenius-template"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Application URLs
VITE_APP_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3000"

# OAuth Configuration (Optional)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### API Endpoints

Better Auth automatically creates these endpoints:

- `POST /api/auth/sign-in` - Email/password login
- `POST /api/auth/sign-up` - User registration
- `POST /api/auth/sign-out` - User logout
- `GET /api/auth/session` - Get current session
- `POST /api/auth/oauth/google` - Google OAuth
- `POST /api/auth/oauth/github` - GitHub OAuth

### Server Setup

The template includes an Express server (`server/index.ts`) that:

- Handles Better Auth routes with catch-all handler
- Provides CORS configuration for frontend
- Includes example protected API endpoints
- Supports concurrent development with frontend

### Development Workflow

1. **Start both servers**:
   ```bash
   pnpm dev:full  # Starts both frontend and backend
   ```

2. **Frontend only** (if backend is running separately):
   ```bash
   pnpm dev
   ```

3. **Backend only**:
   ```bash
   pnpm dev:server
   ```

## Dev-Container Package Structure

### Core Components

1. **DevModeApp** (`src/lib/dev-container/components/DevModeApp.tsx`)
   - Main wrapper component that provides dev mode functionality
   - Manages global state and component registry
   - Handles keyboard shortcuts (Ctrl+Shift+D)

2. **Container** (`src/lib/dev-container/components/Container.tsx`)
   - Wraps React components to make them selectable in dev mode
   - Provides visual feedback and interaction handling
   - Manages component selection and hover states

3. **DevModeProvider** (`src/lib/dev-container/components/DevModeProvider.tsx`)
   - Global state management using Zustand
   - Provides context for dev mode state and actions
   - Manages change requests and submission logic

4. **Sidebar** (`src/lib/dev-container/components/Sidebar.tsx`)
   - Comprehensive change management interface
   - Allows editing, removing, and organizing change requests
   - Provides submission and export functionality

5. **Popover** (`src/lib/dev-container/components/Popover.tsx`)
   - Contextual feedback collection interface
   - Appears when components are selected
   - Categorizes and prioritizes change requests

### State Management

The dev-container uses Zustand for state management with persistence:

```typescript
interface DevModeState {
  isEnabled: boolean;
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  changes: ChangeRequest[];
  isSubmitting: boolean;
  sidebarOpen: boolean;
  showComponentTree: boolean;
  popoverState: PopoverState | null;
}
```

### Change Request Structure

```typescript
interface ChangeRequest {
  id: string;
  componentId: string;
  feedback: string;
  timestamp: number;
  category: ChangeCategory;
  priority: ChangePriority;
  status: ChangeStatus;
  componentContext: ComponentContext;
  pageContext: PageContext;
  userContext?: UserContext;
  metadata?: ChangeMetadata;
}
```

## Component Registry System

### Registry Structure (`src/registry.ts`)

The registry maps component IDs to metadata:

```typescript
interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  filePath: string;
  semanticTags: string[];
  category: 'ui' | 'page' | 'layout' | 'shadcn' | 'custom';
  dependencies?: string[];
  props?: Record<string, any>;
}
```

### Current Registry Components

The template includes a comprehensive registry with:
- **Page Components**: landing-page, app-root
- **Section Components**: hero-section, stats-section, features-section, tech-stack-section, cta-section
- **UI Components**: Various buttons, cards, and badges
- **Semantic Tags**: Descriptive tags for AI processing

## File Structure

```
src/
├── lib/dev-container/          # Dev-container package
│   ├── components/             # Core dev-container components
│   ├── hooks/                  # Custom hooks
│   ├── shadcn/                 # Wrapped shadcn components
│   ├── utils/                  # Utility functions
│   └── types.ts                # TypeScript definitions
├── components/                 # Application components
│   ├── Landing.tsx             # Main landing page
│   ├── ui/                     # UI components
│   └── ChangeSubmissionDialog.tsx # Change submission UI
├── App.tsx                     # Root application component
├── registry.ts                 # Component registry definition
└── main.tsx                    # Application entry point
```

## Configuration Files

### Build Configuration (`vite.config.ts`)
- Vite configuration with React plugin
- Development server settings
- Build optimization settings

### Database Configuration (`prisma/schema.prisma`)
- MongoDB connection setup
- Schema definitions for data models
- Database client configuration

### Styling Configuration (`tailwind.config.js`)
- Tailwind CSS configuration
- Custom theme settings
- Plugin configurations

## AI Agent Update Guidelines

### 1. Authentication Updates

When working with authentication features:

**Adding New Auth Components:**
1. **Create component file** in `src/components/auth/`
2. **Wrap with Container** for dev-container integration
3. **Update registry** with appropriate auth-related semantic tags
4. **Add to routing** in `src/App.tsx` if needed
5. **Update TypeScript types** if extending auth functionality

**Modifying Auth Flow:**
1. **Server-side changes** go in `src/lib/auth.ts`
2. **Client-side changes** go in `src/lib/auth-client.ts`
3. **Database changes** require Better Auth adapter updates
4. **Test all auth flows** after modifications

**Adding OAuth Providers:**
1. **Configure in auth.ts** with provider settings
2. **Add environment variables** for client ID/secret
3. **Update login/register components** with new buttons
4. **Test OAuth callback handling**

### 2. Adding New Components

When adding new components:

1. **Create the component file** in appropriate directory
2. **Update registry** in `src/registry.ts`:
   ```typescript
   {
     id: 'new-component-id',
     name: 'Component Name',
     description: 'Clear description of component purpose',
     filePath: 'src/components/NewComponent.tsx',
     category: 'ui' | 'page' | 'layout' | 'shadcn' | 'custom',
     semanticTags: ['descriptive', 'tags', 'for', 'ai'],
     dependencies: ['optional-dependencies'],
   }
   ```
3. **Wrap with Container** in component implementation:
   ```tsx
   import { Container } from '../lib/dev-container';
   
   export const NewComponent = () => {
     return (
       <Container componentId="new-component-id">
         {/* Component content */}
       </Container>
     );
   };
   ```

### 2. Updating Existing Components

When modifying components:

1. **Check registry accuracy** - ensure metadata matches component reality
2. **Update semantic tags** - keep tags relevant to component function
3. **Maintain Container wrapping** - preserve dev-container integration
4. **Update dependencies** - reflect any new dependencies in registry

### 3. Styling and Theme Updates

For styling changes:

1. **Use Tailwind classes** - maintain consistency with existing approach
2. **Update theme configuration** - modify `tailwind.config.js` for global changes
3. **Consider dark mode** - ensure changes work with theme switching
4. **Test responsiveness** - verify mobile and desktop compatibility

### 4. Database Schema Changes

For database updates:

1. **Update Prisma schema** - modify `prisma/schema.prisma`
2. **Generate types** - run `pnpm db:generate`
3. **Push changes** - run `pnpm db:push` for development
4. **Update related components** - ensure UI reflects schema changes

### 5. Dev-Container Updates

When updating dev-container functionality:

1. **Update types** - modify `src/lib/dev-container/types.ts`
2. **Update state management** - adjust Zustand stores if needed
3. **Test change submission** - ensure submission endpoint compatibility
4. **Update documentation** - keep README.md current

## Testing and Validation

### Build Process
```bash
pnpm build          # TypeScript compilation + Vite build
pnpm lint           # ESLint validation
pnpm dev            # Development server
pnpm dev:full       # Both frontend and backend servers
```

### Authentication Testing
1. **Email/Password Flow**
   - Test user registration with valid/invalid emails
   - Test login with correct/incorrect credentials
   - Test password validation and error messages
   - Verify session persistence across browser refresh

2. **Social Authentication**
   - Test Google OAuth flow (requires valid credentials)
   - Test GitHub OAuth flow (requires valid credentials)
   - Verify account linking and profile data import
   - Test error handling for OAuth failures

3. **Protected Routes**
   - Test unauthorized access to protected routes
   - Verify redirect to login page for unauthenticated users
   - Test successful access after authentication
   - Verify logout functionality and session cleanup

4. **Session Management**
   - Test session expiration and renewal
   - Verify concurrent session handling
   - Test session persistence across browser tabs
   - Test logout from one tab affects all tabs

### Dev-Container Testing
1. **Enable dev mode** - Use Ctrl+Shift+D or toggle button
2. **Select components** - Click on wrapped components
3. **Add feedback** - Use popover to create change requests
4. **Test sidebar** - Verify change management functionality
5. **Test submission** - Ensure submission endpoint works

## Change Submission API

### Endpoint Configuration
The dev-container submits changes to:
```
POST ${VITE_GEENIUS_API_URL}/api/process-changes
```

### Submission Payload
```typescript
interface SubmissionPayload {
  submissionId: string;
  timestamp: number;
  changes: ChangeRequest[];
  globalContext: GlobalContext;
  summary: SubmissionSummary;
}
```

### Response Format
```typescript
interface SubmissionResponse {
  success: boolean;
  submissionId: string;
  message: string;
  trackingUrl?: string;
  estimatedProcessingTime?: number;
  error?: string;
}
```

## Common Update Patterns

### 1. Adding a New Page
```typescript
// 1. Create component file
// 2. Add to registry
{
  id: 'new-page',
  name: 'New Page',
  description: 'Description of new page',
  filePath: 'src/components/NewPage.tsx',
  category: 'page',
  semanticTags: ['page', 'new', 'feature'],
}

// 3. Wrap in Container
<Container componentId="new-page">
  <div className="new-page">
    {/* Page content */}
  </div>
</Container>
```

### 2. Adding a New UI Component
```typescript
// 1. Create in components/ui/
// 2. Add to registry with 'ui' category
// 3. Export from appropriate index files
// 4. Update registry with dependencies if needed
```

### 3. Updating Database Models
```prisma
// 1. Update schema in prisma/schema.prisma
model NewModel {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// 2. Generate types: pnpm db:generate
// 3. Push to database: pnpm db:push
```

## Best Practices for AI Agents

### 1. Registry Maintenance
- Keep registry metadata accurate and up-to-date
- Use descriptive semantic tags for better AI processing
- Maintain proper file path references
- Document component dependencies

### 2. Code Quality
- Follow existing TypeScript patterns
- Use proper error handling
- Maintain consistent naming conventions
- Keep components properly typed

### 3. Performance Considerations
- Lazy load components when appropriate
- Optimize bundle size
- Use proper React patterns (memo, useCallback)
- Monitor build performance

### 4. Dev-Container Integration
- Always wrap new components with Container
- Provide meaningful component descriptions
- Use appropriate categories and tags
- Test dev mode functionality after changes

## Environment Variables

```env
VITE_GEENIUS_API_URL=http://localhost:8888  # API endpoint for submissions
DATABASE_URL=mongodb://localhost:27017/db   # MongoDB connection string
```

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Check type definitions in `types.ts`
2. **Build Failures**: Verify all imports and dependencies
3. **Registry Issues**: Ensure component IDs are unique
4. **Dev Mode Problems**: Check Container wrapping and registry entries

### Debug Mode
Enable debug logging by uncommenting debug statements in `registry.ts`.

## Future Considerations

### Potential Enhancements
1. **Real-time collaboration** - Multiple stakeholders providing feedback
2. **AI-powered suggestions** - Automated improvement recommendations
3. **Integration testing** - Automated testing of dev-container functionality
4. **Performance monitoring** - Built-in performance metrics
5. **Advanced theming** - More sophisticated theme customization

This guide provides the foundation for AI agents to effectively maintain and enhance the Geenius React Template while preserving its dev-container functionality and architectural integrity.