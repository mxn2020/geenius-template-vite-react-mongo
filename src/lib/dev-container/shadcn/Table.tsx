// src/lib/dev-container/shadcn/Table.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

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
      <ShadcnTable ref={ref} {...props}>
        {children}
      </ShadcnTable>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
      <ShadcnTableHeader ref={ref} {...props}>
        {children}
      </ShadcnTableHeader>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableHeader.displayName = 'DevTableHeader';

// TableBody component
type ShadcnTableBodyProps = React.ComponentPropsWithoutRef<typeof ShadcnTableBody>;
type DevTableBodyProps = ShadcnTableBodyProps & DevProps & { children?: React.ReactNode };

export const TableBody = React.forwardRef<
  React.ElementRef<typeof ShadcnTableBody>,
  DevTableBodyProps
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
      <ShadcnTableBody ref={ref} {...props}>
        {children}
      </ShadcnTableBody>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableBody.displayName = 'DevTableBody';

// TableFooter component
type ShadcnTableFooterProps = React.ComponentPropsWithoutRef<typeof ShadcnTableFooter>;
type DevTableFooterProps = ShadcnTableFooterProps & DevProps & { children?: React.ReactNode };

export const TableFooter = React.forwardRef<
  React.ElementRef<typeof ShadcnTableFooter>,
  DevTableFooterProps
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
      <ShadcnTableFooter ref={ref} {...props}>
        {children}
      </ShadcnTableFooter>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableFooter.displayName = 'DevTableFooter';

// TableRow component
type ShadcnTableRowProps = React.ComponentPropsWithoutRef<typeof ShadcnTableRow>;
type DevTableRowProps = ShadcnTableRowProps & DevProps & { children?: React.ReactNode };

export const TableRow = React.forwardRef<
  React.ElementRef<typeof ShadcnTableRow>,
  DevTableRowProps
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
      <ShadcnTableRow ref={ref} {...props}>
        {children}
      </ShadcnTableRow>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableRow.displayName = 'DevTableRow';

// TableHead component
type ShadcnTableHeadProps = React.ComponentPropsWithoutRef<typeof ShadcnTableHead>;
type DevTableHeadProps = ShadcnTableHeadProps & DevProps & { children?: React.ReactNode };

export const TableHead = React.forwardRef<
  React.ElementRef<typeof ShadcnTableHead>,
  DevTableHeadProps
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
      <ShadcnTableHead ref={ref} {...props}>
        {children}
      </ShadcnTableHead>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableHead.displayName = 'DevTableHead';

// TableCell component
type ShadcnTableCellProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCell>;
type DevTableCellProps = ShadcnTableCellProps & DevProps & { children?: React.ReactNode };

export const TableCell = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCell>,
  DevTableCellProps
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
      <ShadcnTableCell ref={ref} {...props}>
        {children}
      </ShadcnTableCell>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableCell.displayName = 'DevTableCell';

// TableCaption component
type ShadcnTableCaptionProps = React.ComponentPropsWithoutRef<typeof ShadcnTableCaption>;
type DevTableCaptionProps = ShadcnTableCaptionProps & DevProps & { children?: React.ReactNode };

export const TableCaption = React.forwardRef<
  React.ElementRef<typeof ShadcnTableCaption>,
  DevTableCaptionProps
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
      <ShadcnTableCaption ref={ref} {...props}>
        {children}
      </ShadcnTableCaption>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

TableCaption.displayName = 'DevTableCaption';