import React from 'react';
import { 
  Avatar as ShadcnAvatar,
  AvatarImage as ShadcnAvatarImage,
  AvatarFallback as ShadcnAvatarFallback
} from '../../../components/ui/avatar';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevAvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Avatar = React.forwardRef<HTMLSpanElement, DevAvatarProps>(
  ({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
    const componentId = devId || `avatar-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Avatar',
          description: devDescription || 'A user avatar component',
          filePath: 'src/lib/dev-container/shadcn/Avatar.tsx',
          category: 'ui',
          semanticTags: ['avatar', 'user', 'profile', 'ui'],
        }}
      >
        <ShadcnAvatar ref={ref} {...props} />
      </Container>
    );
  }
);

Avatar.displayName = 'DevAvatar';

// Export other avatar components without dev wrapping
export const AvatarImage = ShadcnAvatarImage;
export const AvatarFallback = ShadcnAvatarFallback;

export { type DevAvatarProps };