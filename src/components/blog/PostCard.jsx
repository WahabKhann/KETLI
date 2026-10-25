import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { photos } from '../../data/media.js';
import { readingTime } from '../../data/blog.js';
import { formatLongDate } from '../../lib/formatDate.js';

/** Post card in the shared black card style. */
export default function PostCard({ post }) {
  const photo = photos[post.photo];

  return (
    <article className='card group flex h-full flex-col overflow-hidden transition-transform duration-300 ease-kettli hover:-translate-y-1'>
      <Link to={`/blog/${post.slug}`} className='relative block overflow-hidden' tabIndex={-1} aria-hidden='true'>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          srcSet={photo.srcSet}
          sizes='(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw'
          alt=''
          loading='lazy'
          decoding='async'
          className='aspect-[4/3] w-full object-cover transition-transform duration-500 ease-kettli group-hover:scale-105'
        />
        <span className='absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-night'>
          {post.category}
        </span>
      </Link>
      <div className='flex flex-1 flex-col p-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>
          {formatLongDate(post.date)} · {readingTime(post)}
        </p>
        <h3 className='mt-3 font-display text-h5'>
          <Link to={`/blog/${post.slug}`} className='transition-colors hover:text-accent'>
            {post.title}
          </Link>
        </h3>
        <p className='mt-3 flex-1 text-sm leading-relaxed text-fg-muted'>{post.excerpt}</p>
        <Link
          to={`/blog/${post.slug}`}
          className='mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent'
        >
          Read more<span className='sr-only'>: {post.title}</span> <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
        </Link>
      </div>
    </article>
  );
}
