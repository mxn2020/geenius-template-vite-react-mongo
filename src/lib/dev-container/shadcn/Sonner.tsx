import React from 'react';
import { Toaster as ShadcnToaster } from '../../../components/ui/sonner';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevToasterProps extends React.ComponentProps<typeof ShadcnToaster> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Toaster = React.forwardRef<
  HTMLDivElement,
  DevToasterProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `toaster-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Toaster',
        description: devDescription || 'A toast notification component',
        filePath: 'src/lib/dev-container/shadcn/Sonner.tsx',
        category: 'ui',
        semanticTags: ['toast', 'notification', 'message', 'ui'],
      }}
    >
      <ShadcnToaster {...props} />
    </Container>
  );
});

Toaster.displayName = 'DevToaster';

export { type DevToasterProps };
