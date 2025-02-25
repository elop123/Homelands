import React, { useState, useEffect } from 'react'
import style from '../Review/Review.module.scss'

export const Review = () => {
const[review,setReview]= useState([]);
const[loading, setLoading] = useState(true);
const[error, setError] = useState(null);

const url=`https://api.mediehuset.net/homelands/reviews`;

useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch the review");
        }
        return res.json();
      })
      .then((data) => {
        if  (!data.items || data.items.length === 0) {
          setError("No review found");
        } else {
          setReview(data.items);
        }
        console.log(data.items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading review...</p>;
  }

  if (error) {
    return <p className={style.error}>{error}</p>;
  }


  return (
    <section className={style.reviewCard}>
      
      {review.slice(0,1).map((item) => (
        <article key={item.id} className={style.articleStyle}>
          
          <p>{item.title}</p>
          <p>{item.content}</p>
          <p>{item.user.firstname} {item.user.lastname}, {item.created_friendly.slice(0,10)}</p>
          
        </article>
      ))}
    </section>
  );
};