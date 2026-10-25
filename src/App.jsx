import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';

// Every page except Home loads on demand, keeping the first download small.
const Menu = lazy(() => import('./pages/Menu.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const BlogPost = lazy(() => import('./pages/BlogPost.jsx'));
const Locations = lazy(() => import('./pages/Locations.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window.HTMLElement.prototype ? 'instant' : 'auto' });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className='flex min-h-screen flex-col bg-night'>
      <ScrollToTop />
      <a
        href='#main-content'
        className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-night focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent'
      >
        Skip to content
      </a>
      <Navbar />
      <main id='main-content' className='flex-1'>
        <Suspense fallback={<div className='min-h-screen bg-night' aria-busy='true' />}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/menu' element={<Menu />} />
            <Route path='/about' element={<About />} />
            <Route path='/events' element={<Events />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:slug' element={<BlogPost />} />
            <Route path='/locations' element={<Locations />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
