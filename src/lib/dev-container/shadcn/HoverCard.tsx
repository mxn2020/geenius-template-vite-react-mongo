// src/lib/dev-container/shadcn/HoverCard.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  HoverCard as ShadcnHoverCard,
  HoverCardTrigger as ShadcnHoverCardTrigger,
  HoverCardContent as ShadcnHoverCardContent,
} from '../../../components/ui/hover-card';

// HoverCard root component
type ShadcnHoverCardProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCard>;
type DevHoverCardProps = ShadcnHoverCardProps & DevProps & { children?: React.ReactNode };

export const HoverCard = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevHoverCardProps) => {
  const componentId = devId || `hover-card-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'HoverCard',
        description: devDescription || 'Hover card root component',
        filePath: 'src/lib/dev-container/shadcn/HoverCard.tsx',
        category: 'overlay',
        semanticTags: ['hover-card', 'popover', 'tooltip', 'ui'],
      }}
    >
      <ShadcnHoverCard {...props}>
        {children}
      </ShadcnHoverCard>
    </Container>
  );
};

HoverCard.displayName = 'DevHoverCard';

// HoverCardTrigger component
type ShadcnHoverCardTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCardTrigger>;
type DevHoverCardTriggerProps = ShadcnHoverCardTriggerProps & DevProps & { children?: React.ReactNode };

export const HoverCardTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardTrigger>,
  DevHoverCardTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `hover-card-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'HoverCardTrigger',
          description: devDescription || 'Element that triggers the hover card on hover',
          filePath: 'src/lib/dev-container/shadcn/HoverCard.tsx',
          category: 'overlay',
          semanticTags: ['hover-card', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnHoverCardTrigger ref={ref} {...props}>
          {children}
        </ShadcnHoverCardTrigger>
      </Container>
    );
  }

  return (
    <ShadcnHoverCardTrigger ref={ref} {...props}>
      {children}
    </ShadcnHoverCardTrigger>
  );
});

HoverCardTrigger.displayName = 'DevHoverCardTrigger';

// HoverCardContent component
type ShadcnHoverCardContentProps = React.ComponentPropsWithoutRef<typeof ShadcnHoverCardContent>;
type DevHoverCardContentProps = ShadcnHoverCardContentProps & DevProps & { children?: React.ReactNode };

export const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof ShadcnHoverCardContent>,
  DevHoverCardContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `hover-card-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'HoverCardContent',
        description: devDescription || 'Content area of the hover card',
        filePath: 'src/lib/dev-container/shadcn/HoverCard.tsx',
        category: 'overlay',
        semanticTags: ['hover-card', 'content', 'popover', 'ui'],
      }}
    >
      <ShadcnHoverCardContent ref={ref} {...props}>
        {children}
      </ShadcnHoverCardContent>
    </Container>
  );
});

HoverCardContent.displayName = 'DevHoverCardContent';