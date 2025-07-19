// src/lib/dev-container/geenius/Anchor.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, DevProps {
  children?: React.ReactNode;
}

export const A = React.forwardRef<HTMLAnchorElement, DevAnchorProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `a-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
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

    return (
      <a ref={ref} {...props}>
        {children}
      </a>
    );
  }
);

A.displayName = 'DevAnchor';

export { type DevAnchorProps };