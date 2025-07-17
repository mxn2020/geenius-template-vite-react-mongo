// Main export file for the dev-container package
export * from './types';
export * from './components/Container';
export * from './components/DevModeProvider';
export * from './components/DevModeApp';
export * from './components/Popover';
export * from './components/Sidebar';
export { useDevMode as useDevModeHook } from './hooks/useDevMode';
export * from './hooks/useContainer';
export * from './utils/registry';
export * from './utils/positioning';
export * from './utils/storage';

// Export specific components for convenience
export { DevModeFloatingIcon } from './components/DevModeProvider';

// Export shadcn components wrapped with dev-container
export * from './shadcn/Button';
export * from './shadcn/Card';
export * from './shadcn/Badge';
export * from './shadcn/Input';
export * from './shadcn/Avatar';