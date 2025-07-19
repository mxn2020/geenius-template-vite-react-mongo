// src/lib/dev-container/geenius/Anchor.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

interface DevAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, DevProps {
  children?: React.ReactNode;
}

export const A = React.forwardRef<HTMLAnchorElement, DevAnchorProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
        <a ref={ref} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Anchor',
          description: devDescription || 'A link/anchor element',
          filePath: 'src/lib/dev-container/geenius/Anchor.tsx',
          category: 'interactive',
          semanticTags: ['a', 'anchor', 'link', 'navigation', 'interactive'],
        }}
      >
        <a ref={ref} {...props}>
          {children}
        </a>
      </Container>
    );
  }
);

A.displayName = 'DevAnchor';

export { type DevAnchorProps };