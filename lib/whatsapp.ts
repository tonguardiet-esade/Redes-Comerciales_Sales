import { CONTACT_INFO } from '../config/contactInfo';
import { type Language } from '../types';

const WHATSAPP_MESSAGES: Record<Language, string> = {
  es: 'Hola, me interesa conocer cómo activar mi red comercial con Redescomerciales.ai. ¿Podemos hablar?',
  en: 'Hi, I am interested in learning how to activate my commercial network with Redescomerciales.ai. Can we talk?',
  ca: 'Hola, m\'interessa conèixer com activar la meva xarxa comercial amb Redescomerciales.ai. Podem parlar?',
};

export function getWhatsAppUrl(lang: Language): string {
  const digits = CONTACT_INFO.whatsappPhone.replace(/\D/g, '');
  const message = WHATSAPP_MESSAGES[lang] ?? WHATSAPP_MESSAGES.es;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
