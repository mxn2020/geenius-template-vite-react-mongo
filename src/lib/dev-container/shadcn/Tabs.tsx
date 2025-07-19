// src/lib/dev-container/shadcn/Tabs.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Tabs as ShadcnTabs,
  TabsList as ShadcnTabsList,
  TabsTrigger as ShadcnTabsTrigger,
  TabsContent as ShadcnTabsContent,
} from '../../../components/ui/tabs';

// Tabs root component (FC type)
type ShadcnTabsProps = React.ComponentProps<typeof ShadcnTabs>;
type DevTabsProps = ShadcnTabsProps & DevProps & { children?: React.ReactNode };

export const Tabs = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevTabsProps) => {
  const componentId = devId || `tabs-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Tabs',
        description: devDescription || 'Tabs root component',
        filePath: 'src/lib/dev-container/shadcn/Tabs.tsx',
        category: 'navigation',
        semanticTags: ['tabs', 'navigation', 'content', 'ui'],
      }}
    >
      <ShadcnTabs {...props}>
        {children}
      </ShadcnTabs>
    </Container>
  );
};

Tabs.displayName = 'DevTabs';

// TabsList component
type ShadcnTabsListProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsList>;
type DevTabsListProps = ShadcnTabsListProps & DevProps & { children?: React.ReactNode };

export const TabsList = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsList>,
  DevTabsListProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `tabs-list-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TabsList',
          description: devDescription || 'Container for tab triggers',
          filePath: 'src/lib/dev-container/shadcn/Tabs.tsx',
          category: 'navigation',
          semanticTags: ['tabs', 'list', 'container', 'ui'],
        }}
      >
        <ShadcnTabsList ref={ref} {...props}>
          {children}
        </ShadcnTabsList>
      </Container>
    );
  }

  return (
    <ShadcnTabsList ref={ref} {...props}>
      {children}
    </ShadcnTabsList>
  );
});

TabsList.displayName = 'DevTabsList';

// TabsTrigger component
type ShadcnTabsTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsTrigger>;
type DevTabsTriggerProps = ShadcnTabsTriggerProps & DevProps & { children?: React.ReactNode };

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsTrigger>,
  DevTabsTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `tabs-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TabsTrigger',
          description: devDescription || 'Button that activates a tab',
          filePath: 'src/lib/dev-container/shadcn/Tabs.tsx',
          category: 'navigation',
          semanticTags: ['tabs', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnTabsTrigger ref={ref} {...props}>
          {children}
        </ShadcnTabsTrigger>
      </Container>
    );
  }

  return (
    <ShadcnTabsTrigger ref={ref} {...props}>
      {children}
    </ShadcnTabsTrigger>
  );
});

TabsTrigger.displayName = 'DevTabsTrigger';

// TabsContent component
type ShadcnTabsContentProps = React.ComponentPropsWithoutRef<typeof ShadcnTabsContent>;
type DevTabsContentProps = ShadcnTabsContentProps & DevProps & { children?: React.ReactNode };

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof ShadcnTabsContent>,
  DevTabsContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `tabs-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TabsContent',
          description: devDescription || 'Content area for a tab',
          filePath: 'src/lib/dev-container/shadcn/Tabs.tsx',
          category: 'navigation',
          semanticTags: ['tabs', 'content', 'panel', 'ui'],
        }}
      >
        <ShadcnTabsContent ref={ref} {...props}>
          {children}
        </ShadcnTabsContent>
      </Container>
    );
  }

  return (
    <ShadcnTabsContent ref={ref} {...props}>
      {children}
    </ShadcnTabsContent>
  );
});

TabsContent.displayName = 'DevTabsContent';