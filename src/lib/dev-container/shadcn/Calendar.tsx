// src/lib/dev-container/shadcn/Calendar.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import { Calendar as ShadcnCalendar, CalendarDayButton as ShadcnCalendarDayButton } from '../../../components/ui/calendar';

type ShadcnCalendarProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendar>;
type ShadcnCalendarDayButtonProps = React.ComponentPropsWithoutRef<typeof ShadcnCalendarDayButton>;

type DevCalendarProps = ShadcnCalendarProps & DevProps;
type DevCalendarDayButtonProps = ShadcnCalendarDayButtonProps & DevProps;

export const Calendar: React.FC<DevCalendarProps> = ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }) => {
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
    return <ShadcnCalendar {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
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
};

Calendar.displayName = 'DevCalendar';

export const CalendarDayButton = React.forwardRef<
  HTMLButtonElement,
  DevCalendarDayButtonProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }) => {
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
    return <ShadcnCalendarDayButton {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'CalendarDayButton',
        description: devDescription || 'Individual day button in calendar',
        filePath: 'src/lib/dev-container/shadcn/Calendar.tsx',
        category: 'form',
        semanticTags: ['calendar', 'day', 'button', 'interactive', 'ui'],
      }}
    >
      <ShadcnCalendarDayButton {...props} />
    </Container>
  );
});

CalendarDayButton.displayName = 'DevCalendarDayButton';