// src/lib/dev-container/shadcn/Toaster.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Toaster as ShadcnToaster } from '../../../components/ui/sonner';

// Toaster component
type ShadcnToasterProps = React.ComponentPropsWithoutRef<typeof ShadcnToaster>;
type DevToasterProps = ShadcnToasterProps & DevProps;

export const Toaster = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }: DevToasterProps) => {
  const componentId = devId || `toaster-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Toaster',
          description: devDescription || 'Toast notification container',
          filePath: 'src/lib/dev-container/shadcn/Toaster.tsx',
          category: 'feedback',
          semanticTags: ['toaster', 'toast', 'notification', 'feedback', 'ui'],
        }}
      >
        <ShadcnToaster {...props} />
      </Container>
    );
  }

  return <ShadcnToaster {...props} />;
};

Toaster.displayName = 'DevToaster';