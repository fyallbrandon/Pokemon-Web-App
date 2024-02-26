import './App.css';
import { useState } from "react";
import Axios from "axios";
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// Define the main component
function App() {
  // Define state variables and their setters
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "", 
    species: "", 
    img: "", 
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });
  const [error, setError] = useState("");

  // Function to search for a Pokémon
  const searchPokemon = () => {
    // Make a GET request to the PokeAPI
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          species: response.data.species.name,
          img: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          type: response.data.types[0].type.name,
        });
        setPokemonChosen(true);
        setError("");
      })
      // If an error occurs, set an error message and reset state
      .catch((error) => {
        setError("Sorry, that is not a Pokémon.");
        setPokemonChosen(false);
        setPokemon({
          name: "", 
          species: "", 
          img: "", 
          hp: "",
          attack: "",
          defense: "",
          type: "",
        });
      });
  };
  
  // Enter key to trigger search
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchPokemon();
    }
  };

  // Render the component
  return (
    <div className="App">
      <div className="TitleSection">
        <h1>Pokémon Statz</h1>
        <input 
          type="text" 
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchPokemon}>Search Pokémon</button>
      </div>
      <div className="Display Section" style={{fontFamily: 'flexo-regular', color: 'white'}}>
        {error ? (
          <h1>{error}</h1>
        ) : (
          <>
            {!pokemonChosen ? (
              <h1> Please choose a Pokémon.</h1>
          ) : (
            <>
              <h1>{pokemon.name}</h1>
              <img src={pokemon.img} />
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
              <h4>Hp: {pokemon.hp}</h4>
              <h4>Attack: {pokemon.attack}</h4>
              <h4>Defense: {pokemon.defense}</h4>
            </>
          )}
        </>
        )}
      </div>
    </div>
  );
}

export default App;
