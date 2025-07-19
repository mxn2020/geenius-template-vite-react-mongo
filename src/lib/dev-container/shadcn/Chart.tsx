// src/lib/dev-container/shadcn/Chart.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  ChartContainer as ShadcnChartContainer,
  ChartTooltip as ShadcnChartTooltip,
  ChartTooltipContent as ShadcnChartTooltipContent,
  ChartLegend as ShadcnChartLegend,
  ChartLegendContent as ShadcnChartLegendContent,
  ChartStyle as ShadcnChartStyle,
  type ChartConfig
} from '../../../components/ui/chart';

type ShadcnChartContainerProps = React.ComponentPropsWithoutRef<typeof ShadcnChartContainer>;
type ShadcnChartTooltipContentProps = React.ComponentPropsWithoutRef<typeof ShadcnChartTooltipContent>;
type ShadcnChartLegendContentProps = React.ComponentPropsWithoutRef<typeof ShadcnChartLegendContent>;

type DevChartContainerProps = ShadcnChartContainerProps & DevProps;
type DevChartTooltipContentProps = ShadcnChartTooltipContentProps & DevProps;
type DevChartLegendContentProps = ShadcnChartLegendContentProps & DevProps;

export const ChartContainer = React.forwardRef<
  React.ElementRef<typeof ShadcnChartContainer>,
  DevChartContainerProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `chart-container-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ChartContainer',
        description: devDescription || 'Container for chart components',
        filePath: 'src/lib/dev-container/shadcn/Chart.tsx',
        category: 'data-display',
        semanticTags: ['chart', 'container', 'data-display', 'ui'],
      }}
    >
      <ShadcnChartContainer ref={ref} {...props} />
    </Container>
  );
});

ChartContainer.displayName = 'DevChartContainer';

export const ChartTooltipContent = React.forwardRef<
  React.ElementRef<typeof ShadcnChartTooltipContent>,
  DevChartTooltipContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `chart-tooltip-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ChartTooltipContent',
          description: devDescription || 'Tooltip content for chart data',
          filePath: 'src/lib/dev-container/shadcn/Chart.tsx',
          category: 'data-display',
          semanticTags: ['chart', 'tooltip', 'content', 'data-display', 'ui'],
        }}
      >
        <ShadcnChartTooltipContent ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnChartTooltipContent ref={ref} {...props} />;
});

ChartTooltipContent.displayName = 'DevChartTooltipContent';

export const ChartLegendContent = React.forwardRef<
  React.ElementRef<typeof ShadcnChartLegendContent>,
  DevChartLegendContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `chart-legend-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ChartLegendContent',
          description: devDescription || 'Legend content for chart data',
          filePath: 'src/lib/dev-container/shadcn/Chart.tsx',
          category: 'data-display',
          semanticTags: ['chart', 'legend', 'content', 'data-display', 'ui'],
        }}
      >
        <ShadcnChartLegendContent ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnChartLegendContent ref={ref} {...props} />;
});

ChartLegendContent.displayName = 'DevChartLegendContent';

// Export primitive components and types that don't need containerization
export const ChartTooltip = ShadcnChartTooltip;
export const ChartLegend = ShadcnChartLegend;
export const ChartStyle = ShadcnChartStyle;
export type { ChartConfig };