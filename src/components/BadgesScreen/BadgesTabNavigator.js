import React from 'react';
import {Image} from 'react-native';
import {
  createBottomNavigator,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BadgesStack from './BadgesStack';
import Colors from '../../res/Colors';
import FavoriteStack from '../Favorites/FavoritesStack';
import UserStack from '../UserScreen/UserStack';

const Tabs = createBottomTabNavigator();

const BadgesTabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        tintColor: Colors.white,
        activeTintColor: Colors.orange,
        style: {
          backgroundColor: Colors.zircon,
        },
      }}>
      <Tabs.Screen
        name="Badges"
        component={BadgesStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/home.png')}
            />
          ),
        }}
      />


    <Tabs.Screen
        name="Favorites"
        component={FavoriteStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/notFavorite.png')}
            />
          ),
        }}
      />
    <Tabs.Screen
        name="Users"
        component={UserStack}
        options={{
          tabBarIcon: ({size, color}) => (
            <Image
              style={{tintColor: color, width: size, height: size}}
              source={require('../../assets/profile.png')}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BadgesTabNavigator;
