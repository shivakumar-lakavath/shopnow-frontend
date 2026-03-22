import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
import shivaImg from "../assets/shiva.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchCartCount();
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get("/cart");
      const count = res.data.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    } catch {
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCartCount(0);
    navigate("/");
  };

const handleSearch = (e) => {
  e.preventDefault();
  if (searchQuery.trim()) {
    navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  }
};

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/products" },
  { label: "Orders", path: "/orders" },
];

const isActive = (path) => {
  if (path === "/") return location.pathname === "/";
  return location.pathname.startsWith(path.split("?")[0]);
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-link {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.75);
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px 4px;
          transition: color 0.2s;
          text-transform: uppercase;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: #f0e040;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #fff; }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active { color: #f0e040; }
        .nav-link.active::after { width: 100%; background: #f0e040; }

        .search-input {
          background: transparent;
          border: none;
          outline: none;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          width: 100%;
          letter-spacing: 0.5px;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.35); }

        .cart-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          transition: transform 0.2s;
        }
        .cart-btn:hover { transform: scale(1.1); }

        .auth-btn-outline {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 9px 22px;
          background: transparent;
          color: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.25);
          cursor: pointer;
          transition: all 0.2s;
        }
        .auth-btn-outline:hover {
          background: rgba(255,255,255,0.08);
          color: #fff;
          border-color: rgba(255,255,255,0.5);
        }

        .auth-btn-solid {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 9px 22px;
          background: #f0e040;
          color: #000;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .auth-btn-solid:hover {
          background: #fff;
          transform: translateY(-1px);
        }

        .mobile-menu {
          background: #0f0f0f;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-trigger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-trigger { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled
          ? "rgba(10, 10, 10, 0.97)"
          : "#0f0f0f",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid rgba(255,255,255,0.04)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all 0.4s ease",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none"
      }}>
        <div style={{
          maxWidth: "1400px",
         margin: "0 auto",
padding: "0 32px",
justifyContent: "space-between",
          height: "68px",
          display: "flex",
          alignItems: "center",
          gap: "40px"
        }}>

         {/* Logo */}
{/* Logo */}
<div
  onClick={() => navigate("/")}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "14px",
    cursor: "pointer",
    flexShrink: 0
  }}
>
  {/* Photo Avatar - bigger */}
  <div style={{
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    overflow: "hidden",
    flexShrink: 0,
    boxShadow: "0 0 0 2.5px #f0e040, 0 6px 20px rgba(240,224,64,0.25)",
    position: "relative"
  }}>
    <img
      src={shivaImg}
      alt="LSK"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "center top",
        transform: "scale(1.1)"
      }}
    />
    {/* Online dot */}
    <div style={{
      position: "absolute",
      bottom: "2px",
      right: "2px",
      width: "11px",
      height: "11px",
      background: "#44ff88",
      borderRadius: "50%",
      border: "2px solid #0f0f0f"
    }} />
  </div>

  {/* ShopNow text */}
  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
  
  {/* ShopIQ */}
 <span style={{
fontFamily: "'Playfair Display', serif",
  fontSize: "1.5rem",
  fontWeight: 900,
  background: "linear-gradient(135deg, #00ff87, #f0e040, #00ff87)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientShift 3s ease infinite",
  letterSpacing: "1px",
  textShadow: `
    0 1px 0 rgba(255,255,255,0.2),
    0 0 8px rgba(0,230,118,0.4),
    0 0 18px rgba(0,230,118,0.25),
    0 4px 12px rgba(0,0,0,0.6)
  `
}}>
  ShopIQ
</span>

  {/* Subtitle */}
  <span style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.62rem",
    color: "rgba(255,255,255,0.55)",
    letterSpacing: "3px",
    lineHeight: 1,
    marginTop: "4px",

    // subtle glow line feel
    textShadow: "0 0 6px rgba(0,255,135,0.3)"
  }}>
    BY • SHIVA LAKAVATH
  </span>

</div>
</div>

          {/* Divider */}
          <div style={{
            width: "1px",
            height: "24px",
            background: "rgba(255,255,255,0.1)",
            flexShrink: 0
          }} />

          {/* Nav Links - desktop */}
          <div className="desktop-nav" style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flexShrink: 0
          }}>
            {navLinks.map(link => (
              <button
                key={link.label}
                className={`nav-link ${isActive(link.path) ? "active" : ""}`}
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0 16px",
              height: "40px",
              transition: "all 0.2s",
              maxWidth: "400px"
            }}
            onFocus={e => e.currentTarget.style.border = "1px solid rgba(240,224,64,0.4)"}
            onBlur={e => e.currentTarget.style.border = "1px solid rgba(255,255,255,0.1)"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  fontSize: "1rem",
                  padding: 0,
                  lineHeight: 1
                }}
              >✕</button>
            )}
          </form>

          {/* Right side — desktop */}
          <div className="desktop-nav" style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0
          }}>
            {/* Cart */}
            <button
              className="cart-btn"
              onClick={() => navigate("/cart")}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "#f0e040",
                  color: "#000",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "0.6rem",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Divider */}
            <div style={{
              width: "1px",
              height: "20px",
              background: "rgba(255,255,255,0.1)"
            }} />

            {/* Auth */}
           {isLoggedIn ? (
  <button className="auth-btn-outline" onClick={handleLogout}>
    Logout
  </button>
) : (
  <div style={{ display: "flex", gap: "10px" }}>
    <button
      className="auth-btn-outline"
      onClick={() => navigate("/login")}
      style={{
        background: location.pathname === "/login"
          ? "rgba(240,224,64,0.1)"
          : "transparent",
        borderColor: location.pathname === "/login"
          ? "#f0e040"
          : "rgba(255,255,255,0.25)",
        color: location.pathname === "/login"
          ? "#f0e040"
          : "rgba(255,255,255,0.8)"
      }}
    >
      Login
    </button>
    <button
      className="auth-btn-outline"
      onClick={() => navigate("/register")}
      style={{
        background: location.pathname === "/register"
          ? "rgba(240,224,64,0.1)"
          : "transparent",
        borderColor: location.pathname === "/register"
          ? "#f0e040"
          : "rgba(255,255,255,0.25)",
        color: location.pathname === "/register"
          ? "#f0e040"
          : "rgba(255,255,255,0.8)"
      }}
    >
      Sign Up
    </button>
  </div>
)}
          </div>

          {/* Mobile right */}
          <div className="mobile-trigger" style={{
            display: "none",
            alignItems: "center",
            gap: "12px",
            marginLeft: "auto"
          }}>
            <button className="cart-btn" onClick={() => navigate("/cart")}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                  background: "#f0e040",
                  color: "#000",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "0.6rem",
                  fontWeight: "800",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                gap: "5px"
              }}
            >
              {[0,1,2].map(i => (
                <div key={i} style={{
                  width: "22px",
                  height: "1.5px",
                  background: menuOpen && i === 1 ? "transparent" : "#fff",
                  transform: menuOpen
                    ? i === 0 ? "translateY(6.5px) rotate(45deg)"
                    : i === 2 ? "translateY(-6.5px) rotate(-45deg)" : "none"
                    : "none",
                  transition: "all 0.3s"
                }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {navLinks.map(link => (
              <button
                key={link.label}
                onClick={() => { navigate(link.path); setMenuOpen(false); }}
                style={{
                  background: "none",
                  border: "none",
                  color: isActive(link.path) ? "#f0e040" : "rgba(255,255,255,0.7)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  padding: "12px 0",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                {link.label}
              </button>
            ))}
            <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
              {isLoggedIn ? (
                <button className="auth-btn-outline" style={{ flex: 1 }}
                  onClick={() => { handleLogout(); setMenuOpen(false); }}>
                  Logout
                </button>
              ) : (
                <>
                  <button className="auth-btn-outline" style={{ flex: 1 }}
                    onClick={() => { navigate("/login"); setMenuOpen(false); }}>
                    Login
                  </button>
                  <button className="auth-btn-solid" style={{ flex: 1 }}
                    onClick={() => { navigate("/register"); setMenuOpen(false); }}>
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}