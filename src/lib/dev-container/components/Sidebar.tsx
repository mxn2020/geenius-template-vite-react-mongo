import React, { useState, useEffect } from 'react';
import { ChangeRequest, ChangeCategory, ChangePriority, ChangeStatus } from '../types';
import { useDevMode } from './DevModeProvider';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { X, Trash2, Edit3 } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const {
    sidebarOpen,
    changes,
    isSubmitting,
    config,
    toggleSidebar,
    updateChange,
    removeChange,
    clearAllChanges,
    submitChanges,
    addChange,
    registry,
  } = useDevMode();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingFeedback, setEditingFeedback] = useState('');
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [generalCategory, setGeneralCategory] = useState<ChangeCategory>(ChangeCategory.GENERAL);
  const [generalPriority, setGeneralPriority] = useState<ChangePriority>(ChangePriority.MEDIUM);

  // Handle body class for scrollbar management
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [sidebarOpen]);

  if (!sidebarOpen) return null;

  const handleEditStart = (change: ChangeRequest) => {
    setEditingId(change.id);
    setEditingFeedback(change.feedback);
  };

  const handleEditSave = (id: string) => {
    if (editingFeedback.trim()) {
      updateChange(id, { feedback: editingFeedback.trim() });
    }
    setEditingId(null);
    setEditingFeedback('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingFeedback('');
  };

  const handleAddGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    if (generalFeedback.trim()) {
      addChange({
        componentId: 'general',
        feedback: generalFeedback.trim(),
        category: generalCategory,
        priority: generalPriority,
        status: ChangeStatus.PENDING,
        componentContext: {
          name: 'General',
          description: 'General feedback not tied to a specific component',
          filePath: '',
          parentComponents: [],
          childComponents: [],
          semanticTags: ['general'],
        },
        pageContext: {
          url: window.location.href,
          title: document.title,
          pathname: window.location.pathname,
          searchParams: Object.fromEntries(new URLSearchParams(window.location.search)),
          timestamp: Date.now(),
        },
      });
      setGeneralFeedback('');
      setGeneralCategory(ChangeCategory.GENERAL);
      setGeneralPriority(ChangePriority.MEDIUM);
    }
  };


  return (
    <div 
      className="fixed inset-y-0 right-0 z-[9999] w-96 bg-background shadow-xl border-l flex flex-col"
      onClick={(e) => e.stopPropagation()}
      style={{ marginRight: '0px' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b flex-shrink-0">
        <h2 className="text-lg font-semibold">
          Dev Changes ({changes.length})
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {/* General feedback form */}
        <Card className="mx-4 mt-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Add General Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGeneral} className="space-y-3">
              <Textarea
                value={generalFeedback}
                onChange={(e) => setGeneralFeedback(e.target.value)}
                placeholder="General feedback not tied to a specific component..."
                className="min-h-[60px] text-sm resize-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label className="text-xs">Category</Label>
                  <Select
                    value={generalCategory}
                    onValueChange={(value) => setGeneralCategory(value as ChangeCategory)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ChangeCategory.GENERAL}>General</SelectItem>
                      <SelectItem value={ChangeCategory.ENHANCEMENT}>Enhancement</SelectItem>
                      <SelectItem value={ChangeCategory.BUG_FIX}>Bug Fix</SelectItem>
                      <SelectItem value={ChangeCategory.CONTENT}>Content</SelectItem>
                      <SelectItem value={ChangeCategory.BEHAVIOR}>Behavior</SelectItem>
                      <SelectItem value={ChangeCategory.PERFORMANCE}>Performance</SelectItem>
                      <SelectItem value={ChangeCategory.ACCESSIBILITY}>Accessibility</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Priority</Label>
                  <Select
                    value={generalPriority}
                    onValueChange={(value) => setGeneralPriority(value as ChangePriority)}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={ChangePriority.LOW}>Low</SelectItem>
                      <SelectItem value={ChangePriority.MEDIUM}>Medium</SelectItem>
                      <SelectItem value={ChangePriority.HIGH}>High</SelectItem>
                      <SelectItem value={ChangePriority.URGENT}>Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={!generalFeedback.trim()}
                className="w-full h-8 text-xs"
                size="sm"
              >
                Add General Feedback
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Changes list */}
        <div className="p-4 space-y-3">
          {changes.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No changes yet.</p>
                <p className="text-sm text-muted-foreground mt-1">Click on components to add feedback.</p>
              </CardContent>
            </Card>
          ) : (
            changes.map((change) => (
              <Card key={change.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-sm">
                        {change.componentId === 'general' ? 'General' : registry[change.componentId]?.name || change.componentId}
                      </CardTitle>
                      {config.showComponentIds && change.componentId !== 'general' && (
                        <p className="text-xs text-muted-foreground font-mono bg-muted px-1 py-0.5 rounded mt-1 inline-block">
                          {change.componentId}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        {change.componentContext.filePath || 'General feedback'}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeChange(change.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    <Badge variant={change.category === ChangeCategory.BUG_FIX ? 'destructive' : 'secondary'} className="text-xs">
                      {change.category.replace('_', ' ')}
                    </Badge>
                    <Badge variant={change.priority === ChangePriority.URGENT ? 'destructive' : 'outline'} className="text-xs">
                      {change.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {change.status.replace('_', ' ')}
                    </Badge>
                  </div>

                  {/* Feedback */}
                  <div>
                    {editingId === change.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editingFeedback}
                          onChange={(e) => setEditingFeedback(e.target.value)}
                          className="min-h-[80px] text-sm resize-none"
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleEditCancel}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleEditSave(change.id)}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="group">
                        <p className="text-sm">{change.feedback}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 mt-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleEditStart(change)}
                        >
                          <Edit3 className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Timestamp */}
                  <p className="text-xs text-muted-foreground">
                    {new Date(change.timestamp).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      {changes.length > 0 && (
        <div className="border-t p-4 space-y-3 flex-shrink-0 bg-background">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={clearAllChanges}
              className="flex-1"
            >
              Clear All
            </Button>
            <Button
              onClick={submitChanges}
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Submitting...' : `Submit ${changes.length} Change${changes.length !== 1 ? 's' : ''}`}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Changes will be sent to your development team
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;