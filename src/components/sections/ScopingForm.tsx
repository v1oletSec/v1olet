'use client';

/**
 * Scoping brief builder.
 *
 * There is no server: the site is a static export, so this form composes a
 * structured `mailto:` rather than POSTing anywhere. That is a deliberate
 * trade and worth stating plainly —
 *
 *   + no third-party form processor sees a prospect's infrastructure details,
 *     which is a real consideration when the message body describes an attack
 *     surface, and it keeps the privacy page honest;
 *   + no backend to run, no secrets to rotate, nothing to breach;
 *   − the visitor's mail client opens instead of an in-page success state, and
 *     nothing is captured if they abandon there.
 *
 * The form still does the work a form should: it structures the enquiry so the
 * first reply can be substantive instead of a list of questions. Validation is
 * native HTML plus a live preview of the message that will be sent, so nothing
 * is hidden from the person sending it.
 *
 * To move to a real endpoint later, replace `buildMailto` with a fetch to a
 * route handler; the field contract below is the whole interface.
 */

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { contact } from '@content/site';
import { services } from '@content/services';
import { cx, mailto } from '@/lib/utils';

const TIMELINES = ['As soon as possible', 'Within 4 weeks', 'This quarter', 'Exploring / no date yet'];
const SIZES = ['1–20 people', '21–100 people', '101–500 people', '500+ people'];

interface FormState {
  name: string;
  company: string;
  email: string;
  engagement: string;
  timeline: string;
  size: string;
  targets: string;
  context: string;
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  engagement: services[0].title,
  timeline: TIMELINES[0],
  size: SIZES[1],
  targets: '',
  context: '',
};

/** Renders the brief as the plain-text body of the email. */
function buildBody(state: FormState): string {
  return [
    `Engagement type: ${state.engagement}`,
    `Timeline:        ${state.timeline}`,
    `Organisation:    ${state.company || '—'} (${state.size})`,
    `Contact:         ${state.name || '—'} <${state.email || '—'}>`,
    '',
    'Targets / scope',
    '---------------',
    state.targets || '(not provided)',
    '',
    'Context and concerns',
    '--------------------',
    state.context || '(not provided)',
    '',
    '— sent from v1olet.xyz/contact',
  ].join('\n');
}

export function ScopingForm() {
  const [state, setState] = useState<FormState>(EMPTY);

  const body = useMemo(() => buildBody(state), [state]);
  const href = useMemo(
    () => mailto(contact.email, `${contact.engagementSubject} — ${state.engagement}`, body),
    [state.engagement, body],
  );

  const set = <K extends keyof FormState>(key: K) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setState((prev) => ({ ...prev, [key]: event.target.value }));

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
      {/* --------------------------------------------------------- form --- */}
      <form
        className="space-y-6"
        // Submission is handled by the mailto link below; the form element
        // exists for grouping, labelling and native validation feedback.
        onSubmit={(event) => event.preventDefault()}
        aria-describedby="form-note"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={state.name}
              onChange={set('name')}
              className={inputClass}
              placeholder="Alex Fischer"
            />
          </Field>

          <Field label="Work email" htmlFor="email">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={state.email}
              onChange={set('email')}
              className={inputClass}
              placeholder="alex@example.com"
            />
          </Field>

          <Field label="Organisation" htmlFor="company">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={state.company}
              onChange={set('company')}
              className={inputClass}
              placeholder="Example GmbH"
            />
          </Field>

          <Field label="Organisation size" htmlFor="size">
            <select id="size" name="size" value={state.size} onChange={set('size')} className={inputClass}>
              {SIZES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>

          <Field label="Engagement type" htmlFor="engagement">
            <select
              id="engagement"
              name="engagement"
              value={state.engagement}
              onChange={set('engagement')}
              className={inputClass}
            >
              {services.map((service) => (
                <option key={service.slug}>{service.title}</option>
              ))}
              <option>Not sure yet</option>
            </select>
          </Field>

          <Field label="Timeline" htmlFor="timeline">
            <select
              id="timeline"
              name="timeline"
              value={state.timeline}
              onChange={set('timeline')}
              className={inputClass}
            >
              {TIMELINES.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field
          label="Targets and scope"
          htmlFor="targets"
          hint="Applications, APIs, environments, cloud accounts — whatever is in play."
        >
          <textarea
            id="targets"
            name="targets"
            rows={4}
            value={state.targets}
            onChange={set('targets')}
            className={cx(inputClass, 'resize-y')}
            placeholder="Customer-facing web app (Next.js + Go API), staging environment, single AWS account."
          />
        </Field>

        <Field
          label="Context and concerns"
          htmlFor="context"
          hint="What worries you, what triggered this, and anything a tester should know up front."
        >
          <textarea
            id="context"
            name="context"
            rows={4}
            value={state.context}
            onChange={set('context')}
            className={cx(inputClass, 'resize-y')}
            placeholder="Enterprise customer requires a pentest report before signature. Multi-tenant model is new and untested."
          />
        </Field>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button href={href} size="lg" cursorLabel="open mail client">
            Open in email client
          </Button>
          <button
            type="button"
            onClick={() => setState(EMPTY)}
            className="label text-[0.6rem] text-fg-faint underline-offset-4 transition-colors hover:text-accent hover:underline"
          >
            Reset form
          </button>
        </div>

        <p id="form-note" className="text-xs leading-relaxed text-fg-faint">
          This form does not submit anywhere. It composes a message and opens it in your own mail
          client, so nothing you type here reaches a third-party form processor — which matters when
          the message describes your attack surface. Prefer to write directly?{' '}
          <a
            href={mailto(contact.email, contact.engagementSubject)}
            className="text-accent underline underline-offset-4"
          >
            {contact.email}
          </a>
        </p>
      </form>

      {/* ------------------------------------------------------ preview --- */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="ticked border border-rule bg-surface-raised">
          <header className="flex items-center justify-between border-b border-rule px-5 py-3">
            <span className="label text-fg-faint">Message preview</span>
            <span className="numeric text-[0.65rem] text-accent">{contact.email}</span>
          </header>
          <pre className="scroll-x numeric max-h-[32rem] overflow-y-auto whitespace-pre-wrap p-5 text-xs leading-relaxed text-fg-muted">
            {body}
          </pre>
          <footer className="border-t border-rule px-5 py-3 text-[0.65rem] text-fg-faint">
            Replies {contact.responseTime}.
          </footer>
        </div>
      </aside>
    </div>
  );
}

const inputClass =
  'w-full border border-rule bg-surface px-4 py-3 text-sm text-fg transition-colors placeholder:text-fg-faint/60 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label block text-[0.55rem] text-fg-faint">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-xs text-fg-faint">{hint}</p>}
    </div>
  );
}
