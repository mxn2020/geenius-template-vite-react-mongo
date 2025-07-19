// src/lib/dev-container/shadcn/Input.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Input as ShadcnInput } from '../../../components/ui/input';

// Input component
type ShadcnInputProps = React.ComponentPropsWithoutRef<typeof ShadcnInput>;
type DevInputProps = ShadcnInputProps & DevProps;

export const Input = React.forwardRef<
  React.ElementRef<typeof ShadcnInput>,
  DevInputProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `input-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Input',
          description: devDescription || 'Standard text input field',
          filePath: 'src/lib/dev-container/shadcn/Input.tsx',
          category: 'form',
          semanticTags: ['input', 'form', 'text', 'field', 'ui'],
        }}
      >
        <ShadcnInput ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnInput ref={ref} {...props} />;
});

Input.displayName = 'DevInput';
