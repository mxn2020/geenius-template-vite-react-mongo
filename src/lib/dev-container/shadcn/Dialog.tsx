// src/lib/dev-container/shadcn/Dialog.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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

export const Dialog = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevDialogProps) => {
  const componentId = devId || `dialog-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `dialog-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogTrigger ref={ref} {...props}>
      {children}
    </ShadcnDialogTrigger>
  );
});

DialogTrigger.displayName = 'DevDialogTrigger';

// DialogPortal component (FC type)
type ShadcnDialogPortalProps = React.ComponentProps<typeof ShadcnDialogPortal>;
type DevDialogPortalProps = ShadcnDialogPortalProps & DevProps & { children?: React.ReactNode };

export const DialogPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogPortalProps) => {
  const componentId = devId || `dialog-portal-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogPortal {...props}>
      {children}
    </ShadcnDialogPortal>
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
  const componentId = devId || `dialog-overlay-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogOverlay ref={ref} {...props}>
      {children}
    </ShadcnDialogOverlay>
  );
});

DialogOverlay.displayName = 'DevDialogOverlay';

// DialogContent component
type ShadcnDialogContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogContent>;
type DevDialogContentProps = ShadcnDialogContentProps & DevProps & { children?: React.ReactNode };

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDialogContent>,
  DevDialogContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `dialog-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `dialog-header-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogHeader {...props}>
      {children}
    </ShadcnDialogHeader>
  );
};

DialogHeader.displayName = 'DevDialogHeader';

// DialogFooter component
type ShadcnDialogFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnDialogFooter>;
type DevDialogFooterProps = ShadcnDialogFooterProps & DevProps & { children?: React.ReactNode };

export const DialogFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDialogFooterProps) => {
  const componentId = devId || `dialog-footer-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogFooter {...props}>
      {children}
    </ShadcnDialogFooter>
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
  const componentId = devId || `dialog-title-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogTitle ref={ref} {...props}>
      {children}
    </ShadcnDialogTitle>
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
  const componentId = devId || `dialog-description-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogDescription ref={ref} {...props}>
      {children}
    </ShadcnDialogDescription>
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
  const componentId = devId || `dialog-close-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnDialogClose ref={ref} {...props}>
      {children}
    </ShadcnDialogClose>
  );
});

DialogClose.displayName = 'DevDialogClose';