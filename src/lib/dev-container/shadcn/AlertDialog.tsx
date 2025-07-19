// src/lib/dev-container/shadcn/AlertDialog.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  AlertDialog as ShadcnAlertDialog,
  AlertDialogPortal as ShadcnAlertDialogPortal,
  AlertDialogOverlay as ShadcnAlertDialogOverlay,
  AlertDialogTrigger as ShadcnAlertDialogTrigger,
  AlertDialogContent as ShadcnAlertDialogContent,
  AlertDialogHeader as ShadcnAlertDialogHeader,
  AlertDialogFooter as ShadcnAlertDialogFooter,
  AlertDialogTitle as ShadcnAlertDialogTitle,
  AlertDialogDescription as ShadcnAlertDialogDescription,
  AlertDialogAction as ShadcnAlertDialogAction,
  AlertDialogCancel as ShadcnAlertDialogCancel,
} from '../../../components/ui/alert-dialog';

// Get props types for AlertDialog root
type ShadcnAlertDialogProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialog>;
type DevAlertDialogProps = ShadcnAlertDialogProps & DevProps & { children?: React.ReactNode };

export const AlertDialog = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogProps) => {
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
      <ShadcnAlertDialog {...props}>
        {children}
      </ShadcnAlertDialog>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialog',
        description: devDescription || 'Alert dialog root component',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'modal', 'dialog', 'ui'],
      }}
    >
      <ShadcnAlertDialog {...props}>
        {children}
      </ShadcnAlertDialog>
    </Container>
  );
};

AlertDialog.displayName = 'DevAlertDialog';

// Get props types for AlertDialogPortal
type ShadcnAlertDialogPortalProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogPortal>;
type DevAlertDialogPortalProps = ShadcnAlertDialogPortalProps & DevProps & { children?: React.ReactNode };

export const AlertDialogPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogPortalProps) => {
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
      <ShadcnAlertDialogPortal {...props}>
        {children}
      </ShadcnAlertDialogPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogPortal',
        description: devDescription || 'Portal container for alert dialog content',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'portal', 'container', 'ui'],
      }}
    >
      <ShadcnAlertDialogPortal {...props}>
        {children}
      </ShadcnAlertDialogPortal>
    </Container>
  );
};

AlertDialogPortal.displayName = 'DevAlertDialogPortal';

// Get the props types from the original shadcn components
type ShadcnAlertDialogOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogOverlay>;
type ShadcnAlertDialogTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogTrigger>;
type ShadcnAlertDialogContentProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogContent>;
type ShadcnAlertDialogHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogHeader>;
type ShadcnAlertDialogFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogFooter>;
type ShadcnAlertDialogTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogTitle>;
type ShadcnAlertDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogDescription>;
type ShadcnAlertDialogActionProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogAction>;
type ShadcnAlertDialogCancelProps = React.ComponentPropsWithoutRef<typeof ShadcnAlertDialogCancel>;

// Combined props types
type DevAlertDialogOverlayProps = ShadcnAlertDialogOverlayProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogTriggerProps = ShadcnAlertDialogTriggerProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogContentProps = ShadcnAlertDialogContentProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogHeaderProps = ShadcnAlertDialogHeaderProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogFooterProps = ShadcnAlertDialogFooterProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogTitleProps = ShadcnAlertDialogTitleProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogDescriptionProps = ShadcnAlertDialogDescriptionProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogActionProps = ShadcnAlertDialogActionProps & DevProps & { children?: React.ReactNode };
type DevAlertDialogCancelProps = ShadcnAlertDialogCancelProps & DevProps & { children?: React.ReactNode };

export const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogOverlay>,
  DevAlertDialogOverlayProps
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
      <ShadcnAlertDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogOverlay>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogOverlay',
        description: devDescription || 'Overlay background for alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'overlay', 'modal', 'ui'],
      }}
    >
      <ShadcnAlertDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogOverlay>
    </Container>
  );
});

AlertDialogOverlay.displayName = 'DevAlertDialogOverlay';

export const AlertDialogTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogTrigger>,
  DevAlertDialogTriggerProps
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
      <ShadcnAlertDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogTrigger',
        description: devDescription || 'Button that triggers the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'trigger', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnAlertDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTrigger>
    </Container>
  );
});

AlertDialogTrigger.displayName = 'DevAlertDialogTrigger';

export const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogContent>,
  DevAlertDialogContentProps
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
      <ShadcnAlertDialogContent ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogContent',
        description: devDescription || 'Main content area of the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'content', 'modal', 'ui'],
      }}
    >
      <ShadcnAlertDialogContent ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogContent>
    </Container>
  );
});

AlertDialogContent.displayName = 'DevAlertDialogContent';

export const AlertDialogHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevAlertDialogHeaderProps) => {
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
      <ShadcnAlertDialogHeader {...props}>
        {children}
      </ShadcnAlertDialogHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogHeader',
        description: devDescription || 'Header section of the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'header', 'layout', 'ui'],
      }}
    >
      <ShadcnAlertDialogHeader {...props}>
        {children}
      </ShadcnAlertDialogHeader>
    </Container>
  );
};

AlertDialogHeader.displayName = 'DevAlertDialogHeader';

export const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  DevAlertDialogFooterProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }) => {
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
      <ShadcnAlertDialogFooter {...props}>
        {children}
      </ShadcnAlertDialogFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogFooter',
        description: devDescription || 'Footer section of the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'footer', 'layout', 'ui'],
      }}
    >
      <ShadcnAlertDialogFooter {...props}>
        {children}
      </ShadcnAlertDialogFooter>
    </Container>
  );
});

AlertDialogFooter.displayName = 'DevAlertDialogFooter';

export const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogTitle>,
  DevAlertDialogTitleProps
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
      <ShadcnAlertDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogTitle',
        description: devDescription || 'Title text of the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'title', 'heading', 'ui'],
      }}
    >
      <ShadcnAlertDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogTitle>
    </Container>
  );
});

AlertDialogTitle.displayName = 'DevAlertDialogTitle';

export const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogDescription>,
  DevAlertDialogDescriptionProps
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
      <ShadcnAlertDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogDescription',
        description: devDescription || 'Description text of the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'description', 'text', 'ui'],
      }}
    >
      <ShadcnAlertDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogDescription>
    </Container>
  );
});

AlertDialogDescription.displayName = 'DevAlertDialogDescription';

export const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogAction>,
  DevAlertDialogActionProps
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
      <ShadcnAlertDialogAction ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogAction>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogAction',
        description: devDescription || 'Action button that confirms the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'action', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnAlertDialogAction ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogAction>
    </Container>
  );
});

AlertDialogAction.displayName = 'DevAlertDialogAction';

export const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof ShadcnAlertDialogCancel>,
  DevAlertDialogCancelProps
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
      <ShadcnAlertDialogCancel ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogCancel>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'AlertDialogCancel',
        description: devDescription || 'Cancel button that dismisses the alert dialog',
        filePath: 'src/lib/dev-container/shadcn/AlertDialog.tsx',
        category: 'ui',
        semanticTags: ['alert-dialog', 'cancel', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnAlertDialogCancel ref={ref} {...props}>
        {children}
      </ShadcnAlertDialogCancel>
    </Container>
  );
});

AlertDialogCancel.displayName = 'DevAlertDialogCancel';

