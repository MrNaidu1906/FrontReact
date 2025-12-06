import React from "react";
import "./menu.css";

function Contact() {
  return (
    <div className="contact-wrapper">

      {/* ------------------------------------------------------- */}
      {/* Hero Section */}
      {/* ------------------------------------------------------- */}
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>We’re here to help! Feel free to reach out anytime.</p>
      </section>

      {/* ------------------------------------------------------- */}
      {/* Main Content */}
      {/* ------------------------------------------------------- */}
      <section className="contact-section">

        {/* Contact Form */}
        <div className="contact-form-card glass">
          <h2>Send us a Message</h2>

          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" required />
            <textarea rows="6" placeholder="Your Message" required></textarea>

            <button type="submit" className="send-btn">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <div className="info-card">
            <h3>📍 Address</h3>
            <p>Maheswari Spice Restaurant, Main Road, Hyderabad</p>
          </div>

          <div className="info-card">
            <h3>📞 Phone</h3>
            <p>+91 98765 43210</p>
          </div>

          <div className="info-card">
            <h3>📧 Email</h3>
            <p>support@maheswarispice.com</p>
          </div>

          <div className="info-card">
            <h3>⏱ Working Hours</h3>
            <p>Mon – Sun: 10:00 AM – 11:00 PM</p>
          </div>
        </div>

      </section>

      {/* ------------------------------------------------------- */}
      {/* Footer */}
      {/* ------------------------------------------------------- */}
      <footer className="contact-footer">
        © {new Date().getFullYear()} Maheswari Spice Restaurant — All Rights Reserved.
      </footer>

    </div>
  );
}

export default Contact;
