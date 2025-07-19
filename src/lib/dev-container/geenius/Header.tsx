import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevHeaderProps extends React.HTMLAttributes<HTMLElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Header = React.forwardRef<HTMLElement, DevHeaderProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `header-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Header',
          description: devDescription || 'A header element',
          filePath: 'src/lib/dev-container/geenius/Header.tsx',
          category: 'layout',
          semanticTags: ['header', 'navigation', 'layout', 'semantic'],
        }}
      >
        <header ref={ref} {...props}>
          {children}
        </header>
      </Container>
    );
  }
);

Header.displayName = 'DevHeader';

export { type DevHeaderProps };