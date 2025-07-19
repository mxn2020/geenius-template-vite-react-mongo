// src/lib/dev-container/shadcn/Alert.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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
  const componentId = devId || `alert-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `alert-title-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnAlertTitle ref={ref} {...props}>
      {children}
    </ShadcnAlertTitle>
  );
});

AlertTitle.displayName = 'DevAlertTitle';

export const AlertDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDescription>,
  DevAlertDescriptionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `alert-description-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnAlertDescription ref={ref} {...props}>
      {children}
    </ShadcnAlertDescription>
  );
});

AlertDescription.displayName = 'DevAlertDescription';

