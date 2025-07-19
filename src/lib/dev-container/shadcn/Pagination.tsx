// src/lib/dev-container/shadcn/Pagination.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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

export const Pagination = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevPaginationProps) => {
  const componentId = devId || `pagination-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `pagination-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnPaginationContent ref={ref} {...props}>
      {children}
    </ShadcnPaginationContent>
  );
});

PaginationContent.displayName = 'DevPaginationContent';

// Export other pagination components with containerization
export const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li"> & DevProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
    const componentId = devId || `pagination-item-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
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

    return (
      <ShadcnPaginationItem ref={ref} {...props}>
        {children}
      </ShadcnPaginationItem>
    );
  }
);

PaginationItem.displayName = 'DevPaginationItem';

// Continue with other pagination components...
export { ShadcnPaginationLink as PaginationLink, ShadcnPaginationPrevious as PaginationPrevious, ShadcnPaginationNext as PaginationNext, ShadcnPaginationEllipsis as PaginationEllipsis };

