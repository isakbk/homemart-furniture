import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { useStore } from "../context/StoreContext";
import CartItem from "../components/CartItem";

export default function Cart() {
  const navigate = useNavigate();

  const {
    cart,
    subtotal,
    shipping,
    tax,
    total,
  } = useStore();

  if (cart.length === 0) {
    return (
      <main>
        <section className="page-banner">
          <div className="container">
            <span className="eyebrow">YOUR SHOPPING BAG</span>
            <h1>Shopping Cart</h1>
          </div>
        </section>

        <div className="empty-state page-empty">
          <ShoppingBag size={52} strokeWidth={1.2} />
          <h2>Your cart is empty</h2>
          <p>Discover something beautiful for your home.</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">YOUR SHOPPING BAG</span>
          <h1>Shopping Cart</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cart-layout">
            <div className="cart-products">
              <div className="cart-heading">
                <h2>Your Items</h2>
                <span>{cart.length} Products</span>
              </div>

              {cart.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}

              <Link to="/products" className="text-link">
                ← Continue Shopping
              </Link>
            </div>

            <aside className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-line">
                <span>Subtotal</span>
                <strong>${subtotal.toLocaleString()}</strong>
              </div>

              <div className="summary-line">
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong>
              </div>

              <div className="summary-line">
                <span>Estimated Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>

              <button
                className="btn btn-primary btn-block"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <p className="secure-note">🔒 Secure checkout · No database required</p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}