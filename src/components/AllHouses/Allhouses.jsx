import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from '../AllHouses/AllHouses.module.scss';
import { CiHeart } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { findValuesInObject } from '../../helpers/findValuesInObject';

export const AllHouses = ({ filterHouse, sortByPrice }) => {
  const [house, setHouse] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { keyword } = useParams(); 
  //console.log('vores keyword:', keyword);

  const navigate = useNavigate();
  const url = `https://api.mediehuset.net/homelands/homes`;

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch houses");
        }
        return res.json();
      })
      .then((data) => {
        if (!data.items) {
          setError("No houses found");
          setHouse([]); // Prevent undefined state
        } else {
          let filteredHouses = data.items;

          //Only apply search filtering if `keyword` exists
          if (keyword) {
            filteredHouses = filteredHouses.filter(item => findValuesInObject(item, keyword));
          }

          setHouse(filteredHouses);
        }
        //console.log("Fetched houses:", data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [keyword]); //Re-fetch when search keyword changes

  if (loading) {
    return <p>Loading houses...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }

  //Ensure house is an array before filtering
  let filteredHouses = house.length > 0 ? house : [];

  // Apply filters
  // Hvis filterHouse har en værdi, filtrer listen af huse
  filteredHouses = filterHouse
  // Konverter både husets type og filterHouse til små bogstaver for at undgå case-sensitiv sammenligning
    ? filteredHouses.filter(item => item.type.toLowerCase() === filterHouse.toLowerCase())
    // Hvis filterHouse ikke er sat, behold den originale liste uændret
    : filteredHouses;

  // Sort by price
  // Filtrer listen af huse og behold kun de huse, hvor prisen er mindre end eller lig med den angivne værdi i sortByPrice
  filteredHouses = filteredHouses.filter(item => item.price <= sortByPrice);

  //Sort by energy_label
  // Sorter listen af huse i stigende rækkefølge baseret på prisen (fra laveste til højeste)
  filteredHouses = filteredHouses.sort((a, b) => a.price - b.price);

  // Funktion til at bestemme farven baseret på energimærket
  const energyLabelByColor = (energy_label_name) => 
    // Hvis energimærket er 'A', returnér 'grøn'
    energy_label_name === 'A' ? 'green' : 
    energy_label_name === 'B' || energy_label_name === 'C' ? 'yellow' :
    energy_label_name === 'D' ? 'orange' :
    energy_label_name === 'E' || energy_label_name === 'F' ? 'red' :
    'gray';


    
  return (
    <section className={style.houseCard}>
      {filteredHouses.map((item) => (
        <article key={item.id} className={style.articleStyle} 
        onClick={() => navigate(`/houses/${item.id}`)}>
          <img className={style.houseImg} src={item.images[0]?.filename.medium} alt="house_img" />
          <p className={style.address}><strong>{item.address}</strong>&nbsp;<CiHeart size={24} /></p>
          <p className={style.street}><strong>{item.zipcode} {item.city}</strong></p>
          <p className={style.type}>{item.type}</p>
          <div className={style.info}>
          <p><span className={style.energyLabel}
            style={{ background: energyLabelByColor(item.energy_label_name) }}>
                                <strong>{item.energy_label_name}</strong></span> {item.num_rooms} værelser, 
                                {item.floor_space}m² </p>
            <p><strong>{item.price},00 DKK</strong></p>
          </div>
        </article>
      ))}
    </section>
  );
};
