// src/lib/dev-container/shadcn/Resizable.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  ResizablePanelGroup as ShadcnResizablePanelGroup,
  ResizablePanel as ShadcnResizablePanel,
  ResizableHandle as ShadcnResizableHandle,
} from '../../../components/ui/resizable';

// ResizablePanelGroup component
type ShadcnResizablePanelGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnResizablePanelGroup>;
type DevResizablePanelGroupProps = ShadcnResizablePanelGroupProps & DevProps & { children?: React.ReactNode };

export const ResizablePanelGroup = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevResizablePanelGroupProps) => {
  const componentId = devId || `resizable-panel-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ResizablePanelGroup',
        description: devDescription || 'Resizable panel group container',
        filePath: 'src/lib/dev-container/shadcn/Resizable.tsx',
        category: 'layout',
        semanticTags: ['resizable', 'panel', 'group', 'layout', 'ui'],
      }}
    >
      <ShadcnResizablePanelGroup {...props}>
        {children}
      </ShadcnResizablePanelGroup>
    </Container>
  );
};

ResizablePanelGroup.displayName = 'DevResizablePanelGroup';

// ResizablePanel component
export const ResizablePanel = ShadcnResizablePanel;

// ResizableHandle component
export const ResizableHandle = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }: React.ComponentPropsWithoutRef<typeof ShadcnResizableHandle> & DevProps) => {
  const componentId = devId || `resizable-handle-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ResizableHandle',
          description: devDescription || 'Handle for resizing panels',
          filePath: 'src/lib/dev-container/shadcn/Resizable.tsx',
          category: 'layout',
          semanticTags: ['resizable', 'handle', 'interactive', 'ui'],
        }}
      >
        <ShadcnResizableHandle {...props} />
      </Container>
    );
  }

  return <ShadcnResizableHandle {...props} />;
};

ResizableHandle.displayName = 'DevResizableHandle';

