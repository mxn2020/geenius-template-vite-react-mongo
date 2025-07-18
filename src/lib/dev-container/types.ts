import { ReactNode, ComponentType, CSSProperties, RefObject } from 'react';

// =====================================
// CORE COMPONENT TYPES
// =====================================

export interface ComponentMeta {
  id: string;
  name: string;
  description: string;
  filePath: string;
  semanticTags: string[];
  category: 'ui' | 'page' | 'layout' | 'shadcn' | 'custom';
  dependencies?: string[];
  props?: Record<string, any>;
}

export interface ComponentRegistry {
  [componentId: string]: ComponentMeta;
}

// =====================================
// CONTAINER COMPONENT TYPES
// =====================================

export interface ContainerProps {
  componentId: keyof ComponentRegistry;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // Optional override for component metadata
  meta?: Partial<ComponentMeta>;
  // Whether this container can be selected in dev mode
  selectable?: boolean;
  // Custom dev mode actions
  devActions?: DevAction[];
}

export interface DevAction {
  label: string;
  icon?: ComponentType;
  onClick: (componentId: string, meta: ComponentMeta) => void;
  disabled?: boolean;
}

// =====================================
// DEVELOPMENT MODE STATE
// =====================================

export interface DevModeState {
  isEnabled: boolean;
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  changes: ChangeRequest[];
  isSubmitting: boolean;
  sidebarOpen: boolean;
  showComponentTree: boolean;
  popoverState: PopoverState | null;
}

export interface PopoverState {
  componentId: string;
  isVisible: boolean;
  position: PopoverPosition;
  editingChangeId?: string; // If editing an existing change
}

export interface DevModeActions {
  toggleDevMode: () => void;
  selectComponent: (componentId: string) => void;
  deselectComponent: () => void;
  hoverComponent: (componentId: string | null) => void;
  addChange: (change: Omit<ChangeRequest, 'id' | 'timestamp'>) => void;
  updateChange: (id: string, updates: Partial<ChangeRequest>) => void;
  removeChange: (id: string) => void;
  clearAllChanges: () => void;
  submitChanges: () => Promise<void>;
  toggleSidebar: () => void;
  toggleComponentTree: () => void;
  showPopover: (componentId: string, position: PopoverPosition, editingChangeId?: string) => void;
  hidePopover: () => void;
}

// =====================================
// CHANGE REQUEST TYPES
// =====================================

export interface ChangeRequest {
  id: string;
  componentId: string;
  feedback: string;
  timestamp: number;
  category: ChangeCategory;
  priority: ChangePriority;
  status: ChangeStatus;
  componentContext: ComponentContext;
  pageContext: PageContext;
  userContext?: UserContext;
  metadata?: ChangeMetadata;
}

export enum ChangeCategory {
  BUG_FIX = 'bug_fix',
  ENHANCEMENT = 'enhancement',
  STYLING = 'styling',
  CONTENT = 'content',
  BEHAVIOR = 'behavior',
  PERFORMANCE = 'performance',
  ACCESSIBILITY = 'accessibility',
  GENERAL = 'general'
}

export enum ChangePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export enum ChangeStatus {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  REJECTED = 'rejected'
}

export interface ComponentContext {
  name: string;
  description: string;
  filePath: string;
  parentComponents: string[];
  childComponents: string[];
  semanticTags: string[];
  currentProps?: Record<string, any>;
  domPath?: string;
  boundingRect?: DOMRect;
}

export interface PageContext {
  url: string;
  title: string;
  pathname: string;
  searchParams?: Record<string, string>;
  timestamp: number;
}

export interface UserContext {
  sessionId: string;
  userAgent: string;
  viewport: {
    width: number;
    height: number;
  };
  userId?: string;
  email?: string;
}

export interface ChangeMetadata {
  screenshot?: string; // base64 encoded screenshot
  elementPath?: string; // CSS selector path
  relatedChanges?: string[]; // IDs of related changes
  aiSuggestions?: string[];
}

// =====================================
// POPOVER TYPES
// =====================================

export interface PopoverProps {
  componentId: string;
  isVisible: boolean;
  position: PopoverPosition;
  onClose: () => void;
  onSubmitChange: (feedback: string, category: ChangeCategory, priority: ChangePriority) => void;
}

export interface PopoverPosition {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right';
  offset: {
    x: number;
    y: number;
  };
}

// =====================================
// SIDEBAR/SHEET TYPES
// =====================================

export interface SidebarProps {
  isOpen: boolean;
  changes: ChangeRequest[];
  onClose: () => void;
  onEditChange: (id: string, updates: Partial<ChangeRequest>) => void;
  onRemoveChange: (id: string) => void;
  onSubmitAll: () => void;
  onClearAll: () => void;
  onAddGeneralChange: (change: Omit<ChangeRequest, 'id' | 'timestamp' | 'componentId'>) => void;
}

export interface ChangeListItem {
  change: ChangeRequest;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (updates: Partial<ChangeRequest>) => void;
  onCancel: () => void;
  onRemove: () => void;
}

// =====================================
// SUBMISSION TYPES
// =====================================

export interface SubmissionPayload {
  submissionId: string;
  timestamp: number;
  changes: ChangeRequest[];
  globalContext: GlobalContext;
  summary: SubmissionSummary;
}

export interface GlobalContext {
  projectId?: string;
  environment: 'development' | 'staging' | 'production';
  version?: string;
  repositoryUrl?: string;
  branch?: string;
  commitHash?: string;
  userInfo?: UserContext;
}

export interface SubmissionSummary {
  totalChanges: number;
  categoryCounts: Record<ChangeCategory, number>;
  priorityCounts: Record<ChangePriority, number>;
  affectedComponents: string[];
  estimatedComplexity: 'low' | 'medium' | 'high';
}

export interface SubmissionResponse {
  success: boolean;
  submissionId: string;
  message: string;
  trackingUrl?: string;
  estimatedProcessingTime?: number;
  error?: string;
}

// =====================================
// COMPONENT TREE TYPES
// =====================================

export interface ComponentTreeNode {
  id: string;
  name: string;
  children: ComponentTreeNode[];
  meta: ComponentMeta;
  hasChanges: boolean;
  isSelected: boolean;
  isVisible: boolean;
  depth: number;
}

export interface ComponentTreeProps {
  rootNodes: ComponentTreeNode[];
  selectedId?: string;
  onSelectNode: (id: string) => void;
  onToggleNode: (id: string) => void;
  expandedNodes: Set<string>;
}

// =====================================
// UTILITY TYPES
// =====================================

export type ComponentId = keyof ComponentRegistry;

export interface DevModeConfig {
  enabled: boolean;
  showBorders: boolean;
  showTooltips: boolean;
  autoOpenSidebar: boolean;
  persistChanges: boolean;
  maxChanges: number;
  submitEndpoint: string;
  authToken?: string;
  // Visual customization
  showDashedBorders: boolean;
  hoverColor: string;
  selectedColor: string;
  showComponentIds: boolean;
}

export interface ContainerRef {
  componentId: string;
  element: HTMLElement;
  meta: ComponentMeta;
  select: () => void;
  deselect: () => void;
  addChange: (feedback: string) => void;
}

// =====================================
// ERROR TYPES
// =====================================

export interface ContainerError {
  type: 'DUPLICATE_ID' | 'MISSING_ID' | 'INVALID_ID' | 'REGISTRY_NOT_FOUND';
  componentId?: string;
  message: string;
  stack?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// =====================================
// HOOK TYPES
// =====================================

export interface UseDevModeReturn {
  state: DevModeState;
  actions: DevModeActions;
  config: DevModeConfig;
  errors: ContainerError[];
}

export interface UseContainerReturn {
  isSelected: boolean;
  isHovered: boolean;
  isDevMode: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  handleClick: (e: React.MouseEvent) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

// =====================================
// REGISTRY BUILDER TYPES
// =====================================

export interface RegistryBuilder {
  addComponent: (meta: ComponentMeta) => RegistryBuilder;
  addComponents: (components: ComponentMeta[]) => RegistryBuilder;
  validate: () => ValidationError[];
  build: () => ComponentRegistry;
}

export interface RegistryConfig {
  strict: boolean; // Throw errors on duplicate IDs
  autoGenerate: boolean; // Auto-generate IDs if missing
  semanticAnalysis: boolean; // Generate semantic tags automatically
  includeSourceMap: boolean; // Include source map information
}