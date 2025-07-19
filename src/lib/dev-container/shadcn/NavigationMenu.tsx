// src/lib/dev-container/shadcn/NavigationMenu.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

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
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenu ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuList ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuList>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuList.displayName = 'DevNavigationMenuList';

// NavigationMenuItem component
type ShadcnNavigationMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuItem>;
type DevNavigationMenuItemProps = ShadcnNavigationMenuItemProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuItem>,
  DevNavigationMenuItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuItem ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuItem.displayName = 'DevNavigationMenuItem';

// NavigationMenuTrigger component
type ShadcnNavigationMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuTrigger>;
type DevNavigationMenuTriggerProps = ShadcnNavigationMenuTriggerProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuTrigger>,
  DevNavigationMenuTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuTrigger.displayName = 'DevNavigationMenuTrigger';

// NavigationMenuContent component
type ShadcnNavigationMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuContent>;
type DevNavigationMenuContentProps = ShadcnNavigationMenuContentProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuContent>,
  DevNavigationMenuContentProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuContent ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuContent.displayName = 'DevNavigationMenuContent';

// NavigationMenuLink component
type ShadcnNavigationMenuLinkProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuLink>;
type DevNavigationMenuLinkProps = ShadcnNavigationMenuLinkProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuLink>,
  DevNavigationMenuLinkProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuLink ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuLink>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuLink.displayName = 'DevNavigationMenuLink';

// NavigationMenuViewport component
type ShadcnNavigationMenuViewportProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuViewport>;
type DevNavigationMenuViewportProps = ShadcnNavigationMenuViewportProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuViewport>,
  DevNavigationMenuViewportProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuViewport ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuViewport>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuViewport.displayName = 'DevNavigationMenuViewport';

// NavigationMenuIndicator component
type ShadcnNavigationMenuIndicatorProps = React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenuIndicator>;
type DevNavigationMenuIndicatorProps = ShadcnNavigationMenuIndicatorProps & DevProps & { children?: React.ReactNode };

export const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenuIndicator>,
  DevNavigationMenuIndicatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const { config } = useDevMode();
  const shouldContainerize = devDetailed === true || (devDetailed !== false && config.detailedContainerization);
  
  // If no devId provided, throw build error
  if (!devId && shouldContainerize) {
    if (import.meta.env.DEV) {
      throw new Error('[Dev Container] devId is required for containerized components. Either provide a devId or set devId="noID" to disable containerization.');
    }
  }
  
  // If no devId provided or explicitly set to "noID", don't containerize
  if (!devId || devId === "noID" || !shouldContainerize) {
    return (
      <ShadcnNavigationMenuIndicator ref={ref} {...props}>
        {children}
      </ShadcnNavigationMenuIndicator>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

NavigationMenuIndicator.displayName = 'DevNavigationMenuIndicator';

// Export the trigger style utility
export { navigationMenuTriggerStyle };