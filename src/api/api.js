import axios from "axios";

// 1. Pastikan baseURL sesuai dengan yang di Postman (tambahkan /auth jika perlu)
// Atau pastikan di .env nilainya adalah http://localhost:3001
const baseURL =  "http://localhost:3001"; // process.env.REACT_APP_MY_API ||

const getToken = () => {
  return localStorage.getItem("token");
};

export const authAPI = {
  login: async (data) => {
    // Sesuaikan dengan Postman: tambah /auth sebelum /login
    const res = await axios.post(`${baseURL}/auth/login`, data);
    return res.data;
  },

  register: async (data) => {
    // Sesuaikan dengan Postman: tambah /auth sebelum /register
    const res = await axios.post(`${baseURL}/auth/register`, data);
    return res.data;
  }
};

export const noteAPI = {
  getAll: async () => {
    const res = await axios.get(`${baseURL}/notes`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return res.data;
  },
  
  // TAMBAHKAN INI AGAR TOMBOL UBAH DAN HAPUS BERFUNGSI
  update: async (id, data) => {
    const res = await axios.put(`${baseURL}/notes/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
  },

  delete: async (id) => {
    const res = await axios.delete(`${baseURL}/notes/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
  }
};

// TAMBAHKAN INI UNTUK API TEMAN
export const friendAPI = {
  create: async (data) => {
    const res = await axios.post(`${baseURL}/notes`, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    return res.data;
  }
};