import React from 'react';
import MosaicModal from './mosaic/MosaicModal';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, title, content }) => (
  <MosaicModal isOpen={isOpen} onClose={onClose} title={title} maxWidth="3xl">
    <div className="p-6 md:p-8 mosaic-body text-mosaic-black-300 leading-relaxed custom-scrollbar">
      {content}
    </div>
  </MosaicModal>
);

export default LegalModal;
