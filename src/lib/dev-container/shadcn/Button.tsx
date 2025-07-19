// src/lib/dev-container/shadcn/Button.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Button as ShadcnButton, buttonVariants } from '../../../components/ui/button';

type ShadcnButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;
type DevButtonProps = ShadcnButtonProps & DevProps & { children?: React.ReactNode };

export const Button = React.forwardRef<
  React.ElementRef<typeof ShadcnButton>,
  DevButtonProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `button-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Button',
        description: devDescription || 'Interactive button component',
        filePath: 'src/lib/dev-container/shadcn/Button.tsx',
        category: 'ui',
        semanticTags: ['button', 'interactive', 'action', 'ui'],
      }}
    >
      <ShadcnButton ref={ref} {...props}>
        {children}
      </ShadcnButton>
    </Container>
  );
});

Button.displayName = 'DevButton';

// Export buttonVariants for convenience
export { buttonVariants };

