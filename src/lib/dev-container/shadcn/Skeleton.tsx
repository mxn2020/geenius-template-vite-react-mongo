import React from 'react';
import { Skeleton as ShadcnSkeleton } from '../../../components/ui/skeleton';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Skeleton = React.forwardRef<HTMLDivElement, DevSkeletonProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `skeleton-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Skeleton',
          description: devDescription || 'A skeleton loading placeholder component',
          filePath: 'src/lib/dev-container/shadcn/Skeleton.tsx',
          category: 'ui',
          semanticTags: ['skeleton', 'loading', 'placeholder', 'ui'],
        }}
      >
        <ShadcnSkeleton ref={ref} {...props} />
      </Container>
    );
  }
);

Skeleton.displayName = 'DevSkeleton';

export { type DevSkeletonProps };
