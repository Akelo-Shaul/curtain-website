import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate, useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastScrollY = useRef(0);
  const desktopNavRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const heroHeight = window.innerHeight;

      // Always show in hero section
      if (currentY <= heroHeight * 0.5) {
        setNavHidden(false);
      } else if (currentY > lastScrollY.current) {
        // Scrolling down — hide
        setNavHidden(true);
      } else {
        // Scrolling up — show
        setNavHidden(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Gallery', target: '#gallery' },
    { label: 'Services', target: '#services' },
    { label: 'About Us', target: '#about-us' },
    { label: 'Testimonials', target: '#testimonials' },
    { label: 'Contact', target: '#contact' },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // If not on home page, navigate to home first
    if (location.pathname !== '/') {
      window._internalNavigation = true;
      navigate('/' + target);
      return;
    }

    const element = document.querySelector(target);
    if (element) {
      // Kill any active scrollTo tweens to prevent competing animations
      gsap.killTweensOf(window);

      // Flag to prevent the snap ScrollTrigger from firing during nav scroll
      window._navScrolling = true;

      // For services, scroll to the END of the reveal pin so the scrub
      // naturally shows the fully-revealed content (progress=1).
      // Scrolling to the element top would land at progress=0 where content is hidden.
      const revealEnd = window.servicesRevealTl?.scrollTrigger?.end;

      // For gallery, scroll to the START of its ScrollTrigger so the scrub
      // resets to progress=0 (initial state with all images visible).
      // Without this, navigating from sections below lands at the end state.
      const galleryStart = window.galleryScrollTrigger?.start;

      const scrollTarget = (target === '#services' && revealEnd)
        ? { y: revealEnd }
        : (target === '#gallery' && galleryStart != null)
        ? { y: galleryStart }
        : { y: element, offsetY: 0 };

      // When navigating to gallery (before services), hide the circle during
      // the scroll to prevent it flashing as the scrub reverses through the
      // dead zone between servicesTl and revealTl.
      const circleEl = window.revealCircle;
      const goingBeforeServices = target === '#gallery';
      if (goingBeforeServices && circleEl) {
        gsap.set(circleEl, { visibility: 'hidden' });
      }

      gsap.to(window, {
        duration: 1.5,
        scrollTo: scrollTarget,
        ease: "power2.inOut",
        onComplete: () => {
          window._navScrolling = false;

          // Refresh recalculates trigger positions. The scrub may re-render
          // the revealTl at progress=0 which sets circle opacity back to 1.
          ScrollTrigger.refresh();

          // After refresh, force circle hidden for pre-services sections.
          // The scrub won't override this until the next manual scroll event.
          if (goingBeforeServices && circleEl) {
            gsap.set(circleEl, { opacity: 0, scale: 1, visibility: 'visible' });
          }
        }
      });
    }
  };


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return createPortal(
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-4 right-6 z-[300] flex flex-col justify-center items-center w-10 h-10"
        style={{ mixBlendMode: 'difference' }}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-0.5 bg-[#00FF64] transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#00FF64] my-1 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-0.5 bg-[#00FF64] transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
      </button>

      {/* Mobile Navigation - Vertical on right side */}
      <nav className={`md:hidden fixed right-0 top-0 h-full z-[250] flex items-center pr-8 transition-opacity duration-300 ${
        isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} style={{ mixBlendMode: 'difference' }}>
        <ul className="flex flex-col items-end gap-8 font-bold text-xl text-[#00FF64]">
          {navItems.map((item, index) => (
            <li key={item.label} className="nav-item transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
              <a
                href={item.target}
                onClick={(e) => handleNavClick(e, item.target)}
                className="hover:opacity-70 transition-opacity cursor-pointer"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Top Navigation */}
      <nav
        ref={desktopNavRef}
        className={`hidden md:block fixed top-0 left-0 right-0 z-[200] bg-[#e8e8e8] border-b border-[#d0d0d0] transition-transform duration-300 ease-in-out ${navHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex items-center justify-between px-10 py-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (location.pathname !== '/') {
                navigate('/');
              } else {
                gsap.killTweensOf(window);
                window._navScrolling = true;
                gsap.to(window, {
                  duration: 1,
                  scrollTo: { y: 0 },
                  ease: "power2.inOut",
                  onComplete: () => { window._navScrolling = false; }
                });
              }
            }}
            className="text-[#333] text-xl font-bold tracking-[3px] uppercase hover:opacity-70 transition-opacity"
          >
            Alhua
          </a>
          <ul className="flex items-center gap-12">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.target}
                  onClick={(e) => handleNavClick(e, item.target)}
                  className="text-[#555] text-xs font-medium tracking-[3px] uppercase hover:text-[#111] transition-colors cursor-pointer"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>,
    document.body
  );
};

export default BottomNav;
