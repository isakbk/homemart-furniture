import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Checkout() {
  const navigate = useNavigate();

  const {
    cart,
    subtotal,
    shipping,
    tax,
    total,
    user,
    placeOrder,
  } = useStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    payment: "cod",
    delivery: "standard",
  });

  const [completed, setCompleted] = useState(false);
  const [order, setOrder] = useState(null);

  const updateForm = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = placeOrder(form);
    setOrder(newOrder);
    setCompleted(true);
  };

  if (completed) {
    return (
      <main>
        <div className="success-page">
          <CheckCircle size={70} color="#4c845d" />

          <span className="eyebrow">ORDER CONFIRMED</span>

          <h1>Thank you for your order!</h1>

          <p>
            Your furniture journey begins here. We've received your order
            and will prepare it with care.
          </p>

          <div className="order-success-card">
            <span>Order Number</span>
            <strong>{order?.id}</strong>
            <span>Total Amount</span>
            <strong>${order?.total.toFixed(2)}</strong>
          </div>

          <Link to="/account" className="btn btn-primary">
            View My Orders <ArrowRight size={18} />
          </Link>
        </div>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="empty-state page-empty">
        <h2>Your cart is empty</h2>
        <Link to="/products" className="btn btn-primary">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">ALMOST HOME</span>
          <h1>Checkout</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <form className="checkout-layout" onSubmit={handleSubmit}>
            <div className="checkout-form">
              <h2>Shipping Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    required
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                    placeholder="First name"
                  />
                </div>

                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    required
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                    placeholder="Last name"
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="form-group full">
                  <label>Address *</label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    placeholder="House number, street, locality"
                  />
                </div>

                <div className="form-group">
                  <label>City *</label>
                  <input
                    required
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    placeholder="City"
                  />
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                    required
                    value={form.state}
                    onChange={(e) => updateForm("state", e.target.value)}
                    placeholder="State"
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code *</label>
                  <input
                    required
                    value={form.zip}
                    onChange={(e) => updateForm("zip", e.target.value)}
                    placeholder="Postal code"
                  />
                </div>
              </div>

              <h2>Delivery Options</h2>

              <div className="radio-options">
                <label className="radio-card">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard"
                    checked={form.delivery === "standard"}
                    onChange={(e) => updateForm("delivery", e.target.value)}
                  />
                  <span>
                    <strong>Standard Delivery</strong>
                    <small>5–7 business days · Free over $500</small>
                  </span>
                </label>

                <label className="radio-card">
                  <input
                    type="radio"
                    name="delivery"
                    value="express"
                    checked={form.delivery === "express"}
                    onChange={(e) => updateForm("delivery", e.target.value)}
                  />
                  <span>
                    <strong>Express Delivery</strong>
                    <small>2–3 business days · Additional charges may apply</small>
                  </span>
                </label>
              </div>

              <h2>Payment Method</h2>

              <div className="radio-options">
                <label className="radio-card">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={(e) => updateForm("payment", e.target.value)}
                  />
                  <span>
                    <strong>Cash on Delivery</strong>
                    <small>Pay when your order arrives</small>
                  </span>
                </label>

                <label className="radio-card">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={form.payment === "card"}
                    onChange={(e) => updateForm("payment", e.target.value)}
                  />
                  <span>
                    <strong>Credit / Debit Card</strong>
                    <small>Demo payment — no real transaction</small>
                  </span>
                </label>

                <label className="radio-card">
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={form.payment === "upi"}
                    onChange={(e) => updateForm("payment", e.target.value)}
                  />
                  <span>
                    <strong>UPI</strong>
                    <small>Demo payment — no real transaction</small>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Place Order <ArrowRight size={18} />
              </button>
            </div>

            <aside className="order-summary checkout-summary">
              <h2>Order Summary</h2>

              {cart.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty: {item.quantity}</span>
                  </div>

                  <b>${(item.price * item.quantity).toLocaleString()}</b>
                </div>
              ))}

              <div className="summary-divider" />

              <div className="summary-line">
                <span>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              <div className="summary-line">
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : `$${shipping}`}</strong>
              </div>

              <div className="summary-line">
                <span>Tax</span>
                <strong>${tax.toFixed(2)}</strong>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </aside>
          </form>
        </div>
      </section>
    </main>
  );
}