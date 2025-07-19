import React from 'react';
import { 
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableRow as ShadcnTableRow,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption
} from '../../../components/ui/table';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevTableProps extends React.HTMLAttributes<HTMLTableElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, DevTableProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `table-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Table',
          description: devDescription || 'A data table component',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'ui',
          semanticTags: ['table', 'data', 'grid', 'ui'],
        }}
      >
        <ShadcnTable ref={ref} {...props} />
      </Container>
    );
  }
);

Table.displayName = 'DevTable';

// Export other table components without dev wrapping
export const TableHeader = ShadcnTableHeader;
export const TableBody = ShadcnTableBody;
export const TableFooter = ShadcnTableFooter;
export const TableHead = ShadcnTableHead;
export const TableRow = ShadcnTableRow;
export const TableCell = ShadcnTableCell;
export const TableCaption = ShadcnTableCaption;

export { type DevTableProps };
