// src/lib/dev-container/shadcn/Pagination.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationLink as ShadcnPaginationLink,
  PaginationItem as ShadcnPaginationItem,
  PaginationPrevious as ShadcnPaginationPrevious,
  PaginationNext as ShadcnPaginationNext,
  PaginationEllipsis as ShadcnPaginationEllipsis,
} from '../../../components/ui/pagination';

// Pagination root component
type ShadcnPaginationProps = React.ComponentPropsWithoutRef<typeof ShadcnPagination>;
type DevPaginationProps = ShadcnPaginationProps & DevProps & { children?: React.ReactNode };

export const Pagination = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevPaginationProps) => {
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
      <ShadcnPagination {...props}>
        {children}
      </ShadcnPagination>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'Pagination',
        description: devDescription || 'Pagination navigation component',
        filePath: 'src/lib/dev-container/shadcn/Pagination.tsx',
        category: 'navigation',
        semanticTags: ['pagination', 'navigation', 'pages', 'ui'],
      }}
    >
      <ShadcnPagination {...props}>
        {children}
      </ShadcnPagination>
    </Container>
  );
};

Pagination.displayName = 'DevPagination';

// PaginationContent component
type ShadcnPaginationContentProps = React.ComponentPropsWithoutRef<typeof ShadcnPaginationContent>;
type DevPaginationContentProps = ShadcnPaginationContentProps & DevProps & { children?: React.ReactNode };

export const PaginationContent = React.forwardRef<
  React.ElementRef<typeof ShadcnPaginationContent>,
  DevPaginationContentProps
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
      <ShadcnPaginationContent ref={ref} {...props}>
        {children}
      </ShadcnPaginationContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'PaginationContent',
        description: devDescription || 'Container for pagination items',
        filePath: 'src/lib/dev-container/shadcn/Pagination.tsx',
        category: 'navigation',
        semanticTags: ['pagination', 'content', 'container', 'ui'],
      }}
    >
      <ShadcnPaginationContent ref={ref} {...props}>
        {children}
      </ShadcnPaginationContent>
    </Container>
  );
});

PaginationContent.displayName = 'DevPaginationContent';

// Export other pagination components with containerization
export const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li"> & DevProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
        <ShadcnPaginationItem ref={ref} {...props}>
          {children}
        </ShadcnPaginationItem>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'PaginationItem',
          description: devDescription || 'Pagination list item',
          filePath: 'src/lib/dev-container/shadcn/Pagination.tsx',
          category: 'navigation',
          semanticTags: ['pagination', 'item', 'list', 'ui'],
        }}
      >
        <ShadcnPaginationItem ref={ref} {...props}>
          {children}
        </ShadcnPaginationItem>
      </Container>
    );
  }
);

PaginationItem.displayName = 'DevPaginationItem';

// Continue with other pagination components...
export { ShadcnPaginationLink as PaginationLink, ShadcnPaginationPrevious as PaginationPrevious, ShadcnPaginationNext as PaginationNext, ShadcnPaginationEllipsis as PaginationEllipsis };

