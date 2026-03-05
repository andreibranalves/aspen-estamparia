import { defineArrayMember, defineField, defineType } from 'sanity'
import { TagIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Produto',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nome do Produto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Canga', value: 'canga' },
          { title: 'Toalha de Praia', value: 'toalha' },
          { title: 'Lenço', value: 'lenco' },
          { title: 'Outro', value: 'outro' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'blockContent',
    }),
    defineField({
      name: 'images',
      title: 'Imagens do Produto',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Texto alternativo' }),
            defineField({ name: 'caption', type: 'string', title: 'Legenda' }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1).error('Adicione ao menos uma imagem.'),
    }),
    defineField({
      name: 'materialSpecs',
      title: 'Especificações de Material',
      type: 'object',
      fields: [
        defineField({ name: 'material', type: 'string', title: 'Material' }),
        defineField({ name: 'dimensions', type: 'string', title: 'Dimensões' }),
        defineField({ name: 'weight', type: 'string', title: 'Gramatura' }),
        defineField({ name: 'composition', type: 'string', title: 'Composição' }),
      ],
    }),
    defineField({
      name: 'customizationOptions',
      title: 'Opções de Personalização',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'minOrderQty',
      title: 'Quantidade Mínima de Pedido (MOQ)',
      type: 'number',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'featured',
      title: 'Destaque na Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Ordem de Exibição',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0',
    },
    prepare({ title, subtitle, media }) {
      const categoryMap: Record<string, string> = {
        canga: 'Canga',
        toalha: 'Toalha de Praia',
        lenco: 'Lenço',
        outro: 'Outro',
      }
      return {
        title,
        subtitle: categoryMap[subtitle] || subtitle,
        media,
      }
    },
  },
})
