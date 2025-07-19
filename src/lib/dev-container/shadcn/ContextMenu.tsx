// src/lib/dev-container/shadcn/ContextMenu.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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
  ContextMenuRadioGroup as ShadcnContextMenuRadioGroup,
} from '../../../components/ui/context-menu';

// ContextMenu root component (FC type)
type ShadcnContextMenuProps = React.ComponentProps<typeof ShadcnContextMenu>;
type DevContextMenuProps = ShadcnContextMenuProps & DevProps & { children?: React.ReactNode };

export const ContextMenu = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevContextMenuProps) => {
  const componentId = devId || `context-menu-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ContextMenu',
        description: devDescription || 'Context menu root component',
        filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
        category: 'overlay',
        semanticTags: ['context-menu', 'menu', 'overlay', 'ui'],
      }}
    >
      <ShadcnContextMenu {...props}>
        {children}
      </ShadcnContextMenu>
    </Container>
  );
};

ContextMenu.displayName = 'DevContextMenu';

// ContextMenuTrigger component
type ShadcnContextMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuTrigger>;
type DevContextMenuTriggerProps = ShadcnContextMenuTriggerProps & DevProps & { children?: React.ReactNode };

export const ContextMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuTrigger>,
  DevContextMenuTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuTrigger',
          description: devDescription || 'Element that triggers the context menu on right-click',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnContextMenuTrigger ref={ref} {...props}>
          {children}
        </ShadcnContextMenuTrigger>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuTrigger ref={ref} {...props}>
      {children}
    </ShadcnContextMenuTrigger>
  );
});

ContextMenuTrigger.displayName = 'DevContextMenuTrigger';

// ContextMenuContent component
type ShadcnContextMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuContent>;
type DevContextMenuContentProps = ShadcnContextMenuContentProps & DevProps & { children?: React.ReactNode };

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuContent>,
  DevContextMenuContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `context-menu-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ContextMenuContent',
        description: devDescription || 'Context menu content container',
        filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
        category: 'overlay',
        semanticTags: ['context-menu', 'content', 'overlay', 'ui'],
      }}
    >
      <ShadcnContextMenuContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuContent>
    </Container>
  );
});

ContextMenuContent.displayName = 'DevContextMenuContent';

// ContextMenuItem component
type ShadcnContextMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuItem>;
type DevContextMenuItemProps = ShadcnContextMenuItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuItem>,
  DevContextMenuItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuItem',
          description: devDescription || 'Individual context menu item',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnContextMenuItem ref={ref} {...props}>
          {children}
        </ShadcnContextMenuItem>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuItem ref={ref} {...props}>
      {children}
    </ShadcnContextMenuItem>
  );
});

ContextMenuItem.displayName = 'DevContextMenuItem';

// ContextMenuCheckboxItem component
type ShadcnContextMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuCheckboxItem>;
type DevContextMenuCheckboxItemProps = ShadcnContextMenuCheckboxItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuCheckboxItem>,
  DevContextMenuCheckboxItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-checkbox-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuCheckboxItem',
          description: devDescription || 'Checkbox item with checkmark indicator',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'checkbox', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnContextMenuCheckboxItem ref={ref} {...props}>
          {children}
        </ShadcnContextMenuCheckboxItem>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuCheckboxItem ref={ref} {...props}>
      {children}
    </ShadcnContextMenuCheckboxItem>
  );
});

ContextMenuCheckboxItem.displayName = 'DevContextMenuCheckboxItem';

// ContextMenuRadioGroup component
type ShadcnContextMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuRadioGroup>;
type DevContextMenuRadioGroupProps = ShadcnContextMenuRadioGroupProps & DevProps & { children?: React.ReactNode };

export const ContextMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuRadioGroup>,
  DevContextMenuRadioGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-radio-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuRadioGroup',
          description: devDescription || 'Radio group container for menu items',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'radio', 'group', 'ui'],
        }}
      >
        <ShadcnContextMenuRadioGroup ref={ref} {...props}>
          {children}
        </ShadcnContextMenuRadioGroup>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuRadioGroup ref={ref} {...props}>
      {children}
    </ShadcnContextMenuRadioGroup>
  );
});

ContextMenuRadioGroup.displayName = 'DevContextMenuRadioGroup';

// ContextMenuRadioItem component
type ShadcnContextMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuRadioItem>;
type DevContextMenuRadioItemProps = ShadcnContextMenuRadioItemProps & DevProps & { children?: React.ReactNode };

export const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuRadioItem>,
  DevContextMenuRadioItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-radio-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuRadioItem',
          description: devDescription || 'Radio item with selection indicator',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'radio', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnContextMenuRadioItem ref={ref} {...props}>
          {children}
        </ShadcnContextMenuRadioItem>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuRadioItem ref={ref} {...props}>
      {children}
    </ShadcnContextMenuRadioItem>
  );
});

ContextMenuRadioItem.displayName = 'DevContextMenuRadioItem';

// ContextMenuLabel component
type ShadcnContextMenuLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuLabel>;
type DevContextMenuLabelProps = ShadcnContextMenuLabelProps & DevProps & { children?: React.ReactNode };

export const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuLabel>,
  DevContextMenuLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuLabel',
          description: devDescription || 'Non-interactive label for menu sections',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'label', 'text', 'ui'],
        }}
      >
        <ShadcnContextMenuLabel ref={ref} {...props}>
          {children}
        </ShadcnContextMenuLabel>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuLabel ref={ref} {...props}>
      {children}
    </ShadcnContextMenuLabel>
  );
});

ContextMenuLabel.displayName = 'DevContextMenuLabel';

// ContextMenuSeparator component
type ShadcnContextMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSeparator>;
type DevContextMenuSeparatorProps = ShadcnContextMenuSeparatorProps & DevProps;

export const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSeparator>,
  DevContextMenuSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `context-menu-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuSeparator',
          description: devDescription || 'Visual separator between menu items',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'separator', 'divider', 'ui'],
        }}
      >
        <ShadcnContextMenuSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnContextMenuSeparator ref={ref} {...props} />;
});

ContextMenuSeparator.displayName = 'DevContextMenuSeparator';

// ContextMenuGroup component
type ShadcnContextMenuGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuGroup>;
type DevContextMenuGroupProps = ShadcnContextMenuGroupProps & DevProps & { children?: React.ReactNode };

export const ContextMenuGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuGroup>,
  DevContextMenuGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuGroup',
          description: devDescription || 'Group container for related menu items',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'group', 'container', 'ui'],
        }}
      >
        <ShadcnContextMenuGroup ref={ref} {...props}>
          {children}
        </ShadcnContextMenuGroup>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuGroup ref={ref} {...props}>
      {children}
    </ShadcnContextMenuGroup>
  );
});

ContextMenuGroup.displayName = 'DevContextMenuGroup';

// ContextMenuPortal component (FC type)
type ShadcnContextMenuPortalProps = React.ComponentProps<typeof ShadcnContextMenuPortal>;
type DevContextMenuPortalProps = ShadcnContextMenuPortalProps & DevProps & { children?: React.ReactNode };

export const ContextMenuPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuPortalProps) => {
  const componentId = devId || `context-menu-portal-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuPortal',
          description: devDescription || 'Portal container for context menu content',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'portal', 'container', 'ui'],
        }}
      >
        <ShadcnContextMenuPortal {...props}>
          {children}
        </ShadcnContextMenuPortal>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuPortal {...props}>
      {children}
    </ShadcnContextMenuPortal>
  );
};

ContextMenuPortal.displayName = 'DevContextMenuPortal';

// ContextMenuSub component (FC type)
type ShadcnContextMenuSubProps = React.ComponentProps<typeof ShadcnContextMenuSub>;
type DevContextMenuSubProps = ShadcnContextMenuSubProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuSubProps) => {
  const componentId = devId || `context-menu-sub-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuSub',
          description: devDescription || 'Submenu container',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'submenu', 'nested', 'ui'],
        }}
      >
        <ShadcnContextMenuSub {...props}>
          {children}
        </ShadcnContextMenuSub>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuSub {...props}>
      {children}
    </ShadcnContextMenuSub>
  );
};

ContextMenuSub.displayName = 'DevContextMenuSub';

// ContextMenuSubTrigger component
type ShadcnContextMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSubTrigger>;
type DevContextMenuSubTriggerProps = ShadcnContextMenuSubTriggerProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSubTrigger>,
  DevContextMenuSubTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `context-menu-sub-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuSubTrigger',
          description: devDescription || 'Button that opens a submenu',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'submenu', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnContextMenuSubTrigger ref={ref} {...props}>
          {children}
        </ShadcnContextMenuSubTrigger>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuSubTrigger ref={ref} {...props}>
      {children}
    </ShadcnContextMenuSubTrigger>
  );
});

ContextMenuSubTrigger.displayName = 'DevContextMenuSubTrigger';

// ContextMenuSubContent component
type ShadcnContextMenuSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuSubContent>;
type DevContextMenuSubContentProps = ShadcnContextMenuSubContentProps & DevProps & { children?: React.ReactNode };

export const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnContextMenuSubContent>,
  DevContextMenuSubContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `context-menu-sub-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'ContextMenuSubContent',
        description: devDescription || 'Submenu content container',
        filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
        category: 'overlay',
        semanticTags: ['context-menu', 'submenu', 'content', 'ui'],
      }}
    >
      <ShadcnContextMenuSubContent ref={ref} {...props}>
        {children}
      </ShadcnContextMenuSubContent>
    </Container>
  );
});

ContextMenuSubContent.displayName = 'DevContextMenuSubContent';

// ContextMenuShortcut component
type ShadcnContextMenuShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnContextMenuShortcut>;
type DevContextMenuShortcutProps = ShadcnContextMenuShortcutProps & DevProps & { children?: React.ReactNode };

export const ContextMenuShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevContextMenuShortcutProps) => {
  const componentId = devId || `context-menu-shortcut-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'ContextMenuShortcut',
          description: devDescription || 'Keyboard shortcut text for menu items',
          filePath: 'src/lib/dev-container/shadcn/ContextMenu.tsx',
          category: 'overlay',
          semanticTags: ['context-menu', 'shortcut', 'keyboard', 'text', 'ui'],
        }}
      >
        <ShadcnContextMenuShortcut {...props}>
          {children}
        </ShadcnContextMenuShortcut>
      </Container>
    );
  }

  return (
    <ShadcnContextMenuShortcut {...props}>
      {children}
    </ShadcnContextMenuShortcut>
  );
};

ContextMenuShortcut.displayName = 'DevContextMenuShortcut';