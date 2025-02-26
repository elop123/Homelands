import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import style from './Administration.module.scss'

export const Administration = () => {
const { logout } = useContext(UserContext)
  const reviews = [
    { id: 1, title: 'Dejligt køb', date: '12. August 2021' },
    { id: 2, title: 'Vi er stadig glade...', date: '05. August 2021' },
    { id: 3, title: 'Flot service', date: '01. Juli 2021' },
    { id: 4, title: 'Smukt...', date: '23. Maj 2021' },
  ]

  const handleLogout = () => {
    logout();
    navigate("/"); 
  }

  // Function to handle delete action
  const handleDelete = (id) => {
    console.log(`Deleting review with id: ${id}`);
    // Here you can call an API to delete the review
  };

  return (
    <div className={style.adminContainer}>
      <h2>Administration</h2>
      <p className={style.subtitle}>Du er logget ind som admin</p>

      <table className={style.table}>
        <thead>
          <tr>
            <th>Dine anmeldelser</th>
            <th>Dato</th>
            <th>Handling</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.title}</td>
              <td>{review.date}</td>
              <td>
                <button className={style.deleteBtn} onClick={() => handleDelete(review.id)}>
                  Slet
                </button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


