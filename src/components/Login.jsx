import { useState } from "react";
import { authAPI } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await authAPI.login(form);

      // Cek di console apakah tokennya muncul
      console.log("Response Login:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);
        setMessage("Login berhasil! 🎉");
        
        // Beri jeda sebentar agar user bisa lihat pesan sukses
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage("Gagal: Token tidak ditemukan dalam response.");
      }

    } catch (err) {
      console.error("Error Login:", err);
      // Jika server mati atau salah password, tampilkan pesan ini
      setMessage("Email/Password salah atau Server mati ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Sabar ya..." : "Login"}
          </button>
        </form>

        {message && (
          <p style={{ 
            marginTop: "15px", 
            color: message.includes("berhasil") ? "green" : "red",
            textAlign: "center" 
          }}>
            {message}
          </p>
        )}

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          Belum punya akun? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

// Styles tetap sama seperti milikmu
const styles = {
  container: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "linear-gradient(to right, #667eea, #764ba2)" },
  card: { background: "white", padding: "40px", borderRadius: "12px", width: "350px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  title: { textAlign: "center", marginBottom: "20px" },
  input: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "8px", border: "1px solid #ccc", boxSizing: "border-box" },
  button: { width: "100%", padding: "10px", borderRadius: "8px", border: "none", background: "#4f46e5", color: "white", fontWeight: "bold", cursor: "pointer" }
};