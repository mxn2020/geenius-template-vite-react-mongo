// src/registry/componentRegistry.ts

import { ComponentUsage, ComponentRegistry, ComponentCategory } from '../lib/dev-container/types';

// Import JSON data files
import landingUsagesData from './registry-data/landingUsages.json';
import authUsagesData from './registry-data/authUsages.json';
import statsAndFeaturesData from './registry-data/statsAndFeatures.json';
import newData from './registry-data/newUsages.json';
import adminUsagesData from './registry-data/adminUsages.json';
import adminAuditLogsUsagesData from './registry-data/adminAuditLogsUsages.json';
import { isValidComponentId } from './generatedTypes';

// ✅ Import the generated types (this restores TypeScript errors!)
export type { ComponentRegistryId } from './generatedTypes';
export { isValidComponentId, validateComponentId, VALID_COMPONENT_IDS } from './generatedTypes';

// Cast JSON data to ComponentUsage arrays with proper typing
const landingPageUsages: ComponentUsage[] = landingUsagesData as ComponentUsage[];
const authComponentUsages: ComponentUsage[] = authUsagesData as ComponentUsage[];
const statsAndFeaturesUsages: ComponentUsage[] = statsAndFeaturesData as ComponentUsage[];
const testUsages: ComponentUsage[] = newData as ComponentUsage[];
const adminUsages: ComponentUsage[] = adminUsagesData as ComponentUsage[];
const adminAuditLogsUsages: ComponentUsage[] = adminAuditLogsUsagesData as ComponentUsage[];

// Merge all component definitions (remove 'as const' since we have generated types)
const allComponentUsages = [
  ...landingPageUsages,
  ...statsAndFeaturesUsages,
  ...authComponentUsages,
  ...testUsages,
  ...adminUsages,
  ...adminAuditLogsUsages
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
export { landingPageUsages, authComponentUsages, statsAndFeaturesUsages };

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