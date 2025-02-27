import React, { useState, useContext } from 'react';
import style from './ReviewCard.module.scss';
import { UserContext } from '../../context/userContext';

export const ReviewCard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [numStars, setNumStars] = useState(5);
  const [isWriting, setIsWriting] = useState(false);
  const [message, setMessage] = useState('');

  const { userData } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      title,
      content,
      user_id: userData.user_id,
      active: true,
      num_stars: numStars,
    };

    const options = {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.access_token}`,
      },
    };

    fetch('https://api.mediehuset.net/homelands/reviews', options)
      .then((res) => res.json())
      .then(() => {
        setTitle('');
        setContent('');
        setNumStars(5);
        setIsWriting(false); 
      })
      .catch((err) => console.log('Error: ', err));
  };

  const handleCancel = () => {
    setIsWriting(false); 
  };

  return (
    <div className={style.reviewContainer}>
      {!isWriting && (
        <p
          onClick={() => {
            if (userData && userData.access_token) {
              setIsWriting(true);
              setMessage('');
            } else {
              setMessage('Du skal være logget ind for at skrive en anmeldelse');
            }
          }}
          className={style.writeReview}
        >
          Skriv en anmeldelse
        </p>
      )}

      {message && <p className={style.errorMessage}>{message}</p>}

      {isWriting && (
        <form onSubmit={handleSubmit} className={style.reviewForm}>
          <div className={style.reviewColumn}>
            <label htmlFor="title" className={style.reviewLabel}>Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={style.reviewInput}
            />
          </div>

          <div className={style.reviewColumn}>
            <label htmlFor="content" className={style.reviewLabel}>Review:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={style.textarea}
            />
          </div>

          <div className={style.reviewColumn}>
            <label htmlFor="numStars" className={style.reviewLabel}>Rating:</label>
            <select
              id="numStars"
              value={numStars}
              onChange={(e) => setNumStars(e.target.value)}
              className={style.selectStar}
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </select>
          </div>

          <div className={style.buttons}>
            <button type="submit" className={style.btnSubmit}>Send</button>
            <button type="button" className={style.btnSubmit} onClick={handleCancel}>
              Annuller
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
