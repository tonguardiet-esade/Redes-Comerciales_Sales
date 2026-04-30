import React, { useState } from 'react';
import { useTranslations } from '../hooks/useTranslations';
import { APP_URLS } from '../URLs/urls';
import { 
  Mail, 
  ChevronRight, 
  Globe, 
  MessageSquare, 
  Terminal, 
  Database, 
  Users, 
  Zap,
  BarChart3,
  Video
} from 'lucide-react';
import { motion } from 'motion/react';
import LegalModal from './LegalModal';
import { LEGAL_TEXTS } from '../constants/legalTexts';
import CampaignGeneratorTool from './CampaignGeneratorTool';
import AIAssistantTool from './AIAssistantTool';
import WebinarPlannerTool from './WebinarPlannerTool';
import SalesAutomationTool from './SalesAutomationTool';
import SalesAcademyTool from './SalesAcademyTool';
import DataRoomTool from './DataRoomTool';

const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </svg>
);

const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
    </svg>
);

const FooterLogo: React.FC = () => (
    <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#D93F34" />
                            <stop offset="100%" stopColor="#8A1F18" />
                        </linearGradient>
                    </defs>
                    <circle cx="20" cy="20" r="18" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="4 2" className="opacity-10" />
                    <path d="M20 10V22M11.3 27L20 22M28.7 27L20 22" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="20" cy="10" r="3.5" fill="url(#footerLogoGrad)" />
                    <circle cx="11.3" cy="27" r="3.5" fill="url(#footerLogoGrad)" />
                    <circle cx="28.7" cy="27" r="3.5" fill="url(#footerLogoGrad)" />
                    <circle cx="20" cy="22" r="5.5" fill="#FFFFFF" />
                    <circle cx="20" cy="22" r="2.5" fill="#1A3B66" />
                </svg>
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Redes Comerciales.Sales</span>
        </div>
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-[0.2em] ml-12">
            Sales Intelligence & Networking AI
        </span>
    </div>
);

const FooterLink: React.FC<{ 
    href?: string; 
    children: React.ReactNode; 
    external?: boolean;
    onClick?: (e: React.MouseEvent) => void;
}> = ({ href, children, external, onClick }) => (
    <li>
        <a 
            href={href || "#"} 
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault();
                    onClick(e);
                }
            }}
            className="group flex items-center text-gray-400 hover:text-white transition-colors duration-200 py-1 text-sm cursor-pointer"
        >
            <ChevronRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-[#D93F34]" />
            {children}
        </a>
    </li>
);

const Footer: React.FC = () => {
    const { t, language } = useTranslations();
    const [legalModal, setLegalModal] = useState<{
        isOpen: boolean;
        title: string;
        content: React.ReactNode;
    }>({
        isOpen: false,
        title: '',
        content: null
    });

    const openLegalModal = (title: string, type: 'legalNotice' | 'cookiesPolicy' | 'privacyPolicy') => {
        const lang = (language === 'es' || language === 'en' || language === 'ca' || language === 'fr' || language === 'it' || language === 'de') ? language : 'es';
        // Check if we have the translation for this language, otherwise fallback to 'es'
        const texts = LEGAL_TEXTS[lang as keyof typeof LEGAL_TEXTS] || LEGAL_TEXTS.es;
        
        setLegalModal({
            isOpen: true,
            title,
            content: texts[type]
        });
    };

    const openSolutionModal = (featureKey: keyof typeof t.featureCards, href?: string) => {
        const feature = t.featureCards[featureKey];

        if (featureKey === 'commercialStrategies') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <CampaignGeneratorTool />
            });
            return;
        }

        if (featureKey === 'aiMarketing') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <AIAssistantTool />
            });
            return;
        }

        if (featureKey === 'virtualEvents') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <WebinarPlannerTool />
            });
            return;
        }

        if (featureKey === 'commercialAutomation') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <SalesAutomationTool />
            });
            return;
        }

        if (featureKey === 'salesAcademy') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <SalesAcademyTool />
            });
            return;
        }

        if (featureKey === 'dataRoom') {
            setLegalModal({
                isOpen: true,
                title: feature.title,
                content: <DataRoomTool />
            });
            return;
        }

        setLegalModal({
            isOpen: true,
            title: feature.title,
            content: (
                <div className="space-y-6">
                    <p className="text-lg leading-relaxed text-gray-300">
                        {feature.description}
                    </p>
                    {href && (
                        <div className="pt-4">
                            <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-6 py-3 bg-[#D93F34] hover:bg-[#B32F26] text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-[#D93F34]/20 group"
                            >
                                {t.features.learnMore}
                                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    )}
                </div>
            )
        });
    };

    return (
        <footer className="relative bg-[#050505] overflow-hidden border-t border-white/5">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#D93F34]/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1A3B66]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <FooterLogo />
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs pt-2">
                            {t.footer.aboutDesc}
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://linkedin.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D93F34] transition-colors"
                            >
                                <LinkedinIcon className="w-5 h-5" />
                            </motion.a>
                            <motion.a 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href="https://youtube.com/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-[#D93F34] transition-colors"
                            >
                                <YoutubeIcon className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#D93F34]" />
                            {t.footer.solutions}
                        </h3>
                        <ul className="space-y-2">
                            <FooterLink onClick={() => openSolutionModal('commercialStrategies')}>{t.featureCards.commercialStrategies.title}</FooterLink>
                            <FooterLink onClick={() => openSolutionModal('aiMarketing')}>{t.featureCards.aiMarketing.title}</FooterLink>
                            <FooterLink onClick={() => openSolutionModal('virtualEvents')}>{t.featureCards.virtualEvents.title}</FooterLink>
                            <FooterLink onClick={() => openSolutionModal('commercialAutomation')}>{t.featureCards.commercialAutomation.title}</FooterLink>
                            <FooterLink onClick={() => openSolutionModal('salesAcademy')}>{t.featureCards.salesAcademy.title}</FooterLink>
                            <FooterLink onClick={() => openSolutionModal('dataRoom')}>{t.featureCards.dataRoom.title}</FooterLink>
                        </ul>
                    </div>

                    {/* Legal & Social Column */}
                    <div>
                        <h3 className="text-gray-400 uppercase text-xs tracking-widest font-bold mb-8">
                            {t.footer.legalSocial}
                        </h3>
                        <ul className="space-y-4">
                            <FooterLink href="https://linkedin.com/" external>LinkedIn</FooterLink>
                            <FooterLink onClick={() => openLegalModal(t.footer.legalNotice, 'legalNotice')}>{t.footer.legalNotice}</FooterLink>
                            <FooterLink onClick={() => openLegalModal(t.footer.cookiesPolicy, 'cookiesPolicy')}>{t.footer.cookiesPolicy}</FooterLink>
                            <FooterLink onClick={() => openLegalModal(t.footer.privacyPolicy, 'privacyPolicy')}>{t.footer.privacyPolicy}</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#D93F34]" />
                            {t.footer.contact}
                        </h3>
                        <div className="space-y-4">
                           <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="mt-1">
                                    <MessageSquare className="w-5 h-5 text-[#D93F34]" />
                                </div>
                                <div>
                                    <p className="text-white text-sm font-semibold">¿Necesitas soporte?</p>
                                    <p className="text-gray-400 text-xs mt-1">Escríbenos y nuestro equipo de marketing te ayudará.</p>
                                    <button className="text-[#D93F34] text-xs font-bold mt-2 hover:underline">
                                        Abrir formulario
                                    </button>
                                </div>
                           </div>
                           
                           <div className="flex items-center gap-3 px-4 text-gray-400">
                               <Globe className="w-4 h-4" />
                               <span className="text-xs">Global HQ - Barcelona, Spain</span>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-gray-500 text-xs leading-none">
                            {t.footer.copyright}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                           {t.footer.version}
                        </span>
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">System Operational</span>
                        </div>
                    </div>
                </div>
            </div>

            <LegalModal 
                isOpen={legalModal.isOpen} 
                onClose={() => setLegalModal(prev => ({ ...prev, isOpen: false }))}
                title={legalModal.title}
                content={legalModal.content}
            />
        </footer>
    );
};

export default Footer;
