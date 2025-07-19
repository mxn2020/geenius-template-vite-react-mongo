// src/lib/dev-container/shadcn/Accordion.tsx

import React from 'react';
import { Container } from '../components/Container';
import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { 
  Accordion as ShadcnAccordion, 
  AccordionItem as ShadcnAccordionItem,
  AccordionTrigger as ShadcnAccordionTrigger,
  AccordionContent as ShadcnAccordionContent
} from '../../../components/ui/accordion';

// Get the props types from the original shadcn components
type ShadcnAccordionProps = React.ComponentPropsWithoutRef<typeof ShadcnAccordion>;
type ShadcnAccordionItemProps = React.ComponentPropsWithoutRef<typeof ShadcnAccordionItem>;
type ShadcnAccordionTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnAccordionTrigger>;
type ShadcnAccordionContentProps = React.ComponentPropsWithoutRef<typeof ShadcnAccordionContent>;

// Combined props types (using intersections instead of extends for union types)
type DevAccordionProps = ShadcnAccordionProps & DevProps & { children?: React.ReactNode };
type DevAccordionItemProps = ShadcnAccordionItemProps & DevProps & { children?: React.ReactNode };
type DevAccordionTriggerProps = ShadcnAccordionTriggerProps & DevProps & { children?: React.ReactNode };
type DevAccordionContentProps = ShadcnAccordionContentProps & DevProps & { children?: React.ReactNode };

export const Accordion = React.forwardRef<
  React.ElementRef<typeof ShadcnAccordion>,
  DevAccordionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
      <ShadcnAccordion ref={ref} {...props}>
        {children}
      </ShadcnAccordion>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Accordion',
        description: devDescription || 'A collapsible accordion component',
        filePath: 'src/lib/dev-container/shadcn/Accordion.tsx',
        category: 'ui',
        semanticTags: ['accordion', 'collapsible', 'expand', 'ui'],
      }}
    >
      <ShadcnAccordion ref={ref} {...props}>
        {children}
      </ShadcnAccordion>
    </Container>
  );
});

Accordion.displayName = 'DevAccordion';

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof ShadcnAccordionItem>,
  DevAccordionItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
      <ShadcnAccordionItem ref={ref} {...props}>
        {children}
      </ShadcnAccordionItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AccordionItem',
        description: devDescription || 'An individual item within an accordion',
        filePath: 'src/lib/dev-container/shadcn/Accordion.tsx',
        category: 'ui',
        semanticTags: ['accordion-item', 'section', 'ui'],
      }}
    >
      <ShadcnAccordionItem ref={ref} {...props}>
        {children}
      </ShadcnAccordionItem>
    </Container>
  );
});

AccordionItem.displayName = 'DevAccordionItem';

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnAccordionTrigger>,
  DevAccordionTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
      <ShadcnAccordionTrigger ref={ref} {...props}>
        {children}
      </ShadcnAccordionTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AccordionTrigger',
        description: devDescription || 'Clickable trigger that expands/collapses accordion content',
        filePath: 'src/lib/dev-container/shadcn/Accordion.tsx',
        category: 'ui',
        semanticTags: ['accordion-trigger', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnAccordionTrigger ref={ref} {...props}>
        {children}
      </ShadcnAccordionTrigger>
    </Container>
  );
});

AccordionTrigger.displayName = 'DevAccordionTrigger';

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof ShadcnAccordionContent>,
  DevAccordionContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
      <ShadcnAccordionContent ref={ref} {...props}>
        {children}
      </ShadcnAccordionContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AccordionContent',
        description: devDescription || 'Collapsible content area of an accordion item',
        filePath: 'src/lib/dev-container/shadcn/Accordion.tsx',
        category: 'ui',
        semanticTags: ['accordion-content', 'content', 'collapsible', 'ui'],
      }}
    >
      <ShadcnAccordionContent ref={ref} {...props}>
        {children}
      </ShadcnAccordionContent>
    </Container>
  );
});

AccordionContent.displayName = 'DevAccordionContent';

// Usage example:
/*
<Accordion type="single" collapsible devName="FAQ Accordion">
  <AccordionItem value="item-1" devName="Accessibility Question">
    <AccordionTrigger devName="Question Trigger">
      Is it accessible?
    </AccordionTrigger>
    <AccordionContent devName="Answer Content">
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2" devName="Styling Question">
    <AccordionTrigger devName="Styling Trigger">
      Is it styled?
    </AccordionTrigger>
    <AccordionContent devName="Styling Answer">
      Yes. It comes with default styles that match your theme.
    </AccordionContent>
  </AccordionItem>
</Accordion>
*/