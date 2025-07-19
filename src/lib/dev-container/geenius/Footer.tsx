import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevFooterProps extends React.HTMLAttributes<HTMLElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Footer = React.forwardRef<HTMLElement, DevFooterProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `footer-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Footer',
          description: devDescription || 'A footer element',
          filePath: 'src/lib/dev-container/geenius/Footer.tsx',
          category: 'layout',
          semanticTags: ['footer', 'navigation', 'layout', 'semantic'],
        }}
      >
        <footer ref={ref} {...props}>
          {children}
        </footer>
      </Container>
    );
  }
);

Footer.displayName = 'DevFooter';

export { type DevFooterProps };