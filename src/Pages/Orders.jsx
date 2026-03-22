import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return { color: "#f0e040", bg: "rgba(240,224,64,0.1)", border: "rgba(240,224,64,0.2)" };
      case "Confirmed": return { color: "#00d4ff", bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.2)" };
      case "Shipped": return { color: "#cc88ff", bg: "rgba(204,136,255,0.1)", border: "rgba(204,136,255,0.2)" };
      case "Delivered": return { color: "#44ff88", bg: "rgba(68,255,136,0.1)", border: "rgba(68,255,136,0.2)" };
      case "Cancelled": return { color: "#ff4444", bg: "rgba(255,68,68,0.1)", border: "rgba(255,68,68,0.2)" };
      default: return { color: "#888", bg: "rgba(136,136,136,0.1)", border: "rgba(136,136,136,0.2)" };
    }
  };

  const getStatusStep = (status) => {
    const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];
    return steps.indexOf(status);
  };

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: "16px"
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: "40px", height: "40px",
        border: "1px solid rgba(240,224,64,0.3)",
        borderTop: "1px solid #f0e040",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.75rem", letterSpacing: "4px",
        color: "rgba(255,255,255,0.2)"
      }}>
        LOADING ORDERS...
      </span>
    </div>
  );

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .order-card:hover { border-color: rgba(240,224,64,0.2) !important; }
      `}</style>



      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 32px" }}>

        {orders.length === 0 ? (
          /* Empty State */
          <div style={{
            textAlign: "center", padding: "100px 40px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            <div style={{
              fontSize: "4rem", marginBottom: "24px", opacity: 0.15
            }}>◈</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem", color: "#fff",
              margin: "0 0 12px"
            }}>
              No orders yet
            </h2>
            <p style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: "0.9rem", marginBottom: "32px"
            }}>
              Start shopping to see your orders here
            </p>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "14px 36px",
                background: "#f0e040", color: "#000",
                border: "none", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: "0.82rem",
                letterSpacing: "2px", cursor: "pointer"
              }}
            >
              BROWSE PRODUCTS →
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {orders.map((order, i) => {
              const statusStyle = getStatusColor(order.status);
              const stepIndex = getStatusStep(order.status);
              const steps = ["Pending", "Confirmed", "Shipped", "Delivered"];

              return (
                <div
                  key={order._id || order.id}
                  className="order-card"
                  style={{
                    background: "#0f0f0f",
                    border: "1px solid rgba(255,255,255,0.06)",
                    padding: "28px",
                    transition: "border-color 0.2s",
                    animation: `fadeUp 0.4s ease ${i * 0.08}s forwards`,
                    opacity: 0
                  }}
                >
                  {/* Order Header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "flex-start", flexWrap: "wrap",
                    gap: "12px", marginBottom: "24px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)"
                  }}>
                    <div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem", letterSpacing: "3px",
                        color: "rgba(255,255,255,0.3)", marginBottom: "6px"
                      }}>
                        ORDER ID
                      </div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.9rem", fontWeight: 600,
                        color: "#fff", letterSpacing: "1px"
                      }}>
                        #{(order._id || order.id)?.slice(-8).toUpperCase()}
                      </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem", letterSpacing: "3px",
                        color: "rgba(255,255,255,0.3)", marginBottom: "6px"
                      }}>
                        DATE
                      </div>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem", color: "rgba(255,255,255,0.6)"
                      }}>
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem", letterSpacing: "3px",
                        color: "rgba(255,255,255,0.3)", marginBottom: "6px"
                      }}>
                        TOTAL
                      </div>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.2rem", fontWeight: 700,
                        color: "#f0e040"
                      }}>
                        ${order.totalAmount?.toFixed(2)}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.68rem", letterSpacing: "3px",
                        color: "rgba(255,255,255,0.3)", marginBottom: "6px"
                      }}>
                        STATUS
                      </div>
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "5px 14px",
                        background: statusStyle.bg,
                        border: `1px solid ${statusStyle.border}`
                      }}>
                        <div style={{
                          width: "5px", height: "5px",
                          borderRadius: "50%",
                          background: statusStyle.color
                        }} />
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem", letterSpacing: "1.5px",
                          color: statusStyle.color, fontWeight: 600
                        }}>
                          {order.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  {order.status !== "Cancelled" && (
                    <div style={{ marginBottom: "24px" }}>
                      <div style={{
                        display: "flex", alignItems: "center",
                        position: "relative"
                      }}>
                        {steps.map((step, idx) => (
                          <div key={step} style={{
                            display: "flex", alignItems: "center", flex: 1
                          }}>
                            <div style={{
                              display: "flex", flexDirection: "column",
                              alignItems: "center", gap: "6px"
                            }}>
                              <div style={{
                                width: "28px", height: "28px",
                                borderRadius: "50%",
                                background: idx <= stepIndex ? "#f0e040" : "rgba(255,255,255,0.05)",
                                border: idx <= stepIndex
                                  ? "none"
                                  : "1px solid rgba(255,255,255,0.1)",
                                display: "flex", alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s"
                              }}>
                                {idx < stepIndex ? (
                                  <span style={{ color: "#000", fontSize: "0.7rem", fontWeight: 700 }}>✓</span>
                                ) : idx === stepIndex ? (
                                  <div style={{
                                    width: "8px", height: "8px",
                                    borderRadius: "50%", background: "#000"
                                  }} />
                                ) : (
                                  <div style={{
                                    width: "6px", height: "6px",
                                    borderRadius: "50%",
                                    background: "rgba(255,255,255,0.2)"
                                  }} />
                                )}
                              </div>
                              <span style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: "0.62rem", letterSpacing: "1px",
                                color: idx <= stepIndex
                                  ? "rgba(255,255,255,0.7)"
                                  : "rgba(255,255,255,0.2)",
                                whiteSpace: "nowrap"
                              }}>
                                {step.toUpperCase()}
                              </span>
                            </div>
                            {idx < steps.length - 1 && (
                              <div style={{
                                flex: 1, height: "1px",
                                background: idx < stepIndex
                                  ? "#f0e040"
                                  : "rgba(255,255,255,0.08)",
                                margin: "0 4px",
                                marginBottom: "20px",
                                transition: "background 0.3s"
                              }} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Items */}
                  <div style={{ marginBottom: "20px" }}>
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", padding: "10px 0",
                        borderBottom: idx < Math.min(order.items.length, 3) - 1
                          ? "1px solid rgba(255,255,255,0.04)"
                          : "none"
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{
                            width: "44px", height: "44px",
                            background: "#1a1a1a",
                            display: "flex", alignItems: "center",
                            justifyContent: "center", flexShrink: 0,
                            overflow: "hidden"
                          }}>
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              />
                            ) : (
                              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1rem" }}>◈</span>
                            )}
                          </div>
                          <div>
                            <div style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.85rem", fontWeight: 500,
                              color: "#fff"
                            }}>
                              {item.name}
                            </div>
                            <div style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: "0.75rem",
                              color: "rgba(255,255,255,0.3)"
                            }}>
                              Qty: {item.quantity}
                            </div>
                          </div>
                        </div>
                        <div style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.9rem", fontWeight: 600,
                          color: "rgba(255,255,255,0.6)"
                        }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <div style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.75rem",
                        color: "rgba(255,255,255,0.25)",
                        paddingTop: "8px", letterSpacing: "1px"
                      }}>
                        +{order.items.length - 3} MORE ITEM{order.items.length - 3 > 1 ? "S" : ""}
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexWrap: "wrap", gap: "12px",
                    paddingTop: "16px",
                    borderTop: "1px solid rgba(255,255,255,0.06)"
                  }}>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.25)",
                      letterSpacing: "0.5px"
                    }}>
                      {order.shippingAddress?.fullName} •{" "}
                      {order.shippingAddress?.city}, {order.shippingAddress?.country}
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => navigate(`/order-status/${order._id || order.id}`)}
                        style={{
                          padding: "8px 20px",
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.12)",
                          color: "rgba(255,255,255,0.5)",
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "0.72rem", letterSpacing: "1.5px",
                          cursor: "pointer", transition: "all 0.2s"
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = "#f0e040";
                          e.currentTarget.style.color = "#f0e040";
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                        }}
                      >
                        TRACK ORDER →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}