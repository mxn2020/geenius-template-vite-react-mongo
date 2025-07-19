import { ComponentRegistry } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface RegistryValidationOptions {
  strict?: boolean; // Throw errors on validation failures
  checkDuplicates?: boolean; // Check for duplicate component IDs
  checkFilePaths?: boolean; // Validate that file paths exist (would require fs access)
}

/**
 * Validates a component registry for common issues
 */
export function validateRegistry(
  registry: ComponentRegistry, 
  options: RegistryValidationOptions = {}
): ValidationResult {
  const {
    strict = false,
    checkDuplicates = true,
  } = options;

  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();
  const seenPaths = new Set<string>();

  // Check each component in the registry
  Object.entries(registry).forEach(([id, meta]) => {
    // Check for duplicate IDs
    if (checkDuplicates && seenIds.has(id)) {
      errors.push(`Duplicate component ID: "${id}"`);
    }
    seenIds.add(id);

    // Validate component metadata
    if (!meta.name?.trim()) {
      errors.push(`Component "${id}" has missing or empty name`);
    }

    if (!meta.description?.trim()) {
      warnings.push(`Component "${id}" has missing or empty description`);
    }

    if (!meta.filePath?.trim()) {
      errors.push(`Component "${id}" has missing or empty filePath`);
    }

    if (!meta.category) {
      warnings.push(`Component "${id}" has missing category`);
    }

    if (!meta.semanticTags || meta.semanticTags.length === 0) {
      warnings.push(`Component "${id}" has no semantic tags`);
    }

    // Check for duplicate file paths (multiple components in same file is OK)
    if (meta.filePath && seenPaths.has(meta.filePath)) {
      // This is just informational, not an error
    }
    if (meta.filePath) {
      seenPaths.add(meta.filePath);
    }

    // Validate ID format (kebab-case recommended)
    if (!/^[a-z0-9-]+$/.test(id)) {
      warnings.push(`Component ID "${id}" should use kebab-case (lowercase letters, numbers, and hyphens only)`);
    }
  });

  const result: ValidationResult = {
    isValid: errors.length === 0,
    errors,
    warnings,
  };

  // If strict mode is enabled and there are errors, throw
  if (strict && !result.isValid) {
    throw new Error(`Registry validation failed:\n${errors.join('\n')}`);
  }

  return result;
}

/**
 * Validates that a component ID exists in the registry
 */
export function validateComponentId(
  componentId: string, 
  registry: ComponentRegistry,
  throwOnError = false
): boolean {
  const exists = componentId in registry;
  
  if (!exists && throwOnError) {
    const availableIds = Object.keys(registry).sort();
    throw new Error(
      `Component ID "${componentId}" not found in registry.\n\n` +
      `Available IDs:\n${availableIds.map(id => `  - ${id}`).join('\n')}\n\n` +
      `Please add this component to your registry in src/registry.ts`
    );
  }
  
  return exists;
}

/**
 * Helper to suggest similar component IDs when one is not found
 */
export function suggestSimilarComponentIds(
  targetId: string, 
  registry: ComponentRegistry,
  maxSuggestions = 3
): string[] {
  const availableIds = Object.keys(registry);
  
  // Simple similarity check based on string distance
  const suggestions = availableIds
    .map(id => ({
      id,
      similarity: calculateSimilarity(targetId, id)
    }))
    .filter(item => item.similarity > 0.3) // Only suggest if reasonably similar
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, maxSuggestions)
    .map(item => item.id);
    
  return suggestions;
}

/**
 * Simple string similarity calculation (Jaccard similarity)
 */
function calculateSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase().split(''));
  const set2 = new Set(str2.toLowerCase().split(''));
  
  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);
  
  return intersection.size / union.size;
}

/**
 * Development helper to log registry statistics
 */
export function logRegistryStats(registry: ComponentRegistry): void {
  const stats = {
    totalComponents: Object.keys(registry).length,
    categories: {} as Record<string, number>,
    filePaths: new Set<string>(),
  };
  
  Object.values(registry).forEach(meta => {
    // Count by category
    const category = meta.category || 'uncategorized';
    stats.categories[category] = (stats.categories[category] || 0) + 1;
    
    // Track unique file paths
    if (meta.filePath) {
      stats.filePaths.add(meta.filePath);
    }
  });
  
  console.group('📊 Component Registry Statistics');
  console.log(`Total Components: ${stats.totalComponents}`);
  console.log(`Unique Files: ${stats.filePaths.size}`);
  console.log('Categories:', stats.categories);
  console.groupEnd();
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return import.meta.env.DEV;
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return import.meta.env.PROD;
}