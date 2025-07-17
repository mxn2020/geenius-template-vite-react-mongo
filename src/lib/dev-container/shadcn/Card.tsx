import React from 'react';
import { 
  Card as ShadcnCard, 
  CardHeader as ShadcnCardHeader,
  CardTitle as ShadcnCardTitle,
  CardDescription as ShadcnCardDescription,
  CardContent as ShadcnCardContent,
  CardFooter as ShadcnCardFooter
} from '../../../components/ui/card';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevCardProps extends React.HTMLAttributes<HTMLDivElement> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
  children?: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, DevCardProps>(
  ({ devId, devName, devDescription, devSelectable = true, children, ...props }, ref) => {
    const componentId = devId || `card-${generateId()}`;
    
    return (
      <Container
        componentId={componentId}
        selectable={devSelectable}
        meta={{
          id: componentId,
          name: devName || 'Card',
          description: devDescription || 'A card container component',
          filePath: 'src/lib/dev-container/shadcn/Card.tsx',
          category: 'ui',
          semanticTags: ['card', 'container', 'content', 'ui'],
        }}
      >
        <ShadcnCard ref={ref} {...props}>
          {children}
        </ShadcnCard>
      </Container>
    );
  }
);

Card.displayName = 'DevCard';

// Export other card components without dev wrapping (they're part of the card)
export const CardHeader = ShadcnCardHeader;
export const CardTitle = ShadcnCardTitle;
export const CardDescription = ShadcnCardDescription;
export const CardContent = ShadcnCardContent;
export const CardFooter = ShadcnCardFooter;

export { type DevCardProps };