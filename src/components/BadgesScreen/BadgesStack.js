import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BadgeLanding from '../BadgesLanding/BadgeLanding';
import BadgesScreen from './BadgesScreen';
import BadgesDetail from '../BadgesDetail/BadgesDetail';
import Colors from '../../res/Colors';
import BadgesEdit from '../BadgesEdit/BadgesEdit';
import BadgesSignup from '../BadgeEnter/BadgeSignup'
import BadgesLogin from '../BadgeEnter/BadgeLogin'

const Stack = createStackNavigator();

const BadgesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.blackPearl,
          shadowColor: Colors.blackPearl,
        },
        headerTintColor: Colors.white,
      }}>
      <Stack.Screen
        name="Landing"
        component={BadgesScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Badges" component={BadgesScreen} />
      <Stack.Screen name="BadgesDetail" component={BadgesDetail} />
      <Stack.Screen name="BadgesEdit" component={BadgesEdit} />
    </Stack.Navigator>
  );
};

export default BadgesStack;
