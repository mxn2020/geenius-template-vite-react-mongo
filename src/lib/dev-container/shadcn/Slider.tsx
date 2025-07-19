// src/lib/dev-container/shadcn/Slider.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Slider as ShadcnSlider } from '../../../components/ui/slider';

// Slider component
type ShadcnSliderProps = React.ComponentPropsWithoutRef<typeof ShadcnSlider>;
type DevSliderProps = ShadcnSliderProps & DevProps;

export const Slider = React.forwardRef<
  React.ElementRef<typeof ShadcnSlider>,
  DevSliderProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `slider-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Slider',
          description: devDescription || 'Range slider input component',
          filePath: 'src/lib/dev-container/shadcn/Slider.tsx',
          category: 'form',
          semanticTags: ['slider', 'range', 'input', 'form', 'ui'],
        }}
      >
        <ShadcnSlider ref={ref} {...props} />
      </Container>
    );
  }

  return <ShadcnSlider ref={ref} {...props} />;
});

Slider.displayName = 'DevSlider';