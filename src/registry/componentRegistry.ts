// src/registry/componentRegistry.ts

import { ComponentUsage, ComponentRegistry, ComponentCategory } from '../lib/dev-container/types';

// Import JSON data files - Page-specific registry files
import landingPageUsagesData from './registry-data/landingPageUsages.json';
import loginPageUsagesData from './registry-data/loginPageUsages.json';
import registerPageUsagesData from './registry-data/registerPageUsages.json';
import dashboardPageUsagesData from './registry-data/dashboardPageUsages.json';
import forgotPasswordPageUsagesData from './registry-data/forgotPasswordPageUsages.json';
import resetPasswordPageUsagesData from './registry-data/resetPasswordPageUsages.json';
import auditLogsPageUsagesData from './registry-data/auditLogsPageUsages.json';
import sessionsPageUsagesData from './registry-data/sessionsPageUsages.json';
import settingsPageUsagesData from './registry-data/settingsPageUsages.json';
import adminDashboardPageUsagesData from './registry-data/adminDashboardPageUsages.json';
import adminAuditLogsPageUsagesData from './registry-data/adminAuditLogsPageUsages.json';
import usersPageUsagesData from './registry-data/usersPageUsages.json';
import userDetailsPageUsagesData from './registry-data/userDetailsPageUsages.json';
import appUsagesData from './registry-data/appUsages.json';
import logoUsagesData from './registry-data/logoUsages.json';
import { isValidComponentId } from './generatedTypes';

// ✅ Import the generated types (this restores TypeScript errors!)
export type { ComponentRegistryId } from './generatedTypes';
export { isValidComponentId, validateComponentId, VALID_COMPONENT_IDS } from './generatedTypes';

// Cast JSON data to ComponentUsage arrays with proper typing
const landingPageUsages: ComponentUsage[] = landingPageUsagesData as ComponentUsage[];
const loginPageUsages: ComponentUsage[] = loginPageUsagesData as ComponentUsage[];
const registerPageUsages: ComponentUsage[] = registerPageUsagesData as ComponentUsage[];
const dashboardPageUsages: ComponentUsage[] = dashboardPageUsagesData as ComponentUsage[];
const forgotPasswordPageUsages: ComponentUsage[] = forgotPasswordPageUsagesData as ComponentUsage[];
const resetPasswordPageUsages: ComponentUsage[] = resetPasswordPageUsagesData as ComponentUsage[];
const auditLogsPageUsages: ComponentUsage[] = auditLogsPageUsagesData as ComponentUsage[];
const sessionsPageUsages: ComponentUsage[] = sessionsPageUsagesData as ComponentUsage[];
const settingsPageUsages: ComponentUsage[] = settingsPageUsagesData as ComponentUsage[];
const adminDashboardPageUsages: ComponentUsage[] = adminDashboardPageUsagesData as ComponentUsage[];
const adminAuditLogsPageUsages: ComponentUsage[] = adminAuditLogsPageUsagesData as ComponentUsage[];
const usersPageUsages: ComponentUsage[] = usersPageUsagesData as ComponentUsage[];
const userDetailsPageUsages: ComponentUsage[] = userDetailsPageUsagesData as ComponentUsage[];
const appUsages: ComponentUsage[] = appUsagesData as ComponentUsage[];
const logoUsages: ComponentUsage[] = logoUsagesData as ComponentUsage[];

// Merge all component definitions (remove 'as const' since we have generated types)
const allComponentUsages = [
  ...appUsages,
  ...logoUsages,
  ...landingPageUsages,
  ...loginPageUsages,
  ...registerPageUsages,
  ...dashboardPageUsages,
  ...forgotPasswordPageUsages,
  ...resetPasswordPageUsages,
  ...auditLogsPageUsages,
  ...sessionsPageUsages,
  ...settingsPageUsages,
  ...adminDashboardPageUsages,
  ...adminAuditLogsPageUsages,
  ...usersPageUsages,
  ...userDetailsPageUsages
];

// Development-time validation
if (process.env.NODE_ENV === 'development') {
  // Validate that all IDs in JSON match our generated types
  allComponentUsages.forEach(usage => {
    if (!isValidComponentId(usage.id)) {
      console.error(`❌ Invalid component ID in JSON: "${usage.id}"`);
      console.error('This component exists in JSON but not in generated types.');
      console.error('Run "npm run generate-types" to regenerate type definitions.');
    }
  });
}

// Create a typed version for runtime use
export const componentUsageArray: ComponentUsage[] = allComponentUsages;

// Build the component registry
export const componentRegistry: ComponentRegistry = componentUsageArray.reduce((registry, definition) => {
  registry[definition.id] = definition;
  return registry;
}, {} as ComponentRegistry);

// Export for convenience
export { landingPageUsages, loginPageUsages, registerPageUsages, dashboardPageUsages };

// Helper functions remain the same
export const getComponentUsage = (id: string): ComponentUsage | undefined => {
  return componentRegistry[id];
};

export const getUsagesByDefinition = (definitionId: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.definitionId === definitionId);
};

export const getUsagesByFile = (filePath: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.filePath === filePath);
};

export const getUsagesByCategory = (category: ComponentCategory): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.category === category);
};

export const getUsagesBySemanticTag = (tag: string): ComponentUsage[] => {
  return componentUsageArray.filter(usage => usage.semanticTags.includes(tag));
};

export const searchUsages = (searchTerm: string): ComponentUsage[] => {
  const term = searchTerm.toLowerCase();
  return componentUsageArray.filter(usage => 
    usage.name.toLowerCase().includes(term) ||
    usage.description.toLowerCase().includes(term) ||
    usage.semanticTags.some(tag => tag.toLowerCase().includes(term))
  );
};

// Statistics helpers
export const getUsageStats = () => {
  const stats = {
    total: componentUsageArray.length,
    byCategory: {} as Record<ComponentCategory, number>,
    byDefinition: {} as Record<string, number>,
    byFile: {} as Record<string, number>,
  };

  componentUsageArray.forEach(usage => {
    // Count by category
    stats.byCategory[usage.category] = (stats.byCategory[usage.category] || 0) + 1;
    
    // Count by definition
    stats.byDefinition[usage.definitionId] = (stats.byDefinition[usage.definitionId] || 0) + 1;
    
    // Count by file
    stats.byFile[usage.filePath] = (stats.byFile[usage.filePath] || 0) + 1;
  });

  return stats;
};