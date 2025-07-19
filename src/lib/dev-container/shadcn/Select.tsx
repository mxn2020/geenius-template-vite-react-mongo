import React from 'react';
import { 
  Select as ShadcnSelect,
  SelectValue as ShadcnSelectValue,
  SelectTrigger as ShadcnSelectTrigger,
  SelectContent as ShadcnSelectContent,
  SelectItem as ShadcnSelectItem,
  SelectLabel as ShadcnSelectLabel,
  SelectSeparator as ShadcnSelectSeparator,
  SelectGroup as ShadcnSelectGroup,
  SelectScrollUpButton as ShadcnSelectScrollUpButton,
  SelectScrollDownButton as ShadcnSelectScrollDownButton
} from '../../../components/ui/select';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSelectProps extends React.ComponentProps<typeof ShadcnSelect> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Select = React.forwardRef<
  React.ElementRef<typeof ShadcnSelect>,
  DevSelectProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `select-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Select',
        description: devDescription || 'A select dropdown component',
        filePath: 'src/lib/dev-container/shadcn/Select.tsx',
        category: 'ui',
        semanticTags: ['select', 'form', 'dropdown', 'ui'],
      }}
    >
      <ShadcnSelect ref={ref} {...props} />
    </Container>
  );
});

Select.displayName = 'DevSelect';

// Export other select components without dev wrapping
export const SelectValue = ShadcnSelectValue;
export const SelectTrigger = ShadcnSelectTrigger;
export const SelectContent = ShadcnSelectContent;
export const SelectItem = ShadcnSelectItem;
export const SelectLabel = ShadcnSelectLabel;
export const SelectSeparator = ShadcnSelectSeparator;
export const SelectGroup = ShadcnSelectGroup;
export const SelectScrollUpButton = ShadcnSelectScrollUpButton;
export const SelectScrollDownButton = ShadcnSelectScrollDownButton;

export { type DevSelectProps };