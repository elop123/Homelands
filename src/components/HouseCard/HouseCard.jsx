import React, { useState, useEffect } from 'react'
import style from '../HouseCard/HouseCard.module.scss'
import { useNavigate } from 'react-router-dom';

export const HouseCard = () => {
const[house,setHouse]= useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);

const navigate= useNavigate()


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

  const energyLabelByColor = (energy_label_name) => 
    energy_label_name === 'A' ? 'green' :
    energy_label_name === 'B' || energy_label_name === 'C' ? 'yellow' :
    energy_label_name === 'D' ? 'orange' :
    energy_label_name === 'E' || energy_label_name === 'F' ? 'red' :
    'gray';


  return (
    <section className={style.houseCard}>
      
      {house.slice(0,3).map((item) => (
        <article key={item.id} 
                 className={style.articleStyle} 
                 onClick={() => navigate(`/houses/${item.id}`)}>
            <img className={style.houseImg} src={item.images[0].filename.medium} alt="house_img" />
          <p className={style.address}><strong>{item.address}</strong></p>
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