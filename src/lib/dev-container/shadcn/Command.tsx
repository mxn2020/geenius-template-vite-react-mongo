// src/lib/dev-container/shadcn/Command.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Command as ShadcnCommand,
  CommandDialog as ShadcnCommandDialog,
  CommandInput as ShadcnCommandInput,
  CommandList as ShadcnCommandList,
  CommandEmpty as ShadcnCommandEmpty,
  CommandGroup as ShadcnCommandGroup,
  CommandItem as ShadcnCommandItem,
  CommandShortcut as ShadcnCommandShortcut,
  CommandSeparator as ShadcnCommandSeparator,
} from '../../../components/ui/command';

// Command root component
type ShadcnCommandProps = React.ComponentPropsWithoutRef<typeof ShadcnCommand>;
type DevCommandProps = ShadcnCommandProps & DevProps & { children?: React.ReactNode };

export const Command = React.forwardRef<
  React.ElementRef<typeof ShadcnCommand>,
  DevCommandProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `command-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Command',
        description: devDescription || 'Command palette root component',
        filePath: 'src/lib/dev-container/shadcn/Command.tsx',
        category: 'navigation',
        semanticTags: ['command', 'search', 'palette', 'ui'],
      }}
    >
      <ShadcnCommand ref={ref} {...props}>
        {children}
      </ShadcnCommand>
    </Container>
  );
});

Command.displayName = 'DevCommand';

// CommandDialog component
type ShadcnCommandDialogProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandDialog>;
type DevCommandDialogProps = ShadcnCommandDialogProps & DevProps & { children?: React.ReactNode };

export const CommandDialog = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevCommandDialogProps) => {
  const componentId = devId || `command-dialog-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'CommandDialog',
        description: devDescription || 'Command palette in dialog form',
        filePath: 'src/lib/dev-container/shadcn/Command.tsx',
        category: 'navigation',
        semanticTags: ['command', 'dialog', 'modal', 'search', 'ui'],
      }}
    >
      <ShadcnCommandDialog {...props}>
        {children}
      </ShadcnCommandDialog>
    </Container>
  );
};

CommandDialog.displayName = 'DevCommandDialog';

// CommandInput component
type ShadcnCommandInputProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandInput>;
type DevCommandInputProps = ShadcnCommandInputProps & DevProps;

export const CommandInput = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandInput>,
  DevCommandInputProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `command-input-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandInput',
          description: devDescription || 'Search input for command palette',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'input', 'search', 'ui'],
        }}
      >
        <ShadcnCommandInput ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnCommandInput ref={ref} {...props} />;
});

CommandInput.displayName = 'DevCommandInput';

// CommandList component
type ShadcnCommandListProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandList>;
type DevCommandListProps = ShadcnCommandListProps & DevProps & { children?: React.ReactNode };

export const CommandList = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandList>,
  DevCommandListProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `command-list-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandList',
          description: devDescription || 'Scrollable list container for command items',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'list', 'container', 'ui'],
        }}
      >
        <ShadcnCommandList ref={ref} {...props}>
          {children}
        </ShadcnCommandList>
      </Container>
    );
  }

  return (
    <ShadcnCommandList ref={ref} {...props}>
      {children}
    </ShadcnCommandList>
  );
});

CommandList.displayName = 'DevCommandList';

// CommandEmpty component
type ShadcnCommandEmptyProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandEmpty>;
type DevCommandEmptyProps = ShadcnCommandEmptyProps & DevProps & { children?: React.ReactNode };

export const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandEmpty>,
  DevCommandEmptyProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `command-empty-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandEmpty',
          description: devDescription || 'Message shown when no commands match',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'empty', 'message', 'ui'],
        }}
      >
        <ShadcnCommandEmpty ref={ref} {...props}>
          {children}
        </ShadcnCommandEmpty>
      </Container>
    );
  }

  return (
    <ShadcnCommandEmpty ref={ref} {...props}>
      {children}
    </ShadcnCommandEmpty>
  );
});

CommandEmpty.displayName = 'DevCommandEmpty';

// CommandGroup component
type ShadcnCommandGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandGroup>;
type DevCommandGroupProps = ShadcnCommandGroupProps & DevProps & { children?: React.ReactNode };

export const CommandGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandGroup>,
  DevCommandGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `command-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandGroup',
          description: devDescription || 'Group container for related command items',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'group', 'container', 'ui'],
        }}
      >
        <ShadcnCommandGroup ref={ref} {...props}>
          {children}
        </ShadcnCommandGroup>
      </Container>
    );
  }

  return (
    <ShadcnCommandGroup ref={ref} {...props}>
      {children}
    </ShadcnCommandGroup>
  );
});

CommandGroup.displayName = 'DevCommandGroup';

// CommandSeparator component
type ShadcnCommandSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandSeparator>;
type DevCommandSeparatorProps = ShadcnCommandSeparatorProps & DevProps;

export const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandSeparator>,
  DevCommandSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `command-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandSeparator',
          description: devDescription || 'Visual separator between command groups',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'separator', 'divider', 'ui'],
        }}
      >
        <ShadcnCommandSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnCommandSeparator ref={ref} {...props} />;
});

CommandSeparator.displayName = 'DevCommandSeparator';

// CommandItem component
type ShadcnCommandItemProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandItem>;
type DevCommandItemProps = ShadcnCommandItemProps & DevProps & { children?: React.ReactNode };

export const CommandItem = React.forwardRef<
  React.ElementRef<typeof ShadcnCommandItem>,
  DevCommandItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `command-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandItem',
          description: devDescription || 'Individual command item',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'item', 'interactive', 'ui'],
        }}
      >
        <ShadcnCommandItem ref={ref} {...props}>
          {children}
        </ShadcnCommandItem>
      </Container>
    );
  }

  return (
    <ShadcnCommandItem ref={ref} {...props}>
      {children}
    </ShadcnCommandItem>
  );
});

CommandItem.displayName = 'DevCommandItem';

// CommandShortcut component
type ShadcnCommandShortcutProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandShortcut>;
type DevCommandShortcutProps = ShadcnCommandShortcutProps & DevProps & { children?: React.ReactNode };

export const CommandShortcut = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevCommandShortcutProps) => {
  const componentId = devId || `command-shortcut-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CommandShortcut',
          description: devDescription || 'Keyboard shortcut display for command items',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'navigation',
          semanticTags: ['command', 'shortcut', 'keyboard', 'text', 'ui'],
        }}
      >
        <ShadcnCommandShortcut {...props}>
          {children}
        </ShadcnCommandShortcut>
      </Container>
    );
  }

  return (
    <ShadcnCommandShortcut {...props}>
      {children}
    </ShadcnCommandShortcut>
  );
};

CommandShortcut.displayName = 'DevCommandShortcut';