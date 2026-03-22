import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        "/cart",
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(prev =>
        prev.map(item =>
          item.productId === productId ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const clearCart = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#888" }}>
      Loading cart...
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "24px", color: "#1a1a1a" }}>
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div style={{
          textAlign: "center", padding: "80px",
          background: "#f9f9f9", borderRadius: "16px"
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛒</div>
          <p style={{ color: "#888", fontSize: "1.1rem" }}>Your cart is empty.</p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "16px", padding: "12px 28px",
              background: "#764ba2", color: "#fff",
              border: "none", borderRadius: "8px",
              fontWeight: "600", cursor: "pointer", fontSize: "1rem"
            }}
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>

          {/* Cart Items */}
          <div style={{ flex: "2", minWidth: "300px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
              <span style={{ color: "#666" }}>{cartItems.length} item(s)</span>
              <button
                onClick={clearCart}
                style={{
                  background: "none", border: "none",
                  color: "#dc2626", cursor: "pointer",
                  fontWeight: "500", fontSize: "0.9rem"
                }}
              >
                Clear Cart
              </button>
            </div>

            {cartItems.map(item => (
              <div
                key={item.productId}
                style={{
                  display: "flex", gap: "16px", alignItems: "center",
                  padding: "16px", background: "#fff",
                  border: "1px solid #eee", borderRadius: "12px",
                  marginBottom: "12px", boxShadow: "0 1px 4px rgba(0,0,0,0.05)"
                }}
              >
                {/* Image */}
                <div style={{
                  width: "80px", height: "80px", borderRadius: "8px",
                  background: "#f5f5f5", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden"
                }}>
                  {item.imageUrl
                    ? <img src={item.imageUrl} alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    : <span style={{ fontSize: "2rem" }}>🛍️</span>
                  }
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: "600", marginBottom: "4px", color: "#1a1a1a" }}>
                    {item.name}
                  </div>
                  <div style={{ color: "#764ba2", fontWeight: "700", fontSize: "1.1rem" }}>
                    ${item.price?.toFixed(2)}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    style={{
                      width: "28px", height: "28px", borderRadius: "6px",
                      border: "1.5px solid #ddd", background: "#fff",
                      cursor: "pointer", fontWeight: "700", fontSize: "1rem"
                    }}
                  >−</button>
                  <span style={{ minWidth: "20px", textAlign: "center", fontWeight: "600" }}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    style={{
                      width: "28px", height: "28px", borderRadius: "6px",
                      border: "1.5px solid #ddd", background: "#fff",
                      cursor: "pointer", fontWeight: "700", fontSize: "1rem"
                    }}
                  >+</button>
                </div>

                {/* Item Total */}
                <div style={{ fontWeight: "700", minWidth: "64px", textAlign: "right", color: "#1a1a1a" }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.productId)}
                  style={{
                    background: "none", border: "none",
                    color: "#dc2626", cursor: "pointer",
                    fontSize: "1.2rem", padding: "4px"
                  }}
                >✕</button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ flex: "1", minWidth: "260px" }}>
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: "16px", padding: "24px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
            }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#1a1a1a" }}>
                Order Summary
              </h2>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#555" }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#555" }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? "#16a34a" : "#555" }}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping > 0 && (
                <div style={{
                  background: "#fef9c3", borderRadius: "8px",
                  padding: "8px 12px", marginBottom: "12px",
                  fontSize: "0.82rem", color: "#854d0e"
                }}>
                  Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <div style={{
                borderTop: "1px solid #eee", paddingTop: "12px",
                display: "flex", justifyContent: "space-between",
                fontWeight: "700", fontSize: "1.1rem", marginBottom: "20px"
              }}>
                <span>Total</span>
                <span style={{ color: "#764ba2" }}>${total.toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                style={{
                  width: "100%", padding: "14px",
                  background: "#764ba2", color: "#fff",
                  border: "none", borderRadius: "10px",
                  fontSize: "1rem", fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={() => navigate("/")}
                style={{
                  width: "100%", padding: "12px", marginTop: "10px",
                  background: "transparent", color: "#764ba2",
                  border: "2px solid #764ba2", borderRadius: "10px",
                  fontSize: "0.95rem", fontWeight: "600", cursor: "pointer"
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}