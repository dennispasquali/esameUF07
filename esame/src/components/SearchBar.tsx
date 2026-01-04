import React, { useState } from 'react';
import '../ComponentStyle/SearchBar.css'; // Importiamo lo stile che definiremo dopo
import Lente from '../assets/lente.svg';
// Dati di esempio (potrebbero arrivare da un'API)
// const prodotti = [
//   "Apple MacBook Pro",
//   "Samsung Galaxy S23",
//   "Sony Headphones",
//   "Logitech Mouse",
//   "Apple iPad Air",
//   "Dell Monitor 4K"
// ];

const SearchBar = () => {
  const [query, setQuery] = useState("");

  // Logica di filtraggio:
  // 1. Prende la lista prodotti
  // 2. Controlla se il prodotto include il testo scritto (tutto in minuscolo per evitare errori)
//   const risultatiFiltrati = prodotti.filter(item => 
//     item.toLowerCase().includes(query.toLowerCase())
//   );

  return (
    <div className="search-container">
      {/* INPUT DI RICERCA */}
      <input 
        type="text" 
        placeholder="find a Product..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"></input>
      <div id='lente'>
        <img src={Lente}/>
      </div>

      {/* LISTA RISULTATI
      <ul className="results-list">
        {risultatiFiltrati.length > 0 ? (
          risultatiFiltrati.map((item, index) => (
            <li key={index} className="result-item">{item}</li>
          ))
        ) : (
          <li className="no-result">Nothing Found</li>
        )}
      </ul> */}
    </div>
  );
};

export default SearchBar;