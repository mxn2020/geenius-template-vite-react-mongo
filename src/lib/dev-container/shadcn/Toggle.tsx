import React from 'react';
import { 
  Toggle as ShadcnToggle,
  toggleVariants
} from '../../../components/ui/toggle';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevToggleProps extends React.ComponentPropsWithoutRef<typeof ShadcnToggle> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Toggle = React.forwardRef<
  React.ElementRef<typeof ShadcnToggle>,
  DevToggleProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `toggle-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Toggle',
        description: devDescription || 'A toggle button component',
        filePath: 'src/lib/dev-container/shadcn/Toggle.tsx',
        category: 'ui',
        semanticTags: ['toggle', 'button', 'pressed', 'ui'],
      }}
    >
      <ShadcnToggle ref={ref} {...props} />
    </Container>
  );
});

Toggle.displayName = 'DevToggle';

// Export utility functions without dev wrapping
export { toggleVariants };

export { type DevToggleProps };
