// src/components/sections/Hero.jsx
import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

// 元のscript.jsにあったペダルのデータリストです
const pedalDataList = [
    { id: 'fv01', name: 'Acapulco Gold', category: 'パワーアンプディストーション', sound: '/audio/fv01.mp3', link: 'https://www.earthquakerdevices.jp/acapulco-gold', texture: '/img/fv-parts/fv01.png' },
    { id: 'fv02', name: 'Afterneath', category: 'ショートディレイリバーブ', sound: '/audio/fv02.mp3', link: 'https://www.earthquakerdevices.jp/afterneath', texture: '/img/fv-parts/fv02.png' },
    { id: 'fv03', name: 'Aqueduct', category: 'ビブラート', sound: '/audio/fv03.mp3', link: 'https://www.earthquakerdevices.jp/aqueduct', texture: '/img/fv-parts/fv03.png' },
    { id: 'fv07', name: 'Blumes', category: 'ベースオーバードライブ', sound: '/audio/fv07.mp3', link: 'https://www.earthquakerdevices.jp/blumes', texture: '/img/fv-parts/fv07.png' },
    { id: 'fv18', name: 'Plumes', category: 'オーバードライブ', sound: '/audio/fv18.mp3', link: 'https://www.earthquakerdevices.jp/plumes', texture: '/img/fv-parts/fv18.png' },
    // ※動作確認のためいくつかピックアップしています。必要に応じて元のリストから追加してください。
];

const Hero = () => {
  const containerRef = useRef(null);
  
  // 選択されたペダルの情報と、音楽が再生中かどうかを「状態」として管理します
  const [activePedal, setActivePedal] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Query, Body } = Matter;

    const engine = Engine.create();
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const render = Render.create({
      element: containerRef.current,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: 'transparent',
        wireframes: false
      }
    });

    // 壁と床
    const ground = Bodies.rectangle(width / 2, height + 60, 20000, 120, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(-60, height / 2, 120, height * 2, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + 60, height / 2, 120, height * 2, { isStatic: true, render: { visible: false } });
    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // ペダルを降らせる処理
    const scale = window.innerWidth < 768 ? 0.8 : (window.innerWidth < 1024 ? 1.2 : 1.6);
    
    pedalDataList.forEach((pedal, index) => {
      const x = width * 0.1 + Math.random() * (width * 0.8);
      const y = -100 - (index * 150) - (Math.random() * 100);
      const radius = 40 * scale;

      const body = Bodies.circle(x, y, radius, { 
        restitution: 0.6, 
        friction: 0.1,
        plugin: { pedalData: pedal },
        render: {
          sprite: { texture: pedal.texture, xScale: scale, yScale: scale }
        }
      });
      Composite.add(engine.world, body);
    });

    // マウス操作の追加
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } }
    });
    Composite.add(engine.world, mouseConstraint);

    // クリックした時の処理
    Events.on(mouseConstraint, 'mousedown', function(event) {
      const mousePosition = event.mouse.position;
      const bodies = Composite.allBodies(engine.world);
      const clickedBodies = Query.point(bodies, mousePosition);

      if (clickedBodies.length > 0) {
        const body = clickedBodies[0];
        if (body.plugin && body.plugin.pedalData) {
          // クリックされたペダルのデータをReactのStateにセットします
          setActivePedal(body.plugin.pedalData);
          setIsPlaying(false); // ペダルが変わったら一旦再生を止める
        }
      }
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // クリーンアップ処理
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // 再生ボタンを押した時の処理
  const togglePlay = () => {
    if (!activePedal || !activePedal.sound) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (!audioRef.current || audioRef.current.src !== new URL(activePedal.sound, window.location.href).href) {
        audioRef.current = new Audio(activePedal.sound);
        audioRef.current.onended = () => setIsPlaying(false);
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="fv-container">
      <div className="main-logo-container">
        <h1 className="main-logo">
          <img src="/img/common/spmainlogo.svg" alt="EarthQuaker Devices" />
        </h1>
      </div>
      
      <div id="fv-canvas-container" ref={containerRef}>
        <div className="fv__overlay"></div>
      </div>

      <div id="fv-info-panel" className="fv-info">
        {/* ペダルが選択されていない時はデフォルトメッセージを表示 */}
        {!activePedal ? (
          <div className="fv-info__default is-active">
            <p className="fv-info__msg">TAP A PEDAL</p>
            <p className="fv-info__sub">気になるペダルをタップして<br />サウンドをチェック</p>
          </div>
        ) : (
          /* ペダルが選択されたら情報を表示 */
          <div className="fv-info__content is-active">
            <h2 className="fv-info__name">{activePedal.name}</h2>
            <p className="fv-info__cat">{activePedal.category}</p>
            
            <div className="fv-info__actions">
              <button onClick={togglePlay} className="btn-circle">
                {isPlaying ? <span className="icon-stop">■</span> : <span className="icon-play">▶</span>}
              </button>
              
              <a href={activePedal.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                詳細ページへ
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;