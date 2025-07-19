// src/lib/dev-container/shadcn/Form.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  useFormField as shadcnUseFormField,
  Form as ShadcnForm,
  FormItem as ShadcnFormItem,
  FormLabel as ShadcnFormLabel,
  FormControl as ShadcnFormControl,
  FormDescription as ShadcnFormDescription,
  FormMessage as ShadcnFormMessage,
  FormField as ShadcnFormField,
} from '../../../components/ui/form';

// Form root component
type ShadcnFormProps = React.ComponentPropsWithoutRef<typeof ShadcnForm>;
type DevFormProps = ShadcnFormProps & DevProps & { children?: React.ReactNode };

export const Form = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevFormProps) => {
  const componentId = devId || `form-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Form',
        description: devDescription || 'Form root component using react-hook-form',
        filePath: 'src/lib/dev-container/shadcn/Form.tsx',
        category: 'form',
        semanticTags: ['form', 'react-hook-form', 'validation', 'ui'],
      }}
    >
      <ShadcnForm {...props}>
        {children}
      </ShadcnForm>
    </Container>
  );
};

Form.displayName = 'DevForm';

// FormField component
type ShadcnFormFieldProps = React.ComponentPropsWithoutRef<typeof ShadcnFormField>;
type DevFormFieldProps = ShadcnFormFieldProps & DevProps & { children?: React.ReactNode };

export const FormField = ({ devId, devName, devDescription, devSelectable = true, children, ...props }: DevFormFieldProps) => {
  const componentId = devId || `form-field-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'FormField',
        description: devDescription || 'Form field wrapper with validation context',
        filePath: 'src/lib/dev-container/shadcn/Form.tsx',
        category: 'form',
        semanticTags: ['form', 'field', 'validation', 'context', 'ui'],
      }}
    >
      <ShadcnFormField {...props}>
        {children}
      </ShadcnFormField>
    </Container>
  );
};

FormField.displayName = 'DevFormField';

// FormItem component
type ShadcnFormItemProps = React.ComponentPropsWithoutRef<typeof ShadcnFormItem>;
type DevFormItemProps = ShadcnFormItemProps & DevProps & { children?: React.ReactNode };

export const FormItem = React.forwardRef<
  React.ElementRef<typeof ShadcnFormItem>,
  DevFormItemProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `form-item-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'FormItem',
          description: devDescription || 'Form item container with spacing and context',
          filePath: 'src/lib/dev-container/shadcn/Form.tsx',
          category: 'form',
          semanticTags: ['form', 'item', 'container', 'spacing', 'ui'],
        }}
      >
        <ShadcnFormItem ref={ref} {...props}>
          {children}
        </ShadcnFormItem>
      </Container>
    );
  }

  return (
    <ShadcnFormItem ref={ref} {...props}>
      {children}
    </ShadcnFormItem>
  );
});

FormItem.displayName = 'DevFormItem';

// FormLabel component
type ShadcnFormLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnFormLabel>;
type DevFormLabelProps = ShadcnFormLabelProps & DevProps & { children?: React.ReactNode };

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnFormLabel>,
  DevFormLabelProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `form-label-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'FormLabel',
          description: devDescription || 'Form label with error state styling',
          filePath: 'src/lib/dev-container/shadcn/Form.tsx',
          category: 'form',
          semanticTags: ['form', 'label', 'accessibility', 'error', 'ui'],
        }}
      >
        <ShadcnFormLabel ref={ref} {...props}>
          {children}
        </ShadcnFormLabel>
      </Container>
    );
  }

  return (
    <ShadcnFormLabel ref={ref} {...props}>
      {children}
    </ShadcnFormLabel>
  );
});

FormLabel.displayName = 'DevFormLabel';

// FormControl component
type ShadcnFormControlProps = React.ComponentPropsWithoutRef<typeof ShadcnFormControl>;
type DevFormControlProps = ShadcnFormControlProps & DevProps & { children?: React.ReactNode };

export const FormControl = React.forwardRef<
  React.ElementRef<typeof ShadcnFormControl>,
  DevFormControlProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `form-control-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'FormControl',
          description: devDescription || 'Form control wrapper with accessibility attributes',
          filePath: 'src/lib/dev-container/shadcn/Form.tsx',
          category: 'form',
          semanticTags: ['form', 'control', 'accessibility', 'wrapper', 'ui'],
        }}
      >
        <ShadcnFormControl ref={ref} {...props}>
          {children}
        </ShadcnFormControl>
      </Container>
    );
  }

  return (
    <ShadcnFormControl ref={ref} {...props}>
      {children}
    </ShadcnFormControl>
  );
});

FormControl.displayName = 'DevFormControl';

// FormDescription component
type ShadcnFormDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnFormDescription>;
type DevFormDescriptionProps = ShadcnFormDescriptionProps & DevProps & { children?: React.ReactNode };

export const FormDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnFormDescription>,
  DevFormDescriptionProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `form-description-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'FormDescription',
          description: devDescription || 'Form field description text',
          filePath: 'src/lib/dev-container/shadcn/Form.tsx',
          category: 'form',
          semanticTags: ['form', 'description', 'help', 'text', 'ui'],
        }}
      >
        <ShadcnFormDescription ref={ref} {...props}>
          {children}
        </ShadcnFormDescription>
      </Container>
    );
  }

  return (
    <ShadcnFormDescription ref={ref} {...props}>
      {children}
    </ShadcnFormDescription>
  );
});

FormDescription.displayName = 'DevFormDescription';

// FormMessage component
type ShadcnFormMessageProps = React.ComponentPropsWithoutRef<typeof ShadcnFormMessage>;
type DevFormMessageProps = ShadcnFormMessageProps & DevProps & { children?: React.ReactNode };

export const FormMessage = React.forwardRef<
  React.ElementRef<typeof ShadcnFormMessage>,
  DevFormMessageProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `form-message-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'FormMessage',
          description: devDescription || 'Form validation error message',
          filePath: 'src/lib/dev-container/shadcn/Form.tsx',
          category: 'form',
          semanticTags: ['form', 'message', 'error', 'validation', 'ui'],
        }}
      >
        <ShadcnFormMessage ref={ref} {...props}>
          {children}
        </ShadcnFormMessage>
      </Container>
    );
  }

  return (
    <ShadcnFormMessage ref={ref} {...props}>
      {children}
    </ShadcnFormMessage>
  );
});

FormMessage.displayName = 'DevFormMessage';

// Export the hook as-is since it doesn't need containerization
export const useFormField = shadcnUseFormField;