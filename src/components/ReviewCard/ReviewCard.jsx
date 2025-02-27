import React, { useState, useContext } from 'react';
import style from './ReviewCard.module.scss';
import { UserContext } from '../../context/userContext';

export const ReviewCard = () => {
  const [comment, setComment] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const { userData } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', title);
    console.log('Review:', comment);
    
    setTitle('');
    setComment('');
    setIsWriting(false);
  };

  const myTimeout = setTimeout(message, 2000);

  function myStopFunction() {
    clearTimeout(myTimeout);
  }

  return (
    <section className={style.reviewSection}>
      {!isWriting && (
        <p
          onClick={() => {
            if (userData && userData.access_token) {
              setIsWriting(true);
              setMessage('');
            } else {
              setMessage('Du skal være logget ind for at skrive en anmeldelse');
              myStopFunction()
            }
          }}
          className={style.writeReview}
        >
          Skriv en anmeldelse
        </p>
      )}

      {message && <p className={style.errorMessage}>{message}</p>}

      {isWriting && (
        <form onSubmit={handleSubmit} className={style.form}>
          <label htmlFor="title" className={style.title}>Titel:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.inputTitel}
          />

          <label htmlFor="comment">Anmeldelse:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={style.textarea}
          />

          <div className={style.buttons}>
            <button type="submit" className={style.submit}>Send</button>
            <button type="button" className={style.submit} onClick={() => setIsWriting(false)}>Annuller</button>
          </div>
        </form>
      )}
    </section>
  );
};
