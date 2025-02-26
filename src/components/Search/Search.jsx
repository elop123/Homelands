import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import style from './Search.module.scss'
import { HouseCard } from '../HouseCard/HouseCard'

export const Search = () => {
  const { keyword } = useParams()
  const [searchWord, setSearchWord] = useState()
  console.log(searchWord)
  //const navigate = useNavigate()

//   useEffect(() => {
//     fetch(`https://api.mediehuset.net/homelands/search/${keyword}`)
//       .then(res => res.json())
//       .then(data => {
//         console.log(" Data:", data)
//         if (data.status && Array.isArray(data.items)) {
//           setHouses(data.items); 
//         } else {
//           setHouses([]);
//         }
//       });
//   }, [keyword]);

  return (
    <>
      <input name="search"
             value={searchWord}
             onChange={(e)=>setSearchWord(e.target.value)}
      ></input>
      <button>Søg</button>
    </>
  );
};
