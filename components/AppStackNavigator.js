import react from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import NotificationScreen from '../screens/NotificationScreen';
import RecieverDetails from '../screens/RecieverDetails';

export const AppStackNavigator = createStackNavigator({
  BarterList : {
    screen: LoginScreen,
    navigationOptions:{
      headerShown : false
    }
  },

  ReceiverDetails : {
    screen: RecieverDetails,
    navigationOptions:{
      headerShown : false
    }
  },

  Notification:{
    screen: NotificationScreen,
    navigationOptions:{
      headerShown : false
    }
  },
},

  {
    initialRouteName: 'BarterList'
  }
);