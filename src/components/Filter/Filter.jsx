import React, { useState } from 'react'
import style from '../Filter/Filter.module.scss'

export const Filter = ({setFilterHouse, setSortByPrice}) => {
const[selectedPrice, setSelectedPrice] = useState()

    const handleFilterHouse = (e) =>{
        setFilterHouse(e.target.value)
    }

    const handlePriceChange = (e) => {
        const price = Number(e.target.value);
        setSelectedPrice(price);
        setSortByPrice(price); 
      };

  return (
 <section className={style.filterSection}>
   <div className="filterPrice">
        <label className="filterLabel">Sorter efter prisniveau</label>
        <input
        className={style.input}
          type="range"
          min="500000"
          max="30000000"
           step="10000"
          value={selectedPrice}
          onChange={handlePriceChange}
         
        />
      </div>

      <div className="filterHouse">
        <select
          className={style.filterType} 
          onChange={handleFilterHouse}>
          <option value="">Sorter efter type</option>
          <option value="Villa">Villa</option>
          <option value="Ejerlejlighed">Ejerlejlighed</option>
          <option value="Apartment">Apartment</option>
          <option value="Villalejlighed">Villalejlighed</option>
        </select>
      </div>
 </section>
  )
}
