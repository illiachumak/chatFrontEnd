import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
 
 
  const [homePage, setHomePage] = useState(false);
  const [aboutPage, setAboutPage] = useState(false);
  
 

  const navigateToHome = () => {
    setHomePage(true);
    
  };
 

  if (homePage) {
    return <Navigate to="/"/>; }

  return (
    <div>
      <div className="header">
        <div className="left" onClick={navigateToHome}>persprojchat</div>
        <div className='wrap'>
        <a className="right" href='https://backend.persprojchat.space/api-docs'>
          Swagger UI
        </a>
        <div className="right">
          About
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
