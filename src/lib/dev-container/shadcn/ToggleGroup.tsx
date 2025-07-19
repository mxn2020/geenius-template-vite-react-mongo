import React from 'react';
import { ToggleGroup as ShadcnToggleGroup, ToggleGroupItem } from '../../../components/ui/toggle-group';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevToggleGroupProps extends React.ComponentPropsWithoutRef<typeof ShadcnToggleGroup> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnToggleGroup>,
  DevToggleGroupProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `toggle-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ToggleGroup',
        description: devDescription || 'A toggle group component',
        filePath: 'src/lib/dev-container/shadcn/ToggleGroup.tsx',
        category: 'ui',
        semanticTags: ['toggle', 'group', 'selection', 'ui'],
      }}
    >
      <ShadcnToggleGroup ref={ref} {...props} />
    </Container>
  );
});

ToggleGroup.displayName = 'DevToggleGroup';

export { ToggleGroupItem, type DevToggleGroupProps };
