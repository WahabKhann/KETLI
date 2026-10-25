import Container from '../ui/Container.jsx';
import Button from '../ui/Button.jsx';
import PostCard from '../blog/PostCard.jsx';
import { posts } from '../../data/blog.js';

/** Latest posts on black. */
export default function BlogTeaser({ title = 'From the Kettli blog', exclude, limit = 3 }) {
  const items = posts.filter((post) => post.slug !== exclude).slice(0, limit);
  if (items.length === 0) return null;

  return (
    <section className='bg-night py-16 lg:py-24'>
      <Container>
        <div className='flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end'>
          <div>
            <p className='eyebrow text-accent'>Blog</p>
            <h2 className='mt-4 font-display text-h4 text-fg sm:text-5xl lg:text-6xl'>{title}</h2>
          </div>
          <Button href='/blog' variant='secondary'>
            All posts
          </Button>
        </div>
        <div className='mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
          {items.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </section>
  );
}
