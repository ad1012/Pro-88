import React from 'react';
import { createDrawerNavigator } from "react-navigation-drawer";
import MyBarters from "../screens/MyBarter";
import NotificationScreen from '../screens/NotificationScreen';
import SettingsScreen from "../screens/SettingsScreen";
import {AppTabNavigator} from "./AppTabNavigator";
import CustomSideBar from "./components/CustomSideBar";

export const AppDrawerNavigator = createDrawerNavigator(
  {
    Home: { 
        screen: AppTabNavigator 
    },
   MyBarter:{
     screen: MyBarters
   },
   Notification:{
     screen: NotificationScreen
   },
  Settings: {
    screen: SettingsScreen
  },
},
  { 
      contentComponent: CustomSideBar 
    },
  { 
      initialRouteName: 'Home' 
    },
);