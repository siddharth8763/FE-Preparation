// src/App.js
import React, { useState, useEffect } from "react";
import Table from "./components/Table";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people/');
        const json = await response.json();

        // Create caches for vehicle and film data
        const vehicleCache = {};
        const filmCache = {};

        const enhancedData = await Promise.all(
          json.results.map(async (character) => {
            const vehicleNames = await fetchVehicleNames(character.vehicles, vehicleCache);
            const filmNames = await fetchFilmNames(character.films, filmCache);

            return {
              ...character,
              vehicles: vehicleNames,
              films: filmNames,
            };
          })
        );

        setData(enhancedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const fetchVehicleNames = async (vehicles, cache) => {
    return Promise.all(
      vehicles.map(async (vehicleUrl) => {
        if (cache[vehicleUrl]) {
          return cache[vehicleUrl];
        } else {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();
          cache[vehicleUrl] = vehicleData.name;
          return vehicleData.name;
        }
      })
    );
  };

  const fetchFilmNames = async (films, cache) => {
    return Promise.all(
      films.map(async (filmUrl) => {
        if (cache[filmUrl]) {
          return cache[filmUrl];
        } else {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();
          cache[filmUrl] = filmData.title;
          return filmData.title;
        }
      })
    );
  };

  return (
    <div className="App">
      {error && <div className="error">{error}</div>}
      <Table data={data} />
    </div>
  );
}

export default App;



//////////////////////////////////////////////////////////////////////

// src/Table.js
import React from 'react';

const Table = ({ data }) => {
  return (
    <div>
      <h1>Star Wars Characters</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Vehicles</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Movies</th>
          </tr>
        </thead>
        <tbody>
          {data.map((character, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{character.name}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {character.vehicles.length > 0 ? character.vehicles.join(', ') : 'N/A'}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                {character.films.length > 0 ? character.films.join(', ') : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
