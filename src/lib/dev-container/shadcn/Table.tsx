// src/lib/dev-container/shadcn/Table.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Table as ShadcnTable,
  TableHeader as ShadcnTableHeader,
  TableBody as ShadcnTableBody,
  TableFooter as ShadcnTableFooter,
  TableHead as ShadcnTableHead,
  TableRow as ShadcnTableRow,
  TableCell as ShadcnTableCell,
  TableCaption as ShadcnTableCaption,
} from '../../../components/ui/table';

// Table root component
type ShadcnTableProps = React.ComponentPropsWithoutRef<typeof ShadcnTable>;
type DevTableProps = ShadcnTableProps & DevProps & { children?: React.ReactNode };

export const Table = React.forwardRef<
  React.ElementRef<typeof ShadcnTable>,
  DevTableProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `table-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Table',
        description: devDescription || 'Table root component',
        filePath: 'src/lib/dev-container/shadcn/Table.tsx',
        category: 'data-display',
        semanticTags: ['table', 'data', 'grid', 'ui'],
      }}
    >
      <ShadcnTable ref={ref} {...props}>
        {children}
      </ShadcnTable>
    </Container>
  );
});

Table.displayName = 'DevTable';

// TableHeader component
type ShadcnTableHeaderProps = React.ComponentPropsWithoutRef<typeof ShadcnTableHeader>;
type DevTableHeaderProps = ShadcnTableHeaderProps & DevProps & { children?: React.ReactNode };

export const TableHeader = React.forwardRef<
  React.ElementRef<typeof ShadcnTableHeader>,
  DevTableHeaderProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-header-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableHeader',
          description: devDescription || 'Table header section',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'header', 'thead', 'ui'],
        }}
      >
        <ShadcnTableHeader ref={ref} {...props}>
          {children}
        </ShadcnTableHeader>
      </Container>
    );
  }

  return (
    <ShadcnTableHeader ref={ref} {...props}>
      {children}
    </ShadcnTableHeader>
  );
});

TableHeader.displayName = 'DevTableHeader';

// TableBody component
type ShadcnTableBodyProps = React.ComponentPropsWithoutRef<typeof ShadcnTableBody>;
type DevTableBodyProps = ShadcnTableBodyProps & DevProps & { children?: React.ReactNode };

export const TableBody = React.forwardRef<
  React.ElementRef<typeof ShadcnTableBody>,
  DevTableBodyProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-body-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableBody',
          description: devDescription || 'Table body section',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'body', 'tbody', 'ui'],
        }}
      >
        <ShadcnTableBody ref={ref} {...props}>
          {children}
        </ShadcnTableBody>
      </Container>
    );
  }

  return (
    <ShadcnTableBody ref={ref} {...props}>
      {children}
    </ShadcnTableBody>
  );
});

TableBody.displayName = 'DevTableBody';

// TableFooter component
type ShadcnTableFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnTableFooter>;
type DevTableFooterProps = ShadcnTableFooterProps & DevProps & { children?: React.ReactNode };

export const TableFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnTableFooter>,
  DevTableFooterProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-footer-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableFooter',
          description: devDescription || 'Table footer section',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'footer', 'tfoot', 'ui'],
        }}
      >
        <ShadcnTableFooter ref={ref} {...props}>
          {children}
        </ShadcnTableFooter>
      </Container>
    );
  }

  return (
    <ShadcnTableFooter ref={ref} {...props}>
      {children}
    </ShadcnTableFooter>
  );
});

TableFooter.displayName = 'DevTableFooter';

// TableRow component
type ShadcnTableRowProps = React.ComponentPropsWithoutRef<typeof ShadcnTableRow>;
type DevTableRowProps = ShadcnTableRowProps & DevProps & { children?: React.ReactNode };

export const TableRow = React.forwardRef<
  React.ElementRef<typeof ShadcnTableRow>,
  DevTableRowProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-row-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableRow',
          description: devDescription || 'Table row element',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'row', 'tr', 'ui'],
        }}
      >
        <ShadcnTableRow ref={ref} {...props}>
          {children}
        </ShadcnTableRow>
      </Container>
    );
  }

  return (
    <ShadcnTableRow ref={ref} {...props}>
      {children}
    </ShadcnTableRow>
  );
});

TableRow.displayName = 'DevTableRow';

// TableHead component
type ShadcnTableHeadProps = React.ComponentPropsWithoutRef<typeof ShadcnTableHead>;
type DevTableHeadProps = ShadcnTableHeadProps & DevProps & { children?: React.ReactNode };

export const TableHead = React.forwardRef<
  React.ElementRef<typeof ShadcnTableHead>,
  DevTableHeadProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-head-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableHead',
          description: devDescription || 'Table header cell',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'head', 'th', 'cell', 'ui'],
        }}
      >
        <ShadcnTableHead ref={ref} {...props}>
          {children}
        </ShadcnTableHead>
      </Container>
    );
  }

  return (
    <ShadcnTableHead ref={ref} {...props}>
      {children}
    </ShadcnTableHead>
  );
});

TableHead.displayName = 'DevTableHead';

// TableCell component
type ShadcnTableCellProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCell>;
type DevTableCellProps = ShadcnTableCellProps & DevProps & { children?: React.ReactNode };

export const TableCell = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCell>,
  DevTableCellProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-cell-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableCell',
          description: devDescription || 'Table data cell',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'cell', 'td', 'data', 'ui'],
        }}
      >
        <ShadcnTableCell ref={ref} {...props}>
          {children}
        </ShadcnTableCell>
      </Container>
    );
  }

  return (
    <ShadcnTableCell ref={ref} {...props}>
      {children}
    </ShadcnTableCell>
  );
});

TableCell.displayName = 'DevTableCell';

// TableCaption component
type ShadcnTableCaptionProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCaption>;
type DevTableCaptionProps = ShadcnTableCaptionProps & DevProps & { children?: React.ReactNode };

export const TableCaption = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCaption>,
  DevTableCaptionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `table-caption-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'TableCaption',
          description: devDescription || 'Table caption element',
          filePath: 'src/lib/dev-container/shadcn/Table.tsx',
          category: 'data-display',
          semanticTags: ['table', 'caption', 'title', 'ui'],
        }}
      >
        <ShadcnTableCaption ref={ref} {...props}>
          {children}
        </ShadcnTableCaption>
      </Container>
    );
  }

  return (
    <ShadcnTableCaption ref={ref} {...props}>
      {children}
    </ShadcnTableCaption>
  );
});

TableCaption.displayName = 'DevTableCaption';