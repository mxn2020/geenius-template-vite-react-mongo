import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevNavProps extends React.HTMLAttributes<HTMLElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Nav = React.forwardRef<HTMLElement, DevNavProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `nav-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Nav',
          description: devDescription || 'A navigation element',
          filePath: 'src/lib/dev-container/geenius/Nav.tsx',
          category: 'layout',
          semanticTags: ['nav', 'navigation', 'menu', 'layout', 'semantic'],
        }}
      >
        <nav ref={ref} {...props}>
          {children}
        </nav>
      </Container>
    );
  }
);

Nav.displayName = 'DevNav';

export { type DevNavProps };