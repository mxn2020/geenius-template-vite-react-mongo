// src/lib/dev-container/shadcn/Sheet.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Sheet as ShadcnSheet,
  SheetPortal as ShadcnSheetPortal,
  SheetOverlay as ShadcnSheetOverlay,
  SheetTrigger as ShadcnSheetTrigger,
  SheetClose as ShadcnSheetClose,
  SheetContent as ShadcnSheetContent,
  SheetHeader as ShadcnSheetHeader,
  SheetFooter as ShadcnSheetFooter,
  SheetTitle as ShadcnSheetTitle,
  SheetDescription as ShadcnSheetDescription,
} from '../../../components/ui/sheet';

// Sheet root component (FC type)
type ShadcnSheetProps = React.ComponentProps<typeof ShadcnSheet>;
type DevSheetProps = ShadcnSheetProps & DevProps & { children?: React.ReactNode };

export const Sheet = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevSheetProps) => {
  const componentId = devId || `sheet-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Sheet',
        description: devDescription || 'Sheet root component',
        filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
        category: 'overlay',
        semanticTags: ['sheet', 'modal', 'slide', 'overlay', 'ui'],
      }}
    >
      <ShadcnSheet {...props}>
        {children}
      </ShadcnSheet>
    </Container>
  );
};

Sheet.displayName = 'DevSheet';

// SheetPortal component (FC type)
type ShadcnSheetPortalProps = React.ComponentProps<typeof ShadcnSheetPortal>;
type DevSheetPortalProps = ShadcnSheetPortalProps & DevProps & { children?: React.ReactNode };

export const SheetPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetPortalProps) => {
  const componentId = devId || `sheet-portal-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetPortal',
          description: devDescription || 'Portal container for sheet content',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'portal', 'container', 'ui'],
        }}
      >
        <ShadcnSheetPortal {...props}>
          {children}
        </ShadcnSheetPortal>
      </Container>
    );
  }

  return (
    <ShadcnSheetPortal {...props}>
      {children}
    </ShadcnSheetPortal>
  );
};

SheetPortal.displayName = 'DevSheetPortal';

// SheetOverlay component
type ShadcnSheetOverlayProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetOverlay>;
type DevSheetOverlayProps = ShadcnSheetOverlayProps & DevProps & { children?: React.ReactNode };

export const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetOverlay>,
  DevSheetOverlayProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `sheet-overlay-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetOverlay',
          description: devDescription || 'Background overlay for sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'overlay', 'background', 'ui'],
        }}
      >
        <ShadcnSheetOverlay ref={ref} {...props}>
          {children}
        </ShadcnSheetOverlay>
      </Container>
    );
  }

  return (
    <ShadcnSheetOverlay ref={ref} {...props}>
      {children}
    </ShadcnSheetOverlay>
  );
});

SheetOverlay.displayName = 'DevSheetOverlay';

// SheetTrigger component
type ShadcnSheetTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetTrigger>;
type DevSheetTriggerProps = ShadcnSheetTriggerProps & DevProps & { children?: React.ReactNode };

export const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetTrigger>,
  DevSheetTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `sheet-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetTrigger',
          description: devDescription || 'Button that opens the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnSheetTrigger ref={ref} {...props}>
          {children}
        </ShadcnSheetTrigger>
      </Container>
    );
  }

  return (
    <ShadcnSheetTrigger ref={ref} {...props}>
      {children}
    </ShadcnSheetTrigger>
  );
});

SheetTrigger.displayName = 'DevSheetTrigger';

// SheetClose component
type ShadcnSheetCloseProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetClose>;
type DevSheetCloseProps = ShadcnSheetCloseProps & DevProps & { children?: React.ReactNode };

export const SheetClose = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetClose>,
  DevSheetCloseProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `sheet-close-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetClose',
          description: devDescription || 'Button that closes the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'close', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnSheetClose ref={ref} {...props}>
          {children}
        </ShadcnSheetClose>
      </Container>
    );
  }

  return (
    <ShadcnSheetClose ref={ref} {...props}>
      {children}
    </ShadcnSheetClose>
  );
});

SheetClose.displayName = 'DevSheetClose';

// SheetContent component
type ShadcnSheetContentProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetContent>;
type DevSheetContentProps = ShadcnSheetContentProps & DevProps & { children?: React.ReactNode };

export const SheetContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetContent>,
  DevSheetContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `sheet-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'SheetContent',
        description: devDescription || 'Main content area of the sheet',
        filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
        category: 'overlay',
        semanticTags: ['sheet', 'content', 'modal', 'ui'],
      }}
    >
      <ShadcnSheetContent ref={ref} {...props}>
        {children}
      </ShadcnSheetContent>
    </Container>
  );
});

SheetContent.displayName = 'DevSheetContent';

// SheetHeader component
type ShadcnSheetHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetHeader>;
type DevSheetHeaderProps = ShadcnSheetHeaderProps & DevProps & { children?: React.ReactNode };

export const SheetHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetHeaderProps) => {
  const componentId = devId || `sheet-header-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetHeader',
          description: devDescription || 'Header section of the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'header', 'layout', 'ui'],
        }}
      >
        <ShadcnSheetHeader {...props}>
          {children}
        </ShadcnSheetHeader>
      </Container>
    );
  }

  return (
    <ShadcnSheetHeader {...props}>
      {children}
    </ShadcnSheetHeader>
  );
};

SheetHeader.displayName = 'DevSheetHeader';

// SheetFooter component
type ShadcnSheetFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetFooter>;
type DevSheetFooterProps = ShadcnSheetFooterProps & DevProps & { children?: React.ReactNode };

export const SheetFooter = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevSheetFooterProps) => {
  const componentId = devId || `sheet-footer-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetFooter',
          description: devDescription || 'Footer section of the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'footer', 'layout', 'ui'],
        }}
      >
        <ShadcnSheetFooter {...props}>
          {children}
        </ShadcnSheetFooter>
      </Container>
    );
  }

  return (
    <ShadcnSheetFooter {...props}>
      {children}
    </ShadcnSheetFooter>
  );
};

SheetFooter.displayName = 'DevSheetFooter';

// SheetTitle component
type ShadcnSheetTitleProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetTitle>;
type DevSheetTitleProps = ShadcnSheetTitleProps & DevProps & { children?: React.ReactNode };

export const SheetTitle = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetTitle>,
  DevSheetTitleProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `sheet-title-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetTitle',
          description: devDescription || 'Title text of the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'title', 'heading', 'ui'],
        }}
      >
        <ShadcnSheetTitle ref={ref} {...props}>
          {children}
        </ShadcnSheetTitle>
      </Container>
    );
  }

  return (
    <ShadcnSheetTitle ref={ref} {...props}>
      {children}
    </ShadcnSheetTitle>
  );
});

SheetTitle.displayName = 'DevSheetTitle';

// SheetDescription component
type ShadcnSheetDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnSheetDescription>;
type DevSheetDescriptionProps = ShadcnSheetDescriptionProps & DevProps & { children?: React.ReactNode };

export const SheetDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnSheetDescription>,
  DevSheetDescriptionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `sheet-description-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SheetDescription',
          description: devDescription || 'Description text of the sheet',
          filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
          category: 'overlay',
          semanticTags: ['sheet', 'description', 'text', 'ui'],
        }}
      >
        <ShadcnSheetDescription ref={ref} {...props}>
          {children}
        </ShadcnSheetDescription>
      </Container>
    );
  }

  return (
    <ShadcnSheetDescription ref={ref} {...props}>
      {children}
    </ShadcnSheetDescription>
  );
});

SheetDescription.displayName = 'DevSheetDescription';