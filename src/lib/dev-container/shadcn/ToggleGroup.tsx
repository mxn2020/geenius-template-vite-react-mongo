// src/lib/dev-container/shadcn/ToggleGroup.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  ToggleGroup as ShadcnToggleGroup,
  ToggleGroupItem as ShadcnToggleGroupItem,
} from '../../../components/ui/toggle-group';

// ToggleGroup component
type ShadcnToggleGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnToggleGroup>;
type DevToggleGroupProps = ShadcnToggleGroupProps & DevProps & { children?: React.ReactNode };

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroup>,
  DevToggleGroupProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `toggle-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ToggleGroup',
        description: devDescription || 'Group of toggle buttons',
        filePath: 'src/lib/dev-container/shadcn/ToggleGroup.tsx',
        category: 'form',
        semanticTags: ['toggle', 'group', 'buttons', 'selection', 'ui'],
      }}
    >
      <ShadcnToggleGroup ref={ref} {...props}>
        {children}
      </ShadcnToggleGroup>
    </Container>
  );
});

ToggleGroup.displayName = 'DevToggleGroup';

// ToggleGroupItem component
type ShadcnToggleGroupItemProps = React.ComponentPropsWithoutRef<typeof ShadcnToggleGroupItem>;
type DevToggleGroupItemProps = ShadcnToggleGroupItemProps & DevProps & { children?: React.ReactNode };

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroupItem>,
  DevToggleGroupItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `toggle-group-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ToggleGroupItem',
          description: devDescription || 'Individual toggle within a group',
          filePath: 'src/lib/dev-container/shadcn/ToggleGroup.tsx',
          category: 'form',
          semanticTags: ['toggle', 'item', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnToggleGroupItem ref={ref} {...props}>
          {children}
        </ShadcnToggleGroupItem>
      </Container>
    );
  }

  return (
    <ShadcnToggleGroupItem ref={ref} {...props}>
      {children}
    </ShadcnToggleGroupItem>
  );
});

ToggleGroupItem.displayName = 'DevToggleGroupItem';

