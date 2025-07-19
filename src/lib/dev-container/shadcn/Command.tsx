// src/lib/dev-container/shadcn/Command.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

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

type ShadcnCommandProps = React.ComponentPropsWithoutRef<typeof ShadcnCommand>;
type ShadcnCommandDialogProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandDialog>;
type ShadcnCommandInputProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandInput>;
type ShadcnCommandListProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandList>;
type ShadcnCommandEmptyProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandEmpty>;
type ShadcnCommandGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandGroup>;
type ShadcnCommandItemProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandItem>;
type ShadcnCommandSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnCommandSeparator>;

type DevCommandProps = ShadcnCommandProps & DevProps & { children?: React.ReactNode };
type DevCommandDialogProps = ShadcnCommandDialogProps & DevProps & { children?: React.ReactNode };
type DevCommandInputProps = ShadcnCommandInputProps & DevProps;
type DevCommandListProps = ShadcnCommandListProps & DevProps & { children?: React.ReactNode };
type DevCommandEmptyProps = ShadcnCommandEmptyProps & DevProps & { children?: React.ReactNode };
type DevCommandGroupProps = ShadcnCommandGroupProps & DevProps & { children?: React.ReactNode };
type DevCommandItemProps = ShadcnCommandItemProps & DevProps & { children?: React.ReactNode };
type DevCommandSeparatorProps = ShadcnCommandSeparatorProps & DevProps;
type DevCommandShortcutProps = React.HTMLAttributes<HTMLSpanElement> & DevProps & { children?: React.ReactNode };

export const Command = React.forwardRef<
  React.ElementRef<typeof ShadcnCommand>,
  DevCommandProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `command-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Command',
        description: devDescription || 'Command menu component for search and actions',
        filePath: 'src/lib/dev-container/shadcn/Command.tsx',
        category: 'navigation',
        semanticTags: ['command', 'search', 'menu', 'navigation', 'ui'],
      }}
    >
      <ShadcnCommand ref={ref} {...props}>
        {children}
      </ShadcnCommand>
    </Container>
  );
});

Command.displayName = 'DevCommand';

export const CommandDialog = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevCommandDialogProps) => {
  const componentId = devId || `command-dialog-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'CommandDialog',
        description: devDescription || 'Dialog wrapper for command menu',
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

// Other Command components with devDetailed support...
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
          description: devDescription || 'Search input for command menu',
          filePath: 'src/lib/dev-container/shadcn/Command.tsx',
          category: 'form',
          semanticTags: ['command', 'input', 'search', 'form', 'ui'],
        }}
      >
        <ShadcnCommandInput ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnCommandInput ref={ref} {...props} />;
});

CommandInput.displayName = 'DevCommandInput';

// Export CommandShortcut as simple function component
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
          category: 'ui',
          semanticTags: ['command', 'shortcut', 'keyboard', 'ui'],
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

