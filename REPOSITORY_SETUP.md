# Repository Configuration for AI Agents

## Quick Setup

To enable AI agents to locate your files in GitHub, you need to configure your repository information:

### 1. Update Repository Configuration

Edit `src/lib/dev-container/config/repository.ts`:

```typescript
export const REPOSITORY_CONFIG: RepositoryConfiguration = {
  owner: 'your-github-username',    // Replace with your GitHub username
  repository: 'your-repo-name',     // Replace with your repository name
  branch: 'main',                   // Your default branch
  baseUrl: 'https://github.com'     // Keep as is for GitHub
};
```

### 2. Example Configuration

For a repository at `https://github.com/johndoe/my-awesome-app`:

```typescript
export const REPOSITORY_CONFIG: RepositoryConfiguration = {
  owner: 'johndoe',
  repository: 'my-awesome-app',
  branch: 'main',
  baseUrl: 'https://github.com'
};
```

### 3. Alternative: Programmatic Configuration

You can also configure it programmatically in your app:

```typescript
import { configureRepository } from './lib/dev-container/config/repository';

// Configure at app startup
configureRepository({
  owner: 'your-github-username',
  repository: 'your-repo-name',
  branch: 'main'
});
```

## What This Enables

Once configured, the dev-container will automatically generate GitHub URLs for:

- Component definition files
- Component usage files  
- Line-specific links (e.g., `file.tsx#L42`)

This allows AI agents to:
- ✅ Navigate directly to files in your repository
- ✅ See exact line numbers where components are used
- ✅ Access the full repository context
- ✅ Make targeted changes with precision

## Example Output

After configuration, the sidebar will show clickable GitHub links:

```
Component: Button
├── Defined in: src/lib/dev-container/shadcn/Button.tsx
├── Repository: https://github.com/johndoe/my-app/blob/main/src/lib/dev-container/shadcn/Button.tsx
├── Used in: src/pages/Landing.tsx
├── Repository: https://github.com/johndoe/my-app/blob/main/src/pages/Landing.tsx
└── Position: Line 220, Column 15
```

The JSON export will include both local paths and repository URLs for complete automation support.