import React from 'react';
import { 
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent
} from '../../../components/ui/tabs';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevTabsProps extends React.ComponentPropsWithoutRef<typeof ShadcnTabs> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Tabs = React.forwardRef<
  React.ElementRef<typeof ShadcnTabs>, 
  DevTabsProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `tabs-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Tabs',
        description: devDescription || 'A tabs navigation component',
        filePath: 'src/lib/dev-container/shadcn/Tabs.tsx',
        category: 'ui',
        semanticTags: ['tabs', 'navigation', 'content', 'ui'],
      }}
    >
      <ShadcnTabs ref={ref} {...props} />
    </Container>
  );
});

Tabs.displayName = 'DevTabs';

// Export other tabs components without dev wrapping
export const TabsList = ShadcnTabsList;
export const TabsTrigger = ShadcnTabsTrigger;
export const TabsContent = ShadcnTabsContent;

export { type DevTabsProps };
