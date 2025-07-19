// src/lib/dev-container/shadcn/Menubar.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Menubar as ShadcnMenubar,
  MenubarMenu as ShadcnMenubarMenu,
  MenubarTrigger as ShadcnMenubarTrigger,
  MenubarContent as ShadcnMenubarContent,
  MenubarItem as ShadcnMenubarItem,
  MenubarSeparator as ShadcnMenubarSeparator,
  MenubarLabel as ShadcnMenubarLabel,
  MenubarCheckboxItem as ShadcnMenubarCheckboxItem,
  MenubarRadioGroup as ShadcnMenubarRadioGroup,
  MenubarRadioItem as ShadcnMenubarRadioItem,
  MenubarPortal as ShadcnMenubarPortal,
  MenubarSubContent as ShadcnMenubarSubContent,
  MenubarSubTrigger as ShadcnMenubarSubTrigger,
  MenubarGroup as ShadcnMenubarGroup,
  MenubarSub as ShadcnMenubarSub,
  MenubarShortcut as ShadcnMenubarShortcut,
} from '../../../components/ui/menubar';

// Menubar root component
type ShadcnMenubarProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubar>;
type DevMenubarProps = ShadcnMenubarProps & DevProps & { children?: React.ReactNode };

export const Menubar = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubar>,
  DevMenubarProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `menubar-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Menubar',
        description: devDescription || 'Menubar root container component',
        filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
        category: 'navigation',
        semanticTags: ['menubar', 'navigation', 'menu', 'ui'],
      }}
    >
      <ShadcnMenubar ref={ref} {...props}>
        {children}
      </ShadcnMenubar>
    </Container>
  );
});

Menubar.displayName = 'DevMenubar';

// MenubarMenu component
type ShadcnMenubarMenuProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarMenu>;
type DevMenubarMenuProps = ShadcnMenubarMenuProps & DevProps & { children?: React.ReactNode };

export const MenubarMenu = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarMenuProps) => {
  const componentId = devId || `menubar-menu-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarMenu',
          description: devDescription || 'Individual menu within the menubar',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'menu', 'navigation', 'ui'],
        }}
      >
        <ShadcnMenubarMenu {...props}>
          {children}
        </ShadcnMenubarMenu>
      </Container>
    );
  }

  return (
    <ShadcnMenubarMenu {...props}>
      {children}
    </ShadcnMenubarMenu>
  );
};

MenubarMenu.displayName = 'DevMenubarMenu';

// MenubarTrigger component
type ShadcnMenubarTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarTrigger>;
type DevMenubarTriggerProps = ShadcnMenubarTriggerProps & DevProps & { children?: React.ReactNode };

export const MenubarTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarTrigger>,
  DevMenubarTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarTrigger',
          description: devDescription || 'Button that opens a menubar menu',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnMenubarTrigger ref={ref} {...props}>
          {children}
        </ShadcnMenubarTrigger>
      </Container>
    );
  }

  return (
    <ShadcnMenubarTrigger ref={ref} {...props}>
      {children}
    </ShadcnMenubarTrigger>
  );
});

MenubarTrigger.displayName = 'DevMenubarTrigger';

// MenubarContent component
type ShadcnMenubarContentProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarContent>;
type DevMenubarContentProps = ShadcnMenubarContentProps & DevProps & { children?: React.ReactNode };

export const MenubarContent = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarContent>,
  DevMenubarContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `menubar-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'MenubarContent',
        description: devDescription || 'Menubar dropdown content container',
        filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
        category: 'navigation',
        semanticTags: ['menubar', 'content', 'dropdown', 'ui'],
      }}
    >
      <ShadcnMenubarContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarContent>
    </Container>
  );
});

MenubarContent.displayName = 'DevMenubarContent';

// MenubarItem component
type ShadcnMenubarItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarItem>;
type DevMenubarItemProps = ShadcnMenubarItemProps & DevProps & { children?: React.ReactNode };

export const MenubarItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarItem>,
  DevMenubarItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarItem',
          description: devDescription || 'Individual menu item',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnMenubarItem ref={ref} {...props}>
          {children}
        </ShadcnMenubarItem>
      </Container>
    );
  }

  return (
    <ShadcnMenubarItem ref={ref} {...props}>
      {children}
    </ShadcnMenubarItem>
  );
});

MenubarItem.displayName = 'DevMenubarItem';

// MenubarCheckboxItem component
type ShadcnMenubarCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarCheckboxItem>;
type DevMenubarCheckboxItemProps = ShadcnMenubarCheckboxItemProps & DevProps & { children?: React.ReactNode };

export const MenubarCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarCheckboxItem>,
  DevMenubarCheckboxItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-checkbox-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarCheckboxItem',
          description: devDescription || 'Checkbox menu item with checkmark indicator',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'checkbox', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnMenubarCheckboxItem ref={ref} {...props}>
          {children}
        </ShadcnMenubarCheckboxItem>
      </Container>
    );
  }

  return (
    <ShadcnMenubarCheckboxItem ref={ref} {...props}>
      {children}
    </ShadcnMenubarCheckboxItem>
  );
});

MenubarCheckboxItem.displayName = 'DevMenubarCheckboxItem';

// MenubarRadioGroup component
type ShadcnMenubarRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarRadioGroup>;
type DevMenubarRadioGroupProps = ShadcnMenubarRadioGroupProps & DevProps & { children?: React.ReactNode };

export const MenubarRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarRadioGroup>,
  DevMenubarRadioGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-radio-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarRadioGroup',
          description: devDescription || 'Radio group container for menu items',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'radio', 'group', 'ui'],
        }}
      >
        <ShadcnMenubarRadioGroup ref={ref} {...props}>
          {children}
        </ShadcnMenubarRadioGroup>
      </Container>
    );
  }

  return (
    <ShadcnMenubarRadioGroup ref={ref} {...props}>
      {children}
    </ShadcnMenubarRadioGroup>
  );
});

MenubarRadioGroup.displayName = 'DevMenubarRadioGroup';

// MenubarRadioItem component
type ShadcnMenubarRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarRadioItem>;
type DevMenubarRadioItemProps = ShadcnMenubarRadioItemProps & DevProps & { children?: React.ReactNode };

export const MenubarRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarRadioItem>,
  DevMenubarRadioItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-radio-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarRadioItem',
          description: devDescription || 'Radio menu item with selection indicator',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'radio', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnMenubarRadioItem ref={ref} {...props}>
          {children}
        </ShadcnMenubarRadioItem>
      </Container>
    );
  }

  return (
    <ShadcnMenubarRadioItem ref={ref} {...props}>
      {children}
    </ShadcnMenubarRadioItem>
  );
});

MenubarRadioItem.displayName = 'DevMenubarRadioItem';

// MenubarLabel component
type ShadcnMenubarLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarLabel>;
type DevMenubarLabelProps = ShadcnMenubarLabelProps & DevProps & { children?: React.ReactNode };

export const MenubarLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarLabel>,
  DevMenubarLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarLabel',
          description: devDescription || 'Non-interactive label for menu sections',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'label', 'text', 'ui'],
        }}
      >
        <ShadcnMenubarLabel ref={ref} {...props}>
          {children}
        </ShadcnMenubarLabel>
      </Container>
    );
  }

  return (
    <ShadcnMenubarLabel ref={ref} {...props}>
      {children}
    </ShadcnMenubarLabel>
  );
});

MenubarLabel.displayName = 'DevMenubarLabel';

// MenubarSeparator component
type ShadcnMenubarSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSeparator>;
type DevMenubarSeparatorProps = ShadcnMenubarSeparatorProps & DevProps;

export const MenubarSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSeparator>,
  DevMenubarSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `menubar-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarSeparator',
          description: devDescription || 'Visual separator between menu items',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'separator', 'divider', 'ui'],
        }}
      >
        <ShadcnMenubarSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnMenubarSeparator ref={ref} {...props} />;
});

MenubarSeparator.displayName = 'DevMenubarSeparator';

// MenubarGroup component
type ShadcnMenubarGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarGroup>;
type DevMenubarGroupProps = ShadcnMenubarGroupProps & DevProps & { children?: React.ReactNode };

export const MenubarGroup = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarGroupProps) => {
  const componentId = devId || `menubar-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarGroup',
          description: devDescription || 'Group container for related menu items',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'group', 'container', 'ui'],
        }}
      >
        <ShadcnMenubarGroup {...props}>
          {children}
        </ShadcnMenubarGroup>
      </Container>
    );
  }

  return (
    <ShadcnMenubarGroup {...props}>
      {children}
    </ShadcnMenubarGroup>
  );
};

MenubarGroup.displayName = 'DevMenubarGroup';

// MenubarSub component
type ShadcnMenubarSubProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSub>;
type DevMenubarSubProps = ShadcnMenubarSubProps & DevProps & { children?: React.ReactNode };

export const MenubarSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarSubProps) => {
  const componentId = devId || `menubar-sub-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarSub',
          description: devDescription || 'Submenu container',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'submenu', 'nested', 'ui'],
        }}
      >
        <ShadcnMenubarSub {...props}>
          {children}
        </ShadcnMenubarSub>
      </Container>
    );
  }

  return (
    <ShadcnMenubarSub {...props}>
      {children}
    </ShadcnMenubarSub>
  );
};

MenubarSub.displayName = 'DevMenubarSub';

// MenubarSubTrigger component
type ShadcnMenubarSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSubTrigger>;
type DevMenubarSubTriggerProps = ShadcnMenubarSubTriggerProps & DevProps & { children?: React.ReactNode };

export const MenubarSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSubTrigger>,
  DevMenubarSubTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `menubar-sub-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarSubTrigger',
          description: devDescription || 'Button that opens a submenu',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'submenu', 'trigger', 'interactive', 'ui'],
        }}
      >
        <ShadcnMenubarSubTrigger ref={ref} {...props}>
          {children}
        </ShadcnMenubarSubTrigger>
      </Container>
    );
  }

  return (
    <ShadcnMenubarSubTrigger ref={ref} {...props}>
      {children}
    </ShadcnMenubarSubTrigger>
  );
});

MenubarSubTrigger.displayName = 'DevMenubarSubTrigger';

// MenubarSubContent component
type ShadcnMenubarSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarSubContent>;
type DevMenubarSubContentProps = ShadcnMenubarSubContentProps & DevProps & { children?: React.ReactNode };

export const MenubarSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnMenubarSubContent>,
  DevMenubarSubContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `menubar-sub-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'MenubarSubContent',
        description: devDescription || 'Submenu dropdown content container',
        filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
        category: 'navigation',
        semanticTags: ['menubar', 'submenu', 'content', 'dropdown', 'ui'],
      }}
    >
      <ShadcnMenubarSubContent ref={ref} {...props}>
        {children}
      </ShadcnMenubarSubContent>
    </Container>
  );
});

MenubarSubContent.displayName = 'DevMenubarSubContent';

// MenubarPortal component
type ShadcnMenubarPortalProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarPortal>;
type DevMenubarPortalProps = ShadcnMenubarPortalProps & DevProps & { children?: React.ReactNode };

export const MenubarPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarPortalProps) => {
  const componentId = devId || `menubar-portal-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarPortal',
          description: devDescription || 'Portal container for menubar content',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'portal', 'container', 'ui'],
        }}
      >
        <ShadcnMenubarPortal {...props}>
          {children}
        </ShadcnMenubarPortal>
      </Container>
    );
  }

  return (
    <ShadcnMenubarPortal {...props}>
      {children}
    </ShadcnMenubarPortal>
  );
};

MenubarPortal.displayName = 'DevMenubarPortal';

// MenubarShortcut component
type ShadcnMenubarShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnMenubarShortcut>;
type DevMenubarShortcutProps = ShadcnMenubarShortcutProps & DevProps & { children?: React.ReactNode };

export const MenubarShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevMenubarShortcutProps) => {
  const componentId = devId || `menubar-shortcut-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'MenubarShortcut',
          description: devDescription || 'Keyboard shortcut text for menu items',
          filePath: 'src/lib/dev-container/shadcn/Menubar.tsx',
          category: 'navigation',
          semanticTags: ['menubar', 'shortcut', 'keyboard', 'text', 'ui'],
        }}
      >
        <ShadcnMenubarShortcut {...props}>
          {children}
        </ShadcnMenubarShortcut>
      </Container>
    );
  }

  return (
    <ShadcnMenubarShortcut {...props}>
      {children}
    </ShadcnMenubarShortcut>
  );
};

MenubarShortcut.displayName = 'DevMenubarShortcut';