import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import ExchangeScreen from '../screens/ExchangeScreen';
import {AppStackNavigator} from './AppStackNavigator'
import ExchangeScreen from './screens/ExchangeScreen';

export const AppTabNavigator = createBottomTabNavigator({
    HomeScreen:{
        screen: AppStackNavigator,
        navigationOptions:{
            tabBarIcon:<Image source = {require("./assets/Home.png")}
            styles = {{width:20,height:20}}/>,
            tabBarLabel:"Home"
        }
    },
        ExchangeScreen:{
            screen:ExchangeScreen,
            navigationOptions:{
                tabBarIcon:<Image source = {require("./assets/exchange.png")}
                styles = {{width:20,height:20}}/>,
                tabBarLabel:"Exchange"
        }
    }
})