// src/components/sections/BrandPhilosophy.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const BrandPhilosophy = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const fadeText = section.querySelector('.js-fade');
    if (fadeText) {
      gsap.fromTo(fadeText, 
        { opacity: 0, y: 30 }, 
        {
          opacity: 1, 
          y: 0, 
          duration: 1,
          ease: "power2.out", 
          scrollTrigger: {
            trigger: fadeText,
            start: "top 85%",
            toggleActions: "play none none reverse" 
          }
        }
      );
    }

    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.utils.toArray('.float-anim').forEach((el) => {
        gsap.to(el, {
          x: "random(-40, 40)", 
          duration: "random(1.0, 2.0)", 
          ease: "power1.inOut", 
          repeat: -1,
          yoyo: true,
          repeatRefresh: true 
        });

        gsap.to(el, {
          y: "random(-40, 40)",
          duration: "random(1.0, 2.0)",
          ease: "power1.inOut",
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          delay: "random(0, 0.5)" 
        });
      });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray('.brand-img-item').forEach((el) => {
        gsap.set(el, { clearProps: "all" });
        gsap.fromTo(el, 
          { opacity: 0, y: 30 }, 
          {
            opacity: 1, 
            y: 0, 
            duration: 1,
            ease: "power2.out", 
            scrollTrigger: {
              trigger: el,
              start: "top 85%", 
              toggleActions: "play none none reverse" 
            }
          }
        );
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section className="section brand-philosophy bg-dark" data-header-svg="brand.svg" ref={sectionRef}>
      <div className="container">
        <div className="brand-text js-fade">
          <p>
            始まりは2004年、創業者ジェイミー・スティルマンのパンクなDIY精神からでした。
            現在もEQDは、品質管理とインスピレーションを最優先し、
            オハイオ州アクロンにてすべての工程を社員の手作業で丁寧に行っています。
          </p>
          <div className="btn-wrapper">
  <a href="#" className="btn-round-outline btn-light">詳細ページへ</a>
</div>
        </div>

        <div className="brand-visual">
          <div className="brand-gallery">
            <div className="brand-img-item item-01 float-anim">
              <img src="img/common/blandsp.png" alt="Work space" />
            </div>
            <div className="brand-img-item item-02 float-anim">
              <img src="img/common/brand02.jpg" alt="Silos" />
            </div>
            <div className="brand-img-item item-03 float-anim">
              <img src="img/common/brand03.jpg" alt="Jamie Stillman" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPhilosophy;