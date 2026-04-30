import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface MarketingSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MarketingSupportModal: React.FC<MarketingSupportModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslations();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const resetFormAndClose = () => {
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        resetFormAndClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Marketing Support Inquiry:', { name, email, message });
    // In a real application, you would send this data to a server.
    resetFormAndClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4"
      onClick={resetFormAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-6 sm:p-8 max-w-lg w-full animate-fade-in-scale-slow"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetFormAndClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors rounded-full p-1 hover:bg-gray-100 dark:hover:bg-white/10"
          aria-label="Cerrar modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="text-center mb-6">
            <div className="flex justify-center items-center w-16 h-16 rounded-full mx-auto mb-4 bg-[#A3CC71]">
                <span className="material-symbols-outlined text-[#2a3b5a]" style={{ fontSize: '2.5rem' }}>support_agent</span>
            </div>
            <h2 id="modal-title" className="text-2xl font-bold text-[#2a3b5a] dark:text-gray-100">{t.supportModal.title}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.supportModal.nameLabel}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.supportModal.namePlaceholder}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-[#A3CC71] focus:border-[#A3CC71] transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.supportModal.emailLabel}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.supportModal.emailPlaceholder}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-[#A3CC71] focus:border-[#A3CC71] transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t.supportModal.messageLabel}</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.supportModal.messagePlaceholder}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-[#A3CC71] focus:border-[#A3CC71] transition"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-lg font-semibold text-[#2a3b5a] transition-all duration-200 hover:scale-105 bg-[#A3CC71]"
            >
              {t.supportModal.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketingSupportModal;