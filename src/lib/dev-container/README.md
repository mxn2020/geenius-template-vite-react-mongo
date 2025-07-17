# Dev Container Package

A reusable development feedback system that allows stakeholders to provide contextual change requests directly on live React applications.

## Features

- **Container Component**: Wraps React components to make them selectable in dev mode
- **Dev Mode Provider**: Global state management for development mode
- **Change Management**: Collect, edit, and submit change requests
- **Sidebar Interface**: Comprehensive change management panel
- **Popover Feedback**: Contextual feedback collection
- **Type Safety**: Full TypeScript support with comprehensive type definitions

## Quick Start

1. **Set up your component registry**:

```typescript
// src/registry.ts
import { createRegistry, ComponentMeta } from './lib/dev-container';

const components: ComponentMeta[] = [
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Main landing page component',
    filePath: 'src/components/Landing.tsx',
    category: 'page',
    semanticTags: ['landing', 'hero', 'homepage'],
  },
  // Add more components...
];

export const componentRegistry = createRegistry(components);
```

2. **Wrap your app with DevModeApp**:

```typescript
// src/App.tsx
import { DevModeApp, Container } from './lib/dev-container';
import { componentRegistry } from './registry';

function App() {
  return (
    <DevModeApp registry={componentRegistry}>
      <Container componentId="app-root">
        {/* Your app content */}
      </Container>
    </DevModeApp>
  );
}
```

3. **Wrap components with Container**:

```typescript
// src/components/Landing.tsx
import { Container } from '../lib/dev-container';

export const Landing = () => {
  return (
    <Container componentId="landing-page">
      <div className="landing-content">
        {/* Your component content */}
      </div>
    </Container>
  );
};
```

## API Reference

### DevModeApp

The main wrapper component that provides dev mode functionality.

```typescript
<DevModeApp registry={componentRegistry}>
  {children}
</DevModeApp>
```

### Container

Wraps components to make them selectable in dev mode.

```typescript
<Container 
  componentId="unique-component-id"
  selectable={true}
  devActions={[]}
  className="custom-class"
>
  {children}
</Container>
```

### useDevMode Hook

Access dev mode state and actions.

```typescript
const {
  isEnabled,
  selectedComponentId,
  changes,
  toggleDevMode,
  addChange,
  submitChanges,
} = useDevMode();
```

## Development Mode Usage

1. **Toggle Dev Mode**: Click the "Enter Dev Mode" button in the top-right corner
2. **Select Components**: Click on any wrapped component to select it
3. **Add Feedback**: Use the popover to add change requests
4. **Manage Changes**: Use the sidebar to review and edit changes
5. **Submit Changes**: Send all changes to your development endpoint

## Change Request Structure

```typescript
interface ChangeRequest {
  id: string;
  componentId: string;
  feedback: string;
  category: ChangeCategory;
  priority: ChangePriority;
  status: ChangeStatus;
  componentContext: ComponentContext;
  pageContext: PageContext;
  timestamp: number;
}
```

## Configuration

Configure dev mode behavior:

```typescript
const config = {
  enabled: false,
  showBorders: true,
  showTooltips: true,
  autoOpenSidebar: false,
  persistChanges: true,
  maxChanges: 50,
  submitEndpoint: '/api/dev-changes',
};
```

## Integration with AI Systems

The package structures change requests optimally for AI processing:

- **Component Context**: Full metadata about the component
- **Page Context**: Current page and URL information
- **Semantic Tags**: Searchable component descriptors
- **Hierarchical Data**: Parent-child component relationships

## Best Practices

1. **Component Registry**: Keep your registry up-to-date as you add components
2. **Semantic Tags**: Use descriptive tags for better AI processing
3. **File Paths**: Maintain accurate file paths for developer context
4. **Categories**: Use appropriate categories for change requests
5. **Descriptions**: Write clear component descriptions

## Example Implementation

See the main App.tsx and Landing.tsx files for a complete implementation example.