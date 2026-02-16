// src/components/sections/ProductPickup.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import PedalModel from '../canvas/PedalModel';

gsap.registerPlugin(ScrollTrigger);

const ProductPickup = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // テキスト群のフェードイン
    const texts = section.querySelectorAll(".plumes-text");
    gsap.fromTo(texts, 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    // 3Dモデル自体のフェードイン
    const canvas = section.querySelector(".canvas-anim");
    gsap.fromTo(canvas, 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section className="section product-pickup bg-light" ref={sectionRef}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '80px', minHeight: '80vh' }}>
        
        {/* 左側：3Dモデルとはみ出し枠のエリア */}
        <div className="model-showcase">
          <div className="model-showcase__frame"></div>
          {/* 追加：canvas-anim クラスをつけてGSAPで動かす */}
          <div className="model-showcase__canvas canvas-anim">
            <PedalModel modelPath="models/plumes.glb" />
          </div>
          <div className="drag-guide">
            <div className="drag-guide__icon"></div>
            <span className="drag-guide__text">360°</span>
          </div>
        </div>
        
        {/* 右側：製品情報エリア */}
        <div className="product-info" style={{ width: '45%' }}>
          <h2 className="title-handwritten plumes-text" style={{ fontSize: '4rem', marginBottom: '10px' }}>Plumes</h2>
          <p className="product-category plumes-text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>ギターオーバードライブ</p>
          <p className="product-desc plumes-text" style={{ textAlign: 'left', marginTop: '30px' }}>
            真空管をスクリームさせるペダルをEQDの解釈で再度見直し、
            3つのクリッピング回路を選べるユニークなオーバードライブ。
            とても高いヘッドルームさえも得られる立体感の有る歪み。
          </p>
          <div className="btn-wrapper plumes-text" style={{ textAlign: 'left', marginTop: '40px' }}>
            <a href="#" className="btn-round-outline">詳細ページへ</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPickup;