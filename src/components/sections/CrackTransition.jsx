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
    // タイムラインの作成（ここでスクロール時の動きを定義します）
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top", // このセクションが画面の一番上に到達したら開始
        end: "+=150%", // 1.5画面分スクロールする間、アニメーションを実行
        pin: true, // ▼超重要！画面をここで固定（ピン留め）し、無駄な余白スクロールを無くします
        scrub: 1, // スクロールに合わせて滑らかに動かす
      }
    });

    // 1. 地震の演出：画面全体が激しく揺れる
    tl.to(contentRef.current, {
      x: () => Math.random() * 10 - 5,
      y: () => Math.random() * 10 - 5,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "none"
    })
    // 2. 地割れの演出：グレーの画面が左右に引き裂かれる
    .to(leftRef.current, { 
      xPercent: -100, 
      ease: "power2.inOut",
      duration: 1
    }, "+=0.1")
    .to(rightRef.current, { 
      xPercent: 100, 
      ease: "power2.inOut",
      duration: 1
    }, "<"); // "<" は左側のアニメーションと同時に動かすという合図です

  }, { scope: sectionRef });

  return (
    // セクション全体の背景を、次のセクションと同じ暗闇色（#111111）にしておきます
    <section ref={sectionRef} className="crack-transition-new" style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#1a1a1a' }}>
      
      <div ref={contentRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        
        {/* 左半分に割れる地面 */}
        <div ref={leftRef} style={{ position: 'absolute', top: 0, left: 0, width: '50%', height: '100%', backgroundColor: '#f2f2f2', zIndex: 10 }}>
          {/* 割れ目のギザギザ（SVG） */}
          <svg preserveAspectRatio="none" viewBox="0 0 50 1000" style={{ position: 'absolute', right: '-49px', top: 0, height: '100%', width: '50px', fill: '#f2f2f2' }}>
            <polygon points="0,0 50,50 10,150 40,250 5,350 45,450 15,550 50,650 10,750 40,850 5,950 0,1000" />
          </svg>
        </div>

        {/* 右半分に割れる地面 */}
        <div ref={rightRef} style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', backgroundColor: '#f2f2f2', zIndex: 10 }}>
          {/* 割れ目のギザギザ（SVGを反転） */}
          <svg preserveAspectRatio="none" viewBox="0 0 50 1000" style={{ position: 'absolute', left: '-49px', top: 0, height: '100%', width: '50px', fill: '#f2f2f2', transform: 'scaleX(-1)' }}>
            <polygon points="0,0 50,50 10,150 40,250 5,350 45,450 15,550 50,650 10,750 40,850 5,950 0,1000" />
          </svg>
        </div>

        {/* 奥に見える暗闇（オプションでロゴやテキストを配置してもカッコいいです） */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
          <span style={{ color: '#fff', fontSize: '24px', opacity: 0.5 }}>EarthQuaker Devices</span>
        </div>

      </div>
    </section>
  );
};

export default CrackTransition;