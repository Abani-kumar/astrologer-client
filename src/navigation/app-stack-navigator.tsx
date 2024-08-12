import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AppStackNavigatorType } from './types'
import Home from '../screen/Home';
import DetailsPage from '../screen/DetailsPage';
import SearchPage from '../screen/SearchPage';
import AddAstrologer from '../screen/AddAstrologer';

const Stack = createNativeStackNavigator<AppStackNavigatorType>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' options={{headerShown: false}} component={Home}/>
      <Stack.Screen name='Details' options={{headerShown: false}} component={DetailsPage}/>
      <Stack.Screen name='SearchPage' options={{headerShown: false}} component={SearchPage}/>
      <Stack.Screen name='AddAstrologer' options={{headerShown: false}} component={AddAstrologer}/>
    </Stack.Navigator>
  )
}

export default AppStackNavigator