import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SalaryReportsScreen from '../screens/salaryReports/SalaryReportsScreen';
import SearchSalaryReportScreen from '../screens/salaryReports/SearchSalaryReportScreen';
import UserSalaryReportsScreen from '../screens/salaryReports/UserSalaryReportsScreen';
import ReportDetailsScreen from '../screens/salaryReports/ReportDetailsScreen';
import NewSalaryReport from '../screens/salaryReports/NewSalaryReport';
import ReportTableScreen from '../screens/salaryReports/ReportTableScreen';

const Stack = createNativeStackNavigator();

const SalaryReportsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SalaryReportsScreen"
        component={SalaryReportsScreen}
      />
      <Stack.Screen
        name="SearchSalaryReportScreen"
        component={SearchSalaryReportScreen}
      />
      <Stack.Screen
        name="UserSalaryReportsScreen"
        component={UserSalaryReportsScreen}
      />
      <Stack.Screen
        name="ReportDetailsScreen"
        component={ReportDetailsScreen}
      />
      <Stack.Screen name="NewSalaryReport" component={NewSalaryReport} />
      <Stack.Screen name="ReportTableScreen" component={ReportTableScreen} />
    </Stack.Navigator>
  );
};

export default SalaryReportsNavigator;
