import { CakeSlice, Coffee, Croissant, CupSoda, Flame, IceCreamCone, Sunrise, UtensilsCrossed } from 'lucide-react';
import Container from '../ui/Container.jsx';
import useTilt from '../../hooks/useTilt.js';
import { menuBoard, menuNote, menuSections, menuSectionId } from '../../data/menu.js';

const categoryIcons = {
  'Hi-Tea': CakeSlice,
  Tea: Coffee,
  Coffee: CupSoda,
  Parathas: Croissant,
  Sehri: Sunrise,
  Food: UtensilsCrossed,
  Desserts: IceCreamCone,
  Sheesha: Flame,
};

function Price({ price, from }) {
  if (price == null) {
    return (
      <span className='whitespace-nowrap rounded-full border border-accent/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent'>
        Ask at counter
      </span>
    );
  }
  return (
    <span className='whitespace-nowrap text-right font-semibold tabular-nums text-accent'>
      {from && <span className='mr-1 text-xs font-medium text-fg-muted'>from</span>}
      Rs {price.toLocaleString('en-US')}
    </span>
  );
}

function TiltCard({ className = '', children }) {
  const ref = useTilt(6);
  return (
    <div ref={ref} className={`card tilt ${className}`}>
      <span className='tilt-glare' aria-hidden='true' />
      <div className='relative'>{children}</div>
    </div>
  );
}

function NoteBox() {
  return (
    <TiltCard className='p-6 sm:p-7'>
      <h3 className='font-display text-h4 text-accent'>{menuNote.title}</h3>
      {menuNote.body.map((paragraph) => (
        <p key={paragraph} className='mt-3 text-sm text-fg-muted'>
          {paragraph}
        </p>
      ))}
    </TiltCard>
  );
}

function SectionList({ name }) {
  const section = menuSections[name];
  if (!section) return null;
  const Icon = categoryIcons[name] || UtensilsCrossed;

  return (
    <div id={menuSectionId(name)} className='scroll-mt-40'>
      <h3 className='flex items-center gap-3'>
        <span className='grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent ring-1 ring-inset ring-accent/25'>
          <Icon className='h-4 w-4' strokeWidth={1.75} aria-hidden='true' />
        </span>
        <span className='eyebrow font-sans text-accent'>{name}</span>
        <span className='h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent' aria-hidden='true' />
      </h3>
      <ul className='mt-4 space-y-3'>
        {section.items.map((item) => (
          <li key={item.name} className='flex items-baseline gap-2 text-[15px] text-fg'>
            <span>{item.name}</span>
            <span className='menu-leader' aria-hidden='true' />
            <Price price={item.price} from={item.from} />
          </li>
        ))}
      </ul>
      {section.note && <p className='mt-2 text-[13px] text-fg-muted'>{section.note}</p>}
    </div>
  );
}

/** Boxed menu board: three columns of black cards on gold, plus a callout card. */
export default function MenuBoard({ title = 'The menu', className = 'surface-gold' }) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      <Container>
        {!title && <h2 className='sr-only'>Full menu</h2>}
        {title && (
          <div className='text-center'>
            <p className='eyebrow text-ink-muted'>From the kitchen</p>
            <h2 className='mt-4 font-display text-h2 text-ink'>{title}</h2>
          </div>
        )}

        <div className={`grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3 ${title ? 'mt-10 sm:mt-12' : ''}`}>
          {menuBoard.map((column) => {
            const sections = column.filter((name) => name !== 'note');
            return (
              <div key={column.join('-')} className='flex flex-col gap-5'>
                {column.includes('note') && <NoteBox />}
                <TiltCard className='p-6 sm:p-7'>
                  <div className='space-y-8'>
                    {sections.map((name) => (
                      <SectionList key={name} name={name} />
                    ))}
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        <p className='mt-8 text-center text-sm text-ink'>
          Concept menu — most prices are placeholders until the final menu is confirmed.
        </p>
      </Container>
    </section>
  );
}
