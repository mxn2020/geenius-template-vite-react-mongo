// src/lib/dev-container/shadcn/Collapsible.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Collapsible as ShadcnCollapsible,
  CollapsibleTrigger as ShadcnCollapsibleTrigger,
  CollapsibleContent as ShadcnCollapsibleContent
} from '../../../components/ui/collapsible';

// Based on type definitions: Collapsible, CollapsibleTrigger, CollapsibleContent all use forwardRef
type ShadcnCollapsibleProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsible>;
type ShadcnCollapsibleTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsibleTrigger>;
type ShadcnCollapsibleContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCollapsibleContent>;

type DevCollapsibleProps = ShadcnCollapsibleProps & DevProps & { children?: React.ReactNode };
type DevCollapsibleTriggerProps = ShadcnCollapsibleTriggerProps & DevProps & { children?: React.ReactNode };
type DevCollapsibleContentProps = ShadcnCollapsibleContentProps & DevProps & { children?: React.ReactNode };

export const Collapsible = React.forwardRef<
  React.ElementRef<typeof ShadcnCollapsible>,
  DevCollapsibleProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `collapsible-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Collapsible',
        description: devDescription || 'Collapsible content container',
        filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
        category: 'layout',
        semanticTags: ['collapsible', 'toggle', 'accordion', 'layout', 'ui'],
      }}
    >
      <ShadcnCollapsible ref={ref} {...props}>
        {children}
      </ShadcnCollapsible>
    </Container>
  );
});

Collapsible.displayName = 'DevCollapsible';

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
          description: devDescription || 'Button to toggle collapsible content',
          filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
          category: 'interactive',
          semanticTags: ['collapsible', 'trigger', 'button', 'toggle', 'ui'],
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
          description: devDescription || 'Collapsible content area',
          filePath: 'src/lib/dev-container/shadcn/Collapsible.tsx',
          category: 'layout',
          semanticTags: ['collapsible', 'content', 'layout', 'ui'],
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

