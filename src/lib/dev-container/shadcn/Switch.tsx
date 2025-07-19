import React from 'react';
import { Switch as ShadcnSwitch } from '../../../components/ui/switch';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSwitchProps extends React.ComponentPropsWithoutRef<typeof ShadcnSwitch> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof ShadcnSwitch>,
  DevSwitchProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `switch-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Switch',
        description: devDescription || 'A switch toggle component',
        filePath: 'src/lib/dev-container/shadcn/Switch.tsx',
        category: 'ui',
        semanticTags: ['switch', 'toggle', 'form', 'ui'],
      }}
    >
      <ShadcnSwitch ref={ref} {...props} />
    </Container>
  );
});

Switch.displayName = 'DevSwitch';

export { type DevSwitchProps };
