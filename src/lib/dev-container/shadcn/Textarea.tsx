// src/lib/dev-container/shadcn/Textarea.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Textarea as ShadcnTextarea } from '../../../components/ui/textarea';

// Textarea component
type ShadcnTextareaProps = React.ComponentPropsWithoutRef<typeof ShadcnTextarea>;
type DevTextareaProps = ShadcnTextareaProps & DevProps;

export const Textarea = React.forwardRef<
  React.ElementRef<typeof ShadcnTextarea>,
  DevTextareaProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `textarea-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Textarea',
          description: devDescription || 'Multi-line text input field',
          filePath: 'src/lib/dev-container/shadcn/Textarea.tsx',
          category: 'form',
          semanticTags: ['textarea', 'input', 'form', 'text', 'ui'],
        }}
      >
        <ShadcnTextarea ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnTextarea ref={ref} {...props} />;
});

Textarea.displayName = 'DevTextarea';

