// src/lib/dev-container/geenius/Section.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevSectionProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, DevSectionProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `section-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
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

    return (
      <section ref={ref} {...props}>
        {children}
      </section>
    );
  }
);

Section.displayName = 'DevSection';

export { type DevSectionProps };
