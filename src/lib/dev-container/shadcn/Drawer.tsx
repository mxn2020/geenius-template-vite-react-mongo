// src/lib/dev-container/shadcn/Drawer.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Drawer as ShadcnDrawer,
  DrawerPortal as ShadcnDrawerPortal,
  DrawerOverlay as ShadcnDrawerOverlay,
  DrawerTrigger as ShadcnDrawerTrigger,
  DrawerClose as ShadcnDrawerClose,
  DrawerContent as ShadcnDrawerContent,
  DrawerHeader as ShadcnDrawerHeader,
  DrawerFooter as ShadcnDrawerFooter,
  DrawerTitle as ShadcnDrawerTitle,
  DrawerDescription as ShadcnDrawerDescription,
} from '../../../components/ui/drawer';

// Drawer is a function component, others are forwardRef based on implementation
export const Drawer = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: React.ComponentProps<typeof ShadcnDrawer> & DevProps & { children?: React.ReactNode }) => {
  const componentId = devId || `drawer-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Drawer',
        description: devDescription || 'Bottom sheet drawer component',
        filePath: 'src/lib/dev-container/shadcn/Drawer.tsx',
        category: 'overlay',
        semanticTags: ['drawer', 'sheet', 'overlay', 'mobile', 'ui'],
      }}
    >
      <ShadcnDrawer {...props}>
        {children}
      </ShadcnDrawer>
    </Container>
  );
};

Drawer.displayName = 'DevDrawer';

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDrawerContent>,<
  React.ComponentPropsWithoutRef<typeof ShadcnDrawerContent> & DevProps & { children?: React.ReactNode }
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `drawer-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'DrawerContent',
        description: devDescription || 'Content area of drawer',
        filePath: 'src/lib/dev-container/shadcn/Drawer.tsx',
        category: 'layout',
        semanticTags: ['drawer', 'content', 'layout', 'ui'],
      }}
    >
      <ShadcnDrawerContent ref={ref} {...props}>
        {children}
      </ShadcnDrawerContent>
    </Container>
  );
});

DrawerContent.displayName = 'DevDrawerContent';

// Export primitives that don't need containerization
export const DrawerTrigger = ShadcnDrawerTrigger;
export const DrawerPortal = ShadcnDrawerPortal;
export const DrawerClose = ShadcnDrawerClose;