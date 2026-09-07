/**
 * Extract all mermaid code blocks from raw markdown text and replace them
 * with placeholder divs so our unified pipeline won't try to highlight them.
 * Returns the replaced markdown plus a map of placeholder → diagram source.
 */
export function extractMermaid(markdown: string): {
  replaced: string;
  diagrams: Map<string, string>;
} {
  const diagrams = new Map<string, string>();
  let idx = 0;
  const replaced = markdown.replace(
    /```mermaid\r?\n([\s\S]*?)```/g,
    (_, source: string) => {
      const id = `mermaid_ph_${idx++}`;
      diagrams.set(id, source.trim());
      return `<div id="${id}"></div>`;
    }
  );
  return { replaced, diagrams };
}

/**
 * After unified has produced HTML, replace the placeholder divs back with
 * <div class="mermaid-block"> elements so the client can render them.
 */
export function reinsertMermaid(
  html: string,
  diagrams: Map<string, string>
): string {
  let result = html;
  for (const [id, source] of diagrams.entries()) {
    const placeholderRegex = new RegExp(
      `<div[^>]*id="(?:user-content-)?${id}"[^>]*>\\s*<\\/div>`,
      'g'
    );
    const encoded = encodeURIComponent(source);
    result = result.replace(
      placeholderRegex,
      `<div class="mermaid-block" data-diagram="${encoded}"></div>`
    );
  }
  return result;
}
