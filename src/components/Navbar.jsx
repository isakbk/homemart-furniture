import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  Heart,
  UserRound,
} from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { cartCount, wishlist, user } = useStore();

  const closeMenu = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-icon">⌂</span>
          <span>
            Home<span>Mart</span>
            <small>FURNITURE & DECOR</small>
          </span>
        </Link>

        <nav className={`nav-links ${open ? "active" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink to="/products" onClick={closeMenu}>
            Shop
          </NavLink>

          <NavLink to="/products?category=living-room" onClick={closeMenu}>
            Living Room
          </NavLink>

          <NavLink to="/products?category=bedroom" onClick={closeMenu}>
            Bedroom
          </NavLink>

          <NavLink to="/products?category=dining" onClick={closeMenu}>
            Dining
          </NavLink>

          <NavLink to="/products?category=office" onClick={closeMenu}>
            Office & Decor
          </NavLink>

          <NavLink to="/about" onClick={closeMenu}>
            About
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/products" aria-label="Search products">
            <Search size={20} />
          </Link>

          <Link to="/account" className="nav-icon-link" aria-label="Wishlist">
            <Heart size={20} />
            {wishlist.length > 0 && (
              <span className="nav-badge">{wishlist.length}</span>
            )}
          </Link>

          <Link to="/account" className="nav-icon-link" aria-label="Account">
            <UserRound size={20} />
          </Link>

          <Link to="/cart" className="nav-icon-link" aria-label="Shopping cart">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="nav-badge">{cartCount}</span>
            )}
          </Link>

          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}