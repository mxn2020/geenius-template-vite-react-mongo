import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const H1 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `h1-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'H1',
          description: devDescription || 'A main heading element',
          filePath: 'src/lib/dev-container/geenius/Headings.tsx',
          category: 'content',
          semanticTags: ['h1', 'heading', 'title', 'semantic', 'content'],
        }}
      >
        <h1 ref={ref} {...props}>
          {children}
        </h1>
      </Container>
    );
  }
);

export const H2 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `h2-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'H2',
          description: devDescription || 'A secondary heading element',
          filePath: 'src/lib/dev-container/geenius/Headings.tsx',
          category: 'content',
          semanticTags: ['h2', 'heading', 'subtitle', 'semantic', 'content'],
        }}
      >
        <h2 ref={ref} {...props}>
          {children}
        </h2>
      </Container>
    );
  }
);

export const H3 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `h3-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'H3',
          description: devDescription || 'A tertiary heading element',
          filePath: 'src/lib/dev-container/geenius/Headings.tsx',
          category: 'content',
          semanticTags: ['h3', 'heading', 'section-title', 'semantic', 'content'],
        }}
      >
        <h3 ref={ref} {...props}>
          {children}
        </h3>
      </Container>
    );
  }
);

H1.displayName = 'DevH1';
H2.displayName = 'DevH2';
H3.displayName = 'DevH3';

export { type DevHeadingProps };