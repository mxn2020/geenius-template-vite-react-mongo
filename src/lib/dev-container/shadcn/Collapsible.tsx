// src/lib/dev-container/shadcn/Collapsible.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Collapsible as ShadcnCollapsible,
  CollapsibleTrigger as ShadcnCollapsibleTrigger,
  CollapsibleContent as ShadcnCollapsibleContent,
} from '../../../components/ui/collapsible';

// Collapsible root component
type ShadcnCollapsibleProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsible>;
type DevCollapsibleProps = ShadcnCollapsibleProps & DevProps & { children?: React.ReactNode };

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsible>,
  DevCollapsibleProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);

  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }

  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnCollapsible ref={ref} {...props}>
        {children}
      </ShadcnCollapsible>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Collapsible',
        description: devDescription || 'Collapsible root component',
        filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
        category: 'layout',
        semanticTags: ['collapsible', 'accordion', 'toggle', 'ui'],
      }}
    >
      <ShadcnCollapsible ref={ref} {...props}>
        {children}
      </ShadcnCollapsible>
    </Container>
  );
});

Collapsible.displayName = 'DevCollapsible';

// CollapsibleTrigger component
type ShadcnCollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsibleTrigger>;
type DevCollapsibleTriggerProps = ShadcnCollapsibleTriggerProps & DevProps & { children?: React.ReactNode };

export const CollapsibleTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsibleTrigger>,
  DevCollapsibleTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);

  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }

  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnCollapsibleTrigger ref={ref} {...props}>
        {children}
      </ShadcnCollapsibleTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'CollapsibleTrigger',
        description: devDescription || 'Button that toggles the collapsible content',
        filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
        category: 'layout',
        semanticTags: ['collapsible', 'trigger', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnCollapsibleTrigger ref={ref} {...props}>
        {children}
      </ShadcnCollapsibleTrigger>
    </Container>
  );
});

CollapsibleTrigger.displayName = 'DevCollapsibleTrigger';

// CollapsibleContent component
type ShadcnCollapsibleContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsibleContent>;
type DevCollapsibleContentProps = ShadcnCollapsibleContentProps & DevProps & { children?: React.ReactNode };

export const CollapsibleContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsibleContent>,
  DevCollapsibleContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);

  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }

  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnCollapsibleContent ref={ref} {...props}>
        {children}
      </ShadcnCollapsibleContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'CollapsibleContent',
        description: devDescription || 'Content that can be collapsed or expanded',
        filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
        category: 'layout',
        semanticTags: ['collapsible', 'content', 'expandable', 'ui'],
      }}
    >
      <ShadcnCollapsibleContent ref={ref} {...props}>
        {children}
      </ShadcnCollapsibleContent>
    </Container>
  );
});

CollapsibleContent.displayName = 'DevCollapsibleContent';