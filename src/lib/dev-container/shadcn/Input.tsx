import React from 'react';
import { Input as ShadcnInput } from '../../../components/ui/input';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, DevInputProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `input-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Input',
          description: devDescription || 'An input field component',
          filePath: 'src/lib/dev-container/shadcn/Input.tsx',
          category: 'ui',
          semanticTags: ['input', 'form', 'field', 'ui'],
        }}
      >
        <ShadcnInput ref={ref} {...props} />
      </Container>
    );
  }
);

Input.displayName = 'DevInput';

export { type DevInputProps };