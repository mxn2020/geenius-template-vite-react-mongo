// src/lib/dev-container/geenius/Paragraph.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevParagraphProps extends React.HTMLAttributes<HTMLParagraphElement>, DevProps {
  children?: React.ReactNode;
}

export const P = React.forwardRef<HTMLParagraphElement, DevParagraphProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `p-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Paragraph',
            description: devDescription || 'A paragraph element',
            filePath: 'src/lib/dev-container/geenius/Paragraph.tsx',
            category: 'content',
            semanticTags: ['p', 'paragraph', 'text', 'content'],
          }}
        >
          <p ref={ref} {...props}>
            {children}
          </p>
        </Container>
      );
    }

    return (
      <p ref={ref} {...props}>
        {children}
      </p>
    );
  }
);

P.displayName = 'DevParagraph';

export { type DevParagraphProps };