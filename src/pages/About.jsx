import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Heart, Award } from "lucide-react";

export default function About() {
  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">OUR STORY</span>
          <h1>Designed for living</h1>
          <p>Thoughtful furniture. Beautiful spaces. Meaningful moments.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro">
          <div>
            <span className="eyebrow">WHO WE ARE</span>
            <h2>A little more comfort in every corner.</h2>
            <p>
              HomeMart is a furniture and home decor concept created to make
              beautiful, comfortable homes accessible to everyone.
            </p>
            <p>
              We believe that furniture is more than something you buy. It is
              where you relax after a long day, gather with family, and create
              memories.
            </p>
            <p>
              Our collection brings together warm materials, timeless
              silhouettes, and practical designs for modern living.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000"
            alt="Beautiful living room interior"
          />
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">WHAT WE BELIEVE</span>
            <h2>Made with intention</h2>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <Leaf size={34} />
              <h3>Thoughtful Design</h3>
              <p>
                We focus on timeless designs that blend beauty, comfort, and
                everyday functionality.
              </p>
            </div>

            <div className="value-card">
              <Heart size={34} />
              <h3>Comfort First</h3>
              <p>
                Every space deserves furniture that feels welcoming, warm,
                and personal.
              </p>
            </div>

            <div className="value-card">
              <Award size={34} />
              <h3>Quality Matters</h3>
              <p>
                We believe in furniture that looks beautiful and is made for
                everyday living.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <h2>Ready to make your space beautiful?</h2>
          <p>Explore our collection and find pieces that feel like home.</p>
          <Link to="/products" className="btn btn-primary">
            Shop Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}