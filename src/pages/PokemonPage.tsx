import { useParams } from 'react-router-dom';

// Inside your PokemonPage component
const PokemonPage = () => {
  const { pokemonName } = useParams(); // Retrieve the parameter from the URL

  // Now, you can use the pokemonName variable as needed in your component

  return (
    <div>
      <h1>Pokemon Details</h1>
      <p>You selected: {pokemonName}</p> {/* Display the Pokemon name */}
      {/* Other content related to the Pokemon */}
    </div>
  );
};

export default PokemonPage;