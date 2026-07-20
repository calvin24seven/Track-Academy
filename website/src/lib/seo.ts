export interface SeoMeta {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
}

export function buildHead(meta: SeoMeta) {
  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: (meta.ogType as any) || 'website',
      images: meta.ogImage ? [{ url: meta.ogImage, width: 1200, height: 630 }] : [],
    },
  };
}