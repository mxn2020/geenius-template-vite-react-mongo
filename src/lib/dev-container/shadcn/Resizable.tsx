import React from 'react';
import { ResizablePanelGroup as ShadcnResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../../components/ui/resizable';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevResizablePanelGroupProps extends React.ComponentProps<typeof ShadcnResizablePanelGroup> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const ResizablePanelGroup = React.forwardRef<
  HTMLDivElement,
  DevResizablePanelGroupProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `resizable-panel-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ResizablePanelGroup',
        description: devDescription || 'A resizable panel component',
        filePath: 'src/lib/dev-container/shadcn/Resizable.tsx',
        category: 'ui',
        semanticTags: ['resizable', 'layout', 'panel', 'ui'],
      }}
    >
      <ShadcnResizablePanelGroup ref={ref} {...props} />
    </Container>
  );
});

ResizablePanelGroup.displayName = 'DevResizablePanelGroup';

export { ResizablePanel, ResizableHandle, type DevResizablePanelGroupProps };
