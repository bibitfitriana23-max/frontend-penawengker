import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { friendAPI } from "../api";

function Submit() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title) return alert("Isi judul dulu!");

    try {
      await friendAPI.create({
        title,
        content: "Dikirim dari React Fitri",
        author: "Fitri"
      });

      alert("Berhasil kirim ke API teman!");
      navigate("/");
    } catch (err) {
      console.error("Gagal POST:", err);
      alert("Gagal kirim! Cek console F12.");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Tambah Data (API Teman)</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Masukkan judul..."
        />

        <button onClick={handleSubmit}>
          Simpan
        </button>

        <div style={{ marginTop: 20 }}>
          <Link to="/">Kembali</Link>
        </div>
      </header>
    </div>
  );
}

export default Submit;