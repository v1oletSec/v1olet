/**
 * Landing page.
 *
 * Section order follows the buyer's question order: claim → proof →
 * what you sell → how you work → evidence → who does it → credentials → act.
 * The CTF record sits in the middle of that sequence rather than at the end,
 * because it is the evidence the commercial claims rest on.
 */

import type { Metadata } from 'next';
import { Capabilities } from '@/components/sections/Capabilities';
import { ClosingCta } from '@/components/sections/ClosingCta';
import { Hero } from '@/components/sections/Hero';
import { MethodPreview } from '@/components/sections/MethodPreview';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { RecordPreview } from '@/components/sections/RecordPreview';
import { TeamPreview } from '@/components/sections/TeamPreview';
import { TrustPreview } from '@/components/sections/TrustPreview';
import { pageMetadata } from '@/lib/seo';
import { site } from '@content/site';

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — Offensive Security`,
  description: site.description,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Capabilities />
      <MethodPreview />
      <RecordPreview />
      <TeamPreview />
      <TrustPreview />
      <ClosingCta />
    </>
  );
}
