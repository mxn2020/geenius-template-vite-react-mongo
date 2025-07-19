import React from 'react';
import { 
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem
} from '../../../components/ui/radio-group';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevRadioGroupProps extends React.ComponentPropsWithoutRef<typeof ShadcnRadioGroup> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnRadioGroup>,
  DevRadioGroupProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `radio-group-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'RadioGroup',
        description: devDescription || 'A radio button group component',
        filePath: 'src/lib/dev-container/shadcn/RadioGroup.tsx',
        category: 'ui',
        semanticTags: ['radio', 'group', 'form', 'ui'],
      }}
    >
      <ShadcnRadioGroup ref={ref} {...props} />
    </Container>
  );
});

RadioGroup.displayName = 'DevRadioGroup';

// Export RadioGroupItem without dev wrapping
export const RadioGroupItem = ShadcnRadioGroupItem;

export { type DevRadioGroupProps }; 
