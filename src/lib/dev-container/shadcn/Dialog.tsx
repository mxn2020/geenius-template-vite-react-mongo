// src/lib/dev-container/shadcn/Dialog.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Dialog as ShadcnDialog,
  DialogTrigger as ShadcnDialogTrigger,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogFooter as ShadcnDialogFooter,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
  DialogClose as ShadcnDialogClose,
  DialogPortal as ShadcnDialogPortal,
  DialogOverlay as ShadcnDialogOverlay,
} from '../../../components/ui/dialog';

// Dialog root component (FC type)
type ShadcnDialogProps = React.ComponentProps<typeof ShadcnDialog>;
type DevDialogProps = ShadcnDialogProps & DevProps & { children?: React.ReactNode };

export const Dialog = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogProps) => {
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
      <ShadcnDialog {...props}>
        {children}
      </ShadcnDialog>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Dialog',
        description: devDescription || 'Dialog root component',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'modal', 'overlay', 'ui'],
      }}
    >
      <ShadcnDialog {...props}>
        {children}
      </ShadcnDialog>
    </Container>
  );
};

Dialog.displayName = 'DevDialog';

// DialogTrigger component
type ShadcnDialogTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogTrigger>;
type DevDialogTriggerProps = ShadcnDialogTriggerProps & DevProps & { children?: React.ReactNode };

export const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogTrigger>,
  DevDialogTriggerProps
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
      <ShadcnDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnDialogTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogTrigger',
        description: devDescription || 'Button that opens the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'trigger', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnDialogTrigger ref={ref} {...props}>
        {children}
      </ShadcnDialogTrigger>
    </Container>
  );
});

DialogTrigger.displayName = 'DevDialogTrigger';

// DialogPortal component (FC type)
type ShadcnDialogPortalProps = React.ComponentProps<typeof ShadcnDialogPortal>;
type DevDialogPortalProps = ShadcnDialogPortalProps & DevProps & { children?: React.ReactNode };

export const DialogPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogPortalProps) => {
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
      <ShadcnDialogPortal {...props}>
        {children}
      </ShadcnDialogPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogPortal',
        description: devDescription || 'Portal container for dialog content',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'portal', 'container', 'ui'],
      }}
    >
      <ShadcnDialogPortal {...props}>
        {children}
      </ShadcnDialogPortal>
    </Container>
  );
};

DialogPortal.displayName = 'DevDialogPortal';

// DialogOverlay component
type ShadcnDialogOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogOverlay>;
type DevDialogOverlayProps = ShadcnDialogOverlayProps & DevProps & { children?: React.ReactNode };

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogOverlay>,
  DevDialogOverlayProps
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
      <ShadcnDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnDialogOverlay>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogOverlay',
        description: devDescription || 'Background overlay for dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'overlay', 'background', 'ui'],
      }}
    >
      <ShadcnDialogOverlay ref={ref} {...props}>
        {children}
      </ShadcnDialogOverlay>
    </Container>
  );
});

DialogOverlay.displayName = 'DevDialogOverlay';

// DialogContent component
type ShadcnDialogContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogContent>;
type DevDialogContentProps = ShadcnDialogContentProps & DevProps & { children?: React.ReactNode };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogContent>,
  DevDialogContentProps
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
      <ShadcnDialogContent ref={ref} {...props}>
        {children}
      </ShadcnDialogContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogContent',
        description: devDescription || 'Main content area of the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'content', 'modal', 'ui'],
      }}
    >
      <ShadcnDialogContent ref={ref} {...props}>
        {children}
      </ShadcnDialogContent>
    </Container>
  );
});

DialogContent.displayName = 'DevDialogContent';

// DialogHeader component
type ShadcnDialogHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogHeader>;
type DevDialogHeaderProps = ShadcnDialogHeaderProps & DevProps & { children?: React.ReactNode };

export const DialogHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogHeaderProps) => {
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
      <ShadcnDialogHeader {...props}>
        {children}
      </ShadcnDialogHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogHeader',
        description: devDescription || 'Header section of the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'header', 'layout', 'ui'],
      }}
    >
      <ShadcnDialogHeader {...props}>
        {children}
      </ShadcnDialogHeader>
    </Container>
  );
};

DialogHeader.displayName = 'DevDialogHeader';

// DialogFooter component
type ShadcnDialogFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogFooter>;
type DevDialogFooterProps = ShadcnDialogFooterProps & DevProps & { children?: React.ReactNode };

export const DialogFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogFooterProps) => {
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
      <ShadcnDialogFooter {...props}>
        {children}
      </ShadcnDialogFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogFooter',
        description: devDescription || 'Footer section of the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'footer', 'layout', 'ui'],
      }}
    >
      <ShadcnDialogFooter {...props}>
        {children}
      </ShadcnDialogFooter>
    </Container>
  );
};

DialogFooter.displayName = 'DevDialogFooter';

// DialogTitle component
type ShadcnDialogTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogTitle>;
type DevDialogTitleProps = ShadcnDialogTitleProps & DevProps & { children?: React.ReactNode };

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogTitle>,
  DevDialogTitleProps
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
      <ShadcnDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnDialogTitle>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogTitle',
        description: devDescription || 'Title text of the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'title', 'heading', 'ui'],
      }}
    >
      <ShadcnDialogTitle ref={ref} {...props}>
        {children}
      </ShadcnDialogTitle>
    </Container>
  );
});

DialogTitle.displayName = 'DevDialogTitle';

// DialogDescription component
type ShadcnDialogDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogDescription>;
type DevDialogDescriptionProps = ShadcnDialogDescriptionProps & DevProps & { children?: React.ReactNode };

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogDescription>,
  DevDialogDescriptionProps
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
      <ShadcnDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnDialogDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogDescription',
        description: devDescription || 'Description text of the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'description', 'text', 'ui'],
      }}
    >
      <ShadcnDialogDescription ref={ref} {...props}>
        {children}
      </ShadcnDialogDescription>
    </Container>
  );
});

DialogDescription.displayName = 'DevDialogDescription';

// DialogClose component
type ShadcnDialogCloseProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogClose>;
type DevDialogCloseProps = ShadcnDialogCloseProps & DevProps & { children?: React.ReactNode };

export const DialogClose = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogClose>,
  DevDialogCloseProps
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
      <ShadcnDialogClose ref={ref} {...props}>
        {children}
      </ShadcnDialogClose>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'DialogClose',
        description: devDescription || 'Button that closes the dialog',
        filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
        category: 'overlay',
        semanticTags: ['dialog', 'close', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnDialogClose ref={ref} {...props}>
        {children}
      </ShadcnDialogClose>
    </Container>
  );
});

DialogClose.displayName = 'DevDialogClose';