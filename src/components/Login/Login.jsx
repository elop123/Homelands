import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.scss';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Destructure setUserData from UserContext
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = 'https://api.mediehuset.net/token';

    if (!username) {
      setError('Indtast din brugernavn');
      return;
    }
    if (!password) {
      setError('Indtast dit password');
      return;
    }

    // Create URLSearchParams with username and password
    let body = new URLSearchParams();
    body.append('username', username);
    body.append('password', password);

    // Set options for the fetch request
    let options = {
      method: 'POST',
      body: body,
    };

    fetch(url, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Forkert brugernavn eller adgangskode');
        }
        return res.json();
      })
      .then((data) => {
        // Check if the access_token exists in the response
        if (data.access_token) {
          setUserData(data);
          setMessage(`Du er nu logget ind. Velkommen tilbage ${data.user.firstname}`);
          setError('');
          navigate('/administration');
        } else {
          setError('Forkert brugernavn eller adgangskode');
          setMessage('');
        }
      })
      .catch((err) => {
        setError(err.message || 'Der opstod en fejl');
        setMessage('');
      });
  };

  return (
    <div style={{ maxWidth: '500px', width: '80%', marginTop:'10rem', marginBottom:'9rem' }}>
      <h2 className={style.login}>Login</h2>
      <p className={style.text}>Indtast dit brugernavn og adgangskode for at logge ind</p>
      <form onSubmit={handleLogin}>
        {message && <b style={{ color: 'green' }}>{message}</b>}
        <input
          type="username"
          placeholder="Brugernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            display: 'block',
            width: '90%',
            padding: '10px',
            margin: '10px 0',
            marginLeft: '5.5rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        <input
          type="password"
          placeholder="Adgangskode"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            display: 'block',
            width: '90%',
            padding: '10px',
            margin: '10px 0 ',
            marginLeft: '5.5rem',
            borderRadius: '5px',
            border: '1px solid #ddd',
          }}
        />
        {error && <p style={{ color: 'red', marginLeft:'4.8rem', padding:'1rem' }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            marginLeft: '5.5rem',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        <button
          type="button"
          style={{
            padding: '10px 20px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
           onClick={() => {
             setUsername('');
             setPassword('');
             setError('');
             setMessage('');
           }}
        >
          Annuller
        </button>
       
      </form>
    </div>
  );
};