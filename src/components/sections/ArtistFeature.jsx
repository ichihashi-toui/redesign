// src/components/sections/ArtistFeature.jsx
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import PedalModel from '../canvas/PedalModel';

gsap.registerPlugin(ScrollTrigger);

const ArtistFeature = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animElements = section.querySelectorAll(".gary-anim");
    gsap.fromTo(animElements, 
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
    <section className="section artist-feature bg-light" ref={sectionRef}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', minHeight: '80vh' }}>

        <div className="artist-info" style={{ width: '45%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingTop: '0', height: 'auto' }}>
          <p className="artist-role gary-anim" style={{ textAlign: 'left', fontWeight: 'bold', marginBottom: '5px' }}>signature model</p>
          <h2 className="artist-name gary-anim" style={{ textAlign: 'left', fontSize: '4rem', marginBottom: '10px' }}>GARY</h2>
          <p className="artist-role gary-anim" style={{ textAlign: 'left', fontWeight: 'bold' }}>オートマチックパルスモジュレーションファズ<br />オーバードライブ</p>
          <p className="artist-desc gary-anim" style={{ textAlign: 'left', marginTop: '30px' }}>
            アースクエイカーデバイセスが今回自信を持って紹介する新製品はGary（ゲイリー）。
            このゲイリーはイギリスのバンド、IDLES（アイドルス）のギターリスト、
            Lee Kiernanのシグネチャーペダルになります。
          </p>
          <div className="btn-wrapper gary-anim" style={{ textAlign: 'left', marginTop: '40px' }}>
            <a href="#" className="btn-round-outline">詳細ページへ</a>
          </div>
        </div>

        <div className="model-showcase">
          <div className="model-showcase__frame"></div>
          <div className="model-showcase__canvas canvas-anim">
            <PedalModel modelPath="/models/gary.glb" />
          </div>
          <div className="drag-guide">
            <div className="drag-guide__icon"></div>
            <span className="drag-guide__text">360°</span>
          </div>
        </div>
        
        <div className="artist-carousel-wrapper gary-anim" style={{ width: '100%', marginTop: '80px' }}>
          <Swiper 
            modules={[Pagination, FreeMode, Navigation]}
            slidesPerView={'auto'}
            spaceBetween={20}
            freeMode={true}
            pagination={{ clickable: true }}
            navigation={true}
            className="artist-carousel"
          >
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/nakao.webp" alt="中尾憲太郎" /></div>
              <p className="artist-card__role">Bassist</p>
              <h3 className="artist-card__name">中尾憲太郎</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/tabuchi.webp" alt="田淵ひさ子" /></div>
              <p className="artist-card__role">Guitarist</p>
              <h3 className="artist-card__name">田淵ひさ子</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/asai.webp" alt="浅井健一" /></div>
              <p className="artist-card__role">Guitarist</p>
              <h3 className="artist-card__name">浅井健一</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/goto.webp" alt="後藤正文" /></div>
              <p className="artist-card__role">Guitarist</p>
              <h3 className="artist-card__name">後藤正文</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/hinata.webp" alt="日向秀和" /></div>
              <p className="artist-card__role">Bassist</p>
              <h3 className="artist-card__name">日向秀和</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card">
              <div className="artist-card__img"><img src="/img/artists/sekine.webp" alt="関根史織" /></div>
              <p className="artist-card__role">Bassist</p>
              <h3 className="artist-card__name">関根史織</h3>
            </SwiperSlide>
            <SwiperSlide className="artist-card-more">
              <a href="#" className="btn-more-slide"><span className="more-text">MORE</span></a>
            </SwiperSlide>
          </Swiper>
        </div>

      </div>
    </section>
  );
};

export default ArtistFeature;