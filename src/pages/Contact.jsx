import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    e.target.reset();
  };

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">WE'D LOVE TO HEAR FROM YOU</span>
          <h1>Contact Us</h1>
          <p>Questions, ideas, or just want to say hello?</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-info">
            <span className="eyebrow">GET IN TOUCH</span>
            <h2>Let's talk about your home.</h2>
            <p>
              Our team is here to help you discover the right furniture and
              decor for your space.
            </p>

            <div className="contact-detail">
              <MapPin size={23} />
              <div>
                <strong>Visit Us</strong>
                <p>Dehradun, Uttarakhand, India</p>
              </div>
            </div>

            <div className="contact-detail">
              <Phone size={23} />
              <div>
                <strong>Call Us</strong>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-detail">
              <Mail size={23} />
              <div>
                <strong>Email Us</strong>
                <p>hello@homemart.com</p>
              </div>
            </div>

            <div className="contact-detail">
              <Clock size={23} />
              <div>
                <strong>Opening Hours</strong>
                <p>Monday – Saturday, 9 AM – 6 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card">
            <h2>Send us a message</h2>

            {sent && (
              <div className="form-success">
                Thank you! Your message has been submitted in this demo.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Your Name *</label>
                  <input required placeholder="Full name" />
                </div>

                <div className="form-group">
                  <label>Email *</label>
                  <input required type="email" placeholder="you@example.com" />
                </div>

                <div className="form-group full">
                  <label>Subject *</label>
                  <input required placeholder="How can we help?" />
                </div>

                <div className="form-group full">
                  <label>Message *</label>
                  <textarea required rows="5" placeholder="Write your message..." />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}