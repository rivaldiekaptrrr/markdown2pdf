import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

// Custom sanitize schema that allows KaTeX and Mermaid classes + inline styles
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    '*': [
      ...(defaultSchema.attributes?.['*'] ?? []),
      'className',
      'style',
      'data-language',
      'data-mermaid',
    ],
    span: [...(defaultSchema.attributes?.span ?? []), 'style', 'className'],
    div: [...(defaultSchema.attributes?.div ?? []), 'style', 'className'],
    code: [...(defaultSchema.attributes?.code ?? []), 'className'],
    pre: [...(defaultSchema.attributes?.pre ?? []), 'className'],
    svg: [
      'xmlns', 'viewBox', 'width', 'height', 'style', 'className',
      'aria-hidden', 'focusable', 'role',
    ],
    path: ['d', 'fill', 'stroke', 'strokeWidth', 'strokeLinecap', 'strokeLinejoin'],
    g: ['transform', 'style', 'className'],
    text: ['x', 'y', 'dy', 'style', 'className'],
    tspan: ['x', 'y', 'dy', 'style'],
    rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'style', 'className'],
    circle: ['cx', 'cy', 'r', 'style', 'className'],
    line: ['x1', 'y1', 'x2', 'y2', 'style'],
    polyline: ['points', 'style'],
    polygon: ['points', 'style'],
    marker: ['id', 'markerWidth', 'markerHeight', 'refX', 'refY', 'orient', 'style'],
    defs: [],
    foreignObject: ['width', 'height', 'x', 'y'],
  },
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    'math', 'mrow', 'mi', 'mo', 'mn', 'msup', 'msub', 'mfrac', 'msubsup',
    'mover', 'munder', 'munderover', 'mtext', 'mspace', 'mtable', 'mtr', 'mtd',
    'svg', 'g', 'path', 'text', 'tspan', 'rect', 'circle', 'line',
    'polyline', 'polygon', 'marker', 'defs', 'foreignObject',
  ],
};

export async function parseMarkdown(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex, { throwOnError: false, strict: false })
    .use(rehypeRaw)
    .use(rehypeSanitize, sanitizeSchema as Parameters<typeof rehypeSanitize>[0])
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}
