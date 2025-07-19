// src/lib/dev-container/geenius/Nav.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevNavProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Nav = React.forwardRef<HTMLElement, DevNavProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `nav-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Nav',
            description: devDescription || 'A navigation element',
            filePath: 'src/lib/dev-container/geenius/Nav.tsx',
            category: 'layout',
            semanticTags: ['nav', 'navigation', 'menu', 'layout', 'semantic'],
          }}
        >
          <nav ref={ref} {...props}>
            {children}
          </nav>
        </Container>
      );
    }

    return (
      <nav ref={ref} {...props}>
        {children}
      </nav>
    );
  }
);

Nav.displayName = 'DevNav';

export { type DevNavProps };