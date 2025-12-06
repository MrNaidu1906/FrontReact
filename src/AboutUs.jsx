import React from "react";
import "./menu.css"; // Import external CSS

function AboutUs() {
  return (
    <div className="about-container">
      {/* Header */}
      <h1 className="about-title">About Us</h1>

      <p className="about-description">
        Welcome to <strong>Your Company</strong>. We specialize in building modern,
        high-quality digital products that power business growth. Our focus is on
        delivering reliable, scalable, and user-centric solutions.
      </p>

      {/* Mission */}
      <section className="about-section">
        <h2 className="section-heading">Our Mission</h2>
        <p className="section-text">
          To empower businesses with cutting-edge technology and world-class software
          solutions that create measurable impact.
        </p>
      </section>

      {/* Vision */}
      <section className="about-section">
        <h2 className="section-heading">Our Vision</h2>
        <p className="section-text">
          To be a global technology leader trusted for delivering innovative solutions
          and outstanding user experiences.
        </p>
      </section>

      {/* Team */}
      <section className="about-section">
        <h2 className="section-heading">Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <img
              src="https://i.pravatar.cc/150?img=32"
              alt="Priya Sharma"
              className="team-avatar"
            />
            <h3 className="team-name">Priya Sharma</h3>
            <p className="team-role">CEO</p>
          </div>

          <div className="team-card">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Rohit Kumar"
              className="team-avatar"
            />
            <h3 className="team-name">Rohit Kumar</h3>
            <p className="team-role">CTO</p>
          </div>

          <div className="team-card">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Anita Desai"
              className="team-avatar"
            />
            <h3 className="team-name">Anita Desai</h3>
            <p className="team-role">Product Lead</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-text">
        © {new Date().getFullYear()} Your Company — All Rights Reserved.
      </footer>
    </div>
  );
}

export default AboutUs;
