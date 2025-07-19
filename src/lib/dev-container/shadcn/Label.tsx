
// src/lib/dev-container/shadcn/Label.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Label as ShadcnLabel } from '../../../components/ui/label';

// Label component
type ShadcnLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnLabel>;
type DevLabelProps = ShadcnLabelProps & DevProps & { children?: React.ReactNode };

export const Label = React.forwardRef<
  React.ElementRef<typeof ShadcnLabel>,
  DevLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Label',
          description: devDescription || 'Form label with accessibility support',
          filePath: 'src/lib/dev-container/shadcn/Label.tsx',
          category: 'form',
          semanticTags: ['label', 'form', 'accessibility', 'text', 'ui'],
        }}
      >
        <ShadcnLabel ref={ref} {...props}>
          {children}
        </ShadcnLabel>
      </Container>
    );
  }

  return (
    <ShadcnLabel ref={ref} {...props}>
      {children}
    </ShadcnLabel>
  );
});

Label.displayName = 'DevLabel';