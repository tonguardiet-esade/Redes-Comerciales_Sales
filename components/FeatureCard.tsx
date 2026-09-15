import React from 'react';
import {
  Megaphone,
  Bot,
  Video,
  Settings2,
  GraduationCap,
  FolderOpen,
  ArrowRight,
} from 'lucide-react';
import { useTranslations } from '../hooks/useTranslations';
import { useAuth } from '../hooks/useAuth';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  campaign: Megaphone,
  smart_toy: Bot,
  video_camera_front: Video,
  settings_suggest: Settings2,
  school: GraduationCap,
  folder_shared: FolderOpen,
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  href?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, href, onClick }) => {
  const { t } = useTranslations();
  const { session } = useAuth();
  const Icon = ICON_MAP[icon] || Megaphone;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href && !href.startsWith('#') && session) {
      e.preventDefault();
      const hashFragment = `access_token=${session.access_token}&refresh_token=${session.refresh_token}&type=recovery`;
      const separator = href.includes('#') ? '&' : '#';
      window.open(`${href}${separator}${hashFragment}`, '_blank', 'noopener,noreferrer');
    }
  };

  const cardContent = (
    <div
      className="section-glass-card group h-full p-8 flex flex-col text-center cursor-pointer transition-all duration-500 hover:-translate-y-1"
      data-cursor="card"
    >
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl mx-auto mb-6 bg-mosaic-cyan/10 border border-mosaic-cyan/20 transition-transform duration-500 group-hover:scale-110">
        <Icon className="w-8 h-8 text-mosaic-cyan" />
      </div>
      <h3 className="mosaic-h5 text-mosaic-black-500 mb-4">{title}</h3>
      <p className="mosaic-body text-sm text-mosaic-black-300 flex-grow mb-6">{description}</p>
      <div className="mt-auto pt-4 border-t border-mosaic-white-300">
        <span className="mosaic-label text-mosaic-cyan flex items-center justify-center gap-2">
          {t.features.learnMore}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer" className="block h-full scroll-project-card">
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <div
        onClick={onClick}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
        role="button"
        tabIndex={0}
        className="h-full scroll-project-card"
      >
        {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default FeatureCard;
