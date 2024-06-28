// src/components/BreweryDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BreweryDetails = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/breweries/${id}`);
        const data = await response.json();
        console.log(data)
        setBrewery(data);
      } catch (error) {
        console.error('Error fetching brewery:', error);
      }
    };

    fetchBrewery();
  }, [id]);

  if (!brewery) {
    return <div>Loading...</div>;
  }

  return (
    <div className='brewery-details'>
      <h1>Name : {brewery.name}</h1>
      <p>Address : {brewery.street},{brewery.state}</p>
      <p>Current Rating : ⭐⭐⭐⭐</p>
      <p>PostalCode:{brewery.postalcode}</p>
      <p>Type:{brewery.type}</p>
      <p>Country:{brewery.country}</p>
    </div>
  );
};

export default BreweryDetails;
