// src/lib/dev-container/shadcn/NavigationMenu.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  navigationMenuTriggerStyle,
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuList as ShadcnNavigationMenuList,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuContent as ShadcnNavigationMenuContent,
  NavigationMenuTrigger as ShadcnNavigationMenuTrigger,
  NavigationMenuLink as ShadcnNavigationMenuLink,
  NavigationMenuIndicator as ShadcnNavigationMenuIndicator,
  NavigationMenuViewport as ShadcnNavigationMenuViewport,
} from '../../../components/ui/navigation-menu';

// NavigationMenu root component
type ShadcnNavigationMenuProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenu>;
type DevNavigationMenuProps = ShadcnNavigationMenuProps & DevProps & { children?: React.ReactNode };

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenu>,
  DevNavigationMenuProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'NavigationMenu',
        description: devDescription || 'Navigation menu root component',
        filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
        category: 'navigation',
        semanticTags: ['navigation', 'menu', 'nav', 'ui'],
      }}
    >
      <ShadcnNavigationMenu ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenu>
    </Container>
  );
});

NavigationMenu.displayName = 'DevNavigationMenu';

// NavigationMenuList component
type ShadcnNavigationMenuListProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuList>;
type DevNavigationMenuListProps = ShadcnNavigationMenuListProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuList>,
  DevNavigationMenuListProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-list-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuList',
          description: devDescription || 'List container for navigation menu items',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'list', 'container', 'ui'],
        }}
      >
        <ShadcnNavigationMenuList ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuList>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuList ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuList>
  );
});

NavigationMenuList.displayName = 'DevNavigationMenuList';

// NavigationMenuItem component
type ShadcnNavigationMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuItem>;
type DevNavigationMenuItemProps = ShadcnNavigationMenuItemProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuItem>,
  DevNavigationMenuItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuItem',
          description: devDescription || 'Individual navigation menu item',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnNavigationMenuItem ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuItem>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuItem ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuItem>
  );
});

NavigationMenuItem.displayName = 'DevNavigationMenuItem';

// NavigationMenuTrigger component
type ShadcnNavigationMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuTrigger>;
type DevNavigationMenuTriggerProps = ShadcnNavigationMenuTriggerProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuTrigger>,
  DevNavigationMenuTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuTrigger',
          description: devDescription || 'Button that opens navigation submenu',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnNavigationMenuTrigger ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuTrigger>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuTrigger ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuTrigger>
  );
});

NavigationMenuTrigger.displayName = 'DevNavigationMenuTrigger';

// NavigationMenuContent component
type ShadcnNavigationMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuContent>;
type DevNavigationMenuContentProps = ShadcnNavigationMenuContentProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuContent>,
  DevNavigationMenuContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-content-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuContent',
          description: devDescription || 'Content area for navigation submenu',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'content', 'submenu', 'ui'],
        }}
      >
        <ShadcnNavigationMenuContent ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuContent>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuContent ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuContent>
  );
});

NavigationMenuContent.displayName = 'DevNavigationMenuContent';

// NavigationMenuLink component
type ShadcnNavigationMenuLinkProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuLink>;
type DevNavigationMenuLinkProps = ShadcnNavigationMenuLinkProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuLink>,
  DevNavigationMenuLinkProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-link-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuLink',
          description: devDescription || 'Navigation link component',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'link', 'interactive', 'ui'],
        }}
      >
        <ShadcnNavigationMenuLink ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuLink>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuLink ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuLink>
  );
});

NavigationMenuLink.displayName = 'DevNavigationMenuLink';

// NavigationMenuViewport component
type ShadcnNavigationMenuViewportProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuViewport>;
type DevNavigationMenuViewportProps = ShadcnNavigationMenuViewportProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuViewport>,
  DevNavigationMenuViewportProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-viewport-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuViewport',
          description: devDescription || 'Viewport container for navigation content',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'viewport', 'container', 'ui'],
        }}
      >
        <ShadcnNavigationMenuViewport ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuViewport>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuViewport ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuViewport>
  );
});

NavigationMenuViewport.displayName = 'DevNavigationMenuViewport';

// NavigationMenuIndicator component
type ShadcnNavigationMenuIndicatorProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuIndicator>;
type DevNavigationMenuIndicatorProps = ShadcnNavigationMenuIndicatorProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuIndicator>,
  DevNavigationMenuIndicatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `navigation-menu-indicator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'NavigationMenuIndicator',
          description: devDescription || 'Visual indicator for active navigation item',
          filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
          category: 'navigation',
          semanticTags: ['navigation', 'indicator', 'visual', 'ui'],
        }}
      >
        <ShadcnNavigationMenuIndicator ref={ref} {...props}>
          {children}
        </ShadcnNavigationMenuIndicator>
      </Container>
    );
  }

  return (
    <ShadcnNavigationMenuIndicator ref={ref} {...props}>
      {children}
    </ShadcnNavigationMenuIndicator>
  );
});

NavigationMenuIndicator.displayName = 'DevNavigationMenuIndicator';

// Export the trigger style utility
export { navigationMenuTriggerStyle };