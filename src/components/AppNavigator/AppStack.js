import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import BadgesTabNavigator from '../BadgesScreen/BadgesTabNavigator';
import BadgeLanding from '../BadgesLanding/BadgeLanding';
import Colors from "../../res/Colors"
import Login from "../UserScreen/BadgeLogin"

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.charade,
          shadowColor: Colors.charade,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name="BadgesTabNavigator" component={BadgesTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppStack;
