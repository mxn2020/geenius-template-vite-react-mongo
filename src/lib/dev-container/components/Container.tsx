import React, { useRef, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { ContainerProps, ChangeCategory, ChangePriority, ChangeStatus, ComponentContext, PageContext } from '../types';
import { useDevMode } from './DevModeProvider';
import { Popover } from './Popover';
import { calculatePopoverPosition } from '../utils/positioning';

export const Container: React.FC<ContainerProps> = ({
  componentId,
  children,
  className,
  style,
  meta,
  selectable = true,
  devActions = [],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSmall, setIsSmall] = useState(false);
  
  const {
    isEnabled,
    selectedComponentId,
    hoveredComponentId,
    registry,
    changes,
    popoverState,
    config,
    hoverComponent,
    addChange,
    showPopover,
    hidePopover,
  } = useDevMode();

  const componentMeta = registry[componentId];
  const isSelected = selectedComponentId === componentId;
  const isHovered = hoveredComponentId === componentId;

  // Debug logging (remove after testing)
  // React.useEffect(() => {
  //   if (isEnabled) {
  //     console.log('Container Debug:', {
  //       componentId,
  //       componentMeta,
  //       registryKeys: Object.keys(registry),
  //       hasComponentMeta: !!componentMeta
  //     });
  //   }
  // }, [componentId, componentMeta, registry, isEnabled]);

  // Determine if this is a small component that should have external labels
  const isSmallComponent = () => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const area = rect.width * rect.height;
    // Consider components with area less than 15000px² or height less than 80px as small
    return area < 15000 || rect.height < 80 || rect.width < 150;
  };

  // Get optimal label position for small components
  const getLabelPosition = () => {
    if (!isSmall || !containerRef.current) return 'top-2 left-2';
    
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Check if there's space above
    if (rect.top > 40) {
      return '-top-8 left-0';
    }
    // Check if there's space to the right
    else if (rect.right + 150 < viewportWidth) {
      return 'top-0 -right-2 translate-x-full';
    }
    // Check if there's space below
    else if (rect.bottom + 40 < viewportHeight) {
      return '-bottom-8 left-0';
    }
    // Default to inside if no space elsewhere
    else {
      return 'top-2 left-2';
    }
  };

  // Handle click to select component
  const handleClick = (e: React.MouseEvent) => {
    if (!isEnabled || !selectable) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (isSelected && popoverState?.componentId === componentId) {
      hidePopover();
    } else {
      // Calculate popover position
      if (containerRef.current) {
        const position = calculatePopoverPosition(containerRef.current);
        
        // Check if there's an existing change for this component
        const existingChange = changes.find(c => c.componentId === componentId);
        
        showPopover(componentId as string, position, existingChange?.id);
      }
    }
  };

  // Handle hover
  const handleMouseEnter = () => {
    if (!isEnabled || !selectable) return;
    hoverComponent(componentId as string);
    setIsSmall(isSmallComponent());
  };

  const handleMouseLeave = () => {
    if (!isEnabled || !selectable) return;
    hoverComponent(null);
  };

  // Update size when component becomes selected
  useEffect(() => {
    if (isSelected) {
      setIsSmall(isSmallComponent());
    }
  }, [isSelected]);

  // Handle popover submission
  const handleSubmitChange = (feedback: string, category: ChangeCategory, priority: ChangePriority) => {
    if (!componentMeta) return;

    const componentContext: ComponentContext = {
      name: meta?.name || componentMeta.name,
      description: meta?.description || componentMeta.description,
      filePath: meta?.filePath || componentMeta.filePath,
      parentComponents: [], // TODO: Implement parent tracking
      childComponents: [], // TODO: Implement child tracking
      semanticTags: meta?.semanticTags || componentMeta.semanticTags,
      currentProps: meta?.props || componentMeta.props,
      domPath: generateDOMPath(containerRef.current),
      boundingRect: containerRef.current?.getBoundingClientRect(),
    };

    const pageContext: PageContext = {
      url: window.location.href,
      title: document.title,
      pathname: window.location.pathname,
      searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
      timestamp: Date.now(),
    };

    addChange({
      componentId: componentId as string,
      feedback,
      category,
      priority,
      status: ChangeStatus.PENDING,
      componentContext,
      pageContext,
    });

  };

  // Handle popover close
  const handlePopoverClose = () => {
    hidePopover();
  };

  // Close popover when clicking outside (only for this component's popover)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (popoverState?.componentId === componentId && 
          containerRef.current && 
          !containerRef.current.contains(e.target as Node)) {
        handlePopoverClose();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [popoverState, componentId]);

  // Error handling for missing component
  if (!componentMeta && isEnabled) {
    // Check if registry is still loading (empty)
    if (Object.keys(registry).length === 0) {
      // Registry is still loading, render children without dev mode features
      return <div className={className} style={style}>{children}</div>;
    }
    
    console.error(`Component with ID "${componentId}" not found in registry`);
    return <div className="border-2 border-red-500 p-2 text-red-500">Component not found: {componentId}</div>;
  }

  const containerClassName = clsx(
    className,
    isEnabled && {
      'relative cursor-pointer': selectable,
    }
  );

  // Generate dynamic styles for borders and overlays
  const dynamicStyles = isEnabled ? {
    '--hover-color': config.hoverColor,
    '--selected-color': config.selectedColor,
  } as React.CSSProperties : {};

  return (
    <>
      <div
        ref={containerRef}
        className={containerClassName}
        style={{ ...style, ...dynamicStyles }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-component-id={componentId as string}
        data-dev-container="true"
      >
        {children}
        
        {/* Dashed border overlay - only show if enabled in config */}
        {isEnabled && config.showDashedBorders && !isHovered && !isSelected && selectable && (
          <div 
            className="absolute inset-0 border-2 border-dashed border-opacity-50 pointer-events-none z-10 rounded-sm"
            style={{ borderColor: config.hoverColor }}
          />
        )}
        
        {/* Hover overlay */}
        {isEnabled && isHovered && !isSelected && (
          <>
            <div 
              className="absolute inset-0 border-2 border-dashed border-opacity-70 pointer-events-none z-10 rounded-sm"
              style={{ 
                backgroundColor: `${config.hoverColor}1A`, // 10% opacity
                borderColor: config.hoverColor 
              }}
            />
            <div 
              className={`absolute text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-20 ${getLabelPosition()}`}
              style={{ backgroundColor: config.hoverColor }}
            >
              {componentMeta?.name || componentId as string}
            </div>
          </>
        )}
        
        {/* Selected overlay */}
        {isEnabled && isSelected && (
          <>
            {/* Ring effect */}
            <div 
              className="absolute inset-0 pointer-events-none z-10 rounded-sm"
              style={{ 
                boxShadow: `0 0 0 2px ${config.selectedColor}80` 
              }}
            />
            {/* Background overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-10 rounded-sm"
              style={{ 
                backgroundColor: `${config.selectedColor}33` // 20% opacity
              }}
            />
            {/* Label */}
            <div 
              className={`absolute text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none z-20 ${getLabelPosition()}`}
              style={{ backgroundColor: config.selectedColor }}
            >
              {componentMeta?.name || componentId as string}
            </div>
          </>
        )}

        {/* Custom dev actions */}
        {isEnabled && isSelected && devActions.length > 0 && (
          <div className="absolute top-0 right-0 -translate-y-full z-10">
            <div className="flex gap-1">
              {devActions.map((action, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    action.onClick(componentId as string, componentMeta);
                  }}
                  disabled={action.disabled}
                  className="bg-gray-700 text-white px-2 py-1 rounded text-xs hover:bg-gray-600 disabled:opacity-50"
                  title={action.label}
                >
                  {action.icon && <action.icon />}
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Popover */}
      {popoverState?.componentId === componentId && popoverState.isVisible && (
        <Popover
          componentId={componentId as string}
          isVisible={popoverState.isVisible}
          position={popoverState.position}
          onClose={handlePopoverClose}
          onSubmitChange={handleSubmitChange}
        />
      )}
    </>
  );
};

// Utility function to generate DOM path for better context
function generateDOMPath(element: HTMLElement | null): string {
  if (!element) return '';
  
  const path: string[] = [];
  let current: HTMLElement | null = element;
  
  while (current && current !== document.body) {
    let selector = current.tagName.toLowerCase();
    
    if (current.id) {
      selector += `#${current.id}`;
    } else if (current.className) {
      const classes = current.className.split(' ').filter(Boolean);
      if (classes.length > 0) {
        selector += `.${classes.join('.')}`;
      }
    }
    
    path.unshift(selector);
    current = current.parentElement;
  }
  
  return path.join(' > ');
}

// Export default for convenience
export default Container;