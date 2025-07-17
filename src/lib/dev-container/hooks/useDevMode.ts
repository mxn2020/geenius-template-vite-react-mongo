import { useDevMode as useDevModeContext } from '../components/DevModeProvider';
import { UseDevModeReturn } from '../types';

// Re-export the hook from the provider for convenience
export const useDevMode = (): UseDevModeReturn => {
  const context = useDevModeContext();
  
  return {
    state: {
      isEnabled: context.isEnabled,
      selectedComponentId: context.selectedComponentId,
      hoveredComponentId: context.hoveredComponentId,
      changes: context.changes,
      isSubmitting: context.isSubmitting,
      sidebarOpen: context.sidebarOpen,
      showComponentTree: context.showComponentTree,
      popoverState: context.popoverState,
    },
    actions: {
      toggleDevMode: context.toggleDevMode,
      selectComponent: context.selectComponent,
      deselectComponent: context.deselectComponent,
      hoverComponent: context.hoverComponent,
      addChange: context.addChange,
      updateChange: context.updateChange,
      removeChange: context.removeChange,
      clearAllChanges: context.clearAllChanges,
      submitChanges: context.submitChanges,
      toggleSidebar: context.toggleSidebar,
      toggleComponentTree: context.toggleComponentTree,
      showPopover: context.showPopover,
      hidePopover: context.hidePopover,
    },
    config: context.config,
    errors: [], // TODO: Implement error tracking
  };
};

export default useDevMode;