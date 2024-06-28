import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  const [filter, setFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data , setData] = useState([])

 
  useEffect(() => {

    fetchBreweries();
  }, []);

  const fetchBreweries = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({ filter, searchTerm }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await fetch('http://localhost:5000/api/breweries', options);
      if (res.ok) {
        const d = await res.json();
        setData(d);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log({ filter, searchTerm });
    fetchBreweries();
    
  };

  return (
    <div className="home-container">
      <h2>Welcome to Beweary</h2>
      <form onSubmit={handleSearch} className="filter-form">
        <div className="form-group">
          <label htmlFor="filter">Filter by:</label>
          <select id="filter" value={filter} onChange={handleFilterChange}>
            <option value="">Select</option>
            <option value="name">Name</option>
            <option value="city">City</option>
            <option value="state">State</option>
            <option value="postalcode">postalcode</option>
            <option value="country">country</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="search">Search:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className='beweries-container'>
        {data.map((item,index)=>(
            <Link to={`/breweries/${item._id}`}  className='beweries-item' key={index}>
                <p>Name:{item.name}</p>
                <p>Country:{item.country}</p>
                <p>Type:{item.type}</p>
            </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
