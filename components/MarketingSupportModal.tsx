import React, { useState } from 'react';
import { useSettings } from '../context/SettingsContext';
import MosaicModal from './mosaic/MosaicModal';
import MosaicButton from './mosaic/MosaicButton';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MarketingSupportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { t } = useSettings();
  const [subject, setSubject] = useState('');
  const [inquiry, setInquiry] = useState('');
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSending(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSubject('');
      setInquiry('');
      onClose();
    }, 3000);
  };

  return (
    <MosaicModal
      isOpen={isOpen}
      onClose={onClose}
      title={t('support.marketing')}
      subtitle={t('support.subtitle')}
      maxWidth="lg"
    >
      <div className="p-6 md:p-8">
        {success ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-mosaic-cyan/10 text-mosaic-cyan flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
            <p className="mosaic-body text-sm">{t('support.success')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mosaic-label text-mosaic-black-300 block mb-2">{t('support.subject')}</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={t('support.placeholder_subject')}
                className="app-input"
              />
            </div>
            <div>
              <label className="mosaic-label text-mosaic-black-300 block mb-2">{t('support.inquiry')}</label>
              <textarea
                required
                rows={5}
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                placeholder={t('support.placeholder_inquiry')}
                className="app-input resize-none"
              />
            </div>
            <MosaicButton type="submit" disabled={sending}>
              {sending ? t('support.sending') : t('support.send')}
            </MosaicButton>
          </form>
        )}
      </div>
    </MosaicModal>
  );
};

export default MarketingSupportModal;
