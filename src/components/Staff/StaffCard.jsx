import React, { useState, useEffect } from 'react'
import { Title } from '../Title/Title'
import style from '../Staff/StaffCard.module.scss'

export const StaffCard = () => {
const[staff,setStaff]= useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);

const url=`https://api.mediehuset.net/homelands/staff`;

useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the staff");
        }
        return res.json();
      })
      .then((data) => {
        if  (!data.items || data.items.length === 0) {
          setError("No staff found");
        } else {
          setStaff(data.items);
        }
        console.log(data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading staff...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }


  return (
    <section className={style.staffCard}>
      
      {staff.map((item) => (
        <article key={item.id} className={style.articleStyle}>
          <img  className={style.imgStaff} src={item.image} alt='staff_img' />
          <p><strong>{item.firstname} {item.lastname}</strong></p>
          <p>{item.position}</p>
          <p>Email: {item.email}</p>
          <p>Mobil: {item.phone}</p>
        </article>
      ))}
    </section>
  );
};