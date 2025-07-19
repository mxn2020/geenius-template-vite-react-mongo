// src/lib/dev-container/geenius/Media.tsx

import React from 'react';
import { Container } from '../components/Container';

import { DevProps } from '../types';
import { useDevMode } from '../hooks/useDevMode';

// Image (keeping from previous)
interface DevImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, DevProps {}

export const Img = React.forwardRef<HTMLImageElement, DevImageProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, ...props }, ref) => {
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
      return <img ref={ref} {...props} />;
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Image',
          description: devDescription || 'An image element',
          filePath: 'src/lib/dev-container/geenius/Media.tsx',
          category: 'media',
          semanticTags: ['img', 'image', 'media', 'content'],
        }}
      >
        <img ref={ref} {...props} />
      </Container>
    );
  }
);

// Video
interface DevVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement>, DevProps {
  children?: React.ReactNode;
}

export const Video = React.forwardRef<HTMLVideoElement, DevVideoProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
        <video ref={ref} {...props}>
          {children}
        </video>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Video',
          description: devDescription || 'A video element',
          filePath: 'src/lib/dev-container/geenius/Media.tsx',
          category: 'media',
          semanticTags: ['video', 'media', 'player', 'content'],
        }}
      >
        <video ref={ref} {...props}>
          {children}
        </video>
      </Container>
    );
  }
);

// Audio
interface DevAudioProps extends React.AudioHTMLAttributes<HTMLAudioElement>, DevProps {
  children?: React.ReactNode;
}

export const Audio = React.forwardRef<HTMLAudioElement, DevAudioProps>(
  ({ devId, devName, devDescription, devSelectable = true, devDetailed, children, ...props }, ref) => {
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
        <audio ref={ref} {...props}>
          {children}
        </audio>
      );
    }

    return (
      <Container
        componentId={devId}
        selectable={devSelectable}
        meta={{
          id: devId,
          name: devName || 'Audio',
          description: devDescription || 'An audio element',
          filePath: 'src/lib/dev-container/geenius/Media.tsx',
          category: 'media',
          semanticTags: ['audio', 'media', 'player', 'content'],
        }}
      >
        <audio ref={ref} {...props}>
          {children}
        </audio>
      </Container>
    );
  }
);

Img.displayName = 'DevImg';
Video.displayName = 'DevVideo';
Audio.displayName = 'DevAudio';

export { type DevImageProps, type DevVideoProps, type DevAudioProps };

