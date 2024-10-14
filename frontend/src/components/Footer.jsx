/** @format */

import React from "react";
import "../style/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h3>MyLogo</h3>
        </div>
        <ul className="footer-links">
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#privacy">Privacy Policy</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 MyWebsite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
