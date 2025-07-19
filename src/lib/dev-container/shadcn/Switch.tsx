// src/lib/dev-container/shadcn/Switch.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Switch as ShadcnSwitch } from '../../../components/ui/switch';

// Switch component
type ShadcnSwitchProps = React.ComponentPropsWithoutRef<typeof ShadcnSwitch>;
type DevSwitchProps = ShadcnSwitchProps & DevProps;

export const Switch = React.forwardRef<
  React.ElementRef<typeof ShadcnSwitch>,
  DevSwitchProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `switch-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Switch',
          description: devDescription || 'Toggle switch component',
          filePath: 'src/lib/dev-container/shadcn/Switch.tsx',
          category: 'form',
          semanticTags: ['switch', 'toggle', 'form', 'input', 'ui'],
        }}
      >
        <ShadcnSwitch ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnSwitch ref={ref} {...props} />;
});

Switch.displayName = 'DevSwitch';