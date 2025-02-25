import React, { useState, useEffect } from 'react'
import style from '../HouseCard/HouseCard.module.scss'

export const HouseCard = () => {
const[house,setHouse]= useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);

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


  return (
    <section className={style.houseCard}>
      
      {house.slice(0,3).map((item) => (
        <article key={item.id} className={style.articleStyle}>
            <img className={style.houseImg} src={item.images[0].filename.medium} alt="house_img" />
          <p>{item.address}</p>
          <p>{item.zipcode} {item.city}</p>
          <p>{item.type}</p>
          <p><span className={style.energyLabel}>{item.energy_label_name}</span>, {item.num_rooms} værelser, {item.floor_space}m² </p>
          <p>{item.price},00 DKK</p>
          
        </article>
      ))}
    </section>
  );
};