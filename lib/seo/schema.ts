import { CONTACT_INFO } from '../../config/contactInfo';
import { ECOSYSTEM_URL, SITE_NAME, SITE_URL } from './site';

function buildContactPoints() {
  const points = [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: CONTACT_INFO.email,
      telephone: CONTACT_INFO.phone ?? undefined,
      availableLanguage: ['Spanish', 'English', 'Catalan'],
      areaServed: 'ES',
    },
  ];

  if (CONTACT_INFO.whatsappPhone) {
    points.push({
      '@type': 'ContactPoint',
      contactType: 'customer support',
      telephone: `+${CONTACT_INFO.whatsappPhone}`,
      url: `https://wa.me/${CONTACT_INFO.whatsappPhone}`,
      availableLanguage: ['Spanish', 'English', 'Catalan'],
      areaServed: 'ES',
    });
  }

  return points;
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/img/logo.svg`,
    email: CONTACT_INFO.email,
    telephone: CONTACT_INFO.phone ?? undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT_INFO.address,
      addressLocality: 'Barcelona',
      addressCountry: 'ES',
    },
    description:
      'Hub de herramientas comerciales con IA del ecosistema Redes Comerciales: campañas, contenido, webinars y procesos de venta.',
    contactPoint: buildContactPoints(),
    parentOrganization: {
      '@type': 'Organization',
      name: 'Redescomerciales.ai',
      url: ECOSYSTEM_URL,
    },
    sameAs: [CONTACT_INFO.social.linkedin].filter(Boolean),
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: ['es', 'en', 'ca'],
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildWebPageSchema({
  name,
  description,
  path,
  lang,
}: {
  name: string;
  description: string;
  path: string;
  lang: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: `${SITE_URL}${path}`,
    inLanguage: lang,
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: SITE_NAME },
  };
}

export function buildSoftwareApplicationSchema(lang: string) {
  const descriptions: Record<string, string> = {
    es: 'Herramientas con IA para generar campañas outbound, contenido comercial, webinars y procesos de venta.',
    en: 'AI tools to generate outbound campaigns, commercial content, webinars, and sales processes.',
    ca: 'Eines amb IA per generar campanyes outbound, contingut comercial, webinars i processos de venda.',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE_NAME,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: SITE_URL,
    description: descriptions[lang] ?? descriptions.es,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFaqPageSchema(
  items: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
