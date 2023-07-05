import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from '../screens/AccountScreen';
import EditUserInfoScreen from '../screens/EditUserInfoScreen';
import colors from '../config/colors';
import ManagePermissionsScreen from '../screens/ManagePermissionsScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import { LanguageContext } from '../language/languageContext';
import LanguageOptionsScreen from '../screens/LanguageOptionsScreen';

const Stack = createNativeStackNavigator();

const editHeadingText = {
  en: 'Update my information',
  sv: 'Uppdatera min information',
  es: 'Actualizar mi informacion',
};

const permissionHeadingText = {
  en: 'Manage permissions',
  sv: 'Hantera behörigheter',
  es: 'Administrar permisos',
};

const registerHeadingText = {
  en: 'Register new user',
  sv: 'Registrera ny användare',
  es: 'Registrar nuevo usuario',
};

const LanguageHeadingText = {
  en: 'Language settings',
  sv: 'Språk inställningar',
  es: 'Configuracion de idioma',
};
const AccountNavigator = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.light,
        headerStyle: {
          backgroundColor: colors.primaryOpacity,
        },
      }}
    >
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditUserInfoScreen"
        component={EditUserInfoScreen}
        options={{ headerTitle: editHeadingText[language] }}
      />
      <Stack.Screen
        name="ManagePermissionsScreen"
        component={ManagePermissionsScreen}
        options={{ headerTitle: permissionHeadingText[language] }}
      />
      <Stack.Screen
        name="RegisterUserScreen"
        component={RegisterUserScreen}
        options={{ headerTitle: registerHeadingText[language] }}
      />
      <Stack.Screen
        name="LanguageOptionsScreen"
        component={LanguageOptionsScreen}
        options={{ headerTitle: LanguageHeadingText[language] }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
