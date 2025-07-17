import { ComponentMeta, ComponentRegistry, RegistryBuilder, RegistryConfig, ValidationError } from '../types';

export const createRegistryBuilder = (config: Partial<RegistryConfig> = {}): RegistryBuilder => {
  const fullConfig: RegistryConfig = {
    strict: true,
    autoGenerate: false,
    semanticAnalysis: false,
    includeSourceMap: false,
    ...config,
  };

  const components: ComponentMeta[] = [];
  const errors: ValidationError[] = [];

  const addComponent = (meta: ComponentMeta): RegistryBuilder => {
    // Validate component metadata
    const componentErrors = validateComponentMeta(meta);
    if (componentErrors.length > 0) {
      errors.push(...componentErrors);
      if (fullConfig.strict) {
        throw new Error(`Invalid component metadata: ${componentErrors.map(e => e.message).join(', ')}`);
      }
    }

    // Check for duplicate IDs
    const existingIndex = components.findIndex(c => c.id === meta.id);
    if (existingIndex !== -1) {
      if (fullConfig.strict) {
        throw new Error(`Duplicate component ID: ${meta.id}`);
      } else {
        // Replace existing component
        components[existingIndex] = meta;
        return builder;
      }
    }

    // Auto-generate ID if missing and autoGenerate is enabled
    if (!meta.id && fullConfig.autoGenerate) {
      meta.id = generateComponentId(meta.name);
    }

    // Auto-generate semantic tags if enabled
    if (fullConfig.semanticAnalysis) {
      meta.semanticTags = generateSemanticTags(meta);
    }

    components.push(meta);
    return builder;
  };

  const addComponents = (metas: ComponentMeta[]): RegistryBuilder => {
    metas.forEach(meta => addComponent(meta));
    return builder;
  };

  const validate = (): ValidationError[] => {
    return [...errors];
  };

  const build = (): ComponentRegistry => {
    if (errors.length > 0 && fullConfig.strict) {
      throw new Error(`Registry validation failed: ${errors.map(e => e.message).join(', ')}`);
    }

    const registry: ComponentRegistry = {};
    components.forEach(component => {
      registry[component.id] = component;
    });

    return registry;
  };

  const builder: RegistryBuilder = {
    addComponent,
    addComponents,
    validate,
    build,
  };

  return builder;
};

const validateComponentMeta = (meta: ComponentMeta): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!meta.id) {
    errors.push({ field: 'id', message: 'Component ID is required', value: meta.id });
  }

  if (!meta.name) {
    errors.push({ field: 'name', message: 'Component name is required', value: meta.name });
  }

  if (!meta.description) {
    errors.push({ field: 'description', message: 'Component description is required', value: meta.description });
  }

  if (!meta.filePath) {
    errors.push({ field: 'filePath', message: 'Component file path is required', value: meta.filePath });
  }

  if (!meta.category) {
    errors.push({ field: 'category', message: 'Component category is required', value: meta.category });
  }

  if (!Array.isArray(meta.semanticTags)) {
    errors.push({ field: 'semanticTags', message: 'Semantic tags must be an array', value: meta.semanticTags });
  }

  // Validate file path format
  if (meta.filePath && !meta.filePath.match(/\.(tsx?|jsx?)$/)) {
    errors.push({ field: 'filePath', message: 'File path must end with .tsx, .ts, .jsx, or .js', value: meta.filePath });
  }

  return errors;
};

const generateComponentId = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const generateSemanticTags = (meta: ComponentMeta): string[] => {
  const tags: string[] = [];

  // Add category as a tag
  tags.push(meta.category);

  // Extract tags from name
  const nameWords = meta.name.toLowerCase().split(/\s+/);
  tags.push(...nameWords.filter(word => word.length > 2));

  // Extract tags from description
  const descriptionWords = meta.description.toLowerCase().split(/\s+/);
  const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'];
  const meaningfulWords = descriptionWords.filter(word => 
    word.length > 3 && !commonWords.includes(word) && !word.match(/^\d+$/)
  );
  tags.push(...meaningfulWords.slice(0, 3));

  // Add file path based tags
  const pathParts = meta.filePath.split('/');
  pathParts.forEach(part => {
    if (part.includes('.')) {
      const fileName = part.split('.')[0];
      if (fileName.length > 2) {
        tags.push(fileName.toLowerCase());
      }
    }
  });

  // Remove duplicates and return
  return [...new Set(tags)];
};

export const createRegistry = (components: ComponentMeta[], config?: Partial<RegistryConfig>): ComponentRegistry => {
  return createRegistryBuilder(config)
    .addComponents(components)
    .build();
};

export const mergeRegistries = (...registries: ComponentRegistry[]): ComponentRegistry => {
  const merged: ComponentRegistry = {};
  
  registries.forEach(registry => {
    Object.assign(merged, registry);
  });
  
  return merged;
};

export const filterRegistry = (
  registry: ComponentRegistry,
  predicate: (component: ComponentMeta) => boolean
): ComponentRegistry => {
  const filtered: ComponentRegistry = {};
  
  Object.entries(registry).forEach(([id, component]) => {
    if (predicate(component)) {
      filtered[id] = component;
    }
  });
  
  return filtered;
};

export const searchRegistry = (
  registry: ComponentRegistry,
  query: string
): ComponentMeta[] => {
  const lowerQuery = query.toLowerCase();
  
  return Object.values(registry).filter(component => {
    return (
      component.name.toLowerCase().includes(lowerQuery) ||
      component.description.toLowerCase().includes(lowerQuery) ||
      component.filePath.toLowerCase().includes(lowerQuery) ||
      component.semanticTags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
};