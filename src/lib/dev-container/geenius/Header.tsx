// src/lib/dev-container/geenius/Header.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevHeaderProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLElement, DevHeaderProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    // If no devId provided or explicitly set to "noID", don't containerize
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <header ref={ref} {...props}>
          {children}
        </header>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
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
);

Header.displayName = 'DevHeader';

export { type DevHeaderProps };