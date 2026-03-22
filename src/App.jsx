import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Products from "./Pages/Products";
import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderStatus from "./Pages/OrderStatus";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Orders from "./Pages/Orders";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};
function ConditionalNavbar() {
  const location = useLocation();
  const hideOn = ["/login", "/register"];
  if (hideOn.includes(location.pathname)) return null;
  return <Navbar />;
}
export default function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
        <ConditionalNavbar />

        <main>
          <Routes>
            {/* Auth Routes — always accessible */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* All routes require login */}
            <Route path="/" element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
            <Route path="/products" element={
              <ProtectedRoute><Products /></ProtectedRoute>
            } />
            <Route path="/products/:id" element={
              <ProtectedRoute><ProductDetail /></ProtectedRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute><Cart /></ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute><Checkout /></ProtectedRoute>
            } />
            <Route path="/order-status/:orderId" element={
              <ProtectedRoute><OrderStatus /></ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute><Orders /></ProtectedRoute>
            } />

            {/* Catch all → login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        <footer style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 24px",
          background: "#0f0f0f"
        }}>
          <div style={{
            maxWidth: "1300px", margin: "0 auto",
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: "16px",
            marginLeft:'1150px'
          }}>
            {/* <div style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700, fontSize: "1.2rem", color: "#fff",
              display: "flex", alignItems: "center", gap: "6px"
            }}>
              <span style={{ color: "#f0e040" }}>✦</span> ShopIQ
            </div> */}
            {/* <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              {[
                { label: "Home", path: "/" },
                { label: "Products", path: "/products" },
                { label: "Cart", path: "/cart" },
                { label: "Orders", path: "/orders" }
              ].map(link => (
                <a key={link.label} href={link.path} style={{
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  fontSize: "0.78rem",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase"
                }}>
                  {link.label}
                </a>
              ))}
            </div> */}
            <div style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.2)",
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "1px"
            }}>
              © {new Date().getFullYear()} ShopIQ — Built by Lakavath Shiva Kumar
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}