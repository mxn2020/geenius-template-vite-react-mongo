// src/lib/dev-container/geenius/Header.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevHeaderProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLElement, DevHeaderProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `header-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Header',
            description: devDescription || 'A header element',
            filePath: 'src/lib/dev-container/geenius/Header.tsx',
            category: 'layout',
            semanticTags: ['header', 'navigation', 'layout', 'semantic'],
          }}
        >
          <header ref={ref} {...props}>
            {children}
          </header>
        </Container>
      );
    }

    return (
      <header ref={ref} {...props}>
        {children}
      </header>
    );
  }
);

Header.displayName = 'DevHeader';

export { type DevHeaderProps };