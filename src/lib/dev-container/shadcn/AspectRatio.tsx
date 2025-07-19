// src/lib/dev-container/shadcn/AspectRatio.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { AspectRatio as ShadcnAspectRatio } from '../../../components/ui/aspect-ratio';

type ShadcnAspectRatioProps = React.ComponentPropsWithoutRef<typeof ShadcnAspectRatio>;
type DevAspectRatioProps = ShadcnAspectRatioProps & DevProps & { children?: React.ReactNode };

export const AspectRatio = React.forwardRef<
  React.ElementRef<typeof ShadcnAspectRatio>,
  DevAspectRatioProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `aspect-ratio-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'AspectRatio',
        description: devDescription || 'Container that maintains a specific aspect ratio',
        filePath: 'src/lib/dev-container/shadcn/AspectRatio.tsx',
        category: 'layout',
        semanticTags: ['aspect-ratio', 'layout', 'container', 'ui'],
      }}
    >
      <ShadcnAspectRatio ref={ref} {...props}>
        {children}
      </ShadcnAspectRatio>
    </Container>
  );
});

AspectRatio.displayName = 'DevAspectRatio';

