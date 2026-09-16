import { Trash2, Minus, Plus } from "lucide-react";
import { useStore } from "../context/StoreContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useStore();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} />

      <div className="cart-item-info">
        <p className="product-category">{item.categoryName}</p>
        <h3>{item.name}</h3>
        <p className="cart-material">{item.material}</p>

        <div className="quantity-control">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            aria-label="Decrease quantity"
          >
            <Minus size={15} />
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus size={15} />
          </button>
        </div>
      </div>

      <div className="cart-item-right">
        <strong>${(item.price * item.quantity).toLocaleString()}</strong>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}