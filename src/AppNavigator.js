import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import NewContact from './screens/NewContact';
import EditContact from './screens/EditContact';
import Settings from './screens/Settings';
import { PaperProvider } from 'react-native-paper';


const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          component={Home}
          name={'Home'}
          options={{headerShown: false}}
        />
        <Stack.Screen
        component={NewContact}
        name={'NewContact'}
        options={{headerShown: false}}
         />
         <Stack.Screen
        component={EditContact}
        name={'EditContact'}
        options={{headerShown: false}}
         />
         <Stack.Screen
        component={Settings}
        name={'Settings'}
        options={{headerShown: false}}
         />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator;
