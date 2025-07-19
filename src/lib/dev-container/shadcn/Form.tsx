// src/lib/dev-container/shadcn/Form.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

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

export const Form = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevFormProps) => {
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
      <ShadcnForm {...props}>
        {children}
      </ShadcnForm>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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

export const FormField = ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }: DevFormFieldProps) => {
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
      <ShadcnFormField {...props}>
        {children}
      </ShadcnFormField>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
      <ShadcnFormItem ref={ref} {...props}>
        {children}
      </ShadcnFormItem>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

FormItem.displayName = 'DevFormItem';

// FormLabel component
type ShadcnFormLabelProps = React.ComponentPropsWithoutRef<typeof ShadcnFormLabel>;
type DevFormLabelProps = ShadcnFormLabelProps & DevProps & { children?: React.ReactNode };

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof ShadcnFormLabel>,
  DevFormLabelProps
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
      <ShadcnFormLabel ref={ref} {...props}>
        {children}
      </ShadcnFormLabel>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

FormLabel.displayName = 'DevFormLabel';

// FormControl component
type ShadcnFormControlProps = React.ComponentPropsWithoutRef<typeof ShadcnFormControl>;
type DevFormControlProps = ShadcnFormControlProps & DevProps & { children?: React.ReactNode };

export const FormControl = React.forwardRef<
  React.ElementRef<typeof ShadcnFormControl>,
  DevFormControlProps
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
      <ShadcnFormControl ref={ref} {...props}>
        {children}
      </ShadcnFormControl>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

FormControl.displayName = 'DevFormControl';

// FormDescription component
type ShadcnFormDescriptionProps = React.ComponentPropsWithoutRef<typeof ShadcnFormDescription>;
type DevFormDescriptionProps = ShadcnFormDescriptionProps & DevProps & { children?: React.ReactNode };

export const FormDescription = React.forwardRef<
  React.ElementRef<typeof ShadcnFormDescription>,
  DevFormDescriptionProps
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
      <ShadcnFormDescription ref={ref} {...props}>
        {children}
      </ShadcnFormDescription>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

FormDescription.displayName = 'DevFormDescription';

// FormMessage component
type ShadcnFormMessageProps = React.ComponentPropsWithoutRef<typeof ShadcnFormMessage>;
type DevFormMessageProps = ShadcnFormMessageProps & DevProps & { children?: React.ReactNode };

export const FormMessage = React.forwardRef<
  React.ElementRef<typeof ShadcnFormMessage>,
  DevFormMessageProps
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
      <ShadcnFormMessage ref={ref} {...props}>
        {children}
      </ShadcnFormMessage>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
});

FormMessage.displayName = 'DevFormMessage';

// Export the hook as-is since it doesn't need containerization
export const useFormField = shadcnUseFormField;