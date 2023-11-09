// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CardDisplay from "./components/CardDisplay";
import {  Route, Routes } from 'react-router-dom';
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const loadMore = (page) => {
    setLoading(true);
    axios
      .get(`http://localhost:4000/api/cards`, { params: { name: searchTerm, pageSize: 20, page } })
      .then((response) => {
        if (page === 1) {
          setCards([...response.data.cards]);
        } else {
          setCards([...cards, ...response.data.cards]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMore(1);
  }, [searchTerm]);

  const handleSearch = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
    setCards([]);
    loadMore(1);
  };

  return (
    
<div className="bg-gray-100 p-4">
      <Navbar searchTerm={searchTerm} onSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<CardDisplay cards={cards} loading={loading} loadMore={loadMore} />} />
        <Route path="/success" element={<Success/>}  />
        <Route path="/cancel" element={<Cancel/>}  />
      </Routes>
    </div>
  );
}

export default App;
