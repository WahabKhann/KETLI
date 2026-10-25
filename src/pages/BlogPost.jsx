import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Link2, MessageCircleMore } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import BlogTeaser from '../components/sections/BlogTeaser.jsx';
import NotFound from './NotFound.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { getAdjacentPosts, getPostBySlug, readingTime } from '../data/blog.js';
import { photos } from '../data/media.js';
import { formatLongDate } from '../lib/formatDate.js';

function ShareRow({ title }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className='flex flex-wrap items-center gap-3'>
      <span className='text-sm font-semibold text-ink-muted'>Share</span>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-2 rounded-full border-2 border-night px-4 py-2 text-sm font-semibold transition-colors hover:bg-night hover:text-accent'
      >
        <MessageCircleMore className='h-4 w-4' />
        WhatsApp
      </a>
      <button
        type='button'
        onClick={copyLink}
        className='inline-flex items-center gap-2 rounded-full border-2 border-night px-4 py-2 text-sm font-semibold transition-colors hover:bg-night hover:text-accent'
      >
        {copied ? <Check className='h-4 w-4' /> : <Link2 className='h-4 w-4' />}
        {copied ? 'Link copied' : 'Copy link'}
      </button>
    </div>
  );
}

function AdjacentLink({ post, label, direction }) {
  if (!post) return <span />;
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`card group block p-5 transition-transform duration-300 hover:-translate-y-1 ${direction === 'next' ? 'sm:text-right' : ''}`}
    >
      <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent ${direction === 'next' ? 'sm:flex-row-reverse' : ''}`}>
        <Icon className='h-4 w-4' />
        {label}
      </span>
      <span className='mt-2 block font-display text-xl leading-tight transition-colors group-hover:text-accent'>{post.title}</span>
    </Link>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  usePageMeta({
    title: post ? `${post.title} — Kettli Islamabad` : 'Not found — Kettli',
    description: post?.excerpt || 'Stories from the Kettli rooftop.',
  });

  if (!post) return <NotFound />;

  const photo = photos[post.photo];
  const { newer, older } = getAdjacentPosts(post.slug);

  return (
    <>
      <article>
        <header className='bg-night pb-12 pt-12 text-fg sm:pb-16 sm:pt-16'>
          <Container className='max-w-4xl'>
            <Link to='/blog' className='inline-flex min-h-11 items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent'>
              <ArrowLeft className='h-4 w-4' />
              All posts
            </Link>
            <div className='mt-8 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]'>
              <span className='rounded-full bg-accent px-3 py-1 text-night'>{post.category}</span>
              <span className='text-accent'>
                {formatLongDate(post.date)} · {readingTime(post)}
              </span>
            </div>
            <h1 className='mt-5 text-balance font-display text-h2'>{post.title}</h1>
            <p className='mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted'>{post.excerpt}</p>
            <p className='mt-4 text-sm text-fg-muted'>By {post.author}</p>
          </Container>
        </header>

        <div className='bg-gradient-to-b from-night from-50% to-accent to-50%'>
          <Container className='max-w-5xl'>
            <img
              src={photo.src}
              width={photo.width}
              height={photo.height}
              srcSet={photo.srcSet}
              sizes='(min-width: 1024px) 1024px, 100vw'
              alt={photo.alt}
              decoding='async'
              className='aspect-[4/3] w-full rounded-card object-cover shadow-lift sm:aspect-[16/10]'
            />
          </Container>
        </div>

        <div className='surface-gold pb-16 pt-12 sm:pb-24'>
          <Container className='max-w-2xl'>
            <div className='space-y-6 text-lg leading-relaxed'>
              {post.body.map((paragraph, index) => (
                <p
                  key={paragraph}
                  className={index === 0 ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8]' : ''}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className='mt-12 border-t border-night/15 pt-8'>
              <ShareRow title={post.title} />
            </div>

            <nav className='mt-10 grid gap-4 sm:grid-cols-2' aria-label='More posts'>
              <AdjacentLink post={older} label='Previous' direction='prev' />
              <AdjacentLink post={newer} label='Next' direction='next' />
            </nav>
          </Container>
        </div>
      </article>

      <BlogTeaser title='More from the blog' exclude={post.slug} />
    </>
  );
}
