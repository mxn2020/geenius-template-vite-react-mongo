import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSectionProps extends React.HTMLAttributes<HTMLElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, DevSectionProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `section-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Section',
          description: devDescription || 'A section element',
          filePath: 'src/lib/dev-container/geenius/Section.tsx',
          category: 'layout',
          semanticTags: ['section', 'content', 'layout', 'semantic'],
        }}
      >
        <section ref={ref} {...props}>
          {children}
        </section>
      </Container>
    );
  }
);

Section.displayName = 'DevSection';

export { type DevSectionProps };