import { PopoverPosition } from '../types';

export const calculatePopoverPosition = (
  element: HTMLElement,
  popoverWidth: number = 320,
  popoverHeight: number = 300
): PopoverPosition => {
  const rect = element.getBoundingClientRect();
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  
  // Calculate available space in each direction
  const spaceTop = rect.top;
  const spaceBottom = viewport.height - rect.bottom;
  const spaceLeft = rect.left;
  const spaceRight = viewport.width - rect.right;
  
  // Determine best placement - prefer top or centered positions for large elements
  let placement: PopoverPosition['placement'] = 'top';
  let top = rect.top - popoverHeight - 8;
  let left = rect.left + (rect.width / 2) - (popoverWidth / 2);
  
  // If element is very large (like full page), center the popover
  if (rect.height > viewport.height * 0.8) {
    placement = 'right';
    top = viewport.height / 2 - popoverHeight / 2;
    left = Math.min(rect.right + 16, viewport.width - popoverWidth - 16);
  }
  // Check if popover fits above
  else if (spaceTop < popoverHeight + 16) {
    // Try below
    if (spaceBottom > popoverHeight + 16) {
      placement = 'bottom';
      top = rect.bottom + 8;
    }
    // Try to the right
    else if (spaceRight > popoverWidth + 16) {
      placement = 'right';
      top = rect.top + (rect.height / 2) - (popoverHeight / 2);
      left = rect.right + 8;
    }
    // Try to the left
    else if (spaceLeft > popoverWidth + 16) {
      placement = 'left';
      top = rect.top + (rect.height / 2) - (popoverHeight / 2);
      left = rect.left - popoverWidth - 8;
    }
    // Fallback: center in viewport
    else {
      placement = 'bottom';
      top = viewport.height / 2 - popoverHeight / 2;
      left = viewport.width / 2 - popoverWidth / 2;
    }
  }
  
  // Ensure popover doesn't go outside viewport
  const margin = 16;
  
  if (placement === 'top' || placement === 'bottom') {
    // Horizontal bounds
    if (left < margin) {
      left = margin;
    } else if (left + popoverWidth > viewport.width - margin) {
      left = viewport.width - popoverWidth - margin;
    }
  } else {
    // Vertical bounds
    if (top < margin) {
      top = margin;
    } else if (top + popoverHeight > viewport.height - margin) {
      top = viewport.height - popoverHeight - margin;
    }
  }
  
  return {
    top,
    left,
    placement,
    offset: { x: 0, y: 0 },
  };
};

export const isElementInViewport = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const scrollToElement = (element: HTMLElement, behavior: ScrollBehavior = 'smooth'): void => {
  element.scrollIntoView({
    behavior,
    block: 'center',
    inline: 'center',
  });
};

export const getElementCenter = (element: HTMLElement): { x: number; y: number } => {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

export const getDistanceBetweenElements = (
  element1: HTMLElement,
  element2: HTMLElement
): number => {
  const center1 = getElementCenter(element1);
  const center2 = getElementCenter(element2);
  
  return Math.sqrt(
    Math.pow(center2.x - center1.x, 2) + Math.pow(center2.y - center1.y, 2)
  );
};