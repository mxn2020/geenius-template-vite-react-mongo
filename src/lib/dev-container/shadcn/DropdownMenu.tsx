// src/lib/dev-container/shadcn/DropdownMenu.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

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

export const DropdownMenu = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuProps) => {
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
      <ShadcnDropdownMenu {...props}>
        {children}
      </ShadcnDropdownMenu>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
      <ShadcnDropdownMenuTrigger ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuTrigger.displayName = 'DevDropdownMenuTrigger';

// DropdownMenuContent component
type ShadcnDropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuContent>;
type DevDropdownMenuContentProps = ShadcnDropdownMenuContentProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuContent>,
  DevDropdownMenuContentProps
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
      <ShadcnDropdownMenuContent ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
      <ShadcnDropdownMenuItem ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuItem.displayName = 'DevDropdownMenuItem';

// DropdownMenuCheckboxItem component
type ShadcnDropdownMenuCheckboxItemProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuCheckboxItem>;
type DevDropdownMenuCheckboxItemProps = ShadcnDropdownMenuCheckboxItemProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuCheckboxItem>,
  DevDropdownMenuCheckboxItemProps
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
      <ShadcnDropdownMenuCheckboxItem ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuCheckboxItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuCheckboxItem.displayName = 'DevDropdownMenuCheckboxItem';

// DropdownMenuRadioGroup component
type ShadcnDropdownMenuRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuRadioGroup>;
type DevDropdownMenuRadioGroupProps = ShadcnDropdownMenuRadioGroupProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuRadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuRadioGroup>,
  DevDropdownMenuRadioGroupProps
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
      <ShadcnDropdownMenuRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuRadioGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuRadioGroup.displayName = 'DevDropdownMenuRadioGroup';

// DropdownMenuRadioItem component
type ShadcnDropdownMenuRadioItemProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuRadioItem>;
type DevDropdownMenuRadioItemProps = ShadcnDropdownMenuRadioItemProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuRadioItem>,
  DevDropdownMenuRadioItemProps
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
      <ShadcnDropdownMenuRadioItem ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuRadioItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuRadioItem.displayName = 'DevDropdownMenuRadioItem';

// DropdownMenuLabel component
type ShadcnDropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuLabel>;
type DevDropdownMenuLabelProps = ShadcnDropdownMenuLabelProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuLabel>,
  DevDropdownMenuLabelProps
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
      <ShadcnDropdownMenuLabel ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuLabel.displayName = 'DevDropdownMenuLabel';

// DropdownMenuSeparator component
type ShadcnDropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSeparator>;
type DevDropdownMenuSeparatorProps = ShadcnDropdownMenuSeparatorProps & DevProps;

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSeparator>,
  DevDropdownMenuSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
    return <ShadcnDropdownMenuSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuSeparator.displayName = 'DevDropdownMenuSeparator';

// DropdownMenuGroup component
type ShadcnDropdownMenuGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuGroup>;
type DevDropdownMenuGroupProps = ShadcnDropdownMenuGroupProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuGroup>,
  DevDropdownMenuGroupProps
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
      <ShadcnDropdownMenuGroup ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuGroup.displayName = 'DevDropdownMenuGroup';

// DropdownMenuPortal component
type ShadcnDropdownMenuPortalProps = React.ComponentProps<typeof ShadcnDropdownMenuPortal>;
type DevDropdownMenuPortalProps = ShadcnDropdownMenuPortalProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuPortal = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuPortalProps) => {
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
      <ShadcnDropdownMenuPortal {...props}>
        {children}
      </ShadcnDropdownMenuPortal>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

DropdownMenuPortal.displayName = 'DevDropdownMenuPortal';

// DropdownMenuSub component
type ShadcnDropdownMenuSubProps = React.ComponentProps<typeof ShadcnDropdownMenuSub>;
type DevDropdownMenuSubProps = ShadcnDropdownMenuSubProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSub = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuSubProps) => {
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
      <ShadcnDropdownMenuSub {...props}>
        {children}
      </ShadcnDropdownMenuSub>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

DropdownMenuSub.displayName = 'DevDropdownMenuSub';

// DropdownMenuSubTrigger component
type ShadcnDropdownMenuSubTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSubTrigger>;
type DevDropdownMenuSubTriggerProps = ShadcnDropdownMenuSubTriggerProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSubTrigger>,
  DevDropdownMenuSubTriggerProps
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
      <ShadcnDropdownMenuSubTrigger ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuSubTrigger>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

DropdownMenuSubTrigger.displayName = 'DevDropdownMenuSubTrigger';

// DropdownMenuSubContent component
type ShadcnDropdownMenuSubContentProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuSubContent>;
type DevDropdownMenuSubContentProps = ShadcnDropdownMenuSubContentProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ShadcnDropdownMenuSubContent>,
  DevDropdownMenuSubContentProps
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
      <ShadcnDropdownMenuSubContent ref={ref} {...props}>
        {children}
      </ShadcnDropdownMenuSubContent>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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

// DropdownMenuShortcut component
type ShadcnDropdownMenuShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnDropdownMenuShortcut>;
type DevDropdownMenuShortcutProps = ShadcnDropdownMenuShortcutProps & DevProps & { children?: React.ReactNode };

export const DropdownMenuShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevDropdownMenuShortcutProps) => {
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
      <ShadcnDropdownMenuShortcut {...props}>
        {children}
      </ShadcnDropdownMenuShortcut>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

DropdownMenuShortcut.displayName = 'DevDropdownMenuShortcut';