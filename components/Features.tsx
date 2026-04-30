
import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { featuresTop, featuresBottom } from '../constants/features';
import FeatureCard from './FeatureCard';
import LegalModal from './LegalModal';
import { ChevronRight } from 'lucide-react';
import CampaignGeneratorTool from './CampaignGeneratorTool';
import AIAssistantTool from './AIAssistantTool';
import WebinarPlannerTool from './WebinarPlannerTool';
import SalesAutomationTool from './SalesAutomationTool';
import SalesAcademyTool from './SalesAcademyTool';
import DataRoomTool from './DataRoomTool';

const Features: React.FC = () => {
  const { t } = useTranslations();
  const [selectedFeature, setSelectedFeature] = useState<{
    id: string;
    isOpen: boolean;
  }>({
    id: '',
    isOpen: false
  });

  const allFeatures = [...featuresTop, ...featuresBottom];

  const handleCardClick = (featureId: string) => {
    setSelectedFeature({
      id: featureId,
      isOpen: true
    });
  };

  const getFeatureContent = (id: string) => {
    const featureKey = id as keyof typeof t.featureCards;
    const feature = t.featureCards[featureKey];

    if (!feature) return null;

    if (id === 'commercialStrategies') {
      return <CampaignGeneratorTool />;
    }

    if (id === 'aiMarketing') {
      return <AIAssistantTool />;
    }

    if (id === 'virtualEvents') {
      return <WebinarPlannerTool />;
    }

    if (id === 'commercialAutomation') {
      return <SalesAutomationTool />;
    }

    if (id === 'salesAcademy') {
      return <SalesAcademyTool />;
    }

    if (id === 'dataRoom') {
      return <DataRoomTool />;
    }

    return (
      <div className="space-y-6">
        <p className="text-lg leading-relaxed text-gray-300">
          {feature.description}
        </p>
      </div>
    );
  };

  return (
    <>
      <section className="py-8 lg:py-16">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4 text-[#1A3B66] dark:text-gray-100">{t.features.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-[20px]">{t.features.subtitle}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
              {allFeatures.map((feature) => (
                <div key={feature.id} className="flex w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.5rem)]">
                    <FeatureCard
                      icon={feature.icon}
                      title={t.featureCards[feature.id].title}
                      description={t.featureCards[feature.id].description}
                      // We pass no href so it always uses onClick
                      onClick={() => handleCardClick(feature.id)}
                    />
                </div>
              ))}
          </div>
        </div>
      </section>

      <LegalModal 
        isOpen={selectedFeature.isOpen}
        onClose={() => setSelectedFeature(prev => ({ ...prev, isOpen: false }))}
        title={selectedFeature.id ? t.featureCards[selectedFeature.id as keyof typeof t.featureCards].title : ''}
        content={selectedFeature.id ? getFeatureContent(selectedFeature.id) : null}
      />
    </>
  );
};

export default Features;
