import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
 
  const [swaggerPage, setSwaggerPage] = useState(false);
  const [homePage, setHomePage] = useState(false);
  const [aboutPage, setAboutPage] = useState(false);
  
  const navigateToAbout = () => {
    setAboutPage(true);
    
  };

  const navigateToHome = () => {
    setHomePage(true);
    
  };
  if (aboutPage) {
    return <Navigate to="/About"/>; }

  if (homePage) {
    return <Navigate to="/"/>; }

  return (
    <div>
      <div className="header">
        <div className="left" >persprojchat</div>
        <div className='wrap'>
        <a className="right" href='https://backend.persprojchat.space/api-docs'>
          Swagger UI
        </a>
        <div className="right" onClick={navigateToAbout}>
          About
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
