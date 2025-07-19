// src/lib/dev-container/shadcn/Skeleton.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Skeleton as ShadcnSkeleton } from '../../../components/ui/skeleton';

// Skeleton component
type ShadcnSkeletonProps = React.ComponentPropsWithoutRef<typeof ShadcnSkeleton>;
type DevSkeletonProps = ShadcnSkeletonProps & DevProps;

export const Skeleton = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }: DevSkeletonProps) => {
  const componentId = devId || `skeleton-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Skeleton',
          description: devDescription || 'Loading skeleton placeholder',
          filePath: 'src/lib/dev-container/shadcn/Skeleton.tsx',
          category: 'feedback',
          semanticTags: ['skeleton', 'loading', 'placeholder', 'ui'],
        }}
      >
        <ShadcnSkeleton {...props} />
      </Container>
    );
  }

  return <ShadcnSkeleton {...props} />;
};

Skeleton.displayName = 'DevSkeleton';