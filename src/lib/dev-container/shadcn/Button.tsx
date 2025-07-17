import React from 'react';
import { ButtonProps, Button as ShadcnButton } from '../../../components/ui/button';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevButtonProps extends ButtonProps {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, DevButtonProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `button-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Button',
          description: devDescription || 'A clickable button component',
          filePath: 'src/lib/dev-container/shadcn/Button.tsx',
          category: 'ui',
          semanticTags: ['button', 'action', 'click', 'ui'],
        }}
      >
        <ShadcnButton ref={ref} {...props}>
          {children}
        </ShadcnButton>
      </Container>
    );
  }
);

Button.displayName = 'DevButton';

export { type DevButtonProps };