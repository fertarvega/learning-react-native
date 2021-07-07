import React from 'react';
import {Image} from 'react-native';
import {
  createBottomNavigator,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import BadgesStack from './BadgesStack';
import Colors from '../../res/Colors';

const Tabs = createBottomTabNavigator();

const BadgesTabNavigator = () => {
  return (
    <Tabs.Navigator
      tabBarOptions={{
        showLabel: false,
        tintColor: Colors.white,
        activeTintColor: '#E57D00',
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
        name="Badges2"
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
        name="Badges3"
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
    </Tabs.Navigator>
  );
};

export default BadgesTabNavigator;
