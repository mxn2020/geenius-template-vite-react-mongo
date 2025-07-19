// src/lib/dev-container/shadcn/Popover.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Popover as ShadcnPopover,
  PopoverTrigger as ShadcnPopoverTrigger,
  PopoverContent as ShadcnPopoverContent,
  PopoverAnchor as ShadcnPopoverAnchor,
} from '../../../components/ui/popover';

// Popover root component (FC type)
type ShadcnPopoverProps = React.ComponentProps<typeof ShadcnPopover>;
type DevPopoverProps = ShadcnPopoverProps & DevProps & { children?: React.ReactNode };

export const Popover = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevPopoverProps) => {
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
      <ShadcnPopover {...props}>
        {children}
      </ShadcnPopover>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Popover',
        description: devDescription || 'Popover root component',
        filePath: 'src/lib/dev-container/shadcn/Popover.tsx',
        category: 'overlay',
        semanticTags: ['popover', 'overlay', 'tooltip', 'ui'],
      }}
    >
      <ShadcnPopover {...props}>
        {children}
      </ShadcnPopover>
    </Container>
  );
};

Popover.displayName = 'DevPopover';

// PopoverTrigger component
type ShadcnPopoverTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnPopoverTrigger>;
type DevPopoverTriggerProps = ShadcnPopoverTriggerProps & DevProps & { children?: React.ReactNode };

export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnPopoverTrigger>,
  DevPopoverTriggerProps
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
      <ShadcnPopoverTrigger ref={ref} {...props}>
        {children}
      </ShadcnPopoverTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'PopoverTrigger',
        description: devDescription || 'Button that opens the popover',
        filePath: 'src/lib/dev-container/shadcn/Popover.tsx',
        category: 'overlay',
        semanticTags: ['popover', 'trigger', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnPopoverTrigger ref={ref} {...props}>
        {children}
      </ShadcnPopoverTrigger>
    </Container>
  );
});

PopoverTrigger.displayName = 'DevPopoverTrigger';

// PopoverContent component
type ShadcnPopoverContentProps = React.ComponentPropsWithoutRef<typeof ShadcnPopoverContent>;
type DevPopoverContentProps = ShadcnPopoverContentProps & DevProps & { children?: React.ReactNode };

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof ShadcnPopoverContent>,
  DevPopoverContentProps
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
      <ShadcnPopoverContent ref={ref} {...props}>
        {children}
      </ShadcnPopoverContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'PopoverContent',
        description: devDescription || 'Popover content area',
        filePath: 'src/lib/dev-container/shadcn/Popover.tsx',
        category: 'overlay',
        semanticTags: ['popover', 'content', 'overlay', 'ui'],
      }}
    >
      <ShadcnPopoverContent ref={ref} {...props}>
        {children}
      </ShadcnPopoverContent>
    </Container>
  );
});

PopoverContent.displayName = 'DevPopoverContent';

// PopoverAnchor component
export const PopoverAnchor = ShadcnPopoverAnchor;

