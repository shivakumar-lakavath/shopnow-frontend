import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { productsData } from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = [
  { name: "All", icon: "✦" },
  { name: "Electronics", icon: "◈" },
  { name: "Clothing", icon: "◇" },
  { name: "Books", icon: "○" },
  { name: "Home", icon: "□" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const cat = searchParams.get("category") || "";
    const q = searchParams.get("search") || "";
    setCategory(cat);
    setSearch(q);
    setSearchInput(q);
  }, [searchParams]);

  useEffect(() => {
    filterProducts();
  }, [category, search]);

  const filterProducts = () => {
    setLoading(true);
    let filtered = [...productsData];
    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    if (search) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setProducts(filtered);
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearch(searchInput);
      navigate(`/products?search=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleCategoryChange = (cat) => {
    const newCat = cat === "All" ? "" : cat;
    setCategory(newCat);
    navigate(newCat ? `/products?category=${newCat}` : "/products");
  };

  const getSortedProducts = () => {
    const sorted = [...products];
    switch (sortBy) {
      case "price-low": return sorted.sort((a, b) => a.price - b.price);
      case "price-high": return sorted.sort((a, b) => b.price - a.price);
      case "rating": return sorted.sort((a, b) => b.rating - a.rating);
      case "discount": return sorted.sort((a, b) => b.discount - a.discount);
      default: return sorted;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .sort-select {
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          padding: 8px 14px;
          outline: none;
          cursor: pointer;
          letter-spacing: 1px;
        }
        .sort-select option { background: #1a1a1a; }
      `}</style>

      {/* ── Page Header ── */}
      {/* <div style={{
        background: "#0f0f0f",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 32px 32px"
      }}>
        <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "16px"
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "1px"
            }}>
              {sortedProducts.length} PRODUCTS FOUND
            </span>
          </div>
        </div>
      </div> */}

      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "32px" }}>

        {/* ── Filters Row ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap",
          gap: "16px", marginBottom: "40px",
          paddingBottom: "24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)"
        }}>
          {/* Category Filters */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {categories.map(cat => {
              const isActive = category === cat.name ||
                (cat.name === "All" && !category);
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  style={{
                    padding: "8px 18px",
                    border: isActive
                      ? "1px solid #f0e040"
                      : "1px solid rgba(255,255,255,0.1)",
                    background: isActive ? "#f0e040" : "transparent",
                    color: isActive ? "#000" : "rgba(255,255,255,0.5)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.75rem", letterSpacing: "1.5px",
                    cursor: "pointer",
                    fontWeight: isActive ? 700 : 400,
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                      e.currentTarget.style.color = "#fff";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                    }
                  }}
                >
                  {cat.icon} {cat.name.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Search + Sort */}
          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <form onSubmit={handleSearch} style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "0 14px", height: "38px"
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Search..."
                style={{
                  background: "transparent", border: "none",
                  outline: "none", color: "#fff",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.82rem", width: "140px"
                }}
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    navigate("/products");
                  }}
                  style={{
                    background: "none", border: "none",
                    color: "rgba(255,255,255,0.3)",
                    cursor: "pointer", padding: 0
                  }}
                >✕</button>
              )}
            </form>

            <select
              className="sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
            >
              <option value="default">SORT: DEFAULT</option>
              <option value="price-low">PRICE: LOW → HIGH</option>
              <option value="price-high">PRICE: HIGH → LOW</option>
              <option value="rating">TOP RATED</option>
              <option value="discount">BIGGEST DISCOUNT</option>
            </select>
          </div>
        </div>

        {/* ── Products Grid ── */}
        {loading ? (
          <div style={{
            textAlign: "center", padding: "100px",
            color: "rgba(255,255,255,0.2)",
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "4px", fontSize: "0.75rem"
          }}>
            <div style={{
              width: "40px", height: "40px",
              border: "1px solid rgba(240,224,64,0.3)",
              borderTop: "1px solid #f0e040",
              borderRadius: "50%",
              margin: "0 auto 24px",
              animation: "spin 1s linear infinite"
            }} />
            LOADING PRODUCTS...
          </div>
        ) : sortedProducts.length === 0 ? (
          <div style={{
            textAlign: "center", padding: "100px",
            fontFamily: "'DM Sans', sans-serif"
          }}>
            <div style={{
              fontSize: "3rem", marginBottom: "20px", opacity: 0.2
            }}>◈</div>
            <p style={{
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "3px", fontSize: "0.78rem"
            }}>
              NO PRODUCTS FOUND
            </p>
            <button
              onClick={() => {
                setCategory("");
                setSearch("");
                navigate("/products");
              }}
              style={{
                marginTop: "20px", padding: "10px 24px",
                background: "#f0e040", color: "#000",
                border: "none", fontFamily: "'DM Sans', sans-serif",
                fontWeight: 700, fontSize: "0.78rem",
                letterSpacing: "2px", cursor: "pointer"
              }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px"
          }}>
            {sortedProducts.map((product, i) => (
              <div
                key={product._id}
                style={{
                  animation: `fadeUp 0.4s ease ${i * 0.05}s forwards`,
                  opacity: 0
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}