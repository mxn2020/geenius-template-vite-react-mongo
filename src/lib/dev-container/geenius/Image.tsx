// src/lib/dev-container/geenius/Image.tsx

import React from 'react';
import { Container } from '../components/Container';
import { generateId } from '../utils/storage';
import { DevProps } from '../types';

interface DevImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, DevProps {}

export const Img = React.forwardRef<HTMLImageElement, DevImageProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
    const componentId = devId || `img-${generateId()}`;
    const shouldContainerize = devDetailed !== false;
    
    if (shouldContainerize) {
      return (
        <Container
          componentId={componentId}
          selectable={devSelectable}
          meta={{
            id: componentId,
            name: devName || 'Image',
            description: devDescription || 'An image element',
            filePath: 'src/lib/dev-container/geenius/Image.tsx',
            category: 'media',
            semanticTags: ['img', 'image', 'media', 'content'],
          }}
        >
          <img ref={ref} {...props} />
        </Container>
      );
    }

    return <img ref={ref} {...props} />;
  }
);

Img.displayName = 'DevImage';

export { type DevImageProps };