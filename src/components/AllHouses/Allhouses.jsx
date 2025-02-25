import React, { useState, useEffect } from 'react'
import style from '../AllHouses/AllHouses.module.scss'
import { CiHeart } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'

export const AllHouses = ({filterHouse, sortByPrice}) => {
const[house,setHouse]= useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);
const navigate = useNavigate()

const url=`https://api.mediehuset.net/homelands/homes`;

useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the house");
        }
        return res.json();
      })
      .then((data) => {
        if  (!data.items || data.items.length === 0) {
          setError("No house found");
        } else {
          setHouse(data.items);
        }
        console.log(data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading houses...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }

  // Filter houses by type
  let filteredHouses = filterHouse? house.filter((item) => 
    item.type.toLowerCase() === filterHouse.toLowerCase())
    : house;

//Sort by price
filteredHouses = filteredHouses.filter((item)=> item.price <= sortByPrice)

//Sort by price: from low to high
filteredHouses = filteredHouses.sort((a, b) => a.price - b.price)

  return (
    <section className={style.houseCard}>
      
      {filteredHouses.slice(0,9).map((item) => (
        <article key={item.id} 
                 className={style.articleStyle}
                 onClick={() => navigate(`/houses/${item.id}`)}>
            <img className={style.houseImg} src={item.images[0].filename.medium} alt="house_img" />
          <p>{item.address} <CiHeart /> </p>
          <p>{item.zipcode} {item.city}</p>
          <p>{item.type}</p>
          <p><span className={style.energyLabel}>{item.energy_label_name}</span>, {item.num_rooms} værelser, {item.floor_space}m² </p>
          <p>{item.price},00 DKK</p>
          
        </article>
      ))}
    </section>
  );
};