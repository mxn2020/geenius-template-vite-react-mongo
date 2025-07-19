// src/lib/dev-container/shadcn/Badge.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Badge as ShadcnBadge } from '../../../components/ui/badge';

type ShadcnBadgeProps = React.ComponentPropsWithoutRef<typeof ShadcnBadge>;
type DevBadgeProps = ShadcnBadgeProps & DevProps & { children?: React.ReactNode };

export const Badge = React.forwardRef<
  HTMLDivElement,
  DevBadgeProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `badge-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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

