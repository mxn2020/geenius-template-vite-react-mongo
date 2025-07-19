// src/lib/dev-container/shadcn/Collapsible.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `collapsible-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `collapsible-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnCollapsibleTrigger ref={ref} {...props}>
      {children}
    </ShadcnCollapsibleTrigger>
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
  const componentId = devId || `collapsible-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnCollapsibleContent ref={ref} {...props}>
      {children}
    </ShadcnCollapsibleContent>
  );
});

CollapsibleContent.displayName = 'DevCollapsibleContent';