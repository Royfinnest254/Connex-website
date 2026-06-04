import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingAssistant from './FloatingAssistant';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const header = document.querySelector('.site-header');
    const onScroll = () => {
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(el => io.observe(el));
      return () => io.disconnect();
    } else {
      reveals.forEach(el => el.classList.add('in'));
    }
  }, [pathname]);

  useEffect(() => {
    document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  }, [pathname]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingAssistant />
      <div className="tex tex--vignette" aria-hidden="true" />
      <div className="tex tex--grid" aria-hidden="true" />
      <div className="tex tex--grain" aria-hidden="true" />
    </>
  );
}
