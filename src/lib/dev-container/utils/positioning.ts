import { PopoverPosition } from '../types';

// Get absolute position relative to document
const getAbsolutePosition = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom + scrollTop,
    right: rect.right + scrollLeft,
  };
};

export const calculatePopoverPosition = (
  element: HTMLElement,
  popoverWidth: number = 320,
  popoverHeight: number = 300
): PopoverPosition => {
  const rect = getAbsolutePosition(element);
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  
  // Calculate available space in each direction relative to viewport
  const viewportRect = element.getBoundingClientRect();
  const spaceTop = viewportRect.top;
  const spaceBottom = viewport.height - viewportRect.bottom;
  const spaceLeft = viewportRect.left;
  const spaceRight = viewport.width - viewportRect.right;
  
  // Determine best placement - prefer top or centered positions for large elements
  let placement: PopoverPosition['placement'] = 'top';
  let top = rect.top - popoverHeight - 8;
  let left = rect.left + (rect.width / 2) - (popoverWidth / 2);
  
  // If element is very large (like full page), center the popover relative to viewport but with absolute positioning
  if (rect.height > viewport.height * 0.8) {
    placement = 'right';
    top = scrollTop + viewport.height / 2 - popoverHeight / 2;
    left = Math.min(rect.right + 16, scrollLeft + viewport.width - popoverWidth - 16);
  }
  // Check if popover fits above in viewport
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
    // Fallback: center in current viewport
    else {
      placement = 'bottom';
      top = scrollTop + viewport.height / 2 - popoverHeight / 2;
      left = scrollLeft + viewport.width / 2 - popoverWidth / 2;
    }
  }
  
  // Ensure popover doesn't go outside document bounds
  const margin = 16;
  
  if (placement === 'top' || placement === 'bottom') {
    // Horizontal bounds - keep within current viewport when possible
    const minLeft = scrollLeft + margin;
    const maxLeft = scrollLeft + viewport.width - popoverWidth - margin;
    
    if (left < minLeft) {
      left = minLeft;
    } else if (left > maxLeft) {
      left = maxLeft;
    }
  } else {
    // Vertical bounds - keep within current viewport when possible
    const minTop = scrollTop + margin;
    const maxTop = scrollTop + viewport.height - popoverHeight - margin;
    
    if (top < minTop) {
      top = minTop;
    } else if (top > maxTop) {
      top = maxTop;
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