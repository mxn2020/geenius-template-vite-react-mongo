// src/lib/dev-container/shadcn/Progress.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Progress as ShadcnProgress } from '../../../components/ui/progress';

// Progress component
type ShadcnProgressProps = React.ComponentPropsWithoutRef<typeof ShadcnProgress>;
type DevProgressProps = ShadcnProgressProps & DevProps;

export const Progress = React.forwardRef<
  React.ElementRef<typeof ShadcnProgress>,
  DevProgressProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `progress-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Progress',
          description: devDescription || 'Progress bar component',
          filePath: 'src/lib/dev-container/shadcn/Progress.tsx',
          category: 'feedback',
          semanticTags: ['progress', 'loading', 'indicator', 'ui'],
        }}
      >
        <ShadcnProgress ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnProgress ref={ref} {...props} />;
});

Progress.displayName = 'DevProgress';

