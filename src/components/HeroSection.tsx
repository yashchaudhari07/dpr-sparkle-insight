import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp, FileCheck } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
  const features = [
    {
      icon: FileCheck,
      title: 'Smart Analysis',
      description: 'AI-powered DPR quality assessment'
    },
    {
      icon: Shield,
      title: 'Risk Prediction',
      description: 'Proactive risk identification'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Insights',
      description: 'Instant performance metrics'
    },
    {
      icon: Zap,
      title: 'Fast Processing',
      description: 'Lightning-speed document analysis'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
        <div className="absolute inset-0 animated-gradient opacity-30" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-secondary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Main Title */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-poppins leading-tight">
              <span className="gradient-text">AI-Powered DPR</span>
              <br />
              <span className="text-foreground">Quality Assessment</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
              Advanced AI system for comprehensive DPR quality assessment and risk prediction. 
              Streamline your document review process with intelligent analysis and actionable insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <Button
              size="lg"
              onClick={() => onNavigate('upload')}
              className="group bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              Start Analysis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate('about')}
              className="glass-hover px-8 py-4 text-lg font-semibold rounded-xl border-primary/30 hover:border-primary/60"
            >
              Learn More
            </Button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-scale-in" style={{ animationDelay: '0.4s' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="glass glass-hover p-6 rounded-xl text-center group cursor-pointer"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="relative mb-4 inline-block">
                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-glow transition-colors mx-auto" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 font-poppins">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text font-poppins">99.2%</div>
              <div className="text-muted-foreground font-medium">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text font-poppins">50x</div>
              <div className="text-muted-foreground font-medium">Faster Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text font-poppins">24/7</div>
              <div className="text-muted-foreground font-medium">Availability</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;