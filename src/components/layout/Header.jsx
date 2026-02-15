// src/components/layout/Header.jsx
import React from 'react';

// App.jsxから「メニューが開いているか」と「開閉する関数」を受け取ります
const Header = ({ isMenuOpen, toggleMenu }) => {
  return (
    <>
      {/* PCサイズの時に上部に表示されるヘッダー */}
      <header className="pc-header">
        <div className="pc-header__inner">
          <div className="pc-header__logo">
            <a href="#"><img src="/img/common/spmainlogo.svg" alt="EarthQuaker Devices" /></a>
          </div>
          
          <nav className="pc-header__nav">
            <ul className="pc-header__list">
              <li><a href="#" className="pc-menu-item-devices"><img src="/img/typography/devices.svg" alt="Devices" /></a></li>
              <li><a href="#" className="pc-menu-item-artists"><img src="/img/typography/artists.svg" alt="Artists" /></a></li>
              <li><a href="#" className="pc-menu-item-demo"><img src="/img/typography/demo.svg" alt="Demo" /></a></li>
              <li><a href="#" className="pc-menu-item-brand"><img src="/img/typography/brand.svg" alt="Brand" /></a></li>
              <li><a href="#" className="pc-menu-item-support"><img src="/img/typography/support.svg" alt="Support" /></a></li>
              <li><a href="#" className="pc-menu-item-dealers"><img src="/img/typography/dealers.svg" alt="Dealers" /></a></li>
            </ul>
          </nav>

          <div className="pc-header__search">
            <button type="submit"><img src="/img/common/search.png" alt="検索" /></button>
            <input type="text" placeholder="キーワード検索" />
          </div>
          <a href="https://www.earthquakerdevices.jp/" target="_blank" rel="noopener noreferrer" className="btn-official-pc">元サイト</a>
        </div>
      </header>

      {/* スマホサイズの時に下部に固定されるヘッダー */}
      <header className="header">
        <div className="header__current-section">
          <img src="/img/typography/devices.svg" alt="Devices" />
        </div>
        
        {/* ボタンをクリックした時に toggleMenu を実行します */}
        <button 
          className={`header__menu-btn ${isMenuOpen ? 'is-active' : ''}`} 
          onClick={toggleMenu}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </header>
    </>
  );
};

export default Header;