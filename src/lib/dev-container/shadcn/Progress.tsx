import React from 'react';
import { Progress as ShadcnProgress } from '../../../components/ui/progress';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevProgressProps extends React.ComponentPropsWithoutRef<typeof ShadcnProgress> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Progress = React.forwardRef<
  React.ElementRef<typeof ShadcnProgress>,
  DevProgressProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `progress-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Progress',
        description: devDescription || 'A progress indicator component',
        filePath: 'src/lib/dev-container/shadcn/Progress.tsx',
        category: 'ui',
        semanticTags: ['progress', 'indicator', 'loading', 'ui'],
      }}
    >
      <ShadcnProgress ref={ref} {...props} />
    </Container>
  );
});

Progress.displayName = 'DevProgress';

export { type DevProgressProps }; 
