import { createContext, useContext, useEffect, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("homemart-cart")) || [];
  });

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("homemart-wishlist")) || [];
  });

  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("homemart-user")) || null;
  });

  const [orders, setOrders] = useState(() => {
    return JSON.parse(localStorage.getItem("homemart-orders")) || [];
  });

  useEffect(() => {
    localStorage.setItem("homemart-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("homemart-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("homemart-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("homemart-orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product, quantity = 1) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === product.id);

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...previous, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist((previous) => {
      const exists = previous.some((item) => item.id === product.id);

      return exists
        ? previous.filter((item) => item.id !== product.id)
        : [...previous, product];
    });
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const shipping = subtotal === 0 || subtotal >= 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const login = (account) => setUser(account);

  const logout = () => setUser(null);

  const placeOrder = (orderDetails) => {
    const newOrder = {
      id: `HM-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cart,
      subtotal,
      shipping,
      tax,
      total,
      status: "Processing",
      ...orderDetails,
    };

    setOrders((previous) => [newOrder, ...previous]);
    clearCart();

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        user,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isWishlisted,
        cartCount,
        subtotal,
        shipping,
        tax,
        total,
        login,
        logout,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}