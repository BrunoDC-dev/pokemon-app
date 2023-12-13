import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonRow, IonCol } from '@ionic/react';



function PokemonCard({ image, name, types }) {
  return (
    <IonCard   href={`/pokemonData/${name}`}>
      <img alt={`Image of ${name}`} src={image} />
      <IonCardHeader>
        <IonCardTitle>{name}</IonCardTitle>
        <IonCardSubtitle>Species</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        <IonRow>
          {types.map((type, index) => (
            <IonCol size="auto" key={index}>
              <div class={`icon ${type}`}>
                  <img src={`/icons/${type}.svg`}/>
              </div>
              <div>
                <p></p>{type}
              
              </div>
            </IonCol>
          ))}
        </IonRow>
      </IonCardContent>
    </IonCard>
  );
}

export default PokemonCard;
