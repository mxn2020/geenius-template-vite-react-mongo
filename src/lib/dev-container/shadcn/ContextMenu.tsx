import React from 'react';
import { 
  ContextMenu as ShadcnContextMenu,
  ContextMenuTrigger as ShadcnContextMenuTrigger,
  ContextMenuContent as ShadcnContextMenuContent,
  ContextMenuItem as ShadcnContextMenuItem,
  ContextMenuCheckboxItem as ShadcnContextMenuCheckboxItem,
  ContextMenuRadioItem as ShadcnContextMenuRadioItem,
  ContextMenuLabel as ShadcnContextMenuLabel,
  ContextMenuSeparator as ShadcnContextMenuSeparator,
  ContextMenuShortcut as ShadcnContextMenuShortcut,
  ContextMenuGroup as ShadcnContextMenuGroup,
  ContextMenuPortal as ShadcnContextMenuPortal,
  ContextMenuSub as ShadcnContextMenuSub,
  ContextMenuSubContent as ShadcnContextMenuSubContent,
  ContextMenuSubTrigger as ShadcnContextMenuSubTrigger,
  ContextMenuRadioGroup as ShadcnContextMenuRadioGroup
} from '../../../components/ui/context-menu';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevContextMenuProps extends React.ComponentProps<typeof ShadcnContextMenu> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const ContextMenu = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenu>,
  DevContextMenuProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `context-menu-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ContextMenu',
        description: devDescription || 'A context menu component',
        filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
        category: 'ui',
        semanticTags: ['context', 'menu', 'right-click', 'ui'],
      }}
    >
      <ShadcnContextMenu ref={ref} {...props} />
    </Container>
  );
});

ContextMenu.displayName = 'DevContextMenu';

// Export other context menu components without dev wrapping
export const ContextMenuTrigger = ShadcnContextMenuTrigger;
export const ContextMenuContent = ShadcnContextMenuContent;
export const ContextMenuItem = ShadcnContextMenuItem;
export const ContextMenuCheckboxItem = ShadcnContextMenuCheckboxItem;
export const ContextMenuRadioItem = ShadcnContextMenuRadioItem;
export const ContextMenuLabel = ShadcnContextMenuLabel;
export const ContextMenuSeparator = ShadcnContextMenuSeparator;
export const ContextMenuShortcut = ShadcnContextMenuShortcut;
export const ContextMenuGroup = ShadcnContextMenuGroup;
export const ContextMenuPortal = ShadcnContextMenuPortal;
export const ContextMenuSub = ShadcnContextMenuSub;
export const ContextMenuSubContent = ShadcnContextMenuSubContent;
export const ContextMenuSubTrigger = ShadcnContextMenuSubTrigger;
export const ContextMenuRadioGroup = ShadcnContextMenuRadioGroup;

export { type DevContextMenuProps };
