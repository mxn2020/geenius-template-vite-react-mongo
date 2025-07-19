// src/lib/dev-container/shadcn/Dialog.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Dialog as ShadcnDialog,
  DialogPortal as ShadcnDialogPortal,
  DialogOverlay as ShadcnDialogOverlay,
  DialogTrigger as ShadcnDialogTrigger,
  DialogClose as ShadcnDialogClose,
  DialogContent as ShadcnDialogContent,
  DialogHeader as ShadcnDialogHeader,
  DialogFooter as ShadcnDialogFooter,
  DialogTitle as ShadcnDialogTitle,
  DialogDescription as ShadcnDialogDescription,
} from '../../../components/ui/dialog';

// Based on type definitions: Dialog and DialogPortal are React.FC, others are forwardRef
export const Dialog = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnDialog> & DevProps & { children?: React.ReactNode }) => {
  const componentId = devId || `dialog-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Dialog',
        description: devDescription || 'Modal dialog component',
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

export const DialogPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnDialogPortal> & DevProps & { children?: React.ReactNode }) => {
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

// DialogHeader and DialogFooter are simple function components (not forwardRef)
export const DialogHeader = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: React.HTMLAttributes<HTMLDivElement> & DevProps & { children?: React.ReactNode }) => {
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
          description: devDescription || 'Header section of dialog',
          filePath: 'src/lib/dev-container/shadcn/Dialog.tsx',
          category: 'layout',
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

