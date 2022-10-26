import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DestinationSearch from '../screens/DestinationSearch';
import SearchResults from '../screens/SearchResults';
import DriverScreen from '../screens/DriverScreen';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'DestinationSearch'} component={DestinationSearch} />
        <Stack.Screen name={'SearchResults'} component={SearchResults}/>
        <Stack.Screen name={'DriverScreen'} component={DriverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
