// src/components/sections/Onomato.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Onomato = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const fadeText = sectionRef.current.querySelector('.js-fade');
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
  }, { scope: sectionRef });

  return (
    <section className="section onomato bg-dark" data-header-svg="brand.svg" ref={sectionRef}>
      <div className="container">
        <div className="onomato__logo">
          <img src="/img/typography/onomatoPedal-Logo_Light.svg" alt="おのとまぺだる" />
        </div>
        <div className="onomato__grid">
          <a href="https://onomatopedal.com" target="_blank" rel="noopener noreferrer" className="onomato-item item-bukabuka">
            <img src="/img/onomatopedal/buka-buka.gif" alt="ぶかぶか" />
          </a>
          <a href="https://onomatopedal.com" target="_blank" rel="noopener noreferrer" className="onomato-item item-pikapika">
            <img src="/img/onomatopedal/pikapika.gif" alt="ぴかぴか" />
          </a>
          <a href="https://onomatopedal.com" target="_blank" rel="noopener noreferrer" className="onomato-item item-gwongwon">
            <img src="/img/onomatopedal/gwon-gwon.gif" alt="ぐわんぐわん" />
          </a>
          <a href="https://onomatopedal.com" target="_blank" rel="noopener noreferrer" className="onomato-item item-ujauja">
            <img src="/img/onomatopedal/ujauja.gif" alt="うじゃうじゃ" />
          </a>
        </div>
        
        <p className="onomato-desc js-fade">
          エフェクターが生み出す多彩なサウンドを、
          日本語特有のオノマトペ（擬音語・擬態語）に変換し、
          タイポグラフィとして可視化している。
          ユーザーはペダルを踏む動作と連動したアニメーションを通じて、
          聴覚と視覚の両面からEQDの独創的な世界観を体験できる。
        </p>
      </div>
    </section>
  );
};

export default Onomato;