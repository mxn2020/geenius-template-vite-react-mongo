import React from 'react';
import { Separator as ShadcnSeparator } from '../../../components/ui/separator';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSeparatorProps extends React.ComponentPropsWithoutRef<typeof ShadcnSeparator> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Separator = React.forwardRef<
  React.ElementRef<typeof ShadcnSeparator>,
  DevSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `separator-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Separator',
        description: devDescription || 'A separator divider component',
        filePath: 'src/lib/dev-container/shadcn/Separator.tsx',
        category: 'ui',
        semanticTags: ['separator', 'divider', 'line', 'ui'],
      }}
    >
      <ShadcnSeparator ref={ref} {...props} />
    </Container>
  );
});

Separator.displayName = 'DevSeparator';

export { type DevSeparatorProps };