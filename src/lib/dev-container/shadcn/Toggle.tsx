// src/lib/dev-container/shadcn/Toggle.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Toggle as ShadcnToggle, toggleVariants } from '../../../components/ui/toggle';

// Toggle component
type ShadcnToggleProps = React.ComponentPropsWithoutRef<typeof ShadcnToggle>;
type DevToggleProps = ShadcnToggleProps & DevProps & { children?: React.ReactNode };

export const Toggle = React.forwardRef<
  React.ElementRef<typeof ShadcnToggle>,
  DevToggleProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `toggle-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Toggle',
          description: devDescription || 'Toggle button component',
          filePath: 'src/lib/dev-container/shadcn/Toggle.tsx',
          category: 'form',
          semanticTags: ['toggle', 'button', 'switch', 'interactive', 'ui'],
        }}
      >
        <ShadcnToggle ref={ref} {...props}>
          {children}
        </ShadcnToggle>
      </Container>
    );
  }

  return (
    <ShadcnToggle ref={ref} {...props}>
      {children}
    </ShadcnToggle>
  );
});

Toggle.displayName = 'DevToggle';

// Export the toggle variants utility
export { toggleVariants };

