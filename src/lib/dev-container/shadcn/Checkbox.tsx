// src/lib/dev-container/shadcn/Checkbox.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Checkbox as ShadcnCheckbox } from '../../../components/ui/checkbox';

type ShadcnCheckboxProps = React.ComponentPropsWithoutRef<typeof ShadcnCheckbox>;
type DevCheckboxProps = ShadcnCheckboxProps & DevProps & { children?: React.ReactNode };

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof ShadcnCheckbox>,
  DevCheckboxProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `checkbox-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Checkbox',
        description: devDescription || 'Checkbox input component',
        filePath: 'src/lib/dev-container/shadcn/Checkbox.tsx',
        category: 'form',
        semanticTags: ['checkbox', 'input', 'form', 'interactive', 'ui'],
      }}
    >
      <ShadcnCheckbox ref={ref} {...props}>
        {children}
      </ShadcnCheckbox>
    </Container>
  );
});

Checkbox.displayName = 'DevCheckbox';

