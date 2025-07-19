// src/lib/dev-container/shadcn/ScrollArea.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  ScrollArea as ShadcnScrollArea,
  ScrollBar as ShadcnScrollBar,
} from '../../../components/ui/scroll-area';

// ScrollArea component
type ShadcnScrollAreaProps = React.ComponentPropsWithoutRef<typeof ShadcnScrollArea>;
type DevScrollAreaProps = ShadcnScrollAreaProps & DevProps & { children?: React.ReactNode };

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollArea>,
  DevScrollAreaProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `scroll-area-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ScrollArea',
        description: devDescription || 'Custom scrollable area with styled scrollbars',
        filePath: 'src/lib/dev-container/shadcn/ScrollArea.tsx',
        category: 'layout',
        semanticTags: ['scroll', 'area', 'scrollbar', 'container', 'ui'],
      }}
    >
      <ShadcnScrollArea ref={ref} {...props}>
        {children}
      </ShadcnScrollArea>
    </Container>
  );
});

ScrollArea.displayName = 'DevScrollArea';

// ScrollBar component
type ShadcnScrollBarProps = React.ComponentPropsWithoutRef<typeof ShadcnScrollBar>;
type DevScrollBarProps = ShadcnScrollBarProps & DevProps;

export const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollBar>,
  DevScrollBarProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `scroll-bar-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ScrollBar',
          description: devDescription || 'Custom styled scrollbar',
          filePath: 'src/lib/dev-container/shadcn/ScrollArea.tsx',
          category: 'layout',
          semanticTags: ['scroll', 'bar', 'scrollbar', 'ui'],
        }}
      >
        <ShadcnScrollBar ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnScrollBar ref={ref} {...props} />;
});

ScrollBar.displayName = 'DevScrollBar';

