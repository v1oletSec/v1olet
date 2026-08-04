import 'server-only';

/**
 * MDX compilation options.
 *
 * Syntax highlighting runs at build time through Shiki (via
 * rehype-pretty-code), producing dual-theme markup: every token carries both a
 * light and a dark colour, and the CSS in globals.css picks one. That means
 * highlighted code follows the theme toggle instantly, with no second
 * stylesheet and no JavaScript on the client — Shiki never ships to the
 * browser at all.
 */

import type { compileMDX } from 'next-mdx-remote/rsc';
import type { Options as PrettyCodeOptions } from 'rehype-pretty-code';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

const prettyCodeOptions: PrettyCodeOptions = {
  // Two themes, one pass. `--shiki-light` / `--shiki-dark` custom properties
  // are emitted per token and resolved by CSS.
  theme: { light: 'github-light', dark: 'github-dark-dimmed' },
  keepBackground: false,
  defaultLang: 'text',
};

/**
 * Passed straight to `compileMDX`. The option type is derived from the
 * function's own signature rather than reached for through the package's
 * internal `dist/types` path, which its exports map does not expose. Note the
 * absence of `as const`: that would make the plugin arrays readonly and
 * incompatible with the mutable `Pluggable[]` the compiler expects.
 */
type MdxOptions = NonNullable<Parameters<typeof compileMDX>[0]['options']>;

export const mdxOptions: MdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
  },
};
