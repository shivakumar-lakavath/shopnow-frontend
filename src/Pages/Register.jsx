import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const validate = () => {
    if (!form.fullName || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        password: form.password
      });
      localStorage.setItem("token", res.data.token);
      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: "WEAK", color: "#ff4444", width: "30%", bg: "rgba(255,68,68,0.1)" };
    if (p.length < 10) return { label: "MEDIUM", color: "#f0e040", width: "65%", bg: "rgba(240,224,64,0.1)" };
    return { label: "STRONG", color: "#44ff88", width: "100%", bg: "rgba(68,255,136,0.1)" };
  };

  const strength = getPasswordStrength();

  if (success) return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: "20px",
      fontFamily: "'Playfair Display', serif"
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');
      @keyframes popIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>
      <div style={{
        width: "80px", height: "80px",
        background: "rgba(68,255,136,0.1)",
        border: "1px solid rgba(68,255,136,0.3)",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem",
        animation: "popIn 0.5s ease forwards"
      }}>✓</div>
      <h2 style={{
        color: "#fff", fontSize: "2rem", fontWeight: 700, margin: 0
      }}>Account Created!</h2>
      <p style={{
        color: "rgba(255,255,255,0.4)",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "2px", fontSize: "0.8rem"
      }}>
        REDIRECTING TO STORE...
      </p>
      <div style={{
        width: "200px", height: "2px",
        background: "rgba(255,255,255,0.08)",
        borderRadius: "2px", overflow: "hidden"
      }}>
        <div style={{
          height: "100%", background: "#f0e040",
          animation: "slideIn 2s linear forwards"
        }} />
      </div>
      <style>{`@keyframes slideIn { from { width: 0; } to { width: 100%; } }`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50%       { transform: translateY(-18px) rotate(12deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50%       { transform: translateY(-12px) rotate(-8deg); }
        }
        @keyframes floatC {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-20px); }
        }

        .reg-input {
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
        .reg-input:focus {
          background: rgba(255,255,255,0.07);
          border-color: rgba(240,224,64,0.5);
          box-shadow: 0 0 0 3px rgba(240,224,64,0.06);
        }
        .reg-input::placeholder { color: rgba(255,255,255,0.25); }
        .reg-input.valid { border-color: rgba(68,255,136,0.4); }
        .reg-input.invalid { border-color: rgba(255,68,68,0.4); }

        .reg-btn {
          width: 100%;
          padding: 15px;
          background: #f0e040;
          color: #000;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.25s;
          margin-top: 8px;
        }
        .reg-btn:hover:not(:disabled) {
          background: #fff;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(240,224,64,0.25);
        }
        .reg-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }
        .eye-btn:hover { color: rgba(255,255,255,0.7); }

        .form-label {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.45);
          margin-bottom: 8px;
          text-transform: uppercase;
        }

        .reg-card { animation: fadeUp 0.7s ease forwards; }
      `}</style>

      <div style={{
        minHeight: "100vh",
        background: "#080808",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        overflow: "hidden"
      }}>

        {/* ── Left Panel — Visual ── */}
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
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
            alt="fashion"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover",
              opacity: 0.18, filter: "saturate(0.6)"
            }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.55) 100%)"
          }} />

          {/* Floating decorative elements */}
          <div style={{
            position: "absolute", top: "12%", right: "10%",
            width: "120px", height: "160px",
            background: "rgba(240,224,64,0.05)",
            border: "1px solid rgba(240,224,64,0.12)",
            animation: "floatA 6s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", bottom: "18%", right: "20%",
            width: "90px", height: "120px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            animation: "floatB 8s ease-in-out infinite"
          }} />
          <div style={{
            position: "absolute", top: "50%", right: "6%",
            width: "50px", height: "50px",
            border: "1px solid rgba(240,224,64,0.18)",
            borderRadius: "50%",
            animation: "floatC 7s ease-in-out infinite"
          }} />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              onClick={() => navigate("/")}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.6rem", fontWeight: 700,
                color: "#fff", cursor: "pointer",
                marginBottom: "80px",
                display: "flex", alignItems: "center", gap: "8px"
              }}
            >
              <span style={{ color: "#f0e040" }}>✦</span> ShopIQ
            </div>

            <div style={{
              fontSize: "0.68rem", letterSpacing: "4px",
              color: "#f0e040", marginBottom: "20px",
              fontFamily: "'DM Sans', sans-serif", fontWeight: 500
            }}>
              ✦ JOIN US TODAY
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900, color: "#fff",
              lineHeight: 1.0, margin: "0 0 24px"
            }}>
              Create your<br />
              <span style={{ color: "#f0e040" }}>free account</span>
            </h1>

            <p style={{
              color: "rgba(255,255,255,0.45)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem", lineHeight: 1.7,
              maxWidth: "320px", marginBottom: "48px"
            }}>
              Join thousands of shoppers and unlock exclusive deals, early access, and more.
            </p>

            {/* Benefits */}
            {[
              "Free shipping on orders over $100",
              "Exclusive member-only discounts",
              "Real-time order tracking",
              "Easy returns & refunds"
            ].map((benefit, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center",
                gap: "12px", marginBottom: "14px"
              }}>
                <div style={{
                  width: "20px", height: "20px",
                  background: "rgba(240,224,64,0.1)",
                  border: "1px solid rgba(240,224,64,0.25)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", flexShrink: 0
                }}>
                  <span style={{ color: "#f0e040", fontSize: "0.65rem" }}>✓</span>
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)"
                }}>
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel — Form ── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 48px",
          background: "#0f0f0f",
          position: "relative",
          overflowY: "auto"
        }}>

          {/* Grid pattern */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
            backgroundSize: "40px 40px"
          }} />

          <div className="reg-card" style={{
            width: "100%", maxWidth: "400px",
            position: "relative", zIndex: 1
          }}>

           <div style={{
  textAlign: "center",
  marginBottom: "12px"
}}>
  <span style={{
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "4px",
    fontWeight: 600,
    background: "linear-gradient(90deg, #f0e040, #ffd700)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 8px rgba(240,224,64,0.3)"
  }}>
    CREATE ACCOUNT
  </span>
</div>

          <h2 style={{
  fontFamily: "'Playfair Display', serif",
  fontSize: "2rem",
  fontWeight: 700,
  color: "#f5f5f5",
  textAlign: "center",
  margin: "0 0 32px",
  letterSpacing: "0.5px",
  textShadow: `
    0 1px 0 rgba(255,255,255,0.15),
    0 4px 12px rgba(0,0,0,0.6),
    0 0 10px rgba(240,224,64,0.08)
  `
}}>
  Join <span style={{ color: "#f0e040" }}>ShopIQ</span>
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

            <form onSubmit={handleRegister}>

              {/* Full Name */}
              <div style={{ marginBottom: "18px" }}>
                <label className="form-label">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="reg-input"
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: "18px" }}>
                <label className="form-label">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="reg-input"
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: "8px" }}>
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="reg-input"
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" className="eye-btn"
                    onClick={() => setShowPassword(s => !s)}>
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

              {/* Password Strength */}
              {strength && (
                <div style={{ marginBottom: "18px" }}>
                  <div style={{
                    height: "2px", background: "rgba(255,255,255,0.08)",
                    marginBottom: "6px", overflow: "hidden"
                  }}>
                    <div style={{
                      height: "100%", width: strength.width,
                      background: strength.color,
                      transition: "all 0.4s ease"
                    }} />
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "0.68rem", letterSpacing: "2px",
                      color: strength.color, fontWeight: 600
                    }}>
                      {strength.label} PASSWORD
                    </span>
                  </div>
                </div>
              )}

              {/* Confirm Password */}
              <div style={{ marginBottom: "28px" }}>
                <label className="form-label">Confirm Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter your password"
                    className={`reg-input ${
                      form.confirmPassword
                        ? form.confirmPassword === form.password ? "valid" : "invalid"
                        : ""
                    }`}
                    style={{ paddingRight: "44px" }}
                  />
                  <button type="button" className="eye-btn"
                    onClick={() => setShowConfirm(s => !s)}>
                    {showConfirm ? (
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
                {form.confirmPassword && (
                  <div style={{
                    marginTop: "6px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.72rem", letterSpacing: "1px",
                    color: form.confirmPassword === form.password
                      ? "#44ff88" : "#ff6b6b"
                  }}>
                    {form.confirmPassword === form.password
                      ? "✓ PASSWORDS MATCH"
                      : "✗ PASSWORDS DO NOT MATCH"
                    }
                  </div>
                )}
              </div>

              {/* Terms */}
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.25)",
                textAlign: "center",
                marginBottom: "20px",
                lineHeight: 1.6,
                letterSpacing: "0.3px"
              }}>
                By signing up you agree to our{" "}
                <span style={{ color: "#f0e040", cursor: "pointer" }}>Terms</span>
                {" "}and{" "}
                <span style={{ color: "#f0e040", cursor: "pointer" }}>Privacy Policy</span>
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="reg-btn"
                disabled={loading}
              >
                {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT →"}
              </button>
            </form>

            {/* Login link */}
            <p style={{
              textAlign: "center", marginTop: "28px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.3)"
            }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                style={{ color: "#f0e040", cursor: "pointer", fontWeight: 600 }}
              >
                Sign in
              </span>
            </p>

            <p
              onClick={() => navigate("/")}
              style={{
                textAlign: "center", marginTop: "12px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.2)",
                cursor: "pointer", letterSpacing: "1px"
              }}
            >
              ← BACK TO SIGN IN
            </p>
          </div>
        </div>
      </div>
    </>
  );
}