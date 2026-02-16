// src/components/layout/GlobalMenu.jsx
import React, { useEffect } from 'react';

const GlobalMenu = ({ isActive }) => {
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  return (
    <nav className={`global-menu ${isActive ? 'is-active' : ''}`} id="global-menu">
      <div className="global-menu__inner">
        <div className="global-menu__logo">
          <img src="img/common/spmainlogo.svg" alt="EarthQuaker Devices" />
        </div>

        <div className="global-menu__search">
          <img src="img/common/search.png" alt="検索" className="search-icon" />
          <input type="text" placeholder="キーワード検索" />
        </div>

        <ul className="global-menu__list">
          <li><a href="#" className="menu-item-devices"><img src="img/typography/devices.svg" alt="Devices" /></a></li>
          <li><a href="#" className="menu-item-artists"><img src="img/typography/artists.svg" alt="Artists" /></a></li>
          <li><a href="#" className="menu-item-demo"><img src="img/typography/demo.svg" alt="Demo" /></a></li> 
          <li><a href="#" className="menu-item-brand"><img src="img/typography/brand.svg" alt="Brand" /></a></li>
          <li><a href="#" className="menu-item-support"><img src="img/typography/support.svg" alt="Support" /></a></li>
          <li><a href="#" className="menu-item-dealers"><img src="img/typography/dealers.svg" alt="Dealers" /></a></li>
        </ul>
        
        <div className="global-menu__social-fixed">
          <a href="#"><img src="img/common/youtube.icon.svg" alt="YouTube" /></a>
          <a href="#"><img src="img/common/instagram.icon.svg" alt="Instagram" /></a>
        </div>
        <a href="https://www.earthquakerdevices.jp/" target="_blank" rel="noopener noreferrer" className="btn-official-sp">元サイト</a>
      </div>
    </nav>
  );
};

export default GlobalMenu;