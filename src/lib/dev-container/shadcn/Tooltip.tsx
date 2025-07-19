import React from 'react';
import { 
  Tooltip as ShadcnTooltip,
  TooltipTrigger as ShadcnTooltipTrigger,
  TooltipContent as ShadcnTooltipContent,
  TooltipProvider as ShadcnTooltipProvider
} from '../../../components/ui/tooltip';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevTooltipProps extends React.ComponentProps<typeof ShadcnTooltip> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Tooltip = React.forwardRef<
  React.ElementRef<typeof ShadcnTooltip>,
  DevTooltipProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `tooltip-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Tooltip',
        description: devDescription || 'A tooltip component for hints and information',
        filePath: 'src/lib/dev-container/shadcn/Tooltip.tsx',
        category: 'ui',
        semanticTags: ['tooltip', 'hint', 'overlay', 'ui'],
      }}
    >
      <ShadcnTooltip ref={ref} {...props} />
    </Container>
  );
});

Tooltip.displayName = 'DevTooltip';

// Export other tooltip components without dev wrapping
export const TooltipTrigger = ShadcnTooltipTrigger;
export const TooltipContent = ShadcnTooltipContent;
export const TooltipProvider = ShadcnTooltipProvider;

export { type DevTooltipProps };
