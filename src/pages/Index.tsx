import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import UploadSection from "@/components/UploadSection";
import AnalysisSection from "@/components/AnalysisSection";
import DashboardSection from "@/components/DashboardSection";
import AboutSection from "@/components/AboutSection";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Apply theme class to document
    if (isDark) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    
    // Smooth scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(files);
  };

  const handleAnalysisComplete = (results: any) => {
    setAnalysisResults(results);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection onNavigate={handleNavigation} />;
      case 'upload':
        return (
          <UploadSection 
            onFilesUploaded={handleFilesUploaded} 
            onNavigate={handleNavigation} 
          />
        );
      case 'analysis':
        return (
          <AnalysisSection 
            files={uploadedFiles} 
            onNavigate={handleNavigation}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
      case 'dashboard':
        return (
          <DashboardSection 
            qualityScore={analysisResults?.completeness?.score || 87}
            analysisResults={analysisResults}
          />
        );
      case 'about':
        return <AboutSection />;
      default:
        return <HeroSection onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        activeSection={activeSection}
        onNavigate={handleNavigation}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />
      
      <main className="pt-16">
        {renderSection()}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-border/50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="font-bold font-poppins gradient-text mb-3">
                AI-DPR Quality Assessment
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI system for comprehensive DPR quality assessment and risk prediction.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button 
                    onClick={() => handleNavigation('home')}
                    className="hover:text-primary transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('upload')}
                    className="hover:text-primary transition-colors"
                  >
                    Upload Documents
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigation('about')}
                    className="hover:text-primary transition-colors"
                  >
                    About System
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Ministry of Development</p>
                <p>of North Eastern Region</p>
                <p className="text-primary">support@ai-dpr.mdoner.gov</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border/50 mt-8 pt-6 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 MDoNER AI-DPR Quality Assessment System. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
};

export default Index;
