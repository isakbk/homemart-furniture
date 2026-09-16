import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  return (
    <article className="product-card">
      <div className="product-image">
        {product.badge && <span className="product-badge">{product.badge}</span>}

        <button
          className={`wishlist-btn ${
            isWishlisted(product.id) ? "liked" : ""
          }`}
          onClick={() => toggleWishlist(product)}
          aria-label="Add to wishlist"
        >
          <Heart
            size={19}
            fill={isWishlisted(product.id) ? "currentColor" : "none"}
          />
        </button>

        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>

        <button
          className="quick-add"
          onClick={() => addToCart(product)}
        >
          <ShoppingBag size={17} />
          Add to Cart
        </button>
      </div>

      <div className="product-info">
        <p className="product-category">{product.categoryName}</p>

        <Link to={`/products/${product.id}`} className="product-name">
          {product.name}
        </Link>

        <div className="product-rating">
          <Star size={14} fill="#D4A574" color="#D4A574" />
          <span>{product.rating}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="product-price">
          <strong>${product.price.toLocaleString()}</strong>
          {product.oldPrice && (
            <del>${product.oldPrice.toLocaleString()}</del>
          )}
        </div>
      </div>
    </article>
  );
}