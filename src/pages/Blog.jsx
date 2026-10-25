import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import Container from '../components/ui/Container.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import RevealOnScroll from '../components/ui/RevealOnScroll.jsx';
import Button from '../components/ui/Button.jsx';
import PostCard from '../components/blog/PostCard.jsx';
import CtaBand from '../components/sections/CtaBand.jsx';
import usePageMeta from '../hooks/usePageMeta.js';
import { posts, blogCategories, readingTime } from '../data/blog.js';
import { photos } from '../data/media.js';
import { siteConfig } from '../data/siteConfig.js';
import { formatLongDate } from '../lib/formatDate.js';

const ALL = 'All';

function FeaturedPost({ post }) {
  const photo = photos[post.photo];

  return (
    <article className='card group grid overflow-hidden lg:grid-cols-[1.2fr_1fr]'>
      <Link to={`/blog/${post.slug}`} className='relative block overflow-hidden' tabIndex={-1} aria-hidden='true'>
        <img
          src={photo.src}
          width={photo.width}
          height={photo.height}
          srcSet={photo.srcSet}
          sizes='(min-width: 1024px) 55vw, 100vw'
          alt=''
          decoding='async'
          className='aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-kettli group-hover:scale-105 lg:aspect-auto lg:max-h-[34rem]'
        />
        <span className='absolute left-5 top-5 rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-night'>
          Latest
        </span>
      </Link>
      <div className='flex flex-col justify-center p-7 sm:p-10'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-accent'>
          {post.category} · {formatLongDate(post.date)} · {readingTime(post)}
        </p>
        <h2 className='mt-4 text-balance font-display text-h3'>
          <Link to={`/blog/${post.slug}`} className='transition-colors hover:text-accent'>
            {post.title}
          </Link>
        </h2>
        <p className='mt-5 text-base leading-relaxed text-fg-muted sm:text-lg'>{post.excerpt}</p>
        <p className='mt-4 text-sm text-fg-muted'>By {post.author}</p>
        <Button href={`/blog/${post.slug}`} variant='primary' className='mt-7 w-fit'>
          Read the story <ArrowRight className='h-4 w-4' />
        </Button>
      </div>
    </article>
  );
}

export default function Blog() {
  usePageMeta({
    title: 'Blog — Kettli Islamabad',
    description: 'Stories from the Kettli rooftop — food, chai, live music and late nights in Islamabad.',
  });

  const [category, setCategory] = useState(ALL);
  const [featured, ...rest] = posts;
  const filtered = category === ALL ? rest : posts.filter((post) => post.category === category);

  return (
    <>
      <PageHeader
        eyebrow='Blog'
        title='Notes from the rooftop'
        description='Food, chai, live music and late nights in F-10 — stories from the Kettli table.'
        photo={photos.stringLights}
      />

      <section className='surface-gold py-16 lg:py-24'>
        <Container>
          <RevealOnScroll>
            <FeaturedPost post={featured} />
          </RevealOnScroll>
        </Container>
      </section>

      <section className='bg-night py-16 text-fg lg:py-24'>
        <Container>
          <div className='flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='eyebrow text-accent'>All stories</p>
              <h2 className='mt-4 font-display text-h3'>
                {category === ALL ? 'More from the blog' : category}
              </h2>
            </div>
            <div className='flex flex-wrap gap-2' role='group' aria-label='Filter posts by category'>
              {blogCategories.map((name) => (
                <button
                  key={name}
                  type='button'
                  onClick={() => setCategory(name)}
                  aria-pressed={category === name}
                  className={`rounded-full border-2 border-accent px-4 py-2 text-sm font-semibold transition-colors ${
                    category === name
                      ? 'bg-accent text-night'
                      : 'text-accent hover:bg-accent hover:text-night'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {filtered.map((post, index) => (
                <RevealOnScroll key={post.slug} delay={index * 90}>
                  <PostCard post={post} />
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <p className='mt-10 text-fg-muted'>No posts in this category yet.</p>
          )}

          <p className='mt-12 text-center text-xs text-fg-muted'>
            Sample posts for the concept — to be replaced or approved by Kettli.
          </p>
        </Container>
      </section>

      <CtaBand
        tone='gold'
        title='Got a rooftop story?'
        description={`Tag ${siteConfig.instagramHandle} in your photos — the best ones might end up here.`}
      >
        <Button href={siteConfig.instagramUrl} variant='dark' size='lg'>
          <Instagram className='h-4 w-4' />
          Follow {siteConfig.instagramHandle}
        </Button>
      </CtaBand>
    </>
  );
}
