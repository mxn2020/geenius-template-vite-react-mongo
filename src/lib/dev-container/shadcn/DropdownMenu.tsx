// src/lib/dev-container/shadcn/DropdownMenu.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  DropdownMenu as ShadcnDropdownMenu,
  DropdownMenuTrigger as ShadcnDropdownMenuTrigger,
  DropdownMenuContent as ShadcnDropdownMenuContent,
  DropdownMenuItem as ShadcnDropdownMenuItem,
  DropdownMenuCheckboxItem as ShadcnDropdownMenuCheckboxItem,
  DropdownMenuRadioItem as ShadcnDropdownMenuRadioItem,
  DropdownMenuLabel as ShadcnDropdownMenuLabel,
  DropdownMenuSeparator as ShadcnDropdownMenuSeparator,
  DropdownMenuShortcut as ShadcnDropdownMenuShortcut,
  DropdownMenuGroup as ShadcnDropdownMenuGroup,
  DropdownMenuPortal as ShadcnDropdownMenuPortal,
  DropdownMenuSub as ShadcnDropdownMenuSub,
  DropdownMenuSubContent as ShadcnDropdownMenuSubContent,
  DropdownMenuSubTrigger as ShadcnDropdownMenuSubTrigger,
  DropdownMenuRadioGroup as ShadcnDropdownMenuRadioGroup,
} from '../../../components/ui/dropdown-menu';

// DropdownMenu root component - special handling for FC components
type ShadcnDropdownMenuProps = React.ComponentProps<typeof ShadcnDropdownMenu>;
type DevDropdownMenuProps = ShadcnDropdownMenuProps & DevProps & { children?: React.ReactNode };

export const DropdownMenu = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevDropdownMenuProps) => {
  const componentId = devId || `dropdown-menu-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'DropdownMenu',
        description: devDescription || 'Dropdown menu root component',
        filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
        category: 'overlay',
        semanticTags: ['dropdown', 'menu', 'overlay', 'ui'],
      }}
    >
      <ShadcnDropdownMenu {...props}>
        {children}
      </ShadcnDropdownMenu>
    </Container>
  );
};

DropdownMenu.displayName = 'DevDropdownMenu';

// DropdownMenuTrigger component
type ShadcnDropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuTrigger>;
type DevDropdownMenuTriggerProps = ShadcnDropdownMenuTriggerProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuTrigger>,
  DevDropdownMenuTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuTrigger',
          description: devDescription || 'Button that opens the dropdown menu',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnDropdownMenuTrigger ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuTrigger>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuTrigger ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuTrigger>
  );
});

DropdownMenuTrigger.displayName = 'DevDropdownMenuTrigger';

// DropdownMenuContent component
type ShadcnDropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuContent>;
type DevDropdownMenuContentProps = ShadcnDropdownMenuContentProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuContent>,
  DevDropdownMenuContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'DropdownMenuContent',
        description: devDescription || 'Dropdown menu content container',
        filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
        category: 'overlay',
        semanticTags: ['dropdown', 'content', 'overlay', 'ui'],
      }}
    >
      <ShadcnDropdownMenuContent ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuContent>
    </Container>
  );
});

DropdownMenuContent.displayName = 'DevDropdownMenuContent';

// DropdownMenuItem component
type ShadcnDropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuItem>;
type DevDropdownMenuItemProps = ShadcnDropdownMenuItemProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuItem>,
  DevDropdownMenuItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuItem',
          description: devDescription || 'Individual dropdown menu item',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnDropdownMenuItem ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuItem>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuItem ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuItem>
  );
});

DropdownMenuItem.displayName = 'DevDropdownMenuItem';

// DropdownMenuCheckboxItem component
type ShadcnDropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuCheckboxItem>;
type DevDropdownMenuCheckboxItemProps = ShadcnDropdownMenuCheckboxItemProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuCheckboxItem>,
  DevDropdownMenuCheckboxItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-checkbox-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuCheckboxItem',
          description: devDescription || 'Checkbox item with checkmark indicator',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'checkbox', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnDropdownMenuCheckboxItem ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuCheckboxItem>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuCheckboxItem ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuCheckboxItem>
  );
});

DropdownMenuCheckboxItem.displayName = 'DevDropdownMenuCheckboxItem';

// DropdownMenuRadioGroup component
type ShadcnDropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuRadioGroup>;
type DevDropdownMenuRadioGroupProps = ShadcnDropdownMenuRadioGroupProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuRadioGroup>,
  DevDropdownMenuRadioGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-radio-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuRadioGroup',
          description: devDescription || 'Radio group container for menu items',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'radio', 'group', 'ui'],
        }}
      >
        <ShadcnDropdownMenuRadioGroup ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuRadioGroup>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuRadioGroup ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuRadioGroup>
  );
});

DropdownMenuRadioGroup.displayName = 'DevDropdownMenuRadioGroup';

// DropdownMenuRadioItem component
type ShadcnDropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuRadioItem>;
type DevDropdownMenuRadioItemProps = ShadcnDropdownMenuRadioItemProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuRadioItem>,
  DevDropdownMenuRadioItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-radio-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuRadioItem',
          description: devDescription || 'Radio item with selection indicator',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'radio', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnDropdownMenuRadioItem ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuRadioItem>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuRadioItem ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuRadioItem>
  );
});

DropdownMenuRadioItem.displayName = 'DevDropdownMenuRadioItem';

// DropdownMenuLabel component
type ShadcnDropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuLabel>;
type DevDropdownMenuLabelProps = ShadcnDropdownMenuLabelProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuLabel>,
  DevDropdownMenuLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuLabel',
          description: devDescription || 'Non-interactive label for menu sections',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'label', 'text', 'ui'],
        }}
      >
        <ShadcnDropdownMenuLabel ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuLabel>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuLabel ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuLabel>
  );
});

DropdownMenuLabel.displayName = 'DevDropdownMenuLabel';

// DropdownMenuSeparator component
type ShadcnDropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSeparator>;
type DevDropdownMenuSeparatorProps = ShadcnDropdownMenuSeparatorProps & DevProps;

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSeparator>,
  DevDropdownMenuSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuSeparator',
          description: devDescription || 'Visual separator between menu items',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'separator', 'divider', 'ui'],
        }}
      >
        <ShadcnDropdownMenuSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnDropdownMenuSeparator ref={ref} {...props} />;
});

DropdownMenuSeparator.displayName = 'DevDropdownMenuSeparator';

// DropdownMenuGroup component
type ShadcnDropdownMenuGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuGroup>;
type DevDropdownMenuGroupProps = ShadcnDropdownMenuGroupProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuGroup>,
  DevDropdownMenuGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuGroup',
          description: devDescription || 'Group container for related menu items',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'group', 'container', 'ui'],
        }}
      >
        <ShadcnDropdownMenuGroup ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuGroup>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuGroup ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuGroup>
  );
});

DropdownMenuGroup.displayName = 'DevDropdownMenuGroup';

// DropdownMenuPortal component
type ShadcnDropdownMenuPortalProps = React.ComponentProps<typeof ShadcnDropdownMenuPortal>;
type DevDropdownMenuPortalProps = ShadcnDropdownMenuPortalProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuPortalProps) => {
  const componentId = devId || `dropdown-menu-portal-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuPortal',
          description: devDescription || 'Portal container for dropdown content',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'portal', 'container', 'ui'],
        }}
      >
        <ShadcnDropdownMenuPortal {...props}>
          {children}
        </ShadcnDropdownMenuPortal>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuPortal {...props}>
      {children}
    </ShadcnDropdownMenuPortal>
  );
};

DropdownMenuPortal.displayName = 'DevDropdownMenuPortal';

// DropdownMenuSub component
type ShadcnDropdownMenuSubProps = React.ComponentProps<typeof ShadcnDropdownMenuSub>;
type DevDropdownMenuSubProps = ShadcnDropdownMenuSubProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuSubProps) => {
  const componentId = devId || `dropdown-menu-sub-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuSub',
          description: devDescription || 'Submenu container',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'submenu', 'nested', 'ui'],
        }}
      >
        <ShadcnDropdownMenuSub {...props}>
          {children}
        </ShadcnDropdownMenuSub>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuSub {...props}>
      {children}
    </ShadcnDropdownMenuSub>
  );
};

DropdownMenuSub.displayName = 'DevDropdownMenuSub';

// DropdownMenuSubTrigger component
type ShadcnDropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSubTrigger>;
type DevDropdownMenuSubTriggerProps = ShadcnDropdownMenuSubTriggerProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSubTrigger>,
  DevDropdownMenuSubTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-sub-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuSubTrigger',
          description: devDescription || 'Button that opens a submenu',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'submenu', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnDropdownMenuSubTrigger ref={ref} {...props}>
          {children}
        </ShadcnDropdownMenuSubTrigger>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuSubTrigger ref={ref} {...props}>
      {children}
    </ShadcnDropdownMenuSubTrigger>
  );
});

DropdownMenuSubTrigger.displayName = 'DevDropdownMenuSubTrigger';

// DropdownMenuSubContent component
type ShadcnDropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSubContent>;
type DevDropdownMenuSubContentProps = ShadcnDropdownMenuSubContentProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSubContent>,
  DevDropdownMenuSubContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `dropdown-menu-sub-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'DropdownMenuSubContent',
        description: devDescription || 'Submenu dropdown content container',
        filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
        category: 'overlay',
        semanticTags: ['dropdown', 'submenu', 'content', 'ui'],
      }}
    >
      <ShadcnDropdownMenuSubContent ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuSubContent>
    </Container>
  );
});

DropdownMenuSubContent.displayName = 'DevDropdownMenuSubContent';

// DropdownMenuShortcut component (assuming it exists in your implementation)
type ShadcnDropdownMenuShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuShortcut>;
type DevDropdownMenuShortcutProps = ShadcnDropdownMenuShortcutProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuShortcutProps) => {
  const componentId = devId || `dropdown-menu-shortcut-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'DropdownMenuShortcut',
          description: devDescription || 'Keyboard shortcut text for menu items',
          filePath: 'src/lib/dev-container/shadcn/DropdownMenu.tsx',
          category: 'overlay',
          semanticTags: ['dropdown', 'shortcut', 'keyboard', 'text', 'ui'],
        }}
      >
        <ShadcnDropdownMenuShortcut {...props}>
          {children}
        </ShadcnDropdownMenuShortcut>
      </Container>
    );
  }

  return (
    <ShadcnDropdownMenuShortcut {...props}>
      {children}
    </ShadcnDropdownMenuShortcut>
  );
};

DropdownMenuShortcut.displayName = 'DevDropdownMenuShortcut';