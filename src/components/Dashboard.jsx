import { useEffect, useState } from "react";
import { noteAPI } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserFromToken = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.email;
    } catch { return null; }
  };

  const email = getUserFromToken();

  // LOAD NOTES
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await noteAPI.getAll();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // --- PERBAIKAN UTAMA DI SINI ---
  // Fungsi ini sekarang hanya bertugas pindah halaman
  const handlePay = () => {
    navigate("/payment");
  };

  // Fungsi DELETE & UPDATE tetap sama seperti kodinganmu sebelumnya...
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus data ini?")) return;
    try {
      await noteAPI.delete(id);
      setNotes(prev => prev.filter(item => item._id !== id));
      alert("Berhasil dihapus!");
    } catch (err) { console.error("Gagal DELETE:", err); }
  };

  const handleUpdate = async (id) => {
    const itemLama = notes.find(item => item._id === id);
    const judulBaru = prompt("Masukkan judul baru:", itemLama?.title);
    if (!judulBaru) return;
    try {
      await noteAPI.update(id, {
        title: judulBaru,
        content: itemLama.content,
        author: itemLama.author
      });
      setNotes(prev => prev.map(item => item._id === id ? { ...item, title: judulBaru } : item));
      alert("Berhasil diubah!");
    } catch (err) { console.error("Gagal UPDATE:", err); }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={{ margin: 0 }}>Dashboard</h2>
            <p style={{ color: "#666" }}>Welcome, <b>{email || "User"}</b></p>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        </div>

        <Link to="/submit">
          <button style={styles.submitBtn}>+ Kirim ke API Teman</button>
        </Link>

        {/* Tombol ini sekarang mengarah ke PaymentPage */}
        <button onClick={handlePay} style={styles.payBtn}>
          Bayar Sekarang
        </button>

        <div style={{ marginTop: "20px" }}>
          {loading ? (
            <p>Loading data...</p>
          ) : notes.length === 0 ? (
            <p>Belum ada data tersedia.</p>
          ) : (
            <div style={styles.list}>
              {notes.map(note => (
                <div key={note._id} style={styles.noteItem}>
                  <span style={{ fontWeight: "500" }}>{note.title}</span>
                  <div style={styles.btnGroup}>
                    <button onClick={() => handleUpdate(note._id)} style={styles.editBtn}>Ubah</button>
                    <button onClick={() => handleDelete(note._id)} style={styles.deleteBtn}>Hapus</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Styles (Tetap sama seperti punyamu)
const styles = {
  container: { minHeight: "100vh", background: "linear-gradient(to right, #667eea, #764ba2)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
  card: { background: "white", width: "100%", maxWidth: "550px", padding: "30px", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", borderBottom: "1px solid #eee", paddingBottom: "15px" },
  logoutBtn: { background: "#ff4d4d", color: "white", border: "none", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" },
  submitBtn: { background: "#4f46e5", color: "white", border: "none", padding: "12px", borderRadius: "8px", width: "100%", fontWeight: "bold", cursor: "pointer" },
  payBtn: { background: "#2ecc71", color: "white", border: "none", padding: "12px", borderRadius: "8px", width: "100%", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
  list: { display: "flex", flexDirection: "column", gap: "10px" },
  noteItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #eee" },
  btnGroup: { display: "flex", gap: "8px" },
  editBtn: { background: "#f39c12", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" },
  deleteBtn: { background: "#e74c3c", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }
};