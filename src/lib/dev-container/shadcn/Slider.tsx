import React from 'react';
import { Slider as ShadcnSlider } from '../../../components/ui/slider';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSliderProps extends React.ComponentPropsWithoutRef<typeof ShadcnSlider> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Slider = React.forwardRef<
  React.ElementRef<typeof ShadcnSlider>,
  DevSliderProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `slider-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Slider',
        description: devDescription || 'A slider range input component',
        filePath: 'src/lib/dev-container/shadcn/Slider.tsx',
        category: 'ui',
        semanticTags: ['slider', 'range', 'input', 'ui'],
      }}
    >
      <ShadcnSlider ref={ref} {...props} />
    </Container>
  );
});

Slider.displayName = 'DevSlider';

export { type DevSliderProps }; 
