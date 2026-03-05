import { defineArrayMember, defineField, defineType } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configurações do Site',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nome do Site',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Links de Navegação',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', title: 'Rótulo', validation: (r) => r.required() }),
            defineField({ name: 'href', type: 'string', title: 'URL / Caminho', validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        }),
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'E-mail de Contato',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'contactPhone',
      title: 'Telefone',
      type: 'string',
    }),
    defineField({
      name: 'contactWhatsApp',
      title: 'WhatsApp (somente números)',
      type: 'string',
    }),
    defineField({
      name: 'contactAddress',
      title: 'Endereço',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociais',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              title: 'Plataforma',
              options: {
                list: ['Instagram', 'LinkedIn', 'Facebook', 'Pinterest'],
                layout: 'radio',
              },
            }),
            defineField({ name: 'url', type: 'url', title: 'URL' }),
          ],
          preview: {
            select: { title: 'platform', subtitle: 'url' },
          },
        }),
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Texto do Rodapé',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'siteName' },
  },
})
