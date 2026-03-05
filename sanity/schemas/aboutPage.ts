import { defineArrayMember, defineField, defineType } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Página Sobre',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Imagem do Hero',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
      ],
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Título do Hero',
      type: 'string',
    }),
    defineField({
      name: 'sections',
      title: 'Seções de Conteúdo',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Título da Seção' }),
            defineField({ name: 'body', type: 'blockContent', title: 'Conteúdo' }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Imagem',
              options: { hotspot: true },
              fields: [
                defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
              ],
            }),
          ],
          preview: {
            select: { title: 'title', media: 'image' },
          },
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Nossos Valores',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'icon', type: 'string', title: 'Ícone (emoji ou nome)' }),
            defineField({ name: 'title', type: 'string', title: 'Título', validation: (r) => r.required() }),
            defineField({ name: 'description', type: 'text', title: 'Descrição', rows: 2 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description' },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heroHeadline', media: 'heroImage' },
    prepare({ title, media }) {
      return { title: title || 'Página Sobre', media }
    },
  },
})
