// src/components/layout/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" data-header-svg="logo.svg">
      <div className="container">
        
        <div className="footer-top-logo">
          <img src="img/common/spmainlogo.svg" alt="EarthQuaker Devices" />
        </div>

        <nav className="footer-nav-grid">
          <a href="#" className="footer-link item-devices"><img src="img/typography/devices.svg" alt="Devices" /></a>
          <a href="#" className="footer-link item-artists"><img src="img/typography/artists.svg" alt="Artists" /></a>
          <a href="#" className="footer-link item-brand"><img src="img/typography/brand.svg" alt="Brand" /></a>     
          <a href="#" className="footer-link item-demo"><img src="img/typography/demo.svg" alt="Demo" /></a>
          <a href="#" className="footer-link item-support"><img src="img/typography/support.svg" alt="Support" /></a>
          <a href="#" className="footer-link item-dealers"><img src="img/typography/dealers.svg" alt="Dealers" /></a>
        </nav>
        
        <div className="footer-bottom-info">
          <p className="distributor-text">
            総輸入販売店<br />
            株式会社ヤマハミュージックジャパン
          </p>
          
          <div className="footer-social-row">
            <a href="#"><img src="img/common/youtube.icon.svg" alt="YouTube" /></a>
            <a href="#"><img src="img/common/instagram.icon.svg" alt="Instagram" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;