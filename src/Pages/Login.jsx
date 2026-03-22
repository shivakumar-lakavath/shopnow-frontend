import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./login.css"
const loginSlides = [
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",  // Fashion store interior
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",  // Smart watch
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80",  // Sports shoes
  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=800&q=80"   // Tech/Electronics
];

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const [bgSlide, setBgSlide] = useState(0);
const [bgTransition, setBgTransition] = useState(false);
  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };
useEffect(() => {
  const timer = setInterval(() => {
    setBgTransition(true);
    setTimeout(() => {
      setBgSlide(s => (s + 1) % loginSlides.length);
      setBgTransition(false);
    }, 500);
  }, 4000);
  return () => clearInterval(timer);
}, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
<style>{`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes fadeRight {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes pulse {
    0%, 100% { opacity:1; transform:scale(1); }
    50%       { opacity:0.4; transform:scale(0.75); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:1; }
    100% { transform: translateY(100vh); opacity:0; }
  }
  @keyframes shimmer {
    0%   { left: -100%; }
    100% { left: 200%; }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(0,255,135,0.1); }
    50%       { border-color: rgba(0,255,135,0.4); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes countUp {
    from { opacity:0; transform:translateY(12px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,135,0); }
    50%       { box-shadow: 0 0 24px 4px rgba(0,255,135,0.12); }
  }
  @keyframes typewriter {
    from { width: 0; }
    to   { width: 100%; }
  }
  @keyframes revealUp {
    from { clip-path: inset(100% 0 0 0); transform:translateY(20px); }
    to   { clip-path: inset(0% 0 0 0); transform:translateY(0); }
  }

  /* Text animations */
  .headline-1 {
    animation: revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
  }
  .headline-2 {
    animation: revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.25s both;
  }
  .headline-3 {
    animation: revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both;
  }
  .desc-text {
    animation: fadeUp 0.7s ease 0.55s both;
  }
  .stats-row {
    animation: fadeUp 0.7s ease 0.7s both;
  }
  .form-card {
    animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }

  /* Gradient text */
  .gradient-heading {
    background: linear-gradient(135deg, #00ff87, #00d4aa, #00ff87);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: revealUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both,
               gradientShift 4s ease infinite 1s !important;
  }

  /* Input */
  .login-input {
    width: 100%;
    padding: 14px 16px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    outline: none;
    transition: all 0.3s;
    box-sizing: border-box;
    letter-spacing: 0.3px;
  }
  .login-input:focus {
    background: rgba(0,255,135,0.04);
    border-color: rgba(0,255,135,0.4);
    box-shadow: 0 0 0 3px rgba(0,255,135,0.06);
  }
  .login-input::placeholder { color: rgba(255,255,255,0.22); }

  /* Button */
  .login-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #00ff87, #00d4aa);
    color: #000;
    border: none;
    font-family: 'DM Sans', sans-serif;
    font-weight: 700;
    font-size: 0.82rem;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
  }
  .login-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
    animation: shimmer 2.5s ease infinite 1.5s;
  }
  .login-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(0,255,135,0.35);
    background: linear-gradient(135deg, #00ff87, #00e5aa);
  }
  .login-btn:active:not(:disabled) {
    transform: translateY(0px);
  }
  .login-btn:disabled { opacity:0.5; cursor:not-allowed; }

  /* Eye button */
  .eye-btn {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: rgba(255,255,255,0.3);
    cursor: pointer;
    padding: 4px;
    transition: color 0.2s;
    display: flex;
    align-items: center;
  }
  .eye-btn:hover { color: #00ff87; }

  /* Stat cards */
  .stat-card {
    padding: 12px 16px;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    flex: 1;
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    animation: countUp 0.5s ease both;
  }
  .stat-card:nth-child(1) { animation-delay: 0.7s; }
  .stat-card:nth-child(2) { animation-delay: 0.82s; }
  .stat-card:nth-child(3) { animation-delay: 0.94s; }
  .stat-card:hover {
    border-color: rgba(0,255,135,0.25);
    background: rgba(0,255,135,0.04);
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0,255,135,0.08);
  }

  /* Dot pulse */
  .dot-pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #00ff87;
    animation: pulse 2s ease-in-out infinite;
  }

  /* Badge */
  .members-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0,255,135,0.06);
    border: 1px solid rgba(0,255,135,0.2);
    padding: 6px 16px;
    margin-bottom: 28px;
    animation: fadeIn 0.5s ease 0.05s both, borderPulse 3s ease infinite 1s;
  }

  /* Logo float */
  .logo-float {
    animation: float 4s ease-in-out infinite;
  }

  /* Form inputs stagger */
  .input-group-1 { animation: fadeUp 0.5s ease 0.5s both; }
  .input-group-2 { animation: fadeUp 0.5s ease 0.6s both; }
  .btn-group     { animation: fadeUp 0.5s ease 0.7s both; }
  .links-group   { animation: fadeUp 0.5s ease 0.8s both; }

  /* Scanline */
  .scanline {
    position: absolute;
    width: 100%;
    height: 120px;
    background: linear-gradient(to bottom,
      transparent,
      rgba(0,255,135,0.015),
      transparent
    );
    animation: scanline 10s linear infinite;
    pointer-events: none;
  }

  /* Grid pattern animation */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(0,255,135,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,255,135,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: fadeIn 1s ease 0.3s both;
  }

  /* Welcome text */
  .welcome-label { animation: fadeUp 0.5s ease 0.35s both; }
  .welcome-title { animation: fadeUp 0.5s ease 0.45s both; }
  @keyframes starSpin {
  0%   { transform: rotate(0deg) scale(1); }
  50%  { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}
.logo-star {
  display: inline-block;
  animation: starSpin 4s ease-in-out infinite;
  color: #00ff87;
  font-size: 1.1rem;
}
`}</style>

      <div style={{
        minHeight: "100vh",
        background: "#080808",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden"
      }}>

{/* ── Left Panel ── */}
<div style={{
  position: "relative",
  background: "#0a0a0a",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "80px 60px",
  overflow: "hidden"
}}>

  {/* ✅ LOGO */}
  <div
    onClick={() => navigate("/")}
    style={{
      position: "absolute",
      top: "17px",
      left: "27px",
      zIndex: 10,
      cursor: "pointer",
      animation: "fadeUp 0.6s ease 0.1s both"
    }}
  >
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "4px"
    }}>
<span style={{
  fontFamily: "'Playfair Display', serif",
  fontSize: "1.5rem",
  fontWeight: 900,
  background: "linear-gradient(135deg, #00ff87, #f0e040, #00ff87)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  animation: "gradientShift 3s ease infinite",
  letterSpacing: "1px"
}}>
  ShopIQ
</span>
    </div>

    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      paddingLeft: "4px"
    }}>
      <div style={{
        width: "20px",
        height: "1px",
        background: "rgba(0,255,135,0.4)"
      }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.65rem",
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "2px",
        textTransform: "uppercase"
      }}>
        by Shiva Lakavath
      </span>
    </div>
  </div>

  {/* Background Images */}
  {loginSlides.map((img, i) => (
    <img
      key={i}
      src={img}
      alt="fashion"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        opacity: i === bgSlide ? (bgTransition ? 0 : 0.4) : 0,
        filter: "saturate(0.85)",
        transition: "opacity 0.8s ease",
        zIndex: 0
      }}
    />
  ))}

  {/* Slide Indicators */}
  <div style={{
    position: "absolute",
    bottom: "32px",
    left: "60px",
    display: "flex",
    gap: "6px",
    zIndex: 2
  }}>
    {loginSlides.map((_, i) => (
      <div
        key={i}
        onClick={() => setBgSlide(i)}
        style={{
          width: i === bgSlide ? "24px" : "6px",
          height: "3px",
          background: i === bgSlide
            ? "#00ff87"
            : "rgba(255,255,255,0.25)",
          cursor: "pointer",
          transition: "all 0.3s ease",
          borderRadius: "2px"
        }}
      />
    ))}
  </div>

  {/* Gradient Overlay */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(135deg, rgba(8,8,8,0.95) 0%, rgba(8,8,8,0.6) 100%)"
  }} />

  {/* Content */}
  <div style={{ position: "relative", zIndex: 1, width: "100%" }}>

    {/* Members Badge */}
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "rgba(240,224,64,0.1)",
      border: "1px solid rgba(240,224,64,0.2)",
      padding: "6px 16px",
      marginTop:'62px'
    //   marginBottom: "28px"
    }}>
      <div style={{
        width: "6px",
        height: "6px",
        borderRadius: "50%",
        background: "#f0e040"
      }} />
      <span style={{
        fontSize: "0.68rem",
        letterSpacing: "3px",
        color: "#f0e040",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 600
      }}>
        MEMBERS ONLY
      </span>
    </div>

    {/* Headings */}
    <h1 className="headline-1" style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
      fontWeight: 900,
      color: "#fff",
      margin: "0 0 8px"
    }}>
      Your Style.
    </h1>

    <h1 className="headline-2" style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
      fontWeight: 900,
      color: "#fff",
      margin: "0 0 8px"
    }}>
      Your Orders.
    </h1>

    <h1 className="headline-3 gradient-heading" style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(2.4rem, 4vw, 3.8rem)",
      fontWeight: 900,
      margin: "0 0 28px"
    }}>
      Your ShopIQ.
    </h1>

    {/* Description */}
    <p style={{
      color: "rgba(255,255,255,0.4)",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: "0.88rem",
      lineHeight: 1.8,
      maxWidth: "300px",
      marginBottom: "40px",
      borderLeft: "2px solid rgba(240,224,64,0.3)",
      paddingLeft: "16px"
    }}>
      Premium shopping experience with exclusive deals, real-time order tracking and personalised recommendations.
    </p>

    {/* ✅ STATS (FIXED BACK) */}
    <div style={{ display: "flex", gap: "12px" }}>
      {[
        { num: "50K+", label: "Customers", icon: "◈" },
        { num: "10K+", label: "Products", icon: "✦" },
        { num: "4.9★", label: "Rating", icon: "○" }
      ].map(stat => (
        <div key={stat.label} style={{
          padding: "12px 16px",
          border: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
          flex: 1
        }}>
          <div style={{
            fontSize: "0.6rem",
            color: "#f0e040",
            letterSpacing: "2px",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: "6px"
          }}>
            {stat.icon}
          </div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#fff"
          }}>
            {stat.num}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "1px",
            marginTop: "2px"
          }}>
            {stat.label.toUpperCase()}
          </div>
        </div>
      ))}
    </div>

  </div>
</div>

        {/* ── Right Panel — Form ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 48px",
          background: "#0f0f0f",
          position: "relative"
        }}>

          {/* Grid pattern */}
          <div className="grid-bg" />
<div className="scanline" />

          <div className="form-card" style={{
            width: "100%", maxWidth: "400px",
            position: "relative", zIndex: 1
          }}>

         <div style={{
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "12px"
}}>
  <div style={{
    height: "1px",
    width: "40px",
    background: "linear-gradient(to right, transparent, rgba(0,255,135,0.4))"
  }} />

  <span style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "4px",
    fontWeight: 600,
    background: "linear-gradient(90deg, #00ff87, #00d4aa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  }}>
    SIGN IN
  </span>

  <div style={{
    height: "1px",
    width: "40px",
    background: "linear-gradient(to left, transparent, rgba(0,255,135,0.4))"
  }} />
</div>

           <h2 style={{
  fontFamily: "'Playfair Display', serif",
  fontSize: "2rem",
  fontWeight: 700,

  // 👇 upgraded color (soft premium white)
  color: "#f5f5f5",

  // 👇 depth + glow
  textShadow: `
    0 1px 0 rgba(255,255,255,0.15),
    0 4px 12px rgba(0,0,0,0.6),
    0 0 10px rgba(0,255,135,0.08)
  `,

  letterSpacing: "0.5px",
  margin: "0 0 40px",
  textAlign: "center"   // ✅ aligns with SIGN IN
}}>
  Welcome back
</h2>

            {/* Error */}
            {error && (
              <div style={{
                padding: "12px 16px",
                background: "rgba(220,38,38,0.1)",
                border: "1px solid rgba(220,38,38,0.25)",
                color: "#ff6b6b",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.85rem", marginBottom: "24px"
              }}>
                ⚠ {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "8px", textTransform: "uppercase"
                }}>
                  Email Address
                </label>
                <input
                  name="email" type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="login-input"
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.72rem", fontWeight: 600,
                  letterSpacing: "2px",
                  color: "rgba(255,255,255,0.45)",
                  marginBottom: "8px", textTransform: "uppercase"
                }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="login-input"
                    style={{ paddingRight: "44px" }}
                  />
                  <button
                    type="button" className="eye-btn"
                    onClick={() => setShowPassword(s => !s)}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit" className="login-btn"
                disabled={loading}
              >
                {loading ? "SIGNING IN..." : "SIGN IN →"}
              </button>
            </form>

            {/* Divider */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "16px", margin: "28px 0"
            }}>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.25)",
                letterSpacing: "1px"
              }}>OR</span>
              <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
            </div>

            {/* Register link */}
            <p style={{
              textAlign: "center",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.3)"
            }}>
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                style={{ color: "#f0e040", cursor: "pointer", fontWeight: 600 }}
              >
                Sign up free
              </span>
            </p>

            {/* <p
              onClick={() => navigate("/")}
              style={{
                textAlign: "center", marginTop: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)",
                cursor: "pointer", letterSpacing: "1px"
              }}
            >
              ← BACK TO HOME
            </p> */}

          </div>
        </div>
      </div>
    </>
  );
}