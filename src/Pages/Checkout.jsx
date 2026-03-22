import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [step, setStep] = useState(1); // 1 = Shipping, 2 = Payment, 3 = Review
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India"
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiry: "",
    cvv: ""
  });

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

  const handleShippingChange = (e) => {
    setShippingInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isShippingValid = () =>
    Object.values(shippingInfo).every(v => v.trim() !== "");

  const isPaymentValid = () =>
    Object.values(paymentInfo).every(v => v.trim() !== "");

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/orders",
        {
          items: cartItems,
          shippingAddress: shippingInfo,
          totalAmount: total
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/order-status/${res.data.orderId}`);
    } catch (err) {
      console.error("Failed to place order", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "6px"
  };

  const labelStyle = {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "#444"
  };

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#888" }}>
      Loading checkout...
    </div>
  );

  if (cartItems.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <p style={{ color: "#888", fontSize: "1.1rem" }}>Your cart is empty.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "16px", padding: "12px 28px",
          background: "#764ba2", color: "#fff",
          border: "none", borderRadius: "8px",
          fontWeight: "600", cursor: "pointer"
        }}
      >
        Go Shopping
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 24px" }}>
      <h1 style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#1a1a1a" }}>Checkout</h1>

      {/* Step Indicator */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: "32px", gap: "0" }}>
        {["Shipping", "Payment", "Review"].map((label, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;
          return (
            <div key={label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: isDone ? "#16a34a" : isActive ? "#764ba2" : "#e5e7eb",
                  color: isDone || isActive ? "#fff" : "#9ca3af",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: "700", fontSize: "0.9rem", transition: "all 0.3s"
                }}>
                  {isDone ? "✓" : stepNum}
                </div>
                <span style={{
                  fontSize: "0.78rem", marginTop: "4px",
                  color: isActive ? "#764ba2" : "#888", fontWeight: isActive ? "600" : "400"
                }}>
                  {label}
                </span>
              </div>
              {i < 2 && (
                <div style={{
                  height: "2px", flex: 1, marginBottom: "20px",
                  background: step > stepNum ? "#16a34a" : "#e5e7eb",
                  transition: "background 0.3s"
                }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>

        {/* Left: Step Forms */}
        <div style={{ flex: "2", minWidth: "300px" }}>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: "16px", padding: "24px"
            }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#1a1a1a" }}>
                Shipping Information
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { label: "Full Name", name: "fullName", colSpan: 2 },
                  { label: "Email", name: "email", colSpan: 1 },
                  { label: "Phone", name: "phone", colSpan: 1 },
                  { label: "Address", name: "address", colSpan: 2 },
                  { label: "City", name: "city", colSpan: 1 },
                  { label: "State", name: "state", colSpan: 1 },
                  { label: "Zip Code", name: "zipCode", colSpan: 1 },
                  { label: "Country", name: "country", colSpan: 1 },
                ].map(field => (
                  <div key={field.name} style={{ gridColumn: `span ${field.colSpan}` }}>
                    <label style={labelStyle}>{field.label}</label>
                    <input
                      name={field.name}
                      value={shippingInfo[field.name]}
                      onChange={handleShippingChange}
                      style={inputStyle}
                      placeholder={field.label}
                    />
                  </div>
                ))}
              </div>
              <button
                onClick={() => isShippingValid() && setStep(2)}
                style={{
                  marginTop: "24px", width: "100%", padding: "14px",
                  background: isShippingValid() ? "#764ba2" : "#ccc",
                  color: "#fff", border: "none", borderRadius: "10px",
                  fontSize: "1rem", fontWeight: "600",
                  cursor: isShippingValid() ? "pointer" : "not-allowed"
                }}
              >
                Continue to Payment →
              </button>
            </div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: "16px", padding: "24px"
            }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#1a1a1a" }}>
                Payment Details
              </h2>

              <div style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "14px", padding: "24px", color: "#fff",
                marginBottom: "24px", minHeight: "120px",
                display: "flex", flexDirection: "column", justifyContent: "space-between"
              }}>
                <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>Card Number</div>
                <div style={{ fontSize: "1.3rem", letterSpacing: "3px", fontWeight: "600" }}>
                  {paymentInfo.cardNumber || "•••• •••• •••• ••••"}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{paymentInfo.cardHolder || "CARD HOLDER"}</span>
                  <span>{paymentInfo.expiry || "MM/YY"}</span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Card Number</label>
                  <input
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentChange}
                    maxLength={19}
                    placeholder="1234 5678 9012 3456"
                    style={inputStyle}
                  />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Card Holder Name</label>
                  <input
                    name="cardHolder"
                    value={paymentInfo.cardHolder}
                    onChange={handlePaymentChange}
                    placeholder="As on card"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Expiry Date</label>
                  <input
                    name="expiry"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>CVV</label>
                  <input
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handlePaymentChange}
                    placeholder="•••"
                    maxLength={3}
                    type="password"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    flex: 1, padding: "14px",
                    background: "transparent", color: "#764ba2",
                    border: "2px solid #764ba2", borderRadius: "10px",
                    fontSize: "1rem", fontWeight: "600", cursor: "pointer"
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={() => isPaymentValid() && setStep(3)}
                  style={{
                    flex: 2, padding: "14px",
                    background: isPaymentValid() ? "#764ba2" : "#ccc",
                    color: "#fff", border: "none", borderRadius: "10px",
                    fontSize: "1rem", fontWeight: "600",
                    cursor: isPaymentValid() ? "pointer" : "not-allowed"
                  }}
                >
                  Review Order →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div style={{
              background: "#fff", border: "1px solid #eee",
              borderRadius: "16px", padding: "24px"
            }}>
              <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#1a1a1a" }}>
                Review Your Order
              </h2>

              {/* Items */}
              {cartItems.map(item => (
                <div key={item.productId} style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "10px 0",
                  borderBottom: "1px solid #f0f0f0"
                }}>
                  <div>
                    <div style={{ fontWeight: "600", color: "#1a1a1a" }}>{item.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#888" }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: "700", color: "#764ba2" }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Shipping Address Summary */}
              <div style={{
                marginTop: "20px", padding: "14px",
                background: "#f9f9f9", borderRadius: "10px"
              }}>
                <div style={{ fontWeight: "600", marginBottom: "6px", color: "#444" }}>
                  Shipping To:
                </div>
                <div style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.6" }}>
                  {shippingInfo.fullName}<br />
                  {shippingInfo.address}, {shippingInfo.city}<br />
                  {shippingInfo.state} - {shippingInfo.zipCode}, {shippingInfo.country}
                </div>
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button
                  onClick={() => setStep(2)}
                  style={{
                    flex: 1, padding: "14px",
                    background: "transparent", color: "#764ba2",
                    border: "2px solid #764ba2", borderRadius: "10px",
                    fontSize: "1rem", fontWeight: "600", cursor: "pointer"
                  }}
                >
                  ← Back
                </button>
                <button
                  onClick={placeOrder}
                  disabled={placing}
                  style={{
                    flex: 2, padding: "14px",
                    background: placing ? "#ccc" : "#16a34a",
                    color: "#fff", border: "none", borderRadius: "10px",
                    fontSize: "1rem", fontWeight: "600",
                    cursor: placing ? "not-allowed" : "pointer"
                  }}
                >
                  {placing ? "Placing Order..." : "Place Order ✓"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div style={{ flex: "1", minWidth: "240px" }}>
          <div style={{
            background: "#fff", border: "1px solid #eee",
            borderRadius: "16px", padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
          }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "#1a1a1a" }}>
              Order Summary
            </h2>
            {cartItems.map(item => (
              <div key={item.productId} style={{
                display: "flex", justifyContent: "space-between",
                fontSize: "0.9rem", marginBottom: "8px", color: "#555"
              }}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ borderTop: "1px solid #eee", paddingTop: "12px", marginTop: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#555", marginBottom: "8px" }}>
                <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", color: "#555", marginBottom: "12px" }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? "#16a34a" : "#555" }}>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                fontWeight: "700", fontSize: "1.1rem", color: "#764ba2"
              }}>
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}