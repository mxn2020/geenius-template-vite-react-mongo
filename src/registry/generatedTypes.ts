// src/registry/generatedTypes.ts
// Auto-generated file - DO NOT EDIT DIRECTLY
// Run 'npm run generate-types' to regenerate

// Component IDs union type
export type ComponentRegistryId = 'admin-dashboard' | 'admin-layout' | 'admin-nav' | 'admin-route-denied' | 'admin-route-loading' | 'app-root' | 'auth-buttons' | 'brand-name' | 'cta-join-community' | 'cta-section' | 'cta-start-project' | 'dashboard-content' | 'dashboard-header' | 'dashboard-loading' | 'dashboard-page' | 'dashboard-stats' | 'dashboard-unauthorized' | 'docs-button' | 'error-card' | 'feature-card-0' | 'feature-card-1' | 'feature-card-2' | 'feature-card-3' | 'features-section' | 'hero-content' | 'hero-content-wrapper' | 'hero-cta-buttons' | 'hero-description' | 'hero-github-button' | 'hero-section' | 'hero-start-building' | 'hero-title' | 'landing-page-root' | 'loading-card' | 'login-divider' | 'login-error' | 'login-footer' | 'login-form' | 'login-header' | 'login-page' | 'logo-section' | 'main-footer' | 'main-header' | 'main-nav' | 'main-wrapper' | 'mongodb-highlight' | 'nav-actions' | 'nav-dashboard-button' | 'nav-login-button' | 'nav-register-button' | 'next-page-button' | 'pagination-card' | 'prev-page-button' | 'protected-route-loading' | 'register-divider' | 'register-error' | 'register-footer' | 'register-form' | 'register-header' | 'register-page' | 'role-label' | 'search-button' | 'search-input' | 'search-label' | 'social-login-buttons' | 'social-register-buttons' | 'stat-card-0' | 'stat-card-1' | 'stat-card-2' | 'stat-card-3' | 'stats-content' | 'stats-grid' | 'stats-section' | 'tech-badge-0' | 'tech-badge-1' | 'tech-badge-2' | 'tech-badge-3' | 'tech-badge-4' | 'tech-badge-5' | 'tech-letter-0' | 'tech-letter-1' | 'tech-letter-2' | 'tech-letter-3' | 'tech-letter-4' | 'tech-letter-5' | 'tech-stack-section' | 'user-profile-card' | 'user-section' | 'users-filters' | 'users-page' | 'users-table-card' | 'welcome-message' | string;

// Valid component IDs array
export const VALID_COMPONENT_IDS = [
  'admin-dashboard',
  'admin-layout',
  'admin-nav',
  'admin-route-denied',
  'admin-route-loading',
  'app-root',
  'auth-buttons',
  'brand-name',
  'cta-join-community',
  'cta-section',
  'cta-start-project',
  'dashboard-content',
  'dashboard-header',
  'dashboard-loading',
  'dashboard-page',
  'dashboard-stats',
  'dashboard-unauthorized',
  'docs-button',
  'error-card',
  'feature-card-0',
  'feature-card-1',
  'feature-card-2',
  'feature-card-3',
  'features-section',
  'hero-content',
  'hero-content-wrapper',
  'hero-cta-buttons',
  'hero-description',
  'hero-github-button',
  'hero-section',
  'hero-start-building',
  'hero-title',
  'landing-page-root',
  'loading-card',
  'login-divider',
  'login-error',
  'login-footer',
  'login-form',
  'login-header',
  'login-page',
  'logo-section',
  'main-footer',
  'main-header',
  'main-nav',
  'main-wrapper',
  'mongodb-highlight',
  'nav-actions',
  'nav-dashboard-button',
  'nav-login-button',
  'nav-register-button',
  'next-page-button',
  'pagination-card',
  'prev-page-button',
  'protected-route-loading',
  'register-divider',
  'register-error',
  'register-footer',
  'register-form',
  'register-header',
  'register-page',
  'role-label',
  'search-button',
  'search-input',
  'search-label',
  'social-login-buttons',
  'social-register-buttons',
  'stat-card-0',
  'stat-card-1',
  'stat-card-2',
  'stat-card-3',
  'stats-content',
  'stats-grid',
  'stats-section',
  'tech-badge-0',
  'tech-badge-1',
  'tech-badge-2',
  'tech-badge-3',
  'tech-badge-4',
  'tech-badge-5',
  'tech-letter-0',
  'tech-letter-1',
  'tech-letter-2',
  'tech-letter-3',
  'tech-letter-4',
  'tech-letter-5',
  'tech-stack-section',
  'user-profile-card',
  'user-section',
  'users-filters',
  'users-page',
  'users-table-card',
  'welcome-message'
] as const;

// Type guard to check if a string is a valid component ID
export function isValidComponentId(id: string): id is ComponentRegistryId {
  return VALID_COMPONENT_IDS.includes(id as any);
}

// Validation function that throws if ID is invalid
export function validateComponentId(id: string): asserts id is ComponentRegistryId {
  if (!isValidComponentId(id)) {
    throw new Error(`Invalid component ID: "${id}". Valid IDs are: ${VALID_COMPONENT_IDS.join(', ')}`);
  }
}

// Generated component definitions placeholder
export const generatedComponentDefinitions = {};
