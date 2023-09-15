import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomePage from './WelcomePage';
import PokedexPage from './PokedexPage';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomePage">
        <Stack.Screen name="WelcomePage" component={WelcomePage} />
        <Stack.Screen name="PokedexPage" component={PokedexPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
