import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { productsData } from "../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    // Find product from local data instead of API
    const found = productsData.find(p => p._id === id);
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.post("/cart", { productId: product._id, quantity });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add to cart", err);
      alert("Please login to add items to cart.");
    }
  };

  if (loading) return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        width: "40px", height: "40px",
        border: "1px solid rgba(240,224,64,0.3)",
        borderTop: "1px solid #f0e040",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!product) return (
    <div style={{
      minHeight: "100vh", background: "#0a0a0a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "16px"
    }}>
      <div style={{ fontSize: "3rem", opacity: 0.2 }}>◈</div>
      <p style={{
        color: "rgba(255,255,255,0.3)",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "3px", fontSize: "0.78rem"
      }}>
        PRODUCT NOT FOUND
      </p>
      <button
        onClick={() => navigate("/products")}
        style={{
          padding: "10px 28px", background: "#f0e040",
          color: "#000", border: "none",
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700, fontSize: "0.78rem",
          letterSpacing: "2px", cursor: "pointer"
        }}
      >
        BACK TO PRODUCTS
      </button>
    </div>
  );

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : null;

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "40px 32px",
        animation: "fadeUp 0.5s ease forwards"
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "none", border: "none",
            color: "rgba(255,255,255,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.78rem", letterSpacing: "2px",
            cursor: "pointer", marginBottom: "40px",
            padding: 0, display: "flex",
            alignItems: "center", gap: "8px",
            textTransform: "uppercase",
            transition: "color 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.color = "#f0e040"}
          onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
        >
          ← Back to Products
        </button>

        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>

          {/* Left — Image */}
          <div style={{
            flex: "1", minWidth: "320px",
            position: "relative"
          }}>
            <div style={{
              background: "#111",
              border: "1px solid rgba(255,255,255,0.06)",
              overflow: "hidden",
              position: "relative",
              paddingTop: "100%"
            }}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    position: "absolute", inset: 0,
                    width: "100%", height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease"
                  }}
                  onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={e => e.target.style.transform = "scale(1)"}
                />
              ) : (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center",
                  justifyContent: "center",
                  fontSize: "5rem", opacity: 0.2
                }}>◈</div>
              )}

              {/* Discount badge */}
              {product.discount > 0 && (
                <div style={{
                  position: "absolute", top: "16px", left: "16px",
                  background: "#f0e040", color: "#000",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.7rem", fontWeight: 700,
                  letterSpacing: "1px", padding: "5px 12px"
                }}>
                  -{product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Right — Info */}
          <div style={{ flex: "1", minWidth: "300px" }}>

            {/* Category tag */}
            <div style={{
              display: "inline-block",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem", letterSpacing: "3px",
              color: "#f0e040", marginBottom: "16px",
              textTransform: "uppercase", fontWeight: 500
            }}>
              ✦ {product.category}
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900, color: "#fff",
              margin: "0 0 16px", lineHeight: 1.1
            }}>
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div style={{
                display: "flex", alignItems: "center",
                gap: "8px", marginBottom: "20px"
              }}>
                <div style={{ display: "flex", gap: "2px" }}>
                  {[1,2,3,4,5].map(star => (
                    <span key={star} style={{
                      color: star <= Math.round(product.rating) ? "#f0e040" : "rgba(255,255,255,0.15)",
                      fontSize: "1rem"
                    }}>★</span>
                  ))}
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(255,255,255,0.4)"
                }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Description */}
            <p style={{
              color: "rgba(255,255,255,0.5)",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.8, fontSize: "0.95rem",
              marginBottom: "28px"
            }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.4rem", fontWeight: 900,
                  color: "#f0e040"
                }}>
                  ${discountedPrice ? discountedPrice.toFixed(2) : product.price?.toFixed(2)}
                </span>
                {discountedPrice && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1.1rem",
                    color: "rgba(255,255,255,0.25)",
                    textDecoration: "line-through"
                  }}>
                    ${product.price?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Stock */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "6px 14px",
              background: product.stock > 0
                ? "rgba(68,255,136,0.08)"
                : "rgba(255,68,68,0.08)",
              border: `1px solid ${product.stock > 0 ? "rgba(68,255,136,0.2)" : "rgba(255,68,68,0.2)"}`,
              marginBottom: "32px"
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: product.stock > 0 ? "#44ff88" : "#ff4444"
              }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem", letterSpacing: "1px",
                color: product.stock > 0 ? "#44ff88" : "#ff4444",
                fontWeight: 600
              }}>
                {product.stock > 0
                  ? `IN STOCK (${product.stock} LEFT)`
                  : "OUT OF STOCK"
                }
              </span>
            </div>

            {/* Quantity */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "16px", marginBottom: "28px"
            }}>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem", letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                textTransform: "uppercase"
              }}>
                Quantity
              </span>
              <div style={{
                display: "flex", alignItems: "center",
                border: "1px solid rgba(255,255,255,0.1)"
              }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.04)",
                    border: "none", color: "#fff",
                    fontSize: "1.2rem", cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
                >−</button>
                <span style={{
                  width: "48px", textAlign: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, color: "#fff", fontSize: "1rem"
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  style={{
                    width: "40px", height: "40px",
                    background: "rgba(255,255,255,0.04)",
                    border: "none", color: "#fff",
                    fontSize: "1.2rem", cursor: "pointer",
                    transition: "background 0.2s"
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
                >+</button>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <button
                onClick={addToCart}
                disabled={product.stock === 0}
                style={{
                  padding: "16px",
                  background: added ? "#44ff88" : product.stock === 0 ? "#333" : "#f0e040",
                  color: added ? "#000" : product.stock === 0 ? "#666" : "#000",
                  border: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700, fontSize: "0.82rem",
                  letterSpacing: "2px", textTransform: "uppercase",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.3s"
                }}
              >
                {added ? "✓ ADDED TO CART!" : "ADD TO CART"}
              </button>

              <button
                onClick={() => { addToCart(); navigate("/checkout"); }}
                disabled={product.stock === 0}
                style={{
                  padding: "16px",
                  background: "transparent",
                  color: product.stock === 0 ? "#333" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${product.stock === 0 ? "#333" : "rgba(255,255,255,0.15)"}`,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600, fontSize: "0.82rem",
                  letterSpacing: "2px", textTransform: "uppercase",
                  cursor: product.stock === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.2s"
                }}
                onMouseEnter={e => {
                  if (product.stock > 0) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
                    e.currentTarget.style.color = "#fff";
                  }
                }}
                onMouseLeave={e => {
                  if (product.stock > 0) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                  }
                }}
              >
                BUY NOW
              </button>
            </div>

            {/* Features */}
            <div style={{
              marginTop: "36px",
              paddingTop: "28px",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexDirection: "column", gap: "12px"
            }}>
              {[
                { icon: "✦", text: "Free shipping on orders over $100" },
                { icon: "↩", text: "Easy 30-day returns" },
                { icon: "◈", text: "Secure payment guaranteed" }
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: "12px"
                }}>
                  <span style={{ color: "#f0e040", fontSize: "0.75rem" }}>{item.icon}</span>
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)"
                  }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}