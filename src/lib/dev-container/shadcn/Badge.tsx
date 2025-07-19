// src/lib/dev-container/shadcn/Badge.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';
import { Badge as ShadcnBadge } from '../../../components/ui/badge';

type ShadcnBadgeProps = React.ComponentPropsWithoutRef<typeof ShadcnBadge>;
type DevBadgeProps = ShadcnBadgeProps & DevProps & { children?: React.ReactNode };

export const Badge = React.forwardRef<
  HTMLDivElement,
  DevBadgeProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnBadge {...props}>
        {children}
      </ShadcnBadge>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Badge',
        description: devDescription || 'Small status indicator or label',
        filePath: 'src/lib/dev-container/shadcn/Badge.tsx',
        category: 'ui',
        semanticTags: ['badge', 'label', 'status', 'indicator', 'ui'],
      }}
    >
      <ShadcnBadge {...props}>
        {children}
      </ShadcnBadge>
    </Container>
  );
});

Badge.displayName = 'DevBadge';

