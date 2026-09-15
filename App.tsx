import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Layout from './components/Layout';
import { SettingsProvider } from './context/SettingsContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import Loader from './components/mosaic/Loader';
import MosaikTransition from './components/mosaic/MosaikTransition';
const AppContent: React.FC = () => {
  const [bootPhase, setBootPhase] = useState<'loading' | 'transition' | 'ready'>('loading');
  const [isSupportOpen, setSupportOpen] = useState(false);

  const handleLoaderComplete = useCallback(() => setBootPhase('transition'), []);
  const handleTransitionComplete = useCallback(() => setBootPhase('ready'), []);

  if (bootPhase === 'loading') {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <>
      <MosaikTransition active={bootPhase === 'transition'} onComplete={handleTransitionComplete} />
      {bootPhase === 'ready' && (
        <Layout
          onOpenSupport={() => setSupportOpen(true)}
          isSupportOpen={isSupportOpen}
          onCloseSupport={() => setSupportOpen(false)}
        >
          <Hero />
          <Features />
        </Layout>
      )}
    </>
  );
};

const App: React.FC = () => (
  <SettingsProvider>
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  </SettingsProvider>
);

export default App;
