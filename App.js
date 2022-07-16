import React, { Component } from 'react'; // importing react -> mandatory to built a react app
import Start from './components/Start'; //the Start.js file is being imported from the /components folder
import Chat from './components/Chat'; //the Chat.js file is being imported from the /components folder
import 'react-native-gesture-handler'; //Importing gesture-hadnler, a declarative API exposing platform native touch and gesture system to React Native.
import { NavigationContainer } from '@react-navigation/native'; //The NavigationContainer is responsible for managing the app state and linking your top-level navigator to the app environment.
import { createStackNavigator } from '@react-navigation/stack'; //Stack Navigator provides a way for the app to transition between screens where each new screen is placed on top of a stack.
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createStackNavigator();

export default class App extends Component {
  
render() { 
  return (
    <NavigationContainer> 
      <Stack.Navigator
      >
        <Stack.Screen
        options={{headerShown: false}}
          name="Start"  
          component={Start} 
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
}