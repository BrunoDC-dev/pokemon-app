import { useEffect, useState } from 'react';
import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonSearchbar, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import PokemonCard from '../components/PokemonCard';

const Tab1: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [filteredPokemonData, setFilteredPokemonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

 useEffect(() => {
  const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  fetch(pokemonListUrl)
    .then(response => response.json())
    .then(data => {
      const pokemonList = data.results;
      const promises = pokemonList.map((pokemon: { url: string | URL | Request; }) => {
        return fetch(pokemon.url)
          .then(response => response.json())
          .then(pokemonDetails => {
            const { id, types } = pokemonDetails;
            return {
              id,
              name: pokemonDetails.name,
              types: types.map((type: { type: { name: any; }; }) => type.type.name),
              image: pokemonDetails.sprites.front_default
            };
          });
      });

      Promise.all(promises)
        .then(updatedPokemonData => {
          setPokemonData(updatedPokemonData);
        })
        .catch(error => {
          // Handle error if any of the requests fail
          console.error('Error fetching Pokemon details:', error);
        });
    }).finally(() => {;
    setIsLoading(false); // Reset loading state after fetch completes
    });
  }, []);
const handleSearch = (searchTerm: string | null) => {
  setIsLoading(true); // Set loading state to true

  if (!searchTerm) {
    setFilteredPokemonData([...pokemonData]);
    setIsLoading(false); // Reset loading state when no search term is entered
  } else {
    const searchUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    fetch(searchUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((pokemonDetails) => {
        const { id, types } = pokemonDetails;
        const filteredData = [
          {
            id,
            name: pokemonDetails.name,
            types: types.map((type: { type: { name: any } }) => type.type.name),
            image: pokemonDetails.sprites.front_default,
          },
        ];
        setFilteredPokemonData(filteredData);
        setError(''); // Reset error state on successful search
      })
      .catch((error) => {
        console.error('Error fetching Pokemon by name:', error);
        setError('Pokemon not found'); // Set error message on failed search
        setFilteredPokemonData([]); // Clear filtered data on error
      })
      .finally(() => {
        setIsLoading(false); // Reset loading state after search completion (success or error)
      });
  }
};


        return (
          <IonPage>
            <IonHeader>
            <IonToolbar>
        <IonTitle>Pokemon APP</IonTitle>
      </IonToolbar>
            </IonHeader>
              <IonContent fullscreen>
              <IonSearchbar
  placeholder="Busca tu Pokemon"
  onIonChange={(e) => handleSearch(e.detail.value)}
></IonSearchbar>
 

{error && <div>Error: {error}</div>}
  <IonGrid>
    {isLoading ? (
      <IonRow>
        <IonCol className="ion-text-center">
          <IonSpinner name="crescent" />
        </IonCol>
      </IonRow>
    ) : (
      <IonRow>
        {filteredPokemonData.length > 0
          ? filteredPokemonData.map((pokemon) => (
              <IonCol size="12" size-md="4" key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </IonCol>
            ))
          : pokemonData.map((pokemon) => (
              <IonCol size="12" size-md="4" key={pokemon.id}>
                <PokemonCard {...pokemon} />
              </IonCol>
            ))}
      </IonRow>
    )}
  </IonGrid>
</IonContent>


          </IonPage>
        )
};

export default Tab1;
