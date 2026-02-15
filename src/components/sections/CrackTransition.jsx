// src/components/sections/CrackTransition.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const CrackTransition = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const context = canvas.getContext("2d");
    const frameCount = 40;
    const folderName = "crack";
    const images = [];
    const seq = { frame: 0 };

    const currentFrame = index => {
      const number = (index + 1).toString().padStart(4, '0');
      return `/img/sequence/${folderName}/${number}.webp`;
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    function render() {
      const img = images[Math.round(seq.frame)];
      if (img && img.complete && img.naturalWidth !== 0) {
        if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0);
      }
    }
    images[0].onload = render;

    gsap.to(seq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "center center",
        end: "+=1500",
        pin: true,
        scrub: 0.5,
      },
      onUpdate: render
    });

  }, { scope: sectionRef });

  return (
    <section className="section crack-transition" style={{ backgroundColor: '#1a1a1a' }} ref={sectionRef}>
      <canvas id="sequence-crack" ref={canvasRef}></canvas>
    </section>
  );
};

export default CrackTransition;