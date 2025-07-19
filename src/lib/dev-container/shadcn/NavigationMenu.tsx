import React from 'react';
import { 
  NavigationMenu as ShadcnNavigationMenu,
  NavigationMenuList as ShadcnNavigationMenuList,
  NavigationMenuItem as ShadcnNavigationMenuItem,
  NavigationMenuContent as ShadcnNavigationMenuContent,
  NavigationMenuTrigger as ShadcnNavigationMenuTrigger,
  NavigationMenuLink as ShadcnNavigationMenuLink,
  NavigationMenuIndicator as ShadcnNavigationMenuIndicator,
  NavigationMenuViewport as ShadcnNavigationMenuViewport,
  navigationMenuTriggerStyle as shadcnNavigationMenuTriggerStyle
} from '../../../components/ui/navigation-menu';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevNavigationMenuProps extends React.ComponentPropsWithoutRef<typeof ShadcnNavigationMenu> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnNavigationMenu>,
  DevNavigationMenuProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `navigation-menu-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'NavigationMenu',
        description: devDescription || 'A navigation menu component',
        filePath: 'src/lib/dev-container/shadcn/NavigationMenu.tsx',
        category: 'ui',
        semanticTags: ['navigation', 'menu', 'header', 'ui'],
      }}
    >
      <ShadcnNavigationMenu ref={ref} {...props} />
    </Container>
  );
});

NavigationMenu.displayName = 'DevNavigationMenu';

// Export other navigation menu components without dev wrapping
export const NavigationMenuList = ShadcnNavigationMenuList;
export const NavigationMenuItem = ShadcnNavigationMenuItem;
export const NavigationMenuContent = ShadcnNavigationMenuContent;
export const NavigationMenuTrigger = ShadcnNavigationMenuTrigger;
export const NavigationMenuLink = ShadcnNavigationMenuLink;
export const NavigationMenuIndicator = ShadcnNavigationMenuIndicator;
export const NavigationMenuViewport = ShadcnNavigationMenuViewport;
export const navigationMenuTriggerStyle = shadcnNavigationMenuTriggerStyle;

export { type DevNavigationMenuProps }; 
