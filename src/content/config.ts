import { defineCollection, z } from 'astro:content';

const noticiasCollection = defineCollection({
  type: 'content',
  schema: z.object({
    // ID pode ser number, string vazia, ou undefined - converter string vazia para undefined
    id: z.preprocess(
      (val) => {
        if (val === '' || val === null || val === undefined) return undefined;
        if (typeof val === 'string') {
          const num = Number(val);
          return isNaN(num) ? undefined : num;
        }
        return typeof val === 'number' ? val : undefined;
      },
      z.number().optional()
    ),
    titulo: z.string(),
    resumo: z.string(),
    imagem: z.string().url(),
    // Data pode ser string ou Date - converter para string YYYY-MM-DD
    data: z.preprocess(
      (val) => {
        if (val instanceof Date) {
          return val.toISOString().split('T')[0]; // YYYY-MM-DD
        }
        if (typeof val === 'string') {
          // Se já for string no formato correto, retornar
          if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
            return val;
          }
          // Tentar converter se for outro formato
          const date = new Date(val);
          if (!isNaN(date.getTime())) {
            return date.toISOString().split('T')[0];
          }
        }
        // Se for número (timestamp), converter
        if (typeof val === 'number') {
          return new Date(val).toISOString().split('T')[0];
        }
        return val;
      },
      z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
    ),
    autor: z.string(),
  }),
});

export const collections = {
  'noticias': noticiasCollection,
};

