export interface CrawlerFaqItem {
  question: string;
  answer: string;
}

export interface CrawlerSection {
  heading: string;
  paragraphs: string[];
}

export interface CrawlerPageContent {
  h1: string;
  intro: string;
  sections?: CrawlerSection[];
  faq?: CrawlerFaqItem[];
}

/** Contenido estático para crawlers sin JS (noscript). */
export const CRAWLER_CONTENT_ES: CrawlerPageContent = {
  h1: 'Convierte tu estrategia comercial en acción',
  intro:
    'Redes Comerciales.Sales es el hub de herramientas con IA del ecosistema Redes Comerciales. Genera campañas outbound, contenido comercial, webinars, flujos de seguimiento y materiales de venta sin empezar de cero.',
  sections: [
    {
      heading: '¿Qué es Redes Comerciales.Sales?',
      paragraphs: [
        'Es la capa de ejecución comercial del ecosistema Redes Comerciales: herramientas con IA para crear lo que tu equipo necesita vender con método.',
        'No sustituye tu CRM ni gestiona partners. Complementa tu stack actual con generadores de campañas, contenido, webinars, automatizaciones, formación y Data Room.',
      ],
    },
    {
      heading: 'Herramientas disponibles',
      paragraphs: [
        'Generador de campañas outbound, asistente de contenido comercial, planificador de webinars, diseñador de flujos de seguimiento, Sales Academy y estructura de Data Room.',
        'Cada herramienta genera resultados listos para adaptar: secuencias de email, guiones, planes de formación o estructura de carpetas.',
      ],
    },
    {
      heading: 'Relación con el ecosistema',
      paragraphs: [
        'Sales forma parte de Redes Comerciales junto con la web principal y la plataforma de gestión.',
        'Si buscas activar y gestionar tu red comercial indirecta con metodología y seguimiento, visita la web principal del ecosistema.',
      ],
    },
  ],
  faq: [
    {
      question: '¿Qué es Redes Comerciales.Sales?',
      answer:
        'Un hub de herramientas comerciales con IA para generar campañas, contenido, webinars y procesos de venta. Es la capa de ejecución del ecosistema Redes Comerciales.',
    },
    {
      question: '¿Es un CRM?',
      answer:
        'No. Sales no sustituye tu CRM. Te ayuda a crear materiales y procesos comerciales más rápido, para luego llevarlos a tus herramientas actuales.',
    },
    {
      question: '¿Qué herramientas incluye?',
      answer:
        'Generador de campañas, asistente de contenido, planificador de webinars, automatizaciones comerciales, Sales Academy y Data Room.',
    },
    {
      question: '¿Necesito instalar algo?',
      answer:
        'No. Es una aplicación web: abre la página, elige una herramienta y completa el formulario para generar resultados con IA.',
    },
    {
      question: '¿Cómo encaja con Redes Comerciales?',
      answer:
        'Sales es el espacio de herramientas del ecosistema. La web principal cubre metodología, diagnóstico y activación de red comercial indirecta.',
    },
  ],
};
