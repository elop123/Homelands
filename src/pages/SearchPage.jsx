import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AllHouses } from '../components/AllHouses/AllHouses';

export const SearchPage = () => {
  const { keyword } = useParams();
  const [houses, setHouses] = useState(null);

  useEffect(() => {
    fetch(`https://api.mediehuset.net/homelands/search/${keyword}`)
      .then(res => res.json())
      .then(data => setHouses(data))
      .catch(err => console.error("Fetch error:", err));
  }, [keyword]);

  console.log(houses);

  return (
    <>
      <div>
        {houses ? (
          <>
            <h1>Dine {houses.num_items} resultater:</h1>
            <div>
              {houses.items && houses.items.length > 0 ? (
                houses.items
                  .filter((house) => 
                    Object.values(house) // Convert house object values to an array
                      .join(" ") // Convert values to a single string
                      .toLowerCase() // Convert to lowercase
                      .includes(keyword.toLowerCase()) // Check if it includes the search term
                  )
                  .map((house, index) => (
                    <AllHouses key={index} houseData={house} />
                  ))
              ) : (
                <h2>Ingen resultater</h2>
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
