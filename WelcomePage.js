import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
  
  const WelcomePage = ({ navigation }) => {
    const backgroundImage = require('./assets/welcomePageImg4.jpg');
    const buttonImage = require('./assets/pokeball.png'); // Remplacez avec le chemin de votre image de bouton
  
    const goToPokedexPage = () => {
      navigation.navigate('PokedexPage');
    };
  
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={goToPokedexPage}>
            <View style={styles.imageContainer}>
              <ImageBackground source={buttonImage} style={styles.buttonImage}>
                {/* L'image va ici */}
              </ImageBackground>
            </View>
            <Text style={styles.buttonText}>Accéder au Pokedex</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  };
  
  const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      marginTop: '70%',
      alignItems: 'center',
    },
    imageContainer: {
      marginBottom: 10, // Espacement entre l'image et le texte
    },
    buttonImage: {
      width: 100, // Largeur de l'image
      height: 100, // Hauteur de l'image
      resizeMode: 'contain',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      fontSize: 18,
      color: 'red',
      textAlign: 'center',
    },
  });
  
  export default WelcomePage;
  