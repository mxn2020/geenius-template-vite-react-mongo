// src/lib/dev-container/shadcn/Breadcrumb.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList as ShadcnBreadcrumbList,
  BreadcrumbItem as ShadcnBreadcrumbItem,
  BreadcrumbLink as ShadcnBreadcrumbLink,
  BreadcrumbPage as ShadcnBreadcrumbPage,
  BreadcrumbSeparator as ShadcnBreadcrumbSeparator,
  BreadcrumbEllipsis as ShadcnBreadcrumbEllipsis,
} from '../../../components/ui/breadcrumb';

type ShadcnBreadcrumbProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumb>;
type ShadcnBreadcrumbListProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbList>;
type ShadcnBreadcrumbItemProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbItem>;
type ShadcnBreadcrumbLinkProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbLink>;
type ShadcnBreadcrumbPageProps = React.ComponentPropsWithoutRef<typeof ShadcnBreadcrumbPage>;

type DevBreadcrumbProps = ShadcnBreadcrumbProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbListProps = ShadcnBreadcrumbListProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbItemProps = ShadcnBreadcrumbItemProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbLinkProps = ShadcnBreadcrumbLinkProps & DevProps & { children?: React.ReactNode };
type DevBreadcrumbPageProps = ShadcnBreadcrumbPageProps & DevProps & { children?: React.ReactNode };

export const Breadcrumb = React.forwardRef<
  HTMLElement,
  DevBreadcrumbProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Breadcrumb',
        description: devDescription || 'Navigation breadcrumb showing current page location',
        filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
        category: 'navigation',
        semanticTags: ['breadcrumb', 'navigation', 'hierarchy', 'ui'],
      }}
    >
      <ShadcnBreadcrumb ref={ref} {...props}>
        {children}
      </ShadcnBreadcrumb>
    </Container>
  );
});

Breadcrumb.displayName = 'DevBreadcrumb';

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  DevBreadcrumbListProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-list-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbList',
          description: devDescription || 'Ordered list containing breadcrumb items',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'list', 'navigation', 'ui'],
        }}
      >
        <ShadcnBreadcrumbList ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbList>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbList ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbList>
  );
});

BreadcrumbList.displayName = 'DevBreadcrumbList';

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  DevBreadcrumbItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbItem',
          description: devDescription || 'Individual item in the breadcrumb navigation',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'item', 'navigation', 'ui'],
        }}
      >
        <ShadcnBreadcrumbItem ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbItem>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbItem ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbItem>
  );
});

BreadcrumbItem.displayName = 'DevBreadcrumbItem';

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  DevBreadcrumbLinkProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-link-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbLink',
          description: devDescription || 'Clickable link in breadcrumb navigation',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'link', 'navigation', 'interactive', 'ui'],
        }}
      >
        <ShadcnBreadcrumbLink ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbLink>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbLink ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbLink>
  );
});

BreadcrumbLink.displayName = 'DevBreadcrumbLink';

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  DevBreadcrumbPageProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-page-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbPage',
          description: devDescription || 'Current page indicator in breadcrumb navigation',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'page', 'current', 'navigation', 'ui'],
        }}
      >
        <ShadcnBreadcrumbPage ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbPage>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbPage ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbPage>
  );
});

BreadcrumbPage.displayName = 'DevBreadcrumbPage';

// Containerize separator and ellipsis too
type DevBreadcrumbSeparatorProps = React.ComponentProps<"li"> & DevProps & { children?: React.ReactNode };
type DevBreadcrumbEllipsisProps = React.ComponentProps<"span"> & DevProps & { children?: React.ReactNode };

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  DevBreadcrumbSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbSeparator',
          description: devDescription || 'Visual separator between breadcrumb items',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'separator', 'visual', 'ui'],
        }}
      >
        <ShadcnBreadcrumbSeparator ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbSeparator>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbSeparator ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbSeparator>
  );
});

BreadcrumbSeparator.displayName = 'DevBreadcrumbSeparator';

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLSpanElement,
  DevBreadcrumbEllipsisProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `breadcrumb-ellipsis-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'BreadcrumbEllipsis',
          description: devDescription || 'Ellipsis indicator for collapsed breadcrumb items',
          filePath: 'src/lib/dev-container/shadcn/Breadcrumb.tsx',
          category: 'navigation',
          semanticTags: ['breadcrumb', 'ellipsis', 'collapsed', 'ui'],
        }}
      >
        <ShadcnBreadcrumbEllipsis ref={ref} {...props}>
          {children}
        </ShadcnBreadcrumbEllipsis>
      </Container>
    );
  }

  return (
    <ShadcnBreadcrumbEllipsis ref={ref} {...props}>
      {children}
    </ShadcnBreadcrumbEllipsis>
  );
});

BreadcrumbEllipsis.displayName = 'DevBreadcrumbEllipsis';