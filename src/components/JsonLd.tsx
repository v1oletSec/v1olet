/**
 * Structured-data emitter.
 *
 * `dangerouslySetInnerHTML` is unavoidable for JSON-LD, so the payload is
 * always a server-built object from `@/lib/seo` — never user input — and `<`
 * is escaped so a string value can never terminate the script element early.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
