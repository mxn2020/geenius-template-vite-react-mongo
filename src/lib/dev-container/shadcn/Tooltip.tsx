// src/lib/dev-container/shadcn/Tooltip.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

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
      <ShadcnTooltipProvider {...props}>
        {children}
      </ShadcnTooltipProvider>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

TooltipProvider.displayName = 'DevTooltipProvider';

// Tooltip root component (FC type)
type ShadcnTooltipProps = React.ComponentProps<typeof ShadcnTooltip>;
type DevTooltipProps = ShadcnTooltipProps & DevProps & { children?: React.ReactNode };

export const Tooltip = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevTooltipProps) => {
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
      <ShadcnTooltip {...props}>
        {children}
      </ShadcnTooltip>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

Tooltip.displayName = 'DevTooltip';

// TooltipTrigger component
type ShadcnTooltipTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnTooltipTrigger>;
type DevTooltipTriggerProps = ShadcnTooltipTriggerProps & DevProps & { children?: React.ReactNode };

export const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnTooltipTrigger>,
  DevTooltipTriggerProps
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
      <ShadcnTooltipTrigger ref={ref} {...props}>
        {children}
      </ShadcnTooltipTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TooltipTrigger.displayName = 'DevTooltipTrigger';

// TooltipContent component
type ShadcnTooltipContentProps = React.ComponentPropsWithoutRef<typeof ShadcnTooltipContent>;
type DevTooltipContentProps = ShadcnTooltipContentProps & DevProps & { children?: React.ReactNode };

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof ShadcnTooltipContent>,
  DevTooltipContentProps
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
      <ShadcnTooltipContent ref={ref} {...props}>
        {children}
      </ShadcnTooltipContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TooltipContent.displayName = 'DevTooltipContent';