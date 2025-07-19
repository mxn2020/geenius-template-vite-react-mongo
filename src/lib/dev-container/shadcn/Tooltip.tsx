// src/lib/dev-container/shadcn/Tooltip.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  TooltipProvider as ShadcnTooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipTrigger as ShadcnTooltipTrigger,
  TooltipContent as ShadcnTooltipContent,
} from '../../../components/ui/tooltip';

// TooltipProvider component (FC type)
type ShadcnTooltipProviderProps = React.ComponentProps<typeof ShadcnTooltipProvider>;
type DevTooltipProviderProps = ShadcnTooltipProviderProps & DevProps & { children?: React.ReactNode };

export const TooltipProvider = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevTooltipProviderProps) => {
  const componentId = devId || `tooltip-provider-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TooltipProvider',
          description: devDescription || 'Provider for tooltip context',
          filePath: 'src/lib/dev-container/shadcn/Tooltip.tsx',
          category: 'overlay',
          semanticTags: ['tooltip', 'provider', 'context', 'ui'],
        }}
      >
        <ShadcnTooltipProvider {...props}>
          {children}
        </ShadcnTooltipProvider>
      </Container>
    );
  }

  return (
    <ShadcnTooltipProvider {...props}>
      {children}
    </ShadcnTooltipProvider>
  );
};

TooltipProvider.displayName = 'DevTooltipProvider';

// Tooltip root component (FC type)
type ShadcnTooltipProps = React.ComponentProps<typeof ShadcnTooltip>;
type DevTooltipProps = ShadcnTooltipProps & DevProps & { children?: React.ReactNode };

export const Tooltip = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevTooltipProps) => {
  const componentId = devId || `tooltip-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Tooltip',
          description: devDescription || 'Tooltip root component',
          filePath: 'src/lib/dev-container/shadcn/Tooltip.tsx',
          category: 'overlay',
          semanticTags: ['tooltip', 'overlay', 'popup', 'ui'],
        }}
      >
        <ShadcnTooltip {...props}>
          {children}
        </ShadcnTooltip>
      </Container>
    );
  }

  return (
    <ShadcnTooltip {...props}>
      {children}
    </ShadcnTooltip>
  );
};

Tooltip.displayName = 'DevTooltip';

// TooltipTrigger component
type ShadcnTooltipTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnTooltipTrigger>;
type DevTooltipTriggerProps = ShadcnTooltipTriggerProps & DevProps & { children?: React.ReactNode };

export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnTooltipTrigger>,
  DevTooltipTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `tooltip-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TooltipTrigger',
          description: devDescription || 'Element that triggers the tooltip on hover',
          filePath: 'src/lib/dev-container/shadcn/Tooltip.tsx',
          category: 'overlay',
          semanticTags: ['tooltip', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnTooltipTrigger ref={ref} {...props}>
          {children}
        </ShadcnTooltipTrigger>
      </Container>
    );
  }

  return (
    <ShadcnTooltipTrigger ref={ref} {...props}>
      {children}
    </ShadcnTooltipTrigger>
  );
});

TooltipTrigger.displayName = 'DevTooltipTrigger';

// TooltipContent component
type ShadcnTooltipContentProps = React.ComponentPropsWithoutRef<typeof ShadcnTooltipContent>;
type DevTooltipContentProps = ShadcnTooltipContentProps & DevProps & { children?: React.ReactNode };

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof ShadcnTooltipContent>,
  DevTooltipContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `tooltip-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TooltipContent',
          description: devDescription || 'Content area of the tooltip',
          filePath: 'src/lib/dev-container/shadcn/Tooltip.tsx',
          category: 'overlay',
          semanticTags: ['tooltip', 'content', 'popup', 'ui'],
        }}
      >
        <ShadcnTooltipContent ref={ref} {...props}>
          {children}
        </ShadcnTooltipContent>
      </Container>
    );
  }

  return (
    <ShadcnTooltipContent ref={ref} {...props}>
      {children}
    </ShadcnTooltipContent>
  );
});

TooltipContent.displayName = 'DevTooltipContent';

