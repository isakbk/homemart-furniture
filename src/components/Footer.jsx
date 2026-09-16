import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo footer-logo">
              <span className="logo-icon">⌂</span>
              <span>
                Home<span>Mart</span>
                <small>FURNITURE & DECOR</small>
              </span>
            </Link>
            <p>
              Transform your living space with our curated collection of modern
              furniture and home decor.
            </p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">Shop</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h4>Categories</h4>
            <Link to="/products?category=living-room">Living Room</Link>
            <Link to="/products?category=bedroom">Bedroom</Link>
            <Link to="/products?category=dining">Dining</Link>
            <Link to="/products?category=office">Office & Decor</Link>
          </div>

          <div>
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <a href="mailto:info@homemart.com">
                <Mail size={16} />
                info@homemart.com
              </a>
              <a href="tel:+1234567890">
                <Phone size={16} />
                +1 (234) 567-890
              </a>
              <div className="footer-contact">
                <MapPin size={16} />
                <span>123 Furniture Street, Design City, DC 12345</span>
              </div>
            </div>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                FB
              </a>
              <a href="#" aria-label="Instagram">
                IG
              </a>
              <a href="#" aria-label="Twitter">
                TW
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} HomeMart. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
