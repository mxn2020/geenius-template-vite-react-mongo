// src/lib/dev-container/shadcn/Carousel.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Carousel as ShadcnCarousel,
  CarouselContent as ShadcnCarouselContent,
  CarouselItem as ShadcnCarouselItem,
  CarouselPrevious as ShadcnCarouselPrevious,
  CarouselNext as ShadcnCarouselNext,
  type CarouselApi
} from '../../../components/ui/carousel';

type ShadcnCarouselProps = React.ComponentPropsWithoutRef<typeof ShadcnCarousel>;
type ShadcnCarouselContentProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselContent>;
type ShadcnCarouselItemProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselItem>;
type ShadcnCarouselPreviousProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselPrevious>;
type ShadcnCarouselNextProps = React.ComponentPropsWithoutRef<typeof ShadcnCarouselNext>;

type DevCarouselProps = ShadcnCarouselProps & DevProps & { children?: React.ReactNode };
type DevCarouselContentProps = ShadcnCarouselContentProps & DevProps & { children?: React.ReactNode };
type DevCarouselItemProps = ShadcnCarouselItemProps & DevProps & { children?: React.ReactNode };
type DevCarouselPreviousProps = ShadcnCarouselPreviousProps & DevProps & { children?: React.ReactNode };
type DevCarouselNextProps = ShadcnCarouselNextProps & DevProps & { children?: React.ReactNode };

export const Carousel = React.forwardRef<
  React.ElementRef<typeof ShadcnCarousel>,
  DevCarouselProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `carousel-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Carousel',
        description: devDescription || 'Carousel slider component',
        filePath: 'src/lib/dev-container/shadcn/Carousel.tsx',
        category: 'layout',
        semanticTags: ['carousel', 'slider', 'navigation', 'interactive', 'ui'],
      }}
    >
      <ShadcnCarousel ref={ref} {...props}>
        {children}
      </ShadcnCarousel>
    </Container>
  );
});

Carousel.displayName = 'DevCarousel';

export const CarouselContent = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselContent>,
  DevCarouselContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `carousel-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CarouselContent',
          description: devDescription || 'Content container for carousel items',
          filePath: 'src/lib/dev-container/shadcn/Carousel.tsx',
          category: 'layout',
          semanticTags: ['carousel', 'content', 'container', 'ui'],
        }}
      >
        <ShadcnCarouselContent ref={ref} {...props}>
          {children}
        </ShadcnCarouselContent>
      </Container>
    );
  }

  return (
    <ShadcnCarouselContent ref={ref} {...props}>
      {children}
    </ShadcnCarouselContent>
  );
});

CarouselContent.displayName = 'DevCarouselContent';

export const CarouselItem = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselItem>,
  DevCarouselItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `carousel-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CarouselItem',
          description: devDescription || 'Individual item in a carousel',
          filePath: 'src/lib/dev-container/shadcn/Carousel.tsx',
          category: 'layout',
          semanticTags: ['carousel', 'item', 'slide', 'ui'],
        }}
      >
        <ShadcnCarouselItem ref={ref} {...props}>
          {children}
        </ShadcnCarouselItem>
      </Container>
    );
  }

  return (
    <ShadcnCarouselItem ref={ref} {...props}>
      {children}
    </ShadcnCarouselItem>
  );
});

CarouselItem.displayName = 'DevCarouselItem';

export const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselPrevious>,
  DevCarouselPreviousProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `carousel-previous-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CarouselPrevious',
          description: devDescription || 'Previous button for carousel navigation',
          filePath: 'src/lib/dev-container/shadcn/Carousel.tsx',
          category: 'navigation',
          semanticTags: ['carousel', 'previous', 'button', 'navigation', 'interactive', 'ui'],
        }}
      >
        <ShadcnCarouselPrevious ref={ref} {...props}>
          {children}
        </ShadcnCarouselPrevious>
      </Container>
    );
  }

  return (
    <ShadcnCarouselPrevious ref={ref} {...props}>
      {children}
    </ShadcnCarouselPrevious>
  );
});

CarouselPrevious.displayName = 'DevCarouselPrevious';

export const CarouselNext = React.forwardRef<
  React.ElementRef<typeof ShadcnCarouselNext>,
  DevCarouselNextProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `carousel-next-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CarouselNext',
          description: devDescription || 'Next button for carousel navigation',
          filePath: 'src/lib/dev-container/shadcn/Carousel.tsx',
          category: 'navigation',
          semanticTags: ['carousel', 'next', 'button', 'navigation', 'interactive', 'ui'],
        }}
      >
        <ShadcnCarouselNext ref={ref} {...props}>
          {children}
        </ShadcnCarouselNext>
      </Container>
    );
  }

  return (
    <ShadcnCarouselNext ref={ref} {...props}>
      {children}
    </ShadcnCarouselNext>
  );
});

CarouselNext.displayName = 'DevCarouselNext';

// Export CarouselApi type for convenience
export type { CarouselApi };

