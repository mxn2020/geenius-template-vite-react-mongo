import React from 'react';
import { 
  Popover as ShadcnPopover,
  PopoverTrigger as ShadcnPopoverTrigger,
  PopoverContent as ShadcnPopoverContent,
  PopoverAnchor as ShadcnPopoverAnchor
} from '../../../components/ui/popover';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevPopoverProps extends React.ComponentProps<typeof ShadcnPopover> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Popover = React.forwardRef<
  React.ElementRef<typeof ShadcnPopover>,
  DevPopoverProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `popover-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Popover',
        description: devDescription || 'A popover overlay component',
        filePath: 'src/lib/dev-container/shadcn/Popover.tsx',
        category: 'ui',
        semanticTags: ['popover', 'tooltip', 'overlay', 'ui'],
      }}
    >
      <ShadcnPopover ref={ref} {...props} />
    </Container>
  );
});

Popover.displayName = 'DevPopover';

// Export other popover components without dev wrapping
export const PopoverTrigger = ShadcnPopoverTrigger;
export const PopoverContent = ShadcnPopoverContent;
export const PopoverAnchor = ShadcnPopoverAnchor;

export { type DevPopoverProps };
