import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RentedToolsScreen from '../screens/rented/RentedToolsScreen';
import RegisterRentedTool from '../screens/rented/RegisterRentedTool';
import RentedToolsListScreen from '../screens/rented/RentedToolsListScreen';
import RentedToolDetailsScreen from '../screens/rented/RentedToolDetailsScreen';
import ReturnsScreen from '../screens/rented/ReturnsScreen';
import ReturnDetailsScreen from '../screens/rented/ReturnDetailsScreen';
import colors from '../config/colors';

const Stack = createNativeStackNavigator();

const RentedToolsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
        headerTintColor: colors.light,
        headerStyle: {
          backgroundColor: colors.primaryOpacity,
        },
      }}
    >
      <Stack.Screen name="RentedToolsScreen" component={RentedToolsScreen} />
      <Stack.Screen name="RegisterRentedTool" component={RegisterRentedTool} />
      <Stack.Screen
        name="RentedToolsListScreen"
        component={RentedToolsListScreen}
      />
      <Stack.Screen
        name="RentedToolDetailsScreen"
        component={RentedToolDetailsScreen}
      />
      <Stack.Screen
        name="ReturnsScreen"
        component={ReturnsScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          headerTitle: 'Returnerade verktyg',
        }}
      />
      <Stack.Screen
        name="ReturnDetailsScreen"
        component={ReturnDetailsScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
};

export default RentedToolsNavigator;
