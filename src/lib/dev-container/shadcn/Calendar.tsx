// src/lib/dev-container/shadcn/Calendar.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import { Calendar as ShadcnCalendar, CalendarDayButton as ShadcnCalendarDayButton } from '../../../components/ui/calendar';

type ShadcnCalendarProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendar>;
type ShadcnCalendarDayButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendarDayButton>;

type DevCalendarProps = ShadcnCalendarProps & DevProps & { children?: React.ReactNode };
type DevCalendarDayButtonProps = ShadcnCalendarDayButtonProps & DevProps & { children?: React.ReactNode };

export const Calendar = React.forwardRef<
  HTMLDivElement,
  DevCalendarProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }) => {
  const componentId = devId || `calendar-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Calendar',
        description: devDescription || 'Date picker calendar component',
        filePath: 'src/lib/dev-container/shadcn/Calendar.tsx',
        category: 'form',
        semanticTags: ['calendar', 'date-picker', 'form', 'interactive', 'ui'],
      }}
    >
      <ShadcnCalendar {...props} />
    </Container>
  );
});

Calendar.displayName = 'DevCalendar';

export const CalendarDayButton = React.forwardRef<
  React.ElementRef<typeof ShadcnCalendarDayButton>,
  DevCalendarDayButtonProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }) => {
  const componentId = devId || `calendar-day-button-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'CalendarDayButton',
          description: devDescription || 'Individual day button in calendar',
          filePath: 'src/lib/dev-container/shadcn/Calendar.tsx',
          category: 'form',
          semanticTags: ['calendar', 'day', 'button', 'interactive', 'ui'],
        }}
      >
        <ShadcnCalendarDayButton {...props}>
          {children}
        </ShadcnCalendarDayButton>
      </Container>
    );
  }

  return (
    <ShadcnCalendarDayButton {...props}>
      {children}
    </ShadcnCalendarDayButton>
  );
});

CalendarDayButton.displayName = 'DevCalendarDayButton';

