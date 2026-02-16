import React, { useState, useRef } from "react";
import HeroPhysics from "../canvas/HeroPhysics";
// 🌟 ここを section.css に書き換える！
import "section.css"; 

const Hero = () => {
  // 選択されたペダルのデータを保持する状態
  const [selectedPedal, setSelectedPedal] = useState(null);
  
  // 音声再生用の参照
  const audioRef = useRef(null);

  // HeroPhysicsでペダルがクリックされた時に呼ばれる関数
  const handlePedalSelect = (pedalData) => {
    // パネルの表示データを更新
    setSelectedPedal(pedalData);
    
    // サウンドの再生処理（既存の音が鳴っていたらリセットして再生）
    if (audioRef.current && pedalData.sound) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.src = pedalData.sound;
      // ブラウザの仕様による再生エラーを防ぐためのcatch処理
      audioRef.current.play().catch(e => console.log("音声再生エラー:", e));
    }
  };

  return (
    <section className="fv-section">
      {/* 左側の3Dキャンバスエリア */}
      <div className="fv-canvas-container" id="fv-canvas-container">
        {/* onSelectプロパティとして関数を渡す */}
        <HeroPhysics onSelect={handlePedalSelect} />
      </div>

      {/* 右側の情報パネルエリア */}
      {/* 選択されていれば is-active クラスを付与してアニメーションさせる */}
      <div className={`fv-info ${selectedPedal ? 'is-active' : ''}`}>
        {selectedPedal ? (
          <div className="fv-info__content">
            {/* カテゴリー（サブタイトル） */}
            <p className="fv-info__category">{selectedPedal.category}</p>
            
            {/* ペダル名（メインタイトル） */}
            <h1 className="fv-info__title">{selectedPedal.name}</h1>
            
            <div className="fv-info__actions">
              {/* 詳細ページへのリンク */}
              <a 
                href={selectedPedal.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary"
              >
                詳細を見る
              </a>
            </div>
            
            {/* 音声再生用の見えないHTML要素 */}
            <audio ref={audioRef} />
          </div>
        ) : (
          // 初期状態（何も選択されていない時）の表示
          <div className="fv-info__empty">
            <p>ペダルをクリックして<br/>サウンドをチェック</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;