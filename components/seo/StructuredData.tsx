import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { getPageSeo } from '../../lib/i18n/seo';
import { CRAWLER_CONTENT_ES } from '../../lib/seo/crawlerContent';
import {
  buildFaqPageSchema,
  buildOrganizationSchema,
  buildSoftwareApplicationSchema,
  buildWebPageSchema,
  buildWebSiteSchema,
} from '../../lib/seo/schema';
import type { Language } from '../../types';

const StructuredData = () => {
  const { lang } = useSettings();
  const contentLang = (['es', 'en', 'ca'].includes(lang) ? lang : 'es') as Language;
  const seo = getPageSeo(contentLang, 'home');

  const schemas: object[] = [
    buildOrganizationSchema(),
    buildWebSiteSchema(),
    buildWebPageSchema({
      name: seo.title,
      description: seo.description,
      path: seo.path,
      lang: contentLang,
    }),
    buildSoftwareApplicationSchema(contentLang),
    buildFaqPageSchema(CRAWLER_CONTENT_ES.faq ?? []),
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
