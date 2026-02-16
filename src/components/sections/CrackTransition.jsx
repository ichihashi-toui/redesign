// src/components/sections/CrackTransition.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CrackTransition = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", 
        end: "+=150%", 
        pin: true, 
        scrub: 1, 
      }
    });

    tl.to(contentRef.current, {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "none"
    })
    .to(leftRef.current, { 
      xPercent: -100, 
      ease: "power2.inOut",
      duration: 1
    }, "+=0.1")
    .to(rightRef.current, { 
      xPercent: 100, 
      ease: "power2.inOut",
      duration: 1
    }, "<"); 
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="crack-transition-new" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
      
      <div ref={contentRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        
        <div ref={leftRef} style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', backgroundColor: '#f2f2f2', zIndex: 10 }}>
          <svg preserveAspectRatio="none" viewBox="0 0 50 1000" style={{ position: 'absolute', right: '-49px', top: 0, height: '100%', width: '50px', fill: '#f2f2f2' }}>
            <polygon points="0,0 50,50 10,150 40,250 5,350 45,450 15,550 50,650 10,750 40,850 5,950 0,1000" />
          </svg>
        </div>

        <div ref={rightRef} style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundColor: '#f2f2f2', zIndex: 10 }}>
          <svg preserveAspectRatio="none" viewBox="0 0 50 1000" style={{ position: 'absolute', left: '-49px', top: 0, height: '100%', width: '50px', fill: '#f2f2f2', transform: 'scaleX(-1)' }}>
            <polygon points="0,0 50,50 10,150 40,250 5,350 45,450 15,550 50,650 10,750 40,850 5,950 0,1000" />
          </svg>
        </div>

        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <span style={{ color: '#fff', fontSize: '24px', opacity: 0.5 }}>EarthQuaker Devices</span>
        </div>

      </div>
    </section>
  );
};

export default CrackTransition;