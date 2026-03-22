import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);
  const [wishlist, setWishlist] = useState(false);

const addToCart = async (e) => {
  e.stopPropagation();
  setAdding(true);
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const discountedPrice = product.discount
      ? parseFloat((product.price - (product.price * product.discount) / 100).toFixed(2))
      : product.price;

    await axios.post(
      "/cart",
      {
        productId: product._id,
        name: product.name,
        price: discountedPrice,
        quantity: 1,
        imageUrl: product.imageUrl
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

   setAdded(true);
setTimeout(() => setAdded(false), 2000);
  } catch (err) {
    console.error("Add to cart error:", err);
    if (err.response?.status === 401) {
      navigate("/login");
    } else {
      alert("Failed to add to cart. Please try again.");
    }
  } finally {
    setAdding(false);
  }
};

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setWishlist(w => !w);
  };

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : null;

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #eee",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 28px rgba(118,75,162,0.15)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      {/* Image Container */}
      <div style={{
        position: "relative",
        height: "200px",
        background: "#f8f8f8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}>
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s"
            }}
            onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"}
          />
        ) : (
          <span style={{ fontSize: "4rem" }}>🛍️</span>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "#dc2626",
            color: "#fff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: "700"
          }}>
            -{product.discount}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {product.stock === 0 && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{
              background: "#fff",
              color: "#dc2626",
              fontWeight: "700",
              padding: "6px 16px",
              borderRadius: "20px",
              fontSize: "0.85rem"
            }}>
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "34px",
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            fontSize: "1rem",
            transition: "transform 0.2s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.15)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          {wishlist ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Card Body */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Category Tag */}
        {product.category && (
          <span style={{
            fontSize: "0.72rem",
            fontWeight: "600",
            color: "#764ba2",
            background: "#f5f3ff",
            padding: "3px 10px",
            borderRadius: "20px",
            alignSelf: "flex-start",
            marginBottom: "8px"
          }}>
            {product.category}
          </span>
        )}

        {/* Product Name */}
        <h3 style={{
          fontSize: "0.95rem",
          fontWeight: "700",
          color: "#1a1a1a",
          margin: "0 0 6px",
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p style={{
            fontSize: "0.82rem",
            color: "#888",
            margin: "0 0 12px",
            lineHeight: "1.5",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1
          }}>
            {product.description}
          </p>
        )}

        {/* Rating */}
        {product.rating && (
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            marginBottom: "10px"
          }}>
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                style={{
                  fontSize: "0.8rem",
                  color: star <= Math.round(product.rating) ? "#f59e0b" : "#d1d5db"
                }}
              >
                ★
              </span>
            ))}
            <span style={{ fontSize: "0.78rem", color: "#888", marginLeft: "4px" }}>
              ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price Row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "auto"
        }}>
          <div>
            <span style={{
              fontSize: "1.2rem",
              fontWeight: "800",
              color: "#764ba2"
            }}>
              ${discountedPrice ? discountedPrice.toFixed(2) : product.price?.toFixed(2)}
            </span>
            {discountedPrice && (
              <span style={{
                fontSize: "0.82rem",
                color: "#aaa",
                textDecoration: "line-through",
                marginLeft: "6px"
              }}>
                ${product.price?.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Indicator */}
          {product.stock > 0 && product.stock <= 5 && (
            <span style={{
              fontSize: "0.72rem",
              color: "#dc2626",
              fontWeight: "600"
            }}>
              Only {product.stock} left!
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={addToCart}
          disabled={product.stock === 0 || adding}
          style={{
            marginTop: "14px",
            width: "100%",
            padding: "10px",
            background: added
              ? "#16a34a"
              : product.stock === 0
              ? "#e5e7eb"
              : "linear-gradient(135deg, #667eea, #764ba2)",
            color: product.stock === 0 ? "#9ca3af" : "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "0.9rem",
            cursor: product.stock === 0 ? "not-allowed" : "pointer",
            transition: "all 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px"
          }}
        >
          {adding
            ? "Adding..."
            : added
            ? "✓ Added!"
            : product.stock === 0
            ? "Out of Stock"
            : "🛒 Add to Cart"
          }
        </button>
      </div>
    </div>
  );
}