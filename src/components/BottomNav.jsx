import { useState } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Gallery", target: "#gallery" },
    { label: "Testimonials", target: "#testimonials" },
    { label: "About Us", target: "#about-us" },
    { label: "Contact", target: "#contact" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.querySelector(target);
    if (element) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 0,
        },
        ease: "power2.inOut",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return createPortal(
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-[300] flex flex-col justify-center items-center w-10 h-10"
        style={{ mixBlendMode: "difference" }}
        aria-label="Toggle menu"
      >
        <span
          className={`block w-6 h-0.5 bg-[#00FF64] transition-all duration-300 ${
            isMenuOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#00FF64] my-1 transition-all duration-300 ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-[#00FF64] transition-all duration-300 ${
            isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        ></span>
      </button>

      {/* Mobile Navigation - Vertical on right side */}
      <nav
        className={`md:hidden fixed right-0 top-0 h-full z-[250] flex items-center pr-8 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <ul className="flex flex-col items-end gap-8 font-bold text-xl text-[#00FF64]">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className={`nav-item transition-all duration-300 ${
                isMenuOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
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

      {/* Desktop Bottom Navigation */}
      <nav
        className="hidden md:block fixed bottom-0 left-0 right-0 z-[200] py-4 px-6"
        style={{ mixBlendMode: "difference" }}
      >
        <ul className="flex flex-row justify-center items-center gap-32 font-bold text-xl text-[#00FF64]">
          {navItems.map((item) => (
            <li key={item.label} className="nav-item">
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
    </>,
    document.body
  );
};

export default BottomNav;
