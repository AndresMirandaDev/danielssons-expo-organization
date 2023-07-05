import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EditToolScreen from '../screens/tools/EditToolScreen';
import RegisterToolScreen from '../screens/tools/RegisterToolScreen';
import ToolListScreen from '../screens/tools/ToolListScreen';
import ToolsScreen from '../screens/tools/ToolsScreen';
import ToolDetailsScreen from '../screens/tools/ToolDetailsScreen';
import SearchToolScreen from '../screens/tools/SearchToolScreen';
import ToolGroupsScreen from '../screens/tools/ToolGroupsScreen';
import ToolGroupDetailScreen from '../screens/tools/ToolGroupDetailScreen';
import EditToolGroupScreen from '../screens/tools/EditToolGroupScreen';
import RegisterToolGroupScreen from '../screens/tools/RegisterToolGroupScreen';

const Stack = createNativeStackNavigator();

const ToolsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ presentation: 'modal', headerShown: false }}
    >
      <Stack.Screen name="ToolsScreen" component={ToolsScreen} />
      <Stack.Screen name="EditToolScreen" component={EditToolScreen} />
      <Stack.Screen name="RegisterToolScreen" component={RegisterToolScreen} />
      <Stack.Screen name="ToolListScreen" component={ToolListScreen} />
      <Stack.Screen name="ToolDetailsScreen" component={ToolDetailsScreen} />
      <Stack.Screen name="SearchToolScreen" component={SearchToolScreen} />
      <Stack.Screen name="ToolGroupsScreen" component={ToolGroupsScreen} />
      <Stack.Screen
        name="ToolGroupDetailScreen"
        component={ToolGroupDetailScreen}
      />
      <Stack.Screen
        name="EditToolGroupScreen"
        component={EditToolGroupScreen}
      />
      <Stack.Screen
        name="RegisterToolGroupScreen"
        component={RegisterToolGroupScreen}
      />
    </Stack.Navigator>
  );
};

export default ToolsNavigator;
