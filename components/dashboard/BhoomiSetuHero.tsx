'use client';

import React from 'react';

export const BhoomiSetuHero: React.FC = () => (
  <section className="bs-hero">
    <div className="bs-hero-copy">
      <h1>One Parcel. <span>Many Responsibilities.</span></h1>
      <p>Integrated GIS-based Digital Public Infrastructure for Land Governance.</p>
      <div className="bs-hero-pills">
        <span>◉ Unified Data</span>
        <span>◉ Interoperable Systems</span>
        <span>◉ Transparent Governance</span>
        <span>◉ Citizen Centric Services</span>
      </div>
    </div>
    <div className="bs-hero-right">
      <b>Digital Land Infrastructure</b>
      <span>Transparent Governance</span>
      <span>Empowered Citizens</span>
      <div className="india-badge">भारत</div>
      <div className="hero-stats"><b>28</b><span>States</span><b>8</b><span>UTs</span><b>1</b><span>Nation</span></div>
    </div>
  </section>
);
