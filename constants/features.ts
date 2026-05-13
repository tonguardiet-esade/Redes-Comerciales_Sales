
import { type Translations } from '../types';
import { APP_URLS } from '../URLs/urls';

type FeatureKey = keyof Translations['featureCards'];

interface Feature {
  id: FeatureKey;
  icon: string;
  href?: string;
}

export const featuresTop: Feature[] = [
  { id: 'commercialStrategies', icon: 'campaign', href: APP_URLS.campaignGenerator },
  { id: 'aiMarketing', icon: 'smart_toy', href: APP_URLS.aiAssistants },
  { id: 'virtualEvents', icon: 'video_camera_front' }
];

export const featuresBottom: Feature[] = [
  { id: 'commercialAutomation', icon: 'settings_suggest' },
  { id: 'salesAcademy', icon: 'school', href: APP_URLS.salesAcademy },
  { id: 'dataRoom', icon: 'folder_shared', href: APP_URLS.dataRoom }
];
