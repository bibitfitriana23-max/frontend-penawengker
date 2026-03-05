// PaymentPage.jsx
import { useState, useEffect } from "react";

export default function PaymentPage() {
  const [form, setForm] = useState({ amount: "", first_name: "", email: "" });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load Script Midtrans Snap
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "Mid-client-TxiCRF-NxRhmGRKr"); 
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("⏳ Memproses transaksi...");

    try {
      const response = await fetch("http://localhost:3001/create-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data && data.token) {
        // CEK APAKAH SNAP SUDAH LOAD
        if (window.snap) {
          window.snap.pay(data.token, {
            onSuccess: (result) => {
              console.log("Success:", result);
              setStatus("✅ Pembayaran Berhasil!");
            },
            onPending: (result) => {
              console.log("Pending:", result);
              setStatus("⏳ Menunggu Pembayaran...");
            },
            onError: (result) => {
              console.error("Error:", result);
              setStatus("❌ Pembayaran Gagal!");
            },
            onClose: () => {
              setStatus("⚠️ Kamu menutup popup sebelum bayar.");
            }
          });
        } else {
          alert("Gagal memuat sistem pembayaran Midtrans. Coba refresh.");
        }
      } else {
        setStatus("❌ Gagal mendapatkan token.");
        alert("Token tidak ditemukan!");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Gagal terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", minHeight: "100vh", background: "#f0f2f5" }}>
      <div style={{ background: "white", padding: "40px", borderRadius: "15px", color: "black", display: "inline-block", boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: "20px" }}>💳 Checkout Pembayaran</h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "300px" }}>
          <div style={{ textAlign: "left" }}>
            <label>Jumlah (IDR)</label>
            <input 
              style={inputStyle}
              type="number" 
              placeholder="Contoh: 20000" 
              onChange={(e) => setForm({...form, amount: e.target.value})} 
              required 
            />
          </div>
          
          <div style={{ textAlign: "left" }}>
            <label>Nama Lengkap</label>
            <input 
              style={inputStyle}
              type="text" 
              placeholder="Nama Anda" 
              onChange={(e) => setForm({...form, first_name: e.target.value})} 
              required 
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label>Email</label>
            <input 
              style={inputStyle}
              type="email" 
              placeholder="email@contoh.com" 
              onChange={(e) => setForm({...form, email: e.target.value})} 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: "12px", 
              background: loading ? "#ccc" : "#2ecc71", 
              color: "white", 
              border: "none", 
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            {loading ? "Loading..." : "Bayar Sekarang"}
          </button>
        </form>

        <div style={{ marginTop: "20px", padding: "10px", borderRadius: "8px", background: "#f9f9f9" }}>
          <p style={{ margin: 0, fontWeight: "500" }}>Status: {status || "Siap membayar"}</p>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  boxSizing: "border-box"
};