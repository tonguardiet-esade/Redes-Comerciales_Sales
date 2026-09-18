import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { featuresTop, featuresBottom } from '../constants/features';
import FeatureCard from './FeatureCard';
import LegalModal from './LegalModal';
import CampaignGeneratorTool from './CampaignGeneratorTool';
import AIAssistantTool from './AIAssistantTool';
import WebinarPlannerTool from './WebinarPlannerTool';
import SalesAutomationTool from './SalesAutomationTool';
import SalesAcademyTool from './SalesAcademyTool';
import DataRoomTool from './DataRoomTool';

const Features: React.FC = () => {
  const { t } = useTranslations();
  const [selectedFeature, setSelectedFeature] = useState({ id: '', isOpen: false });
  const allFeatures = [...featuresTop, ...featuresBottom];

  const handleCardClick = (featureId: string) => {
    setSelectedFeature({ id: featureId, isOpen: true });
  };

  const getFeatureContent = (id: string) => {
    const featureKey = id as keyof typeof t.featureCards;
    const feature = t.featureCards[featureKey];
    if (!feature) return null;

    const tools: Record<string, React.ReactNode> = {
      commercialStrategies: <CampaignGeneratorTool />,
      aiMarketing: <AIAssistantTool />,
      virtualEvents: <WebinarPlannerTool />,
      commercialAutomation: <SalesAutomationTool />,
      salesAcademy: <SalesAcademyTool />,
      dataRoom: <DataRoomTool />,
    };

    const tool = tools[id];
    return (
      <div className="sales-tool-content">
        <p className="mosaic-body text-mosaic-black-300 mb-6">{feature.intro}</p>
        {tool ?? (
          <div className="space-y-6">
            <p className="mosaic-body text-mosaic-black-300">{feature.description}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <section id="tools" className="py-var-spacer-md" style={{ paddingTop: 'var(--spacer-md)', paddingBottom: 'var(--spacer-md)' }}>
        <div className="mosaic-container">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="mosaic-h2 text-mosaic-black-500 mb-4 scroll-reveal-heading">{t.features.title}</h2>
            <p className="mosaic-body-lg text-mosaic-black-300 max-w-3xl mx-auto scroll-reveal-body">{t.features.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {allFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={t.featureCards[feature.id].title}
                description={t.featureCards[feature.id].description}
                onClick={() => handleCardClick(feature.id)}
              />
            ))}
          </div>
        </div>
      </section>

      <LegalModal
        isOpen={selectedFeature.isOpen}
        onClose={() => setSelectedFeature((prev) => ({ ...prev, isOpen: false }))}
        title={selectedFeature.id ? t.featureCards[selectedFeature.id as keyof typeof t.featureCards].title : ''}
        content={selectedFeature.id ? getFeatureContent(selectedFeature.id) : null}
      />
    </>
  );
};

export default Features;
