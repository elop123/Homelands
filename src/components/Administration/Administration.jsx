import React from 'react'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import style from './Administration.module.scss'
import {deleteReview} from '../../api/deleteReview'

export const Administration = ({  setDeleteRes }) => {
const[review, setReview] = useState([])
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)

const { userData,logout } = useContext(UserContext)

 
  const url=`https://api.mediehuset.net/homelands/reviews`
  useEffect(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch reviews");
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
      return <p>Loading reviews...</p>;
    }
  
    if (error) {
      return <p className={style.error}>{error}</p>;
    }

  return (
    <div className={style.adminContainer}>
      <h2>Administration</h2>
      <p className={style.subtitle}>Du er logget ind som admin</p>
      {review.length > 0 ? (
      <table className={style.table}>
        <thead>
          <tr>
            <th>Dine anmeldelser</th>
            <th>Dato</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {review.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>
                <button className={style.deleteBtn} onClick={() => deleteReview(item.id)}>
                  Slet
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       ) : (
        <p>No reviews available.</p>
      )}
    </div>
  )
}


