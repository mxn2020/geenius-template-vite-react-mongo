// src/lib/dev-container/shadcn/InputOTP.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

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
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `input-otp-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
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
  const componentId = devId || `input-otp-group-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return (
    <ShadcnInputOTPGroup ref={ref} {...props}>
      {children}
    </ShadcnInputOTPGroup>
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
  const componentId = devId || `input-otp-slot-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return <ShadcnInputOTPSlot ref={ref} {...props} />;
});

InputOTPSlot.displayName = 'DevInputOTPSlot';

// InputOTPSeparator component
type ShadcnInputOTPSeparatorProps = React.ComponentPropsWithoutRef<typeof ShadcnInputOTPSeparator>;
type DevInputOTPSeparatorProps = ShadcnInputOTPSeparatorProps & DevProps;

export const InputOTPSeparator = React.forwardRef<
  React.ElementRef<typeof ShadcnInputOTPSeparator>,
  DevInputOTPSeparatorProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
  const componentId = devId || `input-otp-separator-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
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
  }

  return <ShadcnInputOTPSeparator ref={ref} {...props} />;
});

InputOTPSeparator.displayName = 'DevInputOTPSeparator';