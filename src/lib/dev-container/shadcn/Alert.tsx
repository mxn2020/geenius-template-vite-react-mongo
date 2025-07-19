// src/lib/dev-container/shadcn/Alert.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { 
  Alert as ShadcnAlert, 
  AlertTitle as ShadcnAlertTitle,
  AlertDescription as ShadcnAlertDescription
} from '../../../components/ui/alert';

// Get the props types from the original shadcn components
type ShadcnAlertProps = React.ComponentPropsWithoutRef<typeof ShadcnAlert>;
type ShadcnAlertTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertTitle>;
type ShadcnAlertDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDescription>;

// Combined props types
type DevAlertProps = ShadcnAlertProps & DevProps & { children?: React.ReactNode };
type DevAlertTitleProps = ShadcnAlertTitleProps & DevProps & { children?: React.ReactNode };
type DevAlertDescriptionProps = ShadcnAlertDescriptionProps & DevProps & { children?: React.ReactNode };

export const Alert = React.forwardRef<
  React.ElementRef<typeof ShadcnAlert>,
  DevAlertProps
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
      <ShadcnAlert ref={ref} {...props}>
        {children}
      </ShadcnAlert>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Alert',
        description: devDescription || 'An alert component for displaying important messages',
        filePath: 'src/lib/dev-container/shadcn/Alert.tsx',
        category: 'ui',
        semanticTags: ['alert', 'notification', 'message', 'ui'],
      }}
    >
      <ShadcnAlert ref={ref} {...props}>
        {children}
      </ShadcnAlert>
    </Container>
  );
});

Alert.displayName = 'DevAlert';

export const AlertTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertTitle>,
  DevAlertTitleProps
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
      <ShadcnAlertTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertTitle',
        description: devDescription || 'Title text for an alert component',
        filePath: 'src/lib/dev-container/shadcn/Alert.tsx',
        category: 'ui',
        semanticTags: ['alert-title', 'heading', 'text', 'ui'],
      }}
    >
      <ShadcnAlertTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertTitle>
    </Container>
  );
});

AlertTitle.displayName = 'DevAlertTitle';

export const AlertDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDescription>,
  DevAlertDescriptionProps
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
      <ShadcnAlertDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDescription',
        description: devDescription || 'Description text for an alert component',
        filePath: 'src/lib/dev-container/shadcn/Alert.tsx',
        category: 'ui',
        semanticTags: ['alert-description', 'text', 'content', 'ui'],
      }}
    >
      <ShadcnAlertDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDescription>
    </Container>
  );
});

AlertDescription.displayName = 'DevAlertDescription';

