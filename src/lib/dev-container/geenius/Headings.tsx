// src/lib/dev-container/geenius/Headings.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevHeadingProps extends React.HTMLAttributes<HTMLHeadingElement>, DevProps {
  children?: React.ReactNode;
}

export const H1 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h1-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
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

    return (
      <h1 ref={ref} {...props}>
        {children}
      </h1>
    );
  }
);

export const H2 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h2-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
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

    return (
      <h2 ref={ref} {...props}>
        {children}
      </h2>
    );
  }
);

export const H3 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h3-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
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

    return (
      <h3 ref={ref} {...props}>
        {children}
      </h3>
    );
  }
);

export const H4 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h4-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'H4',
            description: devDescription || 'A fourth level heading element',
            filePath: 'src/lib/dev-container/geenius/Headings.tsx',
            category: 'content',
            semanticTags: ['h4', 'heading', 'subsection-title', 'semantic', 'content'],
          }}
        >
          <h4 ref={ref} {...props}>
            {children}
          </h4>
        </Container>
      );
    }

    return (
      <h4 ref={ref} {...props}>
        {children}
      </h4>
    );
  }
);

export const H5 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h5-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'H5',
            description: devDescription || 'A fifth level heading element',
            filePath: 'src/lib/dev-container/geenius/Headings.tsx',
            category: 'content',
            semanticTags: ['h5', 'heading', 'minor-title', 'semantic', 'content'],
          }}
        >
          <h5 ref={ref} {...props}>
            {children}
          </h5>
        </Container>
      );
    }

    return (
      <h5 ref={ref} {...props}>
        {children}
      </h5>
    );
  }
);

export const H6 = React.forwardRef<HTMLHeadingElement, DevHeadingProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `h6-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'H6',
            description: devDescription || 'A sixth level heading element',
            filePath: 'src/lib/dev-container/geenius/Headings.tsx',
            category: 'content',
            semanticTags: ['h6', 'heading', 'smallest-title', 'semantic', 'content'],
          }}
        >
          <h6 ref={ref} {...props}>
            {children}
          </h6>
        </Container>
      );
    }

    return (
      <h6 ref={ref} {...props}>
        {children}
      </h6>
    );
  }
);

H1.displayName = 'DevH1';
H2.displayName = 'DevH2';
H3.displayName = 'DevH3';
H4.displayName = 'DevH4';
H5.displayName = 'DevH5';
H6.displayName = 'DevH6';

export { type DevHeadingProps };