import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ToolsNavigator from '../navigation/ToolsNavigator';
import ProjectsNavigator from '../navigation/ProjectsNavigator';
import colors from '../config/colors';
import RentedToolsScreen from '../screens/rented/RentedToolsScreen';
import RentedToolsNavigator from './RentedNavigator';
import AccountScreen from '../screens/AccountScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import AccountNavigator from './AccountNavigator';
import SalaryReportsNavigator from './SalaryReportsNavigator';
import { LanguageContext } from '../language/languageContext';

const Tab = createBottomTabNavigator();

const homeText = {
  en: 'Home',
  sv: 'Hem',
  es: 'Inicio',
};

const toolText = {
  en: 'Tools',
  sv: 'Verktyg',
  es: 'Herramientas',
};

const projectText = {
  en: 'Projects',
  sv: 'Projekt',
  es: 'Projectos',
};

const rentedText = {
  en: 'Rent',
  sv: 'Hyrt',
  es: 'Arriendo',
};

const salaryReportText = {
  es: 'Salary report',
  sv: 'Lön rapport',
  es: 'Reporte Salarial',
};

const myAccountText = {
  en: 'My account',
  sv: 'Min konto',
  es: 'Mi cuenta',
};

export default function AppNavigator({ languageSetting }) {
  const { language, options, updateLanguage } = useContext(LanguageContext);

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: homeText[language],
        }}
      />
      <Tab.Screen
        name="Tools"
        component={ToolsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons name="tools" size={size} color={color} />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: toolText[language],
        }}
      />
      <Tab.Screen
        name="Projects"
        component={ProjectsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="office-building-outline"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: projectText[language],
        }}
      />
      <Tab.Screen
        name="Rented"
        component={RentedToolsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="calendar-alert"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: rentedText[language],
        }}
      />
      <Tab.Screen
        name="SalaryReports"
        component={SalaryReportsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="file-sign"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: salaryReportText[language],
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: colors.primary,
          tabBarLabel: myAccountText[language],
        }}
      />
    </Tab.Navigator>
  );
}
