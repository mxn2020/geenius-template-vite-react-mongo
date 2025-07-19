// src/lib/dev-container/shadcn/Select.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Select as ShadcnSelect,
  SelectGroup as ShadcnSelectGroup,
  SelectValue as ShadcnSelectValue,
  SelectTrigger as ShadcnSelectTrigger,
  SelectContent as ShadcnSelectContent,
  SelectLabel as ShadcnSelectLabel,
  SelectItem as ShadcnSelectItem,
  SelectSeparator as ShadcnSelectSeparator,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectScrollDownButton as ShadcnSelectScrollDownButton,
} from '../../../components/ui/select';

// Select root component (FC type)
type ShadcnSelectProps = React.ComponentProps<typeof ShadcnSelect>;
type DevSelectProps = ShadcnSelectProps & DevProps & { children?: React.ReactNode };

export const Select = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevSelectProps) => {
  const componentId = devId || `select-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Select',
        description: devDescription || 'Select root component',
        filePath: 'src/lib/dev-container/shadcn/Select.tsx',
        category: 'form',
        semanticTags: ['select', 'dropdown', 'form', 'ui'],
      }}
    >
      <ShadcnSelect {...props}>
        {children}
      </ShadcnSelect>
    </Container>
  );
};

Select.displayName = 'DevSelect';

// SelectGroup component
type ShadcnSelectGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectGroup>;
type DevSelectGroupProps = ShadcnSelectGroupProps & DevProps & { children?: React.ReactNode };

export const SelectGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectGroup>,
  DevSelectGroupProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectGroup',
          description: devDescription || 'Group container for select items',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'group', 'container', 'ui'],
        }}
      >
        <ShadcnSelectGroup ref={ref} {...props}>
          {children}
        </ShadcnSelectGroup>
      </Container>
    );
  }

  return (
    <ShadcnSelectGroup ref={ref} {...props}>
      {children}
    </ShadcnSelectGroup>
  );
});

SelectGroup.displayName = 'DevSelectGroup';

// SelectValue component
type ShadcnSelectValueProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectValue>;
type DevSelectValueProps = ShadcnSelectValueProps & DevProps;

export const SelectValue = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectValue>,
  DevSelectValueProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `select-value-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectValue',
          description: devDescription || 'Displays the selected value',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'value', 'display', 'ui'],
        }}
      >
        <ShadcnSelectValue ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnSelectValue ref={ref} {...props} />;
});

SelectValue.displayName = 'DevSelectValue';

// SelectTrigger component
type ShadcnSelectTriggerProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectTrigger>;
type DevSelectTriggerProps = ShadcnSelectTriggerProps & DevProps & { children?: React.ReactNode };

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectTrigger>,
  DevSelectTriggerProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-trigger-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectTrigger',
          description: devDescription || 'Button that opens the select dropdown',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'trigger', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnSelectTrigger ref={ref} {...props}>
          {children}
        </ShadcnSelectTrigger>
      </Container>
    );
  }

  return (
    <ShadcnSelectTrigger ref={ref} {...props}>
      {children}
    </ShadcnSelectTrigger>
  );
});

SelectTrigger.displayName = 'DevSelectTrigger';

// SelectContent component
type ShadcnSelectContentProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectContent>;
type DevSelectContentProps = ShadcnSelectContentProps & DevProps & { children?: React.ReactNode };

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectContent>,
  DevSelectContentProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `select-content-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'SelectContent',
        description: devDescription || 'Dropdown content container for select options',
        filePath: 'src/lib/dev-container/shadcn/Select.tsx',
        category: 'form',
        semanticTags: ['select', 'content', 'dropdown', 'ui'],
      }}
    >
      <ShadcnSelectContent ref={ref} {...props}>
        {children}
      </ShadcnSelectContent>
    </Container>
  );
});

SelectContent.displayName = 'DevSelectContent';

// SelectLabel component
type ShadcnSelectLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectLabel>;
type DevSelectLabelProps = ShadcnSelectLabelProps & DevProps & { children?: React.ReactNode };

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectLabel>,
  DevSelectLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectLabel',
          description: devDescription || 'Label for select option groups',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'label', 'text', 'ui'],
        }}
      >
        <ShadcnSelectLabel ref={ref} {...props}>
          {children}
        </ShadcnSelectLabel>
      </Container>
    );
  }

  return (
    <ShadcnSelectLabel ref={ref} {...props}>
      {children}
    </ShadcnSelectLabel>
  );
});

SelectLabel.displayName = 'DevSelectLabel';

// SelectItem component
type ShadcnSelectItemProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectItem>;
type DevSelectItemProps = ShadcnSelectItemProps & DevProps & { children?: React.ReactNode };

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectItem>,
  DevSelectItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectItem',
          description: devDescription || 'Individual select option',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'item', 'option', 'interactive', 'ui'],
        }}
      >
        <ShadcnSelectItem ref={ref} {...props}>
          {children}
        </ShadcnSelectItem>
      </Container>
    );
  }

  return (
    <ShadcnSelectItem ref={ref} {...props}>
      {children}
    </ShadcnSelectItem>
  );
});

SelectItem.displayName = 'DevSelectItem';

// SelectSeparator component
type ShadcnSelectSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectSeparator>;
type DevSelectSeparatorProps = ShadcnSelectSeparatorProps & DevProps;

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectSeparator>,
  DevSelectSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `select-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectSeparator',
          description: devDescription || 'Visual separator between select groups',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'separator', 'divider', 'ui'],
        }}
      >
        <ShadcnSelectSeparator ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnSelectSeparator ref={ref} {...props} />;
});

SelectSeparator.displayName = 'DevSelectSeparator';

// SelectScrollUpButton component
type ShadcnSelectScrollUpButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectScrollUpButton>;
type DevSelectScrollUpButtonProps = ShadcnSelectScrollUpButtonProps & DevProps & { children?: React.ReactNode };

export const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectScrollUpButton>,
  DevSelectScrollUpButtonProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-scroll-up-button-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectScrollUpButton',
          description: devDescription || 'Button to scroll up in select dropdown',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'scroll', 'button', 'navigation', 'ui'],
        }}
      >
        <ShadcnSelectScrollUpButton ref={ref} {...props}>
          {children}
        </ShadcnSelectScrollUpButton>
      </Container>
    );
  }

  return (
    <ShadcnSelectScrollUpButton ref={ref} {...props}>
      {children}
    </ShadcnSelectScrollUpButton>
  );
});

SelectScrollUpButton.displayName = 'DevSelectScrollUpButton';

// SelectScrollDownButton component
type ShadcnSelectScrollDownButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnSelectScrollDownButton>;
type DevSelectScrollDownButtonProps = ShadcnSelectScrollDownButtonProps & DevProps & { children?: React.ReactNode };

export const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof ShadcnSelectScrollDownButton>,
  DevSelectScrollDownButtonProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `select-scroll-down-button-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'SelectScrollDownButton',
          description: devDescription || 'Button to scroll down in select dropdown',
          filePath: 'src/lib/dev-container/shadcn/Select.tsx',
          category: 'form',
          semanticTags: ['select', 'scroll', 'button', 'navigation', 'ui'],
        }}
      >
        <ShadcnSelectScrollDownButton ref={ref} {...props}>
          {children}
        </ShadcnSelectScrollDownButton>
      </Container>
    );
  }

  return (
    <ShadcnSelectScrollDownButton ref={ref} {...props}>
      {children}
    </ShadcnSelectScrollDownButton>
  );
});

SelectScrollDownButton.displayName = 'DevSelectScrollDownButton';