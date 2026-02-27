import React from 'react';
// Kita hapus import logo karena kita akan pakai teks atau icon saja
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Kita gunakan class App-logo tapi untuk teks supaya tetap berputar sesuai CSS-mu */}
        <h1 className="App-logo" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center' }}>
          P
        </h1>
        
        <h2>Selamat Datang di Penawengker</h2>
        
        <p>
          Membangun masa depan digital yang lebih modern.
        </p>

        <div style={{ marginTop: '20px' }}>
          <a
            className="App-link"
            href="#about"
            style={{ marginRight: '20px', textDecoration: 'none' }}
          >
            Tentang Kami
          </a>
          <a
            className="App-link"
            href="https://wa.me/yournumber" // Ganti dengan nomor WA kalau mau
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            Hubungi Kami
          </a>
        </div>

        <button 
          onClick={() => alert('Halo dari Penawengker!')}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            backgroundColor: '#61dafb',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Mulai Project
        </button>
      </header>
    </div>
  );
}

export default App;