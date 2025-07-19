import React from 'react';
import { Textarea as ShadcnTextarea } from '../../../components/ui/textarea';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, DevTextareaProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `textarea-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Textarea',
          description: devDescription || 'A textarea input component',
          filePath: 'src/lib/dev-container/shadcn/Textarea.tsx',
          category: 'ui',
          semanticTags: ['textarea', 'form', 'input', 'ui'],
        }}
      >
        <ShadcnTextarea ref={ref} {...props} />
      </Container>
    );
  }
);

Textarea.displayName = 'DevTextarea';

export { type DevTextareaProps };