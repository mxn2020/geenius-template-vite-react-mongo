// src/lib/dev-container/shadcn/Separator.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Separator as ShadcnSeparator } from '../../../components/ui/separator';

// Separator component
type ShadcnSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnSeparator>;
type DevSeparatorProps = ShadcnSeparatorProps & DevProps;

export const Separator = React.forwardRef<
  React.ElementRef<typeof ShadcnSeparator>,
  DevSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Separator',
          description: devDescription || 'Visual separator line',
          filePath: 'src/lib/dev-container/shadcn/Separator.tsx',
          category: 'layout',
          semanticTags: ['separator', 'divider', 'line', 'ui'],
        }}
      >
        <ShadcnSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnSeparator ref={ref} {...props} />;
});

Separator.displayName = 'DevSeparator';