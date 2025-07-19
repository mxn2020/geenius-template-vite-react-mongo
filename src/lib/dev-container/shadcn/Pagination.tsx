import React from 'react';
import { 
  Pagination as ShadcnPagination,
  PaginationContent as ShadcnPaginationContent,
  PaginationEllipsis as ShadcnPaginationEllipsis,
  PaginationItem as ShadcnPaginationItem,
  PaginationLink as ShadcnPaginationLink,
  PaginationNext as ShadcnPaginationNext,
  PaginationPrevious as ShadcnPaginationPrevious
} from '../../../components/ui/pagination';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevPaginationProps extends React.ComponentProps<"nav"> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Pagination = React.forwardRef<HTMLElement, DevPaginationProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `pagination-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Pagination',
          description: devDescription || 'A pagination navigation component',
          filePath: 'src/lib/dev-container/shadcn/Pagination.tsx',
          category: 'ui',
          semanticTags: ['pagination', 'navigation', 'pages', 'ui'],
        }}
      >
        <ShadcnPagination ref={ref} {...props} />
      </Container>
    );
  }
);

Pagination.displayName = 'DevPagination';

// Export other pagination components without dev wrapping
export const PaginationContent = ShadcnPaginationContent;
export const PaginationEllipsis = ShadcnPaginationEllipsis;
export const PaginationItem = ShadcnPaginationItem;
export const PaginationLink = ShadcnPaginationLink;
export const PaginationNext = ShadcnPaginationNext;
export const PaginationPrevious = ShadcnPaginationPrevious;

export { type DevPaginationProps };
