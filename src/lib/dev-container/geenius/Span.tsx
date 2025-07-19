// src/lib/dev-container/geenius/Span.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevSpanProps extends React.HTMLAttributes<HTMLSpanElement>, DevProps {
  children?: React.ReactNode;
}

export const Span = React.forwardRef<HTMLSpanElement, DevSpanProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `span-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Span',
            description: devDescription || 'A span element',
            filePath: 'src/lib/dev-container/geenius/Span.tsx',
            category: 'content',
            semanticTags: ['span', 'inline', 'text', 'content'],
          }}
        >
          <span ref={ref} {...props}>
            {children}
          </span>
        </Container>
      );
    }

    return (
      <span ref={ref} {...props}>
        {children}
      </span>
    );
  }
);

Span.displayName = 'DevSpan';

export { type DevSpanProps };