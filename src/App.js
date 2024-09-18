import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetail from './pages/BookDetail';
import Navbar from './components/Navbar';

import './App.css';
import Register from './components/Auth/Register';
import Login from './components/Auth/LogIn';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/books/:id" element={<BookDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;