// src/lib/dev-container/shadcn/Avatar.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

import {
  Avatar as ShadcnAvatar,
  AvatarImage as ShadcnAvatarImage,
  AvatarFallback as ShadcnAvatarFallback
} from '../../../components/ui/avatar';

type ShadcnAvatarProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatar>;
type ShadcnAvatarImageProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatarImage>;
type ShadcnAvatarFallbackProps = React.ComponentPropsWithoutRef<typeof ShadcnAvatarFallback>;

type DevAvatarProps = ShadcnAvatarProps & DevProps & { children?: React.ReactNode };
type DevAvatarImageProps = ShadcnAvatarImageProps & DevProps & { children?: React.ReactNode };
type DevAvatarFallbackProps = ShadcnAvatarFallbackProps & DevProps & { children?: React.ReactNode };

export const Avatar = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatar>,
  DevAvatarProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `avatar-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Avatar',
        description: devDescription || 'User profile picture or placeholder',
        filePath: 'src/lib/dev-container/shadcn/Avatar.tsx',
        category: 'ui',
        semanticTags: ['avatar', 'profile', 'image', 'user', 'ui'],
      }}
    >
      <ShadcnAvatar ref={ref} {...props}>
        {children}
      </ShadcnAvatar>
    </Container>
  );
});

Avatar.displayName = 'DevAvatar';

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatarImage>,
  DevAvatarImageProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `avatar-image-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'AvatarImage',
          description: devDescription || 'The actual image displayed in the avatar',
          filePath: 'src/lib/dev-container/shadcn/Avatar.tsx',
          category: 'ui',
          semanticTags: ['avatar', 'image', 'media', 'ui'],
        }}
      >
        <ShadcnAvatarImage ref={ref} {...props}>
          {children}
        </ShadcnAvatarImage>
      </Container>
    );
  }

  return (
    <ShadcnAvatarImage ref={ref} {...props}>
      {children}
    </ShadcnAvatarImage>
  );
});

AvatarImage.displayName = 'DevAvatarImage';

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof ShadcnAvatarFallback>,
  DevAvatarFallbackProps
>(({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
  const componentId = devId || `avatar-fallback-${generateId()}`;
  const shouldContainerize = devDetailed !== false;
  
  if (shouldContainerize) {
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'AvatarFallback',
          description: devDescription || 'Fallback content when avatar image fails to load',
          filePath: 'src/lib/dev-container/shadcn/Avatar.tsx',
          category: 'ui',
          semanticTags: ['avatar', 'fallback', 'placeholder', 'ui'],
        }}
      >
        <ShadcnAvatarFallback ref={ref} {...props}>
          {children}
        </ShadcnAvatarFallback>
      </Container>
    );
  }

  return (
    <ShadcnAvatarFallback ref={ref} {...props}>
      {children}
    </ShadcnAvatarFallback>
  );
});

AvatarFallback.displayName = 'DevAvatarFallback';

