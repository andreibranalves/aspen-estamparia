import { defineQuery } from 'next-sanity'

// Image fragment for reuse
const imageFragment = /* groq */ `
  asset->{
    _id,
    url,
    metadata { lqip, dimensions }
  },
  alt,
  hotspot,
  crop
`

// ─── Site Settings ───────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo { ${imageFragment} },
    navigationLinks[] { label, href },
    contactEmail,
    contactPhone,
    contactWhatsApp,
    contactAddress,
    socialLinks[] { platform, url },
    footerText
  }
`)

// ─── Hero Banner ─────────────────────────────────────────────────────────────

export const HERO_BANNER_QUERY = defineQuery(`
  *[_type == "heroBanner" && _id == "heroBanner"][0]{
    headline,
    subheadline,
    backgroundImage { ${imageFragment} },
    ctaLabel,
    ctaHref,
    overlayOpacity
  }
`)

// ─── Products ────────────────────────────────────────────────────────────────

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "product"] | order(order asc, _createdAt asc) {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    images[] { ${imageFragment} },
    materialSpecs,
    customizationOptions,
    minOrderQty,
    featured
  }
`)

export const FEATURED_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && featured == true] | order(order asc) [0...3] {
    _id,
    name,
    "slug": slug.current,
    category,
    "mainImage": images[0] { ${imageFragment} },
    minOrderQty
  }
`)

export const PRODUCT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    description,
    images[] { ${imageFragment} },
    materialSpecs[] { _key, label, value },
    customizationOptions,
    minOrderQty,
    featured
  }
`)

export const PRODUCT_NAMES_QUERY = defineQuery(`
  *[_type == "product"] | order(order asc) { name }
`)

export const PRODUCT_SLUGS_QUERY = defineQuery(`
  *[_type == "product" && defined(slug.current)] {
    "slug": slug.current
  }
`)

// ─── About Page ──────────────────────────────────────────────────────────────

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0]{
    heroImage { ${imageFragment} },
    heroHeadline,
    sections[] {
      _key,
      title,
      body,
      image { ${imageFragment} }
    },
    values[] {
      _key,
      icon,
      title,
      description
    }
  }
`)
