import React from 'react';
import { Badge as ShadcnBadge } from '../../../components/ui/badge';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, DevBadgeProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, _ref) => {
    const componentId = devId || `badge-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Badge',
          description: devDescription || 'A badge component for labels and status',
          filePath: 'src/lib/dev-container/shadcn/Badge.tsx',
          category: 'ui',
          semanticTags: ['badge', 'label', 'status', 'ui'],
        }}
      >
        <ShadcnBadge {...props}>
          {children}
        </ShadcnBadge>
      </Container>
    );
  }
);

Badge.displayName = 'DevBadge';

export { type DevBadgeProps };