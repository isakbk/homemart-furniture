import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Package,
  Heart,
  MapPin,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";

export default function Account() {
  const navigate = useNavigate();

  const {
    user,
    logout,
    orders,
    wishlist,
  } = useStore();

  const [tab, setTab] = useState("profile");

  if (!user) {
    return (
      <div className="empty-state page-empty">
        <UserRound size={54} strokeWidth={1.2} />
        <h2>Welcome to HomeMart</h2>
        <p>Sign in to view your account, orders, and wishlist.</p>
        <Link to="/login" className="btn btn-primary">
          Login / Register <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <main>
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">WELCOME HOME</span>
          <h1>My Account</h1>
        </div>
      </section>

      <section className="section">
        <div className="container account-layout">
          <aside className="account-sidebar">
            <div className="account-user">
              <div className="avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>

            <button
              className={tab === "profile" ? "active" : ""}
              onClick={() => setTab("profile")}
            >
              <UserRound size={18} /> Profile
            </button>

            <button
              className={tab === "orders" ? "active" : ""}
              onClick={() => setTab("orders")}
            >
              <Package size={18} /> Order History
            </button>

            <button
              className={tab === "wishlist" ? "active" : ""}
              onClick={() => setTab("wishlist")}
            >
              <Heart size={18} /> Wishlist
            </button>

            <button
              className={tab === "addresses" ? "active" : ""}
              onClick={() => setTab("addresses")}
            >
              <MapPin size={18} /> Saved Addresses
            </button>

            <button
              className="logout-btn"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <LogOut size={18} /> Logout
            </button>
          </aside>

          <div className="account-content">
            {tab === "profile" && (
              <div>
                <h2>Profile Information</h2>
                <p className="account-intro">
                  Manage your HomeMart account details.
                </p>

                <div className="profile-details">
                  <div>
                    <span>Full Name</span>
                    <strong>{user.name}</strong>
                  </div>

                  <div>
                    <span>Email Address</span>
                    <strong>{user.email}</strong>
                  </div>

                  <div>
                    <span>Account Type</span>
                    <strong>Demo Customer</strong>
                  </div>
                </div>
              </div>
            )}

            {tab === "orders" && (
              <div>
                <h2>Order History</h2>

                {orders.length === 0 ? (
                  <div className="empty-account">
                    <Package size={40} />
                    <p>No orders yet.</p>
                    <Link to="/products" className="btn btn-primary">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div className="order-card" key={order.id}>
                        <div className="order-header">
                          <div>
                            <strong>{order.id}</strong>
                            <span>{order.date}</span>
                          </div>
                          <span className="status-badge">{order.status}</span>
                        </div>

                        <div className="order-items">
                          {order.items.map((item) => (
                            <div key={item.id}>
                              <img src={item.image} alt={item.name} />
                              <span>
                                {item.name} × {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="order-total">
                          <span>Total</span>
                          <strong>${order.total.toFixed(2)}</strong>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "wishlist" && (
              <div>
                <h2>My Wishlist</h2>

                {wishlist.length === 0 ? (
                  <div className="empty-account">
                    <Heart size={40} />
                    <p>Your wishlist is empty.</p>
                    <Link to="/products" className="btn btn-primary">
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="product-grid">
                    {wishlist.map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div>
                <h2>Saved Addresses</h2>

                <div className="address-card">
                  <MapPin size={24} />
                  <div>
                    <strong>Home Address</strong>
                    <p>
                      No saved address yet.
                      <br />
                      Your address will be collected during checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}