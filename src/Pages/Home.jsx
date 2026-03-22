import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const brands = [
  { name: "SONY", tag: "Electronics" },
  { name: "ZARA", tag: "Fashion" },
  { name: "IKEA", tag: "Home" },
  { name: "APPLE", tag: "Tech" },
  { name: "H&M", tag: "Clothing" },
  { name: "NIKE", tag: "Sports" },
];

const heroSlides = [
  {
    title: "NEW SEASON",
    subtitle: "ARRIVALS 2025",
    description: "Discover the latest trends in fashion, tech and home living",
    bg: "#0a0a0a",
    accent: "#f0e040",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=90",
    tag: "SHOP NOW →"
  },
  {
    title: "TECH &",
    subtitle: "GADGETS",
    description: "Premium electronics at unbeatable prices",
    bg: "#0a1628",
    accent: "#00d4ff",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&q=90",
    tag: "EXPLORE →"
  },
  {
    title: "HOME",
    subtitle: "LIVING",
    description: "Transform your space with curated furniture and decor",
    bg: "#1a0f0a",
    accent: "#ff6b35",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=90",
    tag: "DISCOVER →"
  }
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setSlide(s => (s + 1) % heroSlides.length);
        setTransitioning(false);
      }, 400);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = heroSlides[slide];

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes marquee { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        .marquee-inner { animation: marquee 20s linear infinite; display:flex; gap:48px; white-space:nowrap; }
        .marquee-inner:hover { animation-play-state: paused; }
        .promo-card-hover:hover img { transform: scale(1.06) !important; }
      `}</style>

      {/* ── Hero ── */}
      <div style={{
        background: current.bg,
        minHeight: "92vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden",
        position: "relative",
        transition: "background 0.4s ease"
      }}>
        {/* Left */}
        <div style={{
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          opacity: transitioning ? 0 : 1,
          transition: "opacity 0.4s ease"
        }}>
          <div style={{
            fontSize: "0.72rem",
            letterSpacing: "4px",
            color: current.accent,
            marginBottom: "24px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500
          }}>
            ✦ ShopIQ COLLECTION
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 900,
            color: "#fff",
            lineHeight: 0.95,
            margin: "0 0 8px"
          }}>
            {current.title}
          </h1>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 900,
            color: current.accent,
            lineHeight: 0.95,
            margin: "0 0 32px"
          }}>
            {current.subtitle}
          </h1>

          <p style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: "380px",
            marginBottom: "48px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            {current.description}
          </p>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "16px 36px",
                background: current.accent,
                color: "#000",
                border: "none",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "2px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {current.tag}
            </button>
            <button
              onClick={() => navigate("/products")}
              style={{
                padding: "16px 36px",
                background: "transparent",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "2px",
                cursor: "pointer"
              }}
            >
              VIEW ALL
            </button>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: "8px", marginTop: "48px" }}>
            {heroSlides.map((_, i) => (
              <div
                key={i}
                onClick={() => setSlide(i)}
                style={{
                  width: i === slide ? "32px" : "8px",
                  height: "3px",
                  background: i === slide ? current.accent : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
              />
            ))}
          </div>
        </div>

        {/* Right - Image */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src={current.image}
            alt="hero"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: transitioning ? 0 : 0.85,
              filter: "saturate(0.9)",
              transition: "opacity 0.4s ease"
            }}
          />
          <div style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "16px 24px",
            color: "#fff"
          }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "3px", opacity: 0.6, fontFamily: "'DM Sans', sans-serif" }}>
              FEATURED
            </div>
            <div style={{ fontSize: "1.1rem", fontFamily: "'Playfair Display', serif", marginTop: "4px" }}>
              New Arrivals
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee Brands ── */}
      <div style={{ background: "#111", padding: "20px 0", overflow: "hidden" }}>
        <div className="marquee-inner">
          {[...brands, ...brands].map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem", fontWeight: 700,
                color: "#fff", letterSpacing: "3px"
              }}>
                {b.name}
              </span>
              <span style={{
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "2px",
                fontFamily: "'DM Sans', sans-serif"
              }}>
                {b.tag}
              </span>
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}>✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Promo Cards ── */}
      <div style={{ background: "#0a0a0a", padding: "80px 0" }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 32px" }}>

          {/* Section label */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", marginBottom: "40px"
          }}>
            <div>
              <div style={{
                fontSize: "0.68rem", letterSpacing: "4px",
                color: "#f0e040", marginBottom: "10px",
                fontFamily: "'DM Sans', sans-serif", fontWeight: 500
              }}>
                ✦ EXPLORE CATEGORIES
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "2.2rem", fontWeight: 900,
                color: "#fff", margin: 0
              }}>
                Shop by Style
              </h2>
            </div>
            <button
              onClick={() => navigate("/products")}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem", letterSpacing: "2px",
                color: "rgba(255,255,255,0.4)",
                background: "none",
                border: "1px solid rgba(255,255,255,0.12)",
                padding: "10px 24px", cursor: "pointer",
                transition: "all 0.2s", textTransform: "uppercase"
              }}
              onMouseEnter={e => {
                e.target.style.color = "#fff";
                e.target.style.borderColor = "rgba(255,255,255,0.35)";
              }}
              onMouseLeave={e => {
                e.target.style.color = "rgba(255,255,255,0.4)";
                e.target.style.borderColor = "rgba(255,255,255,0.12)";
              }}
            >
              View All →
            </button>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridTemplateRows: "280px 280px",
            gap: "16px"
          }}>

            {/* Card 1 — Fashion */}
            <div
              className="promo-card-hover"
              onClick={() => navigate("/products?category=Clothing")}
              style={{
                gridRow: "span 2", position: "relative",
                overflow: "hidden", cursor: "pointer", background: "#111"
              }}
              onMouseEnter={e => e.currentTarget.querySelector(".card-overlay").style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.querySelector(".card-overlay").style.opacity = "0"}
            >
              <img
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80"
                alt="Fashion"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.7, transition: "transform 0.6s ease"
                }}
              />
              <div className="card-overlay" style={{
                position: "absolute", inset: 0,
                background: "rgba(240,224,64,0.08)",
                opacity: 0, transition: "opacity 0.3s"
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
              }} />
              <div style={{
                position: "absolute", top: "24px", left: "24px",
                background: "#f0e040", color: "#000",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem", fontWeight: 700,
                letterSpacing: "2px", padding: "5px 12px"
              }}>
                UP TO 40% OFF
              </div>
              <div style={{ position: "absolute", bottom: "32px", left: "32px", right: "32px" }}>
                <div style={{
                  fontSize: "0.65rem", letterSpacing: "3px",
                  color: "rgba(255,255,255,0.5)",
                  fontFamily: "'DM Sans', sans-serif", marginBottom: "8px"
                }}>
                  FASHION FORWARD
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.4rem", fontWeight: 900,
                  color: "#fff", margin: "0 0 16px", lineHeight: 1.1
                }}>
                  New Season<br />Arrivals
                </h3>
                <div style={{
                  color: "#f0e040", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem", letterSpacing: "2px", fontWeight: 600
                }}>
                  SHOP NOW →
                </div>
              </div>
            </div>

            {/* Card 2 — Electronics */}
            <div
              className="promo-card-hover"
              onClick={() => navigate("/products?category=Electronics")}
              style={{
                position: "relative", overflow: "hidden",
                cursor: "pointer", background: "#0a1628",
                gridColumn: "2", gridRow: "1"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80"
                alt="Electronics"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.5, transition: "transform 0.6s ease"
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.4) 100%)"
              }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
                <div style={{
                  fontSize: "0.62rem", letterSpacing: "3px",
                  color: "#00d4ff", fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "6px", fontWeight: 600
                }}>
                  NEW ARRIVALS
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", fontWeight: 900,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.1
                }}>
                  Smart Tech &<br />Gadgets
                </h3>
                <div style={{
                  color: "#00d4ff", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "2px", fontWeight: 600
                }}>
                  EXPLORE →
                </div>
              </div>
            </div>

            {/* Card 3 — Books */}
            <div
              className="promo-card-hover"
              onClick={() => navigate("/products?category=Books")}
              style={{
                position: "relative", overflow: "hidden",
                cursor: "pointer", background: "#1a0f0a",
                gridColumn: "3", gridRow: "1"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80"
                alt="Books"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.5, transition: "transform 0.6s ease"
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(26,15,10,0.95) 0%, rgba(26,15,10,0.4) 100%)"
              }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
                <div style={{
                  fontSize: "0.62rem", letterSpacing: "3px",
                  color: "#ff6b35", fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "6px", fontWeight: 600
                }}>
                  CURATED PICKS
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", fontWeight: 900,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.1
                }}>
                  Premium<br />Books
                </h3>
                <div style={{
                  color: "#ff6b35", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "2px", fontWeight: 600
                }}>
                  DISCOVER →
                </div>
              </div>
            </div>

            {/* Card 4 — Home */}
            <div
              className="promo-card-hover"
              onClick={() => navigate("/products?category=Home")}
              style={{
                position: "relative", overflow: "hidden",
                cursor: "pointer", background: "#0f1a0f",
                gridColumn: "2", gridRow: "2"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80"
                alt="Home"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.5, transition: "transform 0.6s ease"
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(15,26,15,0.95) 0%, rgba(15,26,15,0.4) 100%)"
              }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
                <div style={{
                  fontSize: "0.62rem", letterSpacing: "3px",
                  color: "#44cc88", fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "6px", fontWeight: 600
                }}>
                  LIVING SPACE
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", fontWeight: 900,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.1
                }}>
                  Home &<br />Furniture
                </h3>
                <div style={{
                  color: "#44cc88", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "2px", fontWeight: 600
                }}>
                  SHOP NOW →
                </div>
              </div>
            </div>

            {/* Card 5 — Sports */}
            <div
              className="promo-card-hover"
              onClick={() => navigate("/products")}
              style={{
                position: "relative", overflow: "hidden",
                cursor: "pointer", background: "#1a0a1a",
                gridColumn: "3", gridRow: "2"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"
                alt="Sports"
                style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: 0.5, transition: "transform 0.6s ease"
                }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(26,10,26,0.95) 0%, rgba(26,10,26,0.4) 100%)"
              }} />
              <div style={{ position: "absolute", bottom: "28px", left: "28px", right: "28px" }}>
                <div style={{
                  fontSize: "0.62rem", letterSpacing: "3px",
                  color: "#cc88ff", fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "6px", fontWeight: 600
                }}>
                  ALL PRODUCTS
                </div>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", fontWeight: 900,
                  color: "#fff", margin: "0 0 12px", lineHeight: 1.1
                }}>
                  Sports &<br />Lifestyle
                </h3>
                <div style={{
                  color: "#cc88ff", fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", letterSpacing: "2px", fontWeight: 600
                }}>
                  VIEW ALL →
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom Banner ── */}
      <div style={{
        background: "#111",
        padding: "80px 32px",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "0.7rem", letterSpacing: "4px",
          color: "#f0e040", marginBottom: "16px",
          fontFamily: "'DM Sans', sans-serif"
        }}>
          ✦ LIMITED TIME OFFER
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 900, color: "#fff", margin: "0 0 16px"
        }}>
          Get 20% Off Your First Order
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.5)",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: "40px", fontSize: "1rem"
        }}>
          Sign up today and unlock exclusive deals
        </p>
        <button
          onClick={() => navigate("/register")}
          style={{
            padding: "18px 48px",
            background: "#f0e040", color: "#000",
            border: "none", fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700, fontSize: "0.85rem",
            letterSpacing: "2px", cursor: "pointer"
          }}
        >
          SIGN UP FREE →
        </button>
      </div>

    </div>
  );
}