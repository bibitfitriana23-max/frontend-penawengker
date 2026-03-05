import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { myAPI } from "../api";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await myAPI.getAll();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Gagal GET:", err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus?")) return;

    try {
      await myAPI.delete(id);
      setData(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error("Gagal DELETE:", err);
    }
  };

  const handleUpdate = async (id) => {
    const lama = data.find(item => item._id === id);
    if (!lama) return;

    const judulBaru = prompt("Masukkan judul baru:", lama.title);
    if (!judulBaru) return;

    try {
      const updated = await myAPI.update(id, {
        title: judulBaru,
        content: lama.content,
        author: lama.author
      });

      setData(prev =>
        prev.map(item => item._id === id ? updated : item)
      );
    } catch (err) {
      console.error("Gagal UPDATE:", err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <h1>P</h1>
          <h2>Penawengker Digital</h2>

          <Link to="/submit">
            <button style={{ marginBottom: 20 }}>
              Kirim ke API Teman
            </button>
          </Link>

          {loading ? (
            <p>Loading...</p>
          ) : (
            data.map(item => (
              <div key={item._id}>
                <h3>{item.title}</h3>
                <button onClick={() => handleUpdate(item._id)}>
                  Ubah
                </button>
                <button onClick={() => handleDelete(item._id)}>
                  Hapus
                </button>
              </div>
            ))
          )}
        </div>
      </header>
    </div>
  );
}

export default Home;