// src/lib/dev-container/shadcn/Card.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Card as ShadcnCard,
  CardHeader as ShadcnCardHeader,
  CardFooter as ShadcnCardFooter,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent
} from '../../../components/ui/card';

type ShadcnCardProps = React.ComponentPropsWithoutRef<typeof ShadcnCard>;
type ShadcnCardHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnCardHeader>;
type ShadcnCardFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnCardFooter>;
type ShadcnCardTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnCardTitle>;
type ShadcnCardDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnCardDescription>;
type ShadcnCardContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCardContent>;

type DevCardProps = ShadcnCardProps & DevProps & { children?: React.ReactNode };
type DevCardHeaderProps = ShadcnCardHeaderProps & DevProps & { children?: React.ReactNode };
type DevCardFooterProps = ShadcnCardFooterProps & DevProps & { children?: React.ReactNode };
type DevCardTitleProps = ShadcnCardTitleProps & DevProps & { children?: React.ReactNode };
type DevCardDescriptionProps = ShadcnCardDescriptionProps & DevProps & { children?: React.ReactNode };
type DevCardContentProps = ShadcnCardContentProps & DevProps & { children?: React.ReactNode };

export const Card = React.forwardRef<
  React.ElementRef<typeof ShadcnCard>,
  DevCardProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Card',
        description: devDescription || 'Container card component',
        filePath: 'src/lib/dev-container/shadcn/Card.tsx',
        category: 'layout',
        semanticTags: ['card', 'container', 'layout', 'ui'],
      }}
    >
      <ShadcnCard ref={ref} {...props}>
        {children}
      </ShadcnCard>
    </Container>
  );
});

Card.displayName = 'DevCard';

export const CardHeader = React.forwardRef<
  React.ElementRef<typeof ShadcnCardHeader>,
  DevCardHeaderProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-header-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CardHeader',
          description: devDescription || 'Header section of a card',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'layout',
          semanticTags: ['card', 'header', 'layout', 'ui'],
        }}
      >
        <ShadcnCardHeader ref={ref} {...props}>
          {children}
        </ShadcnCardHeader>
      </Container>
    );
  }

  return (
    <ShadcnCardHeader ref={ref} {...props}>
      {children}
    </ShadcnCardHeader>
  );
});

CardHeader.displayName = 'DevCardHeader';

export const CardFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnCardFooter>,
  DevCardFooterProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-footer-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CardFooter',
          description: devDescription || 'Footer section of a card',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'layout',
          semanticTags: ['card', 'footer', 'layout', 'ui'],
        }}
      >
        <ShadcnCardFooter ref={ref} {...props}>
          {children}
        </ShadcnCardFooter>
      </Container>
    );
  }

  return (
    <ShadcnCardFooter ref={ref} {...props}>
      {children}
    </ShadcnCardFooter>
  );
});

CardFooter.displayName = 'DevCardFooter';

export const CardTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnCardTitle>,
  DevCardTitleProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-title-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CardTitle',
          description: devDescription || 'Title text of a card',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'typography',
          semanticTags: ['card', 'title', 'heading', 'text', 'ui'],
        }}
      >
        <ShadcnCardTitle ref={ref} {...props}>
          {children}
        </ShadcnCardTitle>
      </Container>
    );
  }

  return (
    <ShadcnCardTitle ref={ref} {...props}>
      {children}
    </ShadcnCardTitle>
  );
});

CardTitle.displayName = 'DevCardTitle';

export const CardDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnCardDescription>,
  DevCardDescriptionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-description-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CardDescription',
          description: devDescription || 'Description text of a card',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'typography',
          semanticTags: ['card', 'description', 'text', 'ui'],
        }}
      >
        <ShadcnCardDescription ref={ref} {...props}>
          {children}
        </ShadcnCardDescription>
      </Container>
    );
  }

  return (
    <ShadcnCardDescription ref={ref} {...props}>
      {children}
    </ShadcnCardDescription>
  );
});

CardDescription.displayName = 'DevCardDescription';

export const CardContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCardContent>,
  DevCardContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `card-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CardContent',
          description: devDescription || 'Main content area of a card',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'layout',
          semanticTags: ['card', 'content', 'layout', 'ui'],
        }}
      >
        <ShadcnCardContent ref={ref} {...props}>
          {children}
        </ShadcnCardContent>
      </Container>
    );
  }

  return (
    <ShadcnCardContent ref={ref} {...props}>
      {children}
    </ShadcnCardContent>
  );
});

CardContent.displayName = 'DevCardContent';

