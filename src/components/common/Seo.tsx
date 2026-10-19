import { useEffect } from 'react';

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = 'StudioHub | Gestão Inteligente para Estúdios • Noda Solutions';
const DEFAULT_DESCRIPTION =
  'StudioHub é a plataforma definitiva de gestão de agenda, finanças e clientes para estúdios de beleza e bem-estar. Criada e desenvolvida por Augusto Bruno Menezes Silva pela Noda Solutions.';
const DEFAULT_KEYWORDS =
  'StudioHub, Studio Hub, Noda Solutions, Augusto Bruno Menezes Silva, gestão de estúdios, agendamento salão de beleza, barbearia, estética, software SaaS, automação whatsapp, nodasolucoes, plataforma para estúdios, gestão de agendamentos';
const DEFAULT_OG_IMAGE = 'https://studiohub.nodasolucoes.dev/og-image.png';
const BASE_URL = 'https://studiohub.nodasolucoes.dev';

export function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalUrl = BASE_URL,
  ogType = 'website',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (attrName: 'name' | 'property', attrValue: string, content: string) => {
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', 'Augusto Bruno Menezes Silva');
    setMetaTag('name', 'creator', 'Augusto Bruno Menezes Silva');
    setMetaTag('name', 'publisher', 'Noda Solutions');
    setMetaTag(
      'name',
      'robots',
      noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Open Graph Tags
    setMetaTag('property', 'og:site_name', 'StudioHub | Noda Solutions');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:creator', '@AugustoBrunoo');

    // 5. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // 6. Optional Per-Page JSON-LD Structured Data
    let schemaScript = document.getElementById('dynamic-page-schema') as HTMLScriptElement | null;
    if (structuredData) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'dynamic-page-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(structuredData);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [title, description, keywords, canonicalUrl, ogType, ogImage, noIndex, structuredData]);

  return null;
}
