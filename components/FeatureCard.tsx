import React from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { useAuth } from '../hooks/useAuth';

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

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // If it is a normal click (not modal trigger) and has an href
    if (href && !href.startsWith('#')) {
       // We only want to append SSO tokens if it's likely an internal tool
       // For this specific requirement, we assume all hrefs in features are internal tools
       // that support Supabase fragment authentication.
       
       if (session) {
           e.preventDefault();
           
           const accessToken = session.access_token;
           const refreshToken = session.refresh_token;
           
           // Construct the fragment (hash) that Supabase expects
           const hashFragment = `access_token=${accessToken}&refresh_token=${refreshToken}&type=recovery`; // 'recovery' or similar ensures it gets picked up, though just tokens often work depending on the client implementation
           
           // Check if url already has a hash
           const separator = href.includes('#') ? '&' : '#';
           const finalUrl = `${href}${separator}${hashFragment}`;
           
           window.open(finalUrl, '_blank', 'noopener,noreferrer');
       }
    }
  };

  const cardContent = (
    <div className="group h-full">
      <div className="bg-white/60 dark:bg-black/30 backdrop-blur-md rounded-3xl p-8 h-full border border-gray-200/50 dark:border-white/10 text-center cursor-pointer shadow-sm transition-all duration-500 ease-out hover:shadow-2xl hover:shadow-[#D93F34]/10 dark:hover:shadow-[#D93F34]/30 hover:-translate-y-2 flex flex-col group/card">
        <div className="flex items-center justify-center w-20 h-20 rounded-[2rem] mx-auto mb-6 transition-all duration-500 group-hover:scale-110 bg-[#D93F34]/15 dark:bg-[#D93F34]/25 border border-[#D93F34]/10">
          <span className="material-symbols-outlined text-[#D93F34] dark:text-red-400 group-hover:rotate-12 transition-transform duration-500" style={{ fontSize: '2.5rem' }}>{icon}</span>
        </div>
        <h3 className="text-xl font-bold mb-4 text-[#1A3B66] dark:text-gray-100">{title}</h3>
        <p className="leading-relaxed flex-grow mb-6 text-sm text-gray-600 dark:text-gray-400 font-medium">
          {description}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
          <span className="text-sm font-bold flex items-center justify-center gap-2 text-[#D93F34] dark:text-red-400">
            {t.features.learnMore}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} onClick={handleLinkClick} target="_blank" rel="noopener noreferrer" className="block h-full">
        {cardContent}
      </a>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }} role="button" tabIndex={0} className="h-full">
          {cardContent}
      </div>
    );
  }

  return cardContent;
};

export default FeatureCard;