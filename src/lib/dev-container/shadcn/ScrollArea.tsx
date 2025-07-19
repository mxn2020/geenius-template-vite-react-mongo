import React from 'react';
import { 
  ScrollArea as ShadcnScrollArea,
  ScrollBar as ShadcnScrollBar
} from '../../../components/ui/scroll-area';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ShadcnScrollArea> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ShadcnScrollArea>,
  DevScrollAreaProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `scroll-area-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ScrollArea',
        description: devDescription || 'A scrollable area container component',
        filePath: 'src/lib/dev-container/shadcn/ScrollArea.tsx',
        category: 'ui',
        semanticTags: ['scroll', 'area', 'overflow', 'ui'],
      }}
    >
      <ShadcnScrollArea ref={ref} {...props} />
    </Container>
  );
});

ScrollArea.displayName = 'DevScrollArea';

// Export ScrollBar without dev wrapping
export const ScrollBar = ShadcnScrollBar;

export { type DevScrollAreaProps };
