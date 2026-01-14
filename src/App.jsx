import Navbar from "./components/Navbar"
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { testimonials } from "./data/testimonials";

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollSmoother requires ScrollTrigger
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { Draggable } from "gsap/Draggable";
import { CgArrowTopRight } from "react-icons/cg";
import { IoPeople } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";

gsap.registerPlugin(useGSAP,ScrollTrigger,ScrollSmoother,ScrollToPlugin,SplitText,Draggable);

function App() {
  const galleryRef = useRef(null);
  const scrollRightRef = useRef(null);
  const scrollLeftRef = useRef(null);
  const centerTextRef = useRef(null);
  const servicesRef = useRef(null);
  const servicesEntryRef = useRef(null);
  const circleRef = useRef(null);
  const servicesContentRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselContainerRef = useRef(null);
  const contentRefs = useRef([]);
  const [testimonialIndices, setTestimonialIndices] = useState([0, 1, 2, 3]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const dragInstanceRef = useRef(null);

  // Ad section refs
  const adSectionRef = useRef(null);
  const adContainerRef = useRef(null);
  const skipAdButtonRef = useRef(null);

  // 8 floating images - 4 on left side, 4 on right side of the cone
  const floatingImage1Ref = useRef(null);
  const floatingImage2Ref = useRef(null);
  const floatingImage3Ref = useRef(null);
  const floatingImage4Ref = useRef(null);
  const floatingImage5Ref = useRef(null);
  const floatingImage6Ref = useRef(null);
  const floatingImage7Ref = useRef(null);
  const floatingImage8Ref = useRef(null);

  useGSAP(() => {
    if (!galleryRef.current || !scrollRightRef.current || !scrollLeftRef.current || !centerTextRef.current ||
        !floatingImage1Ref.current || !floatingImage2Ref.current || !floatingImage3Ref.current || !floatingImage4Ref.current ||
        !floatingImage5Ref.current || !floatingImage6Ref.current || !floatingImage7Ref.current || !floatingImage8Ref.current) return;

    // Calculate scroll distance (8 images worth of scrolling)
    const imageWidth = window.innerWidth >= 768 ? 320 : 256; // md:w-80 : w-64
    const gap = 16; // gap-4 = 16px
    const scrollDistance = (imageWidth + gap) * 8;

    // Pin the gallery section and animate both rows
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top top",
        end: `+=${scrollDistance * 2}`, // Scroll distance to show all 8 images
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Animate top row - starts from left, scrolls right (moving left)
    tl.fromTo(scrollRightRef.current,
      { x: 0 },
      {
        x: -scrollDistance,
        ease: "none"
      },
    0);

    // Animate bottom row - starts from right, scrolls left (moving right)
    tl.fromTo(scrollLeftRef.current,
      { x: 0 },
      {
        x: scrollDistance,
        ease: "none"
      },
    0);

    // Fade in center text as images scroll away (starts at 60% progress)
    tl.fromTo(centerTextRef.current,
      {
        opacity: 0,
        scale: 0.8
      },
      {
        opacity: 1,
        scale: 1,
        ease: "power2.out",
        duration: 0.4
      },
      0.6 // Start at 60% of timeline (when ~3 images left)
    );

    // Floating images - Cone perspective with center-to-edge expansion
    // At least 3 images visible at once: back (small, sharp), middle (medium, sharp), front (large, blurred when cut off)

    const leftImages = [floatingImage1Ref, floatingImage3Ref, floatingImage5Ref, floatingImage7Ref];
    const rightImages = [floatingImage2Ref, floatingImage4Ref, floatingImage6Ref, floatingImage8Ref];

    // Left side images - start at center, expand outward to left edge
    leftImages.forEach((imgRef, index) => {
      const startProgress = 0.8 + (index * 0.15); // Decreased stagger for more overlap

      // Create multi-stage animation with blur at start and end only
      tl.fromTo(imgRef.current,
        {
          x: "150%", // Start at center horizontally
          y: "0vh", // Start at center vertically (cone tip)
          scale: 0.25, // Small at back
          filter: "blur(8px)", // Slight depth blur
          opacity: 0
        },
        {
          x: "-125%", // Move toward edge but still mostly visible
          y: "10vh", // Slight upward movement
          scale: 1.5,
          // filter: "blur(0px)", // Sharp when visible
          ease: "none",
          duration: 0.5
        },
        startProgress
      )
      // Fade in opacity faster (reaches 1 at midpoint)
      .to(imgRef.current,
        {
          opacity: 1,
          duration: 0.15,
          filter: "blur(0px)",
          ease: "none"
        },
        startProgress // Start at same time as main animation
      )
    });

    // Right side images - start at center, expand outward to right edge
    rightImages.forEach((imgRef, index) => {
      const startProgress = 0.8 + (index * 0.15); // Stagger to show 3 at once

      // Create multi-stage animation with blur at start and end only
      tl.fromTo(imgRef.current,
        {
          x: "-150%", // Start at center horizontally
          y: "0vh", // Start at center vertically (cone tip)
          scale: 0.25, // Small at back
          filter: "blur(8px)", // Slight depth blur
          opacity: 0
        },
        {
          x: "100%", // Move toward edge but still mostly visible
          y: "10vh", // Slight upward movement
          scale: 0.8,
          // filter: "blur(0px)", // Sharp when visible
          ease: "none",
          duration: 0.3
        },
        startProgress
      )
      // Fade in opacity faster (reaches 1 at midpoint)
      .to(imgRef.current,
        {
          opacity: 1,
          duration: 0.15,
          filter: "blur(0px)",
          ease: "none"
        },
        startProgress // Start at same time as main animation
      )
    });

    // Services section animation - circle drop and expand reveal
    if (!servicesRef.current || !circleRef.current || !servicesContentRef.current) return;

    // Hide services section initially - it will be revealed only when circle covers it
    gsap.set(servicesRef.current, {
      visibility: "hidden"
    });

    const servicesTl = gsap.timeline({
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top -60%",
        end: "top -100%", // Extended to allow scroll-controlled fade
        scrub: true,
        markers: true,
      }
    });

    // First: Drop circle from top of viewport to center
    servicesTl.fromTo(circleRef.current,
      {
        top: "40vh",
        scale: 1,
        opacity: 0
      },
      {
        top: "50vh",
        opacity: 1,
        ease: "power2.in",
        duration: 2
      }
    )
    .to(circleRef.current,
      {
        opacity: 1,
        duration: 0.01
      }
    );

    // Second: Expand circle to fill screen
    servicesTl.to(circleRef.current,
      {
        scale: 30,
        ease: "power2.out",
        duration: 4
      }
    );

    // Add label for snap point after circle expansion
    servicesTl.addLabel("snapPoint");

    // Snap services section to top when it comes into viewport (only when scrolling down)
    let snapComplete = false;
    ScrollTrigger.create({
      trigger: servicesRef.current,
      start: "top bottom-=120",
      end: "top top",
      onEnter: () => {
        gsap.to(window, {
          scrollTo: { y: servicesRef.current, offsetY: 0 },
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            snapComplete = true;
            // Reveal services section after snap (now hidden by expanded circle)
            gsap.to(servicesRef.current, {
              visibility: "visible",
              duration: 0.01
            });
          }
        });
      }
    });

    // Create reveal timeline that only progresses after snap
    const revealTl = gsap.timeline({
      scrollTrigger: {
        trigger: servicesRef.current,
        start: "top top",
        end: "+=100%",
        scrub: true,
        pin: true,
        pinSpacing: true,
      }
    });

    // Keep circle at full opacity initially
    revealTl.to(circleRef.current,
      {
        opacity: 1,
        duration: 0.5
      }
    );

    // Fade out circle and fade in services content simultaneously (scroll-controlled)
    revealTl.to(circleRef.current,
      {
        opacity: 0,
        ease: "power2.out",
        duration: 2
      },
      "reveal" // Label for simultaneous animations
    );

    revealTl.fromTo(servicesContentRef.current,
      {
        opacity: 0,
        y: 30
      },
      {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: 2
      },
      "reveal" // Starts at the same time as circle fade out
    );

    // Testimonials carousel - draggable card contents with GSAP
    if (!carouselContainerRef.current) return;

    let autoPlayInterval;
    const dragInstances = [];

    // Auto-advance testimonials
    const advanceTestimonials = (direction = 1) => {
      setTestimonialIndices(prev => {
        return prev.map(index => {
          let newIndex = index + direction;
          if (newIndex >= testimonials.length) newIndex = 0;
          if (newIndex < 0) newIndex = testimonials.length - 1;
          return newIndex;
        });
      });
    };

    // Create Draggable instances for card contents
    let isDragging = false;

    contentRefs.current.forEach((contentEl, index) => {
      if (!contentEl) return;

      let dragStartX = 0;

      const dragInstance = Draggable.create(contentEl, {
        type: "x",
        bounds: { minX: -150, maxX: 150 },
        inertia: false,
        allowNativeTouchScrolling: false,
        edgeResistance: 0.65,
        onPress: function() {
          clearInterval(autoPlayInterval);
          isDragging = true;
          dragStartX = this.x;
        },
        onDrag: function() {
          const currentDragX = this.x;

          // Sync all card contents to move together in the same direction
          contentRefs.current.forEach((el, idx) => {
            if (el && idx !== index) {
              gsap.set(el, { x: currentDragX });
            }
          });
        },
        onRelease: function() {
          const dragDistance = this.x - dragStartX;
          isDragging = false;

          // If dragged significantly, advance or go back
          if (Math.abs(dragDistance) > 50) {
            const direction = dragDistance < 0 ? 1 : -1;

            // Animate all card contents out in drag direction
            const exitX = dragDistance < 0 ? -400 : 400;
            contentRefs.current.forEach(el => {
              if (el) {
                gsap.to(el, {
                  x: exitX,
                  opacity: 0,
                  duration: 0.4,
                  ease: "power2.in"
                });
              }
            });

            // Change testimonials and animate in from opposite side
            setTimeout(() => {
              advanceTestimonials(direction);

              // Animate new content in from opposite side
              const enterX = dragDistance < 0 ? 400 : -400;
              setTimeout(() => {
                contentRefs.current.forEach((el, elIdx) => {
                  if (el) {
                    gsap.set(el, { x: enterX, opacity: 0 });
                    gsap.to(el, {
                      x: 0,
                      opacity: 1,
                      duration: 0.4,
                      ease: "power2.out",
                      onComplete: () => {
                        // Update Draggable to sync with new position for continued dragging
                        if (elIdx === 0) {
                          dragInstances.forEach(instance => {
                            if (instance) instance.update();
                          });
                        }
                      }
                    });
                  }
                });
              }, 50);
            }, 400);
          } else {
            // If not dragged enough, snap all contents back to center
            contentRefs.current.forEach(el => {
              if (el) {
                gsap.to(el, {
                  x: 0,
                  duration: 0.4,
                  ease: "elastic.out(1, 0.5)"
                });
              }
            });
          }

          // Restart auto-play
          setTimeout(() => {
            if (!isDragging) {
              autoPlayInterval = setInterval(() => {
                // Animate all card contents out to the left
                contentRefs.current.forEach(el => {
                  if (el) {
                    gsap.to(el, {
                      x: -400,
                      opacity: 0,
                      duration: 0.4,
                      ease: "power2.in"
                    });
                  }
                });

                setTimeout(() => {
                  advanceTestimonials(1);

                  // Animate in from right
                  setTimeout(() => {
                    contentRefs.current.forEach((el, elIdx) => {
                      if (el) {
                        gsap.set(el, { x: 400, opacity: 0 });
                        gsap.to(el, {
                          x: 0,
                          opacity: 1,
                          duration: 0.4,
                          ease: "power2.out",
                          onComplete: () => {
                            // Update Draggable to sync with new position
                            if (elIdx === 0) {
                              dragInstances.forEach(instance => {
                                if (instance) instance.update();
                              });
                            }
                          }
                        });
                      }
                    });
                  }, 50);
                }, 400);
              }, 4000);
            }
          }, 600);
        }
      })[0];

      dragInstances.push(dragInstance);
    });

    // Start auto-play
    autoPlayInterval = setInterval(() => {
      // Animate all card contents out to the left
      contentRefs.current.forEach(el => {
        if (el) {
          gsap.to(el, {
            x: -400,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in"
          });
        }
      });

      setTimeout(() => {
        advanceTestimonials(1);

        // Animate in from right
        setTimeout(() => {
          contentRefs.current.forEach((el, elIdx) => {
            if (el) {
              gsap.set(el, { x: 400, opacity: 0 });
              gsap.to(el, {
                x: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                  // Update Draggable to sync with new position
                  if (elIdx === 0) {
                    dragInstances.forEach(instance => {
                      if (instance) instance.update();
                    });
                  }
                }
              });
            }
          });
        }, 50);
      }, 400);
    }, 4000);

    // Cleanup
    return () => {
      clearInterval(autoPlayInterval);
      dragInstances.forEach(instance => instance && instance.kill());
    };

  }, []);

  // Ad section scroll animation
  useGSAP(() => {
    if (!adSectionRef.current || !adContainerRef.current || !skipAdButtonRef.current) return;

    // Set initial state - full container, no border radius, button hidden
    gsap.set(adContainerRef.current, {
      borderRadius: 0,
      margin: 0,
      width: "100%",
      height: "100%"
    });
    gsap.set(skipAdButtonRef.current, {
      opacity: 0,
      y: -20
    });

    // Create scroll-triggered animation
    const adTl = gsap.timeline({
      scrollTrigger: {
        trigger: adSectionRef.current,
        start: "top top",
        end: "+=50%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
      }
    });

    // Animate container to inset with rounded corners
    adTl.to(adContainerRef.current, {
      borderRadius: "2rem",
      margin: "3rem",
      width: "calc(100% - 6rem)",
      height: "calc(100% - 6rem)",
      ease: "power2.out",
      duration: 1
    });

    // Fade in skip ad button
    adTl.to(skipAdButtonRef.current, {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      duration: 0.5
    }, "-=0.5"); // Start slightly before container animation ends

  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-screen bg-[#927C7C]  p-6 overflow-hidden">
        {/* Mobile: Full background image, Desktop: Contained image */}
          <div className="absolute inset-0 md:inset-x-100 md:w-2/3 md:h-7/8">
            <img
              src="src\assets\hero.jpg"
              alt="Curtain background"
              className="w-full h-full object-cover md:object-contain md:object-right"
            />
            {/* Mobile overlay */}
            <div className="absolute inset-0 bg-black/30 md:hidden"></div>
          </div>
          
        {/* Content Wrapper */}
        <div className="relative z-10 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">      
            <h2 className="text-5xl md:text-3xl font-bold text-white">Alhua</h2>
            {/* Mobile: Vertical Navbar on right. Hidden desktop */}
            <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-end px-6">
              <Navbar />
            </div>
          </div>
          {/* <div className="absolute md:bottom-[0]">
            <Navbar />
          </div> */}
          <div className="text-white">
            <h3 className="text-6xl md:text-8xl font-semibold">Ah Hulaker</h3>
            <p className="md:text-3xl md:mb-16">Exclusive Modern Drawer Curtains</p>
          </div>
          <div className="absolute bottom-0 hidden md:block w-full">
            <Navbar />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} className="relative w-full h-[180vh] bg-[#BEB9A9] p-6 overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="">
            <h2 className="text-4xl md:text-6xl font-bold text-white  z-10">Made for lasting impression</h2>
          </div>
          <div className="md:w-[30%] my-6 md:my-0">
            <p className="tracking-[10px] md:tracking-[8px] leading-[30px] font-bold md:text-[16px]">Quality curtains. Great Design. Handmade with precision.</p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-5">
          <div className="w-[16px] h-[16px] rounded-full bg-black z-10"></div>
          <p className="text-[16px] font-bold tracking-[4px] z-10">Gallery</p>
        </div>

        {/* Centered text behind gallery straps */}
        <div
          ref={centerTextRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0"
        >
          {/* Floating Images - Large portrait images at edges */}
          {/* Left side images - 4 images stacked in depth */}
          <div
            ref={floatingImage1Ref}
            className="absolute top-[10%] left-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-r-2xl will-change-transform"
            style={{ zIndex: 1 }}
          >
            {/* Image container 1 */}
          </div>

          <div
            ref={floatingImage3Ref}
            className="absolute top-[15%] left-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-r-2xl will-change-transform"
            style={{ zIndex: 2 }}
          >
            {/* Image container 3 */}
          </div>

          <div
            ref={floatingImage5Ref}
            className="absolute top-[20%] left-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-r-2xl will-change-transform"
            style={{ zIndex: 3 }}
          >
            {/* Image container 5 */}
          </div>

          <div
            ref={floatingImage7Ref}
            className="absolute top-[25%] left-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-r-2xl will-change-transform"
            style={{ zIndex: 4 }}
          >
            {/* Image container 7 */}
          </div>

          {/* Right side images - 4 images stacked in depth */}
          <div
            ref={floatingImage2Ref}
            className="absolute top-[10%] right-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-l-2xl will-change-transform"
            style={{ zIndex: 1 }}
          >
            {/* Image container 2 */}
          </div>

          <div
            ref={floatingImage4Ref}
            className="absolute top-[15%] right-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-l-2xl will-change-transform"
            style={{ zIndex: 2 }}
          >
            {/* Image container 4 */}
          </div>

          <div
            ref={floatingImage6Ref}
            className="absolute top-[20%] right-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-l-2xl will-change-transform"
            style={{ zIndex: 3 }}
          >
            {/* Image container 6 */}
          </div>

          <div
            ref={floatingImage8Ref}
            className="absolute top-[25%] right-0 w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[500px] bg-gray-400 rounded-l-2xl will-change-transform"
            style={{ zIndex: 4 }}
          >
            {/* Image container 8 */}
          </div>

          {/* Centered Text - Behind floating images */}
          <div className="text-center absolute left-0 right-0 flex items-center justify-center" style={{ zIndex: 0, top: '50vh', transform: 'translateY(-50%)' }}>
            <div>
              <h3 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white/80">
                Handcrafted
              </h3>
              <p className="text-2xl md:text-4xl font-light text-white/60 mt-4">
                with precision
              </p>
            </div>
          </div>
        </div>

        <div className="gallery-straps mt-8 space-y-4 relative z-10">
          {/* Top section - scrolls right */}
          <div className="overflow-hidden">
            <div ref={scrollRightRef} className="flex gap-4 will-change-transform">
              {/* First set of images */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`top-${i}`}
                  className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 bg-gray-300 rounded-lg"
                >
                  {/* Image will go here */}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section - scrolls left */}
          <div className="overflow-hidden flex justify-end">
            <div ref={scrollLeftRef} className="flex gap-4 will-change-transform">
              {/* First set of images */}
              {[...Array(8)].map((_, i) => (
                <div
                  key={`bottom-${i}`}
                  className="flex-shrink-0 w-64 h-64 md:w-80 md:h-80 bg-gray-300 rounded-lg"
                >
                  {/* Image will go here */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Circle Animation Container - Overlays gallery and reveals services */}
      <div className="fixed inset-0 pointer-events-none w-full overflow-hidden" style={{ zIndex: 100 }}>
        <div
          ref={circleRef}
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[#FFEFB5]"
          style={{ zIndex: 100 }}
        ></div>
      </div>

      {/* Services Section */}
      <section ref={servicesRef} className="relative w-full md:h-screen bg-[#FFEFB5] p-6 overflow-hidden">
        {/* Services Content */}
        <div ref={servicesContentRef} className="relative z-10 opacity-0">
          <div className="flex flex-row items-center gap-5">
            <div className="w-[16px] h-[16px] rounded-full bg-black z-10"></div>
            <p className="text-[16px] font-bold tracking-[4px] z-10">Services</p>
          </div>
          <div className="h-[20px]"></div>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <div className="md:w-[25%]">
              <div className="flex flex-row items-center ">
                <h2 className="text-[16px]">Custom Curtain</h2>
                <div className="w-[10px]"></div>
                <CgArrowTopRight />
              </div>
              <div className="h-[50vh] bg-gray-400"></div>
            </div>
            <div className="md:w-[25%]">
              <div className="flex flex-row items-center ">
                <h2 className="text-[16px]">Installation</h2>
                <div className="w-[10px]"></div>
                <CgArrowTopRight />
              </div>
              <div className="h-[40vh] bg-gray-400"></div>
            </div>
            <div className="md:w-[25%]">
              <div className="flex flex-row items-center ">
                <h2 className="text-[16px]">Consultation</h2>
                <div className="w-[10px]"></div>
                <CgArrowTopRight />
              </div>
              <div className="h-[50vh] bg-gray-400"></div>
            </div>
            <div className="md:w-[25%]">
              <div className="flex flex-row items-center ">
                <h2 className="text-[16px]">Maintenance</h2>
                <div className="w-[10px]"></div>
                <CgArrowTopRight />
              </div>
              <div className="h-[35vh] bg-gray-400"></div>
            </div>
          </div>
          <div className="h-[40px]"></div>
          <div>
            <h2 className="text-[16px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi eum enim suscipit fugit officiis, perspiciatis aut, ratione consequatur natus quibusdam expedita libero sapiente cum exercitationem harum explicabo cumque asperiores esse ipsa incidunt in voluptatibus! Autem magni inventore officia eos dolore reprehenderit nobis repellat a voluptate, quisquam id ea deserunt! Cupiditate!</h2>
          </div>
        </div>
      </section>

      {/* Why choose us section */}
      <section className="p-6 h-screen flex flex-col justify-evenly bg-[#BEB9A9]">
        <div className="flex flex-row items-center gap-5">
          <div className="w-[16px] h-[16px] rounded-full bg-black z-10"></div>
          <p className="text-[16px] font-bold tracking-[4px] z-10">Why Choose Us</p>
        </div>
        <div className="h-[20px]"></div>
        <div className="md:w-[80%]">
          <h2 className="text-[24px] font-bold tracking-[5px]">We design, measure, create and install. We transform homes and offices across Nairobi with custom curtains that blend style with function.</h2>
        </div>
        <div className="h-[20px]"></div>
        <div className="md:w-[80%] flex flex-col ml-auto">
          <p>We go beyond simply selling fabric. We listen to your vision, understand your space, and craft window treatments that elevate your environment. From the homeowner seeking privacy and elegance, to the business owner creating professional spaces—we bring expertise, quality craftsmanship, and attention to detail that turns your windows into statement pieces. Our clients don't just buy curtains, they invest in transformation.</p>
          <div className="h-[20px]"></div>
          <div className="flex flex-row gap-10">
            <div>
              <div className="flex flex-row items-center">
                <IoPeople size={24} />
                <div className="w-[10px]"></div>
                <p className="text-[20px] font-bold">40 +</p>
              </div>
              <p>Happy Clients</p>
            </div>
            <div>
              <div className="flex flex-row items-center">
                <MdLocationPin size={24} />
                <div className="w-[10px]"></div>
                <p className="text-[20px] font-bold">12 +</p>
              </div>
              <p>Locations Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="p-6 h-screen flex flex-col justify-center overflow-hidden">
        <div className="flex flex-row items-center gap-5">
          <div className="w-[16px] h-[16px] rounded-full bg-black z-10"></div>
          <p className="text-[16px] font-bold tracking-[4px] z-10">Testimonials</p>
        </div>
        <div className="h-[20px]"></div>
        <div className="md:w-[80%]">
          <h2 className="text-[24px] font-bold tracking-[5px]">What Our Clients Say</h2>
        </div>
        <div className="h-[40px]"></div>

        {/* Carousel Container */}
        <div className="relative w-full flex items-center justify-center py-8 overflow-hidden">
          <div
            ref={carouselContainerRef}
            className="flex items-center justify-center gap-6"
          >
            {/* Mobile: Show 1 card centered */}
            <div className="md:hidden">
              {testimonialIndices.slice(0, 1).map((testimonialIndex, idx) => {
                const testimonial = testimonials[testimonialIndex];
                return (
                  <div
                    key="mobile-card"
                    className="rounded-lg bg-gray-200 p-6 mx-auto overflow-hidden"
                    style={{
                      width: '90vw',
                      maxWidth: '350px',
                      minWidth: '280px'
                    }}
                  >
                    <div
                      ref={el => contentRefs.current[0] = el}
                      className="transition-opacity duration-500 cursor-grab active:cursor-grabbing touch-none select-none"
                    >
                      <div className="flex flex-row gap-4 items-center">
                        <div
                          className={`w-[34px] h-[34px] rounded-full ${testimonial.color} transition-all duration-500`}
                        ></div>
                        <p className="font-bold text-lg">
                          {testimonial.name}
                        </p>
                      </div>
                      <div className="h-[10px]"></div>
                      <p className="text-sm leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop: Show 4 cards - center card largest, edges progressively smaller */}
            {testimonialIndices.map((testimonialIndex, cardPosition) => {
              const testimonial = testimonials[testimonialIndex];
              // Center card (position 1) is largest, outer cards progressively smaller
              const scaleValue = cardPosition === 1 ? 'scale-110' :
                                 cardPosition === 2 ? 'scale-100' :
                                 cardPosition === 0 ? 'scale-90' : 'scale-80';
              const opacityValue = cardPosition === 1 ? 'opacity-100' :
                                   cardPosition === 2 ? 'opacity-90' :
                                   cardPosition === 0 ? 'opacity-70' : 'opacity-50';
              const widthValue = cardPosition === 1 ? '400px' :
                                 cardPosition === 2 ? '370px' :
                                 cardPosition === 0 ? '340px' : '310px';

              return (
                <div
                  key={`desktop-card-${cardPosition}`}
                  className={`hidden md:block rounded-lg bg-gray-200 p-6 flex-shrink-0 relative transition-all duration-500 ${scaleValue} ${opacityValue} overflow-hidden`}
                  style={{
                    width: widthValue,
                    minWidth: widthValue
                  }}
                >
                  <div
                    ref={el => contentRefs.current[cardPosition + 1] = el}
                    className="transition-opacity duration-500 cursor-grab active:cursor-grabbing touch-none select-none"
                  >
                    <div className="flex flex-row gap-4 items-center">
                      <div
                        className={`w-[34px] h-[34px] rounded-full ${testimonial.color} transition-all duration-500`}
                      ></div>
                      <p className="font-bold text-lg">
                        {testimonial.name}
                      </p>
                    </div>
                    <div className="h-[10px]"></div>
                    <p className="text-sm leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Drag instruction */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">Drag to browse testimonials</p>
        </div>


      </section>

      {/* Ad Section - Full to inset on scroll */}
      <section
        ref={adSectionRef}
        className="relative w-full h-screen bg-[#FFEFB5] overflow-hidden"
      >
        {/* Skip Ad Button */}
        <button
          ref={skipAdButtonRef}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 bg-[#FFEFB5] text-black px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
        >
          <span className="text-sm font-medium">Skip ad</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v6.62c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L5.055 7.061zM19.5 12.75a.75.75 0 00-.75-.75H16.5a.75.75 0 000 1.5h2.25a.75.75 0 00.75-.75zm-3-3a.75.75 0 00-.75-.75h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 00.75-.75zm0 6a.75.75 0 00-.75-.75h-1.5a.75.75 0 000 1.5h1.5a.75.75 0 00.75-.75z" />
          </svg>
        </button>

        {/* Ad Container - animates from full to inset */}
        <div
          ref={adContainerRef}
          className="absolute inset-0 bg-[#B85C38]"
        >
          {/* Ad content goes here */}
        </div>
      </section>

      {/* Contact Section */}
      <section className="p-6 py-12 bg-[#BEB9A9]">
        {/* Header */}
        <div className="flex flex-row items-center gap-5 mb-8">
          <div className="w-[16px] h-[16px] rounded-full bg-black"></div>
          <p className="text-[16px] font-bold tracking-[4px]">Get In Touch</p>
        </div>

        {/* Content - Two columns on desktop */}
        <div className="flex flex-col md:flex-row md:gap-16">
          {/* Left Column - Text and Social Icons */}
          <div className="flex flex-col justify-between md:w-[50%] mb-8 md:mb-0">
            <div></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Speak to us</h2>
              <p className="text-base mb-8">
                Tell us how we can upgrade your space into something elegant
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex flex-row gap-6">
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <FaTiktok size={30} />
              </a>
              <a href="#" className="text-black hover:opacity-70 transition-opacity">
                <FaWhatsapp size={30} />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:w-[50%]">
            <form className="flex flex-col gap-6">
              {/* First row - First name & Second name */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm mb-2">First name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-black/40 py-2 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-2">Second name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-black/40 py-2 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Second row - Email & Phone */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className="block text-sm mb-2">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-black/40 py-2 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-2">Phone number</label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-black/40 py-2 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Third row - Project Details */}
              <div>
                <label className="block text-sm mb-2">Project Details</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-black/40 py-2 focus:outline-none focus:border-black transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#FFEFB5] text-black px-6 py-3 rounded-md font-medium hover:bg-[#f5e5a5] transition-colors"
                >
                  <span className="tracking-wider text-sm">SEND INQUIRY</span>
                  <CgArrowTopRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
export default App