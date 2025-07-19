import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Span = React.forwardRef<HTMLSpanElement, DevSpanProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `span-${generateId()}`;
    
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
);

Span.displayName = 'DevSpan';

export { type DevSpanProps };