import { defineField, defineType } from 'sanity'
import { ImageIcon } from '@sanity/icons'

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Título Principal',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subtítulo',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Imagem de Fundo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto do Botão CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Link do Botão CTA',
      type: 'string',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Opacidade do Overlay (%)',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
      initialValue: 40,
    }),
  ],
  preview: {
    select: { title: 'headline', media: 'backgroundImage' },
  },
})
