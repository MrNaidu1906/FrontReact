import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      {/* ========================================================= */}
      {/* 1. Background Video */}
      {/* ========================================================= */}
      <video className="bg-video" autoPlay loop muted>
        <source
          src="https://cdn.pixabay.com/video/2017/08/29/11625-231571945_large.mp4"
          type="video/mp4"
        />
      </video>

      {/* ========================================================= */}
      {/* 2. Home Content Section */}
      {/* ========================================================= */}
      <section className="home-content">
        <h1>Welcome to Our Rayalaseema Ruchulu</h1>
        <p>Flavors That Speak the Language of Rayalaseema.</p>
        <p>
          Building high-quality, modern, and scalable applications that help businesses
          grow faster and smarter.
        </p>

        {/* ========================================================= */}
        {/* 3. Feature Boxes */}
        {/* ========================================================= */}
        <div className="home-boxes">

          <div className="home-box">
            <h2>🚀 Fast Performance</h2>
            <p>Optimized applications engineered for speed.</p>
          </div>

          <div className="home-box">
            <h2>💼 Professional Service</h2>
            <p>Quality development with industry-standard practices.</p>
          </div>

          <div className="home-box">
            <h2>🔒 Secure Solutions</h2>
            <p>Top-level security integrated in every project.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Home;
