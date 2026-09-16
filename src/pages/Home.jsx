import { Link } from "react-router-dom";
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = [
  {
    name: "Living Room",
    category: "living-room",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700",
    text: "Relax in style",
  },
  {
    name: "Bedroom",
    category: "bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=700",
    text: "Rest beautifully",
  },
  {
    name: "Dining & Kitchen",
    category: "dining",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=700",
    text: "Gather together",
  },
  {
    name: "Office & Decor",
    category: "office",
    image:
      "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=700",
    text: "Create your space",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">A HOME THAT TELLS YOUR STORY</span>

            <h1>
              Make room for
              <br />
              <em>beautiful living.</em>
            </h1>

            <p>
              Thoughtfully designed furniture and timeless decor for the
              moments that make your house a home.
            </p>

            <div className="hero-buttons">
              <Link to="/products" className="btn btn-primary">
                Shop Collection <ArrowRight size={18} />
              </Link>

              <Link to="/about" className="btn btn-outline">
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features-strip">
        <div className="container features-grid">
          <div className="feature-item">
            <Truck size={26} />
            <div>
              <strong>Free Delivery</strong>
              <span>On orders over $500</span>
            </div>
          </div>

          <div className="feature-item">
            <ShieldCheck size={26} />
            <div>
              <strong>Quality Assured</strong>
              <span>Built to last</span>
            </div>
          </div>

          <div className="feature-item">
            <RefreshCcw size={26} />
            <div>
              <strong>Easy Returns</strong>
              <span>Hassle-free shopping</span>
            </div>
          </div>

          <div className="feature-item">
            <Headphones size={26} />
            <div>
              <strong>Expert Support</strong>
              <span>Here when you need us</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <span className="eyebrow">EXPLORE OUR COLLECTIONS</span>
            <h2>Find your perfect space</h2>
            <p>
              From cozy corners to elegant dining rooms, discover furniture
              that feels like home.
            </p>
          </div>

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/products?category=${category.category}`}
                className="category-card"
                key={category.category}
              >
                <img src={category.image} alt={category.name} loading="lazy" />

                <div className="category-overlay">
                  <span>{category.text}</span>
                  <h3>{category.name}</h3>
                  <span className="category-link">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CURATED FOR YOU</span>
              <h2>Our favorite pieces</h2>
            </div>

            <Link to="/products" className="text-link">
              View All Products <ArrowRight size={17} />
            </Link>
          </div>

          <div className="product-grid">
            {products.slice(0, 4).map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="promo-section">
        <div className="container promo-content">
          <div>
            <span className="eyebrow">MAKE YOUR SPACE YOUR OWN</span>
            <h2>Small details.<br />Big difference.</h2>
            <p>
              Discover beautiful accents, soft textures, and thoughtful
              designs that bring every room to life.
            </p>
            <Link to="/products?category=office" className="btn btn-primary">
              Explore Decor <ArrowRight size={18} />
            </Link>
          </div>

          <img
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1000"
            alt="Elegant home interior"
            loading="lazy"
          />
        </div>
      </section>

      <section className="newsletter">
        <div className="container newsletter-content">
          <div>
            <span className="eyebrow">STAY INSPIRED</span>
            <h2>Bring beauty home.</h2>
            <p>
              Join our newsletter for home styling ideas and exclusive offers.
            </p>
          </div>

          <form
            className="newsletter-form"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to HomeMart!");
            }}
          >
            <input type="email" placeholder="Your email address" required />
            <button className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}