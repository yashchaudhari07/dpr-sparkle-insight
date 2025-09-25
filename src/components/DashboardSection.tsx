import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  TrendingDown, 
  TrendingUp, 
  DollarSign, 
  Settings, 
  Clock, 
  Leaf,
  Download,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';

interface RiskData {
  financial: { level: number; status: 'low' | 'medium' | 'high'; trend: 'up' | 'down' };
  operational: { level: number; status: 'low' | 'medium' | 'high'; trend: 'up' | 'down' };
  timeline: { level: number; status: 'low' | 'medium' | 'high'; trend: 'up' | 'down' };
  environmental: { level: number; status: 'low' | 'medium' | 'high'; trend: 'up' | 'down' };
}

interface DashboardSectionProps {
  qualityScore: number;
  analysisResults?: any;
}

const DashboardSection = ({ qualityScore, analysisResults }: DashboardSectionProps) => {
  const [riskData, setRiskData] = useState<RiskData>({
    financial: { level: 0, status: 'low', trend: 'down' },
    operational: { level: 0, status: 'low', trend: 'down' },
    timeline: { level: 0, status: 'low', trend: 'down' },
    environmental: { level: 0, status: 'low', trend: 'down' }
  });

  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate quality score
    const timer = setInterval(() => {
      setAnimatedScore(prev => {
        if (prev < qualityScore) {
          return prev + 1;
        }
        clearInterval(timer);
        return qualityScore;
      });
    }, 30);

    // Generate risk predictions
    setTimeout(() => {
      setRiskData({
        financial: { level: 25, status: 'low', trend: 'down' },
        operational: { level: 45, status: 'medium', trend: 'up' },
        timeline: { level: 65, status: 'high', trend: 'up' },
        environmental: { level: 15, status: 'low', trend: 'down' }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [qualityScore]);

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBgColor = (status: string) => {
    switch (status) {
      case 'low': return 'bg-success/20 border-success/30';
      case 'medium': return 'bg-warning/20 border-warning/30';
      case 'high': return 'bg-error/20 border-error/30';
      default: return 'bg-muted/20 border-muted/30';
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-error" />
    ) : (
      <TrendingDown className="h-4 w-4 text-success" />
    );
  };

  const generateReport = async () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGeneratingReport(false);
    
    // In a real app, this would trigger a file download
    console.log('Report generated successfully');
  };

  const riskCategories = [
    {
      key: 'financial' as keyof RiskData,
      title: 'Financial Risk',
      icon: DollarSign,
      description: 'Budget and cost-related risks'
    },
    {
      key: 'operational' as keyof RiskData,
      title: 'Operational Risk',
      icon: Settings,
      description: 'Process and workflow risks'
    },
    {
      key: 'timeline' as keyof RiskData,
      title: 'Timeline Risk',
      icon: Clock,
      description: 'Schedule and delivery risks'
    },
    {
      key: 'environmental' as keyof RiskData,
      title: 'Environmental Risk',
      icon: Leaf,
      description: 'Environmental compliance risks'
    }
  ];

  const overallRiskLevel = Math.round(
    (riskData.financial.level + riskData.operational.level + riskData.timeline.level + riskData.environmental.level) / 4
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins gradient-text mb-4">
            Risk Prediction Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive risk assessment and quality metrics for your DPR documents. 
            AI-powered insights to help you make informed decisions.
          </p>
        </div>

        {/* Top Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Quality Score */}
          <Card className="glass glass-hover animate-scale-in">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="hsl(var(--success))"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(animatedScore / 100) * 251.2} 251.2`}
                      className="transition-all duration-1000 ease-out drop-shadow-lg"
                      style={{ filter: 'drop-shadow(0 0 8px hsl(var(--success) / 0.4))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">{animatedScore}%</span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold font-poppins text-lg">Overall Quality</h3>
              <p className="text-sm text-muted-foreground">Document assessment score</p>
            </CardContent>
          </Card>

          {/* Overall Risk Level */}
          <Card className="glass glass-hover animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <AlertTriangle className={`h-12 w-12 mx-auto ${getRiskColor(overallRiskLevel > 60 ? 'high' : overallRiskLevel > 30 ? 'medium' : 'low')}`} />
              </div>
              <h3 className="font-semibold font-poppins text-lg">Risk Level</h3>
              <p className="text-sm text-muted-foreground mb-2">Overall project risk</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                overallRiskLevel > 60 
                  ? 'bg-error/20 text-error'
                  : overallRiskLevel > 30
                  ? 'bg-warning/20 text-warning'
                  : 'bg-success/20 text-success'
              }`}>
                {overallRiskLevel}% {overallRiskLevel > 60 ? 'HIGH' : overallRiskLevel > 30 ? 'MEDIUM' : 'LOW'}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card className="glass glass-hover animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-6 text-center">
              <div className="mb-4">
                <Target className="h-12 w-12 mx-auto text-primary" />
              </div>
              <h3 className="font-semibold font-poppins text-lg">Action Items</h3>
              <p className="text-sm text-muted-foreground mb-2">Items requiring attention</p>
              <div className="text-2xl font-bold text-warning">
                {analysisResults?.missingInfo?.critical || 2}
              </div>
              <div className="text-sm text-muted-foreground">Critical issues</div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {riskCategories.map((category, index) => {
            const risk = riskData[category.key];
            const Icon = category.icon;
            
            return (
              <Card 
                key={category.key} 
                className={`glass glass-hover border animate-slide-in-up ${getRiskBgColor(risk.status)}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between font-poppins">
                    <div className="flex items-center">
                      <Icon className={`h-5 w-5 mr-2 ${getRiskColor(risk.status)}`} />
                      {category.title}
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(risk.trend)}
                      <span className={`ml-2 text-lg font-bold ${getRiskColor(risk.status)}`}>
                        {risk.level}%
                      </span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <Progress 
                    value={risk.level} 
                    className="h-3"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>Low Risk</span>
                    <span>High Risk</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Analysis Summary */}
        {analysisResults && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="glass glass-hover animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <CheckCircle className="h-5 w-5 mr-2 text-success" />
                  Completeness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success mb-2">
                  {analysisResults.completeness?.score || qualityScore}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Document structure and content completeness assessment
                </p>
                <Progress value={analysisResults.completeness?.score || qualityScore} className="mt-3 h-2" />
              </CardContent>
            </Card>

            <Card className="glass glass-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <AlertTriangle className="h-5 w-5 mr-2 text-warning" />
                  Missing Info
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning mb-2">
                  {analysisResults.missingInfo?.count || 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Critical: {analysisResults.missingInfo?.critical || 0} items need attention
                </p>
                <div className="mt-3 flex space-x-2">
                  <div className="flex-1 bg-error/20 h-2 rounded"></div>
                  <div className="flex-1 bg-warning/20 h-2 rounded"></div>
                  <div className="flex-1 bg-muted/20 h-2 rounded"></div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass glass-hover animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center font-poppins">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Inconsistencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-error mb-2">
                  {analysisResults.inconsistencies?.count || 0}
                </div>
                <p className="text-sm text-muted-foreground">
                  Severe: {analysisResults.inconsistencies?.severe || 0} issues detected
                </p>
                <div className="mt-3 space-y-1">
                  <div className="h-1 bg-error/40 rounded w-full"></div>
                  <div className="h-1 bg-warning/40 rounded w-3/4"></div>
                  <div className="h-1 bg-muted/40 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Report Generation */}
        <Card className="glass glass-hover border border-primary/30 animate-scale-in">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold font-poppins mb-4">
              Generate Comprehensive Report
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Download a detailed PDF report containing all analysis results, risk assessments, 
              recommendations, and actionable insights for your DPR documents.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={generateReport}
                disabled={isGeneratingReport}
                size="lg"
                className="bg-primary hover:bg-primary-glow text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
              >
                {isGeneratingReport ? (
                  <>
                    <Activity className="h-5 w-5 mr-2 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" />
                    Download PDF Report
                  </>
                )}
              </Button>

              <div className="flex items-center text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4 mr-1" />
                <span>Includes charts & visualizations</span>
              </div>
            </div>

            {isGeneratingReport && (
              <div className="mt-6 max-w-md mx-auto">
                <Progress value={66} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  Compiling analysis data and generating visualizations...
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DashboardSection;