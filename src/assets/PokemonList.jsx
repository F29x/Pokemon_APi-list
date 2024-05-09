import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    let pokemonArray = [];
    for (let i = 1; i <= 807; i++) {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
        pokemonArray.push(response.data.name);
      } catch (err) {
        setError(err.message);
        break;
      }
    }
    setPokemon(pokemonArray);
  };

  useEffect(() => {
    if (load) {
      fetchPokemon();
    }
  }, [load]);

  return (
    <div className='center'>
      <h1>Pokemon List</h1>
      <button onClick={() => setLoad(true)}>Load Pokemon</button>
      {error && <div>Error: {error}</div>}
      <ol>
      {pokemon.map((name, index) => (
        <li key={index}>{name}</li>
      ))}
      </ol>
    </div>
  );
};

export default PokemonList;
