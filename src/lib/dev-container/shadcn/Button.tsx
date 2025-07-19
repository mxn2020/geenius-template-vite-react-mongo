// src/lib/dev-container/shadcn/Button.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';
import { Button as ShadcnButton, buttonVariants } from '../../../components/ui/button';

type ShadcnButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnButton>;
type DevButtonProps = ShadcnButtonProps & DevProps & { children?: React.ReactNode };

export const Button = React.forwardRef<
  React.ElementRef<typeof ShadcnButton>,
  DevButtonProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnButton ref={ref} {...props}>
        {children}
      </ShadcnButton>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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

