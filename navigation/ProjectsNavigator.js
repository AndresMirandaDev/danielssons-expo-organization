import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProjectsScreen from '../screens/projects/ProjectsScreen';
import SearchProjectScreen from '../screens/projects/SearchProjectScreen';
import RegisterProjectScreen from '../screens/projects/RegisterProjectScreen';
import ProjectInfoScreen from '../screens/projects/ProjectInfoScreen';
import EditProjectScreen from '../screens/projects/EditProjectScreen';
import DispatchToolScreen from '../screens/projects/DispatchToolScreen';

const Stack = createNativeStackNavigator();

const ProjectsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: 'modal', headerShown: false }}
    >
      <Stack.Screen name="ProjectsScreen" component={ProjectsScreen} />
      <Stack.Screen
        name="SearchProjectScreen"
        component={SearchProjectScreen}
      />
      <Stack.Screen
        name="RegisterProjectScreen"
        component={RegisterProjectScreen}
      />
      <Stack.Screen name="ProjectInfoScreen" component={ProjectInfoScreen} />
      <Stack.Screen name="EditProjectScreen" component={EditProjectScreen} />
      <Stack.Screen name="DispatchToolScreen" component={DispatchToolScreen} />
    </Stack.Navigator>
  );
};

export default ProjectsNavigator;
