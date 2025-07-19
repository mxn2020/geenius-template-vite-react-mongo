import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevDivProps extends React.HTMLAttributes<HTMLDivElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Div = React.forwardRef<HTMLDivElement, DevDivProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `div-${generateId()}`;
    
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
);

Div.displayName = 'DevDiv';

export { type DevDivProps };