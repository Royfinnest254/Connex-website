import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://connextechnologies.org';
const SITE_NAME = 'Connex Technologies';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const FOUNDER_IMAGE = `${SITE_URL}/images/roy-chumba.webp`;
const FOUNDER_OG_IMAGE = `${SITE_URL}/images/roy-chumba-profile-og.jpg`;
const ORG_ID = `${SITE_URL}/#organization`;

export const PAGE_SEO = {
  '/': {
    title: 'Connex Technologies | Payment Coordination Infrastructure in Kenya',
    description: 'Connex is building a neutral coordination layer for cross-institutional payments in Kenya, focused on payment data completeness and verifiable handoff records.',
    imageAlt: 'Connex Technologies payment coordination infrastructure for Kenya',
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: SITE_NAME,
          alternateName: 'Connex',
          url: `${SITE_URL}/`,
          logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
          description: 'A Kenya-based technology company building a neutral coordination layer for cross-institutional payment handoffs.',
          foundingDate: '2024',
          areaServed: { '@type': 'Country', name: 'Kenya' },
          founder: { '@id': `${SITE_URL}/company/team/#roy-chumba` },
          contactPoint: { '@type': 'ContactPoint', email: 'info@connextechnologies.org', contactType: 'business inquiries' },
          sameAs: ['https://www.linkedin.com/company/connex-technologies']
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          url: `${SITE_URL}/`,
          name: SITE_NAME,
          alternateName: 'Connex',
          inLanguage: 'en-KE',
          publisher: { '@id': ORG_ID }
        }
      ]
    }
  },
  '/product': {
    title: 'How Connex Works | Payment Handoff Coordination',
    description: 'See how Connex is designed to support payment data enrichment and create tamper-evident records of handoffs between financial institutions.'
  },
  '/solutions/banks': {
    title: 'Payment Coordination for Banks in Kenya | Connex',
    description: 'Explore how Connex is designed to help bank operations teams address payment data gaps and retrieve verifiable records of cross-institutional handoffs.'
  },
  '/solutions/fintechs': {
    title: 'Payment Handoff Evidence for Fintechs | Connex Kenya',
    description: 'Learn how Connex is designed to support fintechs coordinating payment handoffs with financial institution partners in Kenya.'
  },
  '/solutions/regulators': {
    title: 'Payment Handoff Records for Regulators | Connex Kenya',
    description: 'Learn about Connex’s proposed neutral coordination layer and its approach to payment handoff records for regulatory review.'
  },
  '/company/about': {
    title: 'About Connex Technologies | Built in Kenya',
    description: 'Learn about Connex Technologies, a Kenya-based company building coordination infrastructure for payments between financial institutions.'
  },
  '/company/team': {
    title: 'Roy Chumba | Founder of Connex Technologies',
    description: 'Meet Roy Chumba, founder of Connex Technologies, and learn about his work building payment coordination infrastructure in Kenya.',
    image: FOUNDER_IMAGE,
    ogImage: FOUNDER_OG_IMAGE,
    imageAlt: 'Roy Chumba, founder and CEO of Connex Technologies',
    ogType: 'profile',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/company/team/#profile`,
      url: `${SITE_URL}/company/team/`,
      name: 'Roy Chumba | Founder of Connex Technologies',
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/company/team/#roy-chumba`,
        name: 'Roy Chumba',
        jobTitle: 'Founder and CEO',
        image: FOUNDER_IMAGE,
        url: `${SITE_URL}/company/team/`,
        description: 'Roy Chumba is the founder and CEO of Connex Technologies, a Kenya-based company building payment coordination infrastructure.',
        affiliation: { '@id': ORG_ID }
      }
    }
  },
  '/resources/whitepaper': {
    title: 'Payment Coordination Whitepaper | Connex Technologies',
    description: 'Request Connex’s technical whitepaper on payment handoff coordination, data enrichment, and verifiable records for financial institutions.'
  },
  '/resources/faq': {
    title: 'Payment Coordination Questions | Connex Technologies FAQ',
    description: 'Answers about Connex, its proposed payment coordination layer, institutional integrations, data handling, and current focus in Kenya.'
  },
  '/security': {
    title: 'Security Approach | Connex Technologies',
    description: 'Read about Connex’s stated security principles for payment coordination, data minimisation, integration, and responsible disclosure.'
  },
  '/contact': {
    title: 'Contact Connex Technologies | Kenya',
    description: 'Contact Connex Technologies about institutional partnerships, technical briefings, product demonstrations, or research.'
  },
  '/legal/privacy': {
    title: 'Privacy Policy | Connex Technologies',
    description: 'Read the Connex Technologies website privacy policy and learn how inquiry information is handled.'
  },
  '/legal/terms': {
    title: 'Terms of Use | Connex Technologies',
    description: 'Read the terms governing use of the Connex Technologies website.'
  }
};

export function getPageSeo(pathname) {
  return PAGE_SEO[pathname] || PAGE_SEO['/'];
}

export function buildSeoHead(pathname) {
  const page = getPageSeo(pathname);
  const canonical = `${SITE_URL}${pathname === '/' ? '/' : `${pathname}/`}`;
  const image = page.ogImage || DEFAULT_IMAGE;
  const tags = [
    `<title>${escapeHtml(page.title)}</title>`,
    `<meta name="description" content="${escapeHtml(page.description)}">`,
    `<link rel="canonical" href="${canonical}">`,
    '<meta name="robots" content="index,follow,max-image-preview:large">',
    `<meta property="og:type" content="${page.ogType || 'website'}">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:title" content="${escapeHtml(page.title)}">`,
    `<meta property="og:description" content="${escapeHtml(page.description)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:alt" content="${escapeHtml(page.imageAlt || page.description)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:locale" content="en_KE">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(page.title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(page.description)}">`,
    `<meta name="twitter:image" content="${image}">`
  ];
  if (page.schema) tags.push(`<script type="application/ld+json">${JSON.stringify(page.schema).replace(/</g, '\\u003c')}</script>`);
  return tags.join('\n    ');
}

export function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const head = buildSeoHead(pathname);
    const documentHead = new DOMParser().parseFromString(`<head>${head}</head>`, 'text/html').head;
    document.title = documentHead.querySelector('title')?.textContent || SITE_NAME;
    for (const selector of ['meta[name="description"]', 'link[rel="canonical"]', 'meta[name="robots"]', 'meta[property^="og:"]', 'meta[name^="twitter:"]', 'script[type="application/ld+json"]']) {
      document.head.querySelectorAll(selector).forEach(element => element.remove());
    }
    documentHead.querySelectorAll('meta, link, script').forEach(element => document.head.append(element.cloneNode(true)));
  }, [pathname]);

  return null;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}
