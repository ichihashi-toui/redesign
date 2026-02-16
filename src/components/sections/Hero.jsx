// src/components/sections/Hero.jsx
import React, { useState, useRef } from 'react';
import HeroPhysics from '../canvas/HeroPhysics';

const Hero = () => {
  const [selectedPedal, setSelectedPedal] = useState(null);
  const audioRef = useRef(null);

  const handlePlaySound = () => {
    if (selectedPedal && selectedPedal.sound) {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(selectedPedal.sound);
      audioRef.current.play();
    }
  };

  return (
    <section className="fv-container">
      <div id="fv-canvas-container">
        {/* ボールをタップすると selectedPedal にデータが入ります */}
        <HeroPhysics onSelect={setSelectedPedal} />
      </div>
      
      <div className="fv-info">
        {!selectedPedal ? (
          <div className="fv-info__default is-active">
            <p className="fv-info__msg">TAP A PEDAL</p>
            <p className="fv-info__sub">気になるペダルをタップして<br />サウンドをチェック</p>
          </div>
        ) : (
          /* ボールをタップした時だけ表示されるパネル */
          <div className="fv-info__content is-active">
            <h2 className="fv-info__name">{selectedPedal.name}</h2>
            <p className="fv-info__cat">{selectedPedal.category}</p>
            <div className="fv-info__actions">
              <button className="btn-circle" onClick={handlePlaySound}>▶</button>
              <a href={selectedPedal.link} className="btn btn--sm">VIEW DETAILS</a>
            </div>
            <button 
              onClick={() => setSelectedPedal(null)}
              style={{marginTop: '20px', fontSize: '10px', opacity: 0.5, border: 'none', background: 'none', cursor: 'pointer'}}
            >
              × CLOSE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;