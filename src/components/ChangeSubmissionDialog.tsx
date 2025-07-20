import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Card, CardContent } from './ui/card';
import { 
  CheckCircle, 
  XCircle, 
  Info, 
  ExternalLink,
  RefreshCw,
  Settings,
  Code,
  TestTube,
  GitPullRequest,
  Rocket,
  Eye
} from 'lucide-react';
import { ChangeRequest, SubmissionPayload, SubmissionResponse } from '../lib/dev-container/types';

interface ChangeSubmissionDialogProps {
  open: boolean;
  onClose: () => void;
  changes: ChangeRequest[];
  onSubmit: (payload: SubmissionPayload) => void;
}

interface ProcessingStatus {
  status: 'idle' | 'submitting' | 'received' | 'validating' | 'analyzing' | 'processing' | 'creating_branch' | 'committing' | 'testing' | 'pr_creating' | 'deploying' | 'completed' | 'failed';
  sessionId?: string;
  previewUrl?: string;
  prUrl?: string;
  error?: string;
  progress?: number;
  currentStep?: string;
  logs: Array<{
    timestamp: number;
    level: 'info' | 'success' | 'warning' | 'error';
    message: string;
  }>;
}

const statusSteps = [
  { 
    key: 'submitting', 
    label: 'Submitting changes...', 
    icon: RefreshCw,
    description: 'Sending changes to enhanced processing server'
  },
  { 
    key: 'validating', 
    label: 'Validating changes...', 
    icon: Settings,
    description: 'AI agent validating change requests for security and relevance'
  },
  { 
    key: 'analyzing', 
    label: 'Analyzing dependencies...', 
    icon: Code,
    description: 'Smart dependency analysis and processing strategy'
  },
  { 
    key: 'processing', 
    label: 'AI agents working...', 
    icon: Code,
    description: 'Multi-agent team implementing your changes file-by-file'
  },
  { 
    key: 'creating_branch', 
    label: 'Creating feature branch...', 
    icon: GitPullRequest,
    description: 'AI generating feature branch and preparing repository'
  },
  { 
    key: 'committing', 
    label: 'Committing changes...', 
    icon: Code,
    description: 'Step-by-step commits with continuous refinements'
  },
  { 
    key: 'testing', 
    label: 'Running tests...', 
    icon: TestTube,
    description: 'Generating and executing comprehensive test suite'
  },
  { 
    key: 'pr_creating', 
    label: 'Creating PR...', 
    icon: GitPullRequest,
    description: 'Creating pull request with detailed documentation'
  },
  { 
    key: 'deploying', 
    label: 'Deploying preview...', 
    icon: Rocket,
    description: 'Preview deployment and automated testing'
  },
  { 
    key: 'completed', 
    label: 'Ready for review!', 
    icon: CheckCircle,
    description: 'Changes implemented with AI-generated tests and documentation'
  }
];

function getStepIndex(status: ProcessingStatus['status']): number {
  return statusSteps.findIndex(step => step.key === status);
}

function getProgressPercentage(status: ProcessingStatus['status']): number {
  const stepIndex = getStepIndex(status);
  if (stepIndex === -1) return 0;
  return Math.round(((stepIndex + 1) / statusSteps.length) * 100);
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const ChangeSubmissionDialog: React.FC<ChangeSubmissionDialogProps> = ({
  open,
  onClose,
  changes,
  onSubmit
}) => {
  const [processing, setProcessing] = useState<ProcessingStatus>({
    status: 'idle',
    logs: []
  });

  const [polling, setPolling] = useState<number | null>(null);

  // Clear polling on unmount or dialog close
  useEffect(() => {
    return () => {
      if (polling) {
        clearInterval(polling);
      }
    };
  }, [polling]);

  useEffect(() => {
    if (!open) {
      setProcessing({ status: 'idle', logs: [] });
      if (polling) {
        clearInterval(polling);
        setPolling(null);
      }
    }
  }, [open, polling]);

  const handleSubmit = async () => {
    if (changes.length === 0) return;

    setProcessing({ status: 'submitting', logs: [] });

    try {
      // Create submission payload
      const submissionPayload: SubmissionPayload = {
        submissionId: generateId(),
        timestamp: Date.now(),
        changes,
        globalContext: {
          environment: 'development',
          projectId: window.location.hostname,
          version: '1.0.0',
          repositoryUrl: 'https://github.com/mehdinabhani/geenius-template-vite-react-mongo',
          aiProvider: (import.meta.env.VITE_AI_PROVIDER as 'anthropic' | 'openai' | 'google' | 'grok') || 'anthropic',
          userInfo: {
            sessionId: generateId(),
            userAgent: navigator.userAgent,
            viewport: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
          },
        },
        summary: {
          totalChanges: changes.length,
          categoryCounts: changes.reduce((acc, change) => {
            acc[change.category] = (acc[change.category] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          priorityCounts: changes.reduce((acc, change) => {
            acc[change.priority] = (acc[change.priority] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
          affectedComponents: [...new Set(changes.map(c => c.componentId))],
          estimatedComplexity: changes.length > 10 ? 'high' : changes.length > 5 ? 'medium' : 'low',
        },
      };

      // Submit to Geenius enhanced processing endpoint
      const geeniusApiUrl = import.meta.env.VITE_GEENIUS_API_URL || 'http://localhost:8888';
      const response = await fetch(`${geeniusApiUrl}/api/process-changes-enhanced`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result: SubmissionResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      // Use session ID from response
      const sessionId = result.sessionId;
      
      setProcessing(prev => ({
        ...prev,
        status: 'received',
        sessionId,
        logs: [
          ...prev.logs,
          {
            timestamp: Date.now(),
            level: 'success',
            message: 'Changes submitted successfully! Enhanced AI processing started...'
          }
        ]
      }));

      // Start polling for updates
      if (sessionId) {
        startPolling(sessionId);
      }

      // Call onSubmit callback
      onSubmit(submissionPayload);

    } catch (error) {
      setProcessing(prev => ({
        ...prev,
        status: 'failed',
        error: error instanceof Error ? error.message : 'Submission failed',
        logs: [
          ...prev.logs,
          {
            timestamp: Date.now(),
            level: 'error',
            message: error instanceof Error ? error.message : 'Submission failed'
          }
        ]
      }));
    }
  };

  const startPolling = (sessionId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const geeniusApiUrl = import.meta.env.VITE_GEENIUS_API_URL || 'http://localhost:8888';
        const response = await fetch(`${geeniusApiUrl}/api/process-changes-enhanced/${sessionId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        setProcessing(prev => ({
          ...prev,
          status: data.status,
          progress: data.progress,
          currentStep: data.currentStep,
          previewUrl: data.previewUrl,
          prUrl: data.prUrl,
          error: data.error,
          logs: data.logs || []
        }));

        // Stop polling when completed or failed
        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(pollInterval);
          setPolling(null);
        }

      } catch (error) {
        console.error('Polling error:', error);
        setProcessing(prev => ({
          ...prev,
          status: 'failed',
          error: error instanceof Error ? error.message : 'Polling failed'
        }));
        clearInterval(pollInterval);
        setPolling(null);
      }
    }, 2000);

    setPolling(pollInterval as unknown as number);
  };

  const handleViewLogs = () => {
    if (processing.sessionId) {
      const geeniusApiUrl = import.meta.env.VITE_GEENIUS_API_URL || 'http://localhost:8888';
      window.open(`${geeniusApiUrl}/logs/${processing.sessionId}`, '_blank');
    }
  };

  const handleClose = () => {
    if (polling) {
      clearInterval(polling);
      setPolling(null);
    }
    onClose();
  };

  const currentStep = statusSteps.find(step => step.key === processing.status);
  const CurrentIcon = currentStep?.icon || Info;
  const progress = processing.progress || getProgressPercentage(processing.status);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Submit Changes</DialogTitle>
          <DialogDescription>
            {processing.status === 'idle' 
              ? `Ready to submit ${changes.length} change${changes.length !== 1 ? 's' : ''} for enhanced multi-agent AI processing`
              : 'Processing your changes with specialized AI agent team'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Changes Summary */}
          {processing.status === 'idle' && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Changes to Process</h3>
                    <Badge variant="outline">{changes.length} changes</Badge>
                  </div>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {changes.slice(0, 5).map((change, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {change.category.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {change.priority}
                          </Badge>
                        </div>
                        <p className="text-gray-700 truncate">{change.feedback}</p>
                      </div>
                    ))}
                    
                    {changes.length > 5 && (
                      <div className="text-sm text-gray-500 text-center">
                        ...and {changes.length - 5} more changes
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Status */}
          {processing.status !== 'idle' && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Current Status */}
                  <div className="flex items-center gap-3">
                    <CurrentIcon className={`w-5 h-5 ${
                      processing.status === 'completed' ? 'text-green-500' :
                      processing.status === 'failed' ? 'text-red-500' :
                      'text-blue-500 animate-spin'
                    }`} />
                    <div>
                      <h3 className="font-medium">{currentStep?.label}</h3>
                      <p className="text-sm text-gray-600">
                        {processing.currentStep || currentStep?.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  {/* Step Indicators */}
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    {statusSteps.slice(0, 4).map((step, index) => {
                      const stepIndex = getStepIndex(processing.status);
                      const isActive = index <= stepIndex;
                      const isCurrent = index === stepIndex;
                      const StepIcon = step.icon;
                      
                      return (
                        <div
                          key={step.key}
                          className={`flex items-center gap-1 p-2 rounded ${
                            isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          <StepIcon className={`w-3 h-3 ${isCurrent ? 'animate-spin' : ''}`} />
                          <span className="truncate">{step.label.replace('...', '')}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Latest Logs */}
                  {processing.logs.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium mb-2">Latest Updates</h4>
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {processing.logs.slice(-3).map((log, index) => (
                          <div key={index} className="text-xs text-gray-600">
                            {log.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Links */}
          {(processing.previewUrl || processing.prUrl || processing.sessionId) && (
            <div className="flex flex-wrap gap-2">
              {processing.previewUrl && (
                <Button size="sm" asChild>
                  <a href={processing.previewUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    View Preview
                  </a>
                </Button>
              )}
              {processing.prUrl && (
                <Button size="sm" variant="outline" asChild>
                  <a href={processing.prUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View PR
                  </a>
                </Button>
              )}
              {processing.sessionId && (
                <Button size="sm" variant="outline" onClick={handleViewLogs}>
                  <Settings className="w-4 h-4 mr-2" />
                  View Logs
                </Button>
              )}
            </div>
          )}

          {/* Error Message */}
          {processing.error && (
            <Alert className="border-red-200">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{processing.error}</AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {processing.status === 'completed' && (
            <Alert className="border-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Changes processed successfully by AI agent team! Comprehensive tests generated, preview deployed, and pull request created with detailed documentation.
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Dialog Actions */}
        <div className="flex justify-end gap-2">
          {processing.status === 'idle' && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={changes.length === 0}>
                Submit {changes.length} Change{changes.length !== 1 ? 's' : ''}
              </Button>
            </>
          )}
          
          {processing.status !== 'idle' && processing.status !== 'completed' && processing.status !== 'failed' && (
            <Button variant="outline" onClick={handleClose}>
              Close (Processing continues)
            </Button>
          )}
          
          {(processing.status === 'completed' || processing.status === 'failed') && (
            <Button onClick={handleClose}>
              Close
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};