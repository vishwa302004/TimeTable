import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faYoutube, faPinterest, faGooglePlay, faApple } from '@fortawesome/free-brands-svg-icons';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import './AdminFooter.css'; // Make sure to style the footer properly

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-sections">
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/press">Press</a></li>
            <li><a href="/download-brochure">Download Brochure</a></li>
            <li><a href="/online-presentation">Online Presentation</a></li>
            <li><a href="/referral-program">Referral Program</a></li>
            <li><a href="/contact-us">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li><a href="/schedule-management">Schedule Management</a></li>
            <li><a href="/report-cards">Report Cards</a></li>
            <li><a href="/transcripts">Transcripts</a></li>
            <li><a href="/parent-portal">Parent Portal</a></li>
            <li><a href="/student-information">Student Information</a></li>
            <li><a href="/teacher-management">Teacher Management</a></li>
            <li><a href="/gradebook">Gradebook</a></li>
            <li><a href="/messaging">Messaging</a></li>
            <li><a href="/admission-system">Admission System</a></li>
            <li><a href="/fee-tracking">Fee Tracking</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Stories</h4>
          <ul>
            <li>Stamford Elementary, VT</li>
            <li>Finger Lakes Christian, NY</li>
            <li>St Matthew's Parish, CA</li>
            <li>On Track, CA</li>
            <li>La Paz Community, Costa Rica</li>
            <li>Origins Elementary, Pakistan</li>
            <li>St. Monica Catholic, TX</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Segments</h4>
          <ul>
            <li><a href="/adult-education">Adult Education</a></li>
            <li><a href="/language-school">Language School</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-app-links">
          <a href="https://apps.apple.com" className="app-link">
            <FontAwesomeIcon icon={faApple} />
            <span>App Store</span>
          </a>
          <a href="https://play.google.com" className="app-link">
            <FontAwesomeIcon icon={faGooglePlay} />
            <span>Google Play</span>
          </a>
        </div>
        <div className="footer-social-links">
          <a href="https://facebook.com" className="social-link facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com" className="social-link twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://linkedin.com" className="social-link linkedin">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://youtube.com" className="social-link youtube">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href="https://pinterest.com" className="social-link pinterest">
            <FontAwesomeIcon icon={faPinterest} />
          </a>
          <a href="/rss-feed" className="social-link rss">
            <FontAwesomeIcon icon={faRss} />
          </a>
        </div>
      </div>
      <div className="footer-legal">
        <p>All rights reserved. © Automatic Time Table, Inc.</p>
        <ul>
          <li><a href="/cookie-policy">Cookie Policy</a></li>
          <li><a href="/privacy-policy">Privacy Policy</a></li>
          <li><a href="/data-privacy-framework">Data Privacy Framework</a></li>
          <li><a href="/disclaimer">Disclaimer</a></li>
          <li><a href="/terms-of-service">Terms of Service</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
