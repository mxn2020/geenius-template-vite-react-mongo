import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const P = React.forwardRef<HTMLParagraphElement, DevParagraphProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `p-${generateId()}`;
    
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
);

P.displayName = 'DevParagraph';

export { type DevParagraphProps };