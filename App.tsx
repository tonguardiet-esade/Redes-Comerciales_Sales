
import React, { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import { LanguageProvider, LanguageContext } from './context/LanguageContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import MarketingSupportModal from './components/MarketingSupportModal';
import LoadingScreen from './components/LoadingScreen';

// Separate component to use hooks inside providers
const AppContent: React.FC = () => {
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);
  const [isLoadingMock, setIsLoadingMock] = useState(true);
  
  const { language } = useContext(LanguageContext)!;
  const { theme } = useContext(ThemeContext)!;

  // Loading Mock for visuals
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingMock(false);
    }, 1500); 
    return () => clearTimeout(timer);
  }, []);

  if (isLoadingMock) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050505] relative transition-colors duration-300 overflow-hidden">
        {/* Professional Background Elements */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Layer 1: Professional Technical Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A3B6630_1px,transparent_1px),linear-gradient(to_bottom,#1A3B6630_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Layer 2: Subtle Connection Nodes (Subtle Dots) */}
          <div className="absolute inset-0 bg-[radial-gradient(#1A3B6640_2px,transparent_2px)] dark:bg-[radial-gradient(#ffffff20_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_80%,transparent_100%)]"></div>
          
          {/* Layer 3: Fine Diagonal Network Matrix */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#1A3B6615_0.8px,transparent_0.8px),linear-gradient(-45deg,#1A3B6615_0.8px,transparent_0.8px)] dark:bg-[linear-gradient(45deg,#ffffff08_0.8px,transparent_0.8px),linear-gradient(-45deg,#ffffff08_0.8px,transparent_0.8px)] bg-[size:80px_80px] opacity-60"></div>
          
          {/* Ambient Depth Elements */}
          <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-[#1A3B66]/5 blur-[120px] dark:bg-[#1A3B66]/10 animate-pulse-slow"></div>
          <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#D93F34]/5 blur-[100px] dark:bg-[#D93F34]/10"></div>
          
          {/* Central Highlight */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white/50 to-transparent dark:from-white/5 opacity-50 blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Header onOpenSupportModal={() => setSupportModalOpen(true)} />
          
          <main>
            <Hero />
            <Features />
          </main>
          <Footer />
          <MarketingSupportModal isOpen={isSupportModalOpen} onClose={() => setSupportModalOpen(false)} />
        </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
