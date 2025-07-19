// src/lib/dev-container/shadcn/InputOTP.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

import {
  InputOTP as ShadcnInputOTP,
  InputOTPGroup as ShadcnInputOTPGroup,
  InputOTPSlot as ShadcnInputOTPSlot,
  InputOTPSeparator as ShadcnInputOTPSeparator,
} from '../../../components/ui/input-otp';

// InputOTP root component
type ShadcnInputOTPProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTP>;
type DevInputOTPProps = ShadcnInputOTPProps & DevProps;

export const InputOTP = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTP>,
  DevInputOTPProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
    return <ShadcnInputOTP ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'InputOTP',
        description: devDescription || 'One-time password input component',
        filePath: 'src/lib/dev-container/shadcn/InputOTP.tsx',
        category: 'form',
        semanticTags: ['input', 'otp', 'password', 'form', 'ui'],
      }}
    >
      <ShadcnInputOTP ref={ref} {...props} />
    </Container>
  );
});

InputOTP.displayName = 'DevInputOTP';

// InputOTPGroup component
type ShadcnInputOTPGroupProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPGroup>;
type DevInputOTPGroupProps = ShadcnInputOTPGroupProps & DevProps & { children?: React.ReactNode };

export const InputOTPGroup = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPGroup>,
  DevInputOTPGroupProps
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
      <ShadcnInputOTPGroup ref={ref} {...props}>
        {children}
      </ShadcnInputOTPGroup>
    );
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'InputOTPGroup',
        description: devDescription || 'Group container for OTP input slots',
        filePath: 'src/lib/dev-container/shadcn/InputOTP.tsx',
        category: 'form',
        semanticTags: ['input', 'otp', 'group', 'container', 'ui'],
      }}
    >
      <ShadcnInputOTPGroup ref={ref} {...props}>
        {children}
      </ShadcnInputOTPGroup>
    </Container>
  );
});

InputOTPGroup.displayName = 'DevInputOTPGroup';

// InputOTPSlot component
type ShadcnInputOTPSlotProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSlot>;
type DevInputOTPSlotProps = ShadcnInputOTPSlotProps & DevProps;

export const InputOTPSlot = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSlot>,
  DevInputOTPSlotProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
    return <ShadcnInputOTPSlot ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'InputOTPSlot',
        description: devDescription || 'Individual slot for OTP digit input',
        filePath: 'src/lib/dev-container/shadcn/InputOTP.tsx',
        category: 'form',
        semanticTags: ['input', 'otp', 'slot', 'digit', 'ui'],
      }}
    >
      <ShadcnInputOTPSlot ref={ref} {...props} />
    </Container>
  );
});

InputOTPSlot.displayName = 'DevInputOTPSlot';

// InputOTPSeparator component
type ShadcnInputOTPSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSeparator>;
type DevInputOTPSeparatorProps = ShadcnInputOTPSeparatorProps & DevProps;

export const InputOTPSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSeparator>,
  DevInputOTPSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
    return <ShadcnInputOTPSeparator ref={ref} {...props} />;
  }

  return (
    <Container
      componentId={devId}
      selectable={devSelectable}
      meta={{
        id: devId,
        name: devName || 'InputOTPSeparator',
        description: devDescription || 'Visual separator between OTP groups',
        filePath: 'src/lib/dev-container/shadcn/InputOTP.tsx',
        category: 'form',
        semanticTags: ['input', 'otp', 'separator', 'divider', 'ui'],
      }}
    >
      <ShadcnInputOTPSeparator ref={ref} {...props} />
    </Container>
  );
});

InputOTPSeparator.displayName = 'DevInputOTPSeparator';