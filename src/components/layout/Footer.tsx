/**
 * Site footer.
 *
 * Also the home of the recruiting easter egg: the previous site hid a flag in
 * an HTML comment and the team's audience found it. It is carried forward
 * here as a `data-` attribute plus a comment — visible to anyone reading the
 * source, invisible and inert to everyone else.
 */

import Link from 'next/link';
import { Wordmark } from '@/components/layout/Wordmark';
import { contact, footerNav, recruitingFlag, site, socials } from '@content/site';
import { mailto } from '@/lib/utils';

const external = (href: string) => /^https?:/.test(href);

export function Footer() {
  return (
    <footer
      className="relative border-t border-rule bg-surface-raised"
      data-recruiting={recruitingFlag}
    >
      {/* If you are reading this: we hire people who read this. */}
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Wordmark variant="nav" className="h-7" />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">{site.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              <SocialLink href={socials.linkedin} label="LinkedIn" />
              <SocialLink href={socials.github} label="GitHub" />
              <SocialLink href={socials.ctftime} label="CTFtime" />
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="label text-fg-faint">{group.title}</h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    {external(link.href) ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-fg-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                        <span aria-hidden="true" className="ml-1 text-fg-faint">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-fg-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-rule pt-8 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="numeric">
            © {new Date().getFullYear()} {site.name} · {site.legalName}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={mailto(contact.email, contact.disclosureSubject)}
              className="transition-colors hover:text-accent"
            >
              Responsible disclosure
            </a>
            <Link href="/legal/imprint/" className="transition-colors hover:text-accent">
              Imprint
            </Link>
            <Link href="/legal/privacy/" className="transition-colors hover:text-accent">
              Privacy
            </Link>
            <a href={mailto(contact.email)} className="numeric transition-colors hover:text-accent">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="label border border-rule px-3 py-2 text-[0.65rem] text-fg-muted transition-colors hover:border-accent hover:text-accent"
    >
      {label}
    </a>
  );
}
