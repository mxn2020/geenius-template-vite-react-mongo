import React from 'react';
import { 
  Sheet as ShadcnSheet,
  SheetPortal as ShadcnSheetPortal,
  SheetOverlay as ShadcnSheetOverlay,
  SheetTrigger as ShadcnSheetTrigger,
  SheetClose as ShadcnSheetClose,
  SheetContent as ShadcnSheetContent,
  SheetHeader as ShadcnSheetHeader,
  SheetFooter as ShadcnSheetFooter,
  SheetTitle as ShadcnSheetTitle,
  SheetDescription as ShadcnSheetDescription
} from '../../../components/ui/sheet';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';

interface DevSheetProps extends React.ComponentProps<typeof ShadcnSheet> {
  devId?: string;
  devName?: string;
  devDescription?: string;
  devSelectable?: boolean;
}

export const Sheet = React.forwardRef<
  React.ElementRef<typeof ShadcnSheet>,
  DevSheetProps
>(({ devId, devName, devDescription, devSelectable = true, ...props }, ref) => {
  const componentId = devId || `sheet-${generateId()}`;
  
  return (
    <Container
      componentId={componentId}
      selectable={devSelectable}
      meta={{
        id: componentId,
        name: devName || 'Sheet',
        description: devDescription || 'A slide-out sheet component',
        filePath: 'src/lib/dev-container/shadcn/Sheet.tsx',
        category: 'ui',
        semanticTags: ['sheet', 'drawer', 'sidebar', 'ui'],
      }}
    >
      <ShadcnSheet ref={ref} {...props} />
    </Container>
  );
});

Sheet.displayName = 'DevSheet';

// Export other sheet components without dev wrapping
export const SheetPortal = ShadcnSheetPortal;
export const SheetOverlay = ShadcnSheetOverlay;
export const SheetTrigger = ShadcnSheetTrigger;
export const SheetClose = ShadcnSheetClose;
export const SheetContent = ShadcnSheetContent;
export const SheetHeader = ShadcnSheetHeader;
export const SheetFooter = ShadcnSheetFooter;
export const SheetTitle = ShadcnSheetTitle;
export const SheetDescription = ShadcnSheetDescription;

export { type DevSheetProps };
