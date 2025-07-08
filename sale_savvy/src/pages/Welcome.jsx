import React from 'react';
import SignUp from './SignUp';
import '../style/Welcome.css';
import welcomeImage from '/welcome2.jpg';

const Welcome = () => {
  return (
    <div className="welcome-container">
      {/* Full-width image banner */}
      <div className="banner-section">
        <img 
          src={welcomeImage} 
          alt="SHO ONLINE Banner" 
          className="banner-image"
        />
        <div className="banner-overlay">
          <h1>SHO ONLINE</h1>
          <p>Your premium shopping destination</p>
          <div className="sale-badge">SALE</div>
          <div className="partner">Google</div>
        </div>
      </div>

      {/* Content area with signup form */}
      <div className="content-section">
        {/* Left side (empty or for other content) */}
        <div className="content-left"></div>
        
        {/* Right side with signup form */}
        <div className="content-right">
          <div className="signup-wrapper">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;