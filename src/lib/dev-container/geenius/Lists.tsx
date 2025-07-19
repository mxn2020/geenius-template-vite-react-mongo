// src/lib/dev-container/geenius/Lists.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Unordered List
interface DevUlProps extends React.HTMLAttributes<HTMLUListElement>, DevProps {
  children?: React.ReactNode;
}

export const Ul = React.forwardRef<HTMLUListElement, DevUlProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    // If no devId provided, throw build error
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    // If no devId provided or explicitly set to "noID", don't containerize
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <ul ref={ref} {...props}>
          {children}
        </ul>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Unordered List',
          description: devDescription || 'An unordered list element',
          filePath: 'src/lib/dev-container/geenius/Lists.tsx',
          category: 'content',
          semanticTags: ['ul', 'list', 'unordered', 'content'],
        }}
      >
        <ul ref={ref} {...props}>
          {children}
        </ul>
      </Container>
    );
  }
);

// Ordered List
interface DevOlProps extends React.OlHTMLAttributes<HTMLOListElement>, DevProps {
  children?: React.ReactNode;
}

export const Ol = React.forwardRef<HTMLOListElement, DevOlProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    // If no devId provided, throw build error
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    // If no devId provided or explicitly set to "noID", don't containerize
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <ol ref={ref} {...props}>
          {children}
        </ol>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Ordered List',
          description: devDescription || 'An ordered list element',
          filePath: 'src/lib/dev-container/geenius/Lists.tsx',
          category: 'content',
          semanticTags: ['ol', 'list', 'ordered', 'numbered', 'content'],
        }}
      >
        <ol ref={ref} {...props}>
          {children}
        </ol>
      </Container>
    );
  }
);

// List Item
interface DevLiProps extends React.LiHTMLAttributes<HTMLLIElement>, DevProps {
  children?: React.ReactNode;
}

export const Li = React.forwardRef<HTMLLIElement, DevLiProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const { config } = useDevMode();
    const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
    
    // If no devId provided, throw build error
    if (!devId && shouldContainerize) {
      if (import.meta.env.DEV) {
        throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
      }
    }
    
    // If no devId provided or explicitly set to "noID", don't containerize
    if (!devId || devId === "noID" || !shouldContainerize) {
      return (
        <li ref={ref} {...props}>
          {children}
        </li>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'List Item',
          description: devDescription || 'A list item element',
          filePath: 'src/lib/dev-container/geenius/Lists.tsx',
          category: 'content',
          semanticTags: ['li', 'list-item', 'item', 'content'],
        }}
      >
        <li ref={ref} {...props}>
          {children}
        </li>
      </Container>
    );
  }
);

Ul.displayName = 'DevUl';
Ol.displayName = 'DevOl';
Li.displayName = 'DevLi';

export { type DevUlProps, type DevOlProps, type DevLiProps };

