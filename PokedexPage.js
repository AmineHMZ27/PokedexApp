import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';

const PokedexPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [order, setOrder] = useState("In id order");
  const temporaryPokemon = [];

  const getByType = () => {
    setOrder('In type order');
  }
  const getByAlphabetical = () => {
    setOrder('In alphabetical order');
  }
  const getByWeight = () => {
    setOrder('In weight order');
  }
  const getByHeight = () => {
    setOrder('In height order');
  }

  switch (order) {
    case 'In id order':
      pokemons.sort((poke1,poke2) => poke1.id - poke2.id);
      break;
    case 'In weight order':
      pokemons.sort((poke1,poke2) => poke1.weight - poke2.weight);
      break;
    case 'In height order':
      pokemons.sort((poke1,poke2) => poke1.height - poke2.height);
      break;
    case 'In alphabetical order':
      pokemons.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'In type order':
      pokemons.sort((a, b) => {
        const typeA = a.types[0].type.name;
        const typeB = b.types[0].type.name;
        return typeA.localeCompare(typeB);
      });
      break;
    default:
      console.log(`Sorry, we are out of ${expr}.`);
  }

  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [isPokeModalsVisible, setPokeModalsVisible] = useState(Array(pokemons.length).fill(false)); // Tableau d'états pour les modales

  const toggleFilterModal = () => {
    setFilterModalVisible(!isFilterModalVisible);
  };

  const closeFilterModal = () => {
    setFilterModalVisible(false);
  };

  const togglePokeModal = (index) => {
    // Mettre à jour l'état de la modal spécifique en fonction de l'index
    const updatedModals = [...isPokeModalsVisible];
    updatedModals[index] = !updatedModals[index];
    setPokeModalsVisible(updatedModals);
  };

  const closePokeModal = (index) => {
    // Fermer la modal spécifique en fonction de l'index
    const updatedModals = [...isPokeModalsVisible];
    updatedModals[index] = false;
    setPokeModalsVisible(updatedModals);
  };

  const renderItem = ({ item, index }) => (
    poid = item.weight / 10,
    taille = item.height / 10,

    <View style={styles.container}>
        <View style={styles.pokemonItem}>
            <TouchableOpacity  style={styles.wrapperImagePokemon} onPress={() => togglePokeModal(index)}>
                    <Image
                    style={styles.pokemonImage}
                    source={{ uri: item.sprites.front_default }} />
            </TouchableOpacity>
            <View style={styles.wrapperInfoPokemon}>
                <View>
                <Text style={styles.pokemonName}>#{item.id} {item.name}</Text>
                </View>
            </View> 
        </View>
        <Modal  isVisible={isPokeModalsVisible[index]}>
            <View style={styles.wrapperModal}>
                <View style={styles.buttonclose}>
                    <Button title="Fermer" onPress={() => closePokeModal(index)} />
                </View>
                <View  style={styles.wrapperImagePokemonModal} >
                        <Image
                        style={styles.pokemonImage}
                        source={{ uri: item.sprites.front_default }} />
                </View>
                <View style={styles.textInfoWrap} >
                    <Text style={styles.textInfo}>#{item.id} {item.name}</Text>
                    {item.types.map((type, index) => (
                        <Text style={styles.textInfo} key={index} >
                        {type.type.name}
                        </Text>
                    ))}
                    <Text style={styles.textInfo}  >{poid} kg</Text>
                    <Text style={styles.textInfo} >{taille} m</Text>
                </View>
            </View>
        </Modal>
    </View>
  );

  useEffect(() => {
    getPokemonsList()
  }, []);

  const getPokemonsList = () => {

    
    const fetching = fetch('https://pokeapi.co/api/v2/pokemon')
      .then((response) => response.json())
      .then((pokemonData) => {
        Promise.all(pokemonData.results.map((pokemon) => {
          return fetch(pokemon.url)
            .then((response) => response.json())
            .then((pokemonData) => {
              return temporaryPokemon.push(pokemonData);
            })
        })).then(() => {
          temporaryPokemon.sort((poke1, poke2) => poke1.id - poke2.id);
          setPokemons(temporaryPokemon)
        })
      })
  }

  return (
    <View style={styles.container}>
      {/* Image en haut */}
      <Image
        source={require('./assets/pokedex.png')}
        style={styles.image}
      />

      {/* Conteneur pour la barre de recherche et le bouton "Filtres" */}
      <View style={styles.searchContainer}>
        {/* Barre de recherche */}
        <TextInput
          style={styles.searchBar}
          placeholder="Rechercher..."
          onChangeText={(text) => {
            // Ajoutez ici votre logique de recherche
          }}
        />

        {/* Bouton "Filtres" */}
        <TouchableOpacity style={styles.filterButton} onPress={toggleFilterModal}>
          <Text style={styles.filterButtonText}>Filtres</Text>
        </TouchableOpacity>
      </View>

      {/* Boîte de dialogue des filtres */}
      <Modal isVisible={isFilterModalVisible}>
      <View style={styles.filterModal}>
  <View style={styles.wrapperPokedexButton}>
    <View style={styles.column}>
      <TouchableOpacity style={styles.pokedexButton} onPress={getByAlphabetical}>
        <Text style={styles.pokedexText} >A - Z</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pokedexButton} onPress={getByType}>
        <Text style={styles.pokedexText}>Type</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.column}>
      <TouchableOpacity style={styles.pokedexButton} onPress={getByWeight}>
        <Text style={styles.pokedexText}>Poid</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pokedexButton} onPress={getByHeight}>
        <Text style={styles.pokedexText}> Taille</Text>
      </TouchableOpacity>
    </View>
  </View>
  <Button title="Fermer" onPress={closeFilterModal} />
</View>
      </Modal>

      <FlatList
        data={pokemons}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  image: {
    width: 390,
    height: 70,
    resizeMode: 'cover',
  },
  searchContainer: {
    flexDirection: 'row', // Disposition en ligne (horizontale)
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  },
  searchBar: {
    flex: 1, // Utilise tout l'espace disponible
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  filterButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10, // Espacement entre la barre de recherche et le bouton "Filtres"
  },
  filterButtonText: {
    color: 'white',
  },
  filterModal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  filterHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wrapperPokedexButton: {
    flexDirection: 'row', // Afficher les boutons dans une rangée (horizontalement)
    justifyContent: 'space-between', // Espacement égal entre les boutons
    marginVertical: 20,
  },
  pokedexButton:{
    width: '80%', 
    height: 55,
    marginBottom:20,
    backgroundColor:"red",
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
  },
  pokemonItem: {
    width: 350, 
    height: 200,
    borderWidth: 1,
    marginBottom:10,
    marginTop:10,
    borderRadius:10,
    backgroundColor: '#D3D3D3',
  },
  wrapperImagePokemon:{
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height:'70%',
  },
  wrapperInfoPokemon:{
   display:'flex',
   flexDirection:'row',
   justifyContent:'center',
    width:'100%',
    height:'30%',
    // backgroundColor:'red',
    padding:10
  },
  pokemonImage: {
    width: 170,
    height: '100%',
  },
  pokemonName: {
    fontWeight: 'bold',
    color:'black',
    fontSize: 20,
  },
  wrapperPokemonType:{
    display:'flex',
    alignItems:'flex-end',
    width:'50%'
  },
  pokemonType:{
    display:'flex',
    flexDirection:'row',
    color:'white',
    fontWeight: 'bold',
    
  },
  pokemonWeight:{
    color:'white',
    fontWeight: 'bold',
    
  },
  pokemonHeight:{
    color:'white',
    fontWeight: 'bold',
    
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },

  pokedexText: {
    fontSize: 20,
    fontWeight: '700'
  }, 
  wrapperModal : {
    width: '100%',
    height: '60%',
    borderRadius: 15,
    backgroundColor: '#CD5C5C',
  },
  wrapperImagePokemonModal: {
    justifyContent:'center',
    alignItems:'center',
    width: '100%',
    height:'44%',
  },
  textInfo: {
    padding: 10,
    fontWeight: 'bold',
    color:'white',
    fontSize: 20,
  },

  textInfoWrap: {
    width: '100%',
    alignItems: 'center',
  },
  buttonclose: {
    width: '100%',
    alignItems: 'flex-end',
    marginRight: 30,
  },

  
  // Ajoutez ici des styles pour la liste de filtres
  // ... (styles déjà présents)
});

export default PokedexPage;
