import Container from '../components/ui/Container.jsx';
import Button from '../components/ui/Button.jsx';
import usePageMeta from '../hooks/usePageMeta.js';

export default function NotFound() {
  usePageMeta({ title: 'Page not found — Kettli', description: 'This page could not be found.' });

  return (
    <section className='surface-gold py-28 text-center text-ink sm:py-36'>
      <Container>
        <p className='eyebrow text-ink-muted'>404</p>
        <h1 className='mt-4 font-display text-h2'>This table is empty</h1>
        <p className='mx-auto mt-4 max-w-md text-lg'>The page may have moved, or the link is out of date.</p>
        <div className='mt-8 flex flex-wrap justify-center gap-3'>
          <Button href='/' variant='dark' size='lg'>
            Back home
          </Button>
          <Button href='/menu' variant='ghost' size='lg'>
            See the menu
          </Button>
        </div>
      </Container>
    </section>
  );
}
