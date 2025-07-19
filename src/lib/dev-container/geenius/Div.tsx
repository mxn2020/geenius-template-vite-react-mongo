// src/lib/dev-container/geenius/Div.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevDivProps extends React.HTMLAttributes<HTMLDivElement>, DevProps {
  children?: React.ReactNode;
}

export const Div = React.forwardRef<HTMLDivElement, DevDivProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `div-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Div',
            description: devDescription || 'A div container element',
            filePath: 'src/lib/dev-container/geenius/Div.tsx',
            category: 'layout',
            semanticTags: ['div', 'container', 'layout', 'wrapper'],
          }}
        >
          <div ref={ref} {...props}>
            {children}
          </div>
        </Container>
      );
    }

    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    );
  }
);

Div.displayName = 'DevDiv';

export { type DevDivProps };

