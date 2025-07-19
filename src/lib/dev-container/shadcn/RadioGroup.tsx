// src/lib/dev-container/shadcn/RadioGroup.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from '../../../components/ui/radio-group';

// RadioGroup component
type ShadcnRadioGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup>;
type DevRadioGroupProps = ShadcnRadioGroupProps & DevProps & { children?: React.ReactNode };

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroup>,
  DevRadioGroupProps
>(({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
  const componentId = devId || `radio-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'RadioGroup',
        description: devDescription || 'Radio group for single selection',
        filePath: 'src/lib/dev-container/shadcn/RadioGroup.tsx',
        category: 'form',
        semanticTags: ['radio', 'group', 'form', 'selection', 'ui'],
      }}
    >
      <ShadcnRadioGroup ref={ref} {...props}>
        {children}
      </ShadcnRadioGroup>
    </Container>
  );
});

RadioGroup.displayName = 'DevRadioGroup';

// RadioGroupItem component
type ShadcnRadioGroupItemProps = React.ComponentPropsWithoutRef<typeof ShadcnRadioGroupItem>;
type DevRadioGroupItemProps = ShadcnRadioGroupItemProps & DevProps;

export const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroupItem>,
  DevRadioGroupItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `radio-group-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'RadioGroupItem',
          description: devDescription || 'Individual radio button',
          filePath: 'src/lib/dev-container/shadcn/RadioGroup.tsx',
          category: 'form',
          semanticTags: ['radio', 'item', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnRadioGroupItem ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnRadioGroupItem ref={ref} {...props} />;
});

RadioGroupItem.displayName = 'DevRadioGroupItem';

