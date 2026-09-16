import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
  ShieldCheck,
} from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import { useStore } from "../context/StoreContext";

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [added, setAdded] = useState(false);

  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useStore();

  if (!product) {
    return (
      <div className="empty-state page-empty">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);

    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <main>
      <section className="section product-detail-section">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> /{" "}
            <Link to="/products">Shop</Link> / {product.name}
          </div>

          <div className="product-detail">
            <div className="detail-gallery">
              <div className="detail-main-image">
                <img src={activeImage} alt={product.name} />
              </div>

              <div className="detail-thumbnails">
                <button
                  className="active"
                  onClick={() => setActiveImage(product.image)}
                >
                  <img src={product.image} alt={product.name} />
                </button>
              </div>
            </div>

            <div className="detail-info">
              <span className="eyebrow">{product.categoryName}</span>

              <h1>{product.name}</h1>

              <div className="detail-rating">
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={17}
                      fill={star <= Math.round(product.rating) ? "#D4A574" : "none"}
                      color="#D4A574"
                    />
                  ))}
                </div>

                <span>
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="detail-price">
                <strong>${product.price.toLocaleString()}</strong>
                {product.oldPrice && (
                  <del>${product.oldPrice.toLocaleString()}</del>
                )}
              </div>

              <p className="detail-description">{product.description}</p>

              <div className="detail-specs">
                <div>
                  <span>Material</span>
                  <strong>{product.material}</strong>
                </div>

                <div>
                  <span>Color</span>
                  <strong>{product.color}</strong>
                </div>

                <div>
                  <span>Dimensions</span>
                  <strong>{product.dimensions}</strong>
                </div>

                <div>
                  <span>Brand</span>
                  <strong>{product.brand}</strong>
                </div>
              </div>

              <div className="quantity-row">
                <span>Quantity</span>

                <div className="quantity-control">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{quantity}</span>

                  <button onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <div className="detail-actions">
                <button className="btn btn-primary add-cart-btn" onClick={handleAddToCart}>
                  <ShoppingBag size={19} />
                  {added ? "Added to Cart ✓" : "Add to Cart"}
                </button>

                <button
                  className={`detail-wishlist ${
                    isWishlisted(product.id) ? "liked" : ""
                  }`}
                  onClick={() => toggleWishlist(product)}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    size={21}
                    fill={isWishlisted(product.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="detail-benefits">
                <div>
                  <Truck size={23} />
                  <span>
                    <strong>Free delivery</strong>
                    On orders over $500
                  </span>
                </div>

                <div>
                  <ShieldCheck size={23} />
                  <span>
                    <strong>Quality guaranteed</strong>
                    Crafted for everyday living
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="product-description-box">
            <h2>Product Details</h2>
            <p>{product.description}</p>

            <h3>Features</h3>
            <ul>
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          {related.length > 0 && (
            <section className="related-section">
              <div className="section-heading">
                <div>
                  <span className="eyebrow">YOU MAY ALSO LIKE</span>
                  <h2>Related Products</h2>
                </div>
              </div>

              <div className="product-grid">
                {related.map((item) => (
                  <ProductCard product={item} key={item.id} />
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </main>
  );
}