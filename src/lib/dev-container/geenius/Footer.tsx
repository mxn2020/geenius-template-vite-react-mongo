// src/lib/dev-container/geenius/Footer.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevFooterProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLElement, DevFooterProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `footer-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Footer',
            description: devDescription || 'A footer element',
            filePath: 'src/lib/dev-container/geenius/Footer.tsx',
            category: 'layout',
            semanticTags: ['footer', 'navigation', 'layout', 'semantic'],
          }}
        >
          <footer ref={ref} {...props}>
            {children}
          </footer>
        </Container>
      );
    }

    return (
      <footer ref={ref} {...props}>
        {children}
      </footer>
    );
  }
);

Footer.displayName = 'DevFooter';