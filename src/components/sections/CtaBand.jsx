import Container from '../ui/Container.jsx';

const tones = {
  dark: { section: 'bg-night text-fg', title: 'text-fg', body: 'text-fg-muted' },
  gold: { section: 'surface-gold text-ink', title: 'text-ink', body: 'text-ink-muted' },
};

/** Short call-to-action band, black or gold. Pass Buttons as children. */
export default function CtaBand({ title, description, tone = 'dark', children }) {
  const style = tones[tone];

  return (
    <section className={`py-16 lg:py-24 ${style.section}`}>
      <Container className='flex flex-col items-center gap-7 text-center lg:flex-row lg:justify-between lg:text-left'>
        <div>
          <h2 className={`text-balance font-display text-h3 ${style.title}`}>{title}</h2>
          {description && <p className={`mt-4 max-w-xl leading-relaxed ${style.body}`}>{description}</p>}
        </div>
        <div className='flex flex-wrap justify-center gap-3'>{children}</div>
      </Container>
    </section>
  );
}
