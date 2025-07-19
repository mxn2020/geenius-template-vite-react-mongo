// src/lib/dev-container/geenius/Text.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Anchor (keeping from previous)
interface DevAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, DevProps {
  children?: React.ReactNode;
}

export const A = React.forwardRef<HTMLAnchorElement, DevAnchorProps>(
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
        <a ref={ref} {...props}>
          {children}
        </a>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Anchor',
          description: devDescription || 'A link/anchor element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'interactive',
          semanticTags: ['a', 'anchor', 'link', 'navigation', 'interactive'],
        }}
      >
        <a ref={ref} {...props}>
          {children}
        </a>
      </Container>
    );
  }
);

// Strong
interface DevStrongProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Strong = React.forwardRef<HTMLElement, DevStrongProps>(
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
        <strong ref={ref} {...props}>
          {children}
        </strong>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Strong',
          description: devDescription || 'A strong importance element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'content',
          semanticTags: ['strong', 'emphasis', 'bold', 'text', 'semantic'],
        }}
      >
        <strong ref={ref} {...props}>
          {children}
        </strong>
      </Container>
    );
  }
);

// Emphasis
interface DevEmProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Em = React.forwardRef<HTMLElement, DevEmProps>(
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
        <em ref={ref} {...props}>
          {children}
        </em>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Emphasis',
          description: devDescription || 'An emphasis element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'content',
          semanticTags: ['em', 'emphasis', 'italic', 'text', 'semantic'],
        }}
      >
        <em ref={ref} {...props}>
          {children}
        </em>
      </Container>
    );
  }
);

// Code
interface DevCodeProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Code = React.forwardRef<HTMLElement, DevCodeProps>(
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
        <code ref={ref} {...props}>
          {children}
        </code>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Code',
          description: devDescription || 'An inline code element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'content',
          semanticTags: ['code', 'programming', 'inline', 'text', 'semantic'],
        }}
      >
        <code ref={ref} {...props}>
          {children}
        </code>
      </Container>
    );
  }
);

// Pre
interface DevPreProps extends React.HTMLAttributes<HTMLPreElement>, DevProps {
  children?: React.ReactNode;
}

export const Pre = React.forwardRef<HTMLPreElement, DevPreProps>(
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
        <pre ref={ref} {...props}>
          {children}
        </pre>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Preformatted',
          description: devDescription || 'A preformatted text element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'content',
          semanticTags: ['pre', 'preformatted', 'code-block', 'text', 'semantic'],
        }}
      >
        <pre ref={ref} {...props}>
          {children}
        </pre>
      </Container>
    );
  }
);

// Blockquote
interface DevBlockquoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement>, DevProps {
  children?: React.ReactNode;
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, DevBlockquoteProps>(
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
        <blockquote ref={ref} {...props}>
          {children}
        </blockquote>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Blockquote',
          description: devDescription || 'A blockquote element',
          filePath: 'src/lib/dev-container/geenius/Text.tsx',
          category: 'content',
          semanticTags: ['blockquote', 'quote', 'citation', 'text', 'semantic'],
        }}
      >
        <blockquote ref={ref} {...props}>
          {children}
        </blockquote>
      </Container>
    );
  }
);

A.displayName = 'DevAnchor';
Strong.displayName = 'DevStrong';
Em.displayName = 'DevEm';
Code.displayName = 'DevCode';
Pre.displayName = 'DevPre';
Blockquote.displayName = 'DevBlockquote';

export { type DevAnchorProps, type DevStrongProps, type DevEmProps, type DevCodeProps, type DevPreProps, type DevBlockquoteProps };