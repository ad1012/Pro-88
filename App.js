import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import LoginScreen from './screens/LoginScreen'
import AppDrawNavigator from './components/AppDrawerNavigator'
import { AppTabNavigator } from './components/AppTabNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

  const switchNavigator = createSwitchNavigator({ 
    LoginScreen:{screen: LoginScreen}, 
    AppDrawerNavigator : AppDrawerNavigator,
    AppTabNavigator : AppTabNavigator,
  })

const AppContainer = createAppContainer(switchNavigator);