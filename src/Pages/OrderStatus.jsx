import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useOrderTracking } from "../hooks/useSignalR";

export default function OrderStatus() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Real-time status from SignalR
  const liveStatus = useOrderTracking(orderId);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  // Sync live status into order object
  useEffect(() => {
    if (liveStatus && order) {
      setOrder(prev => ({ ...prev, status: liveStatus }));
    }
  }, [liveStatus]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrder(res.data);
    } catch (err) {
      console.error("Failed to fetch order", err);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      key: "Pending",
      label: "Order Placed",
      icon: "📋",
      description: "Your order has been received"
    },
    {
      key: "Confirmed",
      label: "Confirmed",
      icon: "✅",
      description: "Seller has confirmed your order"
    },
    {
      key: "Shipped",
      label: "Shipped",
      icon: "🚚",
      description: "Your order is on the way"
    },
    {
      key: "Delivered",
      label: "Delivered",
      icon: "🎉",
      description: "Order delivered successfully"
    }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === order?.status);

  const getStepState = (index) => {
    if (index < currentStepIndex) return "done";
    if (index === currentStepIndex) return "active";
    return "pending";
  };

  const stepColors = {
    done: "#16a34a",
    active: "#764ba2",
    pending: "#e5e7eb"
  };

  const stepTextColors = {
    done: "#16a34a",
    active: "#764ba2",
    pending: "#9ca3af"
  };

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px", color: "#888" }}>
      Loading order...
    </div>
  );

  if (!order) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <p style={{ color: "#888", fontSize: "1.1rem" }}>Order not found.</p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "16px", padding: "12px 28px",
          background: "#764ba2", color: "#fff",
          border: "none", borderRadius: "8px",
          fontWeight: "600", cursor: "pointer"
        }}
      >
        Go Home
      </button>
    </div>
  );

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px", padding: "28px 32px",
        color: "#fff", marginBottom: "32px"
      }}>
        <div style={{ fontSize: "0.85rem", opacity: 0.8, marginBottom: "4px" }}>
          Order ID
        </div>
        <div style={{ fontSize: "1.1rem", fontWeight: "700", letterSpacing: "1px", marginBottom: "16px" }}>
          #{orderId}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>Placed on</div>
            <div style={{ fontWeight: "600" }}>
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "long", year: "numeric"
              })}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>Total Amount</div>
            <div style={{ fontWeight: "700", fontSize: "1.2rem" }}>
              ${order.totalAmount?.toFixed(2)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.8rem", opacity: 0.75 }}>Current Status</div>
            <div style={{
              background: "rgba(255,255,255,0.2)",
              padding: "4px 12px", borderRadius: "20px",
              fontWeight: "600", fontSize: "0.9rem"
            }}>
              {order.status}
            </div>
          </div>
        </div>
      </div>

      {/* Live Badge */}
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        marginBottom: "24px"
      }}>
        <div style={{
          width: "10px", height: "10px", borderRadius: "50%",
          background: "#16a34a",
          boxShadow: "0 0 0 3px rgba(22,163,74,0.2)",
          animation: "pulse 2s infinite"
        }} />
        <span style={{ fontSize: "0.85rem", color: "#16a34a", fontWeight: "600" }}>
          Live tracking enabled
        </span>
        <style>{`
          @keyframes pulse {
            0% { box-shadow: 0 0 0 0 rgba(22,163,74,0.4); }
            70% { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
            100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
          }
        `}</style>
      </div>

      {/* Step Tracker */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: "16px", padding: "28px",
        marginBottom: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "28px", color: "#1a1a1a" }}>
          Order Progress
        </h2>

        {steps.map((step, index) => {
          const state = getStepState(index);
          const isLast = index === steps.length - 1;

          return (
            <div key={step.key} style={{ display: "flex", gap: "16px" }}>

              {/* Icon + Line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  background: state === "pending" ? "#f3f4f6" : stepColors[state],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.2rem", flexShrink: 0,
                  border: state === "active" ? "3px solid #c4b5fd" : "none",
                  transition: "all 0.4s"
                }}>
                  {state === "done"
                    ? <span style={{ color: "#fff", fontWeight: "700" }}>✓</span>
                    : <span>{step.icon}</span>
                  }
                </div>
                {!isLast && (
                  <div style={{
                    width: "2px", flex: 1, minHeight: "32px",
                    background: index < currentStepIndex ? "#16a34a" : "#e5e7eb",
                    margin: "4px 0", transition: "background 0.4s"
                  }} />
                )}
              </div>

              {/* Text */}
              <div style={{ paddingBottom: isLast ? 0 : "24px", paddingTop: "8px" }}>
                <div style={{
                  fontWeight: "700", fontSize: "0.95rem",
                  color: stepTextColors[state], transition: "color 0.4s"
                }}>
                  {step.label}
                  {state === "active" && (
                    <span style={{
                      marginLeft: "10px", fontSize: "0.72rem",
                      background: "#ede9fe", color: "#764ba2",
                      padding: "2px 10px", borderRadius: "20px", fontWeight: "600"
                    }}>
                      Current
                    </span>
                  )}
                </div>
                <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "2px" }}>
                  {step.description}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Order Items */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: "16px", padding: "24px",
        marginBottom: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "#1a1a1a" }}>
          Items Ordered
        </h2>
        {order.items?.map((item, i) => (
          <div key={i} style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", padding: "10px 0",
            borderBottom: i < order.items.length - 1 ? "1px solid #f0f0f0" : "none"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "48px", height: "48px", borderRadius: "8px",
                background: "#f5f5f5", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "1.4rem", flexShrink: 0
              }}>
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }} />
                  : "🛍️"
                }
              </div>
              <div>
                <div style={{ fontWeight: "600", color: "#1a1a1a", fontSize: "0.95rem" }}>
                  {item.name}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#888" }}>
                  Qty: {item.quantity} × ${item.price?.toFixed(2)}
                </div>
              </div>
            </div>
            <div style={{ fontWeight: "700", color: "#764ba2" }}>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}

        {/* Total */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginTop: "16px", paddingTop: "16px",
          borderTop: "2px solid #f0f0f0",
          fontWeight: "700", fontSize: "1.1rem"
        }}>
          <span>Total Paid</span>
          <span style={{ color: "#764ba2" }}>${order.totalAmount?.toFixed(2)}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <div style={{
        background: "#fff", border: "1px solid #eee",
        borderRadius: "16px", padding: "24px",
        marginBottom: "32px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ fontSize: "1.1rem", marginBottom: "12px", color: "#1a1a1a" }}>
          Shipping Address
        </h2>
        <div style={{ fontSize: "0.9rem", color: "#666", lineHeight: "1.8" }}>
          <strong>{order.shippingAddress?.fullName}</strong><br />
          {order.shippingAddress?.address}<br />
          {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}<br />
          {order.shippingAddress?.country}<br />
          📞 {order.shippingAddress?.phone}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            flex: 1, minWidth: "140px", padding: "14px",
            background: "#764ba2", color: "#fff",
            border: "none", borderRadius: "10px",
            fontSize: "1rem", fontWeight: "600", cursor: "pointer"
          }}
        >
          Continue Shopping
        </button>
        <button
          onClick={() => window.print()}
          style={{
            flex: 1, minWidth: "140px", padding: "14px",
            background: "transparent", color: "#764ba2",
            border: "2px solid #764ba2", borderRadius: "10px",
            fontSize: "1rem", fontWeight: "600", cursor: "pointer"
          }}
        >
          Print Receipt
        </button>
      </div>

    </div>
  );
}