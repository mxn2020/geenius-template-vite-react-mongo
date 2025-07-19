// src/lib/dev-container/shadcn/Popover.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Popover as ShadcnPopover,
  PopoverTrigger as ShadcnPopoverTrigger,
  PopoverContent as ShadcnPopoverContent,
  PopoverAnchor as ShadcnPopoverAnchor,
} from '../../../components/ui/popover';

// Popover root component (FC type)
type ShadcnPopoverProps = React.ComponentProps<typeof ShadcnPopover>;
type DevPopoverProps = ShadcnPopoverProps & DevProps & { children?: React.ReactNode };

export const Popover = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevPopoverProps) => {
  const componentId = devId || `popover-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `popover-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnPopoverTrigger ref={ref} {...props}>
      {children}
    </ShadcnPopoverTrigger>
  );
});

PopoverTrigger.displayName = 'DevPopoverTrigger';

// PopoverContent component
type ShadcnPopoverContentProps = React.ComponentPropsWithoutRef<typeof ShadcnPopoverContent>;
type DevPopoverContentProps = ShadcnPopoverContentProps & DevProps & { children?: React.ReactNode };

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof ShadcnPopoverContent>,
  DevPopoverContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `popover-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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

