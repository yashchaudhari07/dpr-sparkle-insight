import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  Shield, 
  Zap, 
  Users, 
  Award, 
  Target,
  CheckCircle,
  TrendingUp,
  Clock,
  FileCheck
} from 'lucide-react';

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Technology',
      description: 'Powered by cutting-edge machine learning algorithms and natural language processing to deliver accurate document analysis.',
      color: 'text-primary'
    },
    {
      icon: Shield,
      title: 'Comprehensive Risk Assessment',
      description: 'Multi-dimensional risk analysis covering financial, operational, timeline, and environmental factors.',
      color: 'text-success'
    },
    {
      icon: Zap,
      title: 'Lightning Fast Processing',
      description: 'Process complex DPR documents in seconds, not hours. Get instant insights and actionable recommendations.',
      color: 'text-warning'
    },
    {
      icon: Target,
      title: 'Precision Accuracy',
      description: 'Industry-leading 99.2% accuracy rate in document quality assessment and risk prediction.',
      color: 'text-accent'
    }
  ];

  const capabilities = [
    {
      icon: FileCheck,
      title: 'Document Structure Analysis',
      items: [
        'Executive summary completeness',
        'Financial data validation',
        'Compliance section review',
        'Supporting documentation check'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Risk Prediction Models',
      items: [
        'Financial risk assessment',
        'Operational risk factors',
        'Timeline delay prediction',
        'Environmental compliance risks'
      ]
    },
    {
      icon: Clock,
      title: 'Real-time Insights',
      items: [
        'Instant quality scoring',
        'Live progress tracking',
        'Dynamic risk visualization',
        'Automated report generation'
      ]
    }
  ];

  const stats = [
    { label: 'Documents Analyzed', value: '10,000+' },
    { label: 'Accuracy Rate', value: '99.2%' },
    { label: 'Processing Speed', value: '50x Faster' },
    { label: 'Risk Categories', value: '4 Key Areas' }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold font-poppins gradient-text mb-6">
            About AI-DPR Quality Assessment System
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our advanced AI-powered platform revolutionizes DPR quality assessment and risk prediction 
            for MDoNER. Built with cutting-edge technology to streamline document review processes 
            and provide actionable insights for better decision-making.
          </p>
        </div>

        {/* Key Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="glass glass-hover animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                      <div className={`absolute inset-0 ${feature.color} opacity-20 rounded-full blur-xl`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-poppins mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Capabilities Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-poppins text-center mb-8 gradient-text">
            Core Capabilities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card 
                  key={index} 
                  className="glass glass-hover animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center font-poppins">
                      <Icon className="h-5 w-5 mr-3 text-primary" />
                      {capability.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {capability.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 mr-2 text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Statistics */}
        <Card className="glass glass-hover mb-16 animate-fade-in">
          <CardContent className="p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold gradient-text font-poppins mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold font-poppins text-center mb-12 gradient-text">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Upload Documents',
                description: 'Simply upload your DPR documents in PDF, Word, or text format through our intuitive drag-and-drop interface.',
                icon: FileCheck,
                color: 'text-primary'
              },
              {
                step: '02',
                title: 'AI Analysis',
                description: 'Our advanced AI system analyzes document structure, completeness, and identifies potential risks and inconsistencies.',
                icon: Brain,
                color: 'text-success'
              },
              {
                step: '03',
                title: 'Get Insights',
                description: 'Receive comprehensive reports with quality scores, risk assessments, and actionable recommendations.',
                icon: TrendingUp,
                color: 'text-accent'
              }
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className="text-center animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto glass rounded-full flex items-center justify-center mb-4 group hover:scale-110 transition-transform">
                      <Icon className={`h-8 w-8 ${step.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-8 h-8 flex items-center justify-center">
                      {step.step}
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold font-poppins mb-3">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Stack */}
        <Card className="glass glass-hover animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center font-poppins">
              <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
              Built with Enterprise-Grade Technology
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {[
                'Machine Learning',
                'Natural Language Processing',
                'Cloud Computing',
                'Advanced Analytics'
              ].map((tech, index) => (
                <div 
                  key={index}
                  className="p-4 glass rounded-lg hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-sm font-medium text-muted-foreground">
                    {tech}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="text-center mt-16 animate-fade-in">
          <Card className="glass glass-hover inline-block">
            <CardContent className="p-6">
              <h3 className="font-semibold font-poppins mb-2">
                Need Help or Have Questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team is here to support you with the AI-DPR Quality Assessment System
              </p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📧 support@ai-dpr.mdoner.gov</p>
                <p>📞 +91-11-XXXX-XXXX</p>
                <p>🏢 Ministry of Development of North Eastern Region</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;