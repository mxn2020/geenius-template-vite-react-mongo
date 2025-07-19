// src/lib/dev-container/geenius/Semantic.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Article
interface DevArticleProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Article = React.forwardRef<HTMLElement, DevArticleProps>(
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
        <article ref={ref} {...props}>
          {children}
        </article>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Article',
          description: devDescription || 'An article element',
          filePath: 'src/lib/dev-container/geenius/Semantic.tsx',
          category: 'layout',
          semanticTags: ['article', 'content', 'semantic', 'layout'],
        }}
      >
        <article ref={ref} {...props}>
          {children}
        </article>
      </Container>
    );
  }
);

// Aside
interface DevAsideProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Aside = React.forwardRef<HTMLElement, DevAsideProps>(
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
        <aside ref={ref} {...props}>
          {children}
        </aside>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Aside',
          description: devDescription || 'An aside element for sidebar content',
          filePath: 'src/lib/dev-container/geenius/Semantic.tsx',
          category: 'layout',
          semanticTags: ['aside', 'sidebar', 'semantic', 'layout'],
        }}
      >
        <aside ref={ref} {...props}>
          {children}
        </aside>
      </Container>
    );
  }
);

// Main
interface DevMainProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Main = React.forwardRef<HTMLElement, DevMainProps>(
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
        <main ref={ref} {...props}>
          {children}
        </main>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Main',
          description: devDescription || 'The main content element',
          filePath: 'src/lib/dev-container/geenius/Semantic.tsx',
          category: 'layout',
          semanticTags: ['main', 'content', 'semantic', 'layout'],
        }}
      >
        <main ref={ref} {...props}>
          {children}
        </main>
      </Container>
    );
  }
);

// Figure
interface DevFigureProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Figure = React.forwardRef<HTMLElement, DevFigureProps>(
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
        <figure ref={ref} {...props}>
          {children}
        </figure>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Figure',
          description: devDescription || 'A figure element for media content',
          filePath: 'src/lib/dev-container/geenius/Semantic.tsx',
          category: 'media',
          semanticTags: ['figure', 'media', 'semantic', 'content'],
        }}
      >
        <figure ref={ref} {...props}>
          {children}
        </figure>
      </Container>
    );
  }
);

// Figcaption
interface DevFigcaptionProps extends React.HTMLAttributes<HTMLElement>, DevProps {
  children?: React.ReactNode;
}

export const Figcaption = React.forwardRef<HTMLElement, DevFigcaptionProps>(
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
        <figcaption ref={ref} {...props}>
          {children}
        </figcaption>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Figcaption',
          description: devDescription || 'A caption for figure element',
          filePath: 'src/lib/dev-container/geenius/Semantic.tsx',
          category: 'content',
          semanticTags: ['figcaption', 'caption', 'semantic', 'content'],
        }}
      >
        <figcaption ref={ref} {...props}>
          {children}
        </figcaption>
      </Container>
    );
  }
);

Article.displayName = 'DevArticle';
Aside.displayName = 'DevAside';
Main.displayName = 'DevMain';
Figure.displayName = 'DevFigure';
Figcaption.displayName = 'DevFigcaption';

export { type DevArticleProps, type DevAsideProps, type DevMainProps, type DevFigureProps, type DevFigcaptionProps };

