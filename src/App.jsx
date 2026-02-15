// src/App.jsx
import React, { useState } from 'react';
import Header from './components/layout/Header';
// 作成したGlobalMenuを読み込む
import GlobalMenu from './components/layout/GlobalMenu';
import Hero from './components/sections/Hero';
import ProductPickup from './components/sections/ProductPickup';
import ArtistFeature from './components/sections/ArtistFeature';
import CrackTransition from './components/sections/CrackTransition';
import BrandPhilosophy from './components/sections/BrandPhilosophy';
import Onomato from './components/sections/Onomato';
import Footer from './components/layout/Footer';

function App() {
  // メニューの開閉状態を管理するState（初期値はfalse＝閉じている）
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ボタンを押した時に開閉状態を切り替える関数
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      {/* HeaderとGlobalMenuに状態と関数を渡します */}
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <GlobalMenu isActive={isMenuOpen} />
      
      <main>
        <Hero />
        <ProductPickup />
        <ArtistFeature />
        <CrackTransition />
        <BrandPhilosophy />
        <Onomato />
      </main>
      <Footer />
    </div>
  );
}

export default App;