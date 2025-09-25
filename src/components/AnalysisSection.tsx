import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  FileCheck, 
  Clock,
  ArrowRight,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';

interface AnalysisResult {
  completeness: {
    score: number;
    status: 'good' | 'warning' | 'poor';
    checks: Array<{
      name: string;
      status: 'pass' | 'fail' | 'warning';
      description: string;
    }>;
  };
  missingInfo: {
    count: number;
    critical: number;
    items: Array<{
      field: string;
      importance: 'critical' | 'medium' | 'low';
      description: string;
    }>;
  };
  inconsistencies: {
    count: number;
    severe: number;
    items: Array<{
      type: string;
      severity: 'high' | 'medium' | 'low';
      description: string;
      location: string;
    }>;
  };
}

interface AnalysisSectionProps {
  files: Array<{ id: string; name: string }>;
  onNavigate: (section: string) => void;
  onAnalysisComplete: (results: AnalysisResult) => void;
}

const AnalysisSection = ({ files, onNavigate, onAnalysisComplete }: AnalysisSectionProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState('');
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const analysisPhases = [
    'Scanning document structure...',
    'Analyzing content completeness...',
    'Detecting missing information...',
    'Checking for inconsistencies...',
    'Generating quality assessment...',
    'Finalizing analysis report...'
  ];

  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    for (let i = 0; i < analysisPhases.length; i++) {
      setCurrentPhase(analysisPhases[i]);
      
      // Simulate gradual progress for each phase
      const phaseProgress = (i * 100) / analysisPhases.length;
      const nextPhaseProgress = ((i + 1) * 100) / analysisPhases.length;
      
      for (let j = 0; j <= 10; j++) {
        const currentProgress = phaseProgress + (j * (nextPhaseProgress - phaseProgress)) / 10;
        setProgress(currentProgress);
        await new Promise(resolve => setTimeout(resolve, 150));
      }
    }

    // Generate mock results
    const mockResults: AnalysisResult = {
      completeness: {
        score: 87,
        status: 'good',
        checks: [
          { name: 'Executive Summary', status: 'pass', description: 'Complete and well-structured' },
          { name: 'Financial Data', status: 'pass', description: 'All required financial metrics present' },
          { name: 'Risk Assessment', status: 'warning', description: 'Some risk factors need clarification' },
          { name: 'Compliance Section', status: 'pass', description: 'Regulatory requirements addressed' },
          { name: 'Appendices', status: 'fail', description: 'Missing supporting documentation' }
        ]
      },
      missingInfo: {
        count: 7,
        critical: 2,
        items: [
          { field: 'Budget Variance Analysis', importance: 'critical', description: 'Detailed variance explanation required' },
          { field: 'Stakeholder Signatures', importance: 'critical', description: 'Missing key approvals' },
          { field: 'Timeline Milestones', importance: 'medium', description: 'Future milestone dates not specified' },
          { field: 'Resource Allocation', importance: 'medium', description: 'Human resource planning incomplete' },
          { field: 'Performance Metrics', importance: 'low', description: 'Some KPIs not defined' }
        ]
      },
      inconsistencies: {
        count: 4,
        severe: 1,
        items: [
          { type: 'Data Mismatch', severity: 'high', description: 'Budget figures differ between sections', location: 'Page 15 vs Page 23' },
          { type: 'Date Conflict', severity: 'medium', description: 'Project timeline inconsistency', location: 'Section 3.2' },
          { type: 'Format Issues', severity: 'low', description: 'Inconsistent number formatting', location: 'Multiple sections' },
          { type: 'Reference Error', severity: 'medium', description: 'Broken internal references', location: 'Appendix B' }
        ]
      }
    };

    setResults(mockResults);
    setIsAnalyzing(false);
    onAnalysisComplete(mockResults);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-error" />;
      default:
        return <Info className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins gradient-text mb-4">
            AI Analysis & Quality Assessment
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our advanced AI system is analyzing your DPR documents for completeness, 
            missing information, and potential inconsistencies.
          </p>
        </div>

        {/* Files Being Analyzed */}
        <Card className="glass glass-hover mb-8 animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center font-poppins">
              <FileCheck className="h-5 w-5 mr-2 text-primary" />
              Documents Under Analysis ({files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {files.map((file, index) => (
                <div key={file.id} className="flex items-center p-3 glass rounded-lg">
                  <CheckCircle className="h-4 w-4 text-success mr-3" />
                  <span className="font-medium">{file.name}</span>
                  {isAnalyzing && (
                    <div className="ml-auto flex items-center">
                      <RefreshCw className="h-4 w-4 animate-spin text-primary mr-2" />
                      <span className="text-sm text-primary">Analyzing...</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {!isAnalyzing && !results && (
              <div className="mt-6 text-center">
                <Button
                  onClick={simulateAnalysis}
                  size="lg"
                  className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                >
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Start Analysis
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="glass glass-hover mb-8 animate-slide-in-up">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                </div>
                <h3 className="text-xl font-semibold font-poppins mb-2">
                  Analysis in Progress
                </h3>
                <p className="text-muted-foreground">{currentPhase}</p>
              </div>

              <div className="max-w-md mx-auto">
                <Progress value={progress} className="h-3 mb-2" />
                <div className="text-center text-sm text-muted-foreground">
                  {Math.round(progress)}% Complete
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Analysis Results */}
        {results && (
          <div className="space-y-8 animate-fade-in">
            {/* Completeness Check */}
            <Card className="glass glass-hover">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <CheckCircle className="h-5 w-5 mr-2 text-success" />
                  Completeness Assessment
                  <div className="ml-auto flex items-center">
                    <span className="text-2xl font-bold text-success mr-2">
                      {results.completeness.score}%
                    </span>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      results.completeness.status === 'good' 
                        ? 'bg-success/20 text-success' 
                        : results.completeness.status === 'warning'
                        ? 'bg-warning/20 text-warning'
                        : 'bg-error/20 text-error'
                    }`}>
                      {results.completeness.status.toUpperCase()}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.completeness.checks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                      <div className="flex items-center">
                        {getStatusIcon(check.status)}
                        <div className="ml-3">
                          <div className="font-medium">{check.name}</div>
                          <div className="text-sm text-muted-foreground">{check.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missing Information */}
            <Card className="glass glass-hover">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <AlertCircle className="h-5 w-5 mr-2 text-warning" />
                  Missing Information
                  <div className="ml-auto">
                    <span className="text-sm text-muted-foreground mr-2">
                      {results.missingInfo.critical} Critical
                    </span>
                    <span className="text-2xl font-bold text-warning">
                      {results.missingInfo.count}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.missingInfo.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 glass rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className={`h-4 w-4 mr-3 ${getImportanceColor(item.importance)}`} />
                        <div>
                          <div className="font-medium">{item.field}</div>
                          <div className="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        item.importance === 'critical' 
                          ? 'bg-error/20 text-error'
                          : item.importance === 'medium'
                          ? 'bg-warning/20 text-warning'
                          : 'bg-muted/50 text-muted-foreground'
                      }`}>
                        {item.importance.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Inconsistencies */}
            <Card className="glass glass-hover">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <XCircle className="h-5 w-5 mr-2 text-error" />
                  Inconsistencies Detected
                  <div className="ml-auto">
                    <span className="text-sm text-muted-foreground mr-2">
                      {results.inconsistencies.severe} Severe
                    </span>
                    <span className="text-2xl font-bold text-error">
                      {results.inconsistencies.count}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.inconsistencies.items.map((item, index) => (
                    <div key={index} className="p-3 glass rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center">
                          <XCircle className={`h-4 w-4 mr-3 mt-0.5 ${getSeverityColor(item.severity)}`} />
                          <div>
                            <div className="font-medium">{item.type}</div>
                            <div className="text-sm text-muted-foreground">{item.description}</div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-medium ${
                          item.severity === 'high' 
                            ? 'bg-error/20 text-error'
                            : item.severity === 'medium'
                            ? 'bg-warning/20 text-warning'
                            : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          {item.severity.toUpperCase()}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Location: {item.location}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="glass glass-hover border border-primary/30">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold font-poppins mb-2">
                    Analysis Complete!
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ready to proceed to risk prediction and generate your comprehensive dashboard.
                  </p>
                  <Button
                    onClick={() => onNavigate('dashboard')}
                    size="lg"
                    className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
                  >
                    View Risk Prediction & Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalysisSection;