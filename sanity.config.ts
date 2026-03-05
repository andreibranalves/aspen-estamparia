import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import { apiVersion, dataset, projectId } from './sanity/env'

const singletonTypes = ['siteSettings', 'heroBanner', 'aboutPage']

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo')
          .items([
            S.listItem()
              .title('Configurações do Site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.listItem()
              .title('Hero Banner')
              .id('heroBanner')
              .child(
                S.document()
                  .schemaType('heroBanner')
                  .documentId('heroBanner')
              ),
            S.listItem()
              .title('Página Sobre')
              .id('aboutPage')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.divider(),
            S.documentTypeListItem('product').title('Produtos'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
